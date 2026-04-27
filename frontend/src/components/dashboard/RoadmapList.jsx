import RoadmapItem from "./RoadmapItem";

const RoadmapList = ({ roadmap, progress, markComplete }) => {
  return (
    <>
      {/*  subtle gradient glow (dashboard style) */}
      <div className="absolute top-0 right-0 w-40 h-40 
      bg-gradient-to-br from-indigo-300/30 to-purple-300/30 
      rounded-full blur-3xl translate-x-16 -translate-y-16 pointer-events-none"></div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
          Learning Roadmap
        </h3>

        {/* subtle divider badge */}
        <span className="text-xs text-slate-400 bg-white/40 px-3 py-1 rounded-full border border-white/50">
          {roadmap.length} Topics
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-4 relative z-10">
        {roadmap.map((item, i) => {
          const p = progress.find((x) => x.topic === item.topic);

          return (
            <RoadmapItem
              key={i}
              item={item}
              progress={p}
              markComplete={markComplete}
              index={i}
            />
          );
        })}
      </div>
    </>
  );
};

export default RoadmapList;