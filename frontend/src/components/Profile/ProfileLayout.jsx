const ProfileLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-[#f3f4fb] text-slate-800 p-4 md:p-10 font-sans relative overflow-x-hidden">


            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {children}
            </div>

        </div>
    );
};

export default ProfileLayout;