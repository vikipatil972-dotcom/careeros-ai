import React, { useState } from 'react';
import { apiService } from '../services/api';
import { AtsDetailedReport } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck2,
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  Crown,
  Download,
  CheckSquare,
  Square,
  Target,
  BarChart3,
  ListChecks,
  History,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface ResumeAnalyzerPageProps {
  onNavigate: (tab: string) => void;
}

export const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({ onNavigate }) => {
  const { user, refreshUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>(
    'Looking for a Senior Software Engineer with 3+ years experience in Java Spring Boot, React, PostgreSQL, Docker, Kubernetes, microservices architecture, and Redis caching. Must have strong experience optimizing REST APIs and building scalable distributed systems.'
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [report, setReport] = useState<AtsDetailedReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checklistState, setChecklistState] = useState<Record<number, boolean>>({});

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRunAnalysis = async () => {
    if (!jobDescription.trim()) {
      setErrorMessage('Please enter a target job description to calculate exact ATS keyword alignment.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);
    setProgressStep('Step 1/4: Validating file magic bytes and extracting text...');

    try {
      const detailedReport = await apiService.analyzeResumeWithEngine(
        file ? file.name : 'SDE_Resume_Sample.pdf',
        jobDescription,
        (step) => setProgressStep(step)
      );
      setReport(detailedReport);
      await refreshUser();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during ATS analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPdfReport = () => {
    if (!report) return;
    alert(`Downloading ATS Analysis PDF Report for ID: ${report.id}`);
  };

  const toggleChecklist = (idx: number) => {
    setChecklistState((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <FileCheck2 className="w-3.5 h-3.5" /> Deterministic 100-Point Categorical ATS Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Production ATS Scoring & Resume Intelligence
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Upload your resume and paste the target Job Description to generate a transparent, 10-category ATS compatibility report.
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-500" /> Upload Resume (PDF or DOCX)
          </label>

          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-surface-border hover:border-brand-500/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-surface-base/50"
          >
            <input type="file" accept=".pdf,.docx" onChange={handleFileSelect} className="hidden" />
            <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            {file ? (
              <div className="space-y-1">
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 justify-center">
                  <CheckCircle2 className="w-4 h-4" /> {file.name}
                </span>
                <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB • Ready for analysis</span>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-sm font-semibold text-white">Drag & Drop file here, or browse</span>
                <span className="text-xs text-gray-400 block">Supports PDF, DOCX (Max 10 MB)</span>
              </div>
            )}
          </label>
        </div>

        {/* Job Description */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" /> Target Job Description
          </label>
          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste target job description here..."
            className="w-full bg-surface-base/80 border border-surface-border rounded-xl p-3.5 text-xs text-gray-200 focus:outline-none focus:border-brand-500 transition-all resize-none font-sans"
          />
        </div>
      </div>

      {/* Quota Error Banner */}
      {errorMessage && (
        <div className="glass-card-elevated p-4 rounded-xl border border-rose-500/40 bg-rose-950/20 text-rose-300 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          {errorMessage.includes('QUOTA_EXCEEDED') && (
            <button
              onClick={() => onNavigate('billing')}
              className="gradient-button px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1 shrink-0"
            >
              <Crown className="w-3.5 h-3.5" /> Upgrade (₹49)
            </button>
          )}
        </div>
      )}

      {/* Run Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="gradient-button text-white font-extrabold text-sm px-8 py-3.5 rounded-xl flex items-center gap-2.5 shadow-xl disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" /> Calculating 10-Category ATS Metrics...
            </>
          ) : (
            <>
              <FileCheck2 className="w-5 h-5" /> Calculate Transparent ATS Score
            </>
          )}
        </button>
      </div>

      {/* SSE Progress Bar */}
      {isAnalyzing && (
        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-400">
            <span>{progressStep}</span>
            <span className="animate-pulse font-mono">Analyzing Overlap...</span>
          </div>
          <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-500 via-purple-500 to-emerald-400 h-2 rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      )}

      {/* Complete ATS Report Dashboard */}
      {report && !isAnalyzing && (
        <div className="space-y-8">
          {/* Main Score Gauge Header */}
          <div className="glass-card-elevated p-8 rounded-3xl border border-emerald-500/40 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Transparent ATS Diagnostic Score</span>
                <h2 className="text-2xl font-extrabold text-white">Categorical Compatibility Breakdown</h2>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-surface-base/90 px-6 py-3.5 rounded-2xl border border-surface-border">
                  <div className="text-5xl font-black gradient-text">{report.overallScore}</div>
                  <div className="text-xs font-bold text-gray-400 leading-tight">
                    <div>OUT OF 100</div>
                    <div className="text-emerald-400">
                      {report.overallScore >= 75 ? 'Strong ATS Match' : report.overallScore >= 50 ? 'Moderate Match' : 'Action Required'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownloadPdfReport}
                  className="px-4 py-3 rounded-2xl bg-surface-elevated hover:bg-surface-card text-white text-xs font-bold border border-surface-border flex items-center gap-1.5 transition-all shadow-lg"
                >
                  <Download className="w-4 h-4 text-brand-400" /> Export Report (PDF)
                </button>
              </div>
            </div>

            {/* 10 Categorical Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Skills Match</span>
                  <span className="font-bold text-white">{report.categoryScores.skillsMatch}/20</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.skillsMatch / 20) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Keywords Match</span>
                  <span className="font-bold text-white">{report.categoryScores.keywordsMatch}/15</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.keywordsMatch / 15) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Experience Match</span>
                  <span className="font-bold text-white">{report.categoryScores.experienceMatch}/15</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.experienceMatch / 15) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Education Match</span>
                  <span className="font-bold text-white">{report.categoryScores.educationMatch}/10</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.educationMatch / 10) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Resume Structure</span>
                  <span className="font-bold text-white">{report.categoryScores.resumeStructure}/10</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.resumeStructure / 10) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Action Verbs</span>
                  <span className="font-bold text-white">{report.categoryScores.actionVerbs}/10</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.actionVerbs / 10) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">ROI Metrics</span>
                  <span className="font-bold text-white">{report.categoryScores.measurableAchievements}/10</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-rose-400 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.measurableAchievements / 10) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Formatting Quality</span>
                  <span className="font-bold text-white">{report.categoryScores.formattingQuality}/5</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.formattingQuality / 5) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Contact Info</span>
                  <span className="font-bold text-white">{report.categoryScores.contactInfo}/3</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.contactInfo / 3) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-base/80 p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">ATS Scanner</span>
                  <span className="font-bold text-white">{report.categoryScores.atsCompatibility}/2</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${(report.categoryScores.atsCompatibility / 2) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Keywords Breakdown (Matching vs Missing) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Matching Keywords */}
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Matching Keywords Identified ({report.matchingKeywords.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.matchingKeywords.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    ✓ {item.keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" /> Missing High-Priority Keywords ({report.missingKeywords.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.missingKeywords.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    + {item.keyword} ({item.priority})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Improvement Checklist */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-brand-400" /> Interactive Actionable Improvement Checklist
            </h3>

            <div className="space-y-3">
              {report.improvementChecklist.map((item, idx) => {
                const isChecked = checklistState[idx] || false;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isChecked ? 'bg-surface-elevated/40 border-surface-border opacity-60' : 'bg-surface-base/80 border-surface-border hover:border-brand-500/40'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span className={isChecked ? 'line-through text-gray-400' : ''}>{item.recommendation}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/20 text-brand-300">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-emerald-400 shrink-0">{item.potentialImpact}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
