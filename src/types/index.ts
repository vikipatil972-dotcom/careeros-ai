export type UserRole = 'ROLE_USER' | 'ROLE_PREMIUM_USER' | 'ROLE_ADMIN' | 'ROLE_SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  freeAnalysesUsed: number;
  maxFreeAnalyses: number;
  createdAt: string;
}

export interface JobApplicationData {
  id: string;
  userId: string;
  companyName: string;
  jobTitle: string;
  status: 'WISHLIST' | 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED' | string;
  salaryOfferedInr: number;
  location: string;
  jobUrl?: string;
  notes?: string;
  appliedDate: string;
  createdAt: string;
}

export interface UserProfileData {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  phone: string;
  location: string;
  targetSalaryInr: number;
  preferredRoles: string[];
}

export interface UserNotificationData {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'SYSTEM' | 'ATS_ALERT' | 'INTERVIEW_REMINDER' | 'BILLING' | string;
  isRead: boolean;
  createdAt: string;
}

export interface ResumeVersion {
  id: string;
  resumeId: string;
  versionNumber: number;
  rawText: string;
  structuredJson: {
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      linkedin?: string;
      github?: string;
    };
    summary: string;
    workExperience: Array<{
      company: string;
      role: string;
      startDate: string;
      endDate: string;
      bulletPoints: string[];
    }>;
    education: Array<{
      institution: string;
      degree: string;
      field: string;
      graduationYear: string;
    }>;
    skills: {
      hardSkills: string[];
      softSkills: string[];
      tools: string[];
    };
  };
  fileStorageUrl?: string;
  createdAt: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  targetJobTitle: string;
  isPrimary: boolean;
  latestVersion?: ResumeVersion;
  createdAt: string;
  updatedAt: string;
}

export interface AtsCategoryScores {
  skillsMatch: number;         // Max 20
  keywordsMatch: number;       // Max 15
  experienceMatch: number;     // Max 15
  educationMatch: number;      // Max 10
  resumeStructure: number;     // Max 10
  actionVerbs: number;         // Max 10
  measurableAchievements: number; // Max 10
  formattingQuality: number;   // Max 5
  contactInfo: number;         // Max 3
  atsCompatibility: number;    // Max 2
}

export interface KeywordItem {
  keyword: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ChecklistItem {
  category: string;
  recommendation: string;
  potentialImpact: string;
  isCompleted: boolean;
}

export interface AtsDetailedReport {
  id: string;
  resumeId: string;
  overallScore: number;
  categoryScores: AtsCategoryScores;
  matchingKeywords: KeywordItem[];
  missingKeywords: KeywordItem[];
  strengths: string[];
  weaknesses: string[];
  improvementChecklist: ChecklistItem[];
  createdAt: string;
}

export type RewriteStyle = 'PROFESSIONAL' | 'ATS_OPTIMIZED' | 'FRESHER' | 'EXPERIENCED' | 'TECHNICAL' | 'LEADERSHIP' | 'CONCISE' | 'PREMIUM';

export interface AiRewriteRequestPayload {
  resumeId: string;
  sectionName: string;
  stylePreset: RewriteStyle;
  originalContent: string;
  targetRoleTitle?: string;
}

export interface AiRewriteResultResponse {
  id: string;
  resumeId: string;
  sectionName: string;
  stylePreset: RewriteStyle;
  originalContent: string;
  rewrittenContent: string;
  scoreBefore: number;
  scoreAfter: number;
  scoreDelta: number;
  explanation: string;
  keywordsAdded: string[];
  providerName: string;
  createdAt: string;
}

export interface ResumeQualityReportData {
  id: string;
  resumeId: string;
  readabilityScore: number;
  toneScore: number;
  atsCompatibilityIndex: number;
  strongSections: string[];
  weakSections: string[];
  grammarSuggestions: string[];
  createdAt: string;
}

export interface CoverLetterRequestPayload {
  resumeId?: string;
  companyName: string;
  jobTitle: string;
  stylePreset: string;
  jobDescription?: string;
}

export interface CoverLetterResponseData {
  id: string;
  companyName: string;
  jobTitle: string;
  stylePreset: string;
  fullContent: string;
  greeting: string;
  openingParagraph: string;
  valuePropParagraph: string;
  skillsParagraph: string;
  closingParagraph: string;
  signature: string;
  createdAt: string;
}

export type InterviewType = 'HR' | 'TECHNICAL' | 'BEHAVIORAL' | 'SYSTEM_DESIGN' | 'MANAGERIAL' | 'MIXED';

export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'FAANG';

export interface InterviewQuestionItem {
  id: string;
  questionNumber: number;
  questionText: string;
  category: string;
  expectedStructure: string;
}

export interface StartInterviewPayload {
  resumeId?: string;
  companyName: string;
  jobRole: string;
  interviewType: InterviewType;
  difficultyLevel: DifficultyLevel;
  totalQuestions?: number;
  jobDescription?: string;
}

export interface InterviewSessionData {
  id: string;
  companyName: string;
  jobRole: string;
  interviewType: InterviewType;
  difficultyLevel: DifficultyLevel;
  totalQuestions: number;
  currentQuestionIndex: number;
  isCompleted: boolean;
  overallScore: number;
  questions: InterviewQuestionItem[];
  createdAt: string;
}

export interface AnswerEvaluationData {
  questionId: string;
  score: number;
  technicalScore: number;
  communicationScore: number;
  starScore: number;
  strengths: string[];
  weaknesses: string[];
  sampleAnswer: string;
  missingKeywords: string[];
  improvementTips: string[];
}

export interface InterviewReportData {
  id: string;
  sessionId: string;
  companyName: string;
  jobRole: string;
  overallScore: number;
  skillScores: Record<string, number>;
  weakTopics: string[];
  strongTopics: string[];
  roadmap: Array<{
    topic: string;
    actionItem: string;
    estimatedTime: string;
  }>;
  totalDurationSeconds: number;
  createdAt: string;
}

export interface CareerGoalPayload {
  dreamCompany: string;
  dreamRole: string;
  currentSkills?: string[];
  targetSalaryInr?: number;
  targetTimelineMonths?: number;
}

export interface SkillGapAnalysisData {
  missingSkills: string[];
  missingTools: string[];
  missingSoftSkills: string[];
  missingCertifications: string[];
  missingProjects: string[];
}

export interface MilestoneItemData {
  phase: string;
  title: string;
  skillsToLearn: string[];
  projectsToBuild: string[];
  certificationsToEarn: string[];
  practiceSchedule: string;
}

export interface WeeklyTrackerData {
  weekNumber: number;
  streakDays: number;
  skillsCompleted: number;
  projectsCompleted: number;
  progressPercent: number;
}

export interface CareerRoadmapData {
  id: string;
  dreamCompany: string;
  dreamRole: string;
  readinessScore: number;
  categoryScores: Record<string, number>;
  skillGaps: SkillGapAnalysisData;
  milestones: MilestoneItemData[];
  weeklyTracker: WeeklyTrackerData;
  createdAt: string;
}

export interface LearningResourceData {
  id: string;
  title: string;
  resourceType: string;
  url: string;
  category: string;
  difficultyLevel: string;
}

export interface AdminDashboardMetricsData {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  todaySignups: number;
  monthlyRevenueInr: number;
  totalRevenueInr: number;
  totalAtsAnalyses: number;
  totalAiRewrites: number;
  totalCoverLetters: number;
  totalInterviews: number;
  totalCareerRoadmaps: number;
}

export interface AdminUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isBlocked: boolean;
  planCode: string;
  createdAt: string;
}

