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

//USER
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = (data) => API.post("/auth/login", data);
export const updatePassword = (data) =>API.put("/user/update-password", data);

//ROLES
export const getRoles = () => API.get("/roles");

//PROFILE
export const getProfile = () => API.get("/user/profile");
export const updateProfile = (data) => API.put("/user/profile", data);

//RESUME
export const uploadResume = (formData) =>
  API.post("/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  export const saveResume = (data) => API.post("/resume-builder", data);
export const getResume = () => API.get("/resume-builder");

//PRACTICE TEST
export const getQuestions = () => API.get("/practice");
export const submitAnswers = (data) => API.post("/practice/submit", data);
export const saveAnswer = (data) => API.post("/practice/save", data);
export const getTestHistory = () => API.get("/practice/history");


//PROGRESS
export const markProgress = (data) => API.post("/progress/complete", data);

//READ DASHBOARD
export const getDashboardData = () => API.get("/user/dashboard");

//INTERVIEW
export const evaluate = (data) => API.post("/interview/evaluate", data);


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