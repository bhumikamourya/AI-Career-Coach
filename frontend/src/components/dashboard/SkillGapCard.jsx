import { motion } from "framer-motion";
import { FiTarget, FiAlertCircle, FiTrendingUp } from "react-icons/fi";

import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
} from "recharts";

const SkillGapCard = ({ skillGap }) => {

  const missing = skillGap?.missingSkills || [];
  const weak = skillGap?.weakSkills || [];

  const hasNoData = missing.length === 0 && weak.length === 0;

  // DYNAMIC CHART DATA FROM BACKEND DATA
 const chartData = [

  ...missing.map((skill, i) => ({
    x: i + 1,
    y: 3,
    z: 100,
    skill,
    type: "Missing",
  })),

  ...weak.map((skill, i) => ({
    x: i + 1,
    y: 2,
    z: 70,
    skill,
    type: "Weak",
  })),
];

const sankeyData = {
  nodes: [
    { name: "Skill Gap"},

    ...missing.map((s) => ({
      name: s,
    })),

    ...weak.map((s) => ({
      name: s,
    })),

    { name: "Readiness" },
  ],

  links: [

  ...missing.map((s, i) => ({
    source: 0,
    target: i + 1,
    value: 10,
  })),

  ...weak.map((s, i) => ({
    source: 0,
    target: i + missing.length + 1,
    value: 6,
  })),

],
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <h3 className="flex items-center gap-2 font-semibold text-slate-700">
          <FiTarget className="text-indigo-500" />
          Skill Gap Analysis
        </h3>

      </div>

     {/* SANKEY DIAGRAM */}
{/* SANKEY DIAGRAM */}
<div className="mt-6 h-[320px] w-full">

  <ResponsiveContainer width="100%" height="100%">

    <Sankey
      data={sankeyData}
      nodePadding={35}
      margin={{
        top: 20,
        right: 40,
        bottom: 20,
        left: 40,
      }}

      node={{
  fill: "#a89cff",
  stroke: "#9689ff",
  strokeWidth: 1.5,
}}

      link={{
  stroke: "url(#mainGradient)",
  strokeOpacity: 0.55,
}}
    >

      {/* GRADIENT DEFINITIONS */}
      <defs>

        <linearGradient
          id="mainGradient"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >

          <stop
            offset="0%"
            stopColor="#9689ff"
          />

          <stop
            offset="100%"
            stopColor="#ffbe94"
          />

        </linearGradient>

      </defs>

      <Tooltip
        contentStyle={{
          borderRadius: "14px",
          border: "none",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          fontSize: "12px",
        }}
      />

    </Sankey>

  </ResponsiveContainer>

</div>
      {/* EMPTY TEXT */}
      {hasNoData ? (

        <div className="mt-4 text-sm text-slate-500">

          <p>No skill gap detected.</p>

          <p className="mt-2 text-indigo-600 font-medium">
            ✅ Your current skills are well aligned
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