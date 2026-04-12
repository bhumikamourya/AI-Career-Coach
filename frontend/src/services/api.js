import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const updatePassword = (data) =>API.put("/user/update-password", data);

export const getRoles = () => API.get("/roles");
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

export const getQuestions = () => API.get("/practice");
export const submitAnswers = (data) => API.post("/practice/submit", data);
export const markProgress = (data) => API.post("/progress/complete", data);


API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);