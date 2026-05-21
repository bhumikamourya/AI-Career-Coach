const ProfileCard = ({ user }) => {

    return (

        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-4 sm:p-6 md:p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden min-h-[250px] h-full flex flex-col justify-between">

            <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-[#d9d4ff] to-[#ffecde] opacity-40 rounded-bl-full"></div>

            {/* TOP SECTION */}
            <div className="flex flex-col items-start text-left w-full">

                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] rounded-2xl mb-5 sm:mb-6 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold shadow-lg shrink-0">
                    {user.name?.[0]}
                </div>

                <div className="w-full">

                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#3b3a4a] break-words leading-tight">
                        {user.name}
                    </h2>

                    <p className="text-slate-500 text-sm mt-2 mb-5 sm:mb-6 break-all">
                        {user.email}
                    </p>

                </div>

            </div>

            {/* BOTTOM SECTION */}
            <div className="space-y-4 pt-4 border-t border-slate-100">

                <div className="flex justify-between items-center gap-4">

                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Target Role
                    </span>

                    <span className="text-sm font-bold text-[#9689ff] text-right break-words">
                        {user.targetRole || "Not Selected"}
                    </span>

                </div>

            </div>

        </div>

    );
};

export default ProfileCard;