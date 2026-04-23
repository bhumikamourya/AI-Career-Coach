import { useEffect, useState } from "react";
import { getDashboardData, markProgress } from "../services/api";
import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setData(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // BUSINESS LOGIC 
  const progress = data?.progress || [];

  const total = progress.length * 2;

  const completed = progress.reduce((acc, p) => {
    return acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0);
  }, 0);

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // ACTIONS
  const handleStartPractice = () => {
    if (data.currentPhase !== "TEST" && data.currentPhase !== "INTERVIEW_READY") {
      alert(`🚫 Locked: Reach at least 70% Progress.\nCurrent: ${percent}%`);
      return;
    }
    navigate("/practice");
  };

  const handleInterview = () => {
    if (data.readinessScore < 70) {
      alert(`🚫 Interview locked. Required: 70%  Readiness\nCurrent: ${data.readinessScore}%`);
      return;
    }
    navigate("/interview");
  };

  const markComplete = async (topic, type) => {
    try {
      const res = await markProgress({ topic, type });

      setData(prev => ({
        ...prev,
        progress: res.data.updatedUser.progress,
        roadmap: res.data.roadmap,
        currentPhase: res.data.updatedUser.currentPhase,
      }));
    } catch (err) {
      console.error("Progress update error:", err);
    }
  };

  return {
    data,
    loading,
    percent,
    markComplete,
    handleStartPractice,
    handleInterview,
    navigate
  };
};