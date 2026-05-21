const ProfileLayout = ({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] p-6">

      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] bg-indigo-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-orange-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-200/20 rounded-full blur-3xl" />
      </div>
            <div className="max-w-6xl mx-auto relative z-10">
                {children}
            </div>

        </div>
    );
};

export default ProfileLayout;