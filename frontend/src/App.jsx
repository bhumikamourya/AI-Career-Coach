import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardContainer from "./pages/DashboardContainer";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeBuilder from "./pages/ResumeBuilder";
import Practice from "./pages/Practice";
import Interview from "./pages/Interview";
import ProfilePage from "./pages/ProfilePage";
import TestHistory from "./pages/TestHistory";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardContainer />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice-history" element={<TestHistory />} />


        <Route path="/interview" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;