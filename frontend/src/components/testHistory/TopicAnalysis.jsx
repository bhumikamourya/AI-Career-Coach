import { motion } from "framer-motion";

const getPerformance = (correct, total) => {
    const percent = (correct / total) * 100;

    if (percent >= 75)
        return {
            bar: "bg-gradient-to-r from-emerald-400 to-emerald-300",
            text: "text-emerald-500"
        };

    if (percent >= 50)
        return {
            bar: "bg-gradient-to-r from-amber-300 to-amber-200",
            text: "text-amber-500"
        };

    return {
        bar: "bg-gradient-to-r from-rose-300 to-rose-200",
        text: "text-rose-500"
    };
};

const TopicAnalysis = ({ stats }) => {
    const entries = Object.entries(stats || {});

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-xl"
        >
            {/* HEADER */}
            <h3 className="text-lg font-extrabold text-[#3b3a4a] mb-5">
                Topic Analysis
            </h3>

            {/* CONTENT */}
            <div className="space-y-4">
                {entries.length > 0 ? (
                    entries.map(([topic, data], i) => {
                        const percent = Math.round((data.correct / data.total) * 100);
                        const perf = getPerformance(data.correct, data.total);

                        return (
                            <motion.div
                                key={topic}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="space-y-1"
                            >
                                {/* TOP ROW */}
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-slate-700">{topic}</span>
                                    <span className={perf.text}>
                                        {data.correct}/{data.total} ({percent}%)
                                    </span>
                                </div>

                                {/* PROGRESS BAR */}
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percent}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className={`h-full ${perf.bar}`}
                                    />
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <p className="text-sm text-slate-400 italic text-center">
                        No topic data available
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default TopicAnalysis;