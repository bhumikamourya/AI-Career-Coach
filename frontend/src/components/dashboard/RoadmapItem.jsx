import { motion } from "framer-motion";
import { FiCheckCircle, FiCircle, FiBook } from "react-icons/fi";

const RoadmapItem = ({ item, progress, markComplete }) => {

  const isTheoryDone = progress?.theoryDone;
  const isPracticeDone = progress?.practiceDone;

  // Priority styles
  const getPriorityStyle = () => {
    if (item.priority === "High")
      return "bg-red-100 text-red-600";

    if (item.priority === "Medium")
      return "bg-yellow-100 text-yellow-600";

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

  // PROGRESS %
  const progressPercent =
    isTheoryDone && isPracticeDone
      ? 100
      : isTheoryDone || isPracticeDone
      ? 50
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 border border-white/60 rounded-[2rem] p-4
      backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
    >

      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">

        {/* LEFT */}
        <div className="flex-1">

          {/* TITLE */}
          <div className="flex flex-wrap items-center gap-3 mb-4">

            <h4 className="font-bold text-3xl text-indigo-500 tracking-tight">
              {item.order || ""}
            </h4>

            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              {item.topic}
            </h3>

            <span
              className={`px-4 py-1 rounded-full text-xs font-bold ${getPriorityStyle()}`}
            >
              {item.priority} Priority
            </span>

          </div>

          {/* META INFO */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-5">

            <span>
              Level: {item.level}
            </span>

            <span className={`font-semibold ${getStatusColor()}`}>
              {getStatus()}
            </span>

          </div>

          {/* PROGRESS */}
          <div className="mb-5">

            <div className="flex justify-between items-center mb-2">

              <p className="text-sm text-slate-500">
                Progress
              </p>

              <span className="text-sm font-semibold text-indigo-500">
                {progressPercent}%
              </span>

            </div>

            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] rounded-full"
              />

            </div>

          </div>

          {/* RESOURCES */}
          <div className="flex flex-wrap gap-4">

            {item.resources?.slice(0, 2).map((res, i) => (
              <a
                key={i}
                href={res.link}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-500 hover:text-indigo-600 text-sm 
                flex items-center gap-1 font-medium hover:underline"
              >
                <FiBook className="text-xs" />
                {res.title}
              </a>
            ))}

            {item.resources?.length > 2 && (
              <span className="text-xs text-slate-400">
                +{item.resources.length - 2} more
              </span>
            )}

          </div>

        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* THEORY */}
          <motion.div
            whileTap={!isTheoryDone ? { scale: 0.95 } : {}}
            whileHover={!isTheoryDone ? { scale: 1.04 } : {}}
            onClick={() =>
              !isTheoryDone && markComplete(item.topic, "theory")
            }
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all
            flex items-center justify-center gap-2 min-w-[180px]
            ${
              isTheoryDone
                ? "bg-indigo-100 text-indigo-500 cursor-default"
                : "bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] text-white cursor-pointer shadow-md"
            }`}
            title="Mark Theory as Complete"
          >

            {isTheoryDone ? <FiCheckCircle /> : <FiCircle />}

            {isTheoryDone
              ? "Theory Completed"
              : "Mark Theory Done"}

          </motion.div>

          {/* PRACTICE */}
          <motion.div
            whileTap={!isPracticeDone ? { scale: 0.95 } : {}}
            whileHover={!isPracticeDone ? { scale: 1.04 } : {}}
            onClick={() =>
              !isPracticeDone && markComplete(item.topic, "practice")
            }
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all
            flex items-center justify-center gap-2 min-w-[180px]
            ${
              isPracticeDone
                ? "bg-green-100 text-green-600 cursor-default"
                : "bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] text-white cursor-pointer shadow-md"
            }`}
            title="Mark Practice as Complete"
          >

            {isPracticeDone ? <FiCheckCircle /> : <FiCircle />}

            {isPracticeDone
              ? "Practice Completed"
              : "Mark Practice Done"}

          </motion.div>

        </div>

      </div>

      {/* FULL COMPLETION BADGE */}
      {isTheoryDone && isPracticeDone && (

        <div className="mt-5 text-green-600 text-sm font-semibold">
          ✔ Fully Completed
        </div>

      )}

    </motion.div>
  );
};

export default RoadmapItem;