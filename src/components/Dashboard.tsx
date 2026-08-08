import React, { useState } from 'react';
import { KPI, Program } from '../types';
import { ArrowUp, ArrowDown, Plus, X, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockKPIs: KPI[] = [
  { id: '1', title: 'Total Members', value: '12,450', trend: '12.5%', trendUp: true },
  { id: '2', title: 'Points Outstanding', value: '2.4M', trend: '2.1%', trendUp: false },
  { id: '3', title: 'Redemption Rate', value: '45.8%', trend: '5.2%', trendUp: true },
  { id: '4', title: 'Active Campaigns', value: '12', trend: '16.4%', trendUp: true },
];

export function Dashboard({ programs, setPrograms }: { programs: Program[], setPrograms: React.Dispatch<React.SetStateAction<Program[]>> }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newProgram, setNewProgram] = useState<Partial<Program>>({
    name: '',
    description: '',
    type: 'Points-Based',
    pointsValuation: 1,
    expiryLogic: 'No Expiry',
    expiryValue: '',
    urlSlug: '',
    allowPublicEnrollment: false,
    autoEnroll: false,
    status: 'Active'
  });

  const handleNextStep = () => setWizardStep(s => Math.min(s + 1, 4));
  const handlePrevStep = () => setWizardStep(s => Math.max(s - 1, 1));
  
  const handleGoLive = () => {
    const program: Program = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProgram.name || 'Untitled Program',
      description: newProgram.description || '',
      status: 'Active',
      type: newProgram.type,
      pointsValuation: newProgram.pointsValuation,
      expiryLogic: newProgram.expiryLogic,
      expiryValue: newProgram.expiryValue,
      urlSlug: newProgram.urlSlug,
      allowPublicEnrollment: newProgram.allowPublicEnrollment,
      autoEnroll: newProgram.autoEnroll,
    };
    setPrograms([...programs, program]);
    setIsWizardOpen(false);
    setWizardStep(1);
    setNewProgram({
      name: '', description: '', type: 'Points-Based', pointsValuation: 1,
      expiryLogic: 'No Expiry', expiryValue: '', urlSlug: '',
      allowPublicEnrollment: false, autoEnroll: false, status: 'Active'
    });
  };

  return (
    <div className="flex-1 flex flex-col relative z-10 p-8">
       {/* Top KPIs */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
         {mockKPIs.map((kpi) => (
           <div key={kpi.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col justify-between min-h-[140px]">
             <div className="flex justify-between items-start mb-2">
               <p className="text-sm font-semibold text-slate-800">{kpi.title}</p>
               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
             </div>
             <h3 className="text-4xl font-bold text-slate-900 tracking-tight my-2">{kpi.value}</h3>
             <div className="flex items-center gap-1.5 mt-auto">
                <div className={`flex items-center gap-0.5 text-xs font-bold ${kpi.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {kpi.trendUp ? <ArrowUp className="w-3 h-3" strokeWidth={3} /> : <ArrowDown className="w-3 h-3" strokeWidth={3} />}
                  {kpi.trend}
                </div>
                <span className="text-xs text-slate-500 font-medium">vs last month</span>
             </div>
           </div>
         ))}
       </div>

       {/* Programs Section */}
       <div className="mb-6 flex justify-between items-center">
         <h2 className="text-xl font-bold text-slate-800 tracking-tight">Active Programs</h2>
         {programs.length > 0 && (
           <button
             onClick={() => setIsWizardOpen(true)}
             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
           >
             <Plus className="w-4 h-4" /> Create Program
           </button>
         )}
       </div>

       {programs.length === 0 ? (
         <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-dashed border-indigo-200 p-12 flex flex-col items-center justify-center text-center shadow-sm mb-6">
           <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
             <Plus className="w-8 h-8 text-indigo-500" />
           </div>
           <h3 className="text-lg font-bold text-slate-800 mb-2">No Active Programs</h3>
           <p className="text-sm text-slate-500 mb-6 max-w-sm">
             You haven't created any loyalty programs yet. Set up your first program to start rewarding your customers.
           </p>
           <button
             onClick={() => setIsWizardOpen(true)}
             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 hover:scale-105"
           >
             <Plus className="w-4 h-4" /> Create Your First Program
           </button>
         </div>
       ) : (
         <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 overflow-hidden mb-8">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-slate-100 bg-slate-50/50">
                   <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Program Details</th>
                   <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                   <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Points Ratio</th>
                   <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                   <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {programs.map((p) => (
                   <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                     <td className="py-4 px-6">
                       <div>
                         <p className="font-bold text-sm text-slate-800">{p.name}</p>
                         <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>
                       </div>
                     </td>
                     <td className="py-4 px-6">
                       <span className="font-medium text-sm text-slate-600">{p.type || 'Points-Based'}</span>
                     </td>
                     <td className="py-4 px-6">
                       {p.type === 'Points-Based' || p.type === 'Hybrid' ? (
                         <span className="font-bold text-sm text-slate-700">1 pt = ${p.pointsValuation}</span>
                       ) : (
                         <span className="text-sm text-slate-400">-</span>
                       )}
                     </td>
                     <td className="py-4 px-6">
                       <span
                         className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                           p.status === 'Active'
                             ? 'bg-emerald-100 text-emerald-700'
                             : 'bg-amber-100 text-amber-700'
                         }`}
                       >
                         {p.status}
                       </span>
                     </td>
                     <td className="py-4 px-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                           View
                         </button>
                         <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                           Edit
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       )}

       {/* Secondary Dashboard Content Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
          
          {/* Balance / Points Overview Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 col-span-1 lg:col-span-4 min-h-[320px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-slate-800">Points Flow</h3>
              <select className="text-xs border-none bg-transparent text-slate-500 font-medium focus:ring-0 cursor-pointer">
                <option>This Month</option>
              </select>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative">
               <div className="w-40 h-40 rounded-full border-[16px] border-slate-100 border-t-indigo-500 border-l-blue-400 border-r-purple-500 transform rotate-45 relative">
                 <div className="absolute inset-0 flex flex-col items-center justify-center -rotate-45">
                   <span className="text-2xl font-bold text-slate-900">1.2M</span>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Issued</span>
                 </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
               <div className="flex justify-between items-center text-sm">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div><span className="text-slate-600 font-medium">Redeemed</span></div>
                 <span className="font-bold text-slate-800">450k</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div><span className="text-slate-600 font-medium">Expired</span></div>
                 <span className="font-bold text-slate-800">12k</span>
               </div>
            </div>
          </div>
          
          {/* Main Chart Area */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 col-span-1 lg:col-span-8 min-h-[320px] flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-slate-800">Engagement Over Time</h3>
             </div>
             <div className="flex-1 w-full bg-slate-50/50 rounded-xl border border-slate-100 flex items-end justify-between px-8 py-4 relative overflow-hidden">
                {/* Fake chart gradient block */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-indigo-100/50 to-transparent"></div>
                {/* Fake chart line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q10,70 20,80 T40,60 T60,70 T80,40 T100,50" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-500" />
                  <path d="M0,80 Q10,70 20,80 T40,60 T60,70 T80,40 T100,50 L100,100 L0,100 Z" fill="currentColor" className="text-indigo-500/10" />
                </svg>
                {/* Fake x-axis labels */}
                <div className="w-full flex justify-between text-xs font-bold text-slate-400 relative z-10 pt-auto mt-auto uppercase tracking-wider">
                  <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                </div>
             </div>
          </div>
       </div>

       {/* Wizard Modal */}
       <AnimatePresence>
         {isWizardOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
               onClick={() => setIsWizardOpen(false)}
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-white/70 backdrop-blur-2xl rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 w-full max-w-2xl border border-white/60 max-h-[90vh] overflow-y-auto"
             >
               <button
                 onClick={() => setIsWizardOpen(false)}
                 className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>

               <div className="mb-8">
                 <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Program</h2>
                 <div className="flex gap-2">
                   {[1, 2, 3, 4].map((step) => (
                     <div
                       key={step}
                       className={`h-2 flex-1 rounded-full ${
                         step <= wizardStep ? 'bg-indigo-500' : 'bg-slate-200'
                       } transition-colors duration-300`}
                     />
                   ))}
                 </div>
                 <p className="text-sm font-medium text-slate-500 mt-3 uppercase tracking-wider">
                   Step {wizardStep} of 4
                 </p>
               </div>

               <div className="min-h-[280px]">
                 {wizardStep === 1 && (
                   <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                     <h3 className="text-lg font-bold text-slate-800">Basic Information</h3>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Program Name</label>
                       <input
                         type="text"
                         value={newProgram.name}
                         onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                         placeholder="e.g. Summer Rewards"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Description</label>
                       <textarea
                         value={newProgram.description}
                         onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm h-24 resize-none"
                         placeholder="Describe your loyalty program..."
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Program Type</label>
                       <select
                         value={newProgram.type}
                         onChange={(e) => setNewProgram({ ...newProgram, type: e.target.value as Program['type'] })}
                         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm"
                       >
                         <option value="Points-Based">Points-Based</option>
                         <option value="Cashback">Cashback</option>
                         <option value="Tier Based">Tier Based</option>
                         <option value="Hybrid">Hybrid</option>
                         <option value="Subscription">Subscription</option>
                       </select>
                     </div>
                   </div>
                 )}

                 {wizardStep === 2 && (
                   <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                     <h3 className="text-lg font-bold text-slate-800">Points & Expiry</h3>
                     
                     {(newProgram.type === 'Points-Based' || newProgram.type === 'Hybrid') && (
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Points Valuation</label>
                         <div className="flex items-center gap-3">
                           <span className="text-sm font-bold text-slate-600">1 Point = </span>
                           <div className="relative flex-1">
                             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                               <span className="text-slate-400 font-semibold text-sm">$</span>
                             </div>
                             <input
                               type="number"
                               step="0.01"
                               min="0"
                               value={newProgram.pointsValuation}
                               onChange={(e) => setNewProgram({ ...newProgram, pointsValuation: Number(e.target.value) })}
                               className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                             />
                           </div>
                         </div>
                       </div>
                     )}

                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Points Expiry</label>
                       <select
                         value={newProgram.expiryLogic}
                         onChange={(e) => setNewProgram({ ...newProgram, expiryLogic: e.target.value as Program['expiryLogic'] })}
                         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm"
                       >
                         <option value="No Expiry">No Expiry</option>
                         <option value="12 Months">12 Months</option>
                         <option value="Custom Date">Custom Date</option>
                       </select>
                     </div>
                     
                     {newProgram.expiryLogic === 'Custom Date' && (
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Custom Date</label>
                         <input
                           type="date"
                           value={newProgram.expiryValue}
                           onChange={(e) => setNewProgram({ ...newProgram, expiryValue: e.target.value })}
                           className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                         />
                       </div>
                     )}
                   </div>
                 )}

                 {wizardStep === 3 && (
                   <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                     <h3 className="text-lg font-bold text-slate-800">Enrollment</h3>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Enrollment URL Slug</label>
                       <div className="flex shadow-sm rounded-xl overflow-hidden border border-slate-200">
                         <span className="bg-slate-50 border-r border-slate-200 px-4 py-3 text-sm font-medium text-slate-500">
                           /enroll/
                         </span>
                         <input
                           type="text"
                           value={newProgram.urlSlug}
                           onChange={(e) => setNewProgram({ ...newProgram, urlSlug: e.target.value })}
                           className="flex-1 bg-white px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                           placeholder="coffee-shop"
                         />
                       </div>
                     </div>

                     <div className="flex flex-col gap-4">
                       <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-indigo-300 transition-colors">
                         <div>
                           <p className="text-sm font-bold text-slate-800">Allow Public Enrollment</p>
                           <p className="text-xs text-slate-500 mt-1">Users can sign up via the URL slug directly.</p>
                         </div>
                         <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                            <input 
                              type="checkbox" 
                              className="peer sr-only"
                              checked={newProgram.allowPublicEnrollment}
                              onChange={(e) => setNewProgram({ ...newProgram, allowPublicEnrollment: e.target.checked })}
                            />
                            <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300"></div>
                         </div>
                       </label>
                       
                       <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-indigo-300 transition-colors">
                         <div>
                           <p className="text-sm font-bold text-slate-800">Auto-Enroll on Transaction</p>
                           <p className="text-xs text-slate-500 mt-1">Automatically add customers when they make a purchase.</p>
                         </div>
                         <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                            <input 
                              type="checkbox" 
                              className="peer sr-only"
                              checked={newProgram.autoEnroll}
                              onChange={(e) => setNewProgram({ ...newProgram, autoEnroll: e.target.checked })}
                            />
                            <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300"></div>
                         </div>
                       </label>
                     </div>
                   </div>
                 )}

                 {wizardStep === 4 && (
                   <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
                     <div className="text-center mb-4">
                       <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                         <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                       </div>
                       <h3 className="text-2xl font-bold text-slate-800">Ready to Launch!</h3>
                       <p className="text-sm text-slate-500">Review your program configuration below.</p>
                     </div>
                     
                     <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col gap-3">
                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                         <span className="text-sm font-medium text-slate-500">Program Name</span>
                         <span className="text-sm font-bold text-slate-800">{newProgram.name || 'Untitled'}</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                         <span className="text-sm font-medium text-slate-500">Type</span>
                         <span className="text-sm font-bold text-slate-800">{newProgram.type}</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                         <span className="text-sm font-medium text-slate-500">Points Ratio</span>
                         <span className="text-sm font-bold text-slate-800">1 pt = ${newProgram.pointsValuation}</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                         <span className="text-sm font-medium text-slate-500">Expiry</span>
                         <span className="text-sm font-bold text-slate-800">{newProgram.expiryLogic} {newProgram.expiryLogic === 'Custom Date' && `(${newProgram.expiryValue})`}</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-medium text-slate-500">Public Enrollment</span>
                         <span className="text-sm font-bold text-slate-800">{newProgram.allowPublicEnrollment ? 'Yes' : 'No'}</span>
                       </div>
                     </div>
                   </div>
                 )}
               </div>

               <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                 <button
                   onClick={handlePrevStep}
                   className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                     wizardStep === 1
                       ? 'opacity-0 pointer-events-none'
                       : 'text-slate-600 hover:bg-slate-100'
                   }`}
                 >
                   <ArrowLeft className="w-4 h-4" /> Back
                 </button>
                 
                 {wizardStep < 4 ? (
                   <button
                     onClick={handleNextStep}
                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                   >
                     Next <ArrowRight className="w-4 h-4" />
                   </button>
                 ) : (
                   <button
                     onClick={handleGoLive}
                     className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 hover:scale-105"
                   >
                     Launch Program <CheckCircle2 className="w-4 h-4" />
                   </button>
                 )}
               </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
}
