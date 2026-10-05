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
import { MerchantPrograms } from './components/MerchantPrograms';
import { MerchantCampaigns } from './components/MerchantCampaigns';
import { MerchantRequests } from './components/MerchantRequests';
import { MerchantTiers } from './components/MerchantTiers';
import { MerchantAnalytics } from './components/MerchantAnalytics';
import { CustomerOnboarding } from './components/CustomerOnboarding';
import { CustomerInsights } from './components/CustomerInsights';
import { ViewState, RulesState, Customer, Reward, Program, Rule, Campaign, RedemptionRule, ProgramRequest, CampaignRequest, TierRequest } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Hexagon, ArrowRight, Building2, MapPin, Store, ShieldCheck } from 'lucide-react';

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
  const [authView, setAuthView] = useState<'login' | 'authenticated'>('login');
  const [userRole, setUserRole] = useState<'hdps_admin' | 'merchant' | null>(null);

  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  
  // Requests State
  const [programRequests, setProgramRequests] = useState<ProgramRequest[]>([]);
  const [campaignRequests, setCampaignRequests] = useState<CampaignRequest[]>([
    {
      id: 'c1',
      merchantName: 'ABC Merchant',
      campaignName: 'Avurudu VIP Booster',
      description: 'Special promotion for the holiday season to boost VIP sales.',
      productType: ['All Products'],
      customerGroup: 'Gold & Platinum',
      campaignType: 'Promotion',
      startDate: '2026-10-01',
      endDate: '2026-10-31',
      recurring: false,
      recurrenceDetails: '',
      socialMediaChannels: ['Instagram', 'Facebook'],
      geographicAreas: 'All Regions',
      status: 'Active',
      requestDate: '2026-08-01'
    },
    {
      id: 'c2',
      merchantName: 'ABC Merchant',
      campaignName: 'Weekend Flash Discount',
      description: 'Quick weekend sale to re-engage past customers.',
      productType: ['Specific Categories'],
      customerGroup: 'Lapsed Customers',
      campaignType: 'Discount',
      startDate: '2026-08-15',
      endDate: '2026-08-17',
      recurring: false,
      recurrenceDetails: '',
      socialMediaChannels: ['SMS Only'],
      geographicAreas: 'Colombo',
      status: 'Pending',
      requestDate: '2026-08-05'
    }
  ]);
  const [tierRequests, setTierRequests] = useState<TierRequest[]>([]);

  const [activeTiers, setActiveTiers] = useState([
    { id: 't1', name: 'Bronze' },
    { id: 't2', name: 'Silver' },
    { id: 't3', name: 'Gold' }
  ]);
  const [activeAccumulationRules, setActiveAccumulationRules] = useState([
    { id: 'acc1', name: 'Base Points Earning' },
    { id: 'acc2', name: 'Double Points Weekend' }
  ]);
  const [activeRedemptionRules, setActiveRedemptionRules] = useState([
    { id: 'red1', name: 'Standard Redemption' },
    { id: 'red2', name: 'Partner Voucher' }
  ]);

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
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa&mouth=smile',
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

  const handleLogin = (role: 'hdps_admin' | 'merchant') => {
    setUserRole(role);
    setCurrentView(role === 'hdps_admin' ? 'dashboard' : 'merchant-programs');
    setAuthView('authenticated');
  };

  const handleLogout = () => {
    setAuthView('login');
    setUserRole(null);
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
            <p className="text-slate-500 text-sm font-medium mb-8 text-center">Select your portal to continue</p>

            <div className="w-full flex flex-col gap-4">
              <button
                onClick={() => handleLogin('hdps_admin')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-4 text-sm font-bold transition-all shadow-md flex items-center justify-center gap-3 group"
              >
                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Log in as HDPS Admin
              </button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                onClick={() => handleLogin('merchant')}
                className="w-full bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-xl px-4 py-4 text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-3 group"
              >
                <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Log in as Merchant (ABC Merchant)
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
            <Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={handleLogout} userRole={userRole} />
            
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
                
                {currentView === 'merchant-requests' && (
                  <MerchantRequests 
                    programRequests={programRequests} setProgramRequests={setProgramRequests}
                    campaignRequests={campaignRequests} setCampaignRequests={setCampaignRequests}
                    tierRequests={tierRequests} setTierRequests={setTierRequests}
                  />
                )}
                {currentView === 'merchant-tiers' && (
                  <MerchantTiers tierRequests={tierRequests} setTierRequests={setTierRequests} activeTiers={activeTiers} />
                )}
                {currentView === 'merchant-programs' && (
                  <MerchantPrograms 
                    programs={programs} 
                    programRequests={programRequests} 
                    setProgramRequests={setProgramRequests} 
                    activeTiers={activeTiers}
                    activeAccumulationRules={activeAccumulationRules}
                    activeRedemptionRules={activeRedemptionRules}
                  />
                )}
                {currentView === 'merchant-campaigns' && (
                  <MerchantCampaigns campaigns={campaigns} campaignRequests={campaignRequests} setCampaignRequests={setCampaignRequests} />
                )}
                {currentView === 'merchant-onboarding' && (
                  <CustomerOnboarding customers={customers} setCustomers={setCustomers} />
                )}
                {currentView === 'merchant-customer-insights' && (
                  <CustomerInsights customers={customers} />
                )}
                {currentView === 'merchant-analytics' && <MerchantAnalytics />}
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <AskAI />
    </div>
  );
}
