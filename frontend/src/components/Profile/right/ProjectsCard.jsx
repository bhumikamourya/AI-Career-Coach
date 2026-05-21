const ProjectsCard = ({ projects }) => {
    return (
        <div className="bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl min-h-[260px] flex flex-col">

            <h3 className="text-lg font-extrabold text-[#3b3a4a] mb-4">
                Projects
            </h3>

            <div className="space-y-3">
                {projects && projects.length > 0 ? (
                    projects.map((proj, i) => (
                        <div key={i} className="p-4 bg-white/60 rounded-2xl border">
                            <p className="font-bold text-[#3b3a4a] text-sm">
                                {proj.title}
                            </p>
                            <p className="text-[10px] text-slate-500 italic">
                                {proj.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div >
                        <p className="text-xs text-slate-400 font-medium italic">
                            No projects yet
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProjectsCard;