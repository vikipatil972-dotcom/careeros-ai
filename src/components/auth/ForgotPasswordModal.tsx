import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, Mail, CheckCircle2, AlertCircle, Sparkles, KeyRound } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin
}) => {
  const { forgotPassword, resetPassword } = useAuth();
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('654321');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await forgotPassword(email);
      setSuccessMessage(`A 6-digit OTP code has been sent to ${email}`);
      setStep('reset');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await resetPassword(email, otpCode, newPassword);
      setSuccessMessage('Password reset successfully! Please login with your new credentials.');
      setTimeout(() => {
        onClose();
        onOpenLogin();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
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

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <KeyRound className="w-3.5 h-3.5" /> Password Recovery Protocol
          </div>
          <h2 className="text-2xl font-extrabold text-white">Reset Password</h2>
          <p className="text-xs text-gray-400">
            {step === 'request'
              ? 'Enter your registered email address to receive a 6-digit reset OTP'
              : 'Enter the OTP code sent to your email along with your new password'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {step === 'request' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul.sharma@example.com"
                  className="w-full bg-surface-base/80 border border-surface-border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-button text-white font-extrabold text-xs py-3 rounded-xl shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Dispatching Reset OTP...' : 'Send Password Reset OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">6-Digit Reset OTP Code</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="654321"
                className="w-full bg-surface-base/90 border border-brand-500/40 rounded-xl py-2.5 text-center font-mono text-xl tracking-[0.3em] font-extrabold text-white focus:outline-none focus:border-brand-500"
              />
              <span className="text-[10px] text-gray-400 block text-center">Demo Reset OTP: <strong className="text-brand-400">654321</strong></span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-surface-base/80 border border-surface-border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-button text-white font-extrabold text-xs py-3 rounded-xl shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Updating Password...' : 'Save New Password & Login'}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-gray-400">
          Remembered your password?{' '}
          <button
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="text-brand-400 font-bold hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
