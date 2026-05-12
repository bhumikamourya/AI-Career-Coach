import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  saveResume,
  getResume,
  uploadResume
} from "../../services/api";

const initialState = {
  resume: null,
  source: "",
  extractedText: "",
  extractedSkills: [],
  loading: false,
  error: null
};

// GET RESUME
export const fetchResume = createAsyncThunk(
  "resume/fetchResume",
  async (_, thunkAPI) => {
    try {
      const res = await getResume();

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch resume"
      );
    }
  }
);

// SAVE RESUME
export const saveResumeData = createAsyncThunk(
  "resume/saveResume",
  async (payload, thunkAPI) => {
    try {
      const res = await saveResume(payload);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save resume"
      );
    }
  }
);

// UPLOAD RESUME
export const uploadResumeFile = createAsyncThunk(
  "resume/uploadResume",
  async (formData, thunkAPI) => {
    try {
      const res = await uploadResume(formData);

      localStorage.setItem(
        "gap",
        JSON.stringify(res.gap)
      );

      localStorage.setItem(
        "roadmap",
        JSON.stringify(res.roadmap)
      );

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Upload failed"
      );
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = action.payload.data;
        state.source = action.payload.source;
      })

      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVE
      .addCase(saveResumeData.pending, (state) => {
        state.loading = true;
      })

      .addCase(saveResumeData.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(saveResumeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPLOAD
      .addCase(uploadResumeFile.pending, (state) => {
        state.loading = true;
      })

      .addCase(uploadResumeFile.fulfilled, (state, action) => {
        state.loading = false;
        state.extractedText = action.payload.text;
        state.extractedSkills =
          action.payload.extractedSkills;
      })

      .addCase(uploadResumeFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default resumeSlice.reducer;