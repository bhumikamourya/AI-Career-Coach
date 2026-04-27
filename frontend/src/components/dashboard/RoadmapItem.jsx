import { motion } from "framer-motion";
import { FiCheckCircle, FiCircle, FiBook } from "react-icons/fi";

const RoadmapItem = ({ item, progress, markComplete }) => {
  const isTheoryDone = progress?.theoryDone;
  const isPracticeDone = progress?.practiceDone;

  // Priority styles
  const getPriorityStyle = () => {
    if (item.priority === "High") return "bg-red-100 text-red-600";
    if (item.priority === "Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  // Status logic
  const getStatus = () => {
    if (isTheoryDone && isPracticeDone) return "Completed";
    if (isTheoryDone || isPracticeDone) return "In Progress";
    return "Not Started";
  };

  const getStatusColor = () => {
    if (isTheoryDone && isPracticeDone) return "text-green-600";
    if (isTheoryDone || isPracticeDone) return "text-yellow-600";
    return "text-slate-400";
  };

  return (
    <>

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
        <h4 className="font-semibold text-slate-800 text-lg">
          {item.topic}
        </h4>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityStyle()}`}
        >
          {item.priority} Priority
        </span>
      </div>

      {/* META INFO */}
      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
        <span>Level: {item.level}</span>

        <span className={`font-semibold ${getStatusColor()}`}>
          {getStatus()}
        </span>
      </div>

      {/* RESOURCES */}
      <div className="flex flex-wrap gap-2 mb-4">
        {item.resources?.slice(0, 2).map((res, i) => (
          <a
            key={i}
            href={res.link}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-500 hover:text-indigo-600 text-sm 
            flex items-center gap-1 hover:underline"
          >
            <FiBook className="text-xs" /> {res.title}
          </a>
        ))}

        {item.resources?.length > 2 && (
          <span className="text-xs text-slate-400">
            +{item.resources.length - 2} more
          </span>
        )}
      </div>

      {/* ACTION TOGGLES */}
      <div className="flex gap-3 flex-wrap">

        {/* THEORY */}
        <motion.div
          whileTap={!isTheoryDone ? { scale: 0.95 } : {}}
          whileHover={!isTheoryDone ? { scale: 1.05 } : {}}
          onClick={() =>
            !isTheoryDone && markComplete(item.topic, "theory")
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
          ${
            isTheoryDone
              ? "bg-green-100 text-green-600 cursor-default"
              : "bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
          }`}
          title="Mark Theory as Complete"
        >
          {isTheoryDone ? <FiCheckCircle /> : <FiCircle />}
          Theory
        </motion.div>

        {/* PRACTICE */}
        <motion.div
          whileTap={!isPracticeDone ? { scale: 0.95 } : {}}
          whileHover={!isPracticeDone ? { scale: 1.05 } : {}}
          onClick={() =>
            !isPracticeDone && markComplete(item.topic, "practice")
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
          ${
            isPracticeDone
              ? "bg-green-100 text-green-600 cursor-default"
              : "bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 cursor-pointer"
          }`}
          title="Mark Practice as Complete"
        >
          {isPracticeDone ? <FiCheckCircle /> : <FiCircle />}
          Practice
        </motion.div>

      </div>

      {/* FULL COMPLETION BADGE */}
      {isTheoryDone && isPracticeDone && (
        <div className="mt-4 text-green-600 text-sm font-semibold">
          ✔ Fully Completed
        </div>
      )}

    </>
  );
};

export default RoadmapItem;