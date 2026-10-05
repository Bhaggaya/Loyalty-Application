import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, CheckCircle2, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { ProgramRequest, Program } from '../types';

interface MerchantProgramsProps {
  programs: Program[];
  programRequests: ProgramRequest[];
  setProgramRequests: React.Dispatch<React.SetStateAction<ProgramRequest[]>>;
  activeTiers: { id: string; name: string; }[];
  activeAccumulationRules: { id: string; name: string; }[];
  activeRedemptionRules: { id: string; name: string; }[];
}

export function MerchantPrograms({ programs, programRequests, setProgramRequests, activeTiers, activeAccumulationRules, activeRedemptionRules }: MerchantProgramsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    programName: '',
    description: '',
    selectedTier: activeTiers[0]?.name || '',
    accRuleType: 'existing' as 'existing' | 'new',
    selectedAccRule: activeAccumulationRules[0]?.name || '',
    newAccRuleRatio: '',
    newAccRuleDesc: '',
    redRuleType: 'existing' as 'existing' | 'new',
    selectedRedRule: activeRedemptionRules[0]?.name || '',
    newRedRuleLogic: '',
    productScope: [] as string[],
    startDate: '',
    endDate: '',
    programColor: '#6366f1'
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProductScopeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(e.target.selectedOptions).map((option: any) => option.value);
    setFormData({...formData, productScope: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: ProgramRequest = {
      id: `req-${Date.now()}`,
      merchantName: 'ABC Merchant',
      ...formData,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0]
    };
    setProgramRequests([newRequest, ...programRequests]);
    setIsModalOpen(false);
    setStep(1);
    setFormData({
      programName: '',
      description: '',
      selectedTier: activeTiers[0]?.name || '',
      accRuleType: 'existing',
      selectedAccRule: activeAccumulationRules[0]?.name || '',
      newAccRuleRatio: '',
      newAccRuleDesc: '',
      redRuleType: 'existing',
      selectedRedRule: activeRedemptionRules[0]?.name || '',
      newRedRuleLogic: '',
      productScope: [],
      startDate: '',
      endDate: '',
      programColor: '#6366f1'
    });
    showToast('Program Request submitted to HDPS Admin');
  };

  return (
    <div className="p-8 h-full flex flex-col relative z-10 overflow-y-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
             <Layers className="w-8 h-8 text-indigo-600" /> My Programs
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage active programs and request new configurations.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all"
        >
          <Plus className="w-5 h-5" /> Request New Program
        </button>
      </div>

      <div className="space-y-8 pb-12">
        {/* Active Programs from Global State (mocked as merchant's own) */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Active Programs</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {programs.map(prog => (
              <div key={prog.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{prog.name}</h3>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{prog.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 ml-13">{prog.description}</p>
                </div>
              </div>
            ))}
            {programs.length === 0 && (
              <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500">
                No active programs found.
              </div>
            )}
          </div>
        </div>

        {/* Pending Requests */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pending Requests</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {programRequests.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No pending requests.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="p-4">Program Name</th>
                    <th className="p-4">Selected Tier</th>
                    <th className="p-4">Requested Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-100">
                  {programRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: req.programColor }}></div>
                        {req.programName}
                      </td>
                      <td className="p-4 text-slate-500">{req.selectedTier}</td>
                      <td className="p-4 text-slate-500">{req.requestDate}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                          req.status === 'Fulfilled' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Request Modal - Glassmorphism UI */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200/50 flex justify-between items-center bg-gradient-to-r from-slate-50/80 to-white/80">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Request New Program</h2>
                  <p className="text-sm text-slate-500 mt-1">Step {step} of 2: {step === 1 ? 'Rules & Logic' : 'Scope & Visuals'}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto bg-white/40">
                <form id="program-request-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {step === 1 ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Program Name</label>
                          <input
                            type="text"
                            required
                            value={formData.programName}
                            onChange={(e) => setFormData({...formData, programName: e.target.value})}
                            placeholder="e.g., Weekend VIP Shoppers"
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Select Tier</label>
                          <select
                            value={formData.selectedTier}
                            onChange={(e) => setFormData({...formData, selectedTier: e.target.value})}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                          >
                            <option value="">-- Select a Tier --</option>
                            {activeTiers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Program Description</label>
                        <textarea
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Briefly describe what this program should do."
                          rows={2}
                          className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                        />
                      </div>

                      {/* Accumulation Rule Setup */}
                      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/60 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center justify-between">
                          Accumulation Rule Setup
                          <div className="flex gap-2 bg-slate-200/50 p-1 rounded-lg">
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, accRuleType: 'existing'})}
                              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.accRuleType === 'existing' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Select Existing
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, accRuleType: 'new'})}
                              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.accRuleType === 'new' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Create New
                            </button>
                          </div>
                        </h3>
                        {formData.accRuleType === 'existing' ? (
                          <select
                            value={formData.selectedAccRule}
                            onChange={(e) => setFormData({...formData, selectedAccRule: e.target.value})}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                          >
                            <option value="">-- Select Existing Rule --</option>
                            {activeAccumulationRules.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                          </select>
                        ) : (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Requested Earning Ratio</label>
                              <input
                                type="text"
                                placeholder="e.g., 2 points per $1"
                                value={formData.newAccRuleRatio}
                                onChange={(e) => setFormData({...formData, newAccRuleRatio: e.target.value})}
                                className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none shadow-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rule Description</label>
                              <input
                                type="text"
                                placeholder="e.g., Double points on weekends"
                                value={formData.newAccRuleDesc}
                                onChange={(e) => setFormData({...formData, newAccRuleDesc: e.target.value})}
                                className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none shadow-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Redemption Rule Setup */}
                      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/60 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center justify-between">
                          Redemption Rule Setup
                          <div className="flex gap-2 bg-slate-200/50 p-1 rounded-lg">
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, redRuleType: 'existing'})}
                              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.redRuleType === 'existing' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Select Existing
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, redRuleType: 'new'})}
                              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.redRuleType === 'new' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Create New
                            </button>
                          </div>
                        </h3>
                        {formData.redRuleType === 'existing' ? (
                          <select
                            value={formData.selectedRedRule}
                            onChange={(e) => setFormData({...formData, selectedRedRule: e.target.value})}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                          >
                            <option value="">-- Select Existing Rule --</option>
                            {activeRedemptionRules.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                          </select>
                        ) : (
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Requested Redemption Logic</label>
                            <input
                              type="text"
                              placeholder="e.g., 100 points = $1 off, Min 500 points to redeem"
                              value={formData.newRedRuleLogic}
                              onChange={(e) => setFormData({...formData, newRedRuleLogic: e.target.value})}
                              className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none shadow-sm"
                            />
                          </div>
                        )}
                      </div>

                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Select Product or Service Scope</label>
                        <select
                          multiple
                          value={formData.productScope}
                          onChange={handleProductScopeChange}
                          className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm h-32"
                        >
                          <option value="All Products">All Products</option>
                          <option value="Specific Categories">Specific Categories</option>
                          <option value="Excluded Items">Excluded Items</option>
                        </select>
                        <p className="text-xs text-slate-400 mt-2 italic">Hold Ctrl/Cmd to select multiple options.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Start Date</label>
                          <input
                            type="date"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">End Date</label>
                          <input
                            type="date"
                            required
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Program Image</label>
                          <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer h-[120px]">
                            <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                            <span className="text-xs font-bold">Upload Image</span>
                            <span className="text-[10px]">PNG, JPG up to 5MB</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Program Color</label>
                          <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-3 h-[120px] flex-col justify-center shadow-sm">
                            <input
                              type="color"
                              required
                              value={formData.programColor}
                              onChange={(e) => setFormData({...formData, programColor: e.target.value})}
                              className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                            />
                            <span className="text-xs font-medium text-slate-600 uppercase">{formData.programColor}</span>
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </form>
              </div>

              <div className="p-6 border-t border-slate-200/50 bg-gradient-to-r from-slate-50/80 to-white/80 flex justify-end gap-3">
                {step === 2 && (
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Back
                  </button>
                )}
                {step === 1 ? (
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    form="program-request-form"
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center gap-2"
                  >
                    Submit Program Request
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
    </div>
  );
}
