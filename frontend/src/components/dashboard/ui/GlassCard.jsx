import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`
        bg-white/40
        backdrop-blur-xl
        border border-white/60
        shadow-[0_20px_50px_rgba(0,0,0,0.05)]
        rounded-[2rem]
        p-6
        transition-all
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;