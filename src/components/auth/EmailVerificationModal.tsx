import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onVerifiedSuccess: () => void;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  email,
  onClose,
  onVerifiedSuccess
}) => {
  const { verifyEmail } = useAuth();
  const [otpCode, setOtpCode] = useState('123456');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);

    try {
      await verifyEmail(email, otpCode);
      onVerifiedSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card-elevated w-full max-w-md p-6 rounded-3xl border border-brand-500/30 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Verify Email Address</h2>
          <p className="text-xs text-gray-400">
            We sent a 6-digit OTP verification code to <strong className="text-white">{email}</strong>
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 block text-center">Enter 6-Digit OTP Code</label>
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="123456"
              className="w-full bg-surface-base/90 border border-brand-500/40 rounded-2xl py-3 text-center font-mono text-2xl tracking-[0.5em] font-extrabold text-white focus:outline-none focus:border-brand-500"
            />
            <span className="text-[11px] text-gray-400 block text-center">Demo OTP Code: <strong className="text-brand-400">123456</strong></span>
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full gradient-button text-white font-extrabold text-xs py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {isVerifying ? 'Verifying OTP Code...' : 'Confirm Verification'}
          </button>
        </form>
      </div>
    </div>
  );
};
