// ============================================================================
// PORTFOLIO DATA - Single source of truth
// All content extracted from the resume PDF. Do not fabricate any information.
// ============================================================================

export const PROFILE = {
  name: 'Aryan Mukund Singh',
  firstName: 'Aryan',
  lastName: 'Singh',
  initials: 'AS',
  role: 'Full Stack Developer',
  email: 'singharyan432002@gmail.com',
  phone: '+91 8528068717',
  phoneHref: 'tel:+918528068717',
  location: 'Greater Noida, India',
  github: 'https://github.com/Aryan-040',
  linkedin: 'https://www.linkedin.com/in/aryan-mukund-singh',
  leetcode: 'https://leetcode.com/u/Aryan4-03/',
  resume: '/Aryan_Singh_Resume.pdf',
  resumeSummary:
    'Software Engineer with internship experience in backend development, and full-stack web applications. Proficient in Java, TypeScript, Node.js, React.js, LLM-integrated features and AWS. Deployed 3 production applications end-to-end. AWS Certified Cloud Practitioner.',
  stats: {
    leetcodeProblems: 470,
    githubCommits: 500,
  },
} as const;

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
] as const;

export type SkillFamily =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Cloud & DevOps'
  | 'Testing'
  | 'AI/LLM'
  | 'Concepts';

export interface Skill {
  name: string;
  symbol: string;
  family: SkillFamily;
  description: string;
  projects?: string[];
}

