import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { InterviewSessionData, AnswerEvaluationData } from '../../types';
import { X, Send, Bot, Clock, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Award } from 'lucide-react';

interface InterviewSimulatorWorkspaceProps {
  isOpen: boolean;
  session: InterviewSessionData;
  onClose: () => void;
  onFinishSession: (sessionId: string) => void;
}

export const InterviewSimulatorWorkspace: React.FC<InterviewSimulatorWorkspaceProps> = ({
  isOpen,
  session,
  onClose,
  onFinishSession
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [seconds, setSeconds] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluationData | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, currentIdx]);

  if (!isOpen) return null;

  const currentQ = session.questions[currentIdx] || session.questions[0];

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await apiService.submitInterviewAnswer(currentQ.id, userAnswer, 120 - seconds);
      setEvaluation(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setEvaluation(null);
    setUserAnswer('');
    setSeconds(120);
    if (currentIdx + 1 < session.questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onFinishSession(session.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card-elevated w-full max-w-4xl max-h-[90vh] p-6 rounded-3xl border border-purple-500/40 relative flex flex-col space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                {session.companyName} • {session.jobRole} AI Interview
              </h2>
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <span>Question {currentIdx + 1} of {session.questions.length}</span>
                <span>•</span>
                <span className="text-purple-400 font-semibold">{session.interviewType} ({session.difficultyLevel})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-surface-base border border-surface-border text-xs font-mono font-bold text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Workspace Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Question Prompt Card */}
          <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-2">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              {currentQ.category} Question #{currentIdx + 1}
            </div>
            <h3 className="text-base font-extrabold text-white leading-relaxed">
              "{currentQ.questionText}"
            </h3>
            {currentQ.expectedStructure && (
              <div className="text-xs text-gray-400 italic">
                <strong className="text-gray-200">Hint / STAR Expectations:</strong> {currentQ.expectedStructure}
              </div>
            )}
          </div>

          {/* User Answer Area or Evaluation Output */}
          {!evaluation ? (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-300">Your Structured Answer Response</label>
              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your response using STAR framework (Situation, Task, Action, Result)..."
                className="w-full bg-surface-base border border-surface-border rounded-xl p-4 text-xs text-white focus:outline-none focus:border-brand-500 font-sans leading-relaxed resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={isSubmitting || !userAnswer.trim()}
                  className="gradient-button text-white text-xs font-extrabold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isSubmitting ? 'Evaluating STAR Rubric...' : 'Submit Answer for AI Evaluation'}
                </button>
              </div>
            </div>
          ) : (
            /* Instant Real-Time Evaluation Result Card */
            <div className="glass-card-elevated p-6 rounded-3xl border border-emerald-500/40 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-extrabold text-emerald-400 uppercase">Answer Evaluation Breakdown</span>
                  <h4 className="text-xl font-extrabold text-white">Overall Score: {evaluation.score} / 100</h4>
                </div>

                <div className="flex items-center space-x-3 text-xs font-bold">
                  <span className="px-3 py-1 bg-surface-base rounded-lg border border-surface-border text-brand-400">Tech: {evaluation.technicalScore}/40</span>
                  <span className="px-3 py-1 bg-surface-base rounded-lg border border-surface-border text-purple-400">Comm: {evaluation.communicationScore}/30</span>
                  <span className="px-3 py-1 bg-surface-base rounded-lg border border-surface-border text-emerald-400">STAR: {evaluation.starScore}/30</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-base/80 p-4 rounded-2xl border border-surface-border space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Strengths Highlighted
                  </span>
                  <ul className="text-xs text-gray-300 space-y-1 list-disc pl-4">
                    {evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="bg-surface-base/80 p-4 rounded-2xl border border-surface-border space-y-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Missing Keywords / Tips
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluation.missingKeywords.map((k, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-bold">
                        + {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 bg-surface-base/90 p-4 rounded-2xl border border-surface-border">
                <span className="text-xs font-extrabold text-brand-400">Model High-Scoring Sample Answer:</span>
                <p className="text-xs text-gray-200 leading-relaxed italic font-sans">
                  "{evaluation.sampleAnswer}"
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="gradient-button text-white text-xs font-extrabold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                >
                  {currentIdx + 1 < session.questions.length ? (
                    <>Next Question ({currentIdx + 2}/{session.questions.length}) <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Finish Session & View Final Analytics <Award className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
