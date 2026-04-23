import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="relative z-50 flex justify-between items-center px-10 py-8 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-[#818cf8] to-[#fb923c] rounded-xl shadow-lg flex items-center justify-center text-white font-black text-xl">A</div>
        <span className="font-black text-2xl tracking-tighter text-slate-800 uppercase">ARYNEXA</span>
      </motion.div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 text-slate-500 font-semibold text-sm uppercase tracking-wider">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          
        </div>
        <button 
          onClick={() => navigate("/login")} 
          className="bg-white/50 backdrop-blur-md border border-white px-6 py-2 rounded-xl font-bold text-slate-600 shadow-sm hover:text-indigo-600 transition-all"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Header;