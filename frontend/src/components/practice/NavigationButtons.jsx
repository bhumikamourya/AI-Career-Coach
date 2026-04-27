import { motion } from "framer-motion";

const NavigationButtons = ({
  index,
  total,
  onNext,
  onPrev,
  onSubmit,
  submitting
}) => {
  const isLast = index === total - 1;
  const isFirst = index === 0;

  return (
    <div className="flex justify-between items-center mt-6">

      {/* PREVIOUS */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all"
      >
        Previous
      </button>

      {/* NEXT / SUBMIT */}
      {!isLast ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg hover:brightness-105 transition-all"
        >
          Next
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          disabled={submitting}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold shadow-lg hover:brightness-105 disabled:opacity-50 transition-all"
        >
          {submitting ? "Submitting..." : "Submit Test"}
        </motion.button>
      )}
    </div>
  );
};

export default NavigationButtons;