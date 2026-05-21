import { motion } from "framer-motion";

const Recommendations = ({ list }) => {

  if (!list || list.length === 0) return null;

  return (

    <div
      className="
        relative overflow-hidden
        bg-gradient-to-br
        from-[#d9d4ff]/40
        to-[#ffecde]/40
        backdrop-blur-xl
        border border-white/60
        rounded-[2rem] md:rounded-[2.5rem]
        shadow-xl
        p-5 sm:p-6 md:p-10
      "
    >

      {/* GLOW */}
      <div
        className="
          absolute
          top-[-30%]
          left-[-10%]
          w-[180px] h-[180px]
          sm:w-[220px] sm:h-[220px]
          md:w-[250px] md:h-[250px]
          bg-indigo-200
          rounded-full
          blur-[90px]
          md:blur-[100px]
          opacity-40
        "
      />

      {/* HEADER */}
      <div
        className="
          relative z-10
          flex items-center justify-between
          gap-3
          mb-5 md:mb-6
        "
      >

        <div className="w-full">
          <div
  className="
    relative z-10
    flex items-center justify-between
    gap-3
    mb-5 md:mb-6
  "
>

  <h3
    className="
      text-lg sm:text-xl
      font-extrabold
      text-[#3b3a4a]
    "
  >
    AI Recommendations
  </h3>

  <span
    className="
      text-[11px] sm:text-xs
      font-bold
      text-slate-400
      whitespace-nowrap
    "
  >
    Personalized Insights
  </span>

</div>

                 </div>

      </div>

      {/* LIST */}
      <div className="relative z-10 space-y-3 sm:space-y-4 md:space-y-5">

        {list.map((r, i) => (

          <motion.div

            key={i}

            initial={{
              opacity: 0,
              y: 10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: i * 0.05,
            }}

            className="
              flex items-start gap-3
              p-3 sm:p-4
              rounded-2xl
              bg-white/60
              border border-white
              hover:shadow-md
              transition-all
            "
          >

            {/* DOT */}
            <div
              className="
                mt-2
                shrink-0
                w-2 h-2
                rounded-full
                bg-[#9689ff]
              "
            />

            {/* TEXT */}
            <p
              className="
                text-[13px] sm:text-sm
                leading-relaxed
                text-slate-600
              "
            >
              {r}
            </p>

          </motion.div>

        ))}

      </div>

    </div>

  );

};

export default Recommendations;