export const SKILL_GROUPS: Record<SkillFamily, Skill[]> = {
  Languages: [
    { name: 'Java', symbol: 'Ja', family: 'Languages', description: 'Object-oriented language built for portability and performance, running on the JVM across any platform.', projects: ['prepkit'] },
    { name: 'JavaScript', symbol: 'Js', family: 'Languages', description: 'Dynamic scripting language powering the interactive web, running in browsers and on servers via Node.', projects: ['prepkit', 'metrics', 'agentmeet'] },
    { name: 'TypeScript', symbol: 'Ts', family: 'Languages', description: 'Typed superset of JavaScript that catches errors at compile time and scales cleanly with large codebases.', projects: ['prepkit', 'metrics', 'agentmeet'] },
    { name: 'SQL', symbol: 'Sq', family: 'Languages', description: 'Declarative language for querying and manipulating structured data in relational databases.', projects: ['metrics', 'agentmeet'] },
  ],
  Frontend: [
    { name: 'React.js', symbol: 'Re', family: 'Frontend', description: 'Component-based UI library for building fast, declarative, and composable web interfaces.', projects: ['prepkit', 'metrics', 'agentmeet'] },
    { name: 'Next.js', symbol: 'Nx', family: 'Frontend', description: 'React framework with server-side rendering, file-based routing, and full-stack capabilities built in.', projects: ['prepkit', 'metrics', 'agentmeet'] },
    { name: 'Tailwind CSS', symbol: 'Tw', family: 'Frontend', description: 'Utility-first CSS framework for rapidly building custom designs without leaving your markup.', projects: ['prepkit', 'metrics', 'agentmeet'] },
    { name: 'HTML/CSS', symbol: 'Ht', family: 'Frontend', description: 'The foundational languages of the web — semantic structure and cascading styles for every page.', projects: ['prepkit', 'metrics', 'agentmeet'] },
  ],
  Backend: [
    { name: 'Node.js', symbol: 'No', family: 'Backend', description: 'JavaScript runtime built on V8 for building scalable, event-driven server-side applications.', projects: ['prepkit'] },
    { name: 'Express.js', symbol: 'Ex', family: 'Backend', description: 'Minimal and flexible Node.js web framework for building REST APIs and web applications quickly.', projects: ['prepkit'] },
    { name: 'tRPC', symbol: 'Tr', family: 'Backend', description: 'End-to-end type-safe API layer that eliminates schema definitions and keeps client and server in sync.', projects: ['agentmeet'] },
    { name: 'REST APIs', symbol: 'Rs', family: 'Backend', description: 'Architectural style for networked applications using stateless, resource-oriented HTTP requests.', projects: ['prepkit', 'metrics'] },
    { name: 'Microservices', symbol: 'Ms', family: 'Backend', description: 'Architectural pattern that decomposes applications into small, independently deployable services.' },
  ],
  Databases: [
    { name: 'PostgreSQL', symbol: 'Pg', family: 'Databases', description: 'Advanced open-source relational database known for extensibility, reliability, and SQL compliance.', projects: ['metrics', 'agentmeet'] },
    { name: 'MongoDB', symbol: 'Mg', family: 'Databases', description: 'Document-oriented NoSQL database designed for flexible schemas and horizontal scaling.', projects: ['prepkit'] },
    { name: 'MySQL', symbol: 'My', family: 'Databases', description: 'The world\'s most popular open-source relational database, optimized for web applications.' },
    { name: 'Prisma', symbol: 'Pr', family: 'Databases', description: 'Next-generation ORM for Node.js and TypeScript with an intuitive schema and full type safety.', projects: ['metrics'] },
  ],
  'Cloud & DevOps': [
    { name: 'AWS', symbol: 'Aw', family: 'Cloud & DevOps', description: 'Amazon\'s cloud platform offering 200+ services for compute, storage, networking, and AI.' },
    { name: 'Docker', symbol: 'Dk', family: 'Cloud & DevOps', description: 'Platform for packaging and running applications in isolated, lightweight containers anywhere.' },
    { name: 'Git', symbol: 'Gt', family: 'Cloud & DevOps', description: 'Distributed version control system for tracking changes and collaborating on source code.', projects: ['prepkit', 'metrics', 'agentmeet'] },
    { name: 'GitHub Actions', symbol: 'Ga', family: 'Cloud & DevOps', description: 'CI/CD platform integrated with GitHub for automating build, test, and deployment workflows.' },
    { name: 'Vercel', symbol: 'Vc', family: 'Cloud & DevOps', description: 'Cloud platform optimized for frontend deployment with zero-config builds and edge functions.', projects: ['prepkit', 'metrics', 'agentmeet'] },
    { name: 'CI/CD', symbol: 'Ci', family: 'Cloud & DevOps', description: 'Continuous integration and delivery — automating pipelines for faster, more reliable software delivery.' },
  ],
  Testing: [
    { name: 'JUnit', symbol: 'Ju', family: 'Testing', description: 'Industry-standard unit testing framework for Java with annotation-based test configuration.' },
    { name: 'Unit Testing', symbol: 'Ut', family: 'Testing', description: 'Testing individual components in isolation to verify each piece works correctly on its own.', projects: ['metrics'] },
    { name: 'Integration Testing', symbol: 'It', family: 'Testing', description: 'Testing how multiple components or services work together across boundaries.', projects: ['metrics'] },
    { name: 'Test Automation', symbol: 'Ta', family: 'Testing', description: 'Using scripts and frameworks to automatically execute tests and report results continuously.' },
  ],
  'AI/LLM': [
    { name: 'OpenAI API', symbol: 'Oi', family: 'AI/LLM', description: 'RESTful API providing access to GPT models for text generation, embeddings, and reasoning.', projects: ['prepkit', 'agentmeet'] },
    { name: 'RAG', symbol: 'Rg', family: 'AI/LLM', description: 'Retrieval-Augmented Generation — grounding LLM responses with real-time external knowledge retrieval.', projects: ['prepkit'] },
    { name: 'LLM Integration', symbol: 'Ll', family: 'AI/LLM', description: 'Embedding large language models into applications to power intelligent, context-aware features.', projects: ['prepkit', 'agentmeet'] },
    { name: 'Inngest', symbol: 'In', family: 'AI/LLM', description: 'Event-driven workflow platform for orchestrating reliable, long-running background functions.', projects: ['agentmeet'] },
    { name: 'WebRTC', symbol: 'Wr', family: 'AI/LLM', description: 'Browser-native protocol enabling real-time peer-to-peer audio, video, and data communication.', projects: ['agentmeet'] },
  ],
  Concepts: [
    { name: 'Data Structures', symbol: 'Ds', family: 'Concepts', description: 'Organizing and storing data efficiently — arrays, trees, graphs, heaps, and hash maps.' },
    { name: 'System Design', symbol: 'Sd', family: 'Concepts', description: 'Architecting scalable, reliable, and maintainable distributed systems and services.' },
    { name: 'OOP', symbol: 'Op', family: 'Concepts', description: 'Designing software around objects, encapsulation, inheritance, and polymorphism.' },
    { name: 'Agile', symbol: 'Ag', family: 'Concepts', description: 'Iterative development methodology emphasising collaboration, flexibility, and continuous delivery.' },
    { name: 'SDLC', symbol: 'Sl', family: 'Concepts', description: 'Structured process for planning, designing, building, testing, and maintaining software.' },
  ],
};

