import { useEffect, useState, useMemo } from "react";
import { getProfile, getRoles, updateProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


import ProfileLayout from "../components/profile/ProfileLayout";
import ProfileTopBar from "../components/profile/ProfileTopBar";
import ProfileProgress from "../components/profile/ProfileProgress";

import AIInsightsCard from "../components/profile/left/AIInsightsCard";
import ProfileCard from "../components/profile/left/ProfileCard";
import SkillsCard from "../components/profile/left/SkillsCard";

import PreferencesCard from "../components/profile/right/PreferencesCard";
import ProjectsCard from "../components/profile/right/ProjectsCard";
import EducationCard from "../components/profile/right/EducationCard";
import ResumeCard from "../components/profile/right/ResumeCard";

import Loader from "../components/Profile/common/Loader";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [form, setForm] = useState({
        targetRole: "",
        skills: ""
    });
    const [skillInput, setSkillInput] = useState("");
    const [skillLevel, setSkillLevel] = useState("Beginner");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
        fetchRoles();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setUser(res.data.user);

            setForm({
                targetRole: res.data.targetRole || ""
            });
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRoles = async () => {
        try {
            const res = await getRoles();
            setRoles(res.data);
        } catch (err) {
            console.error(err);
        }
    };

 const profileCompletion = useMemo(() => {
    if (!user) return 0;

    let score = 0;

    if (user.targetRole) score += 25;
    if (user.skills?.length > 0) score += 25;
    if (user.projects?.length > 0) score += 25;
    if (user.education?.length > 0) score += 25;

    return score;
}, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                targetRole: form.targetRole,
                skills: user.skills || []
            };

            const res = await updateProfile(payload);
            setUser(res.data.user);

            alert("Profile updated");
        } catch (err) {
            console.error(err);
        }
    };


    const handleAddSkill = async () => {
        if (!skillInput.trim()) return;

        const exists = user.skills.some(
            s => s.name.toLowerCase() === skillInput.toLowerCase()
        );

        if (exists) {
            alert("Skill already added");
            return;
        }

        const updatedSkills = [
            ...user.skills,
            { name: skillInput, level: skillLevel }
        ];

        try {
            const res = await updateProfile({
                targetRole: user.targetRole,
                skills: updatedSkills
            });

            setUser(res.data.user); // sync with backend
            setSkillInput("");
        } catch (err) {
            console.error(err);
        }
    };


    const handleDeleteSkill = async (name) => {
        try {
            await fetch(`http://localhost:5000/api/user/skill/${name}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            fetchProfile();
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return (
        <Loader />
    );
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (

        <ProfileLayout>

            <ProfileTopBar logout={logout} />

            <ProfileProgress profileCompletion={profileCompletion} user={user} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* LEFT */}
                <div className="space-y-6">
                    <ProfileCard user={user} />
                    <SkillsCard user={user} onDelete={handleDeleteSkill} />
                    <AIInsightsCard evaluatedSkills={user.evaluatedSkills} />
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-2 space-y-6">
                    <PreferencesCard
                        form={form}
                        handleChange={handleChange}
                        handleUpdate={handleUpdate}
                        skillInput={skillInput}
                        setSkillInput={setSkillInput}
                        skillLevel={skillLevel}
                        setSkillLevel={setSkillLevel}
                        handleAddSkill={handleAddSkill}
                        roles={roles}
                    />
                    <EducationCard education={user.education} />
                    <ProjectsCard projects={user.projects} />
                    <ResumeCard user={user} />
                </div>

            </div>

        </ProfileLayout >
    );

};

export default ProfilePage;