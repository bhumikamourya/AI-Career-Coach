import { useNavigate } from "react-router-dom";

const ProfileTopBar = ({ logout }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-extrabold text-[#3b3a4a] tracking-tight">
                    Your Profile
                </h1>
                <p className="text-slate-500 font-medium italic">
                    Manage your professional identity
                </p>
            </div>

            <div className="flex gap-3">
                <button onClick={() => navigate("/dashboard")}
                    className="px-6 py-2.5 bg-white border border-[#d0d2ff] rounded-xl font-bold text-[#9689ff] hover:bg-[#f8f7ff] shadow-sm">
                    Dashboard
                </button>

                <button onClick={logout}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-xl shadow-lg">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileTopBar;