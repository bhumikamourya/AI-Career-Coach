const { askAI } = require("./ai.Service");

// FALLBACK QUESTIONS

const fallbackQuestions = [
  "What is React.memo?",
  "Difference between SQL and NoSQL?",
  "What is JWT authentication?",
  "How would you debug a slow API?",
  "How does Redux Toolkit improve Redux?",
  "How would you optimize MongoDB queries?",
  "A user reports duplicate orders after payment. How would you debug it?",
  "How would you secure a Node.js API?"
];

// CLEAN JSON ARRAY PARSER

function extractJSONArray(text) {

  try {

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const first = cleaned.indexOf("[");
    const last = cleaned.lastIndexOf("]");

    if (first === -1 || last === -1) {
      return null;
    }

    let jsonString = cleaned.slice(first, last + 1);

    jsonString = jsonString.replace(
      /[\u0000-\u0019]+/g,
      ""
    );

    return JSON.parse(jsonString);

  } catch (err) {

    console.log("❌ ARRAY PARSE FAILED");

    console.log(err.message);

    return null;
  }
}

// CLEAN JSON OBJECT PARSER

function extractJSONObject(text) {

  try {

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("🧹 CLEANED OBJECT RESPONSE:");
    console.log(cleaned);

    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");

    if (first === -1 || last === -1) {

      console.log("❌ JSON OBJECT NOT FOUND");

      return null;
    }

    let jsonString = cleaned.slice(first, last + 1);

    jsonString = jsonString.replace(
      /[\u0000-\u0019]+/g,
      ""
    );

    console.log("📦 FINAL JSON STRING:");
    console.log(jsonString);

    const parsed = JSON.parse(jsonString);

    console.log("✅ JSON PARSED SUCCESS");

    return parsed;

  } catch (err) {

    console.log("❌ OBJECT PARSE FAILED");

    console.log(err);

    return null;
  }
}

// QUESTION PROMPT

function buildInterviewPrompt(
  role,
  skills,
  readiness = 50
) {

  const level =
    readiness >= 80
      ? "Advanced"
      : readiness >= 60
        ? "Intermediate"
        : "Beginner";

  return `
Act as a software engineer interviewer from top tech companies.

Role: ${role}

Level: ${level}

Skills:
${skills.join(", ")}

Generate EXACTLY 8 interview questions.

Distribution:
- 2 short questions
- 3 medium questions
- 3 scenario-based questions

Rules:
- technical
- concise
- practical
- modern
- role-specific
- debugging-focused
- avoid theory-only questions
- avoid repeated concepts
- avoid long paragraphs

IMPORTANT:
- short questions under 1 line
- medium questions under 2 lines
- scenario questions under 4 lines
- return ONLY valid JSON array
- no markdown
- no code block

Example:
[
  "What is React.memo?",
  "How does JWT authentication work?",
  "How would you debug a slow API?"
]
`;
}

// GENERATE QUESTIONS

exports.generateQuestions = async (
  role,
  skills = [],
  readiness = 50
) => {

  try {

    console.log("🤖 GENERATING QUESTIONS");

    const prompt = buildInterviewPrompt(
      role,
      skills,
      readiness
    );

    const response = await askAI(prompt);

    console.log("🧠 RAW QUESTION RESPONSE:");
    console.log(response);

    const parsed = extractJSONArray(response);

    if (
      parsed &&
      Array.isArray(parsed) &&
      parsed.length >= 5
    ) {

      console.log("✅ AI QUESTIONS SUCCESS");

      return parsed.slice(0, 8);
    }

    console.log("⚠️ FALLBACK QUESTIONS USED");

    return fallbackQuestions;

  } catch (err) {

    console.log("❌ QUESTION GENERATION ERROR");

    console.log(err.message);

    return fallbackQuestions;
  }
};

// EVALUATE ANSWERS

exports.evaluateAnswers = async (qaList) => {

  try {

    console.log("🤖 AI EVALUATION STARTED");

    const cleanedQA = qaList.map((item) => {

      const answer = item.answer?.trim() || "";

      const isGibberish =
        answer.length < 3 ||
        /^[a-zA-Z]{1,6}$/.test(answer) ||
        /^(asdf|qwer|test|abc|aaa|bbb|ccc|ddd)$/i.test(answer);

      return {
        question: item.question,
        answer: isGibberish
          ? "No meaningful answer"
          : answer
      };
    });

    const compactQA = cleanedQA.map(
      (item, index) => `
Q${index + 1}: ${item.question}

A: ${item.answer}
`
    ).join("\n");

const prompt = `
Act as a senior software engineer interviewer.

Evaluate these interview answers.

${compactQA}

Rules:
- short feedback
- short correct answer
- correctAnswer under 40 words
- valid JSON only
- no markdown

FORMAT:

{
  "feedback": [
    {
      "question": "Question",
      "answer": "User answer",
      "feedback": "Technical feedback",
      "correctAnswer": "Ideal answer"
    }
  ]
}
`;

    const response = await askAI(prompt);

    console.log("🧠 RAW AI RESPONSE:");
    console.log(response);

    const parsed = extractJSONObject(response);

    // VALIDATION

    if (
      parsed &&
      Array.isArray(parsed.feedback)
    ) {

      const validFeedback = parsed.feedback.map((item, index) => ({
        question:
          item.question ||
          cleanedQA[index]?.question ||
          "Question",

        answer:
          item.answer ||
          cleanedQA[index]?.answer ||
          "",

        feedback:
          item.feedback ||
          "No feedback generated.",

        correctAnswer:
          item.correctAnswer ||
          "No ideal answer generated."
      }));

      let score = 0;

validFeedback.forEach((item) => {

  const feedback =
    item.feedback.toLowerCase();

  // STRONG ANSWER
  if (
    feedback.includes("good") ||
    feedback.includes("correct") ||
    feedback.includes("strong")
  ) {
    score += 12.5;
  }

  // PARTIAL ANSWER
  else if (
    feedback.includes("decent") ||
    feedback.includes("partial")
  ) {
    score += 7;
  }

  // WEAK ANSWER
  else {
    score += 2;
  }
});

const interviewScore = Math.min(
  100,
  Math.round(score)
);

return {
  feedback: validFeedback,
  interviewScore
};
    }

    throw new Error("Invalid AI JSON");

  } catch (err) {

    console.log("❌ EVALUATION ERROR");
    console.log(err.message);

    return {
      feedback: qaList.map((item) => {

        const answer = item.answer || "";

        if (!answer.trim()) {

          return {
            question: item.question,
            answer: "",
            feedback:
              "No answer submitted.",
            correctAnswer:
              "Provide a structured technical explanation with examples."
          };
        }

        if (answer.length < 20) {

          return {
            question: item.question,
            answer,
            feedback:
              "Answer is too short and lacks technical depth.",
            correctAnswer:
              "Include implementation details, architecture, and practical examples."
          };
        }

        return {
          question: item.question,
          answer,
          feedback:
            "Decent attempt but missing deeper technical clarity.",
          correctAnswer:
            "Explain the concept with optimization, scalability, and debugging considerations."
        };
      })
    };
  }
};