import React, { useState } from 'react';
import { apiService } from '../services/api';
import { AiRewriteResultResponse, RewriteStyle, ResumeQualityReportData } from '../types';
import {
  Sparkles,
  Check,
  X as CloseIcon,
  RefreshCw,
  Zap,
  TrendingUp,
  Award,
  FileText,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AiRewriterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rewriter' | 'qualityReport'>('rewriter');
  const [sectionName, setSectionName] = useState<string>('EXPERIENCE');
  const [stylePreset, setStylePreset] = useState<RewriteStyle>('ATS_OPTIMIZED');
  const [originalContent, setOriginalContent] = useState<string>('Worked on backend APIs and database queries for web application.');
  const [targetRoleTitle, setTargetRoleTitle] = useState<string>('Senior Software Engineer');
  const [isRewriting, setIsRewriting] = useState<boolean>(false);
  const [rewriteResult, setRewriteResult] = useState<AiRewriteResultResponse | null>(null);
  const [qualityReport, setQualityReport] = useState<ResumeQualityReportData | null>(null);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const stylePresets: Array<{ style: RewriteStyle; label: string; desc: string }> = [
    { style: 'ATS_OPTIMIZED', label: 'ATS Optimized', desc: 'Maximizes keyword density & scanner parsing' },
    { style: 'PROFESSIONAL', label: 'Professional Corporate', desc: 'Standard high-level enterprise executive tone' },
    { style: 'TECHNICAL', label: 'Hard Technical', desc: 'Emphasizes deep tech stack frameworks & architectures' },
    { style: 'LEADERSHIP', label: 'Engineering Leadership', desc: 'Focuses on team leading, mentorship & delivery' },
    { style: 'CONCISE', label: 'Concise High-Impact', desc: 'Shortens word count while boosting metric impact' },
    { style: 'PREMIUM', label: 'Executive Premium', desc: 'Tier-1 FAANG-level achievement formatting' }
  ];

  const handleExecuteRewrite = async () => {
    if (!originalContent.trim()) return;
    setIsRewriting(true);
    setIsApplied(false);

    try {
      const result = await apiService.executeAiRewrite({
        resumeId: 'res_1001',
        sectionName,
        stylePreset,
        originalContent,
        targetRoleTitle
      });
      setRewriteResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRewriting(false);
    }
  };

  const handleLoadQualityReport = async () => {
    setActiveTab('qualityReport');
    if (!qualityReport) {
      const rep = await apiService.fetchResumeQualityReport('res_1001');
      setQualityReport(rep);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Multi-Style AI Resume Rewriter & Optimizer
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AI Resume & Bullet Point Optimizer
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Transform weak sentences into high-converting engineering achievement bullets, recalculate ATS scores in real-time, and inspect quality reports.
        </p>
      </div>

      {/* Main Tab Bar */}
      <div className="flex space-x-2 border-b border-surface-border pb-4">
        <button
          onClick={() => setActiveTab('rewriter')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'rewriter'
              ? 'bg-brand-500 text-white shadow-lg'
              : 'bg-surface-card text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" /> AI Rewriter & Diff View
        </button>

        <button
          onClick={handleLoadQualityReport}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'qualityReport'
              ? 'bg-brand-500 text-white shadow-lg'
              : 'bg-surface-card text-gray-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" /> Resume Quality & Grammar Audit
        </button>
      </div>

      {activeTab === 'rewriter' && (
        <div className="space-y-8">
          {/* Controls & Style Selector */}
          <div className="glass-card p-6 rounded-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Target Resume Section</label>
                <select
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="SUMMARY">Professional Summary</option>
                  <option value="EXPERIENCE">Work Experience Achievement Bullets</option>
                  <option value="PROJECTS">Project Descriptions</option>
                  <option value="SKILLS">Technical Skills Section</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Target Role Title</label>
                <input
                  type="text"
                  value={targetRoleTitle}
                  onChange={(e) => setTargetRoleTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Style Preset Buttons Grid */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block">Select AI Rewrite Tone & Style Preset</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {stylePresets.map((item) => (
                  <button
                    key={item.style}
                    onClick={() => setStylePreset(item.style)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      stylePreset === item.style
                        ? 'border-purple-500 bg-purple-500/20 text-white shadow-lg'
                        : 'border-surface-border bg-surface-base/60 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Original Input Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Original Resume Sentence or Paragraph</label>
              <textarea
                rows={3}
                value={originalContent}
                onChange={(e) => setOriginalContent(e.target.value)}
                placeholder="Paste weak resume sentence here..."
                className="w-full bg-surface-base border border-surface-border rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-brand-500 font-sans"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleExecuteRewrite}
                disabled={isRewriting}
                className="gradient-button text-white text-xs font-extrabold px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-xl disabled:opacity-50"
              >
                {isRewriting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Executing {stylePreset} Rewrite...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Rewrite & Calculate ATS Score Delta
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Side-by-Side Diff & ATS Score Delta Output */}
          {rewriteResult && (
            <div className="space-y-6">
              {/* ATS Recalculated Score Delta Widget */}
              <div className="glass-card-elevated p-6 rounded-3xl border border-emerald-500/40 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Recalculated ATS Impact</span>
                    <h3 className="text-xl font-extrabold text-white">Estimated Score Gain After Rewrite</h3>
                  </div>

                  <div className="flex items-center space-x-4 bg-surface-base/90 px-5 py-2.5 rounded-2xl border border-surface-border">
                    <span className="text-lg font-bold text-gray-400">{rewriteResult.scoreBefore}</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-3xl font-black text-emerald-400">{rewriteResult.scoreAfter}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center">
                      <TrendingUp className="w-3.5 h-3.5 mr-1" /> +{rewriteResult.scoreDelta} PTS GAIN
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 bg-surface-base/60 p-3 rounded-xl border border-surface-border leading-relaxed">
                  {rewriteResult.explanation}
                </p>
              </div>

              {/* Side-by-Side Comparison Box */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Side-by-Side Diff Comparison</h3>
                {isApplied ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Applied to Active Resume
                  </span>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsApplied(true)}
                      className="gradient-button px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow-lg"
                    >
                      <Check className="w-4 h-4" /> Accept & Apply Change
                    </button>
                    <button
                      onClick={() => setRewriteResult(null)}
                      className="px-3 py-2 rounded-xl bg-surface-elevated hover:bg-surface-card text-gray-400 hover:text-white text-xs font-semibold border border-surface-border"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Box */}
                <div className="glass-card p-6 rounded-2xl border border-rose-500/30 space-y-3">
                  <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">Original Weak Content</span>
                  <p className="text-xs text-gray-300 italic leading-relaxed bg-surface-base/80 p-4 rounded-xl border border-surface-border">
                    "{rewriteResult.originalContent}"
                  </p>
                </div>

                {/* AI Optimized Box */}
                <div className="glass-card-elevated p-6 rounded-2xl border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">AI {rewriteResult.stylePreset} Rewrite</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Google XYZ Formula</span>
                  </div>
                  <p className="text-xs text-white font-medium leading-relaxed bg-surface-base/90 p-4 rounded-xl border border-emerald-500/30">
                    "{rewriteResult.rewrittenContent}"
                  </p>

                  <div className="pt-2">
                    <div className="text-[11px] text-gray-400">
                      <strong className="text-gray-200">Keywords Added:</strong> {rewriteResult.keywordsAdded.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quality Report Tab */}
      {activeTab === 'qualityReport' && (
        <div className="space-y-6">
          {qualityReport ? (
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Resume Quality & Grammar Audit Report
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-surface-base/80 p-5 rounded-2xl border border-surface-border text-center space-y-1">
                  <span className="text-xs text-gray-400">Readability Score</span>
                  <div className="text-3xl font-black text-emerald-400">{qualityReport.readabilityScore} / 100</div>
                </div>
                <div className="bg-surface-base/80 p-5 rounded-2xl border border-surface-border text-center space-y-1">
                  <span className="text-xs text-gray-400">Professional Tone Index</span>
                  <div className="text-3xl font-black text-purple-400">{qualityReport.toneScore} / 100</div>
                </div>
                <div className="bg-surface-base/80 p-5 rounded-2xl border border-surface-border text-center space-y-1">
                  <span className="text-xs text-gray-400">ATS Machine Compatibility</span>
                  <div className="text-3xl font-black text-brand-400">{qualityReport.atsCompatibilityIndex} / 100</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Strong Resume Sections</h4>
                  <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                    {qualityReport.strongSections.map((sec, idx) => (
                      <li key={idx}>{sec}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Areas for Improvement</h4>
                  <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                    {qualityReport.weakSections.map((sec, idx) => (
                      <li key={idx}>{sec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-gray-400">Loading Quality Audit Report...</div>
          )}
        </div>
      )}
    </div>
  );
};
