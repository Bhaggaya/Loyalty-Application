import { LayoutDashboard, Settings2, Gift, Users, MoreVertical, Hexagon, Layers, Megaphone, LineChart, BrainCircuit, Smartphone, Inbox, Send } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
  userRole: 'hdps_admin' | 'merchant' | null;
}

export function Sidebar({ currentView, onViewChange, onLogout, userRole }: SidebarProps) {
  // HDPS Admin Menus
  const hdpsMainMenu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'merchant-requests', icon: Inbox, label: 'Merchant Requests' },
    { id: 'programs', icon: Layers, label: 'Programs' },
    { id: 'customers', icon: Users, label: 'Customers' },
  ] as const;

  const hdpsOperationsMenu = [
    { id: 'rules', icon: Settings2, label: 'Rules' },
    { id: 'campaigns', icon: Megaphone, label: 'Campaigns' },
    { id: 'redemptions', icon: Gift, label: 'Redemptions' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
  ] as const;

  const hdpsDataMenu = [
    { id: 'analytics', icon: LineChart, label: 'Analytics' },
    { id: 'ai-insight', icon: BrainCircuit, label: 'AI Insight' },
  ] as const;

  // Merchant Menus
  const merchantRequestsMenu = [
    { id: 'merchant-tiers', icon: Layers, label: 'Request Tiers' },
    { id: 'merchant-programs', icon: Send, label: 'Request Program' },
    { id: 'merchant-campaigns', icon: Megaphone, label: 'Request Campaign' },
    { id: 'merchant-onboarding', icon: Users, label: 'Customer Onboarding' },
  ] as const;

  const merchantDataMenu = [
    { id: 'merchant-analytics', icon: LineChart, label: 'Analytics' },
  ] as const;

  const merchantNavigatorMenu = [
    { id: 'merchant-customer-insights', icon: Users, label: 'View Customer Profile' },
  ] as const;

  // Shared Tools Menu
  const toolsMenu = [
    { id: 'simulation', icon: Smartphone, label: 'UX Simulator' },
  ] as const;

  return (
    <aside className="w-64 border-r border-slate-200/50 flex flex-col justify-between z-10 relative bg-white/30 backdrop-blur-sm">
      <div className="flex flex-col w-full py-6 h-full overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 px-8 mb-6">
           <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
             <Hexagon className="w-5 h-5 text-white" />
           </div>
           <span className="font-bold text-slate-800 text-lg tracking-tight truncate">Hitachi Loyalty Magic™</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col w-full px-4 overflow-y-auto pb-4 scrollbar-hide">
          {userRole === 'hdps_admin' ? (
            <>
              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">Main Menu</h3>
              {hdpsMainMenu.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id as ViewState)}
                    className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm' 
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}

              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Operations</h3>
              {hdpsOperationsMenu.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id as ViewState)}
                    className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm' 
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
              
              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Data & Insights</h3>
              {hdpsDataMenu.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id as ViewState)}
                    className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm' 
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </>
          ) : (
            <>
              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">Requests</h3>
              {merchantRequestsMenu.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id as ViewState)}
                    className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm' 
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}

              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Data & Insights</h3>
              {merchantDataMenu.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id as ViewState)}
                    className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm' 
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Data and Insight Navigator</h3>
              {merchantNavigatorMenu.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id as ViewState)}
                    className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm' 
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </>
          )}
          
          <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Tools</h3>
          {toolsMenu.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewState)}
                className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 ${
                  isActive 
                    ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm' 
                    : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Fake User Profile */}
      <div className="p-4 mx-4 rounded-2xl hover:bg-white/50 transition-colors flex items-center justify-between cursor-pointer">
         <div className="flex items-center gap-3 overflow-hidden">
           <img src={userRole === 'hdps_admin' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Store"} alt="Profile" className="w-10 h-10 rounded-full bg-slate-200 shrink-0 border border-white" />
           <div className="flex flex-col overflow-hidden">
             <span className="text-sm font-bold text-slate-800 leading-none truncate">{userRole === 'hdps_admin' ? 'Alex Morgan' : 'ABC Merchant'}</span>
             <span className="text-xs text-slate-500 mt-1">{userRole === 'hdps_admin' ? 'HDPS Admin' : 'Merchant'}</span>
           </div>
         </div>
         <MoreVertical className="w-4 h-4 text-slate-400 shrink-0" />
      </div>

      <div className="px-4 pb-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 font-semibold text-sm transition-colors border border-slate-200/50"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
