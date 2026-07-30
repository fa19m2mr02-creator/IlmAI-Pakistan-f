import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper for Gemini AI Client
  function getGenAIClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set. Please check system secrets.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API 1: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'IlmAI Pakistan Backend' });
  });

  // API 2: AI Tutor & Problem Solver
  app.post('/api/ai-tutor', async (req, res) => {
    try {
      const { subject, board, level, question, language } = req.body;

      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const ai = getGenAIClient();
      const prompt = `You are an expert Pakistani Academic Tutor specializing in ${board || 'FBISE'} curriculum, ${level || 'Matric/FSc'}, and subject ${subject || 'General STEM'}.
The student is asking: "${question}"
Language preference: ${language || 'English'}.

Respond in structured JSON with the following fields:
{
  "answer": "A clear, comprehensive direct answer explaining the core concept",
  "stepByStep": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
  "urduTranslation": "A full clear explanation of the answer in proper Urdu script (اردو)",
  "romanUrduTranslation": "Key points translated into natural Roman Urdu commonly used by Pakistani students (e.g., Pehle step mein hum formula lagayein gi...)",
  "keyFormulas": ["Formula 1", "Formula 2 (if applicable)"],
  "suggestedFollowups": ["Question 1", "Question 2"],
  "practiceProblem": {
    "question": "A practice numerical/conceptual question based on this topic for exam prep",
    "hint": "Hint to solve it",
    "answer": "Complete solution to the practice problem"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              answer: { type: Type.STRING },
              stepByStep: { type: Type.ARRAY, items: { type: Type.STRING } },
              urduTranslation: { type: Type.STRING },
              romanUrduTranslation: { type: Type.STRING },
              keyFormulas: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestedFollowups: { type: Type.ARRAY, items: { type: Type.STRING } },
              practiceProblem: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  hint: { type: Type.STRING },
                  answer: { type: Type.STRING },
                },
                required: ['question', 'hint', 'answer'],
              },
            },
            required: ['answer', 'stepByStep', 'urduTranslation', 'romanUrduTranslation', 'suggestedFollowups'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/ai-tutor:', err);
      return res.status(500).json({
        error: err.message || 'Failed to process AI Tutor query',
      });
    }
  });

  // API 3: Generate Practice Quiz
  app.post('/api/generate-quiz', async (req, res) => {
    try {
      const { board, level, subject, topic, questionCount = 5, language = 'English' } = req.body;

      const ai = getGenAIClient();
      const prompt = `Generate a ${questionCount}-question multiple-choice practice test for Pakistani students.
Board: ${board || 'FBISE / Punjab Board'}
Level: ${level || 'Matric / FSc'}
Subject: ${subject || 'Physics'}
Topic / Chapter: ${topic || 'General Revision'}
Language: ${language}

Generate questions matching real Pakistani exam standards (e.g. FBISE, MDCAT, NET NUST, ECAT, O/A Levels). Include both English and Urdu text for each question.

Return JSON in this exact structure:
{
  "questions": [
    {
      "id": "q1",
      "question": "Clear question text in English",
      "questionUrdu": "سوال اردو متن میں",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed step by step explanation why this option is correct",
      "explanationUrdu": "اردو میں وضاحت",
      "hint": "Helpful hint for student"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    questionUrdu: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    explanationUrdu: { type: Type.STRING },
                    hint: { type: Type.STRING },
                  },
                  required: ['id', 'question', 'options', 'correctIndex', 'explanation'],
                },
              },
            },
            required: ['questions'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/generate-quiz:', err);
      return res.status(500).json({ error: err.message || 'Failed to generate quiz' });
    }
  });

  // API 4: Concept Simplifier (Urdu + Pakistani Analogies)
  app.post('/api/explain-concept', async (req, res) => {
    try {
      const { concept, level = 'Matric / FSc', language = 'Bilingual' } = req.body;

      if (!concept) {
        return res.status(400).json({ error: 'Concept name is required' });
      }

      const ai = getGenAIClient();
      const prompt = `Explain the educational concept "${concept}" for a Pakistani student (${level}).
Use intuitive everyday Pakistani analogies (e.g., cricket bowling spin, rickshaw mechanics, making chai, Lahore traffic, local shopping markets, electricity load shedding physics, internet bandwidth, etc.).

Return JSON:
{
  "title": "${concept}",
  "simpleSummary": "In simple 2-3 sentences explain what it is in clear English",
  "urduSummary": "سادہ ترین الفاظ میں اردو ترجمہ اور وضاحت",
  "keyPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
  "pakistanAnalogy": "Relatable Pakistani story or analogy connecting this concept to daily life in Pakistan",
  "realWorldApplication": "How this concept is used in modern technology or engineering in Pakistan & globally",
  "commonMistakes": ["Mistake students make in exam", "Another mistake"],
  "practiceQuestion": {
    "question": "Test question to check understanding",
    "answer": "Correct answer"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              simpleSummary: { type: Type.STRING },
              urduSummary: { type: Type.STRING },
              keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              pakistanAnalogy: { type: Type.STRING },
              realWorldApplication: { type: Type.STRING },
              commonMistakes: { type: Type.ARRAY, items: { type: Type.STRING } },
              practiceQuestion: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING },
                },
                required: ['question', 'answer'],
              },
            },
            required: ['title', 'simpleSummary', 'keyPoints', 'pakistanAnalogy', 'realWorldApplication', 'commonMistakes'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/explain-concept:', err);
      return res.status(500).json({ error: err.message || 'Failed to explain concept' });
    }
  });

  // API 5: Pakistani AI Career & University Roadmap
  app.post('/api/career-roadmap', async (req, res) => {
    try {
      const { currentLevel, interestArea, location = 'Pakistan' } = req.body;

      const ai = getGenAIClient();
      const prompt = `Act as an expert career counselor and tech mentor in Pakistan.
Student profile:
Current Academic Level: ${currentLevel || 'FSc / ICS'}
Field of Interest: ${interestArea || 'Artificial Intelligence & Software Engineering'}
Target Location: ${location}

Provide a comprehensive, actionable career roadmap tailored to the Pakistani ecosystem (NUST, FAST, LUMS, GIKI, COMSATS, ITU, UET, MDCAT/ECAT, freelancing on Upwork/Fiverr, Pakistani startups, and global remote AI jobs).

Return JSON:
{
  "targetRole": "${interestArea} Specialist",
  "overview": "Encouraging summary of the career landscape in Pakistan and globally",
  "topUniversitiesInPakistan": [
    {
      "name": "University Name (e.g., FAST-NUCES Islamabad/Lahore)",
      "location": "City",
      "entryTest": "Entry Test required (e.g. FAST Entry Test / NUST NET)",
      "recommendation": "Why it is great for this field"
    }
  ],
  "skillMilestones": [
    {
      "phase": "Phase 1: Months 1-3",
      "title": "Foundation & Core Skills",
      "duration": "3 Months",
      "skills": ["Skill 1", "Skill 2", "Skill 3"],
      "freeResources": ["Resource 1", "Resource 2"]
    }
  ],
  "freelanceOpportunities": ["How to earn in PKR/USD on Fiverr/Upwork in this niche", "Tip 2"],
  "pakistanTechHubs": ["Key cities and software houses in Lahore, Islamabad, Karachi"],
  "aiAdvice": "Pro advice on using AI to learn faster and stand out in university & jobs"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              targetRole: { type: Type.STRING },
              overview: { type: Type.STRING },
              topUniversitiesInPakistan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    location: { type: Type.STRING },
                    entryTest: { type: Type.STRING },
                    recommendation: { type: Type.STRING },
                  },
                  required: ['name', 'location', 'entryTest', 'recommendation'],
                },
              },
              skillMilestones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    title: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    freeResources: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['phase', 'title', 'duration', 'skills', 'freeResources'],
                },
              },
              freelanceOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              pakistanTechHubs: { type: Type.ARRAY, items: { type: Type.STRING } },
              aiAdvice: { type: Type.STRING },
            },
            required: ['targetRole', 'overview', 'topUniversitiesInPakistan', 'skillMilestones', 'freelanceOpportunities', 'aiAdvice'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/career-roadmap:', err);
      return res.status(500).json({ error: err.message || 'Failed to generate career roadmap' });
    }
  });

  // Vite middleware setup for dev vs production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
