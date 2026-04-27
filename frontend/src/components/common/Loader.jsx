import { motion } from "framer-motion";

const Loader = ({ fullScreen = true }) => {
    return (
        <div
            className={`flex items-center justify-center ${
                fullScreen ? "h-screen w-full" : "h-full w-full"
            } bg-[#f3f4fb]`}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                }}
                className="w-10 h-10 border-4 border-[#9689ff] border-t-transparent rounded-full"
            />
        </div>
    );
};

export default Loader;