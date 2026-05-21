import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchProfile,
  fetchRoles,
  updateUserProfile,
  addSkillToProfile,
  deleteSkillFromProfile
} from "../redux/slices/profileSlice";

import ProfileLayout from "../components/Profile/ProfileLayout";
import ProfileTopBar from "../components/Profile/ProfileTopBar";
import ProfileProgress from "../components/Profile/ProfileProgress";

import AIInsightsCard from "../components/Profile/left/AIInsightsCard";
import ProfileCard from "../components/Profile/left/ProfileCard";
import SkillsCard from "../components/Profile/left/SkillsCard";

import PreferencesCard from "../components/Profile/right/PreferencesCard";
import ProjectsCard from "../components/Profile/right/ProjectsCard";
import EducationCard from "../components/Profile/right/EducationCard";
import ResumeCard from "../components/Profile/right/ResumeCard";

import GlassCard from "../components/dashboard/ui/GlassCard";

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

      toast.success("Profile updated");

    } catch (err) {
      toast.error(err.message || "Failed to update profile");
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
      toast.warning("Skill already added");
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

  toast.success("Skill added successfully");

} catch (err) {

  toast.error(err.message || "Failed to add skill");

}
  };

  const handleDeleteSkill = async (name) => {

    try {
      await dispatch(deleteSkillFromProfile(name)).unwrap();
    } catch (err) {
      toast.error(err.message || "Failed to delete skill");
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
      <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
  toastClassName="!rounded-2xl !bg-white/80 !backdrop-blur-xl !text-slate-700 !shadow-xl"
/>

      <ProfileTopBar logout={logout} />

      <ProfileProgress
        profileCompletion={profileCompletion}
        user={user}
      />

      {/* MAIN GRID */}
      <div className="space-y-6 mt-6">

        {/* ROW 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">

          <GlassCard className="h-full min-h-[340px]">
            <ProfileCard user={user} />
          </GlassCard>

          <GlassCard className="h-full min-h-[340px]">
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
          </GlassCard>

        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">

          <GlassCard className="h-full min-h-[320px]">
            <SkillsCard
              user={user}
              onDelete={handleDeleteSkill}
            />
          </GlassCard>

          <GlassCard className="h-full min-h-[320px]">
            <AIInsightsCard
              evaluatedSkills={user.evaluatedSkills}
            />
          </GlassCard>

          <GlassCard className="h-full min-h-[320px]">
            <EducationCard education={user.education} />
          </GlassCard>

        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">

          <GlassCard className="h-full min-h-[320px]">
            <ProjectsCard projects={user.projects} />
          </GlassCard>

          <GlassCard className="h-full min-h-[320px]">
            <ResumeCard user={user} />
          </GlassCard>

        </div>

      </div>

    </ProfileLayout>

  );
};

export default ProfilePage;