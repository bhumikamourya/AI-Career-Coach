const ProfileCard = ({ user }) => {
    return (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#d9d4ff] to-[#ffecde] opacity-40 rounded-bl-full"></div>

            <div className="w-20 h-20 bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] rounded-2xl mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user.name?.[0]}
            </div>

            <h2 className="text-2xl font-extrabold text-[#3b3a4a]">{user.name}</h2>
            <p className="text-slate-500 text-sm mb-6">{user.email}</p>

            <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Target Role
                    </span>
                    <span className="text-sm font-bold text-[#9689ff]">
                        {user.targetRole || "Not Selected"}
                    </span>
                </div>
            </div>

        </div>
    );
};

export default ProfileCard;