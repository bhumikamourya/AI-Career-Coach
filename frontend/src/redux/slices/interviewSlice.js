import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  generateInterview,
  submitInterview,
} from "../../services/api";

export const fetchInterview = createAsyncThunk(
  "interview/fetchInterview",
  async (payload, thunkAPI) => {
    try {
      const res = await generateInterview(payload);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to generate interview"
      );
    }
  }
);

export const submitInterviewAnswers = createAsyncThunk(
  "interview/submitInterview",
  async (payload, thunkAPI) => {
    try {
      const res = await submitInterview(payload);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to submit interview"
      );
    }
  }
);

const interviewSlice = createSlice({
  name: "interview",

  initialState: {
    questions: [],
    feedback: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearInterviewState: (state) => {
      state.questions = [];
      state.feedback = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions || [];
      })

      .addCase(fetchInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(submitInterviewAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitInterviewAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })

      .addCase(submitInterviewAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInterviewState } =
  interviewSlice.actions;

export default interviewSlice.reducer;