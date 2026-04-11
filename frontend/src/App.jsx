import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeBuilder from "./pages/ResumeBuilder";
import Practice from "./pages/Practice";
import Interview from "./pages/Interview";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Dashboard />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/practice" element={<Practice />} />

        <Route path="/interview" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;