export type EducationBoard =
  | 'FBISE (Federal)'
  | 'Punjab Board (BISE)'
  | 'Sindh Board (BIEK/BSEK)'
  | 'KPK Board'
  | 'Balochistan Board'
  | 'O / A Levels (Cambridge/Edexcel)'
  | 'University / Tech / Professional';

export type LevelCategory =
  | 'Matric (9th & 10th)'
  | 'FSc Pre-Engineering (11th & 12th)'
  | 'FSc Pre-Medical (11th & 12th)'
  | 'ICS (Computer Science)'
  | 'O Levels / IGCSE'
  | 'A Levels'
  | 'MDCAT / ECAT / Entry Test'
  | 'AI & Software Engineering';

export type LanguageMode = 'English' | 'Urdu (اردو)' | 'Roman Urdu';

export interface SubjectItem {
  id: string;
  name: string;
  icon: string;
  gradeLevels: string[];
}

export interface PresetTopic {
  title: string;
  subject: string;
  level: string;
  prompt: string;
  urduPrompt?: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionUrdu?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationUrdu?: string;
  hint?: string;
}

export interface QuizConfig {
  board: EducationBoard;
  level: LevelCategory;
  subject: string;
  topic: string;
  questionCount: number;
  language: LanguageMode;
}

export interface AIExplanationResult {
  title: string;
  simpleSummary: string;
  urduSummary?: string;
  keyPoints: string[];
  pakistanAnalogy: string;
  realWorldApplication: string;
  commonMistakes: string[];
  practiceQuestion: {
    question: string;
    answer: string;
  };
}

export interface TutorResponse {
  answer: string;
  stepByStep: string[];
  urduTranslation?: string;
  romanUrduTranslation?: string;
  keyFormulas?: string[];
  suggestedFollowups: string[];
  practiceProblem?: {
    question: string;
    hint: string;
    answer: string;
  };
}

export interface CareerRoadmapResponse {
  targetRole: string;
  overview: string;
  topUniversitiesInPakistan: {
    name: string;
    location: string;
    entryTest: string;
    recommendation: string;
  }[];
  skillMilestones: {
    phase: string;
    title: string;
    duration: string;
    skills: string[];
    freeResources: string[];
  }[];
  freelanceOpportunities: string[];
  pakistanTechHubs: string[];
  aiAdvice: string;
}

export interface MicroCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  modules: {
    title: string;
    content: string;
    urduSummary: string;
    codeExample?: string;
    quizQuestion: {
      question: string;
      options: string[];
      answer: number;
    };
  }[];
}

export interface ScholarshipItem {
  title: string;
  organization: string;
  coverage: string;
  targetLevel: string;
  deadline: string;
  eligibility: string;
  linkText: string;
  category: 'Local' | 'International' | 'Government' | 'Need-Based';
}
