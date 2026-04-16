const ProgressBar = ({ percent }) => {
  return (
    <>
      <div className="w-full bg-gray-200 rounded h-3">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p className="text-sm mt-1">{percent}% completed</p>
    </>
  );
};

export default ProgressBar;