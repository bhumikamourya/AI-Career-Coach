import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ================= REQUEST INTERCEPTOR ================= */

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* ================= AUTH ================= */

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);

  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);

  return res.data;
};

export const updatePassword = async (data) => {
  const res = await API.put(
    "/user/update-password",
    data
  );

  return res.data;
};

/* ================= ROLES ================= */

export const getRoles = async () => {
  const res = await API.get("/roles");

  return res.data;
};

/* ================= PROFILE ================= */

export const getProfile = async () => {
  const res = await API.get("/user/profile");

  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put(
    "/user/profile",
    data
  );

  return res.data;
};

/* ================= RESUME ================= */

export const uploadResume = async (
  formData
) => {
  const res = await API.post(
    "/resume",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const saveResume = async (data) => {
  const res = await API.post(
    "/resume-builder",
    data
  );

  return res.data;
};

export const getResume = async () => {
  const res = await API.get(
    "/resume-builder"
  );

  return res.data;
};

/* ================= PRACTICE ================= */

/* GET QUESTIONS */

export const generatePracticeQuestions =
  async () => {
    const res = await API.get(
      "/practice"
    );

    return res.data;
  };

/* SUBMIT ANSWERS */

export const submitPracticeAnswers =
  async (data) => {
    const res = await API.post(
      "/practice/submit",
      data
    );

    return res.data;
  };

/* SAVE SINGLE ANSWER */

export const saveAnswer = async (data) => {
  const res = await API.post(
    "/practice/save",
    data
  );

  return res.data;
};

/* TEST HISTORY */

export const getTestHistory = async () => {
  const res = await API.get(
    "/practice/history"
  );

  return res.data;
};

/* ================= PROGRESS ================= */

export const markProgress = async (
  data
) => {
  const res = await API.post(
    "/progress/complete",
    data
  );

  return res.data;
};

/* ================= DASHBOARD ================= */

export const getDashboardData =
  async () => {
    const res = await API.get(
      "/user/dashboard"
    );

    return res.data;
  };

/* ================= INTERVIEW ================= */

export const generateInterview =
  async (data) => {
    const res = await API.post(
      "/interview",
      data
    );

    return res.data;
  };

export const submitInterview =
  async (data) => {
    const res = await API.post(
      "/interview/submit",
      data
    );

    return res.data;
  };

export const evaluate = async (data) => {
  const res = await API.post(
    "/interview/evaluate",
    data
  );

  return res.data;
};

/* ================= RESPONSE INTERCEPTOR ================= */

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

export default API;