import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchProfile,
  fetchRoles,
  updateUserProfile,
  addSkillToProfile,
  deleteSkillFromProfile
} from "../redux/slices/profileSlice";

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

import Loader from "../components/common/Loader";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, roles, loading } = useSelector(
    (state) => state.profile
  );

  const [form, setForm] = useState({
    targetRole: "",
    skills: ""
  });

  const [skillInput, setSkillInput] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        targetRole: user.targetRole || ""
      });
    }
  }, [user]);

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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        targetRole: form.targetRole,
        skills: user.skills || []
      };

      await dispatch(updateUserProfile(payload)).unwrap();

      alert("Profile updated");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async () => {
    if (!skillInput.trim()) return;

    const exists = user.skills.some(
      (s) =>
        s.name.toLowerCase() ===
        skillInput.toLowerCase()
    );

    if (exists) {
      alert("Skill already added");
      return;
    }

    try {
      await dispatch(
        addSkillToProfile({
          name: skillInput,
          level: skillLevel
        })
      ).unwrap();

      setSkillInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (name) => {
    try {
      await dispatch(deleteSkillFromProfile(name)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) {
    return <Loader />;
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ProfileLayout>

      <ProfileTopBar logout={logout} />

      <ProfileProgress
        profileCompletion={profileCompletion}
        user={user}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* LEFT */}
        <div className="space-y-6">
          <ProfileCard user={user} />

          <SkillsCard
            user={user}
            onDelete={handleDeleteSkill}
          />

          <AIInsightsCard
            evaluatedSkills={user.evaluatedSkills}
          />
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

    </ProfileLayout>
  );
};

export default ProfilePage;