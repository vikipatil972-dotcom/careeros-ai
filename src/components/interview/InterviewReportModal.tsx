import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { InterviewReportData } from '../../types';
import { X, Download, Award, CheckCircle2, AlertTriangle, Map, Clock } from 'lucide-react';

interface InterviewReportModalProps {
  isOpen: boolean;
  sessionId: string;
  onClose: () => void;
}

export const InterviewReportModal: React.FC<InterviewReportModalProps> = ({
  isOpen,
  sessionId,
  onClose
}) => {
  const [report, setReport] = useState<InterviewReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const load = async () => {
        setIsLoading(true);
        const data = await apiService.getInterviewReport(sessionId);
        setReport(data);
        setIsLoading(false);
      };
      load();
    }
  }, [isOpen, sessionId]);

  if (!isOpen) return null;

  const handleExportPdf = async () => {
    await apiService.exportInterviewReportPdf(sessionId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card-elevated w-full max-w-3xl max-h-[90vh] p-6 rounded-3xl border border-purple-500/40 relative flex flex-col space-y-6">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" /> AI Interview Performance & Skill Analytics
          </div>
          <h2 className="text-2xl font-extrabold text-white">Interview Session Report</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-xs text-gray-400">Generating analytics report...</div>
        ) : report ? (
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {/* Score Banner */}
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-emerald-400 uppercase">Target: {report.companyName} • {report.jobRole}</div>
                <h3 className="text-3xl font-black text-white mt-1">{report.overallScore} / 100</h3>
                <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5" /> Duration: {Math.floor(report.totalDurationSeconds / 60)} minutes
                </span>
              </div>

              <button
                onClick={handleExportPdf}
                className="gradient-button px-4 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow-lg"
              >
                <Download className="w-4 h-4" /> Download PDF Report
              </button>
            </div>

            {/* Skill Scores */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Skill-wise Competency Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(report.skillScores).map(([skill, score]) => (
                  <div key={skill} className="bg-surface-base p-3.5 rounded-xl border border-surface-border space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-300 font-semibold">{skill}</span>
                      <span className="font-bold text-emerald-400">{score}%</span>
                    </div>
                    <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strong vs Weak Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Demonstrated Mastered Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {report.strongTopics.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Recommended Practice Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {report.weakTopics.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      ! {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Personalized Improvement Roadmap */}
            <div className="glass-card p-5 rounded-2xl space-y-3 border border-purple-500/30">
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Map className="w-4 h-4" /> Personal Skill Mastery Roadmap
              </h4>
              <div className="space-y-2">
                {report.roadmap.map((step, idx) => (
                  <div key={idx} className="p-3 bg-surface-base/80 rounded-xl border border-surface-border flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white block">{step.topic}</strong>
                      <span className="text-gray-400">{step.actionItem}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                      {step.estimatedTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
