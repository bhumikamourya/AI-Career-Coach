import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchDashboard,
  completeProgress,
} from "../redux/slices/dashboardSlice";

import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const progress = data?.progress || [];

  const total = progress.length * 2;

  const completed = progress.reduce((acc, p) => {
    return acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0);
  }, 0);

  const percent =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const handleStartPractice = () => {
    if (
      data.currentPhase !== "TEST" &&
      data.currentPhase !== "INTERVIEW_READY"
    ) {
      alert(
        `🚫 Locked: Reach at least 70% Progress.\nCurrent: ${percent}%`
      );
      return;
    }

    navigate("/practice");
  };

  const handleInterview = () => {
    if (data.readinessScore < 70) {
      alert(
        `🚫 Interview locked. Required: 70% Readiness\nCurrent: ${data.readinessScore}%`
      );
      return;
    }

    navigate("/interview");
  };

  const markComplete = async (topic, type) => {
    dispatch(completeProgress({ topic, type }));
  };

  return {
    data,
    loading,
    percent,
    markComplete,
    handleStartPractice,
    handleInterview,
    navigate,
  };
};