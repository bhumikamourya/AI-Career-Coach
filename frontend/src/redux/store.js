import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import profileReducer from "./slices/profileSlice";
import practiceReducer from "./slices/practiceSlice";
import interviewReducer from "./slices/interviewSlice";
import resumeReducer from "./slices/resumeSlice";
import historyReducer from "./slices/historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
    practice: practiceReducer,
    interview: interviewReducer,
    resume: resumeReducer,
    history: historyReducer
  }
});