import { FiActivity } from "react-icons/fi";

const CurrentPhaseCard = ({ phase }) => {
  return (
   <>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-300/20 blur-3xl rounded-full" />

      <div className="flex justify-between items-center">
        <h3 className="flex items-center gap-2 font-semibold text-slate-700">
          <FiActivity className="text-indigo-500" />
          Current Phase
        </h3>
        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
      </div>

      <p className="text-2xl font-bold text-slate-800 mt-3">{phase}</p>

      <p className="text-sm text-slate-500 mt-2">
        Your current learning stage based on AI evaluation.
      </p>
</>
  );
};

export default CurrentPhaseCard;