import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { InterviewSessionData, InterviewType, DifficultyLevel } from '../../types';
import { X, Sparkles, Building2, Briefcase, Bot, ShieldCheck, Zap } from 'lucide-react';

interface InterviewSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionStarted: (session: InterviewSessionData) => void;
}

export const InterviewSetupModal: React.FC<InterviewSetupModalProps> = ({
  isOpen,
  onClose,
  onSessionStarted
}) => {
  const [companyName, setCompanyName] = useState('Google');
  const [jobRole, setJobRole] = useState('Senior Software Engineer');
  const [interviewType, setInterviewType] = useState<InterviewType>('TECHNICAL');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('FAANG');
  const [isStarting, setIsStarting] = useState(false);

  if (!isOpen) return null;

  const handleStart = async () => {
    if (!companyName.trim() || !jobRole.trim()) return;
    setIsStarting(true);
    try {
      const session = await apiService.startInterviewSession({
        companyName,
        jobRole,
        interviewType,
        difficultyLevel,
        totalQuestions: 3
      });
      onSessionStarted(session);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card-elevated w-full max-w-lg p-6 rounded-3xl border border-purple-500/40 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" /> Dynamic AI Technical & STAR Interview Simulator
          </div>
          <h2 className="text-2xl font-extrabold text-white">Configure Mock Interview</h2>
          <p className="text-xs text-gray-400">Tailored to your target company, role title, and difficulty level</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-brand-400" /> Target Company
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" /> Target Job Role
              </label>
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Interview Focus Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['TECHNICAL', 'BEHAVIORAL', 'SYSTEM_DESIGN', 'HR', 'MANAGERIAL', 'MIXED'] as InterviewType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setInterviewType(t)}
                  className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all ${
                    interviewType === t
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-surface-border bg-surface-base/60 text-gray-400'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Difficulty Level</label>
            <div className="grid grid-cols-4 gap-2">
              {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FAANG'] as DifficultyLevel[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficultyLevel(d)}
                  className={`py-2 px-1 text-[11px] font-extrabold rounded-xl border transition-all ${
                    difficultyLevel === d
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : 'border-surface-border bg-surface-base/60 text-gray-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={isStarting}
            className="w-full gradient-button text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isStarting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {isStarting ? 'Generating Tailored Questions...' : 'Start AI Interview Session'}
          </button>
        </div>
      </div>
    </div>
  );
};
