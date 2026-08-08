import React from 'react';
import { 
  Users, UserCheck, DollarSign, Activity, 
  TrendingUp, TrendingDown, MapPin, Target, Sparkles, Send 
} from 'lucide-react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, BarChart
} from 'recharts';

const ACCUM_REDEMP_DATA = [
  { name: 'Jan', accum: 4000, redemp: 2400, rate: 60 },
  { name: 'Feb', accum: 3000, redemp: 1398, rate: 46 },
  { name: 'Mar', accum: 2000, redemp: 9800, rate: 80 },
  { name: 'Apr', accum: 2780, redemp: 3908, rate: 70 },
  { name: 'May', accum: 1890, redemp: 4800, rate: 85 },
  { name: 'Jun', accum: 2390, redemp: 3800, rate: 75 },
  { name: 'Jul', accum: 3490, redemp: 4300, rate: 82 },
];

const TIER_DATA = [
  { name: 'Bronze', value: 400 },
  { name: 'Silver', value: 300 },
  { name: 'Gold', value: 200 },
  { name: 'Platinum', value: 100 },
];
const TIER_COLORS = ['#fb923c', '#94a3b8', '#fbbf24', '#818cf8'];

const BRANCH_DATA = [
  { name: 'Downtown', revenue: 4000 },
  { name: 'Uptown', revenue: 3000 },
  { name: 'Westside', revenue: 2000 },
  { name: 'Eastside', revenue: 2780 },
  { name: 'Northside', revenue: 1890 },
];

const DAILY_VOLUME_DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  volume: Math.floor(Math.random() * 5000) + 1000,
}));

const HOURLY_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  transactions: i < 8 || i > 22 ? Math.floor(Math.random() * 50) + 10 : Math.floor(Math.random() * 400) + 100,
}));

const RISK_CUSTOMERS = [
  { id: 1, name: 'Alice Smith', spend: '$1,240', lastVisit: '2023-10-01', risk: 'High', action: 'Push 15% Win-back Voucher' },
  { id: 2, name: 'Bob Jones', spend: '$450', lastVisit: '2023-10-15', risk: 'High', action: 'Send 2x Points Offer' },
  { id: 3, name: 'Charlie Brown', spend: '$3,800', lastVisit: '2023-11-20', risk: 'Medium', action: 'Upgrade to Silver Tier' },
  { id: 4, name: 'Diana Prince', spend: '$5,200', lastVisit: '2023-11-25', risk: 'Low', action: 'No action needed' },
];

