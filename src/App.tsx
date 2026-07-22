import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { AiRewriterPage } from './pages/AiRewriterPage';
import { AiToolsPage } from './pages/AiToolsPage';
import { BillingPage } from './pages/BillingPage';
import { AdminPage } from './pages/AdminPage';
import { CareerRoadmapPage } from './pages/CareerRoadmapPage';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-gray-400 text-sm">
        Loading CareerOS AI Platform...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] flex flex-col">
      <Navbar
        onOpenBilling={() => setActiveTab('billing')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardPage onNavigate={setActiveTab} />}
          {activeTab === 'roadmap' && <CareerRoadmapPage />}
          {activeTab === 'analyzer' && <ResumeAnalyzerPage onNavigate={setActiveTab} />}
          {activeTab === 'rewriter' && <AiRewriterPage />}
          {activeTab === 'tools' && <AiToolsPage />}
          {activeTab === 'billing' && <BillingPage />}
          {activeTab === 'admin' && <AdminPage />}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
