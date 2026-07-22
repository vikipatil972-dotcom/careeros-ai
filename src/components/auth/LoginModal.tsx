import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  onOpenForgotPassword: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
  onOpenForgotPassword
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
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
            <Sparkles className="w-3.5 h-3.5" /> CareerOS AI Identity & IAM
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-gray-400">Log in to access your resumes, ATS scores, and AI tools</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-300">Password</label>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenForgotPassword();
                }}
                className="text-[11px] text-brand-400 font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
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
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-surface-border bg-surface-base text-brand-500 focus:ring-brand-500 h-4 w-4"
              />
              <span className="text-xs text-gray-300">Remember me for 7 days</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-button text-white font-extrabold text-xs py-3 rounded-xl shadow-lg disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Authenticating & Generating Tokens...' : 'Log In to CareerOS'}
          </button>
        </form>

        {/* Quick Role Preset Demo Selectors */}
        <div className="pt-3 border-t border-surface-border space-y-2">
          <div className="text-[11px] text-gray-400 text-center font-medium">Quick Demo Preset Logins:</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setEmail('rahul.sharma@example.com');
                setPassword('••••••••');
              }}
              className="py-1.5 px-2 bg-surface-base hover:bg-surface-card border border-surface-border rounded-lg text-[11px] text-gray-300 text-center font-medium"
            >
              User Account
            </button>
            <button
              onClick={() => {
                setEmail('admin@careeros.ai');
                setPassword('••••••••');
              }}
              className="py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-[11px] text-amber-300 text-center font-medium"
            >
              Admin Account
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          Don't have an account yet?{' '}
          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="text-brand-400 font-bold hover:underline"
          >
            Register Free
          </button>
        </div>
      </div>
    </div>
  );
};
