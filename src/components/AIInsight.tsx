import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, BarChart3, LineChart as LineChartIcon, CheckCircle2 } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend
} from 'recharts';

export function AIInsight() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const compData = [
    { name: 'You', discount: 10 },
    { name: 'Market Avg', discount: 20 },
  ];

  const forecastData = [
    { day: 'Day 1', baseline: 1000, predicted: 1000 },
    { day: 'Day 2', baseline: 1050, predicted: 1200 },
    { day: 'Day 3', baseline: 1020, predicted: 1500 },
    { day: 'Day 4', baseline: 1080, predicted: 1900 },
    { day: 'Day 5', baseline: 1100, predicted: 2400 },
    { day: 'Day 6', baseline: 1050, predicted: 2800 },
    { day: 'Day 7', baseline: 1150, predicted: 3100 },
  ];

  return (
    <div className="p-8 h-full flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
             <Sparkles className="w-8 h-8 text-indigo-600" /> AI Insight
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Predictive analytics and next-best-action recommendations.</p>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-12">
        
        {/* Widget 1: Trend Radar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Global & Local Trend Radar (Sri Lanka)
          </h2>
          
          <div className="flex-1 flex flex-col justify-between gap-8">
            {/* Word Cloud */}
            <div className="flex flex-wrap justify-center items-center gap-4 py-4 px-2">
              <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-110 transition-transform cursor-pointer">Avurudu Shopping</span>
              <span className="text-xl font-bold text-indigo-400 hover:scale-110 transition-transform cursor-pointer opacity-80">Sustainable Fashion</span>
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 hover:scale-110 transition-transform cursor-pointer">Vesak Offers</span>
              <span className="text-lg font-medium text-slate-500 hover:scale-110 transition-transform cursor-pointer">Inflation Resilient Deals</span>
              <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-110 transition-transform cursor-pointer">Colombo Food Scene</span>
              <span className="text-sm font-semibold text-emerald-500 hover:scale-110 transition-transform cursor-pointer opacity-70">Cashback</span>
              <span className="text-base font-bold text-purple-500 hover:scale-110 transition-transform cursor-pointer">Digital Wallets</span>
            </div>

            {/* Top 3 Trends */}
            <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Emerging Trends</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-100 text-emerald-600 p-1 rounded text-xs font-bold shrink-0 mt-0.5">↑ 42%</div>
                  <p className="text-sm text-slate-700 font-medium">Interest in localized gift hampers this week.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-100 text-emerald-600 p-1 rounded text-xs font-bold shrink-0 mt-0.5">↑ 28%</div>
                  <p className="text-sm text-slate-700 font-medium">Search volume for "card offers dining colombo".</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-100 text-emerald-600 p-1 rounded text-xs font-bold shrink-0 mt-0.5">↑ 15%</div>
                  <p className="text-sm text-slate-700 font-medium">Preference for points redemption at supermarkets.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Widget 2: NBA Personalization */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.2)] border-2 border-indigo-200/50 p-6 flex flex-col relative overflow-hidden animate-pulse-slow">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            AI Recommendation Engine
          </h2>

          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4 items-start">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-800 mb-1">Observation: Churn Risk Detected</h4>
                <p className="text-sm text-amber-700 leading-relaxed">Your Platinum members haven't visited in 45 days. Local data suggests a post-holiday shopping slump.</p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex gap-4 items-start">
              <Lightbulb className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-indigo-800 mb-1">Opportunity</h4>
                <p className="text-sm text-indigo-700 leading-relaxed">Google Trends shows a +30% spike for specific premium goods. Suggest running a Double Points campaign this weekend.</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => showToast('AI Campaign Parameters Loaded')}
            className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 text-base"
          >
            ✨ 1-Click Apply Campaign
          </button>
        </div>

        {/* Widget 3: Competitor & Market Intelligence */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            Market Intelligence Snapshot
          </h2>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-6">
             <p className="text-sm text-blue-800 leading-relaxed">
               <strong className="font-bold">Competitor Alert:</strong> Major retail chains in the Western Province just launched 20% off campaigns. Your Average Basket Size is 15% higher. 
               <br/><br/>
               <strong className="font-bold">Suggestion:</strong> Highlight value via loyalty points rather than price discounting.
             </p>
          </div>

          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="discount" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {compData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Widget 4: Predictive ROI */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-indigo-500" />
            Predictive Campaign ROI
          </h2>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 mb-6">
             <p className="text-sm text-emerald-800 leading-relaxed">
               📊 <strong>Prediction:</strong> Launching a 3-day flash sale from Aug 10-12 is forecasted to yield a <strong>+18% increase in revenue</strong> and <strong>+25% new sign-ups</strong> based on historical local seasonal data.
             </p>
          </div>

          <div className="flex-1 min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 500, color: '#64748b', paddingTop: '10px'}} />
                <Line 
                  type="monotone" 
                  name="Baseline Trajectory"
                  dataKey="baseline" 
                  stroke="#94a3b8" 
                  strokeWidth={3} 
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  name="AI Predicted Trajectory"
                  dataKey="predicted" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  strokeDasharray="5 5"
                  dot={{r: 4, strokeWidth: 2, fill: '#fff'}}
                  activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 font-medium text-sm border border-slate-700"
          >
            <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(99,102,241,0.2);
          }
          50% {
            box-shadow: 0 0 35px rgba(99,102,241,0.4);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
