const OptionsList = ({ options, selected, onSelect }) => {
  return (
    <div className="space-y-3">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSelect(opt)}
          className={`w-full text-left p-4 rounded-xl border transition-all
          ${
            selected === opt
              ? "bg-indigo-100 border-indigo-400"
              : "bg-white/50 border-white/60 hover:bg-white shadow-xl"
          }`}
        >
          <span className="text-indigo-500 mr-2 font-semibold">
            {String.fromCharCode(65 + i)}.
          </span>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default OptionsList;