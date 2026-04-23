const Footer = () => {
  return (
    // yahan humne bg-gradient-to-r (right) use kiya hai lavender se orange mix ke liye
    <footer className="relative z-20 w-full py-7 mt-auto border-t border-white/20 bg-gradient-to-r from-[#f5f0ff]/80 via-[#ffffff]/50 to-[#fff3e0]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
        
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#818cf8] to-[#fb923c] rounded-lg flex items-center justify-center text-white font-black text-[10px] shadow-sm">
              A
            </div>
            <span className="font-black text-lg tracking-tighter text-slate-800 uppercase italic">
              ARYNEXA
            </span>
          </div>
          <p className="text-slate-500 text-[11px] font-semibold italic opacity-80">
            Architecting careers through intelligence.
          </p>
        </div>

        {/* Links with Hover Colors */}
       

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end">
          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
            © {new Date().getFullYear()} SDITS CSE Department * Developed by Bhumika Mourya & Group
          </div>
          <div className="h-1 w-12 bg-gradient-to-r from-[#818cf8] to-[#fb923c] rounded-full opacity-40" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;