import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import { glassCard, titleStyle, valueStyle } from "../../styles/cardStyles";

const CurrentPhaseCard = ({ phase }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className={glassCard}
  >
    <h3 className={titleStyle}>
      <FiActivity className="text-indigo-500" />
      Current Phase
    </h3>

    <p className={`${valueStyle} text-indigo-600 mt-2`}>
      {phase}
    </p>
  </motion.div>
);

export default CurrentPhaseCard;