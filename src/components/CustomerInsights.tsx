import React, { useState } from 'react';
import { Search, User, ArrowLeft, Activity, DollarSign, BrainCircuit, Calendar, MapPin, Star, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Customer } from '../types';

interface CustomerInsightsProps {
  customers: Customer[];
}

export function CustomerInsights({ customers }: CustomerInsightsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Platinum': return 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-slate-900/30';
      case 'Gold': return 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-amber-500/30';
      case 'Silver': return 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 shadow-slate-400/30';
      default: return 'bg-gradient-to-r from-orange-300 to-orange-400 text-white shadow-orange-400/30';
    }
  };

  const mockTransactions = [
    { id: '1', date: '2023-10-24', location: 'Downtown Store', amount: '$124.50', points: '+124' },
    { id: '2', date: '2023-10-18', location: 'Online Portal', amount: '$45.00', points: '+45' },
    { id: '3', date: '2023-10-12', location: 'Westside Mall', amount: '$210.00', points: '+210' },
    { id: '4', date: '2023-09-28', location: 'Downtown Store', amount: 'Reward Redemption', points: '-500' },
  ];

  return (
    <div className="flex-1 p-4 lg:p-8 relative z-10 h-full overflow-y-auto flex flex-col gap-8 pb-24">
      <AnimatePresence mode="wait">
        
        {/* Default View: Search and Grid */}
        {!selectedCustomer && (
          <motion.div
            key="search-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                <Search className="w-8 h-8 text-indigo-600" /> Customer Directory
              </h1>
              <p className="text-sm text-slate-500 mt-2 font-medium">Search and select a customer to view their 360° profile.</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search customer by name, mobile, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm transition-all"
              />
            </div>

            {/* Customer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredCustomers.map(customer => (
                <div key={customer.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-4">
                    <img src={customer.avatarUrl} alt={customer.fullName} className="w-14 h-14 rounded-full shadow-sm border-2 border-white" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{customer.fullName}</h3>
                      <p className="text-xs font-medium text-slate-500">{customer.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tier</span>
                      <span className="text-sm font-bold text-slate-700">{customer.tier}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Points</span>
                      <span className="text-sm font-bold text-slate-700">{customer.pointsBalance.toLocaleString()} pts</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedCustomer(customer)}
                    className="mt-2 w-full py-2.5 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
                  >
                    View 360 Profile <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              ))}
              
              {filteredCustomers.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500 font-medium">
                  No customers found matching your search.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Profile View */}
        {selectedCustomer && (
          <motion.div
            key="profile-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="self-start flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Directory
            </button>

            {/* Header Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
               
               <img src={selectedCustomer.avatarUrl} alt={selectedCustomer.fullName} className="w-32 h-32 rounded-3xl shadow-lg border-4 border-white object-cover" />
               
               <div className="flex-1 text-center md:text-left z-10">
                 <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{selectedCustomer.fullName}</h2>
                 <p className="text-slate-500 font-medium mt-1">{selectedCustomer.phone} • {selectedCustomer.email}</p>
                 <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                   <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                     <User className="w-4 h-4" /> ID: {selectedCustomer.id}
                   </div>
                   <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                     <Calendar className="w-4 h-4" /> Joined: {selectedCustomer.lastVisitDate}
                   </div>
                 </div>
               </div>

               <div className={`px-6 py-3 rounded-2xl shadow-lg font-bold text-lg flex items-center gap-2 ${getTierColor(selectedCustomer.tier)}`}>
                 <Star className="w-5 h-5 fill-current" /> {selectedCustomer.tier} Member
               </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Point Balance</h3>
                <p className="text-4xl font-extrabold text-slate-800">{selectedCustomer.pointsBalance.toLocaleString()} <span className="text-lg text-slate-400 font-medium">pts</span></p>
                <p className="text-xs font-semibold text-amber-500 mt-3">250 pts expiring in 30 days</p>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Lifetime Spend</h3>
                <p className="text-4xl font-extrabold text-slate-800">${selectedCustomer.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p className="text-xs font-semibold text-emerald-500 mt-3">Top 15% of customers</p>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5 text-rose-600" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">AI Risk Score</h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-100 text-emerald-700 shadow-sm border border-emerald-200/50 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Low Risk
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-4 leading-relaxed">
                  High engagement. Low churn probability based on recent activity.
                </p>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-100 overflow-hidden mt-2">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Recent Transaction History</h3>
                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium text-slate-800">{tx.date}</td>
                        <td className="py-4 px-6 text-sm text-slate-500 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" /> {tx.location}
                        </td>
                        <td className="py-4 px-6 text-sm font-bold text-slate-800">{tx.amount}</td>
                        <td className={`py-4 px-6 text-sm font-bold ${tx.points.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {tx.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}