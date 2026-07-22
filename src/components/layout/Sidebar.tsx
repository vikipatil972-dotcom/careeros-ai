import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  Sparkles,
  FileText,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Award,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ROLE_ADMIN';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Career Roadmap & Skill Gap', icon: Compass },
    { id: 'analyzer', label: 'ATS Resume Analyzer', icon: FileCheck2 },
    { id: 'rewriter', label: 'AI Bullet Rewriter', icon: Sparkles },
    { id: 'tools', label: 'Cover Letter & Interview', icon: FileText },
    { id: 'billing', label: 'Billing & Subscriptions', icon: CreditCard },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Analytics', icon: ShieldCheck });
  }

  return (
    <aside className="w-64 border-r border-surface-border bg-[#090d16] hidden lg:flex flex-col justify-between p-4 sticky top-16 h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Core Modules
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/15 text-white border border-brand-500/30 shadow-sm'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-surface-card'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Career Stats Widget */}
        <div className="glass-card p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Career Readiness Score</span>
            <span className="text-emerald-400 font-bold">83%</span>
          </div>
          <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-1.5 rounded-full w-[83%]"></div>
          </div>
          <div className="text-[11px] text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" /> FAANG Ready Target Goal
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="glass-card p-3.5 rounded-xl text-center space-y-2 border border-brand-500/20">
        <Award className="w-5 h-5 text-brand-500 mx-auto" />
        <div className="text-xs font-semibold text-white">CareerOS AI Version 1.0</div>
        <div className="text-[10px] text-gray-400">Enterprise SaaS Architecture</div>
      </div>
    </aside>
  );
};
