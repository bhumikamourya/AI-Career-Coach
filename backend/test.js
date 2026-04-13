require("dotenv").config(); // 🔥 MUST BE FIRST LINE
const axios = require("axios");

(async () => {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    console.log(res.data.models.map(m => m.name));
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
})();