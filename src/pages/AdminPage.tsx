import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import {
  AdminDashboardMetricsData,
  AdminUserData,
  SystemHealthData,
  AuditLogEntryData,
  Payment
} from '../types';
import {
  ShieldCheck,
  Users,
  Crown,
  DollarSign,
  UserPlus,
  FileCheck2,
  Sparkles,
  Bot,
  Activity,
  Search,
  Filter,
  Ban,
  CheckCircle,
  CreditCard,
  History,
  Lock,
  Cpu,
  Database
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'payments' | 'health' | 'audit'>('overview');
  const [metrics, setMetrics] = useState<AdminDashboardMetricsData | null>(null);
  const [users, setUsers] = useState<AdminUserData[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [health, setHealth] = useState<SystemHealthData | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntryData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      setIsLoading(true);
      try {
        const m = await apiService.getAdminDashboardMetrics();
        setMetrics(m);
        const u = await apiService.getAdminUsersList();
        setUsers(u);
        const p = await apiService.getAdminPayments();
        setPayments(p);
        const h = await apiService.getSystemHealth();
        setHealth(h);
        const l = await apiService.getAuditLogs();
        setAuditLogs(l);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadAdminData();
  }, []);

  const handleBlockUser = async (userId: string) => {
    await apiService.blockUser(userId);
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, isBlocked: true } : u)));
  };

  const handleUnblockUser = async (userId: string) => {
    await apiService.unblockUser(userId);
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, isBlocked: false } : u)));
  };

  const handleChangePlan = async (userId: string, newPlan: string) => {
    await apiService.changeUserPlan(userId, newPlan);
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, planCode: newPlan } : u)));
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> Production Admin & Business Intelligence Panel
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Executive Platform Analytics & User Management
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Monitor system metrics, user growth, revenue audit logs, and enforce role-based user controls.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-surface-border pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'overview' ? 'bg-brand-500 text-white shadow-lg' : 'bg-surface-card text-gray-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" /> Platform Overview
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'users' ? 'bg-brand-500 text-white shadow-lg' : 'bg-surface-card text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> User Management ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'payments' ? 'bg-brand-500 text-white shadow-lg' : 'bg-surface-card text-gray-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" /> Revenue & Payments
        </button>

        <button
          onClick={() => setActiveTab('health')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'health' ? 'bg-brand-500 text-white shadow-lg' : 'bg-surface-card text-gray-400 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" /> Infrastructure & System Health
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'audit' ? 'bg-brand-500 text-white shadow-lg' : 'bg-surface-card text-gray-400 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" /> Security Audit Logs
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-xs text-gray-400">Loading Admin Intelligence Data...</div>
      ) : (
        <>
          {/* TAB 1: OVERVIEW METRIC CARDS */}
          {activeTab === 'overview' && metrics && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="glass-card p-5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
                    <span>Total Registered Users</span>
                    <Users className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{metrics.totalUsers.toLocaleString()}</div>
                  <span className="text-[11px] text-emerald-400">{metrics.activeUsers} Active This Week</span>
                </div>

                <div className="glass-card p-5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
                    <span>Premium Subscribers</span>
                    <Crown className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-400">{metrics.premiumUsers}</div>
                  <span className="text-[11px] text-gray-400">11.1% Conversion Rate</span>
                </div>

                <div className="glass-card p-5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
                    <span>Monthly Revenue (MRR)</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400">₹{metrics.monthlyRevenueInr.toLocaleString()}</div>
                  <span className="text-[11px] text-gray-400">Total ARR: ₹{(metrics.monthlyRevenueInr * 12).toLocaleString()}</span>
                </div>

                <div className="glass-card p-5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
                    <span>Today's New Signups</span>
                    <UserPlus className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-black text-purple-400">+{metrics.todaySignups}</div>
                  <span className="text-[11px] text-emerald-400">+14% vs yesterday</span>
                </div>
              </div>

              {/* Module Usage Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-surface-base p-4 rounded-xl border border-surface-border text-center space-y-1">
                  <FileCheck2 className="w-5 h-5 text-brand-400 mx-auto" />
                  <div className="text-xl font-bold text-white">{metrics.totalAtsAnalyses.toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">ATS Analyses</span>
                </div>

                <div className="bg-surface-base p-4 rounded-xl border border-surface-border text-center space-y-1">
                  <Sparkles className="w-5 h-5 text-purple-400 mx-auto" />
                  <div className="text-xl font-bold text-white">{metrics.totalAiRewrites.toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">AI Rewrites</span>
                </div>

                <div className="bg-surface-base p-4 rounded-xl border border-surface-border text-center space-y-1">
                  <Bot className="w-5 h-5 text-emerald-400 mx-auto" />
                  <div className="text-xl font-bold text-white">{metrics.totalInterviews.toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">AI Interviews</span>
                </div>

                <div className="bg-surface-base p-4 rounded-xl border border-surface-border text-center space-y-1">
                  <Crown className="w-5 h-5 text-amber-400 mx-auto" />
                  <div className="text-xl font-bold text-white">{metrics.totalCoverLetters.toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Cover Letters</span>
                </div>

                <div className="bg-surface-base p-4 rounded-xl border border-surface-border text-center space-y-1">
                  <Activity className="w-5 h-5 text-indigo-400 mx-auto" />
                  <div className="text-xl font-bold text-white">{metrics.totalCareerRoadmaps.toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Career Roadmaps</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT TABLE */}
          {activeTab === 'users' && (
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base font-bold text-white">Registered Platform Users</h3>

                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-surface-base border border-surface-border rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 w-56"
                    />
                  </div>

                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="ALL">All Roles</option>
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_PREMIUM_USER">Premium User</option>
                    <option value="ROLE_ADMIN">Admin</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-surface-border text-gray-400 uppercase text-[10px]">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Plan</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border text-gray-200">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-surface-base/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{u.firstName} {u.lastName}</div>
                          <div className="text-gray-400 text-[11px]">{u.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            u.role.includes('ADMIN') ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                            u.role.includes('PREMIUM') ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                            'bg-surface-elevated text-gray-300 border-surface-border'
                          }`}>
                            {u.role.replace('ROLE_', '')}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-brand-400">{u.planCode}</td>
                        <td className="py-3 px-4">
                          {u.isBlocked ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              BLOCKED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ACTIVE
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <select
                            onChange={(e) => handleChangePlan(u.id, e.target.value)}
                            value={u.planCode}
                            className="bg-surface-base border border-surface-border rounded px-2 py-1 text-[11px] text-gray-200"
                          >
                            <option value="PLAN_FREE">Free Plan</option>
                            <option value="PLAN_PREMIUM_MONTHLY">Premium (₹49)</option>
                            <option value="PLAN_CAREER_PRO">Career Pro (₹199)</option>
                          </select>

                          {u.isBlocked ? (
                            <button
                              onClick={() => handleUnblockUser(u.id)}
                              className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlockUser(u.id)}
                              className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 font-bold border border-rose-500/30 text-[11px]"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS TABLE */}
          {activeTab === 'payments' && (
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white">Payment Audit Logs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-surface-border text-gray-400 uppercase text-[10px]">
                      <th className="py-3 px-4">Invoice ID</th>
                      <th className="py-3 px-4">User ID</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Gateway Provider</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border text-gray-200">
                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 px-4 font-mono font-bold text-white">{p.invoiceId}</td>
                        <td className="py-3 px-4 text-gray-400">{p.userId}</td>
                        <td className="py-3 px-4 font-bold text-white">₹{p.amountInr}</td>
                        <td className="py-3 px-4 font-semibold text-purple-400">{p.provider}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM HEALTH */}
          {activeTab === 'health' && health && (
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" /> Infrastructure Health & Metrics
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SYSTEM HEALTHY
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-surface-base p-5 rounded-2xl border border-surface-border space-y-2">
                  <span className="text-xs text-gray-400">CPU Usage</span>
                  <div className="text-3xl font-black text-emerald-400">{health.cpuUsagePercent}%</div>
                </div>
                <div className="bg-surface-base p-5 rounded-2xl border border-surface-border space-y-2">
                  <span className="text-xs text-gray-400">Heap Memory Used</span>
                  <div className="text-3xl font-black text-purple-400">{health.memoryUsedMb} MB</div>
                </div>
                <div className="bg-surface-base p-5 rounded-2xl border border-surface-border space-y-2">
                  <span className="text-xs text-gray-400">HikariCP DB Connections</span>
                  <div className="text-3xl font-black text-brand-400">{health.activeDbConnections} Active</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-400" /> Security Audit Log Trail
              </h3>
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-2xl bg-surface-base/80 border border-surface-border flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {log.actionType}
                        </span>
                        <span className="font-bold text-white">Admin: {log.adminId}</span>
                        <span className="text-gray-400">• IP: {log.ipAddress}</span>
                      </div>
                      <p className="text-gray-300 mt-1">{log.details}</p>
                    </div>
                    <span className="text-[11px] text-gray-400">{new Date(log.createdAt).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
