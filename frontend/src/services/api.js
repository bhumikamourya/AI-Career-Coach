import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/user/profile");
export const updateProfile = (data) => API.put("/user/profile", data);
export const getSkillGap = () => API.get("/skill-gap");
export const getRoadmap = () => API.get("/roadmap");
export const uploadResume = (formData) =>
  API.post("/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  export const saveResume = (data) => API.post("/resume-builder", data);
export const getResume = () => API.get("/resume-builder");