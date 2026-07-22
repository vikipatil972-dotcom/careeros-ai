import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { CareerRoadmapData, LearningResourceData } from '../types';
import {
  Compass,
  Building2,
  Briefcase,
  Target,
  Flame,
  BookOpen,
  Download,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Zap,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react';

export const CareerRoadmapPage: React.FC = () => {
  const [dreamCompany, setDreamCompany] = useState<string>('Google');
  const [dreamRole, setDreamRole] = useState<string>('Senior Full Stack Engineer');
  const [targetTimelineMonths, setTargetTimelineMonths] = useState<number>(6);
  const [targetSalaryLpa, setTargetSalaryLpa] = useState<number>(35);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdatingGoal, setIsUpdatingGoal] = useState<boolean>(false);
  const [roadmap, setRoadmap] = useState<CareerRoadmapData | null>(null);
  const [resources, setResources] = useState<LearningResourceData[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getCareerDashboard();
        setRoadmap(data);
        const resList = await apiService.getLearningResources(dreamRole);
        setResources(resList);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const handleUpdateGoal = async () => {
    setIsUpdatingGoal(true);
    try {
      const updated = await apiService.generateCareerRoadmap({
        dreamCompany,
        dreamRole,
        targetTimelineMonths,
        targetSalaryInr: targetSalaryLpa * 100000
      });
      setRoadmap(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingGoal(false);
    }
  };

  const handleExportPdf = () => {
    alert(`Exporting Career Roadmap PDF for ${dreamRole} at ${dreamCompany}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" /> Dynamic AI Career Roadmap & Skill Gap Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Career Roadmap & Skill Gap Analyzer
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Track your overall Career Readiness Index, bridge critical technical skill gaps, and follow a personalized 30/60/90-day milestone roadmap to reach your dream role.
        </p>
      </div>

      {/* Goal Setup Bar */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-brand-400" /> Target Career Goals Parameters
          </h2>
          <button
            onClick={handleExportPdf}
            className="px-3.5 py-1.5 rounded-xl bg-surface-elevated hover:bg-surface-card text-white text-xs font-bold border border-surface-border flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-brand-400" /> Export Roadmap PDF
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-brand-400" /> Dream Company
            </label>
            <input
              type="text"
              value={dreamCompany}
              onChange={(e) => setDreamCompany(e.target.value)}
              className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-purple-400" /> Target Job Role
            </label>
            <input
              type="text"
              value={dreamRole}
              onChange={(e) => setDreamRole(e.target.value)}
              className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Timeline Horizon
            </label>
            <select
              value={targetTimelineMonths}
              onChange={(e) => setTargetTimelineMonths(Number(e.target.value))}
              className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none"
            >
              <option value={3}>3 Months Sprint</option>
              <option value={6}>6 Months Standard</option>
              <option value={12}>12 Months Comprehensive</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Target Salary (LPA)
            </label>
            <input
              type="number"
              value={targetSalaryLpa}
              onChange={(e) => setTargetSalaryLpa(Number(e.target.value))}
              className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleUpdateGoal}
            disabled={isUpdatingGoal}
            className="gradient-button text-white text-xs font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isUpdatingGoal ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {isUpdatingGoal ? 'Recalculating Skill Gaps...' : 'Recalculate Career Readiness Index'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-xs text-gray-400">Loading Career Dashboard...</div>
      ) : roadmap ? (
        <div className="space-y-8">
          {/* Readiness Score & Weekly Tracker Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Score Card */}
            <div className="glass-card-elevated p-6 rounded-3xl border border-brand-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-brand-400 uppercase tracking-wider">Career Readiness Index</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300">
                  Target: {roadmap.dreamCompany}
                </span>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black gradient-text">{roadmap.readinessScore}</span>
                <span className="text-sm font-bold text-gray-400">/ 100</span>
                <span className="text-xs font-semibold text-emerald-400 ml-auto">FAANG Ready</span>
              </div>

              {/* 7 Categories Progress */}
              <div className="space-y-2 pt-2">
                {Object.entries(roadmap.categoryScores).map(([cat, score]) => (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">{cat}</span>
                      <span className="font-bold text-white">{score}%</span>
                    </div>
                    <div className="w-full bg-surface-elevated rounded-full h-1 overflow-hidden">
                      <div className="bg-brand-500 h-1 rounded-full" style={{ width: `${score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress Tracker Card */}
            <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">AI Weekly Progress Tracker</span>
                  <div className="flex items-center space-x-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {roadmap.weeklyTracker.streakDays} Day Streak
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white">Week {roadmap.weeklyTracker.weekNumber} Mastery Sprint</h3>
                <p className="text-xs text-gray-300">
                  You have completed <strong className="text-white font-bold">{roadmap.weeklyTracker.skillsCompleted} skills</strong> and <strong className="text-white font-bold">{roadmap.weeklyTracker.projectsCompleted} production projects</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-400">Weekly Goal Progress</span>
                  <span className="text-purple-400">{roadmap.weeklyTracker.progressPercent}% Completed</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-500 to-purple-500 h-2.5 rounded-full" style={{ width: `${roadmap.weeklyTracker.progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* Recommended Learning Resources Card */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" /> Top Curated Resources
              </h3>

              <div className="space-y-3">
                {resources.slice(0, 3).map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-surface-base/80 border border-surface-border hover:border-brand-500/50 block transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-brand-400 flex items-center justify-between">
                      <span className="truncate max-w-[200px]">{res.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-surface-elevated text-purple-300 font-semibold">{res.resourceType}</span>
                      <span>•</span>
                      <span>{res.category}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Gap Cards Grid */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> Identified Technical Skill Gaps ({roadmap.skillGaps.missingSkills.length + roadmap.skillGaps.missingTools.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Missing Hard Skills */}
              <div className="glass-card p-5 rounded-2xl space-y-3 border border-rose-500/30">
                <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">Missing Hard Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {roadmap.skillGaps.missingSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Tools */}
              <div className="glass-card p-5 rounded-2xl space-y-3 border border-purple-500/30">
                <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Missing DevOps Tools</span>
                <div className="flex flex-wrap gap-1.5">
                  {roadmap.skillGaps.missingTools.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      + {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Certifications */}
              <div className="glass-card p-5 rounded-2xl space-y-3 border border-amber-500/30">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Missing Certifications</span>
                <div className="flex flex-wrap gap-1.5">
                  {roadmap.skillGaps.missingCertifications.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      ★ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Portfolio Projects */}
              <div className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-500/30">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Recommended Projects</span>
                <div className="space-y-1.5 text-xs text-gray-300">
                  {roadmap.skillGaps.missingProjects.map((p, i) => (
                    <div key={i} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Timeline Roadmap */}
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-400" /> Personalized Timeline Milestone Roadmap
            </h2>

            <div className="space-y-6">
              {roadmap.milestones.map((m, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-brand-500/40 space-y-3">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-4 border-surface-base"></div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {m.phase.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{m.practiceSchedule}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">{m.title}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-surface-base/80 rounded-xl border border-surface-border space-y-1">
                      <strong className="text-gray-200 block">Skills to Learn:</strong>
                      <span className="text-gray-400">{m.skillsToLearn.join(', ')}</span>
                    </div>
                    <div className="p-3 bg-surface-base/80 rounded-xl border border-surface-border space-y-1">
                      <strong className="text-gray-200 block">Projects to Build:</strong>
                      <span className="text-gray-400">{m.projectsToBuild.join(', ')}</span>
                    </div>
                    <div className="p-3 bg-surface-base/80 rounded-xl border border-surface-border space-y-1">
                      <strong className="text-gray-200 block">Target Certification:</strong>
                      <span className="text-gray-400">{m.certificationsToEarn.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
