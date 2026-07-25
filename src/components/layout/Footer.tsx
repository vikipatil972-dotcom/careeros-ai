import React from 'react';
import { Sparkles, Linkedin, Github, Shield, FileText, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-surface-border bg-[#060911] text-gray-400 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Brand & Creator */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-button flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg text-white">
              CareerOS <span className="gradient-text">AI</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Enterprise AI SaaS Career Development Platform. Built with Java 21, Spring Boot 3.3, React 18, and PostgreSQL 16.
          </p>
          <div className="text-xs text-gray-300 font-semibold pt-1">
            Engineered by <a href="https://www.linkedin.com/in/vivek-patil-393501326" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">Vivek Patil</a>
          </div>
        </div>

        {/* Column 2: Platform Modules */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Modules</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#analyzer" className="hover:text-brand-400 transition-colors">100-Point ATS Scanner</a></li>
            <li><a href="#rewriter" className="hover:text-brand-400 transition-colors">AI Google XYZ Rewriter</a></li>
            <li><a href="#interview" className="hover:text-brand-400 transition-colors">STAR Mock Interview Simulator</a></li>
            <li><a href="#roadmap" className="hover:text-brand-400 transition-colors">Skill Gap Career Roadmap</a></li>
            <li><a href="#billing" className="hover:text-brand-400 transition-colors">Billing & Subscriptions</a></li>
          </ul>
        </div>

        {/* Column 3: Legal & Trust */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trust & Security</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /> Spring Security 6 Guard</li>
            <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-purple-400" /> HMAC-SHA256 Payment Webhooks</li>
            <li><span className="hover:text-gray-200 cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-gray-200 cursor-pointer">Terms of Service</span></li>
            <li><span className="hover:text-gray-200 cursor-pointer">Security Whitepaper</span></li>
          </ul>
        </div>

        {/* Column 4: Connect & Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Connect & Social</h4>
          <div className="flex items-center space-x-3">
            <a
              href="https://www.linkedin.com/in/vivek-patil-393501326"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface-base hover:bg-brand-500/20 text-brand-400 border border-surface-border transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/vikipatil972-dotcom"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface-base hover:bg-purple-500/20 text-purple-400 border border-surface-border transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@careeros.ai"
              className="p-2.5 rounded-xl bg-surface-base hover:bg-emerald-500/20 text-emerald-400 border border-surface-border transition-all"
              title="Contact Support"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[11px] text-gray-500">
            Official Portfolio: <a href="https://www.linkedin.com/in/vivek-patil-393501326" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline">linkedin.com/in/vivek-patil-393501326</a>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-surface-border/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <div>© 2026 CareerOS AI Platform. All rights reserved.</div>
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Senior Developers worldwide.
        </div>
      </div>
    </footer>
  );
};
