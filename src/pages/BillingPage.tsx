import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { SubscriptionPlan, Payment, PaymentProvider } from '../types';
import {
  CreditCard,
  CheckCircle2,
  Crown,
  Download,
  Tag,
  ShieldCheck,
  Share2,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  Gift
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { user, subscription, refreshUser } = useAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('RAZORPAY');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>('REF_RAHUL2026');
  const [copiedReferral, setCopiedReferral] = useState<boolean>(false);

  useEffect(() => {
    const loadBilling = async () => {
      const status = await apiService.getSubscriptionStatus();
      setPlans(status.plans);
      setPayments(status.payments);
    };
    loadBilling();
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'PROMO50') {
      setCouponApplied(true);
      setDiscountPercent(50);
      setCouponMsg('Success! 50% discount coupon applied.');
    } else {
      setCouponApplied(false);
      setDiscountPercent(0);
      setCouponMsg('Invalid coupon code. Try demo code PROMO50.');
    }
  };

  const handleSubscribe = async (planCode: string) => {
    setIsProcessing(true);
    try {
      await apiService.processCheckout(planCode, selectedProvider);
      await refreshUser();
      alert('Subscription upgraded to Premium Plan via ' + selectedProvider + '!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Downloading PDF Invoice ID: ${invoiceId}`);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://careeros.ai/signup?ref=${referralCode}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const isPremium = user?.role === 'ROLE_PREMIUM_USER' || subscription?.status === 'ACTIVE';

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <CreditCard className="w-3.5 h-3.5" /> Production Payment Gateway & Subscriptions
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Subscription Plans & Billing Management
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Upgrade to Premium Pass for ₹49/month. Secure payments backed by Razorpay, Cashfree, and PhonePe.
        </p>
      </div>

      {/* Active Subscription Banner */}
      <div className="glass-card-elevated p-6 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Current Account Tier</div>
            <div className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
              <span>{isPremium ? 'Premium Pass Member' : 'Free Tier Account'}</span>
              {isPremium && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {isPremium
                ? 'Unlimited ATS analyses, AI Bullet Rewrites, and Interview Sessions enabled'
                : `Used ${user?.freeAnalysesUsed || 1} of 3 free resume analyses`}
            </p>
          </div>
        </div>

        {isPremium && (
          <div className="text-right space-y-1">
            <div className="text-xs font-bold text-gray-300">Renews on: August 22, 2026</div>
            <div className="text-[11px] text-emerald-400 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" /> 30 Days Remaining
            </div>
          </div>
        )}
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => {
          const finalPrice = couponApplied ? Math.round(plan.priceInr * (1 - discountPercent / 100)) : plan.priceInr;
          return (
            <div
              key={plan.id}
              className={`glass-card p-8 rounded-3xl space-y-6 border transition-all relative flex flex-col justify-between ${
                plan.planCode === 'PLAN_PREMIUM_MONTHLY'
                  ? 'border-brand-500/60 bg-surface-card/90 shadow-2xl'
                  : 'border-surface-border'
              }`}
            >
              {plan.planCode === 'PLAN_PREMIUM_MONTHLY' && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-brand-500 to-purple-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1 mt-2">
                    <span className="text-4xl font-black text-white">₹{finalPrice}</span>
                    <span className="text-xs text-gray-400 font-bold">/ month</span>
                    {couponApplied && (
                      <span className="text-xs text-emerald-400 font-bold line-through ml-2">₹{plan.priceInr}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-surface-border">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gateway & Subscribe Action */}
              <div className="space-y-3 pt-4 border-t border-surface-border">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-400 block">Select Payment Gateway</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['RAZORPAY', 'CASHFREE', 'PHONEPE'] as PaymentProvider[]).map((prov) => (
                      <button
                        key={prov}
                        onClick={() => setSelectedProvider(prov)}
                        className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all ${
                          selectedProvider === prov
                            ? 'border-brand-500 bg-brand-500/20 text-white'
                            : 'border-surface-border bg-surface-base text-gray-400'
                        }`}
                      >
                        {prov}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.planCode)}
                  disabled={isProcessing || isPremium}
                  className="w-full gradient-button text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {isPremium ? 'Currently Active' : isProcessing ? 'Connecting Gateway...' : `Subscribe via ${selectedProvider}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon Box & Referral Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coupon Code Redeem */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-brand-400" /> Apply Discount Coupon
          </h3>

          <div className="flex space-x-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code (Try PROMO50)..."
              className="flex-1 bg-surface-base border border-surface-border rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-mono font-bold focus:outline-none focus:border-brand-500"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-surface-elevated hover:bg-surface-card text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-surface-border transition-all shrink-0"
            >
              Apply
            </button>
          </div>

          {couponMsg && (
            <div className={`text-xs font-bold ${couponApplied ? 'text-emerald-400' : 'text-rose-400'}`}>
              {couponMsg}
            </div>
          )}
        </div>

        {/* Referral Program */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Gift className="w-4 h-4 text-purple-400" /> Referral Program & Rewards
          </h3>
          <p className="text-xs text-gray-300">
            Share your code with friends. Give ₹10 off and get 1 Month Premium extension!
          </p>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={`https://careeros.ai/signup?ref=${referralCode}`}
              className="flex-1 bg-surface-base border border-surface-border rounded-xl px-3 py-2 text-[11px] text-gray-300 font-mono truncate"
            />
            <button
              onClick={handleCopyReferral}
              className="gradient-button text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0 flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" /> {copiedReferral ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Payment Audit History & PDF Invoices
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-border text-gray-400 uppercase text-[10px]">
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Gateway</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-gray-200">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-surface-base/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white">{p.invoiceId}</td>
                  <td className="py-3 px-4 text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-bold text-white">₹{p.amountInr}</td>
                  <td className="py-3 px-4 font-semibold text-purple-400">{p.provider}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(p.invoiceId)}
                      className="px-3 py-1 rounded-lg bg-surface-elevated hover:bg-surface-card text-white text-xs font-bold border border-surface-border inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-400" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
