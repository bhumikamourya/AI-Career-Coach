import ProgressBar from "./ProgressBar";
import TopicCard from "./TopicCard";

const RoadmapCard = ({ roadmap, user, percent, markComplete }) => {
  if (!roadmap?.roadmap?.length) return null;

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Learning Roadmap</h3>

      <ProgressBar percent={percent} />

      <p className="mt-3">
        Total Time: {roadmap.totalEstimatedDays} days
      </p>

      <div className="space-y-3 mt-4">
        {roadmap.roadmap.map((item, i) => {
          const progressItem = user?.progress?.find(
            (p) => p.topic === item.topic
          );

          return (
            <TopicCard
              key={i}
              item={item}
              progressItem={progressItem}
              markComplete={markComplete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapCard;