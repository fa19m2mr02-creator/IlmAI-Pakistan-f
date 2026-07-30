import { EducationBoard, LevelCategory, PresetTopic, MicroCourse, ScholarshipItem } from '../types';

export const EDUCATION_BOARDS: EducationBoard[] = [
  'FBISE (Federal)',
  'Punjab Board (BISE)',
  'Sindh Board (BIEK/BSEK)',
  'KPK Board',
  'Balochistan Board',
  'O / A Levels (Cambridge/Edexcel)',
  'University / Tech / Professional',
];

export const LEVEL_CATEGORIES: LevelCategory[] = [
  'Matric (9th & 10th)',
  'FSc Pre-Engineering (11th & 12th)',
  'FSc Pre-Medical (11th & 12th)',
  'ICS (Computer Science)',
  'O Levels / IGCSE',
  'A Levels',
  'MDCAT / ECAT / Entry Test',
  'AI & Software Engineering',
];

export const SUBJECT_OPTIONS: Record<LevelCategory, string[]> = {
  'Matric (9th & 10th)': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English', 'Urdu'],
  'FSc Pre-Engineering (11th & 12th)': ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
  'FSc Pre-Medical (11th & 12th)': ['Biology', 'Physics', 'Chemistry', 'English'],
  'ICS (Computer Science)': ['Computer Science', 'Mathematics', 'Physics', 'Statistics', 'Economics'],
  'O Levels / IGCSE': ['Physics (5054)', 'Chemistry (5070)', 'Math D (4024)', 'Additional Math (4037)', 'Computer Science (2210)', 'Biology (5090)'],
  'A Levels': ['Physics (9702)', 'Chemistry (9701)', 'Mathematics (9709)', 'Further Math (9231)', 'Computer Science (9618)', 'Biology (9700)'],
  'MDCAT / ECAT / Entry Test': ['NET (NUST Entrance Test)', 'FAST Entry Test', 'MDCAT Biology & Chemistry', 'ECAT Math & Physics', 'UET Admission Test', 'GIKI / LUMS LCAT'],
  'AI & Software Engineering': ['Python Programming', 'Machine Learning Basics', 'Generative AI & LLMs', 'Data Structures & Algorithms', 'Prompt Engineering', 'Web Development'],
};

export const PRESET_TOPICS: PresetTopic[] = [
  {
    title: 'Newton’s Second Law & Momentum (FSc Physics)',
    subject: 'Physics',
    level: 'FSc Pre-Engineering (11th & 12th)',
    category: 'Physics',
    prompt: 'Explain Newton’s Second Law of Motion F = ma and linear momentum conservation with numerical examples typical of FBISE Class 11 Physics exam.',
    urduPrompt: 'نیوٹن کا حرکت کا دوسرا قانون اور موومینٹم کی وضاحت ایف ایس سی فزکس کے مطابق کریں۔',
  },
  {
    title: 'Quadratic Equations & Discriminant (Matric Math)',
    subject: 'Mathematics',
    level: 'Matric (9th & 10th)',
    category: 'Math',
    prompt: 'Solve quadratic equation 2x^2 - 5x + 3 = 0 using quadratic formula and explain the nature of roots using the discriminant b^2 - 4ac.',
    urduPrompt: 'دو درجی مساوات کے حل اور ڈسکریمیننٹ کی آسان الفاظ میں وضاحت کریں۔',
  },
  {
    title: 'Cellular Respiration & ATP Production (FSc Bio / MDCAT)',
    subject: 'Biology',
    level: 'FSc Pre-Medical (11th & 12th)',
    category: 'Biology',
    prompt: 'Explain Glycolysis, Krebs Cycle, and Electron Transport Chain with total ATP yield for MDCAT biology revision.',
    urduPrompt: 'سیلولر ریسپیریشن اور اے ٹی پی کی پیداوار کی مرحلہ وار وضاحت۔',
  },
  {
    title: 'Arrays vs Linked Lists (ICS / Computer Science)',
    subject: 'Computer Science',
    level: 'ICS (Computer Science)',
    category: 'CS',
    prompt: 'Compare Arrays and Linked Lists in C++/Python in terms of memory layout, time complexity for insertion/deletion, and code snippets.',
    urduPrompt: 'ایرے اور لنکڈ لسٹ کا موازنہ کریں اور ٹائم کمپلیکسٹی بیان کریں۔',
  },
  {
    title: 'Python Neural Networks from Scratch (AI Path)',
    subject: 'Machine Learning Basics',
    level: 'AI & Software Engineering',
    category: 'AI',
    prompt: 'Explain how a single Perceptron calculates output using weights, bias, and Sigmoid activation function with simple Python code.',
    urduPrompt: 'پائتھون میں ایک سادہ پرسیپٹران اور مصنوعی نیورل نیٹ ورک کی ورکنگ بتائیں۔',
  },
  {
    title: 'NUST NET Math: Integration Tricks',
    subject: 'NET (NUST Entrance Test)',
    level: 'MDCAT / ECAT / Entry Test',
    category: 'Entry Test',
    prompt: 'Provide short-cut methods and substitution tricks for indefinite integrals frequently asked in NUST NET and FAST entry test Math section.',
    urduPrompt: 'نمل یا نسٹ این ای ٹی اینٹری ٹیسٹ کے ریاضی سوالات کے فوری شارٹ کٹس۔',
  },
];

