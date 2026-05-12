import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDashboardData,
  markProgress
} from "../../services/api";

/* ================= FETCH DASHBOARD ================= */

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      const res = await getDashboardData();

      return res || {};
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Dashboard fetch failed"
      );
    }
  }
);

/* ================= COMPLETE PROGRESS ================= */

export const completeProgress = createAsyncThunk(
  "dashboard/completeProgress",
  async ({ topic, type }, thunkAPI) => {
    try {
      const res = await markProgress({
        topic,
        type
      });

      return res || {};
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Progress update failed"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    data: null,

    skillGap: [],
    roadmap: [],
    aiInsight: "",
    currentPhase: "",
    readinessScore: 0,

    loading: false,
    error: null
  },

  reducers: {
    /* ===== MANUAL SETTERS ===== */

    setSkillGap: (state, action) => {
      state.skillGap = action.payload || [];
    },

    setRoadmap: (state, action) => {
      state.roadmap = action.payload || [];
    },

    setAIInsight: (state, action) => {
      state.aiInsight = action.payload || "";
    },

    setCurrentPhase: (state, action) => {
      state.currentPhase = action.payload || "";
    },

    setReadinessScore: (state, action) => {
      state.readinessScore = action.payload || 0;
    }
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH DASHBOARD ===== */

      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload || {};

        state.data = payload;

        state.skillGap =
          payload?.skillGap || [];

        state.roadmap =
          payload?.roadmap || [];

        state.aiInsight =
          payload?.aiInsight || "";

        state.currentPhase =
          payload?.currentPhase || "";

        state.readinessScore =
          payload?.readinessScore || 0;
      })

      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ===== COMPLETE PROGRESS ===== */

      .addCase(
        completeProgress.fulfilled,
        (state, action) => {

          const payload = action.payload || {};

          state.data = {
            ...(state.data || {}),

            progress:
              payload?.updatedUser?.progress || [],

            roadmap:
              payload?.roadmap || [],

            currentPhase:
              payload?.updatedUser
                ?.currentPhase || ""
          };

          state.roadmap =
            payload?.roadmap || [];

          state.currentPhase =
            payload?.updatedUser
              ?.currentPhase || "";
        }
      )

      .addCase(
        completeProgress.rejected,
        (state, action) => {
          state.error = action.payload;
        }
      );
  }
});

/* ===== EXPORT ACTIONS ===== */

export const {
  setSkillGap,
  setRoadmap,
  setAIInsight,
  setCurrentPhase,
  setReadinessScore
} = dashboardSlice.actions;

export default dashboardSlice.reducer;