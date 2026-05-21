const Footer = () => {
  return (
    <footer className="relative z-20 w-full py-4 sm:py-5 md:py-7 mt-auto border-t border-white/20 bg-gradient-to-r from-[#f5f0ff]/80 via-[#ffffff]/50 to-[#fff3e0]/70 backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 flex flex-row justify-between items-center gap-3 sm:gap-6 w-full">
        
        {/* Logo & Tagline */}
        <div className="flex flex-col items-start text-left flex-1 min-w-0">
          
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-[#818cf8] to-[#fb923c] rounded-lg flex items-center justify-center text-white font-black text-[9px] sm:text-[10px] shadow-sm flex-shrink-0">
              A
            </div>

            <span className="font-black text-sm sm:text-lg tracking-tighter text-slate-800 uppercase italic truncate">
              ARYNEXA
            </span>
          </div>

          <p className="text-slate-500 text-[8px] sm:text-[11px] font-semibold italic opacity-80 leading-snug">
            Architecting careers through intelligence.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-end text-right flex-1 min-w-0">
          
          <div className="text-slate-400 text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.2em] leading-relaxed">
            © {new Date().getFullYear()} SDITS CSE Department Developed by Bhumika Mourya & Group
          </div>

          <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-[#818cf8] to-[#fb923c] rounded-full opacity-40 mt-1" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;