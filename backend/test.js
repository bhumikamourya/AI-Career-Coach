// require("dotenv").config();

// const axios = require("axios");

// const API_KEY =
//   process.env.GEMINI_KEY_1;

// (async () => {

//   try {

//     console.log("🚀 CHECKING AVAILABLE MODELS...\n");

//     const res = await axios.get(
//       `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`
//     );

//     const models =
//       res.data.models || [];

//     console.log("✅ AVAILABLE MODELS:\n");

//     models.forEach((m) => {
//       console.log(m.name);
//     });

//   } catch (err) {

//     console.log("❌ ERROR\n");

//     console.log(
//       err.response?.data ||
//       err.message
//     );
//   }

// })();