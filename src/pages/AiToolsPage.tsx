import React, { useState } from 'react';
import { apiService } from '../services/api';
import { CoverLetterResponseData } from '../types';
import {
  FileText,
  Sparkles,
  Copy,
  Download,
  CheckCircle2,
  Building2,
  Briefcase,
  Zap,
  RefreshCw,
  Edit3
} from 'lucide-react';

export const AiToolsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('Google');
  const [jobTitle, setJobTitle] = useState<string>('Senior Software Engineer');
  const [stylePreset, setStylePreset] = useState<string>('ATS_OPTIMIZED');
  const [jobDescription, setJobDescription] = useState<string>(
    'Looking for a Senior Software Engineer with 3+ years experience in Java Spring Boot, React, PostgreSQL, Docker, Kubernetes, and Microservices.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [coverLetter, setCoverLetter] = useState<CoverLetterResponseData | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [editableContent, setEditableContent] = useState<string>('');

  const toneOptions = [
    { code: 'ATS_OPTIMIZED', label: 'ATS Keyword Optimized' },
    { code: 'PROFESSIONAL', label: 'Professional Executive' },
    { code: 'FORMAL', label: 'Formal Enterprise' },
    { code: 'FRIENDLY', label: 'Friendly & Passionate' },
    { code: 'FRESHER', label: 'Fresher / Recent Grad' },
    { code: 'EXPERIENCED', label: 'Senior Leader / Experienced' },
    { code: 'TECHNICAL', label: 'Hard Technical Focus' },
    { code: 'EXECUTIVE', label: 'C-Suite Executive' }
  ];

  const handleGenerate = async () => {
    if (!companyName.trim() || !jobTitle.trim()) return;
    setIsGenerating(true);
    setIsCopied(false);

    try {
      const res = await apiService.generateCoverLetterWithAi({
        companyName,
        jobTitle,
        stylePreset,
        jobDescription
      });
      setCoverLetter(res);
      setEditableContent(res.fullContent);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!editableContent) return;
    navigator.clipboard.writeText(editableContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExportPdf = async () => {
    if (!coverLetter) return;
    await apiService.exportCoverLetterPdf(coverLetter.id);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" /> Personalized AI Cover Letter Generator
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AI Cover Letter Generator & Editor
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Instantly craft tailor-made, ATS-compliant cover letters tailored to your target company and job description.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1 Col: Input Form */}
        <div className="glass-card p-6 rounded-3xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-surface-border pb-3">
            <Zap className="w-4 h-4 text-brand-400" /> Target Role & Tone Parameters
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-400" /> Target Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google, Stripe, Microsoft"
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" /> Target Job Role Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Writing Tone & Style</label>
              <select
                value={stylePreset}
                onChange={(e) => setStylePreset(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {toneOptions.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Target Job Description</label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste target job requirements..."
                className="w-full bg-surface-base border border-surface-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500 font-sans resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full gradient-button text-white text-xs font-extrabold py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Assembling Structured Cover Letter...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate AI Cover Letter
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 2 Cols: Live Preview & Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-400" /> Interactive Cover Letter Workspace & Preview
            </h2>

            {coverLetter && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-card text-white text-xs font-bold border border-surface-border flex items-center gap-1.5 transition-all"
                >
                  {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-brand-400" />}
                  {isCopied ? 'Copied!' : 'Copy Text'}
                </button>
                <button
                  onClick={handleExportPdf}
                  className="gradient-button px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
              </div>
            )}
          </div>

          <div className="glass-card-elevated p-8 rounded-3xl border border-surface-border min-h-[500px] flex flex-col">
            {coverLetter ? (
              <textarea
                rows={18}
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="w-full h-full bg-transparent text-xs text-gray-100 font-sans leading-relaxed focus:outline-none resize-none"
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">No Cover Letter Generated Yet</h3>
                <p className="text-xs text-gray-400 max-w-sm">
                  Fill in your target company and job title on the left and click "Generate AI Cover Letter" to craft your personalized application.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
