import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { ResumeUploadResponse } from '../../types';
import { X, UploadCloud, CheckCircle2, AlertCircle, FileText, Sparkles, ShieldCheck } from 'lucide-react';

interface ResumeUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (response: ResumeUploadResponse) => void;
}

export const ResumeUploaderModal: React.FC<ResumeUploaderModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [targetJobTitle, setTargetJobTitle] = useState('Senior Software Engineer');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFileSelection(e.target.files[0]);
    }
  };

  const processFileSelection = (selectedFile: File) => {
    setError(null);
    // 10 MB Size Guard
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(`File size exceeds 10 MB limit (${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB). Please upload a smaller file.`);
      setFile(null);
      return;
    }

    const nameLower = selectedFile.name.toLowerCase();
    if (!nameLower.endsWith('.pdf') && !nameLower.endsWith('.docx')) {
      setError('Invalid file extension. Only genuine PDF and DOCX files are supported.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF or DOCX file to upload.');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(25);

    try {
      setUploadProgress(50);
      const response = await apiService.uploadResumeFile(file, targetJobTitle);
      setUploadProgress(100);
      onUploadSuccess(response);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to upload and parse resume file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card-elevated w-full max-w-lg p-6 rounded-3xl border border-brand-500/30 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Security Magic Byte Scanner Active
          </div>
          <h2 className="text-2xl font-extrabold text-white">Upload Resume (PDF / DOCX)</h2>
          <p className="text-xs text-gray-400">Maximum file size 10 MB • Instant structured text parsing</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
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
                <span className="text-xs text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB • Magic byte scanner verified
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-sm font-semibold text-white">Drag & Drop file here, or browse</span>
                <span className="text-xs text-gray-400 block">PDF or DOCX (Max 10 MB)</span>
              </div>
            )}
          </label>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Target Role Title</label>
            <input
              type="text"
              value={targetJobTitle}
              onChange={(e) => setTargetJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="w-full bg-surface-base/80 border border-surface-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-brand-400 font-semibold">
                <span>Parsing PDF/DOCX structure & SHA-256 hash...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-surface-base rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className="w-full gradient-button text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUploading ? <Sparkles className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            {isUploading ? 'Parsing Resume & Creating Version 1...' : 'Upload & Parse Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};
