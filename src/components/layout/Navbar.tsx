import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Crown, LogOut, User as UserIcon, LogIn, UserPlus, ShieldAlert, Home, Briefcase } from 'lucide-react';
import { LoginModal } from '../auth/LoginModal';
import { RegisterModal } from '../auth/RegisterModal';
import { EmailVerificationModal } from '../auth/EmailVerificationModal';
import { ForgotPasswordModal } from '../auth/ForgotPasswordModal';

interface NavbarProps {
  onOpenBilling: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLoginModal?: () => void;
  onOpenRegisterModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBilling, activeTab, setActiveTab }) => {
  const { user, subscription, logout, logoutFromAllDevices } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState(false);
  const [verifyEmailTarget, setVerifyEmailTarget] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const isPremium = user?.role === 'ROLE_PREMIUM_USER' || subscription?.status === 'ACTIVE';
  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <>
      <header className="h-16 border-b border-surface-border bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              CareerOS <span className="gradient-text">AI</span>
            </span>
            <span className="text-[10px] text-gray-400 block tracking-widest uppercase font-medium -mt-1">
              Your AI Career Partner
            </span>
          </div>
        </div>

        {/* Navigation Shortcuts */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'landing'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Home
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
              activeTab === 'tracker'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-brand-400" /> Application Tracker
          </button>
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'analyzer'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
            }`}
          >
            ATS Analyzer
          </button>
          <button
            onClick={() => setActiveTab('rewriter')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'rewriter'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
            }`}
          >
            AI Rewriter
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'tools'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
            }`}
          >
            Cover Letter & Interview
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'billing'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
            }`}
          >
            Billing & Plans
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              Admin Panel
            </button>
          )}
        </nav>

        {/* Right User State */}
        <div className="flex items-center space-x-3">
          {/* Quota Badge */}
          {user && (
            isPremium ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Crown className="w-3.5 h-3.5" /> PREMIUM ACTIVE
              </span>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium bg-surface-card px-3 py-1 rounded-full border border-surface-border">
                  Free Quota: <strong className="text-white">{user.freeAnalysesUsed}/{user.maxFreeAnalyses}</strong>
                </span>
                <button
                  onClick={onOpenBilling}
                  className="gradient-button text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" /> Upgrade (₹49)
                </button>
              </div>
            )
          )}

          {/* Auth Action Buttons when Logged In vs Logged Out */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 pl-2 border-l border-surface-border hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-surface-elevated border border-brand-500/30 flex items-center justify-center text-white font-bold text-xs">
                  {user.firstName?.[0] || 'U'}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-medium text-white">{user.firstName} {user.lastName}</div>
                  <div className="text-[10px] text-gray-400">{isAdmin ? 'System Admin' : isPremium ? 'Premium User' : 'Free Member'}</div>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 glass-card-elevated rounded-2xl p-2 border border-surface-border shadow-2xl z-50 space-y-1">
                  <div className="p-2 border-b border-surface-border">
                    <div className="text-xs font-bold text-white">{user.firstName} {user.lastName}</div>
                    <div className="text-[10px] text-gray-400">{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-brand-400 hover:bg-brand-500/10 flex items-center gap-2 transition-all"
                  >
                    <UserIcon className="w-3.5 h-3.5" /> My Profile & Notifications
                  </button>
                  <button
                    onClick={() => {
                      logoutFromAllDevices();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-amber-400 hover:bg-amber-500/10 flex items-center gap-2 transition-all"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" /> Revoke All Active Sessions
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-surface-elevated hover:bg-surface-card text-white border border-surface-border flex items-center gap-1.5 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" /> Log In
              </button>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="gradient-button text-white text-xs font-extrabold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg"
              >
                <UserPlus className="w-3.5 h-3.5" /> Register Free
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenVerifyEmail={(email) => {
          setVerifyEmailTarget(email);
          setIsVerifyEmailOpen(true);
        }}
      />

      <EmailVerificationModal
        isOpen={isVerifyEmailOpen}
        email={verifyEmailTarget}
        onClose={() => setIsVerifyEmailOpen(false)}
        onVerifiedSuccess={() => {
          setIsLoginOpen(true);
        }}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </>
  );
};
