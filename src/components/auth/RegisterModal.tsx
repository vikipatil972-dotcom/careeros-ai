import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, ShieldCheck, Lock, Mail, User as UserIcon, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onOpenVerifyEmail: (email: string) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenVerifyEmail
}) => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Password Strength Calculator
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(password);

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0: return { label: 'Too Weak', color: 'bg-gray-600', text: 'text-gray-400' };
      case 1: return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
      case 2: return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
      case 3: return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-400' };
      case 4: return { label: 'Strong & Secure', color: 'bg-emerald-500', text: 'text-emerald-400' };
      default: return { label: '', color: 'bg-gray-600', text: 'text-gray-400' };
    }
  };

  const strengthMeta = getStrengthLabel(strengthScore);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Password and confirm password do not match');
      return;
    }

    if (strengthScore < 2) {
      setError('Please choose a stronger password matching security guidelines');
      return;
    }

    setIsLoading(true);
    try {
      await register(fullName, email, password, confirmPassword);
      onClose();
      onOpenVerifyEmail(email);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
            <Sparkles className="w-3.5 h-3.5" /> CareerOS AI Registration
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create Account</h2>
          <p className="text-xs text-gray-400">Join thousands of job seekers optimizing resumes with AI</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Full Name</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full bg-surface-base/80 border border-surface-border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Email Address</label>
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-base/80 border border-surface-border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Password Strength Meter */}
            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Strength:</span>
                  <span className={`font-bold ${strengthMeta.text}`}>{strengthMeta.label}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 h-1.5 rounded-full overflow-hidden bg-surface-base">
                  <div className={`h-full ${strengthScore >= 1 ? strengthMeta.color : 'bg-surface-border'}`}></div>
                  <div className={`h-full ${strengthScore >= 2 ? strengthMeta.color : 'bg-surface-border'}`}></div>
                  <div className={`h-full ${strengthScore >= 3 ? strengthMeta.color : 'bg-surface-border'}`}></div>
                  <div className={`h-full ${strengthScore >= 4 ? strengthMeta.color : 'bg-surface-border'}`}></div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-base/80 border border-surface-border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-button text-white font-extrabold text-xs py-3 rounded-xl shadow-lg disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Creating Account & Generating OTP...' : 'Register & Verify Email'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="text-brand-400 font-bold hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
