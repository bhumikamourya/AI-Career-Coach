import { useEffect, useState } from "react";
import { getProfile, getRoles, updateProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

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
            setUser(res.data);

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                targetRole: form.targetRole,
                skills: user.skills
            };

            const res = await updateProfile(payload);
            setUser(res.data);

            alert("Profile updated");
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

    if (!user) return <p>Loading...</p>;

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
            {/* PROFILE HEADER */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-500 text-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-sm">{user.email}</p>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-indigo-700 text-white px-4 py-2 mx-4 rounded-lg"
                    >
                        Go To Dashboard
                    </button>
                </div>

                <p className="mt-3">
                    🎯 Target Role:
                    <span className="font-semibold ml-2">
                        {user.targetRole || "Not Selected"}
                    </span>
                </p>

                <p className="mt-2">
                    🚀 Profile Status:
                    <span className={`ml-2 font-semibold ${user.isProfileComplete ? "text-green-300" : "text-yellow-300"
                        }`}>
                        {user.isProfileComplete ? "Complete" : "Incomplete"}
                    </span>
                </p>
            </div>

            {/* USER INFO */}
            {user && (
                <div className="bg-white p-5 rounded-lg shadow space-y-2">

                    <p className="font-semibold mt-3">Your Current Skills</p>

                    <div className="flex flex-wrap gap-2">
                        {user.skills?.length > 0 ? (
                            user.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className={`px-4 py-1 rounded-full text-sm  ${skill.level === "Beginner" ? "bg-red-200" : skill.level === "Intermediate" ? "bg-yellow-200" : "bg-green-200"}`}
                                >

                                    {skill.name} ({skill.level})
                                    <button
                                        onClick={() => handleDeleteSkill(skill.name)}
                                        className="ml-2 text-red-500"
                                    >
                                        ✕
                                    </button>
                                </span>

                            ))
                        ) : (
                            <p className="text-gray-500">No skills added yet</p>)}
                    </div>


                    <p className="font-semibold mt-4">
                        System Evaluation (AI Analysis)
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {user.evaluatedSkills?.length > 0 ? (
                            user.evaluatedSkills.map((skill, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-1 rounded-full text-sm ${skill.level === "Beginner" ? "bg-red-200" : skill.level === "Intermediate" ? "bg-yellow-200" : "bg-green-200"}`}
                                >
                                    {skill.name} ({skill.level})
                                </span>
                            ))
                        ) : (
                            <p>No evaluation yet</p>
                        )}
                    </div>
                </div>
            )}

            {/* PROFILE UPDATE */}
            <div className="bg-white p-5 rounded-lg shadow space-y-4">
                <h3 className="text-xl font-semibold">Update Career Preferences</h3>
                <select
                    name="targetRole"
                    value={form.targetRole}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="">Select Role</option>

                    {roles.map((role) => (
                        <option key={role._id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </select>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-2">Add Skills</h3>

                    <div className="flex gap-2">
                        <input
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder="Enter skill"
                            className="border p-2 rounded w-full"
                        />
                        <select
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>

                        <button
                            onClick={() => {
                                if (!skillInput.trim()) return;

                                // Prevent Duplicate
                                const exists = user.skills.some(
                                    s => s.name.toLowerCase() === skillInput.toLowerCase()
                                );

                                if (exists) {
                                    alert("Skill already added");
                                    return;
                                }
                                setUser({
                                    ...user,
                                    skills: [
                                        ...user.skills,
                                        { name: skillInput, level: skillLevel }
                                    ]
                                });
                                setSkillInput("");
                            }}
                            className="bg-blue-500 text-white px-3 rounded"
                        >
                            Add
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* EDUCATION */}
                <div className="bg-white p-5 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-3">Education</h3>

                    {user.education?.map((edu, i) => (
                        <div key={i} className="border p-2 mb-2 rounded">
                            <p>{edu.college}</p>
                            <p className="text-sm text-gray-600">{edu.degree}</p>
                        </div>
                    )) || <p>No education added</p>}
                </div>

                {/* PROJECTS */}
                <div className="grid md:grid-cols-2 gap-4">
                    <h3 className="text-xl font-semibold mb-3">Projects</h3>

                    {user.projects && user.projects.length > 0 ? (
                        user.projects.map((proj, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition mb-2">
                                <p className="font-semibold text-lg text-indigo-600">{proj.title}</p>
                                <p className="text-sm text-gray-600 mt-2">{proj.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No projects added</p>
                    )}
                </div>

                {/* RESUME  */}
                <div className="flex gap-3">

                    <button
                        onClick={() => navigate("/resume")}
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        {user.resumeType === "upload" ? "Update Resume" : "Upload Resume"}
                    </button>

                    <button
                        onClick={() => navigate("/resume-builder")}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {user.resumeType === "builder" ? "Edit Resume" : "Build Resume"}
                    </button>

                </div>

                {user.resumeType && (
                    <p className="mt-2 text-sm text-gray-600">
                        Current: {user.resumeType === "upload" ? "Uploaded Resume" : "Built Resume"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;