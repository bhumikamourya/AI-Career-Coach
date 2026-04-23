import { motion } from "framer-motion";

const ProfileProgress = ({ profileCompletion, user }) => {

    return (
        <div className="mb-8 bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-lg">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-extrabold text-[#3b3a4a]">
                    Profile Status
                </h3>

                <span
                    className={`px-4 py-1 rounded-full text-xs font-bold ${user.isProfileComplete
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {user.isProfileComplete ? "Complete" : "Incomplete"}
                </span>
            </div>

             {/* PROGRESS BAR  */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-6 mb-6">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profileCompletion}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-[#9689ff] to-[#ffbe94]"
                    />
                </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {/* PROFILE COMPLETION */}
                <div className="bg-white/60 rounded-2xl p-4 text-center shadow">
                    <p className="text-xs text-slate-400">Completion</p>
                    <p className="text-2xl font-black text-[#9689ff]">
                        {profileCompletion}%
                    </p>
                </div>

                {/* SKILLS */}
                <div className="bg-white/60 rounded-2xl p-4 text-center shadow">
                    <p className="text-xs text-slate-400">Skills</p>
                    <p className="text-2xl font-black text-[#9689ff]">
                        {user.skills?.length || 0}
                    </p>
                </div>

                {/* PROJECTS */}
                <div className="bg-white/60 rounded-2xl p-4 text-center shadow">
                    <p className="text-xs text-slate-400">Projects</p>
                    <p className="text-2xl font-black text-[#ffbe94]">
                        {user.projects?.length || 0}
                    </p>
                </div>

                {/* READINESS */}
                <div className="bg-white/60 rounded-2xl p-4 text-center shadow">
                    <p className="text-xs text-slate-400">Readiness</p>
                    <p className="text-2xl font-black text-green-500">
                        {user.readinessScore || 0}%
                    </p>
                </div>

            </div>

            {/* ACTION SUGGESTION */}
            {!user.isProfileComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700 font-semibold"
                >
                    ⚡ Complete your profile to unlock roadmap & AI insights
                </motion.div>
            )}

        </div>
    );
}


export default ProfileProgress;
