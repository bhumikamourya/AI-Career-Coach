import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getTestHistory } from "../../services/api";

const initialState = {
  history: [],
  loading: false,
  error: null
};

export const fetchTestHistory = createAsyncThunk(
  "history/fetchTestHistory",
  async (_, thunkAPI) => {
    try {
      const res = await getTestHistory();

      const sorted = res.data.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sorted;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch history"
      );
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTestHistory.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTestHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })

      .addCase(fetchTestHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default historySlice.reducer;