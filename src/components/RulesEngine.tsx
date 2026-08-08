import React, { useState } from 'react';
import { Rule, RulesState } from '../types';
import { Settings2, Plus, Edit2, Trash2, X, Activity, Coins, Tag, CheckCircle2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RulesEngineProps {
  rules: RulesState;
  setRules: React.Dispatch<React.SetStateAction<RulesState>>;
}

export function RulesEngine({ rules, setRules }: RulesEngineProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  
  const [formData, setFormData] = useState<Partial<Rule>>({
    name: '',
    description: '',
    ruleClass: 'Accumulation',
    status: 'Active',
    earningMethod: 'Points per $1',
    earningValue: 1,
    bonusType: 'Recurring',
    minSpend: 0,
    applicableScope: ['All Products'],
    tierEligibility: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    timeTrigger: '',
    maxPointsCap: 0,
    stackable: true,
    redemptionType: 'Fixed Discount',
    pointsCostPerUnit: 100,
    monetaryValuePerUnit: 1,
    minPointsToRedeem: 0,
    maxDiscountCap: 0,
    redemptionFrequencyLimit: 0,
    voucherExpiry: false,
    allowCouponCombine: false,
  });

  const activeRules = rules.filter(r => r.status === 'Active').length;
  const accumulationRules = rules.filter(r => r.ruleClass === 'Accumulation').length;
  const redemptionRules = rules.filter(r => r.ruleClass === 'Redemption').length;

  const handleCreate = (ruleClass: 'Accumulation' | 'Redemption') => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      ruleClass,
      status: 'Active',
      earningMethod: 'Points per $1',
      earningValue: 1,
      bonusType: 'Recurring',
      minSpend: 0,
      applicableScope: ['All Products'],
      tierEligibility: ['Bronze', 'Silver', 'Gold', 'Platinum'],
      timeTrigger: '',
      maxPointsCap: 0,
      stackable: true,
      redemptionType: 'Fixed Discount',
      pointsCostPerUnit: 100,
      monetaryValuePerUnit: 1,
      minPointsToRedeem: 0,
      maxDiscountCap: 0,
      redemptionFrequencyLimit: 0,
      voucherExpiry: false,
      allowCouponCombine: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (rule: Rule) => {
    setEditingId(rule.id);
    setFormData({ ...rule });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
    showToast('Rule deleted successfully!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newRule: Rule = {
      ...(formData as Rule),
      id: editingId || Math.random().toString(36).substr(2, 9),
    };

    if (editingId) {
      setRules(rules.map(r => r.id === editingId ? newRule : r));
      showToast('Rule updated successfully!');
    } else {
      setRules([newRule, ...rules]);
      showToast('Rule created successfully!');
    }

    setIsModalOpen(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const toggleArrayItem = (field: 'applicableScope' | 'tierEligibility', item: string) => {
    const current = formData[field] || [];
    if (current.includes(item)) {
      setFormData({ ...formData, [field]: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...current, item] });
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 relative z-10 h-full overflow-hidden flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rules Engine</h1>
          <p className="text-sm text-slate-500">Manage how customers accumulate and redeem points.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 shrink-0">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
            <Settings2 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Active Rules</p>
            <h3 className="text-2xl font-black text-slate-800">{activeRules}</h3>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Accumulation</p>
            <h3 className="text-2xl font-black text-slate-800">{accumulationRules}</h3>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
            <Tag className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Redemption</p>
            <h3 className="text-2xl font-black text-slate-800">{redemptionRules}</h3>
          </div>
        </div>
      </div>

      {/* Grid Management */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-800">Rule Management Grid</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCreate('Accumulation')}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Accumulation Rule
            </button>
            <button
              onClick={() => handleCreate('Redemption')}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Redemption Rule
            </button>
          </div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Rule Name</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Class</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Method / Type</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-bold text-sm text-slate-800">{rule.name}</p>
                    <p className="text-xs text-slate-500 max-w-[200px] truncate">{rule.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      rule.ruleClass === 'Accumulation' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {rule.ruleClass}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-slate-600">
                      {rule.ruleClass === 'Accumulation' ? rule.earningMethod : rule.redemptionType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      rule.status === 'Active' ? 'bg-indigo-100 text-indigo-700' :
                      rule.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {rule.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(rule)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(rule.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-sm font-medium">
                    No rules configured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Rule Modal */}
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
              className="bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 w-full max-w-4xl border border-white/60 flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {editingId ? 'Edit Rule' : `Create ${formData.ruleClass} Rule`}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Configure parameters for this loyalty rule.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1">
                <form id="rule-form" onSubmit={handleSave} className="flex flex-col gap-8">
                  {/* Section 1: Basic Info */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">1. Basic Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Rule Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Scheduled">Scheduled</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Description</label>
                        <input
                          type="text"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {formData.ruleClass === 'Accumulation' ? (
                    <>
                      {/* Section 2: Mechanics (Accumulation) */}
                      <div className="flex flex-col gap-5">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">2. Mechanics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Earning Method</label>
                            <select
                              value={formData.earningMethod}
                              onChange={(e) => setFormData({ ...formData, earningMethod: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                            >
                              <option value="Points per $1">Points per $1</option>
                              <option value="Fixed Points">Fixed Points</option>
                              <option value="Percentage">Percentage</option>
                              <option value="Multiplier">Multiplier</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Earning Value</label>
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              value={formData.earningValue}
                              onChange={(e) => setFormData({ ...formData, earningValue: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Bonus Type</label>
                            <select
                              value={formData.bonusType}
                              onChange={(e) => setFormData({ ...formData, bonusType: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                            >
                              <option value="One-time">One-time</option>
                              <option value="Recurring">Recurring</option>
                              <option value="Campaign">Campaign</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Conditions (Accumulation) */}
                      <div className="flex flex-col gap-5">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">3. Conditions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Min. Spend Threshold ($)</label>
                            <input
                              type="number"
                              min="0"
                              value={formData.minSpend}
                              onChange={(e) => setFormData({ ...formData, minSpend: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Applicable Scope</label>
                            <div className="flex gap-2 flex-wrap">
                              {['All Products', 'Specific Categories', 'SKUs'].map((scope) => (
                                <button
                                  key={scope}
                                  type="button"
                                  onClick={() => toggleArrayItem('applicableScope', scope)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                    formData.applicableScope?.includes(scope)
                                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                  }`}
                                >
                                  {scope}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Member Tier Eligibility</label>
                            <div className="flex gap-2 flex-wrap">
                              {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier) => (
                                <button
                                  key={tier}
                                  type="button"
                                  onClick={() => toggleArrayItem('tierEligibility', tier)}
                                  className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                                    formData.tierEligibility?.includes(tier)
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                  }`}
                                >
                                  {tier}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Limits & Triggers (Accumulation) */}
                      <div className="flex flex-col gap-5">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">4. Limits & Triggers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Time-Based Trigger</label>
                            <input
                              type="datetime-local"
                              value={formData.timeTrigger}
                              onChange={(e) => setFormData({ ...formData, timeTrigger: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Max Points Cap</label>
                            <input
                              type="number"
                              min="0"
                              value={formData.maxPointsCap}
                              onChange={(e) => setFormData({ ...formData, maxPointsCap: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-[46px] self-end">
                            <span className="text-sm font-bold text-slate-700">Stackable?</span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, stackable: !formData.stackable })}
                              className={`w-10 h-5 rounded-full transition-colors relative ${formData.stackable ? 'bg-indigo-500' : 'bg-slate-300'}`}
                            >
                              <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${formData.stackable ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Section 2: Mechanics (Redemption) */}
                      <div className="flex flex-col gap-5">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">2. Mechanics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Redemption Type</label>
                            <select
                              value={formData.redemptionType}
                              onChange={(e) => setFormData({ ...formData, redemptionType: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                            >
                              <option value="Fixed Discount">Fixed Discount</option>
                              <option value="Percentage Discount">Percentage Discount</option>
                              <option value="Free Product">Free Product</option>
                              <option value="Voucher">Voucher</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Points Cost per Unit</label>
                            <input
                              type="number"
                              min="0"
                              value={formData.pointsCostPerUnit}
                              onChange={(e) => setFormData({ ...formData, pointsCostPerUnit: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Monetary Value (Admin ROI)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.monetaryValuePerUnit}
                              onChange={(e) => setFormData({ ...formData, monetaryValuePerUnit: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Conditions (Redemption) */}
                      <div className="flex flex-col gap-5">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">3. Conditions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Min. Points to Redeem</label>
                            <input
                              type="number"
                              min="0"
                              value={formData.minPointsToRedeem}
                              onChange={(e) => setFormData({ ...formData, minPointsToRedeem: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Applicable Scope</label>
                            <div className="flex gap-2 flex-wrap">
                              {['All Products', 'Specific Categories', 'SKUs'].map((scope) => (
                                <button
                                  key={scope}
                                  type="button"
                                  onClick={() => toggleArrayItem('applicableScope', scope)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                    formData.applicableScope?.includes(scope)
                                      ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                  }`}
                                >
                                  {scope}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Member Tier Eligibility</label>
                            <div className="flex gap-2 flex-wrap">
                              {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier) => (
                                <button
                                  key={tier}
                                  type="button"
                                  onClick={() => toggleArrayItem('tierEligibility', tier)}
                                  className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                                    formData.tierEligibility?.includes(tier)
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                  }`}
                                >
                                  {tier}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Limits & Expiry (Redemption) */}
                      <div className="flex flex-col gap-5">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">4. Limits & Expiry</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Max Discount Cap ($)</label>
                            <input
                              type="number"
                              min="0"
                              value={formData.maxDiscountCap}
                              onChange={(e) => setFormData({ ...formData, maxDiscountCap: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Freq. Limit / Mo</label>
                            <input
                              type="number"
                              min="0"
                              value={formData.redemptionFrequencyLimit}
                              onChange={(e) => setFormData({ ...formData, redemptionFrequencyLimit: Number(e.target.value) })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-[46px] self-end">
                            <span className="text-sm font-bold text-slate-700">Expiry?</span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, voucherExpiry: !formData.voucherExpiry })}
                              className={`w-10 h-5 rounded-full transition-colors relative ${formData.voucherExpiry ? 'bg-indigo-500' : 'bg-slate-300'}`}
                            >
                              <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${formData.voucherExpiry ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-[46px] self-end">
                            <span className="text-sm font-bold text-slate-700">Combine?</span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, allowCouponCombine: !formData.allowCouponCombine })}
                              className={`w-10 h-5 rounded-full transition-colors relative ${formData.allowCouponCombine ? 'bg-indigo-500' : 'bg-slate-300'}`}
                            >
                              <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${formData.allowCouponCombine ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>

              <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="rule-form"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Rule
                </button>
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
