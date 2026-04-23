import { useNavigate } from "react-router-dom";

const ResumeCard = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl min-h-[260px] flex flex-col justify-between">

            <h3 className="text-lg font-extrabold text-[#3b3a4a] mb-4">
                Resume Assets
            </h3>

            <div className="space-y-3">
                <button
                    onClick={() => navigate("/resume")}
                    className="w-full py-3 bg-white border border-[#9689ff] text-[#9689ff] font-bold rounded-xl"
                >
                    Upload New
                </button>

                <button
                    onClick={() => navigate("/resume-builder")}
                    className="w-full py-3 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-xl shadow-lg"
                >
                 Resume Builder
                </button>
            </div>

        </div>
    );
};

export default ResumeCard;