export const ALL_SKILLS: Skill[] = Object.values(SKILL_GROUPS).flat();

export interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  bullets?: string[];
  grade?: string;
  honors?: string;
}

export const EXPERIENCE: Experience[] = [
  // {
  //   id: 'indiatv',
  //   type: 'work',
  //   title: 'Data Engineering Intern',
  //   organization: 'India TV',
  //   location: 'Noida',
  //   startDate: 'Dec 2025',
  //   endDate: 'Jan 2026',
  //   description: 'News & Media',
  //   bullets: [
  //     'Created reporting dashboards unifying 6 internal data sources, eliminating 2+ hours/day of manual report assembly for a 15-person editorial team.',
  //     'Automated content tagging and routing with Python scripts, processing 500+ articles/week without manual intervention.',
  //   ],
  // },
  {
    id: 'sway',
    type: 'work',
    title: 'Software Engineer Intern',
    organization: 'sway.club',
    location: 'Remote',
    startDate: 'Feb 2026',
    endDate: 'Apr 2026',
    description: 'e-commerce Startup',
    bullets: [
      'Developed backend API endpoints and data models for the social feed and notifications service, handling real-time updates for the active user base.',
      'Identified and resolved 40+ bugs in OAuth token flows and input validation, reducing production error rates by 28%.',
      'Configured GitHub Actions CI/CD pipeline with automated test suites, enabling regression checks on every pull request and cutting release cycle from 5 days to 2.',
    ],
  },
];

export const EDUCATION: Experience[] = [
  {
    id: 'bennett',
    type: 'education',
    title: 'B.Tech Computer Science Engineering',
    organization: 'Bennett University',
    location: 'Greater Noida, Uttar Pradesh',
    startDate: 'Aug 2022',
    endDate: 'Jun 2026',
    grade: 'CGPA: 8.25/10',
    description:
      'Coursework: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, DBMS, Computer Networks',
  },
];

// Combined timeline for Experience section (chronological order)
export const TIMELINE: Experience[] = [...EDUCATION, ...EXPERIENCE].sort((a, b) => {
  const getYear = (date: string) => parseInt(date.split(' ')[1] || date);
  return getYear(a.startDate) - getYear(b.startDate);
});

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  live?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'prepkit',
    index: '01',
    title: 'PrepKit',
    kicker: 'AI Interview Preparation Platform',
    description:
      'Engineered a 9-stage AI pipeline for company research, requirement extraction, question generation, coverage validation, and interview scheduling.',
    features: [
      'Deterministic coverage and gap-filling across 5 passes',
      'Editable kits and batch processing',
      'Practice Mode for interview simulation',
      '1–60 day preparation plan scheduling',
    ],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'LLMs'],
    github: 'https://github.com/Aryan-040/PrepKit',
    live: 'https://prepkit-lilac.vercel.app/',
  },
  {
    id: 'agentmeet',
    index: '02',
    title: 'AgentMeet',
    kicker: 'AI Video Collaborative Platform',
    description:
      'Engineered a video conferencing platform with AI-powered transcription using Stream SDK for WebRTC and OpenAI for speech-to-text.',
    features: [
      'Async job pipelines with Inngest',
      'Transcript generation within 30s of call end',
      'Role-based access (host/participant/viewer)',
      '5 engagement metrics tracked per session',
    ],
    tech: ['Next.js', 'TypeScript', 'OpenAI', 'Stream SDK', 'Inngest', 'tRPC', 'PostgreSQL'],
    github: 'https://github.com/Aryan-040/AgentMeet',
    live: 'https://agent-meet-gl11.vercel.app/sign-in',
  },
  {
    id: 'stoxie',
    index: '03',
    title: 'Stoxie',
    kicker: 'Stock Tracking Application',
    description:
      'A modern stock tracking web application with real-time market data, personalized watchlists, and automated email alerts for price movements.',
    features: [
      'Real-time stock prices via Finnhub API',
      'Personalized watchlist management',
      'Daily stock news via email alerts',
      'Background jobs with Inngest',
    ],
    tech: ['Next.js', 'React', 'MongoDB', 'Inngest', 'Tailwind CSS', 'Better Auth'],
    github: 'https://github.com/Aryan-040/Stoxie',
    live: 'https://stoxie-eight.vercel.app/',
  },
  {
    id: 'metrics',
    index: '04',
    title: 'Metrics',
    kicker: 'Feedback Management Platform',
    description:
      'Built role-based access control across employee, manager, and HR roles with time-bounded manager-report relationships supporting historical tracking.',
    features: [
      'Normalized relational schema across 7 models',
      'Company-scoped data isolation',
      '16 property-based tests with fast-check',
      'Unit and integration test suites',
    ],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Neon'],
    github: 'https://github.com/Aryan-040/Metrics',
    live: 'https://metrics-orpin.vercel.app/',
  },
  {
    id: 'ideastash',
    index: '05',
    title: 'Idea Stash',
    kicker: 'Smart Second-Brain App',
    description:
      'Save it once. Find it forever. A smart second-brain for links, ideas, and knowledge with AI-powered semantic search.',
    features: [
      'Auto-extracts metadata from links',
      'AI semantic search toggle',
      'Rich content cards (YouTube, GitHub, Articles)',
      'Tag-based organization',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/Aryan-040/Idea-stash',
    live: 'https://idea-stash-xi.vercel.app/',
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-ccp',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2023',
  },
  {
    id: 'aws-academy',
    title: 'AWS Academy Graduate - Cloud Foundations',
    issuer: 'Amazon Web Services Training and Certification',
    year: '2024',
    link: 'https://www.credly.com/badges/52a6c31b-d950-42a5-bc53-084bc0206e11/linked_in_profile',
  },
  {
    id: 'aws-technical',
    title: 'AWS Cloud Technical Essentials',
    issuer: 'Coursera (AWS)',
    year: '2024',
    link: 'https://www.coursera.org/account/accomplishments/verify/DXOTNYFHXNSB',
  },
  {
    id: 'ai-intro',
    title: 'Introduction to Artificial Intelligence (AI)',
    issuer: 'Coursera (IBM)',
    year: '2024',
    link: 'https://www.coursera.org/account/accomplishments/verify/8JJ82MP5F66R',
  },
  {
    id: 'coursera-specialization',
    title: 'AI/ML Specialization',
    issuer: 'Coursera',
    year: '2024',
    link: 'https://www.coursera.org/account/accomplishments/specialization/LM6JFNJQD9Q5',
  },
];