export function Analytics() {
  return (
    <div className="flex-1 p-4 lg:p-8 relative z-10 h-full overflow-y-auto flex flex-col gap-8 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics & AI Insights</h1>
        <p className="text-sm text-slate-500">Monitor program performance and leverage AI for retention.</p>
      </div>

      {/* Top Row KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3 mr-1" /> 8% vs last month
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Members</p>
            <h3 className="text-3xl font-black text-slate-800">12,450</h3>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="flex items-center text-slate-500 text-xs font-bold bg-slate-100 px-2 py-1 rounded-lg">
              65% of total
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Active Members</p>
            <h3 className="text-3xl font-black text-slate-800">8,102</h3>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3 mr-1" /> 12% vs last month
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-800">$142,000</h3>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Transactions</p>
            <h3 className="text-3xl font-black text-slate-800">45,200</h3>
          </div>
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Accumulation vs Redemption</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ACCUM_REDEMP_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={10} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '12px', fontWeight: 600}} />
                <Line yAxisId="left" type="monotone" dataKey="accum" name="Accumulated" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line yAxisId="left" type="monotone" dataKey="redemp" name="Redeemed" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line yAxisId="right" type="monotone" dataKey="rate" name="Redemption Rate %" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Tier Distribution</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TIER_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {TIER_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TIER_COLORS[index % TIER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-3xl font-black text-slate-800">10k</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {TIER_DATA.map((tier, idx) => (
              <div key={tier.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: TIER_COLORS[idx] }} />
                <span className="text-sm font-bold text-slate-700">{tier.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Branch Performance</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BRANCH_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} width={80} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
          <h3 className="text-lg font-bold text-slate-800 mb-4 z-10">Geo-Location Insights</h3>
          <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200" style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
            {/* Mock Map Elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 fill-current">
                <path d="M20,20 Q40,10 60,30 T90,20 L90,80 Q70,90 50,70 T10,80 Z" opacity="0.5"/>
              </svg>
            </div>
            
            {/* Heatmap spots */}
            <div className="absolute top-[30%] left-[40%] w-32 h-32 bg-rose-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-[35%] left-[42%] w-16 h-16 bg-rose-500/60 rounded-full blur-md"></div>
            <div className="absolute top-[38%] left-[44%] w-4 h-4 bg-rose-600 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.8)] border-2 border-white z-10 flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white absolute -top-4" />
            </div>

            <div className="absolute top-[60%] left-[20%] w-24 h-24 bg-amber-500/30 rounded-full blur-xl"></div>
            <div className="absolute top-[63%] left-[23%] w-12 h-12 bg-amber-500/60 rounded-full blur-md"></div>
            <div className="absolute top-[66%] left-[26%] w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)] border-2 border-white z-10 flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white absolute -top-4" />
            </div>

            <div className="absolute top-[40%] left-[70%] w-40 h-40 bg-blue-500/30 rounded-full blur-xl"></div>
            <div className="absolute top-[45%] left-[73%] w-20 h-20 bg-blue-500/60 rounded-full blur-md"></div>
            <div className="absolute top-[49%] left-[78%] w-4 h-4 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)] border-2 border-white z-10 flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white absolute -top-4" />
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm border border-slate-200 text-xs font-bold text-slate-700 flex flex-col gap-1 z-20">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-500"></span> High Density</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Medium Density</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Low Density</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 - AI Risk & Area Chart */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 flex flex-col overflow-hidden shrink-0">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">AI Risk & Retention Analysis</h2>
        </div>
        
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 rounded-tl-xl">Customer Name</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Total Spend</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Last Visit Date</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Risk Score</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 rounded-tr-xl">AI Suggestion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RISK_CUSTOMERS.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-sm text-slate-800">{cust.name}</td>
                  <td className="py-4 px-4 text-sm font-medium text-slate-600">{cust.spend}</td>
                  <td className="py-4 px-4 text-sm text-slate-500">{cust.lastVisit}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      cust.risk === 'High' ? 'bg-red-100 text-red-700' :
                      cust.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {cust.risk} Risk
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {cust.risk !== 'Low' ? (
                      <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-indigo-200 flex items-center gap-1.5 whitespace-nowrap">
                        <Send className="w-3 h-3" />
                        {cust.action}
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">{cust.action}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Daily Transaction Volume</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_VOLUME_DATA} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickCount={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} width={40} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  labelStyle={{fontWeight: 'bold', color: '#64748b', marginBottom: '4px'}}
                  formatter={(value) => [`$${value}`, 'Volume']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Area type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4 - Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Cohort Retention Matrix</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[500px] grid grid-cols-7 gap-1">
              <div className="col-span-1"></div>
              {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map(m => (
                <div key={m} className="text-[10px] font-bold text-slate-400 text-center uppercase">{m}</div>
              ))}
              
              {[
                { cohort: 'Jan', vals: [100, 85, 75, 60, 55, 50] },
                { cohort: 'Feb', vals: [100, 82, 70, 65, 50, 0] },
                { cohort: 'Mar', vals: [100, 88, 80, 75, 0, 0] },
                { cohort: 'Apr', vals: [100, 90, 85, 0, 0, 0] },
                { cohort: 'May', vals: [100, 92, 0, 0, 0, 0] },
                { cohort: 'Jun', vals: [100, 0, 0, 0, 0, 0] },
              ].map((row, i) => (
                <React.Fragment key={row.cohort}>
                  <div className="text-[10px] font-bold text-slate-500 flex items-center">{row.cohort}</div>
                  {row.vals.map((v, j) => {
                    if (v === 0) return <div key={j} className="bg-slate-50 rounded-md aspect-square"></div>;
                    const opacity = v / 100;
                    return (
                      <div 
                        key={j} 
                        className="rounded-md aspect-square flex items-center justify-center text-[10px] font-bold text-indigo-900 border border-indigo-100 transition-transform hover:scale-110 cursor-pointer"
                        style={{ backgroundColor: `rgba(99, 102, 241, ${opacity * 0.8})` }}
                        title={`${v}% Retention`}
                      >
                        {v}%
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Peak Shopping Hours</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOURLY_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} interval="preserveStartEnd" minTickGap={20} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="transactions" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
