import React, { useState } from 'react';
import { Program, RulesState, ProgramTier, CardLinkedOverride, Rule } from '../types';
import { Layers, Activity, CreditCard, Plus, Edit2, X, ChevronRight, ChevronLeft, ShieldCheck, CheckCircle2, Award, Zap, Settings, Trash2, Rocket, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgramsProps {
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
  rules: RulesState;
}

export function Programs({ programs, setPrograms, rules }: ProgramsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState<Partial<Program>>({
    name: '',
    description: '',
    type: 'Tier-Based',
    status: 'Active',
    globalAccumulationRule: '',
    globalRedemptionRule: '',
    programTiers: [],
    cardNetworks: [],
    bankIssuers: [],
    cardOverrides: [],
    triggerEvent: 'Birthday',
    actionType: 'Apply Accumulation Rule',
    actionRuleId: '',
    flatBonusValue: 0,
    urlSlug: '',
    allowPublicEnrollment: true,
    autoEnroll: false,
    accentColor: '#4f46e5',
  });

  const activePrograms = programs.filter(p => p.status === 'Active').length;
  const linkedCardPrograms = programs.filter(p => p.type === 'Card-Linked').length;

  const accumulationRules = rules.filter(r => r.ruleClass === 'Accumulation' && r.status === 'Active');
  const redemptionRules = rules.filter(r => r.ruleClass === 'Redemption' && r.status === 'Active');

  const handleCreateNew = () => {
    setFormData({
      id: undefined,
      name: '',
      description: '',
      type: 'Tier-Based',
      status: 'Active',
      globalAccumulationRule: accumulationRules[0]?.id || '',
      globalRedemptionRule: redemptionRules[0]?.id || '',
      programTiers: [],
      cardNetworks: [],
      bankIssuers: [],
      cardOverrides: [],
      triggerEvent: 'Birthday',
      actionType: 'Apply Accumulation Rule',
      actionRuleId: accumulationRules[0]?.id || '',
      flatBonusValue: 0,
      urlSlug: '',
      allowPublicEnrollment: true,
      autoEnroll: false,
      accentColor: '#4f46e5',
    });
    setWizardStep(1);
    setIsModalOpen(true);
  };

  const handleEdit = (program: Program) => {
    setFormData(program);
    setWizardStep(1);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
    showToast('Program deleted successfully!');
  };

  const handleLaunch = () => {
    if (formData.id) {
      setPrograms(programs.map(p => p.id === formData.id ? { ...(formData as Program) } : p));
      showToast('Program updated successfully!');
    } else {
      const newProgram: Program = {
        ...(formData as Program),
        id: Math.random().toString(36).substr(2, 9),
      };
      setPrograms([newProgram, ...programs]);
      showToast('Program launched successfully!');
    }
    setIsModalOpen(false);
    setTimeout(() => setWizardStep(1), 300);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const addTier = () => {
    const newTier: ProgramTier = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Tier',
      spendThreshold: 0,
      visitFrequency: 0,
      overrideBaseRule: false,
      accumulationRuleId: accumulationRules[0]?.id || ''
    };
    setFormData({ ...formData, programTiers: [...(formData.programTiers || []), newTier] });
  };

  const updateTier = (id: string, updates: Partial<ProgramTier>) => {
    setFormData({
      ...formData,
      programTiers: formData.programTiers?.map(t => t.id === id ? { ...t, ...updates } : t)
    });
  };

  const removeTier = (id: string) => {
    setFormData({
      ...formData,
      programTiers: formData.programTiers?.filter(t => t.id !== id)
    });
  };

  const toggleArrayItem = (field: 'cardNetworks' | 'bankIssuers', item: string) => {
    const current = formData[field] || [];
    if (current.includes(item)) {
      setFormData({ ...formData, [field]: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...current, item] });
    }
  };

  const addCardOverride = () => {
    const newOverride: CardLinkedOverride = {
      id: Math.random().toString(36).substr(2, 9),
      network: 'Visa',
      accumulationRuleId: accumulationRules[0]?.id || ''
    };
    setFormData({ ...formData, cardOverrides: [...(formData.cardOverrides || []), newOverride] });
  };

  const updateCardOverride = (id: string, updates: Partial<CardLinkedOverride>) => {
    setFormData({
      ...formData,
      cardOverrides: formData.cardOverrides?.map(o => o.id === id ? { ...o, ...updates } : o)
    });
  };

  const removeCardOverride = (id: string) => {
    setFormData({
      ...formData,
      cardOverrides: formData.cardOverrides?.filter(o => o.id !== id)
    });
  };

  const renderStepIndicator = () => {
    const steps = ['Foundation', 'Rules', 'Enrollment', 'Launch'];
    return (
      <div className="flex items-center justify-between relative mb-8">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
        {steps.map((step, index) => {
          const stepNum = index + 1 as 1|2|3|4;
          const isActive = wizardStep === stepNum;
          const isPast = wizardStep > stepNum;
          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                isActive ? 'bg-indigo-600 border-indigo-600 text-white' : 
                isPast ? 'bg-emerald-500 border-emerald-500 text-white' : 
                'bg-white border-slate-300 text-slate-400'
              }`}>
                {isPast ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-indigo-600' : isPast ? 'text-emerald-600' : 'text-slate-400'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 lg:p-8 relative z-10 h-full overflow-hidden flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Programs</h1>
          <p className="text-sm text-slate-500">Design and deploy multi-tiered or card-linked loyalty ecosystems.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 shrink-0">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Active Programs</p>
            <h3 className="text-2xl font-black text-slate-800">{activePrograms}</h3>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Card-Linked Programs</p>
            <h3 className="text-2xl font-black text-slate-800">{linkedCardPrograms}</h3>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-800">Deployed Programs</h2>
          <button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Program
          </button>
        </div>
        <div className="overflow-x-auto flex-1 p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {programs.map((program) => (
              <div key={program.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{program.name}</h3>
                    <p className="text-sm text-slate-500">{program.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                    program.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {program.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {program.type}
                    </span>
                    {program.urlSlug && (
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">
                        /{program.urlSlug}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(program)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(program.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {programs.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 text-sm font-medium">
                No programs created yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Creation Wizard Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 w-full max-w-5xl border border-white/60 flex flex-col max-h-[95vh] overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Program Builder</h2>
                  <p className="text-sm text-slate-500 mt-1">Configure your new loyalty ecosystem.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 flex flex-col">
                {renderStepIndicator()}
                
                <div className="flex-1">
                  {wizardStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Program Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            placeholder="e.g., Rewards Plus"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Description</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            placeholder="Describe the main goal of this program..."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-4 uppercase tracking-wide">Program Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { type: 'Tier-Based', icon: <Layers className="w-8 h-8 mb-4 text-indigo-500" />, desc: 'Standard multi-tier ecosystem' },
                            { type: 'Card-Linked', icon: <CreditCard className="w-8 h-8 mb-4 text-emerald-500" />, desc: 'Partner with banks & networks' },
                            { type: 'Custom Engine', icon: <Settings className="w-8 h-8 mb-4 text-purple-500" />, desc: 'Rule-based flexible triggers' }
                          ].map(opt => (
                            <div 
                              key={opt.type}
                              onClick={() => setFormData({ ...formData, type: opt.type as any })}
                              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                                formData.type === opt.type 
                                  ? 'border-indigo-500 bg-indigo-50/50 shadow-md' 
                                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {opt.icon}
                              <h4 className="font-bold text-slate-800 mb-2">{opt.type}</h4>
                              <p className="text-xs text-slate-500 font-medium">{opt.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Global Accumulation Rule</label>
                          <select
                            value={formData.globalAccumulationRule}
                            onChange={(e) => setFormData({ ...formData, globalAccumulationRule: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                          >
                            {accumulationRules.map(r => (
                              <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                            {accumulationRules.length === 0 && <option value="">No Active Accumulation Rules</option>}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Global Redemption Rule</label>
                          <select
                            value={formData.globalRedemptionRule}
                            onChange={(e) => setFormData({ ...formData, globalRedemptionRule: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                          >
                            {redemptionRules.map(r => (
                              <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                            {redemptionRules.length === 0 && <option value="">No Active Redemption Rules</option>}
                          </select>
                        </div>
                      </div>

                      {formData.type === 'Tier-Based' && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Tier Configuration Matrix</h3>
                            <button onClick={addTier} className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:text-indigo-700">
                              <Plus className="w-4 h-4" /> Add Tier
                            </button>
                          </div>
                          <div className="flex flex-col gap-4">
                            {formData.programTiers?.map((tier, idx) => (
                              <div key={tier.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
                                <div className="flex justify-between items-start gap-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                                    <div>
                                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Tier Name</label>
                                      <input type="text" value={tier.name} onChange={(e) => updateTier(tier.id, { name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium" />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Spend Threshold ($)</label>
                                      <input type="number" value={tier.spendThreshold} onChange={(e) => updateTier(tier.id, { spendThreshold: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium" />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Visit Freq.</label>
                                      <input type="number" value={tier.visitFrequency} onChange={(e) => updateTier(tier.id, { visitFrequency: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium" />
                                    </div>
                                  </div>
                                  <button onClick={() => removeTier(tier.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-5">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={tier.overrideBaseRule} onChange={(e) => updateTier(tier.id, { overrideBaseRule: e.target.checked })} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                    <span className="text-sm font-bold text-slate-700">Override Base Accumulation Rule</span>
                                  </label>
                                  {tier.overrideBaseRule && (
                                    <select
                                      value={tier.accumulationRuleId}
                                      onChange={(e) => updateTier(tier.id, { accumulationRuleId: e.target.value })}
                                      className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium"
                                    >
                                      {accumulationRules.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                  )}
                                </div>
                              </div>
                            ))}
                            {(!formData.programTiers || formData.programTiers.length === 0) && (
                              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm font-medium">No tiers configured. Add a tier to start.</div>
                            )}
                          </div>
                        </div>
                      )}

                      {formData.type === 'Card-Linked' && (
                        <div className="flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Card Networks</label>
                              <div className="flex flex-wrap gap-2">
                                {['Visa', 'Mastercard', 'Amex', 'Discover'].map(net => (
                                  <button key={net} onClick={() => toggleArrayItem('cardNetworks', net)} className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors ${formData.cardNetworks?.includes(net) ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                                    {net}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Bank Issuers</label>
                              <div className="flex flex-wrap gap-2">
                                {['BOC', 'NTB', 'ComBank', 'HNB'].map(bank => (
                                  <button key={bank} onClick={() => toggleArrayItem('bankIssuers', bank)} className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors ${formData.bankIssuers?.includes(bank) ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                                    {bank}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Network Overrides</h3>
                              <button onClick={addCardOverride} className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:text-indigo-700">
                                <Plus className="w-4 h-4" /> Add Override
                              </button>
                            </div>
                            <div className="flex flex-col gap-3">
                              {formData.cardOverrides?.map((ov) => (
                                <div key={ov.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                                  <span className="text-sm font-medium text-slate-500 whitespace-nowrap">When</span>
                                  <select value={ov.network} onChange={(e) => updateCardOverride(ov.id, { network: e.target.value })} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium min-w-[120px]">
                                    {['Visa', 'Mastercard', 'Amex', 'Discover'].map(n => <option key={n} value={n}>{n}</option>)}
                                  </select>
                                  <span className="text-sm font-medium text-slate-500 whitespace-nowrap">is used, apply</span>
                                  <select value={ov.accumulationRuleId} onChange={(e) => updateCardOverride(ov.id, { accumulationRuleId: e.target.value })} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium">
                                    {accumulationRules.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                  </select>
                                  <button onClick={() => removeCardOverride(ov.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              {(!formData.cardOverrides || formData.cardOverrides.length === 0) && (
                                <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium">No overrides added.</div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.type === 'Custom Engine' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Trigger Event</label>
                            <select
                              value={formData.triggerEvent}
                              onChange={(e) => setFormData({ ...formData, triggerEvent: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="Birthday">Birthday</option>
                              <option value="New User Registration">New User Registration</option>
                              <option value="First Purchase">First Purchase</option>
                              <option value="Referral Success">Referral Success</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Action Type</label>
                            <select
                              value={formData.actionType}
                              onChange={(e) => setFormData({ ...formData, actionType: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="Apply Accumulation Rule">Apply Accumulation Rule</option>
                              <option value="Apply Redemption Rule">Apply Redemption Rule</option>
                              <option value="Flat Bonus Points">Flat Bonus Points</option>
                            </select>
                          </div>
                          
                          <div className="md:col-span-2">
                            {formData.actionType === 'Apply Accumulation Rule' && (
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Select Rule</label>
                                <select
                                  value={formData.actionRuleId}
                                  onChange={(e) => setFormData({ ...formData, actionRuleId: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                                >
                                  {accumulationRules.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                              </div>
                            )}
                            {formData.actionType === 'Apply Redemption Rule' && (
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Select Rule</label>
                                <select
                                  value={formData.actionRuleId}
                                  onChange={(e) => setFormData({ ...formData, actionRuleId: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                                >
                                  {redemptionRules.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                              </div>
                            )}
                            {formData.actionType === 'Flat Bonus Points' && (
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Bonus Value</label>
                                <input
                                  type="number"
                                  value={formData.flatBonusValue}
                                  onChange={(e) => setFormData({ ...formData, flatBonusValue: Number(e.target.value) })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {wizardStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Enrollment URL Slug</label>
                          <div className="flex">
                            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-sm font-medium">domain.com/enroll/</span>
                            <input
                              type="text"
                              value={formData.urlSlug}
                              onChange={(e) => setFormData({ ...formData, urlSlug: e.target.value })}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-r-xl px-4 py-3 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                              placeholder="vip-rewards"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                          <div>
                            <p className="text-sm font-bold text-slate-800">Public Enrollment</p>
                            <p className="text-xs text-slate-500 mt-0.5">Allow users to sign up via link</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, allowPublicEnrollment: !formData.allowPublicEnrollment })}
                            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${formData.allowPublicEnrollment ? 'bg-indigo-500' : 'bg-slate-300'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${formData.allowPublicEnrollment ? 'translate-x-6' : 'translate-x-0'}`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                          <div>
                            <p className="text-sm font-bold text-slate-800">Auto-Enroll</p>
                            <p className="text-xs text-slate-500 mt-0.5">Enroll upon first transaction</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, autoEnroll: !formData.autoEnroll })}
                            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${formData.autoEnroll ? 'bg-indigo-500' : 'bg-slate-300'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${formData.autoEnroll ? 'translate-x-6' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Branding</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Program Logo</label>
                            <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer">
                              <UploadCloud className="w-8 h-8 mb-2 text-indigo-400" />
                              <span className="text-sm font-bold">Click to upload</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Accent Color</label>
                            <div className="flex items-center gap-3">
                              <input
                                type="color"
                                value={formData.accentColor}
                                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                className="w-12 h-12 rounded-xl cursor-pointer border-0 bg-transparent p-0 overflow-hidden"
                              />
                              <input
                                type="text"
                                value={formData.accentColor}
                                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 uppercase"
                              />
                            </div>
                            <div className="flex gap-2 mt-3">
                              {['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(c => (
                                <button key={c} onClick={() => setFormData({ ...formData, accentColor: c })} className="w-8 h-8 rounded-lg shadow-sm border border-black/10" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
                        <Rocket className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
                        <h3 className="text-xl font-black text-slate-800 mb-1">Ready to Launch!</h3>
                        <p className="text-sm text-slate-600">Review your program configuration before deploying.</p>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Program Name</p>
                          <p className="text-sm font-bold text-slate-800">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Type</p>
                          <p className="text-sm font-bold text-slate-800">{formData.type}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Description</p>
                          <p className="text-sm font-medium text-slate-600">{formData.description}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Global Accumulation Rule</p>
                          <p className="text-sm font-medium text-slate-600">
                            {accumulationRules.find(r => r.id === formData.globalAccumulationRule)?.name || 'None'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Global Redemption Rule</p>
                          <p className="text-sm font-medium text-slate-600">
                            {redemptionRules.find(r => r.id === formData.globalRedemptionRule)?.name || 'None'}
                          </p>
                        </div>
                        
                        <div className="md:col-span-2 pt-4 border-t border-slate-100 grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Enrollment URL</p>
                            <p className="text-sm font-medium text-indigo-600 truncate">domain.com/enroll/{formData.urlSlug}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Settings</p>
                            <p className="text-sm font-medium text-slate-600 flex gap-3">
                              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500"/> Public: {formData.allowPublicEnrollment ? 'Yes' : 'No'}</span>
                              <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-amber-500"/> Auto: {formData.autoEnroll ? 'Yes' : 'No'}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <div className="flex gap-3">
                  {wizardStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setWizardStep(wizardStep - 1 as 1|2|3|4)}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  {wizardStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setWizardStep(wizardStep + 1 as 1|2|3|4)}
                      disabled={wizardStep === 1 && !formData.name}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLaunch}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/30 transition-all flex items-center gap-2"
                    >
                      {formData.id ? <CheckCircle2 className="w-4 h-4" /> : <Rocket className="w-4 h-4" />} 
                      {formData.id ? 'Save Changes' : 'Launch Program'}
                    </button>
                  )}
                </div>
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
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-slate-800"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
