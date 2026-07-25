import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { UserProfileData, UserNotificationData } from '../types';
import {
  User,
  Mail,
  Linkedin,
  Github,
  Globe,
  MapPin,
  Phone,
  Briefcase,
  Bell,
  CheckCircle2,
  Save,
  ShieldCheck,
  Award,
  Crown
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, subscription } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [notifications, setNotifications] = useState<UserNotificationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'settings'>('profile');

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [targetSalaryLpa, setTargetSalaryLpa] = useState<number>(35);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    setIsLoading(true);
    try {
      const p = await apiService.getUserProfile();
      setProfile(p);
      setFirstName(p.firstName || user?.firstName || 'Vivek');
      setLastName(p.lastName || user?.lastName || 'Patil');
      setHeadline(p.headline);
      setBio(p.bio);
      setLinkedinUrl(p.linkedinUrl || 'https://www.linkedin.com/in/vivek-patil-393501326');
      setGithubUrl(p.githubUrl || 'https://github.com/vikipatil972-dotcom');
      setPortfolioUrl(p.portfolioUrl || 'https://careeros-ai.vercel.app');
      setPhone(p.phone);
      setLocation(p.location);
      setTargetSalaryLpa(Math.round((p.targetSalaryInr || 3500000) / 100000));

      const notifs = await apiService.getUserNotifications();
      setNotifications(notifs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await apiService.updateUserProfile({
        firstName,
        lastName,
        headline,
        bio,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
        phone,
        location,
        targetSalaryInr: targetSalaryLpa * 100000
      });
      setProfile(updated);
      alert('Profile details updated successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    try {
      await apiService.markNotificationRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const isPremium = user?.role === 'ROLE_PREMIUM_USER' || subscription?.status === 'ACTIVE';

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="glass-card-elevated p-6 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/20 text-white flex items-center justify-center font-extrabold text-2xl border border-brand-500/40">
            {firstName?.[0] || 'V'}
          </div>
          <div>
            <div className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{firstName} {lastName}</span>
              {isPremium ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Crown className="w-3 h-3 inline mr-1" /> PREMIUM MEMBER
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-elevated text-gray-300">
                  FREE MEMBER
                </span>
              )}
            </div>
            <p className="text-xs text-gray-300 mt-1">{headline}</p>
            <div className="text-[11px] text-gray-400 flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-brand-400" /> {location}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-purple-400" /> {user?.email || 'vikipatil972@gmail.com'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-surface-base hover:bg-brand-500/20 text-brand-400 text-xs font-bold border border-surface-border flex items-center gap-1.5 transition-all"
          >
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile
          </a>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-2 border-b border-surface-border pb-3">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'profile' ? 'bg-brand-500 text-white' : 'bg-surface-base text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" /> Personal & Professional Profile
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'notifications' ? 'bg-brand-500 text-white' : 'bg-surface-base text-gray-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" /> Notification Center ({notifications.filter(n => !n.isRead).length})
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-xs text-gray-400">Loading Profile Details...</div>
      ) : activeTab === 'profile' ? (
        <form onSubmit={handleSaveProfile} className="glass-card p-8 rounded-3xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-brand-400" /> Profile Information & Portfolio Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Professional Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Professional Bio & Career Objective</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-brand-400" /> LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-purple-400" /> GitHub Profile URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> Portfolio Website
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">Target Salary (LPA)</label>
              <input
                type="number"
                value={targetSalaryLpa}
                onChange={(e) => setTargetSalaryLpa(Number(e.target.value))}
                className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={isSaving}
              className="gradient-button text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-400" /> Notifications & Activity Alerts
          </h2>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  n.isRead ? 'bg-surface-base/50 border-surface-border opacity-70' : 'bg-surface-elevated border-brand-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300">
                      {n.category}
                    </span>
                    <span className="text-xs font-bold text-white">{n.title}</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{n.message}</p>
                </div>

                {!n.isRead && (
                  <button
                    onClick={() => handleMarkNotificationRead(n.id)}
                    className="px-3 py-1 rounded-lg bg-surface-base hover:bg-surface-card text-brand-400 text-xs font-bold border border-surface-border shrink-0 ml-4"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
