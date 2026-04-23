import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";
import { glassCard, titleStyle } from "../../styles/cardStyles";

const SkillGapCard = ({ skillGap }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={glassCard}
  >
    <h3 className={titleStyle}>
      <FiTarget className="text-indigo-500" />
      Skill Gap Analysis
    </h3>

    <div className="mt-4 space-y-3 text-sm">
      <div>
        <span className="text-red-500 font-semibold">Missing:</span>
        <p className="text-slate-600">
          {skillGap?.missingSkills?.join(", ") || "None"}
        </p>
      </div>

      <div>
        <span className="text-yellow-500 font-semibold">Weak:</span>
        <p className="text-slate-600">
          {skillGap?.weakSkills?.join(", ") || "None"}
        </p>
      </div>
    </div>
  </motion.div>
);

export default SkillGapCard;