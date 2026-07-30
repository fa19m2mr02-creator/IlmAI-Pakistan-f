# 🇵🇰 IlmAI Pakistan (علم AI) — AI-Powered Education & Tech Career Platform

[![Live Website](https://img.shields.io/badge/Live%20Site-ilm--ai--pakistan--f.vercel.app-10b981?style=for-the-badge&logo=vercel)](https://ilm-ai-pakistan-f.vercel.app/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-3.6%20Flash-8e7cc3?style=for-the-badge&logo=google)](https://ai.google.dev/)

**IlmAI Pakistan (علم AI)** is an intelligent, curriculum-aligned educational platform built to democratize high-quality AI tutoring, exam preparation, and tech career mentorship for over 60 million students across Pakistan.

Designed specifically for Pakistani educational boards (**FBISE Federal Board, Punjab BISE, Sindh BIEK, KPK Board, Cambridge O/A Levels, and MDCAT/ECAT Entrance Tests**), IlmAI breaks language and financial barriers by providing instant bilingual step-by-step problem-solving in **English, Urdu (اردو script), and Roman Urdu**.

---

## 🚀 Live Demo & Screenshot

- **Live Application**: [https://ilm-ai-pakistan-f.vercel.app/](https://ilm-ai-pakistan-f.vercel.app/)

![IlmAI Pakistan Application Screenshot](./public/app_screenshot.jpg)

---

## ✨ Key Features

### 1. 🤖 AI Academic Tutor & Problem Solver (`/api/ai-tutor`)
- **Curriculum-Matched Guidance**: Custom tailored for FBISE, Punjab, Sindh, KPK, O/A Levels, and MDCAT/ECAT.
- **Multilingual Explanations**: Generates step-by-step solutions, key formulas, Urdu script translations, and Roman Urdu notes for intuitive understanding.
- **Interactive Speech Synthesis**: Read solutions aloud for auditory learners.
- **Practice Generator**: Auto-generates follow-up exam-style practice problems with hints and complete answers.

### 2. 📝 Custom MCQ Quiz Generator (`/api/generate-quiz`)
- **Exam-Standard Practice**: Generates 3, 5, or 10 question multiple-choice tests matching real Pakistani board past-paper standards.
- **Dual Script Questions**: Includes both English and full Urdu script for every question.
- **Instant AI Feedback**: Explains why choices are correct or incorrect with step-by-step reasoning.

### 3. 💡 Bilingual Concept Simplifier (`/api/explain-concept`)
- **Pakistani Real-World Analogies**: Explains complex scientific and tech concepts (e.g., Neural Networks, Quantum Mechanics, Faraday's Law) using relatable local examples (Cricket spin bowling, Rickshaw engines, Lahore traffic flow, making Chai).
- **Pitfall Alerts**: Highlights common mistakes Pakistani students make in board examinations.

### 4. 🧭 AI University & Career Guidance (`/api/career-roadmap`)
- **Pakistani University Entry Test Guide**: Tailored recommendations for admission into top institutions like **NUST (NET), FAST-NUCES, LUMS, GIKI, COMSATS, UET, and Medical Colleges (MDCAT)**.
- **Step-by-Step Learning Milestones**: Actionable month-by-month skill roadmaps for high-growth tech careers (AI Engineering, Web Development, Data Science, Cybersecurity).
- **Freelance & Tech Hub Insights**: Actionable guidance for earning on Upwork/Fiverr in PKR/USD and finding opportunities in Lahore, Islamabad, and Karachi tech hubs.

### 5. 💻 Interactive Micro-Courses (`/src/components/MicroCoursesTab.tsx`)
- **Hands-on AI & Python Sandbox**: In-browser Python code execution for beginner Pakistani programmers.
- **Bilingual Modules**: Concise lessons accompanied by Urdu summaries and knowledge-check quizzes.

### 6. 🎓 Pakistani & Global Scholarships (`/src/components/ScholarshipsTab.tsx`)
- **Centralized Directory**: HEC Need-Based Grants, PEEF (Punjab Educational Endowment Fund), Ehsaas Program, USEFP Fulbright (USA), and Erasmus Mundus (Europe).
- **AI Eligibility Checklist**: Instant requirement check for domicile, marks, and financial need criteria.

---

## 🛠️ Tech Stack & Architecture

IlmAI Pakistan is built with a **Full-Stack Express + Vite TypeScript** architecture, ensuring secure server-side proxying of all Gemini AI API keys.

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons.
- **Backend API**: Node.js, Express, `tsx`, `@google/genai` (Gemini 3.6 Flash).
- **Build & Bundle System**: Vite, `esbuild` (standalone CommonJS server bundle in `dist/server.cjs`).
- **Typography**: Google Fonts (*Plus Jakarta Sans* for UI, *Noto Naskh Arabic* for Urdu typography).

---

## 📁 Repository Structure

```
├── .env.example                     # Environment variables schema
├── index.html                       # Entry HTML with custom Urdu & sans fonts
├── metadata.json                    # Application capabilities & metadata
├── package.json                     # Scripts and dependencies
├── server.ts                        # Express backend server with Gemini API routes
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
└── src/
    ├── App.tsx                      # Main application shell and tab router
    ├── main.tsx                     # React root mount
    ├── index.css                    # Tailwind CSS v4 configuration & font utility classes
    ├── types.ts                     # Shared TypeScript interfaces & types
    ├── data/
    │   └── pakistanCurriculum.ts    # Preset Pakistani boards, topics, micro-courses, & scholarships
    └── components/
        ├── Navbar.tsx               # Board indicator & language mode switcher (EN / Urdu / Roman Urdu)
        ├── Hero.tsx                 # Board & grade selection hero banner
        ├── AITutorTab.tsx           # Step-by-step problem solver component
        ├── QuizGeneratorTab.tsx     # Practice test generator component
        ├── BilingualExplainerTab.tsx# Concept simplifier with local analogies
        ├── CareerRoadmapTab.tsx     # University admission & career roadmap component
        ├── MicroCoursesTab.tsx      # Python sandbox & micro-course player
        ├── ScholarshipsTab.tsx      # Scholarship directory with eligibility modal
        └── Footer.tsx               # Platform credits and board directory footer
```

---

## ⚙️ Getting Started (Local Development)

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Google Gemini API Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ilm-ai-pakistan.git
   cd ilm-ai-pakistan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root (refer to `.env.example`):
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

---

## 📡 API Endpoints Reference

The backend exposes the following server-side routes:

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Server health check endpoint |
| `/api/ai-tutor` | `POST` | Generates step-by-step solutions with formulas, Urdu, and practice questions |
| `/api/generate-quiz` | `POST` | Generates dual-language MCQs matching Pakistani board standards |
| `/api/explain-concept` | `POST` | Simplifies concepts using relatable Pakistani analogies & exam pitfall warnings |
| `/api/career-roadmap` | `POST` | Generates university admission & tech career roadmaps tailored for Pakistan |

---

## 📦 Production Deployment

### Building for Production
To generate production-ready static assets and the bundled Express server:

```bash
npm run build
```

This compiles:
1. Client static files to `dist/` via Vite.
2. Server entry file to `dist/server.cjs` via `esbuild`.

### Running Production Server
```bash
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! If you would like to add more Pakistani educational board past papers, local micro-courses, or additional language support:

1. Fork the Repository.
2. Create a feature branch (`git checkout -b feature/board-enhancement`).
3. Commit your changes (`git commit -m 'Add Sindh Board Class 10 Physics Presets'`).
4. Push to the Branch (`git push origin feature/board-enhancement`).
5. Open a Pull Request.

---

## 📜 License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

---

<p align="center">
  <b>IlmAI Pakistan</b> — Built with ❤️ for the youth of Pakistan 🇵🇰
</p>
