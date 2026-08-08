import React, { useState } from 'react';
import { RedemptionRule, GiftCardTier } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Search, Store, ShoppingBag, CreditCard, Network, Settings, Edit2, Trash2, Tag, Percent, CheckCircle2, AlertCircle } from 'lucide-react';

interface RedemptionsProps {
  redemptionRules: RedemptionRule[];
  setRedemptionRules: React.Dispatch<React.SetStateAction<RedemptionRule[]>>;
}

export function Redemptions({ redemptionRules, setRedemptionRules }: RedemptionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<RedemptionRule>>({
    name: '',
    description: '',
    status: 'Active',
    modality: 'Branch-Based',
    tierEligibility: ['Base', 'Silver', 'Gold', 'Platinum'],
    
    applicableBranches: ['All'],
    maxCashDiscount: 0,
    maxPointsRedeemable: 0,
    productEligibilityScope: 'All',
    minimumPoints: 0,
    frequencyLimits: 'Unlimited',
    
    giftCardTiers: [{ id: Math.random().toString(36).substr(2, 9), value: 10, pointsCost: 1000 }],
    giftCardValidity: '1 year',
    brandingMessage: '',

    partnerMerchant: '',
    voucherGenerationType: 'Static Code',
    voucherUsageLimit: 1,
    voucherExpiry: '24 hrs',
    validationApiEndpoint: ''
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    if (!formData.name) {
      showToast('Please enter a rule name.');
      return;
    }

    if (formData.id) {
      setRedemptionRules(redemptionRules.map(r => r.id === formData.id ? { ...r, ...formData } as RedemptionRule : r));
      showToast('Redemption rule updated successfully!');
    } else {
      setRedemptionRules([{ ...formData, id: Math.random().toString(36).substr(2, 9) } as RedemptionRule, ...redemptionRules]);
      showToast('Redemption rule created successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRedemptionRules(redemptionRules.filter(r => r.id !== id));
    showToast('Rule deleted successfully!');
  };

  const openCreateModal = () => {
    setFormData({
      id: undefined,
      name: '',
      description: '',
      status: 'Active',
      modality: 'Branch-Based',
      tierEligibility: ['Base', 'Silver', 'Gold', 'Platinum'],
      applicableBranches: ['All'],
      maxCashDiscount: 50,
      maxPointsRedeemable: 5000,
      productEligibilityScope: 'All',
      minimumPoints: 500,
      frequencyLimits: 'Unlimited',
      giftCardTiers: [{ id: Math.random().toString(36).substr(2, 9), value: 10, pointsCost: 1000 }],
      giftCardValidity: '1 year',
      brandingMessage: '',
      partnerMerchant: 'Partner A',
      voucherGenerationType: 'Static Code',
      voucherUsageLimit: 1,
      voucherExpiry: '24 hrs',
      validationApiEndpoint: 'https://api.partner.com/validate'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (rule: RedemptionRule) => {
    setFormData(rule);
    setIsModalOpen(true);
  };

  const addGiftCardTier = () => {
    setFormData(prev => ({
      ...prev,
      giftCardTiers: [
        ...(prev.giftCardTiers || []),
        { id: Math.random().toString(36).substr(2, 9), value: 0, pointsCost: 0 }
      ]
    }));
  };

  const updateGiftCardTier = (id: string, field: keyof GiftCardTier, val: number) => {
    setFormData(prev => ({
      ...prev,
      giftCardTiers: prev.giftCardTiers?.map(tier => tier.id === id ? { ...tier, [field]: val } : tier)
    }));
  };

  const removeGiftCardTier = (id: string) => {
    setFormData(prev => ({
      ...prev,
      giftCardTiers: prev.giftCardTiers?.filter(tier => tier.id !== id)
    }));
  };

  const toggleTierEligibility = (tier: string) => {
    const current = formData.tierEligibility || [];
    if (current.includes(tier)) {
      setFormData({ ...formData, tierEligibility: current.filter(t => t !== tier) });
    } else {
      setFormData({ ...formData, tierEligibility: [...current, tier] });
    }
  };

  const modalities = [
    { id: 'Branch-Based', icon: Store, label: 'Branch-Based', desc: 'Redeem at specific physical locations.' },
    { id: 'Product Cap/Threshold', icon: ShoppingBag, label: 'Product Cap/Threshold', desc: 'Limit redemptions to specific product categories.' },
    { id: 'Digital Gift Card', icon: CreditCard, label: 'Digital Gift Card', desc: 'Issue digital gift cards for points.' },
    { id: 'Cross-Merchant', icon: Network, label: 'Cross-Merchant', desc: 'Partner network redemption vouchers.' },
  ];

  return (
    <div className="p-8 h-full flex flex-col relative z-10">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Redemptions</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage how customers redeem their points for rewards.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Rules</h3>
            <p className="text-2xl font-black text-slate-800">{redemptionRules.filter(r => r.status === 'Active').length}</p>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Gift Cards Issued</h3>
            <p className="text-2xl font-black text-slate-800">12,450</p>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Cross-Merchant Vol</h3>
            <p className="text-2xl font-black text-slate-800">$84.2K</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
          <h2 className="text-lg font-bold text-slate-800">Redemption Rules Grid</h2>
          <button 
            onClick={openCreateModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Redemption Rule
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 sticky top-0 backdrop-blur-md z-10">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Rule Name</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Redemption Type</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {redemptionRules.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No redemption rules found. Create one to get started.
                  </td>
                </tr>
              ) : (
                redemptionRules.map(rule => (
                  <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{rule.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{rule.description}</p>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        {rule.modality}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                        rule.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {rule.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(rule)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(rule.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white/90 backdrop-blur-xl w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-white flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 sticky top-0 z-20">
                <h2 className="text-xl font-bold text-slate-800">{formData.id ? 'Edit Redemption Rule' : 'Create Redemption Rule'}</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 space-y-10 scrollbar-hide">
                
                {/* Section 1: Modality Selection */}
                <section>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">1. Redemption Modality</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {modalities.map(mod => {
                      const Icon = mod.icon;
                      const isActive = formData.modality === mod.id;
                      return (
                        <button
                          key={mod.id}
                          onClick={() => setFormData({ ...formData, modality: mod.id as RedemptionRule['modality'] })}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isActive 
                              ? 'bg-indigo-50 border-indigo-200 shadow-sm shadow-indigo-100' 
                              : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className={`font-bold text-sm mb-1 ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>{mod.label}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
                        </button>
                      )
                    })}
                  </div>
                </section>

                {/* Section 2: General Config */}
                <section>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">2. General Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Rule Name</label>
                      <input 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="e.g. 50% Off Downtown Purchases"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Status</label>
                      <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Description</label>
                      <textarea 
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none h-24"
                        placeholder="Brief explanation of this rule..."
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tier Eligibility</label>
                      <div className="flex flex-wrap gap-2">
                        {['Base', 'Silver', 'Gold', 'Platinum'].map(tier => {
                          const isSelected = formData.tierEligibility?.includes(tier);
                          return (
                            <button
                              key={tier}
                              onClick={() => toggleTierEligibility(tier)}
                              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                                isSelected 
                                  ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              {tier}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: Dynamic Config */}
                <section>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                    3. {formData.modality} Configuration
                  </h3>
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
                    
                    {(formData.modality === 'Branch-Based' || formData.modality === 'Product Cap/Threshold') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Applicable Branches</label>
                          <select
                            multiple
                            value={formData.applicableBranches}
                            onChange={(e) => {
                              const options = Array.from(e.target.options);
                              setFormData({ ...formData, applicableBranches: options.filter(o => o.selected).map(o => o.value) });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none h-24"
                          >
                            <option value="All">All Locations</option>
                            <option value="Downtown">Downtown Branch</option>
                            <option value="Uptown">Uptown Branch</option>
                            <option value="Airport">Airport Terminal</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Product Eligibility Scope</label>
                          <select
                            value={formData.productEligibilityScope}
                            onChange={e => setFormData({ ...formData, productEligibilityScope: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          >
                            <option value="All">All Products</option>
                            <option value="Exclude Gift Cards">Exclude Gift Cards</option>
                            <option value="Specific Categories">Specific Categories Only</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Max Cash Discount / Tx</label>
                          <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                            <input 
                              type="number"
                              value={formData.maxCashDiscount}
                              onChange={e => setFormData({ ...formData, maxCashDiscount: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Max Points / Tx</label>
                          <input 
                            type="number"
                            value={formData.maxPointsRedeemable}
                            onChange={e => setFormData({ ...formData, maxPointsRedeemable: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Minimum Points to Use</label>
                          <input 
                            type="number"
                            value={formData.minimumPoints}
                            onChange={e => setFormData({ ...formData, minimumPoints: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Frequency Limits</label>
                          <select
                            value={formData.frequencyLimits}
                            onChange={e => setFormData({ ...formData, frequencyLimits: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          >
                            <option value="Unlimited">Unlimited</option>
                            <option value="Once/day">Once per day</option>
                            <option value="Once/week">Once per week</option>
                            <option value="Lifetime">Once in lifetime</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {formData.modality === 'Digital Gift Card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-slate-500 mb-4 uppercase tracking-wide flex justify-between items-center">
                            <span>Gift Card Denominations & Cost</span>
                            <button 
                              onClick={addGiftCardTier}
                              className="text-indigo-600 flex items-center gap-1 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-lg"
                            >
                              <Plus className="w-3 h-3" /> Add Tier
                            </button>
                          </label>
                          <div className="space-y-3">
                            {formData.giftCardTiers?.map((tier, idx) => (
                              <div key={tier.id} className="flex gap-4 items-center">
                                <div className="flex-1 relative">
                                  <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                                  <input 
                                    type="number"
                                    value={tier.value}
                                    onChange={e => updateGiftCardTier(tier.id, 'value', Number(e.target.value))}
                                    placeholder="Value"
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                                  />
                                </div>
                                <div className="flex-1 relative">
                                  <span className="absolute left-4 top-3 text-slate-400 font-bold">Pts</span>
                                  <input 
                                    type="number"
                                    value={tier.pointsCost}
                                    onChange={e => updateGiftCardTier(tier.id, 'pointsCost', Number(e.target.value))}
                                    placeholder="Points Cost"
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                                  />
                                </div>
                                <button 
                                  onClick={() => removeGiftCardTier(tier.id)}
                                  className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Gift Card Validity</label>
                          <select
                            value={formData.giftCardValidity}
                            onChange={e => setFormData({ ...formData, giftCardValidity: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          >
                            <option value="30 days">30 days</option>
                            <option value="6 months">6 months</option>
                            <option value="1 year">1 year</option>
                            <option value="Never">Never Expiry</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Branding & Message</label>
                          <textarea 
                            value={formData.brandingMessage}
                            onChange={e => setFormData({ ...formData, brandingMessage: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none h-24 resize-none"
                            placeholder="Message included with the gift card..."
                          />
                        </div>
                      </div>
                    )}

                    {formData.modality === 'Cross-Merchant' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Partner Merchant Selection</label>
                          <select
                            value={formData.partnerMerchant}
                            onChange={e => setFormData({ ...formData, partnerMerchant: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          >
                            <option value="Partner A">Partner A (Airlines)</option>
                            <option value="Partner B">Partner B (Hotels)</option>
                            <option value="Partner C">Partner C (Retail)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Voucher Generation Type</label>
                          <select
                            value={formData.voucherGenerationType}
                            onChange={e => setFormData({ ...formData, voucherGenerationType: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          >
                            <option value="Static Code">Static Universal Code</option>
                            <option value="Unique Code">Dynamic Unique Code</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Voucher Usage Limit</label>
                          <input 
                            type="number"
                            value={formData.voucherUsageLimit}
                            onChange={e => setFormData({ ...formData, voucherUsageLimit: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Voucher Expiry</label>
                          <select
                            value={formData.voucherExpiry}
                            onChange={e => setFormData({ ...formData, voucherExpiry: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none"
                          >
                            <option value="1 hr">1 hr</option>
                            <option value="24 hrs">24 hrs</option>
                            <option value="7 days">7 days</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Partner Validation API Endpoint URL</label>
                          <input 
                            type="text"
                            value={formData.validationApiEndpoint}
                            onChange={e => setFormData({ ...formData, validationApiEndpoint: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none font-mono text-xs"
                            placeholder="https://api.partner.com/v1/validate"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white/50 flex justify-end gap-3 sticky bottom-0 z-20">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save Redemption Rule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
}
