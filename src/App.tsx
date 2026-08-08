import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RulesEngine } from './components/RulesEngine';
import { Rewards } from './components/Rewards';
import { Redemptions } from './components/Redemptions';
import { Customers } from './components/Customers';
import { Programs } from './components/Programs';
import { Campaigns } from './components/Campaigns';
import { Analytics } from './components/Analytics';
import { AIInsight } from './components/AIInsight';
import { Simulator } from './components/Simulator';
import { AskAI } from './components/AskAI';
import { ViewState, RulesState, Customer, Reward, Program, Rule, Campaign, RedemptionRule } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Hexagon, ArrowRight, Building2, MapPin } from 'lucide-react';

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[500px]">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-lg border border-slate-100 flex flex-col items-center text-center max-w-lg w-full">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{title}</h2>
        <p className="text-slate-500 font-medium">
          Module coming soon...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [authView, setAuthView] = useState<'login' | 'register' | 'authenticated'>('login');
  const [currentMerchant, setCurrentMerchant] = useState({
    businessName: '',
    industry: '',
    address: ''
  });
  
  const [loginEmail, setLoginEmail] = useState('admin@sampathbank.com');
  const [loginPassword, setLoginPassword] = useState('demo123');
  
  const [regStep, setRegStep] = useState(1);
  const [regData, setRegData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    industry: 'Banking',
    address: ''
  });

  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [rules, setRules] = useState<RulesState>([
    {
      id: 'ru1',
      name: 'Base Points Earning',
      description: 'Standard earn rate for all purchases',
      ruleClass: 'Accumulation',
      status: 'Active',
      earningMethod: 'Points per $1',
      earningValue: 1,
      bonusType: 'Recurring',
      applicableScope: ['All Products'],
      tierEligibility: ['Bronze', 'Silver', 'Gold', 'Platinum'],
      stackable: true,
    }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'c1',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa',
      fullName: 'Vanessa Lennox',
      email: 'vanessa@example.com',
      phone: '+1 (555) 019-2041',
      tier: 'Gold',
      pointsBalance: 1250,
      visits: 42,
      totalSpent: 850.50,
      status: 'Active',
      lastVisitDate: '2023-10-24',
    }
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 'r1',
      name: 'Free Premium Coffee',
      category: 'Food',
      pointsCost: 500,
      cashValue: 5.00,
      totalRedeemed: 1250,
      status: 'Active',
    }
  ]);

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 'p1',
      name: 'Test Tier Program',
      type: 'Tier-Based',
      status: 'Active',
      description: 'A mock tier-based program.',
    },
    {
      id: 'p2',
      name: 'Test Card-Linked Program',
      type: 'Card-Linked',
      status: 'Active',
      description: 'A mock card-linked program.',
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [redemptionRules, setRedemptionRules] = useState<RedemptionRule[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthView('authenticated');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentMerchant({
      businessName: regData.businessName || 'New Business',
      industry: regData.industry,
      address: regData.address
    });
    setAuthView('authenticated');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-300 relative flex items-center justify-center p-4 lg:p-8 overflow-hidden font-sans selection:bg-indigo-200">
      <AnimatePresence mode="wait">
        {authView === 'login' && (
          <motion.div 
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 p-10 flex flex-col items-center relative z-10"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
              <Hexagon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800 mb-1">Hitachi Loyalty Magic™</h1>
            <p className="text-slate-500 text-sm font-medium mb-8">Management Portal</p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-4 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all mt-4 flex justify-center items-center gap-2 group"
              >
                Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8">
              <button onClick={() => setAuthView('register')} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                New Merchant? Create an Account
              </button>
            </div>
          </motion.div>
        )}

        {authView === 'register' && (
          <motion.div 
            key="register"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 p-10 flex flex-col relative z-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Hexagon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-800">Merchant Onboarding</h1>
                <p className="text-slate-500 text-sm font-medium">Step {regStep} of 2</p>
              </div>
            </div>

            <form onSubmit={regStep === 1 ? (e) => { e.preventDefault(); setRegStep(2); } : handleRegister} className="w-full flex flex-col gap-5">
              {regStep === 1 ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Work Email</label>
                    <input
                      type="email"
                      value={regData.email}
                      onChange={(e) => setRegData({...regData, email: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Password</label>
                      <input
                        type="password"
                        value={regData.password}
                        onChange={(e) => setRegData({...regData, password: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Confirm Password</label>
                      <input
                        type="password"
                        value={regData.confirmPassword}
                        onChange={(e) => setRegData({...regData, confirmPassword: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all mt-4"
                  >
                    Next Step
                  </button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Business Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={regData.businessName}
                        onChange={(e) => setRegData({...regData, businessName: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        required
                        placeholder="e.g. CTBC Bank"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Industry</label>
                    <select
                      value={regData.industry}
                      onChange={(e) => setRegData({...regData, industry: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="Banking">Banking & Finance</option>
                      <option value="Retail">Retail</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Physical Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={regData.address}
                        onChange={(e) => setRegData({...regData, address: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        required
                        placeholder="Main headquarters or store location"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button 
                      type="button"
                      onClick={() => setRegStep(1)}
                      className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-4 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all"
                    >
                      Complete Registration & Launch
                    </button>
                  </div>
                </motion.div>
              )}
            </form>

            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <button onClick={() => { setAuthView('login'); setRegStep(1); }} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                Already have an account? Log in
              </button>
            </div>
          </motion.div>
        )}

        {authView === 'authenticated' && (
          <motion.div 
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full h-full max-w-[1600px] bg-slate-50/90 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 overflow-hidden relative z-10"
          >
            <Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={() => setAuthView('login')} />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10 bg-slate-100/50">
              <Header />
                
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {currentView === 'dashboard' && <Dashboard programs={programs} setPrograms={setPrograms} />}
                {currentView === 'programs' && <Programs programs={programs} setPrograms={setPrograms} rules={rules} />}
                {currentView === 'customers' && <Customers customers={customers} setCustomers={setCustomers} programs={programs} />}
                {currentView === 'rules' && <RulesEngine rules={rules} setRules={setRules} />}
                {currentView === 'campaigns' && <Campaigns campaigns={campaigns} setCampaigns={setCampaigns} rules={rules} />}
                {currentView === 'redemptions' && <Redemptions redemptionRules={redemptionRules} setRedemptionRules={setRedemptionRules} />}
                {currentView === 'rewards' && <Rewards rewards={rewards} setRewards={setRewards} />}
                {currentView === 'analytics' && <Analytics />}
                {currentView === 'ai-insight' && <AIInsight />}
                {currentView === 'simulation' && <Simulator customers={customers} setCustomers={setCustomers} programs={programs} />}
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <AskAI />
    </div>
  );
}