export interface SystemHealthData {
  status: string;
  cpuUsagePercent: number;
  memoryUsedMb: number;
  activeDbConnections: number;
  uptimeSeconds: number;
  checkedAt: string;
}

export interface AuditLogEntryData {
  id: string;
  adminId: string;
  actionType: string;
  targetUserId: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface AtsAnalysis {
  id: string;
  resumeVersionId: string;
  targetJobDescription: string;
  overallScore: number;
  keywordScore: number;
  impactScore: number;
  formattingScore: number;
  verbScore: number;
  missingKeywords: Array<{ keyword: string; importance: 'HIGH' | 'MEDIUM' | 'LOW' }>;
  recommendations: Array<{ category: string; text: string; impact: string }>;
  createdAt: string;
}

export interface BulletRewrite {
  id: string;
  originalBullet: string;
  optimizedBullet: string;
  targetRole: string;
  impactMetricsAdded: string;
  verbUsed: string;
}

export type SubscriptionStatus = 'PENDING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'EXPIRED' | 'REFUNDED';

export type PaymentProvider = 'RAZORPAY' | 'CASHFREE' | 'PHONEPE' | 'STRIPE';

export interface SubscriptionPlan {
  id: string;
  planCode: string;
  name: string;
  priceInr: number;
  billingInterval: 'MONTHLY' | 'ANNUAL';
  features: string[];
  isActive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planCode: string;
  planName: string;
  priceInr: number;
  status: SubscriptionStatus;
  provider: PaymentProvider;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  subscriptionId?: string;
  amountInr: number;
  currency: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
  invoiceId: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  amountInr: number;
  taxInr: number;
  pdfUrl: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
}

export interface AdminMetrics {
  mrrInr: number;
  arrInr: number;
  totalUsers: number;
  activePremiumUsers: number;
  expiredUsers: number;
  dailyRevenueInr: number;
  failedPaymentCount: number;
}

export interface StructuredResumeData {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  workExperience: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    bulletPoints: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
    grade: string;
  }>;
  skills: {
    hardSkills: string[];
    softSkills: string[];
    tools: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologiesUsed: string[];
    liveUrl: string;
  }>;
  certifications: string[];
  languages: string[];
  links: Record<string, string>;
}

export interface ResumeUploadResponse {
  id: string;
  title: string;
  targetJobTitle: string;
  versionNumber: number;
  fileHash: string;
  fileFormat: string;
  fileSizeBytes: number;
  isDuplicateDetected: boolean;
  structuredData: StructuredResumeData;
  createdAt: string;
}
