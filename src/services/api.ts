import {
  User,
  Resume,
  AtsAnalysis,
  BulletRewrite,
  SubscriptionPlan,
  Subscription,
  Payment,
  Invoice,
  PaymentProvider,
  AdminMetrics,
  StructuredResumeData,
  ResumeUploadResponse,
  AtsDetailedReport,
  AiRewriteRequestPayload,
  AiRewriteResultResponse,
  ResumeQualityReportData,
  CoverLetterRequestPayload,
  CoverLetterResponseData,
  StartInterviewPayload,
  InterviewSessionData,
  AnswerEvaluationData,
  InterviewReportData,
  CareerGoalPayload,
  SkillGapAnalysisData,
  CareerRoadmapData,
  LearningResourceData,
  AdminDashboardMetricsData,
  AdminUserData,
  SystemHealthData,
  AuditLogEntryData,
  JobApplicationData,
  UserProfileData,
  UserNotificationData,
  RewriteStyle
} from '../types';

// Mock DB Initial State
let mockUser: User = {
  id: 'usr_1001',
  email: 'vikipatil972@gmail.com',
  firstName: 'Vivek',
  lastName: 'Patil',
  role: 'ROLE_USER',
  isEmailVerified: true,
  freeAnalysesUsed: 1,
  maxFreeAnalyses: 3,
  createdAt: new Date().toISOString()
};

let mockProfile: UserProfileData = {
  id: 'prof_1001',
  userId: 'usr_1001',
  firstName: 'Vivek',
  lastName: 'Patil',
  email: 'vikipatil972@gmail.com',
  headline: 'Senior Full Stack & AI Systems Engineer',
  bio: 'Passionate engineer building resilient enterprise SaaS platforms in Spring Boot 3.3, React 18, PostgreSQL 16, and LLM AI models.',
  linkedinUrl: 'https://www.linkedin.com/in/vivek-patil-393501326',
  githubUrl: 'https://github.com/vikipatil972-dotcom',
  portfolioUrl: 'https://careeros-ai.vercel.app',
  phone: '+91 98765 43210',
  location: 'Bengaluru, India',
  targetSalaryInr: 3500000,
  preferredRoles: ['Senior Full Stack Engineer', 'DevOps Architect', 'Backend Lead']
};

let mockJobApps: JobApplicationData[] = [
  { id: 'job_101', userId: 'usr_1001', companyName: 'Google', jobTitle: 'Senior Full Stack Engineer', status: 'INTERVIEWING', salaryOfferedInr: 3800000, location: 'Bengaluru, IN', jobUrl: 'https://careers.google.com', notes: 'Passed Tech Round 1 with Lead Architect', appliedDate: new Date(Date.now() - 864000000).toISOString(), createdAt: new Date().toISOString() },
  { id: 'job_102', userId: 'usr_1001', companyName: 'Stripe', jobTitle: 'Backend Systems Engineer', status: 'OFFER', salaryOfferedInr: 4500000, location: 'Remote', jobUrl: 'https://stripe.com/jobs', notes: 'Offer Received - Salary Negotiating', appliedDate: new Date(Date.now() - 1728000000).toISOString(), createdAt: new Date().toISOString() },
  { id: 'job_103', userId: 'usr_1001', companyName: 'Amazon', jobTitle: 'Software Development Engineer II', status: 'APPLIED', salaryOfferedInr: 3200000, location: 'Hyderabad, IN', jobUrl: 'https://amazon.jobs', notes: 'Applied via employee referral', appliedDate: new Date(Date.now() - 432000000).toISOString(), createdAt: new Date().toISOString() },
  { id: 'job_104', userId: 'usr_1001', companyName: 'Microsoft', jobTitle: 'Senior Cloud Engineer', status: 'WISHLIST', salaryOfferedInr: 3600000, location: 'Bengaluru, IN', jobUrl: 'https://careers.microsoft.com', notes: 'Preparing customized resume', appliedDate: new Date(Date.now() - 172800000).toISOString(), createdAt: new Date().toISOString() }
];

let mockNotifications: UserNotificationData[] = [
  { id: 'notif_1', userId: 'usr_1001', title: 'ATS Report Generated', message: 'Your resume score for Google Senior Engineer job description reached 92/100.', category: 'ATS_ALERT', isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'notif_2', userId: 'usr_1001', title: 'Mock Interview Scheduled', message: 'STAR Mock Interview for System Design is ready.', category: 'INTERVIEW_REMINDER', isRead: false, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'notif_3', userId: 'usr_1001', title: 'Premium Pass Active', message: 'Your ₹49/month subscription is active until August 22, 2026.', category: 'BILLING', isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() }
];

let mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan_1',
    planCode: 'PLAN_PREMIUM_MONTHLY',
    name: 'Premium Monthly Pass',
    priceInr: 49,
    billingInterval: 'MONTHLY',
    features: [
      'Unlimited Resume Analyses',
      '100-Point Algorithmic ATS Diagnostic',
      'AI Google XYZ Bullet Rewriter',
      'AI Cover Letter Generator',
      'STAR-Format Interview Practice',
      'Priority LLM Queue Allocation',
      'Clean PDF Export Engine'
    ],
    isActive: true
  },
  {
    id: 'plan_2',
    planCode: 'PLAN_CAREER_PRO',
    name: 'Career Pro',
    priceInr: 199,
    billingInterval: 'MONTHLY',
    features: [
      'All Premium Features Included',
      'AI Voice Mock Interviewer',
      'Human Expert Resume Review Add-on',
      '1-on-1 Salary Negotiation Scripts',
      '24/7 Priority Support'
    ],
    isActive: true
  }
];

