import { useEffect, useState } from "react";
import { getTestHistory } from "../services/api";

import TestHistoryList from "../components/testHistory/TestHistoryList";
import TestDetailView from "../components/testHistory/TestDetailView";
import Loader from "../components/common/Loader";

import { useDispatch, useSelector } from "react-redux";

import {
  setHistory,
  setSelectedHistory,
} from "../redux/slices/practiceSlice";

const TestHistoryPage = () => {
  const dispatch = useDispatch();

  const reduxHistory = useSelector(
    (state) => state.practice.history
  );

  const reduxSelected = useSelector(
    (state) => state.practice.selectedHistory
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reduxHistory?.length > 0) {
      setLoading(false);
      return;
    }

    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getTestHistory();

      // ✅ FIXED
      // res already contains data array
      const sorted = (res || []).sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      dispatch(setHistory(sorted));
    } catch (err) {
      console.error("History Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] relative overflow-x-hidden p-4 md:p-8">

      {/* Background blobs */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>

        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {!reduxSelected ? (
          <TestHistoryList
            history={reduxHistory || []}
            onSelect={(data) =>
              dispatch(setSelectedHistory(data))
            }
          />
        ) : (
          <TestDetailView
            data={reduxSelected}
            onBack={() =>
              dispatch(setSelectedHistory(null))
            }
          />
        )}
      </div>
    </div>
  );
};

export default TestHistoryPage;