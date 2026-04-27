import { motion } from "framer-motion";
import { FiTarget, FiAlertCircle, FiTrendingUp } from "react-icons/fi";

const SkillGapCard = ({ skillGap }) => {
  const missing = skillGap?.missingSkills || [];
  const weak = skillGap?.weakSkills || [];

  const hasNoData = missing.length === 0 && weak.length === 0 && !skillGap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={` flex flex-col`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-slate-700">
          <FiTarget className="text-indigo-500" />
          Skill Gap Analysis
        </h3>
      </div>

      {/* EMPTY STATE (NO DATA) */}
      {hasNoData ? (
        <div className="mt-4 text-sm text-slate-500">
          <p>No skill data available.</p>
          <p className="mt-2 text-indigo-600 font-medium">
            👉 Add your skills to get AI-powered analysis
          </p>
        </div>
      ) : (
        <>
          {/* CONTENT */}
          <div className="mt-4 space-y-4">

            {/* MISSING */}
            {missing.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                  <FiAlertCircle /> Missing Skills
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {missing.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* WEAK */}
            {weak.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-yellow-500 flex items-center gap-1">
                  <FiTrendingUp /> Weak Skills
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {weak.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* NO GAPS BUT DATA EXISTS */}
            {missing.length === 0 && weak.length === 0 && (
              <p className="text-sm text-gray-400 font-medium">
                No skillGap Detected
              </p>
            )}
          </div>

          {/* ACTION */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-sm text-indigo-600 font-medium">
              👉 Focus on {missing[0] || weak[0] || "advanced topics"} to improve faster
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SkillGapCard;