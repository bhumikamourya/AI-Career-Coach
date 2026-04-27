import { useEffect, useState } from "react";
import { getTestHistory } from "../services/api";
import TestHistoryList from "../components/testHistory/TestHistoryList";
import TestDetailView from "../components/testHistory/TestDetailView";
import Loader from "../components/common/Loader";

const TestHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getTestHistory();
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setHistory(sorted);
    } catch (err) {
      console.error(err);
    }finally {
      setLoading(false);
    }
  };

   if (loading) {
    return (
    <Loader />
    );
  } 

  return (
    <div className="min-h-screen w-full bg-[#f3f4fb] relative overflow-x-hidden p-4 md:p-8">

      {/* Background blobs (IMPORTANT for consistency) */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {!selected ? (
          <TestHistoryList history={history} onSelect={setSelected} />
        ) : (
          <TestDetailView data={selected} onBack={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
};

export default TestHistoryPage;