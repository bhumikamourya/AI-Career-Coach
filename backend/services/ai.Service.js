require("dotenv").config();

const axios = require("axios");

// API KEYS

const keys = [
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3
].filter(Boolean);

if (!keys.length) {
  throw new Error("❌ No Gemini API keys found");
}

// MODELS

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash"
];

// KEY USAGE TRACKING

let keyIndex = 0;

// temporarily blocked keys
const blockedKeys = new Map();

/*
blockedKeys structure:

{
  API_KEY : unblockTimestamp
}
*/

// GET AVAILABLE KEY

function getAvailableKey() {
  const now = Date.now();

  for (let i = 0; i < keys.length; i++) {

    const index = (keyIndex + i) % keys.length;

    const key = keys[index];

    const blockedUntil = blockedKeys.get(key);

    // skip blocked key
    if (blockedUntil && blockedUntil > now) {
      continue;
    }

    keyIndex = (index + 1) % keys.length;

    return key;
  }

  return null;
}

// WAIT FUNCTION

function wait(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

// EXTRACT RETRY TIME

function extractRetryTime(message) {

  if (!message) return 15000;

  const match = message.match(
    /retry in ([\d.]+)s/i
  );

  if (match && match[1]) {
    return Math.ceil(
      parseFloat(match[1]) * 1000
    );
  }

  return 15000;
}

// GEMINI CALL

async function callGemini(
  prompt,
  retry = 0
) {

  // max retries
  if (retry >= 3) {
    throw new Error(
      "❌ All Gemini retries failed"
    );
  }

  // get working key
  const key = getAvailableKey();

  // if all keys blocked
  if (!key) {

    console.log(
      "⏳ All keys are temporarily blocked..."
    );

    await wait(20000);

    return callGemini(
      prompt,
      retry + 1
    );
  }

  // rotate model
  const model =
    MODELS[retry % MODELS.length];

  console.log("🤖 AI CALL STARTED");
  console.log("MODEL:", model);
  console.log("RETRY:", retry);

  try {

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${key}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],

        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          maxOutputTokens: 2048
        }
      },
      {
        timeout: 45000
      }
    );

    const text =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("✅ AI SUCCESS");

    if (!text.trim()) {
      throw new Error(
        "Empty AI response"
      );
    }

    return text;

  } catch (err) {

    console.log("❌ GEMINI ERROR");

    const errorData =
      err.response?.data || err.message;

    console.log(errorData);

    // HANDLE 429 QUOTA ERROR
    if (
      err.response?.status === 429
    ) {

      const retryAfter =
        extractRetryTime(
          errorData?.error?.message
        );

      // block current key
      blockedKeys.set(
        key,
        Date.now() + retryAfter
      );

      await wait(retryAfter);

      return callGemini(
        prompt,
        retry + 1
      );
    }

    // HANDLE SERVER ERRORS

    if (
      err.response?.status >= 500
    ) {


      await wait(3000);

      return callGemini(
        prompt,
        retry + 1
      );
    }

    // HANDLE TIMEOUT

    if (
      err.code === "ECONNABORTED"
    ) {

      await wait(2000);

      return callGemini(
        prompt,
        retry + 1
      );
    }

    // OTHER ERRORS

    if (retry < 5) {

      await wait(2000);

      return callGemini(
        prompt,
        retry + 1
      );
    }

    throw err;
  }
}

// EXPORTS

exports.askAI = callGemini;