export interface Achievement {
  id: string;
  platform: string;
  label: string;
  caption: string;
  detail: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'leetcode-rating',
    platform: 'LeetCode',
    label: 'Contest Rating',
    caption: 'Top 4.4% globally',
    detail: 'Competitive programming',
    value: 1900,
    suffix: '+',
  },
  {
    id: 'leetcode-problems',
    platform: 'LeetCode',
    label: 'Problems Solved',
    caption: 'Algorithmic challenges',
    detail: 'Data structures & algorithms',
    value: 470,
    suffix: '+',
  },
  {
    id: 'github-commits',
    platform: 'GitHub',
    label: 'Total Commits',
    caption: 'Open source contributions',
    detail: 'Code contributions',
    value: 500,
    suffix: '+',
  },
  {
    id: 'sih-finalist',
    platform: 'Smart India Hackathon',
    label: 'Finalist',
    caption: 'SIH 2024',
    detail: 'National level competition',
    value: 5,
    prefix: 'Top',
    suffix: '%',
  },
  {
    id: 'merit-scholarship',
    platform: 'Bennett University',
    label: 'Merit Scholarship',
    caption: 'Academic excellence',
    detail: 'University recognition',
    value: 10,
    prefix: 'Top',
    suffix: '%',
  },
  {
    id: 'hackathon-lead',
    platform: 'Hackathons',
    label: 'Team Lead',
    caption: 'Leadership experience',
    detail: 'Led development teams',
    value: 3,
    suffix: ' hackathons',
  },
];

// ID card data for About section
export const ID_CARD = {
  department: 'Engineering',
  idNumber: 'DEV-2026',
  validTill: '2026', // Graduation year
  backContent: [
    `Role: ${PROFILE.role}`,
    `Education: B.Tech CSE (CGPA: 8.25)`,
    `LeetCode: ${PROFILE.stats.leetcodeProblems}+ problems`,
    `Projects: PrepKit, Metrics, AgentMeet`,
    `AWS Certified Cloud Practitioner`,
  ],
};

// Quick facts for About section
export const QUICK_FACTS = [
  { label: 'Location', value: PROFILE.location },
  { label: 'Education', value: 'B.Tech CSE, Bennett University' },
  { label: 'Current', value: 'Seeking full-time opportunities' },
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
];

// Quote for About section (paraphrased from resume summary)
export const ABOUT_QUOTE =
  'Building production-ready applications with a focus on scalable backend systems and AI integration.';
