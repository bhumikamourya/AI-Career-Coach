const TopicCard = ({ item, progressItem, markComplete }) => {
  const isTheoryDone = progressItem?.theoryDone;
  const isPracticeDone = progressItem?.practiceDone;

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">

      <div className="flex justify-between">
        <h4 className="font-semibold">{item.topic}</h4>
        <span className="text-sm">{item.level}</span>
      </div>

      <p className="text-sm mt-1">
        Priority: <b>{item.priority}</b>
      </p>

      <p className="text-sm mt-1">
        ⏱ {item.remainingDays} days left
      </p>

      <div className="mt-2">
        {item.resources?.map((r, i) => (
          <a key={i} href={r.link} target="_blank" className="block text-blue-600">
            {r.title}
          </a>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        {!isTheoryDone && (
          <button
            onClick={() => markComplete(item.topic, "theory")}
            className="btn-blue"
          >
            Theory Done
          </button>
        )}

        {!isPracticeDone && (
          <button
            onClick={() => markComplete(item.topic, "practice")}
            className="btn-green"
          >
            Practice Done
          </button>
        )}
      </div>

    </div>
  );
};

export default TopicCard;