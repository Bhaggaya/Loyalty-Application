import React, { useState } from 'react';
import { Campaign, RulesState, Rule } from '../types';
import { Megaphone, Plus, Edit2, Trash2, X, Zap, Users, CheckCircle2, Save, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CampaignsProps {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  rules: RulesState;
}

export function Campaigns({ campaigns, setCampaigns, rules }: CampaignsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Use a string for tags to easily edit in standard input, but split on save
  const [targetSKUsText, setTargetSKUsText] = useState('');

  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Active',
    stackable: true,
    linkedRules: [],
    type: 'Seasonal',
    
    // Seasonal defaults
    seasonTag: 'Summer',
    seasonalMultiplier: 2,
    seasonalScope: 'All Products',
    
    // Product defaults
    productDiscount: 10,
    productFlatBonus: 0,
    
    // Customer defaults
    targetSegment: 'New Customers',
    segmentAwardType: 'Flat Bonus',
    segmentAwardValue: 500,

    // Tier-Upgrade defaults
    targetTier: 'Silver',
    challengeMetric: 'Total Spend',
    challengeGoal: 1000,
    challengeDuration: 30,
    completionReward: 1000,

    // Flash Sale defaults
    saleDurationHours: 24,
    maxRedemptions: 1000,
    pointOverride: 0,
    discountOverride: 50
  });

  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const liveFlashSales = campaigns.filter(c => c.status === 'Active' && c.type === 'Flash Sale').length;
  const totalEngaged = activeCampaigns * 1542; // Mock stat for UI

  const handleCreateNew = () => {
    setEditingId(null);
    setTargetSKUsText('');
    setFormData({
      name: '',
      description: '',
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16),
      status: 'Active',
      stackable: true,
      linkedRules: [],
      type: 'Seasonal',
      seasonTag: 'Summer',
      seasonalMultiplier: 2,
      seasonalScope: 'All Products',
      productDiscount: 10,
      productFlatBonus: 0,
      targetSegment: 'New Customers',
      segmentAwardType: 'Flat Bonus',
      segmentAwardValue: 500,
      targetTier: 'Silver',
      challengeMetric: 'Total Spend',
      challengeGoal: 1000,
      challengeDuration: 30,
      completionReward: 1000,
      saleDurationHours: 24,
      maxRedemptions: 1000,
      pointOverride: 0,
      discountOverride: 50
    });
    setIsModalOpen(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingId(campaign.id);
    setTargetSKUsText(campaign.targetSKUs ? campaign.targetSKUs.join(', ') : '');
    setFormData({ ...campaign });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    showToast('Campaign deleted successfully!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    let finalSKUs: string[] | undefined;
    if (formData.type === 'Product' && targetSKUsText) {
      finalSKUs = targetSKUsText.split(',').map(s => s.trim()).filter(Boolean);
    }

    const newCampaign: Campaign = {
      ...(formData as Campaign),
      id: editingId || Math.random().toString(36).substr(2, 9),
      targetSKUs: finalSKUs,
    };

    if (editingId) {
      setCampaigns(campaigns.map(c => c.id === editingId ? newCampaign : c));
      showToast('Campaign updated successfully!');
    } else {
      setCampaigns([newCampaign, ...campaigns]);
      showToast('Campaign created successfully!');
    }

    setIsModalOpen(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const toggleLinkedRule = (ruleId: string) => {
    const current = formData.linkedRules || [];
    if (current.includes(ruleId)) {
      setFormData({ ...formData, linkedRules: current.filter(id => id !== ruleId) });
    } else {
      setFormData({ ...formData, linkedRules: [...current, ruleId] });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex-1 p-4 lg:p-8 relative z-10 h-full overflow-hidden flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Campaigns</h1>
          <p className="text-sm text-slate-500">Manage targeted promotions, flash sales, and seasonal events.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 shrink-0">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
            <Megaphone className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Active</p>
            <h3 className="text-2xl font-black text-slate-800">{activeCampaigns}</h3>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Live Flash Sales</p>
            <h3 className="text-2xl font-black text-slate-800">{liveFlashSales}</h3>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Engaged</p>
            <h3 className="text-2xl font-black text-slate-800">{totalEngaged.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Campaign Management Grid */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-800">Campaign Management Grid</h2>
          <button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </button>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Campaign Name</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Type</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Start Date</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">End Date</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-bold text-sm text-slate-800">{campaign.name}</p>
                    <p className="text-xs text-slate-500 max-w-[200px] truncate">{campaign.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {formatDate(campaign.startDate)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {formatDate(campaign.endDate)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      campaign.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      campaign.status === 'Scheduled' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(campaign)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(campaign.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-sm font-medium">
                    No campaigns created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
              className="bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 w-full max-w-4xl border border-white/60 flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {editingId ? 'Edit Campaign' : 'Create Campaign'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Configure global parameters and dynamic behavior.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1">
                <form id="campaign-form" onSubmit={handleSave} className="flex flex-col gap-8">
                  
                  {/* Section 1: Global Base Inputs */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">1. Global Configuration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Campaign Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          placeholder="e.g. Summer Extravaganza"
                        />
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
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Start Date & Time</label>
                        <input
                          type="datetime-local"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">End Date & Time</label>
                        <input
                          type="datetime-local"
                          required
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
                          <option value="Draft">Draft</option>
                          <option value="Scheduled">Scheduled</option>
                        </select>
                      </div>

                      <div className="flex flex-col justify-end">
                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-[46px]">
                          <span className="text-sm font-bold text-slate-700">Stackable with others?</span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, stackable: !formData.stackable })}
                            className={`w-10 h-5 rounded-full transition-colors relative ${formData.stackable ? 'bg-indigo-500' : 'bg-slate-300'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${formData.stackable ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Rule Linkage */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Assign Rules (Optional)</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-48 overflow-y-auto">
                          {rules.length === 0 ? (
                            <p className="text-sm text-slate-500 text-center py-4">No rules available to assign.</p>
                          ) : (
                            <div className="flex flex-col gap-2">
                              {rules.map(rule => (
                                <label key={rule.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group">
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                    formData.linkedRules?.includes(rule.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'
                                  }`}>
                                    {formData.linkedRules?.includes(rule.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{rule.name}</span>
                                    <span className="text-[11px] text-slate-500 uppercase tracking-wide">{rule.ruleClass}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Section 2: Campaign Type Selector */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">2. Campaign Archetype</h3>
                    <div>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full bg-white border-2 border-indigo-100 rounded-xl px-4 py-4 text-base font-bold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                      >
                        <option value="Seasonal">Seasonal</option>
                        <option value="Product">Product Focus</option>
                        <option value="Customer Category">Customer Category</option>
                        <option value="Tier-Upgrade">Tier-Upgrade Challenge</option>
                        <option value="Flash Sale">Flash Sale</option>
                      </select>
                    </div>
                  </div>

                  {/* Section 3: Dynamic Contextual Inputs */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">3. Dynamic Parameters</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      
                      {formData.type === 'Seasonal' && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Season/Holiday Tag</label>
                            <select
                              value={formData.seasonTag}
                              onChange={(e) => setFormData({ ...formData, seasonTag: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="Summer">Summer</option>
                              <option value="Winter">Winter</option>
                              <option value="Black Friday">Black Friday</option>
                              <option value="Cyber Monday">Cyber Monday</option>
                              <option value="Holiday">Holiday</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Seasonal Multiplier (x)</label>
                            <input
                              type="number"
                              step="0.5"
                              value={formData.seasonalMultiplier}
                              onChange={(e) => setFormData({ ...formData, seasonalMultiplier: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Seasonal Scope</label>
                            <select
                              value={formData.seasonalScope}
                              onChange={(e) => setFormData({ ...formData, seasonalScope: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="All Products">All Products</option>
                              <option value="Specific Categories">Specific Categories</option>
                            </select>
                          </div>
                        </>
                      )}

                      {formData.type === 'Product' && (
                        <>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Target SKUs (comma separated)</label>
                            <input
                              type="text"
                              value={targetSKUsText}
                              onChange={(e) => setTargetSKUsText(e.target.value)}
                              placeholder="e.g. SKU123, SKU456"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Product Discount (%)</label>
                            <input
                              type="number"
                              value={formData.productDiscount}
                              onChange={(e) => setFormData({ ...formData, productDiscount: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Flat Bonus (Pts)</label>
                            <input
                              type="number"
                              value={formData.productFlatBonus}
                              onChange={(e) => setFormData({ ...formData, productFlatBonus: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                        </>
                      )}

                      {formData.type === 'Customer Category' && (
                        <>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Target Audience Segment</label>
                            <select
                              value={formData.targetSegment}
                              onChange={(e) => setFormData({ ...formData, targetSegment: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="New Customers">New Customers</option>
                              <option value="Lapsed Users">Lapsed Users</option>
                              <option value="VIP">VIP</option>
                              <option value="Tag-based">Tag-based</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Segment Award Type</label>
                            <select
                              value={formData.segmentAwardType}
                              onChange={(e) => setFormData({ ...formData, segmentAwardType: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="% Cart Discount">% Cart Discount</option>
                              <option value="Flat Bonus">Flat Bonus Points</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Award Value</label>
                            <input
                              type="number"
                              value={formData.segmentAwardValue}
                              onChange={(e) => setFormData({ ...formData, segmentAwardValue: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                        </>
                      )}

                      {formData.type === 'Tier-Upgrade' && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Target Tier to Reach</label>
                            <select
                              value={formData.targetTier}
                              onChange={(e) => setFormData({ ...formData, targetTier: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="Silver">Silver</option>
                              <option value="Gold">Gold</option>
                              <option value="Platinum">Platinum</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Challenge Metric</label>
                            <select
                              value={formData.challengeMetric}
                              onChange={(e) => setFormData({ ...formData, challengeMetric: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            >
                              <option value="Total Spend">Total Spend</option>
                              <option value="Number of Visits">Number of Visits</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Challenge Goal Value</label>
                            <input
                              type="number"
                              value={formData.challengeGoal}
                              onChange={(e) => setFormData({ ...formData, challengeGoal: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Completion Reward (Pts)</label>
                            <input
                              type="number"
                              value={formData.completionReward}
                              onChange={(e) => setFormData({ ...formData, completionReward: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                        </>
                      )}

                      {formData.type === 'Flash Sale' && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Sale Duration (Hours)</label>
                            <input
                              type="number"
                              value={formData.saleDurationHours}
                              onChange={(e) => setFormData({ ...formData, saleDurationHours: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Global Max Redemptions</label>
                            <input
                              type="number"
                              value={formData.maxRedemptions}
                              onChange={(e) => setFormData({ ...formData, maxRedemptions: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Point Override (Cost)</label>
                            <input
                              type="number"
                              value={formData.pointOverride}
                              onChange={(e) => setFormData({ ...formData, pointOverride: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Price Discount Override (%)</label>
                            <input
                              type="number"
                              value={formData.discountOverride}
                              onChange={(e) => setFormData({ ...formData, discountOverride: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800"
                            />
                          </div>
                        </>
                      )}

                    </div>
                  </div>

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
                  form="campaign-form"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Campaign
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
