import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { InterviewSessionData } from '../types';
import {
  FileCheck2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Crown,
  FileText,
  Zap,
  Target,
  UploadCloud,
  Edit3,
  History,
  Download,
  Bot,
  Award
} from 'lucide-react';
import { ResumeUploaderModal } from '../components/resume/ResumeUploaderModal';
import { ResumeEditorModal } from '../components/resume/ResumeEditorModal';
import { ResumeVersionHistoryModal } from '../components/resume/ResumeVersionHistoryModal';
import { InterviewSetupModal } from '../components/interview/InterviewSetupModal';
import { InterviewSimulatorWorkspace } from '../components/interview/InterviewSimulatorWorkspace';
import { InterviewReportModal } from '../components/interview/InterviewReportModal';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user, subscription } = useAuth();
  const isPremium = user?.role === 'ROLE_PREMIUM_USER' || subscription?.status === 'ACTIVE';

  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeResumeId, setActiveResumeId] = useState('res_1001');

  // Sprint 6 Interview State
  const [isInterviewSetupOpen, setIsInterviewSetupOpen] = useState(false);
  const [activeInterviewSession, setActiveInterviewSession] = useState<InterviewSessionData | null>(null);
  const [isInterviewReportOpen, setIsInterviewReportOpen] = useState(false);
  const [reportSessionId, setReportSessionId] = useState<string>('');

  const sampleStructuredData = {
    contactInfo: {
      name: `${user?.firstName || 'Rahul'} ${user?.lastName || 'Sharma'}`,
      email: user?.email || 'rahul.sharma@example.com',
      phone: '+1 (555) 019-2834',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/rahulsharma',
      github: 'https://github.com/rahulsharma',
      portfolio: 'https://rahulsharma.dev'
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
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationYear: '2020',
        grade: '3.8 GPA'
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
        liveUrl: 'https://careeros.ai'
      }
    ],
    certifications: ['AWS Certified Solutions Architect'],
    languages: ['English (Native)', 'Hindi (Fluent)'],
    links: {
      LinkedIn: 'https://linkedin.com/in/rahulsharma',
      GitHub: 'https://github.com/rahulsharma'
    }
  };

  const handleExportPdf = (id: string) => {
    apiService.exportResumePdf(id);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-card-elevated p-8 border border-brand-500/30">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" /> AI Career Partner Online
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="gradient-text">{user?.firstName || 'Rahul'}</span>! 👋
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Your primary resume is optimized for <strong className="text-gray-200 font-semibold">Full Stack Java Developer</strong> roles.
              Practice AI interviews or analyze your ATS score below.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsInterviewSetupOpen(true)}
              className="gradient-button text-white font-extrabold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Bot className="w-4 h-4" /> Start AI Interview Practice
            </button>
            <button
              onClick={() => setIsUploaderOpen(true)}
              className="bg-surface-elevated hover:bg-surface-card text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-surface-border flex items-center gap-2 transition-all"
            >
              <UploadCloud className="w-4 h-4 text-brand-500" /> Upload Resume
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="glass-card p-5 rounded-2xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Latest ATS Match Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">78</span>
            <span className="text-sm font-bold text-gray-400">/ 100</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center ml-auto">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
            </span>
          </div>
          <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-2 rounded-full w-[78%]"></div>
          </div>
          <span className="text-[11px] text-gray-400 block">Top 15% candidate percentile match</span>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-5 rounded-2xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">AI Interview Performance</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">86%</span>
            <span className="text-xs font-bold text-purple-400">FAANG Ready</span>
          </div>
          <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
            <div className="bg-purple-500 h-2 rounded-full w-[86%]"></div>
          </div>
          <span className="text-[11px] text-gray-400 block">3 Mock sessions completed</span>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-5 rounded-2xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Resumes & Versions</span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">4</span>
            <span className="text-xs font-medium text-gray-400">Versions Managed</span>
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> SHA-256 validation active
          </span>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-5 rounded-2xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Subscription Status</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            {isPremium ? (
              <span className="text-lg font-bold text-emerald-400">Premium Active</span>
            ) : (
              <span className="text-lg font-bold text-white">Free Plan ({user?.freeAnalysesUsed || 1}/3)</span>
            )}
          </div>
          {!isPremium && (
            <button
              onClick={() => onNavigate('billing')}
              className="text-xs font-semibold text-brand-500 hover:text-brand-400 flex items-center gap-1 transition-colors"
            >
              Upgrade for ₹49 <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Resumes & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-500" /> Active Primary Resume & History
            </h2>
            <button
              onClick={() => setIsUploaderOpen(true)}
              className="text-xs text-brand-500 font-semibold hover:text-brand-400 flex items-center gap-1"
            >
              + Upload New Version
            </button>
          </div>

          <div className="space-y-4">
            {/* Resume Item 1 */}
            <div className="glass-card p-5 rounded-2xl space-y-4 hover:border-brand-500/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-brand-400 font-extrabold text-xs">
                    PDF
                  </div>
                  <div>
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <span>SDE_Java_Backend_v2.pdf</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        Version 2
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                      <span>Target: Full Stack Developer</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last Upload: 2 hours ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ATS 78%
                  </span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-border">
                <button
                  onClick={() => {
                    setActiveResumeId('res_1001');
                    setIsEditorOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-surface-elevated hover:bg-surface-card text-white border border-surface-border flex items-center gap-1.5 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-brand-400" /> Edit Structured Resume
                </button>

                <button
                  onClick={() => {
                    setActiveResumeId('res_1001');
                    setIsHistoryOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-surface-elevated hover:bg-surface-card text-white border border-surface-border flex items-center gap-1.5 transition-all"
                >
                  <History className="w-3.5 h-3.5 text-purple-400" /> Version History (v2)
                </button>

                <button
                  onClick={() => handleExportPdf('res_1001')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-surface-elevated hover:bg-surface-card text-white border border-surface-border flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" /> Download PDF
                </button>

                <button
                  onClick={() => onNavigate('analyzer')}
                  className="gradient-button text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1 ml-auto"
                >
                  Run ATS Diagnostic <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: AI Assistant Recommendations */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" /> AI Practice Simulator
          </h2>

          <div className="glass-card-elevated p-5 rounded-2xl space-y-4 border border-purple-500/30">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">Mock FAANG Technical Round</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Practice <strong className="text-white">System Design & STAR Behavioral Questions</strong> tailored to Google, Stripe, and Microsoft openings.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsInterviewSetupOpen(true)}
              className="w-full py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs font-semibold rounded-xl border border-purple-500/40 transition-all flex items-center justify-center gap-1.5"
            >
              Start AI Mock Interview <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Resume Modals */}
      <ResumeUploaderModal
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onUploadSuccess={(res) => {
          setActiveResumeId(res.id);
          setIsEditorOpen(true);
        }}
      />

      <ResumeEditorModal
        isOpen={isEditorOpen}
        resumeId={activeResumeId}
        initialData={sampleStructuredData}
        onClose={() => setIsEditorOpen(false)}
        onSaveSuccess={() => {}}
      />

      <ResumeVersionHistoryModal
        isOpen={isHistoryOpen}
        resumeId={activeResumeId}
        onClose={() => setIsHistoryOpen(false)}
        onRestoreSuccess={() => {}}
      />

      {/* Sprint 6 Interview Modals */}
      <InterviewSetupModal
        isOpen={isInterviewSetupOpen}
        onClose={() => setIsInterviewSetupOpen(false)}
        onSessionStarted={(session) => {
          setActiveInterviewSession(session);
        }}
      />

      {activeInterviewSession && (
        <InterviewSimulatorWorkspace
          isOpen={!!activeInterviewSession}
          session={activeInterviewSession}
          onClose={() => setActiveInterviewSession(null)}
          onFinishSession={(sessionId) => {
            setActiveInterviewSession(null);
            setReportSessionId(sessionId);
            setIsInterviewReportOpen(true);
          }}
        />
      )}

      <InterviewReportModal
        isOpen={isInterviewReportOpen}
        sessionId={reportSessionId || 'sess_1001'}
        onClose={() => setIsInterviewReportOpen(false)}
      />
    </div>
  );
};
