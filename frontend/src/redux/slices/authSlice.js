import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  getRoles
} from "../../services/api";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  token: localStorage.getItem("token") || null,

  roles: [],

  loading: false,
  error: null
};

/* ================= LOGIN ================= */

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginUser(data);

      localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ================= REGISTER ================= */

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerUser(data);

      localStorage.setItem("token", res.token);

      if (res.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );
      }

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);

/* ================= FETCH ROLES ================= */

export const fetchRoles = createAsyncThunk(
  "auth/fetchRoles",
  async (_, thunkAPI) => {
    try {
      const res = await getRoles();

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch roles"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    clearAuthError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      /* ===== LOGIN ===== */

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ===== REGISTER ===== */

      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        registerUserThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )

      .addCase(
        registerUserThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )

      /* ===== ROLES ===== */

      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;

        state.roles = action.payload;
      })

      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  }
});

export const { logout, clearAuthError } =
  authSlice.actions;

export default authSlice.reducer;