import React, { useState } from 'react';
import {
  Sparkles,
  FileCheck2,
  BrainCircuit,
  Bot,
  Compass,
  Crown,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Star,
  ChevronDown,
  ChevronUp,
  Download,
  Flame,
  Globe,
  Lock,
  BarChart3,
  Users,
  Building2
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreFeature: (featureTab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onExploreFeature }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const featureCards = [
    {
      id: 'analyzer',
      icon: FileCheck2,
      color: 'text-brand-400',
      badgeBg: 'bg-brand-500/10 border-brand-500/30 text-brand-400',
      title: '100-Point Algorithmic ATS Scanner',
      description: 'Transparent 10-category scoring engine analyzing keywords, hard skills, experience match, action verbs, and formatting compatibility.',
      stat: '98.4% ATS Pass Rate'
    },
    {
      id: 'rewriter',
      icon: Sparkles,
      color: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      title: 'AI Resume Rewriter & Google XYZ Formula',
      description: 'Transform weak bullet points into high-impact accomplishment statements quantified with numerical metrics and strong action verbs.',
      stat: '+35% Interview Invites'
    },
    {
      id: 'tools',
      icon: Bot,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      title: 'AI STAR Mock Interview Simulator',
      description: 'Interactive mock interviews for HR, Technical, System Design, and Behavioral roles with real-time feedback and STAR methodology scoring.',
      stat: '4.9/5 Candidate Rating'
    },
    {
      id: 'roadmap',
      icon: Compass,
      color: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      title: 'Career Roadmap & Skill Gap Analyzer',
      description: 'Track your Career Readiness Index, identify missing technical tools & certifications, and follow a 30/60/90-day milestone plan.',
      stat: 'FAANG Ready Path'
    },
    {
      id: 'tools',
      icon: BrainCircuit,
      color: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
      title: 'AI Cover Letter Generator',
      description: 'Generate personalized, ATS-friendly cover letters tailored to target companies and roles in seconds with downloadable PDF formats.',
      stat: '1-Click Tailoring'
    },
    {
      id: 'billing',
      icon: Crown,
      color: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      title: 'Production Billing & Subscriptions',
      description: 'Seamless multi-gateway payment processing (Razorpay, Cashfree, PhonePe, Stripe) with coupon discounts, referral rewards, and PDF invoices.',
      stat: '₹49/mo Premium Pass'
    }
  ];

  const testimonials = [
    {
      name: 'Aarav Sharma',
      role: 'Senior Software Engineer at Amazon',
      text: 'CareerOS AI boosted my ATS score from 58 to 92. The Google XYZ bullet rewriter alone got me interviews at 4 top tech companies within 2 weeks!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Ananya Patel',
      role: 'Full Stack Engineer at Google',
      text: 'The AI STAR Interview Simulator gave me exact questions asked in system design rounds. I felt 10x more confident during my interviews.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Rohan Mehta',
      role: 'DevOps Lead at Stripe',
      text: 'The Skill Gap Analyzer highlighted Docker and Kubernetes missing keywords on my resume. After following the 60-day roadmap, I landed a 40% salary hike!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const faqs = [
    {
      question: 'How does the 100-Point Algorithmic ATS Scanner work?',
      answer: 'Our engine parses your resume against a target job description across 10 weighted categories including hard skills match, technical keywords, experience relevance, action verbs, measurable ROI metrics, and ATS parsing compatibility.'
    },
    {
      question: 'Can I export formatted PDF resumes and cover letters?',
      answer: 'Yes! CareerOS AI includes a clean, high-resolution PDF rendering engine that generates ATS-compliant, single-page or multi-page PDF documents with clean typography.'
    },
    {
      question: 'What payment gateways are supported for subscriptions?',
      answer: 'We support Razorpay, Cashfree, PhonePe, and Stripe with HMAC-SHA256 encrypted webhook verification, instantaneous activation, discount coupons, and downloadable tax invoices.'
    },
    {
      question: 'Is my resume and personal data secure?',
      answer: 'Absolutely. We enforce Spring Security 6 JWT authentication, BCrypt password hashing, Redis session blacklisting, rate limiting, and SSL HTTPS encryption across all endpoints.'
    }
  ];

  return (
    <div className="space-y-16 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-6 pb-12 text-center space-y-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-extrabold tracking-wide uppercase shadow-inner">
          <Sparkles className="w-4 h-4 animate-pulse" /> Production-Grade AI Career OS Engine v1.0
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Supercharge Your Career with <span className="gradient-text">Algorithmic ATS & AI Intelligence</span>
        </h1>

        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-medium">
          Land your dream role at top tech companies. Analyze ATS scores, rewrite bullets with Google XYZ formula, generate cover letters, practice STAR interviews, and bridge technical skill gaps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetStarted}
            className="gradient-button text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Zap className="w-4 h-4" /> Start Free ATS Analysis
          </button>
          <button
            onClick={() => onExploreFeature('roadmap')}
            className="px-8 py-4 rounded-2xl bg-surface-card hover:bg-surface-elevated text-white font-bold text-sm border border-surface-border transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Compass className="w-4 h-4 text-amber-400" /> Explore Skill Gap Roadmap
          </button>
        </div>

        {/* TRUSTED BY LOGOS */}
        <div className="pt-8 space-y-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Trusted by Engineers Hiring at Global Tech Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all text-gray-400 text-xs font-extrabold">
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-brand-400" /> Google</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-purple-400" /> Microsoft</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-emerald-400" /> Amazon</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-amber-400" /> Stripe</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-rose-400" /> Meta</span>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-3xl text-center space-y-1">
          <div className="text-3xl font-black text-white">98.4%</div>
          <div className="text-xs text-gray-400 font-semibold uppercase">ATS Scan Precision</div>
        </div>
        <div className="glass-card p-6 rounded-3xl text-center space-y-1">
          <div className="text-3xl font-black text-brand-400">12,800+</div>
          <div className="text-xs text-gray-400 font-semibold uppercase">Resumes Analyzed</div>
        </div>
        <div className="glass-card p-6 rounded-3xl text-center space-y-1">
          <div className="text-3xl font-black text-purple-400">+35 Score</div>
          <div className="text-xs text-gray-400 font-semibold uppercase">Average AI Delta</div>
        </div>
        <div className="glass-card p-6 rounded-3xl text-center space-y-1">
          <div className="text-3xl font-black text-emerald-400">3.8x</div>
          <div className="text-xs text-gray-400 font-semibold uppercase">More Interview Calls</div>
        </div>
      </section>

      {/* FEATURE SHOWCASE GRID */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Complete Enterprise Career Suite</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Everything you need from initial resume upload to landing senior engineering job offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onExploreFeature(feat.id)}
                className="glass-card p-6 rounded-3xl space-y-4 hover:border-brand-500/50 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl bg-surface-base flex items-center justify-center ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${feat.badgeBg}`}>
                    {feat.stat}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white group-hover:text-brand-400 transition-colors flex items-center gap-1.5">
                    {feat.title} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="glass-card p-8 rounded-3xl space-y-8 border border-brand-500/30">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Crown className="w-3.5 h-3.5" /> Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl font-extrabold text-white">Choose Your Growth Plan</h2>
          <p className="text-xs text-gray-400">Upgrade anytime. Cancel with 1 click. Full money-back guarantee.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="bg-surface-base p-6 rounded-2xl border border-surface-border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Starter Free Plan</h3>
              <div className="text-3xl font-black text-white">₹0</div>
              <ul className="space-y-2 text-xs text-gray-300 pt-2 border-t border-surface-border">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3 Free ATS Analyses</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic Resume Parser</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Limited AI Rewrites</li>
              </ul>
            </div>
            <button onClick={onGetStarted} className="w-full bg-surface-elevated hover:bg-surface-card text-white text-xs font-bold py-2.5 rounded-xl border border-surface-border">
              Get Started Free
            </button>
          </div>

          {/* Premium Monthly Pass */}
          <div className="bg-surface-card p-6 rounded-2xl border-2 border-brand-500 space-y-4 flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-black uppercase">
              POPULAR
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Premium Pass</h3>
              <div className="text-3xl font-black text-brand-400">₹49 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
              <ul className="space-y-2 text-xs text-gray-200 pt-2 border-t border-surface-border">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited ATS Reports</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Google XYZ Rewriter</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Cover Letter Generator</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> STAR Interview Simulator</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Clean PDF Export Engine</li>
              </ul>
            </div>
            <button onClick={() => onExploreFeature('billing')} className="w-full gradient-button text-white text-xs font-extrabold py-2.5 rounded-xl">
              Subscribe for ₹49
            </button>
          </div>

          {/* Career Pro */}
          <div className="bg-surface-base p-6 rounded-2xl border border-purple-500/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Career Pro</h3>
              <div className="text-3xl font-black text-purple-400">₹199 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
              <ul className="space-y-2 text-xs text-gray-300 pt-2 border-t border-surface-border">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Everything in Premium</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> 1-on-1 Career Roadmap</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Priority LLM Queue Allocation</li>
              </ul>
            </div>
            <button onClick={() => onExploreFeature('billing')} className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold py-2.5 rounded-xl">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Loved by Software Engineers</h2>
          <p className="text-xs text-gray-400">See how candidate developers land offers at Google, Amazon, and Stripe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center space-x-3 pt-2 border-t border-surface-border">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-brand-500/30" />
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="glass-card p-8 rounded-3xl space-y-6">
        <h2 className="text-xl font-extrabold text-white text-center">Frequently Asked Questions</h2>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-surface-border rounded-xl bg-surface-base/80 overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left text-xs font-bold text-white flex justify-between items-center"
              >
                <span>{faq.question}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-surface-border/50 pt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="glass-card-elevated p-10 rounded-3xl text-center space-y-6 border border-brand-500/40 relative overflow-hidden">
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white">Ready to Land Your Dream Tech Job?</h2>
          <p className="text-xs text-gray-300 max-w-md mx-auto">
            Join thousands of developers using CareerOS AI to pass ATS scans and crush technical interviews.
          </p>
        </div>

        <button
          onClick={onGetStarted}
          className="gradient-button text-white font-extrabold text-sm px-10 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Get Started Now
        </button>
      </section>
    </div>
  );
};
