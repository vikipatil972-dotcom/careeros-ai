import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { StructuredResumeData } from '../../types';
import { X, Save, Download, FileText, Sparkles, CheckCircle2, User as UserIcon, Mail, Phone, MapPin } from 'lucide-react';

interface ResumeEditorModalProps {
  isOpen: boolean;
  resumeId: string;
  initialData: StructuredResumeData;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const ResumeEditorModal: React.FC<ResumeEditorModalProps> = ({
  isOpen,
  resumeId,
  initialData,
  onClose,
  onSaveSuccess
}) => {
  const [data, setData] = useState<StructuredResumeData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveNewVersion = async () => {
    setIsSaving(true);
    try {
      await apiService.updateResumeDetails(resumeId, 'Updated Resume Title', 'Senior Full Stack Engineer', data);
      setIsSaved(true);
      onSaveSuccess();
      setTimeout(() => setIsSaved(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPdf = async () => {
    await apiService.exportResumePdf(resumeId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card-elevated w-full max-w-4xl max-h-[90vh] p-6 rounded-3xl border border-brand-500/30 relative flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" /> Interactive Structured Resume Editor
            </div>
            <h2 className="text-2xl font-extrabold text-white">Edit Resume & Generate New Version</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Section 1: Contact Information */}
          <div className="glass-card p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400">1. Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400">Full Name</label>
                <input
                  type="text"
                  value={data.contactInfo.name}
                  onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, name: e.target.value } })}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Email Address</label>
                <input
                  type="email"
                  value={data.contactInfo.email}
                  onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, email: e.target.value } })}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Phone Number</label>
                <input
                  type="text"
                  value={data.contactInfo.phone}
                  onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, phone: e.target.value } })}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Professional Summary */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">2. Professional Summary</h3>
            <textarea
              rows={3}
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              className="w-full bg-surface-base border border-surface-border rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Section 3: Work Experience */}
          <div className="glass-card p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">3. Work Experience</h3>
            {data.workExperience.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-base border border-surface-border space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={exp.company}
                    placeholder="Company Name"
                    onChange={(e) => {
                      const updated = [...data.workExperience];
                      updated[idx] = { ...updated[idx], company: e.target.value };
                      setData({ ...data, workExperience: updated });
                    }}
                    className="bg-surface-elevated border border-surface-border rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={exp.role}
                    placeholder="Job Title / Role"
                    onChange={(e) => {
                      const updated = [...data.workExperience];
                      updated[idx] = { ...updated[idx], role: e.target.value };
                      setData({ ...data, workExperience: updated });
                    }}
                    className="bg-surface-elevated border border-surface-border rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-400 font-semibold">Bullet Points:</label>
                  {exp.bulletPoints.map((bullet, bIdx) => (
                    <input
                      key={bIdx}
                      type="text"
                      value={bullet}
                      onChange={(e) => {
                        const updated = [...data.workExperience];
                        const bullets = [...updated[idx].bulletPoints];
                        bullets[bIdx] = e.target.value;
                        updated[idx] = { ...updated[idx], bulletPoints: bullets };
                        setData({ ...data, workExperience: updated });
                      }}
                      className="w-full bg-surface-elevated/60 border border-surface-border rounded-lg px-3 py-1.5 text-xs text-gray-200 focus:outline-none"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Skills */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-amber-400">4. Technical & Soft Skills</h3>
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Hard Technical Skills (comma separated)</label>
              <input
                type="text"
                value={data.skills.hardSkills.join(', ')}
                onChange={(e) => setData({
                  ...data,
                  skills: { ...data.skills, hardSkills: e.target.value.split(',').map((s) => s.trim()) }
                })}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-border">
          <button
            onClick={handleExportPdf}
            className="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-card text-white text-xs font-bold border border-surface-border flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-brand-500" /> Export PDF Resume
          </button>

          <button
            onClick={handleSaveNewVersion}
            disabled={isSaving}
            className="gradient-button text-white text-xs font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Saved as New Version!' : isSaving ? 'Saving Version...' : 'Save Updates (Increment Version)'}
          </button>
        </div>
      </div>
    </div>
  );
};