let mockSubscription: Subscription | null = null;
let mockPayments: Payment[] = [
  {
    id: 'pay_1001',
    userId: 'usr_1002',
    subscriptionId: 'sub_1001',
    amountInr: 49,
    currency: 'INR',
    provider: 'RAZORPAY',
    providerPaymentId: 'rzp_pay_98123',
    status: 'SUCCESS',
    invoiceId: 'INV-2026-98124',
    createdAt: new Date(Date.now() - 864000000).toISOString()
  }
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const apiService = {
  async getCurrentUser(): Promise<User> {
    await delay(300);
    return { ...mockUser };
  },

  async login(email: string): Promise<User> {
    await delay(500);
    if (email.includes('admin')) {
      mockUser.role = 'ROLE_ADMIN';
      mockUser.email = email;
      mockUser.firstName = 'System';
      mockUser.lastName = 'Admin';
    } else {
      mockUser.role = 'ROLE_USER';
      mockUser.email = email;
      mockUser.firstName = 'Vivek';
      mockUser.lastName = 'Patil';
    }
    return { ...mockUser };
  },

  async registerUser(fullName: string, email: string, pass: string, confirmPass: string): Promise<User> {
    await delay(600);
    if (pass !== confirmPass) {
      throw new Error('Password and confirm password do not match');
    }

    const parts = fullName.split(' ');
    mockUser = {
      id: `usr_${Date.now()}`,
      email,
      firstName: parts[0] || 'Vivek',
      lastName: parts.slice(1).join(' ') || 'Patil',
      role: 'ROLE_USER',
      isEmailVerified: false,
      freeAnalysesUsed: 0,
      maxFreeAnalyses: 3,
      createdAt: new Date().toISOString()
    };
    return { ...mockUser };
  },

  async verifyEmail(email: string, otpCode: string): Promise<boolean> {
    await delay(500);
    if (otpCode !== '123456') {
      throw new Error('Invalid 6-digit verification code. Use demo code 123456.');
    }
    mockUser.isEmailVerified = true;
    return true;
  },

  async forgotPassword(email: string): Promise<string> {
    await delay(500);
    return `OTP sent to ${email}`;
  },

  async resetPassword(email: string, otpCode: string, newPass: string): Promise<boolean> {
    await delay(600);
    if (otpCode !== '654321') {
      throw new Error('Invalid OTP code for reset. Use demo code 654321.');
    }
    return true;
  },

  async logoutAllDevices(): Promise<boolean> {
    await delay(400);
    return true;
  },

  async uploadResumeFile(file: File, targetJobTitle?: string): Promise<ResumeUploadResponse> {
    await delay(800);
    const cleanFileName = file.name.replace(/^[./\\]+/, '').replace(/[\\/:]/g, '_');
    const isDocx = cleanFileName.toLowerCase().endsWith('.docx');
    
    return {
      id: `res_${Date.now()}`,
      title: cleanFileName.replace(/(?i)\.(pdf|docx)$/, ''),
      targetJobTitle: targetJobTitle || 'Senior Software Engineer',
      versionNumber: 1,
      fileHash: `hash_sha256_${Math.random().toString(36).substring(7)}`,
      fileFormat: isDocx ? 'DOCX' : 'PDF',
      fileSizeBytes: file.size,
      isDuplicateDetected: false,
      structuredData: {
        contactInfo: {
          name: mockUser.firstName + ' ' + mockUser.lastName,
          email: mockUser.email,
          phone: '+91 98765 43210',
          location: 'Bengaluru, India',
          linkedin: 'https://www.linkedin.com/in/vivek-patil-393501326',
          github: 'https://github.com/vikipatil972-dotcom',
          portfolio: 'https://careeros-ai.vercel.app'
        },
        summary: 'Results-driven Senior Full Stack Software Engineer with 4+ years experience designing high-concurrency cloud architectures in Java Spring Boot, React, and PostgreSQL.',
        workExperience: [
          {
            company: 'TechCorp Solutions',
            role: 'Senior Full Stack Engineer',
            startDate: '2022-01',
            endDate: 'Present',
            bulletPoints: [
              'Architected 14 RESTful Spring Boot microservices, reducing API execution latency by 38% across 120K daily active transactions.',
              'Spearheaded React 18 frontend migration, improving Lighthouse Performance Score from 62 to 98.'
            ]
          }
        ],
        education: [
          {
            institution: 'University of Technology',
            degree: 'Bachelor of Technology',
            field: 'Computer Science',
            graduationYear: '2020',
            grade: '8.8 CGPA'
          }
        ],
        skills: {
          hardSkills: ['Java 21', 'Spring Boot 3.3', 'React 18', 'TypeScript', 'PostgreSQL 16'],
          softSkills: ['Problem Solving', 'Technical Leadership', 'Agile/Scrum'],
          tools: ['Docker', 'Kubernetes', 'Redis', 'Git', 'Maven']
        },
        projects: [
          {
            name: 'CareerOS AI SaaS Platform',
            description: 'AI-powered SaaS career development platform featuring 100-point ATS diagnostics.',
            technologiesUsed: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL'],
            liveUrl: 'https://careeros-ai.vercel.app'
          }
        ],
        certifications: ['AWS Certified Solutions Architect'],
        languages: ['English (Native)', 'Hindi (Fluent)'],
        links: {
          LinkedIn: 'https://www.linkedin.com/in/vivek-patil-393501326',
          GitHub: 'https://github.com/vikipatil972-dotcom'
        }
      },
      createdAt: new Date().toISOString()
    };
  },

  async updateResumeDetails(id: string, title: string, targetJobTitle: string, data: StructuredResumeData): Promise<ResumeUploadResponse> {
    await delay(600);
    return {
      id,
      title,
      targetJobTitle,
      versionNumber: 2,
      fileHash: `hash_updated_${Date.now()}`,
      fileFormat: 'JSON',
      fileSizeBytes: 2048,
      isDuplicateDetected: false,
      structuredData: data,
      createdAt: new Date().toISOString()
    };
  },

  async getResumeVersions(id: string): Promise<Array<{ versionNumber: number; fileHash: string; fileFormat: string; createdAt: string; isCurrent: boolean }>> {
    await delay(300);
    return [
      { versionNumber: 2, fileHash: 'hash_ver2_updated', fileFormat: 'JSON', createdAt: new Date(Date.now() - 1800000).toISOString(), isCurrent: true },
      { versionNumber: 1, fileHash: 'hash_ver1_original', fileFormat: 'PDF', createdAt: new Date(Date.now() - 7200000).toISOString(), isCurrent: false }
    ];
  },

  async restoreResumeVersion(id: string, versionNumber: number): Promise<boolean> {
    await delay(500);
    return true;
  },

  async exportResumePdf(id: string): Promise<void> {
    await delay(400);
    alert(`Downloading formatted PDF output for Resume ID: ${id}`);
  },

  async analyzeResumeWithEngine(
    resumeText: string,
    targetJd: string,
    onProgress: (step: string) => void
  ): Promise<AtsDetailedReport> {
    if (mockUser.role === 'ROLE_USER' && mockUser.freeAnalysesUsed >= mockUser.maxFreeAnalyses) {
      throw new Error('QUOTA_EXCEEDED: You have exhausted your 3 free resume analyses. Upgrade to Premium for ₹49 to unlock unlimited analyses.');
    }

    onProgress('Step 1/4: Extracting Document & Sanitizing PII...');
    await delay(700);

    onProgress('Step 2/4: Extracting Technical Keywords & Action Verbs...');
    await delay(800);

    onProgress('Step 3/4: Calculating 10 Categorical Weighted Point Scores...');
    await delay(900);

    onProgress('Step 4/4: Generating Improvement Checklist & PDF Report Payload...');
    await delay(600);

    if (mockUser.role === 'ROLE_USER') {
      mockUser.freeAnalysesUsed += 1;
    }

    return {
      id: `ats_${Date.now()}`,
      resumeId: 'res_1001',
      overallScore: 78,
      categoryScores: {
        skillsMatch: 16,
        keywordsMatch: 12,
        experienceMatch: 14,
        educationMatch: 10,
        resumeStructure: 10,
        actionVerbs: 7,
        measurableAchievements: 6,
        formattingQuality: 5,
        contactInfo: 3,
        atsCompatibility: 2
      },
      matchingKeywords: [
        { keyword: 'Java 21', category: 'Backend', priority: 'HIGH' },
        { keyword: 'Spring Boot 3.3', category: 'Backend Framework', priority: 'HIGH' },
        { keyword: 'React 18', category: 'Frontend', priority: 'HIGH' },
        { keyword: 'TypeScript', category: 'Frontend', priority: 'HIGH' },
        { keyword: 'PostgreSQL 16', category: 'Database', priority: 'HIGH' },
        { keyword: 'REST API', category: 'Architecture', priority: 'MEDIUM' }
      ],
      missingKeywords: [
        { keyword: 'Docker', category: 'DevOps Containerization', priority: 'HIGH' },
        { keyword: 'Kubernetes', category: 'Orchestration', priority: 'HIGH' },
        { keyword: 'Redis Caching', category: 'Performance Layer', priority: 'MEDIUM' },
        { keyword: 'GitHub Actions CI/CD', category: 'Automation', priority: 'HIGH' },
        { keyword: 'Prometheus & Grafana', category: 'Observability', priority: 'LOW' }
      ],
      strengths: [
        'Strong hard technical skills alignment (Java 21, Spring Boot 3.3, React 18, PostgreSQL 16).',
        'Clean multi-section structure (Experience, Education, Skills clearly demarcated).',
        'Contact details, GitHub, and LinkedIn links present.'
      ],
      weaknesses: [
        'Missing 4 critical DevOps & Containerization keywords (Docker, Kubernetes, Redis, CI/CD).',
        'Only 2 experience bullets contain quantifiable metrics (%, $, scale ROI numbers).'
      ],
      improvementChecklist: [
        {
          category: 'DevOps & Containerization',
          recommendation: 'Add Docker containerization & Kubernetes deployment project experience to bullet points.',
          potentialImpact: '+12 Points',
          isCompleted: false
        },
        {
          category: 'Action Verbs & ROI',
          recommendation: 'Use high-impact action verbs like Architected, Spearheaded, and Optimized.',
          potentialImpact: '+8 Points',
          isCompleted: false
        },
        {
          category: 'Performance Layer',
          recommendation: 'Mention Redis in-memory caching and database query indexing experience.',
          potentialImpact: '+6 Points',
          isCompleted: false
        }
      ],
      createdAt: new Date().toISOString()
    };
  },

  async executeAiRewrite(payload: AiRewriteRequestPayload): Promise<AiRewriteResultResponse> {
    await delay(900);
    const role = payload.targetRoleTitle || 'Senior Software Engineer';
    let rewritten = '';
    let added: string[] = [];

    if (payload.stylePreset === 'ATS_OPTIMIZED') {
      rewritten = `Architected 14 RESTful Spring Boot microservices for ${role}, reducing API execution latency by 38% across 120K daily active transactions.`;
      added = ['Docker', 'Kubernetes', 'Redis', 'Microservices'];
    } else if (payload.stylePreset === 'LEADERSHIP') {
      rewritten = `Spearheaded high-performance cross-functional engineering team of 8 developers, delivering enterprise Java Spring Boot backend platforms on time and under budget.`;
      added = ['Leadership', 'Cross-functional', 'Agile', 'Delivery'];
    } else if (payload.stylePreset === 'TECHNICAL') {
      rewritten = `Engineered PostgreSQL database indexes and Redis in-memory caching layer, eliminating high-concurrency lock contention under 100K daily requests.`;
      added = ['PostgreSQL', 'Redis', 'Concurrency', 'Indexing'];
    } else {
      rewritten = `Architected scalable backend microservices using Java Spring Boot, React 18, and PostgreSQL 16, resulting in a 35% performance boost.`;
      added = ['Java 21', 'Spring Boot', 'React 18'];
    }

    return {
      id: `rewrite_${Date.now()}`,
      resumeId: payload.resumeId,
      sectionName: payload.sectionName,
      stylePreset: payload.stylePreset,
      originalContent: payload.originalContent,
      rewrittenContent: rewritten,
      scoreBefore: 78,
      scoreAfter: 92,
      scoreDelta: 14,
      explanation: 'ATS Score increased by +14 points! Added missing high-priority tech stack keywords and quantified accomplishments using Google XYZ metric formula.',
      keywordsAdded: added,
      providerName: 'GEMINI_PRO_GATEWAY',
      createdAt: new Date().toISOString()
    };
  },

  async fetchResumeQualityReport(resumeId: string): Promise<ResumeQualityReportData> {
    await delay(400);
    return {
      id: `quality_${Date.now()}`,
      resumeId,
      readabilityScore: 94,
      toneScore: 96,
      atsCompatibilityIndex: 92,
      strongSections: [
        'Strong technical hard skills section clearly demarcated.',
        'Quantified ROI metrics present in experience section.',
        'Consistent reverse-chronological layout.'
      ],
      weakSections: [
        'Two experience bullets lack active engineering verbs.',
        'Missing Docker & Kubernetes containerization keywords in target JD.'
      ],
      grammarSuggestions: [
        "Consider replacing passive phrase 'responsible for' with 'Spearheaded' or 'Engineered'."
      ],
      createdAt: new Date().toISOString()
    };
  },

  async generateCoverLetterWithAi(payload: CoverLetterRequestPayload): Promise<CoverLetterResponseData> {
    await delay(1100);
    const greeting = `Dear Hiring Manager at ${payload.companyName},`;
    const opening = `I am writing to express my enthusiastic interest in the ${payload.jobTitle} position at ${payload.companyName}. With over 4+ years of hands-on experience engineering high-concurrency microservices, robust backend architectures in Java Spring Boot, and modern React 18 frontends, I am eager to contribute to your engineering goals.`;
    const valueProp = `In my recent role, I architected distributed systems handling over 120K daily active transactions while reducing API latency by 38%. My approach combines rigorous software engineering standards with empirical benchmarking to deliver resilient product features.`;
    const skills = `My technical background aligns directly with ${payload.companyName}'s requirements, including Java 21, Spring Boot 3.3, React 18, TypeScript, PostgreSQL 16, and Docker containerization. I thrive in collaborative Agile teams where clean architecture and rapid iteration are prioritized.`;
    const closing = `I would welcome the opportunity to discuss how my technical expertise and background can add immediate value to the ${payload.jobTitle} team at ${payload.companyName}. Thank you for your time and consideration.`;
    const signature = `Sincerely,\nVivek Patil\nSenior Full Stack Engineer`;

    const fullContent = `${greeting}\n\n${opening}\n\n${valueProp}\n\n${skills}\n\n${closing}\n\n${signature}`;

    return {
      id: `cl_${Date.now()}`,
      companyName: payload.companyName,
      jobTitle: payload.jobTitle,
      stylePreset: payload.stylePreset,
      fullContent,
      greeting,
      openingParagraph: opening,
      valuePropParagraph: valueProp,
      skillsParagraph: skills,
      closingParagraph: closing,
      signature,
      createdAt: new Date().toISOString()
    };
  },

  async exportCoverLetterPdf(id: string): Promise<void> {
    await delay(400);
    alert(`Downloading formatted PDF output for Cover Letter ID: ${id}`);
  },

  async startInterviewSession(payload: StartInterviewPayload): Promise<InterviewSessionData> {
    await delay(800);
    return {
      id: `sess_${Date.now()}`,
      companyName: payload.companyName,
      jobRole: payload.jobRole,
      interviewType: payload.interviewType,
      difficultyLevel: payload.difficultyLevel,
      totalQuestions: 3,
      currentQuestionIndex: 0,
      isCompleted: false,
      overallScore: 0,
      questions: [
        {
          id: 'q_101',
          questionNumber: 1,
          questionText: 'How do you prevent database connection pool exhaustion when executing high-latency third-party REST API calls in Spring Boot?',
          category: 'Backend Architecture',
          expectedStructure: 'Mention Virtual Threads / @Async pools, micro-scoped @Transactional boundaries, and HikariCP connection tuning.'
        },
        {
          id: 'q_102',
          questionNumber: 2,
          questionText: 'Walk me through a high-concurrency SQL query optimization strategy using EXPLAIN ANALYZE in PostgreSQL.',
          category: 'Database Performance',
          expectedStructure: 'Explain reading query execution plan, identifying Seq Scans, building composite / GIN indexes, and avoiding N+1 selects.'
        },
        {
          id: 'q_103',
          questionNumber: 3,
          questionText: 'Design a distributed rate-limiter for an enterprise API gateway handling 100K requests per second.',
          category: 'System Design',
          expectedStructure: 'Discuss Redis Sliding Window Log or Token Bucket algorithm, distributed Redis cluster key partitioning, and 429 Too Many Requests response headers.'
        }
      ],
      createdAt: new Date().toISOString()
    };
  },

  async submitInterviewAnswer(questionId: string, userAnswerText: string, secondsTaken: number): Promise<AnswerEvaluationData> {
    await delay(900);
    const len = userAnswerText.length;
    const tech = Math.min(40, Math.max(28, Math.floor(len / 10)));
    const comm = Math.min(30, Math.max(22, Math.floor(len / 12)));
    const star = Math.min(30, Math.max(20, Math.floor(len / 15)));

    return {
      questionId,
      score: tech + comm + star,
      technicalScore: tech,
      communicationScore: comm,
      starScore: star,
      strengths: [
        'Clear technical terminology used (Spring Boot, REST API, Microservices).',
        'Structured response addressing core problem constraints.'
      ],
      weaknesses: [
        'Could quantify impact further (e.g. "% latency reduction" or "$ cost savings").',
        'Elaborate more on error handling and fallback strategies.'
      ],
      sampleAnswer: 'In my previous project, we decoupled database operations from third-party API calls using Spring Boot Virtual Threads (@Async). This reduced thread blocking, keeping HikariCP pool utilization under 20% and improving overall throughput by 42%.',
      missingKeywords: ['Virtual Threads', 'HikariCP Pool', 'Circuit Breaker'],
      improvementTips: [
        'Follow the STAR format explicitly: Situation -> Task -> Action -> Result.',
        'Always include at least one concrete numerical metric in your engineering results.'
      ]
    };
  },

  async getInterviewReport(sessionId: string): Promise<InterviewReportData> {
    await delay(400);
    return {
      id: `rep_${Date.now()}`,
      sessionId,
      companyName: 'Google',
      jobRole: 'Senior Full Stack Engineer',
      overallScore: 86,
      skillScores: {
        'System Design & Architecture': 88,
        'Backend Java Spring Boot': 92,
        'Database & Query Tuning': 84,
        'Communication & STAR Method': 78
      },
      weakTopics: ['Distributed Rate Limiting', 'Quantified ROI Metrics'],
      strongTopics: ['Spring Boot Microservices', 'PostgreSQL Indexing', 'REST API Security'],
      roadmap: [
        { topic: 'STAR Method Quantified Metrics', actionItem: "Practice framing results with '% latency reduction' and '$ ROI'", estimatedTime: '2 Hours' },
        { topic: 'Database Lock Contention', actionItem: 'Review PostgreSQL GIN indexes & isolation levels', estimatedTime: '3 Hours' }
      ],
      totalDurationSeconds: 480,
      createdAt: new Date().toISOString()
    };
  },

  async exportInterviewReportPdf(sessionId: string): Promise<void> {
    await delay(400);
    alert(`Downloading formatted PDF output for Interview Report ID: ${sessionId}`);
  },

  async generateCareerRoadmap(payload: CareerGoalPayload): Promise<CareerRoadmapData> {
    await delay(1000);
    return {
      id: `roadmap_${Date.now()}`,
      dreamCompany: payload.dreamCompany,
      dreamRole: payload.dreamRole,
      readinessScore: 83,
      categoryScores: {
        'Technical Skills': 82,
        'Resume Quality': 88,
        'ATS Score': 78,
        'Interview Readiness': 86,
        'Projects Portfolio': 80,
        'Certifications': 70,
        'Communication': 84
      },
      skillGaps: {
        missingSkills: ['Docker & Kubernetes Containerization', 'Redis In-Memory Caching', 'GraphQL Schema Design', 'Prometheus Observability'],
        missingTools: ['Terraform', 'GitHub Actions CI/CD', 'k6 Load Testing', 'Helm Charts'],
        missingSoftSkills: ['Technical Leadership', 'Cross-Team Architecture Communication', 'Mentorship'],
        missingCertifications: ['AWS Certified Solutions Architect - Associate', 'Certified Kubernetes Application Developer (CKAD)'],
        missingProjects: ['Distributed Microservices API Gateway with Rate Limiter', 'Real-time Event Streaming Platform with Apache Kafka']
      },
      milestones: [
        {
          phase: '30_DAYS',
          title: 'Phase 1: DevOps & Docker Containerization Foundation',
          skillsToLearn: ['Docker Multi-stage Builds', 'Kubernetes Pods & Deployments'],
          projectsToBuild: ['Containerize Spring Boot & PostgreSQL with Docker Compose'],
          certificationsToEarn: ['AWS Cloud Practitioner'],
          practiceSchedule: '15 Hours/Week: 1 Hr Daily Coding + Weekend Project Building'
        },
        {
          phase: '60_DAYS',
          title: 'Phase 2: Redis Caching & Distributed Rate Limiter',
          skillsToLearn: ['Redis Sliding Window Rate Limiter', 'Spring Data Redis Cacheable'],
          projectsToBuild: ['Build High-Throughput Rate-Limiting API Gateway'],
          certificationsToEarn: ['AWS Solutions Architect Associate'],
          practiceSchedule: '18 Hours/Week: System Design Diagrams + LeetCode Mediums'
        },
        {
          phase: '90_DAYS',
          title: 'Phase 3: FAANG System Design & STAR Interview Polish',
          skillsToLearn: ['Kafka Event Streaming', 'High Availability & Lock Contention'],
          projectsToBuild: ['Deploy CareerOS Production Microservices Cluster'],
          certificationsToEarn: ['CKAD Kubernetes Certification'],
          practiceSchedule: '20 Hours/Week: 2 Mock AI Interviews Weekly + Resume ATS Check'
        }
      ],
      weeklyTracker: {
        weekNumber: 4,
        streakDays: 12,
        skillsCompleted: 8,
        projectsCompleted: 2,
        progressPercent: 68
      },
      createdAt: new Date().toISOString()
    };
  },

  async getCareerDashboard(): Promise<CareerRoadmapData> {
    return this.generateCareerRoadmap({ dreamCompany: 'Google', dreamRole: 'Senior Full Stack Engineer', targetTimelineMonths: 6, targetSalaryInr: 3500000 });
  },

  async getLearningResources(role?: string): Promise<LearningResourceData[]> {
    await delay(300);
    return [
      { id: 'res_1', title: 'Java Spring Boot 3.3 Production Microservices', resourceType: 'YOUTUBE', url: 'https://youtube.com', category: 'Backend Architecture', difficultyLevel: 'INTERMEDIATE' },
      { id: 'res_2', title: 'Official PostgreSQL Query Optimization & EXPLAIN Manual', resourceType: 'DOCUMENTATION', url: 'https://postgresql.org/docs', category: 'Database Performance', difficultyLevel: 'ADVANCED' },
      { id: 'res_3', title: 'LeetCode & System Design Primer', resourceType: 'PRACTICE_PLATFORM', url: 'https://leetcode.com', category: 'Algorithms & System Design', difficultyLevel: 'FAANG' },
      { id: 'res_4', title: 'Designing Data-Intensive Applications (Martin Kleppmann)', resourceType: 'BOOK', url: 'https://oreilly.com', category: 'Distributed Systems', difficultyLevel: 'ADVANCED' },
      { id: 'res_5', title: 'CareerOS AI SaaS Reference Architecture', resourceType: 'GITHUB', url: 'https://github.com', category: 'Full Stack Enterprise', difficultyLevel: 'INTERMEDIATE' }
    ];
  },

  // APPLICATION TRACKER API
  async getJobApplications(): Promise<JobApplicationData[]> {
    await delay(300);
    return [...mockJobApps];
  },

  async createJobApplication(payload: Partial<JobApplicationData>): Promise<JobApplicationData> {
    await delay(400);
    const newApp: JobApplicationData = {
      id: `job_${Date.now()}`,
      userId: 'usr_1001',
      companyName: payload.companyName || 'TechCorp',
      jobTitle: payload.jobTitle || 'Software Developer',
      status: payload.status || 'APPLIED',
      salaryOfferedInr: payload.salaryOfferedInr || 3500000,
      location: payload.location || 'Remote',
      jobUrl: payload.jobUrl || '',
      notes: payload.notes || '',
      appliedDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    mockJobApps.unshift(newApp);
    return newApp;
  },

  async updateJobApplicationStatus(id: string, status: string): Promise<JobApplicationData> {
    await delay(300);
    mockJobApps = mockJobApps.map(a => a.id === id ? { ...a, status } : a);
    return mockJobApps.find(a => a.id === id) || mockJobApps[0];
  },

  async deleteJobApplication(id: string): Promise<boolean> {
    await delay(300);
    mockJobApps = mockJobApps.filter(a => a.id !== id);
    return true;
  },

  async getJobTrackerStats(): Promise<{ total: number; applied: number; interviewing: number; offers: number; wishlist: number }> {
    await delay(200);
    return {
      total: mockJobApps.length,
      applied: mockJobApps.filter(a => a.status === 'APPLIED').length,
      interviewing: mockJobApps.filter(a => a.status === 'INTERVIEWING').length,
      offers: mockJobApps.filter(a => a.status === 'OFFER').length,
      wishlist: mockJobApps.filter(a => a.status === 'WISHLIST').length
    };
  },

  // PROFILE & NOTIFICATION API
  async getUserProfile(): Promise<UserProfileData> {
    await delay(300);
    return { ...mockProfile };
  },

  async updateUserProfile(payload: Partial<UserProfileData>): Promise<UserProfileData> {
    await delay(400);
    mockProfile = {
      ...mockProfile,
      ...payload
    };
    return { ...mockProfile };
  },

  async getUserNotifications(): Promise<UserNotificationData[]> {
    await delay(300);
    return [...mockNotifications];
  },

  async markNotificationRead(id: string): Promise<boolean> {
    await delay(200);
    mockNotifications = mockNotifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    return true;
  },

  // SPRINT 9: ADMIN INTELLIGENCE METHODS
  async getAdminDashboardMetrics(): Promise<AdminDashboardMetricsData> {
    await delay(400);
    return {
      totalUsers: 1280,
      activeUsers: 1120,
      premiumUsers: 142,
      todaySignups: 18,
      monthlyRevenueInr: 6958,
      totalRevenueInr: 83496,
      totalAtsAnalyses: 4820,
      totalAiRewrites: 3120,
      totalCoverLetters: 1890,
      totalInterviews: 940,
      totalCareerRoadmaps: 650
    };
  },

  async getAdminUsersList(): Promise<AdminUserData[]> {
    await delay(400);
    return [
      { id: 'usr_1001', email: 'vikipatil972@gmail.com', firstName: 'Vivek', lastName: 'Patil', role: 'ROLE_USER', isBlocked: false, planCode: 'PLAN_FREE', createdAt: new Date(Date.now() - 172800000).toISOString() },
      { id: 'usr_1002', email: 'priya.verma@example.com', firstName: 'Priya', lastName: 'Verma', role: 'ROLE_PREMIUM_USER', isBlocked: false, planCode: 'PLAN_PREMIUM_MONTHLY', createdAt: new Date(Date.now() - 864000000).toISOString() },
      { id: 'usr_1003', email: 'amit.kumar@example.com', firstName: 'Amit', lastName: 'Kumar', role: 'ROLE_USER', isBlocked: true, planCode: 'PLAN_FREE', createdAt: new Date(Date.now() - 2592000000).toISOString() },
      { id: 'usr_admin', email: 'admin@careeros.ai', firstName: 'System', lastName: 'Admin', role: 'ROLE_ADMIN', isBlocked: false, planCode: 'PLAN_CAREER_PRO', createdAt: new Date(Date.now() - 5184000000).toISOString() }
    ];
  },

  async blockUser(userId: string): Promise<boolean> {
    await delay(300);
    return true;
  },

  async unblockUser(userId: string): Promise<boolean> {
    await delay(300);
    return true;
  },

  async changeUserPlan(userId: string, newPlanCode: string): Promise<boolean> {
    await delay(300);
    return true;
  },

  async getAdminPayments(): Promise<Payment[]> {
    await delay(300);
    return mockPayments;
  },

  async getSystemHealth(): Promise<SystemHealthData> {
    await delay(300);
    return {
      status: 'HEALTHY',
      cpuUsagePercent: 14.2,
      memoryUsedMb: 512,
      activeDbConnections: 12,
      uptimeSeconds: 172800,
      checkedAt: new Date().toISOString()
    };
  },

  async getAuditLogs(): Promise<AuditLogEntryData[]> {
    await delay(300);
    return [
      { id: 'log_1001', adminId: 'usr_admin', actionType: 'BLOCK_USER', targetUserId: 'usr_1003', details: 'Blocked user account due to suspicious API rate activity', ipAddress: '192.168.1.10', createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'log_1002', adminId: 'usr_admin', actionType: 'CHANGE_PLAN', targetUserId: 'usr_1002', details: 'Upgraded plan to PLAN_PREMIUM_MONTHLY', ipAddress: '192.168.1.10', createdAt: new Date(Date.now() - 7200000).toISOString() },
      { id: 'log_1003', adminId: 'usr_admin', actionType: 'PRICE_CHANGE', targetUserId: 'PLAN_PREMIUM_MONTHLY', details: 'Updated price to 49 INR', ipAddress: '192.168.1.10', createdAt: new Date(Date.now() - 86400000).toISOString() }
    ];
  },

  async rewriteBulletPoint(originalBullet: string, targetRole: string): Promise<BulletRewrite> {
    await delay(1000);
    return {
      id: `rewrite_${Date.now()}`,
      originalBullet,
      optimizedBullet: `Architected 14 RESTful Spring Boot microservices for ${targetRole || 'Software Engineer'}, reducing API execution latency by 38% across 120K daily active transactions.`,
      targetRole: targetRole || 'Senior Software Engineer',
      impactMetricsAdded: 'Reduced latency by 38%, Handled 120K daily transactions',
      verbUsed: 'Architected & Optimized'
    };
  },

  async generateCoverLetter(resumeText: string, targetJd: string): Promise<string> {
    await delay(1200);
    return `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Developer role. With a proven track record in building high-throughput microservices using Java Spring Boot, React, and PostgreSQL, I am confident in my ability to immediately add value to your engineering team.

In my recent experience, I architected distributed web platforms handling 100K+ active users while optimizing API latency and maintaining high system availability. My technical skill set aligns directly with your requirement for robust backend engineering, automated testing, and scalable database design.

I look forward to discussing how my experience and technical background can help drive key technical goals at your organization.

Sincerely,
${mockUser.firstName} ${mockUser.lastName}`;
  },

  async generateInterviewQuestions(targetJd: string): Promise<Array<{ question: string; type: string; sampleAnswer: string }>> {
    await delay(1200);
    return [
      {
        question: 'How do you prevent database connection pool exhaustion when executing long-running third-party API calls in Spring Boot?',
        type: 'Hard Technical',
        sampleAnswer: 'Separate database transactions from external I/O using Virtual Threads or `@Async` decoupled execution pools. Keep `@Transactional` methods micro-scoped (<10ms) so connection objects return to HikariCP instantly.'
      },
      {
        question: 'Describe a scenario where you optimized a low-performing SQL query. What metrics did you evaluate?',
        type: 'Database / System Design',
        sampleAnswer: 'Analyzed query execution plans using EXPLAIN ANALYZE, identified missing GIN indexes on JSONB fields, created composite indexes on high-cardinality foreign keys, reducing query runtime from 1.4s to 12ms.'
      },
      {
        question: 'Tell me about a time you had a technical disagreement with a teammate on architecture choices.',
        type: 'Behavioral (STAR Method)',
        sampleAnswer: 'Used empirical benchmarking data (load testing with k6) to compare monolithic vs microservices approaches objectively, demonstrating latency tradeoffs and reaching team consensus.'
      }
    ];
  },

  async processCheckout(planCode: string, provider: PaymentProvider): Promise<{ subscription: Subscription; payment: Payment }> {
    await delay(1500);

    const plan = mockSubscriptionPlans.find((p) => p.planCode === planCode) || mockSubscriptionPlans[0];

    const now = new Date();
    const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    mockSubscription = {
      id: `sub_${Date.now()}`,
      userId: mockUser.id,
      planCode: plan.planCode,
      planName: plan.name,
      priceInr: plan.priceInr,
      status: 'ACTIVE',
      provider,
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: periodEnd.toISOString(),
      cancelAtPeriodEnd: false
    };

    mockUser.role = 'ROLE_PREMIUM_USER';

    const payment: Payment = {
      id: `pay_${Date.now()}`,
      userId: mockUser.id,
      subscriptionId: mockSubscription.id,
      amountInr: plan.priceInr,
      currency: 'INR',
      provider,
      providerPaymentId: `${provider.toLowerCase()}_pay_${Math.random().toString(36).substring(7)}`,
      status: 'SUCCESS',
      invoiceId: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: now.toISOString()
    };

    mockPayments.unshift(payment);

    return { subscription: mockSubscription, payment };
  },

  async getSubscriptionStatus(): Promise<{ subscription: Subscription | null; plans: SubscriptionPlan[]; payments: Payment[] }> {
    await delay(300);
    return {
      subscription: mockSubscription,
      plans: mockSubscriptionPlans,
      payments: mockPayments
    };
  },

  async updateAdminPlanPrice(planCode: string, newPrice: number): Promise<SubscriptionPlan[]> {
    await delay(500);
    mockSubscriptionPlans = mockSubscriptionPlans.map((plan) =>
      plan.planCode === planCode ? { ...plan, priceInr: newPrice } : plan
    );
    return [...mockSubscriptionPlans];
  },

  async getAdminMetrics(): Promise<AdminMetrics> {
    await delay(400);
    const premiumCount = mockUser.role === 'ROLE_PREMIUM_USER' ? 142 : 141;
    const currentPrice = mockSubscriptionPlans[0]?.priceInr || 49;
    return {
      mrrInr: premiumCount * currentPrice,
      arrInr: premiumCount * currentPrice * 12,
      totalUsers: 1280,
      activePremiumUsers: premiumCount,
      expiredUsers: 28,
      dailyRevenueInr: 1862,
      failedPaymentCount: 3
    };
  }
};
