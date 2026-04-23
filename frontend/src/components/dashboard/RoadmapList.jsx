import { motion } from "framer-motion";
import RoadmapItem from "./RoadmapItem";

const RoadmapList = ({ roadmap, progress, markComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 
      shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-6">
        Learning Roadmap
      </h3>

      <div className="space-y-4">
        {roadmap.map((item, i) => {
          const p = progress.find(x => x.topic === item.topic);

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
    </motion.div>
  );
};

export default RoadmapList;