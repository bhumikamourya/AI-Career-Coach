import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  getProfile,
  updateProfile,
  getRoles
} from "../../services/api";

/* ================= FETCH PROFILE ================= */

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await getProfile();

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Profile fetch failed"
      );
    }
  }
);

/* ================= FETCH ROLES ================= */

export const fetchRoles = createAsyncThunk(
  "profile/fetchRoles",
  async (_, thunkAPI) => {
    try {
      const res = await getRoles();

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Roles fetch failed"
      );
    }
  }
);

/* ================= UPDATE PROFILE ================= */

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (data, thunkAPI) => {
    try {
      const res = await updateProfile(data);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Profile update failed"
      );
    }
  }
);

/* ================= ADD SKILL ================= */

export const addSkillToProfile = createAsyncThunk(
  "profile/addSkillToProfile",
  async (skillData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const currentUser = state.profile.user;

      const updatedSkills = [
        ...(currentUser.skills || []),
        skillData
      ];

      const payload = {
        targetRole: currentUser.targetRole,
        skills: updatedSkills
      };

      const res = await updateProfile(payload);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Add skill failed"
      );
    }
  }
);

/* ================= DELETE SKILL ================= */

export const deleteSkillFromProfile =
  createAsyncThunk(
    "profile/deleteSkillFromProfile",
    async (skillName, thunkAPI) => {
      try {
        const state = thunkAPI.getState();

        const currentUser = state.profile.user;

        const updatedSkills =
          currentUser.skills.filter(
            (skill) => skill.name !== skillName
          );

        const payload = {
          targetRole: currentUser.targetRole,
          skills: updatedSkills
        };

        const res = await updateProfile(payload);

        return res;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Delete skill failed"
        );
      }
    }
  );

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    user: null,
    roles: [],

    loading: false,
    error: null
  },

  reducers: {
    setProfileData: (state, action) => {
      state.user = action.payload;
    },

    clearProfile: (state) => {
      state.user = null;
    }
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH PROFILE ===== */

      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.user =
          action.payload.user || action.payload;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ===== FETCH ROLES ===== */

      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload || [];
      })

      /* ===== UPDATE PROFILE ===== */

      .addCase(
        updateUserProfile.fulfilled,
        (state, action) => {
          state.user =
            action.payload.user ||
            action.payload;
        }
      )

      /* ===== ADD SKILL ===== */

      .addCase(
        addSkillToProfile.fulfilled,
        (state, action) => {
          state.user =
            action.payload.user ||
            action.payload;
        }
      )

      /* ===== DELETE SKILL ===== */

      .addCase(
        deleteSkillFromProfile.fulfilled,
        (state, action) => {
          state.user =
            action.payload.user ||
            action.payload;
        }
      );
  }
});

export const {
  setProfileData,
  clearProfile
} = profileSlice.actions;

export default profileSlice.reducer;