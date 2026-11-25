# AI-Based Career Coach & Interview Preparation Platform

## About the Project

AI-Based Career Coach is a web application built to help students prepare for placement opportunities.

Students often find it difficult to decide what to learn, which skills they need to improve, and how to track their preparation. This project tries to make that process easier by analyzing a user's skills, identifying gaps based on their target role, and suggesting a learning roadmap.

It also provides practice modules, mock tests, AI-based interview preparation, and a dashboard to track progress.

## Features

- **User Authentication:** Register and log in to access the platform.
- **Resume Upload:** Upload your resume for skill analysis.
- **Resume Builder:** Create and manage your resume.
- **Skill Gap Analysis:** Identify skills that need improvement based on your selected role.
- **Learning Roadmap:** Get a roadmap based on your skill gaps.
- **Practice:** Work on placement preparation topics.
- **Mock Tests:** Test your knowledge and track your performance.
- **AI Mock Interview:** Practice interview questions and get AI-assisted feedback.
- **Dashboard:** View your readiness score, current preparation stage, and progress.
- **Progress Tracking:** Keep track of your preparation over time.

## How It Works

1. Create an account and complete your profile.
2. Add your skills or upload your resume.
3. Select the role you want to prepare for.
4. Get your skill analysis and identify areas that need improvement.
5. Follow the suggested learning roadmap.
6. Practice and attempt mock tests.
7. Use the AI interview feature for interview preparation.
8. Track your progress through the dashboard.

## Technologies Used

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- Framer Motion
- Recharts
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Multer
- Axios

**AI Integration**
- Google Gemini API

**Tools**
- Git and GitHub
- Postman
- VS Code

## Project Structure

```text
AI-Career-Coach/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── ...
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB connection
- Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/bhumikamourya/AI-Career-Coach.git
cd AI-Career-Coach
```

### 2. Set Up the Backend

```bash
cd backend
npm ci
```

Start the backend:

```bash
npm run dev
```

The backend runs on `http://localhost:5000`.

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm ci
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL shown in the terminal. By default, Vite uses `http://localhost:5173`.

## API Routes

| Module | Endpoint |
|---|---|
| Authentication | `/api/auth` |
| User | `/api/user` |
| Roles | `/api/roles` |
| Resume | `/api/resume` |
| Resume Builder | `/api/resume-builder` |
| Practice | `/api/practice` |
| Progress | `/api/progress` |
| Interview | `/api/interview` |

## Future Improvements

- Voice and video-based mock interviews.
- More detailed interview evaluation.
- Company-specific preparation.
- Better performance analysis and feedback.

## Author

**Bhumika Mourya**

Software Engineer | Full Stack Developer (MERN)

[GitHub Profile](https://github.com/bhumikamourya)