export const MICRO_COURSES: MicroCourse[] = [
  {
    id: 'ai-foundations-pk',
    title: 'AI & Python Foundations for Pakistani Youth',
    description: 'Master Python syntax, basic logic, and building your first AI helper tailored for Pakistani high school and university learners.',
    duration: '4 Modules • ~2 Hours',
    level: 'Beginner',
    category: 'AI & Programming',
    modules: [
      {
        title: 'Module 1: Why AI Matters for Pakistan’s Digital Future',
        content: `Pakistan has over 60% youth population! The global AI economy is expanding rapidly, creating high-paying remote roles and domestic startup opportunities in AI engineering, data analytics, and prompt engineering. In this module, we learn what AI is, how algorithms make decisions, and why learning Python opens global tech doors from Pakistan.`,
        urduSummary: 'پاکستان کی 60% سے زائد آبادی نوجوان ہے۔ آرٹیفیشل انٹیلیجنس سیکھ کر آپ عالمی ریموٹ جابز اور مقامی ٹیکنالوجی انڈسٹری میں شاندار کیریئر بنا سکتے ہیں۔',
        codeExample: `# Your First Python AI Greeting in Pakistan
name = "Ali"
city = "Lahore"
print(f"Assalam-o-Alaikum {name} from {city}! Welcome to the World of AI.")
`,
        quizQuestion: {
          question: 'What is Python primarily used for in the field of Artificial Intelligence?',
          options: [
            'Creating hardware chips directly',
            'Writing readable scripts for data manipulation, machine learning libraries, and AI model interactions',
            'Only designing website CSS styles',
            'Replacing database storage completely'
          ],
          answer: 1,
        },
      },
      {
        title: 'Module 2: Variables, Conditions & Local Logic',
        content: `Programs process data through variables and decision logic. For example, evaluating whether a student qualifies for NUST NET entry test based on FSc percentage (e.g. >= 60%).`,
        urduSummary: 'ویری ایبلز اور لاجک کی مدد سے ہم فیصلہ سازی کے پروگرام بناتے ہیں۔ جیسے اینٹری ٹیسٹ کے لیے ایف ایس سی کے نمبرز کا موازنہ۔',
        codeExample: `fsc_percentage = 74.5

if fsc_percentage >= 60:
    print("Eligible for NUST & FAST Entry Test!")
else:
    print("Improve your score to meet the 60% criteria.")
`,
        quizQuestion: {
          question: 'Which Python keyword is used to evaluate multiple conditions sequentially?',
          options: ['switch', 'elif', 'select', 'elseif'],
          answer: 1,
        },
      },
      {
        title: 'Module 3: Functions & Calling Gemini AI APIs',
        content: `Functions group reusable logic. With modern REST APIs and SDKs like @google/genai, a Python or Node function can send a prompt to Gemini 3.6 Flash and receive intelligent responses in English or Urdu!`,
        urduSummary: 'فنکشنز کے ذریعے ہم جیمنائی اے آئی ماڈل کو سوال بھیج کر جواب موصول کر سکتے ہیں۔',
        codeExample: `# Conceptual API Payload to Gemini AI
prompt = "Explain Ohm's Law in simple Roman Urdu"
response = gemini_client.generate_content(prompt)
print(response.text)
`,
        quizQuestion: {
          question: 'What format is typically used to exchange data between your app and AI API servers?',
          options: ['Binary Executables', 'JSON (JavaScript Object Notation)', 'Raw Plain Assembly', 'Spreadsheet CSV only'],
          answer: 1,
        },
      },
      {
        title: 'Module 4: Practical Freelance AI Skills in Pakistan',
        content: `Learn how to leverage AI tools for content generation, code debugging, and data automation to start offering services on Fiverr, Upwork, and local Pakistani tech software houses.`,
        urduSummary: 'فری لانسنگ اور ویب ڈیولپمنٹ میں اے آئی ٹولز کا درست استعمال کر کے ماہانہ آمدن حاصل کی جا سکتی ہے۔',
        codeExample: `# Automation script concept for summarizing client feedback
feedback = "The website design is clean and fast."
summary = f"Client Feedback Summary: {feedback.upper()}"
print(summary)
`,
        quizQuestion: {
          question: 'What is Prompt Engineering?',
          options: [
            'Building physical server racks',
            'Crafting structured, clear instructions to get optimal results from Large Language Models',
            'Repairing broken fiber optic lines',
            'Manually typing data into Excel'
          ],
          answer: 1,
        },
      },
    ],
  },
  {
    id: 'matric-fsc-physics-booster',
    title: 'Matric & FSc Physics Numerical Masterclass',
    description: 'Master difficult Physics numerical problems for FBISE, BISE Punjab & Sindh exams with AI step-by-step guidance.',
    duration: '3 Modules • ~1.5 Hours',
    level: 'Intermediate',
    category: 'STEM & School',
    modules: [
      {
        title: 'Module 1: Kinematics & Equations of Motion',
        content: `Kinematics deals with motion without considering forces. The 3 equations of motion are vital for FBISE Class 9 & 11 Physics papers:
1) v_f = v_i + a t
2) S = v_i t + 1/2 a t^2
3) 2 a S = v_f^2 - v_i^2`,
        urduSummary: 'حرکت کی تینوں مساواتیں اور ان سے متعلقہ نمیریکل سوالات کی حل شدہ مثالیں۔',
        codeExample: `# Python calculation for Final Velocity
v_i = 0  # Initial velocity (m/s)
a = 9.8  # Acceleration due to gravity (m/s^2)
t = 4    # Time in seconds

v_f = v_i + (a * t)
print(f"Final Velocity after {t} seconds: {v_f} m/s")
`,
        quizQuestion: {
          question: 'If a body starts from rest, what is its initial velocity (v_i)?',
          options: ['9.8 m/s', '0 m/s', '100 m/s', '1 m/s'],
          answer: 1,
        },
      },
    ],
  },
];

