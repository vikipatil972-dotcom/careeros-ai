import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { JobApplicationData } from '../types';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Plus,
  Trash2,
  ExternalLink,
  MapPin,
  Filter,
  Search,
  Award,
  TrendingUp
} from 'lucide-react';

export const JobTrackerPage: React.FC = () => {
  const [applications, setApplications] = useState<JobApplicationData[]>([]);
  const [stats, setStats] = useState<{ total: number; applied: number; interviewing: number; offers: number; wishlist: number }>({
    total: 0,
    applied: 0,
    interviewing: 0,
    offers: 0,
    wishlist: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [status, setStatus] = useState<string>('APPLIED');
  const [salaryOfferedInr, setSalaryOfferedInr] = useState<number>(3500000);
  const [location, setLocation] = useState<string>('Remote / Bengaluru');
  const [jobUrl, setJobUrl] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    loadTrackerData();
  }, []);

  const loadTrackerData = async () => {
    setIsLoading(true);
    try {
      const apps = await apiService.getJobApplications();
      setApplications(apps);
      const st = await apiService.getJobTrackerStats();
      setStats(st);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !jobTitle) return;

    try {
      const newApp = await apiService.createJobApplication({
        companyName,
        jobTitle,
        status,
        salaryOfferedInr,
        location,
        jobUrl,
        notes
      });
      setApplications([newApp, ...applications]);
      setIsAddModalOpen(false);
      setCompanyName('');
      setJobTitle('');
      setNotes('');
      loadTrackerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await apiService.updateJobApplicationStatus(id, newStatus);
      setApplications(applications.map(a => a.id === id ? updated : a));
      loadTrackerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      await apiService.deleteJobApplication(id);
      setApplications(applications.filter(a => a.id !== id));
      loadTrackerData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApps = applications.filter(a => {
    const matchesSearch = a.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" /> End-to-End Application & Offer Tracker
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Job Applications & Offer Tracker
          </h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Track your job search pipeline, interview rounds, offers, and salary negotiations in one place.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="gradient-button text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </div>

      {/* Stats Pipeline Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">Total Tracked</span>
          <div className="text-3xl font-black text-white">{stats.total}</div>
        </div>
        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs text-brand-400 font-semibold uppercase">Applied</span>
          <div className="text-3xl font-black text-brand-400">{stats.applied}</div>
        </div>
        <div className="glass-card p-5 rounded-2xl space-y-1 border border-purple-500/30">
          <span className="text-xs text-purple-400 font-semibold uppercase">Interviewing</span>
          <div className="text-3xl font-black text-purple-400">{stats.interviewing}</div>
        </div>
        <div className="glass-card p-5 rounded-2xl space-y-1 border border-emerald-500/30">
          <span className="text-xs text-emerald-400 font-semibold uppercase">Offers Received</span>
          <div className="text-3xl font-black text-emerald-400">{stats.offers}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search company or job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-base border border-surface-border rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="WISHLIST">Wishlist</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Kanban / Table */}
      {isLoading ? (
        <div className="text-center py-12 text-xs text-gray-400">Loading Job Applications...</div>
      ) : filteredApps.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-3 rounded-3xl">
          <Briefcase className="w-10 h-10 text-gray-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Applications Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Start tracking your job pipeline by clicking "Add Application".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.map((app) => (
            <div key={app.id} className="glass-card p-5 rounded-2xl space-y-4 border border-surface-border hover:border-brand-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-brand-400" /> {app.companyName}
                    </div>
                    <h3 className="text-base font-extrabold text-white mt-0.5">{app.jobTitle}</h3>
                  </div>
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border bg-surface-base focus:outline-none ${
                      app.status === 'OFFER' ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10' :
                      app.status === 'INTERVIEWING' ? 'text-purple-300 border-purple-500/40 bg-purple-500/10' :
                      app.status === 'APPLIED' ? 'text-brand-300 border-brand-500/40 bg-brand-500/10' :
                      'text-gray-300 border-surface-border'
                    }`}
                  >
                    <option value="WISHLIST">WISHLIST</option>
                    <option value="APPLIED">APPLIED</option>
                    <option value="INTERVIEWING">INTERVIEWING</option>
                    <option value="OFFER">OFFER</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-surface-border">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {app.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> ₹{(app.salaryOfferedInr / 100000).toFixed(1)} LPA Target
                  </div>
                  {app.notes && (
                    <p className="text-[11px] text-gray-400 italic bg-surface-base p-2 rounded-lg mt-1">
                      "{app.notes}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-border text-[11px] text-gray-400">
                <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                <div className="flex items-center space-x-2">
                  {app.jobUrl && (
                    <a href={app.jobUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-surface-elevated hover:text-brand-400 text-gray-300">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button onClick={() => handleDeleteApplication(app.id)} className="p-1.5 rounded-lg bg-surface-elevated hover:text-rose-400 text-gray-300">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card-elevated w-full max-w-lg p-6 rounded-3xl border border-surface-border space-y-4">
            <h2 className="text-lg font-extrabold text-white">Add Job Application</h2>

            <form onSubmit={handleCreateApplication} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google, Microsoft, Stripe"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full Stack Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="WISHLIST">WISHLIST</option>
                    <option value="APPLIED">APPLIED</option>
                    <option value="INTERVIEWING">INTERVIEWING</option>
                    <option value="OFFER">OFFER</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Target Salary (INR)</label>
                  <input
                    type="number"
                    value={salaryOfferedInr}
                    onChange={(e) => setSalaryOfferedInr(Number(e.target.value))}
                    className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, IN or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Notes / Interview Status</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Completed Technical Round 1 with Lead Architect..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-base hover:bg-surface-card text-gray-400 text-xs font-bold border border-surface-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gradient-button text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
