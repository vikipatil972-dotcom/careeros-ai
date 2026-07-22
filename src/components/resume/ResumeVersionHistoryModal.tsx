import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { X, History, RotateCcw, CheckCircle2, Clock, FileText } from 'lucide-react';

interface ResumeVersionHistoryModalProps {
  isOpen: boolean;
  resumeId: string;
  onClose: () => void;
  onRestoreSuccess: () => void;
}

export const ResumeVersionHistoryModal: React.FC<ResumeVersionHistoryModalProps> = ({
  isOpen,
  resumeId,
  onClose,
  onRestoreSuccess
}) => {
  const [versions, setVersions] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restoredVersion, setRestoredVersion] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const load = async () => {
        setIsLoading(true);
        const list = await apiService.getResumeVersions(resumeId);
        setVersions(list);
        setIsLoading(false);
      };
      load();
    }
  }, [isOpen, resumeId]);

  if (!isOpen) return null;

  const handleRestore = async (versionNumber: number) => {
    await apiService.restoreResumeVersion(resumeId, versionNumber);
    setRestoredVersion(versionNumber);
    onRestoreSuccess();
    setTimeout(() => setRestoredVersion(null), 2000);
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">
            <History className="w-3.5 h-3.5" /> Immutable Versioning Control
          </div>
          <h2 className="text-2xl font-extrabold text-white">Resume Version History</h2>
          <p className="text-xs text-gray-400">View timeline of uploads, edits, and restore previous versions in 1-click</p>
        </div>

        {restoredVersion && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Successfully restored Version {restoredVersion} as active primary resume!</span>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-xs text-gray-400">Loading version history...</div>
        ) : (
          <div className="space-y-3">
            {versions.map((ver) => (
              <div
                key={ver.versionNumber}
                className={`glass-card p-4 rounded-2xl flex items-center justify-between border transition-all ${
                  ver.isCurrent ? 'border-brand-500/50 bg-surface-card/90 shadow-lg' : 'border-surface-border'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-elevated flex items-center justify-center text-brand-400 font-bold text-xs">
                    v{ver.versionNumber}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Version {ver.versionNumber}</span>
                      {ver.isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Active Version
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(ver.createdAt).toLocaleString()}</span>
                      <span>•</span>
                      <span>{ver.fileFormat} Format</span>
                    </div>
                  </div>
                </div>

                {!ver.isCurrent && (
                  <button
                    onClick={() => handleRestore(ver.versionNumber)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-surface-elevated hover:bg-brand-500 text-white border border-surface-border transition-all flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Restore
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