export const SCHOLARSHIPS: ScholarshipItem[] = [
  {
    title: 'HEC Need-Based & Merit Scholarships',
    organization: 'Higher Education Commission (HEC) Pakistan',
    coverage: '100% Tuition Fee + Monthly Living Stipend',
    targetLevel: 'Undergraduate (BS / BE / MBBS)',
    deadline: 'Announced Annually (Check Portal)',
    eligibility: 'Pakistani & AJK Nationals, enrolled in public sector universities, financial need < PKR 80k/mo household income.',
    linkText: 'HEC Official Portal',
    category: 'Government',
  },
  {
    title: 'PEEF Master’s & Bachelor’s Scholarships',
    organization: 'Punjab Educational Endowment Fund (PEEF)',
    coverage: 'Full tuition fees and quarterly financial grant',
    targetLevel: 'Intermediate, BS & Master’s Degree',
    deadline: 'Rolling Applications',
    eligibility: 'Domicile of Punjab, secured minimum 60% marks in previous board examination.',
    linkText: 'PEEF Scholarship Portal',
    category: 'Local',
  },
  {
    title: 'Ehsaas Undergraduate Scholarship Program',
    organization: 'BISP & Ministry of Federal Education',
    coverage: '100% Tuition Fee + PKR 4,000/month stipend',
    targetLevel: 'BS 4-Year Degree Programs',
    deadline: 'Bi-Annual Intake',
    eligibility: 'Family income below PKR 45,000/month, merit-cum-need based.',
    linkText: 'Ehsaas HEC Portal',
    category: 'Need-Based',
  },
  {
    title: 'Fulbright Master’s and PhD Program (USA for Pakistanis)',
    organization: 'USEFP (United States Educational Foundation in Pakistan)',
    coverage: 'Full tuition, airfare, textbooks, living stipend, & health insurance',
    targetLevel: 'Master’s & PhD in US Universities',
    deadline: 'May every year',
    eligibility: 'Pakistani citizens with 16 years of education (BS/MA) for Master’s, GRE required.',
    linkText: 'USEFP Fulbright Site',
    category: 'International',
  },
  {
    title: 'Erasmus Mundus Joint Master’s (Europe)',
    organization: 'European Union',
    coverage: 'Full scholarship (~€1,400/month stipend + travel & tuition)',
    targetLevel: 'Master’s Degree in 2+ EU Countries',
    deadline: 'January - March annually',
    eligibility: 'Bachelor’s degree holders from Pakistan with high academic standing & IELTS/TOEFL.',
    linkText: 'EU Erasmus Portal',
    category: 'International',
  },
];
