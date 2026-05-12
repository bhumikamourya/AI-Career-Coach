import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  generatePracticeQuestions,
  submitPracticeAnswers,
  getTestHistory,
} from "../../services/api";

/* ================= FETCH QUESTIONS ================= */

export const fetchPracticeQuestions =
  createAsyncThunk(
    "practice/fetchQuestions",
    async (payload, thunkAPI) => {
      try {
        const res =
          await generatePracticeQuestions(
            payload
          );

        return res;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Failed to generate questions"
        );
      }
    }
  );

/* ================= SUBMIT PRACTICE ================= */

export const submitPractice =
  createAsyncThunk(
    "practice/submitPractice",
    async (payload, thunkAPI) => {
      try {
        const res =
          await submitPracticeAnswers(
            payload
          );

        return res;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Failed to submit practice"
        );
      }
    }
  );

/* ================= FETCH HISTORY ================= */

export const fetchPracticeHistory =
  createAsyncThunk(
    "practice/fetchHistory",
    async (_, thunkAPI) => {
      try {
        const res =
          await getTestHistory();

        return res;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Failed to fetch history"
        );
      }
    }
  );

const practiceSlice = createSlice({
  name: "practice",

  initialState: {
    questions: [],
    result: null,

    history: [],
    selectedHistory: null,

    loading: false,
    error: null,
  },

  reducers: {
    clearPracticeState: (state) => {
      state.questions = [];
      state.result = null;
      state.error = null;
    },

    setHistory: (state, action) => {
      state.history = action.payload;
    },

    setSelectedHistory: (
      state,
      action
    ) => {
      state.selectedHistory =
        action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH QUESTIONS ===== */

      .addCase(
        fetchPracticeQuestions.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchPracticeQuestions.fulfilled,
        (state, action) => {
          state.loading = false;

          state.questions =
            action.payload.questions || [];
        }
      )

      .addCase(
        fetchPracticeQuestions.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* ===== SUBMIT PRACTICE ===== */

      .addCase(
        submitPractice.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        submitPractice.fulfilled,
        (state, action) => {
          state.loading = false;

          state.result = action.payload;

          // ✅ INSTANT HISTORY UPDATE
          if (action.payload) {
            state.history = [
              {
                ...action.payload,
                createdAt:
                  new Date().toISOString(),
              },
              ...state.history,
            ];
          }
        }
      )

      .addCase(
        submitPractice.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* ===== FETCH HISTORY ===== */

      .addCase(
        fetchPracticeHistory.fulfilled,
        (state, action) => {
          state.history =
            action.payload || [];
        }
      );
  },
});

export const {
  clearPracticeState,
  setHistory,
  setSelectedHistory,
} = practiceSlice.actions;

export default practiceSlice.reducer;