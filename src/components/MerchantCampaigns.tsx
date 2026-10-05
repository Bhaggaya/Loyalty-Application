import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Plus, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { CampaignRequest, Campaign } from '../types';

interface MerchantCampaignsProps {
  campaigns: Campaign[];
  campaignRequests: CampaignRequest[];
  setCampaignRequests: React.Dispatch<React.SetStateAction<CampaignRequest[]>>;
}

export function MerchantCampaigns({ campaigns, campaignRequests, setCampaignRequests }: MerchantCampaignsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    campaignName: '',
    description: '',
    productType: [] as string[],
    customerGroup: 'All Customers',
    campaignType: 'Promotion',
    startDate: '',
    endDate: '',
    recurring: false,
    recurrenceDetails: 'Weekly',
    socialMediaChannels: [] as string[],
    geographicAreas: ''
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(e.target.selectedOptions).map((option: any) => option.value);
    setFormData({...formData, productType: value});
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(e.target.selectedOptions).map((option: any) => option.value);
    setFormData({...formData, socialMediaChannels: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: CampaignRequest = {
      id: `req-${Date.now()}`,
      merchantName: 'ABC Merchant',
      ...formData,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0]
    };
    setCampaignRequests([newRequest, ...campaignRequests]);
    setIsModalOpen(false);
    setStep(1);
    setFormData({
      campaignName: '',
      description: '',
      productType: [],
      customerGroup: 'All Customers',
      campaignType: 'Promotion',
      startDate: '',
      endDate: '',
      recurring: false,
      recurrenceDetails: 'Weekly',
      socialMediaChannels: [],
      geographicAreas: ''
    });
    showToast('Campaign Request submitted to HDPS Admin');
  };

  return (
    <div className="p-8 h-full flex flex-col relative z-10 overflow-y-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
             <Rocket className="w-8 h-8 text-rose-500" /> Request to Create Campaign
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage active campaigns and request new ones via the wizard.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-rose-200 transition-all"
        >
          <Plus className="w-5 h-5" /> Request New Campaign
        </button>
      </div>

      <div className="space-y-8 pb-12">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Campaign Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Target Group</th>
                <th className="p-4">Channels</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-100">
              {campaignRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                campaignRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{req.campaignName}</td>
                    <td className="p-4 text-slate-600">{req.campaignType}</td>
                    <td className="p-4 text-slate-600">{req.customerGroup}</td>
                    <td className="p-4 text-slate-600 text-xs">{req.socialMediaChannels.join(', ')}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        req.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        req.status === 'Fulfilled' ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-200/50 flex justify-between items-center bg-gradient-to-r from-slate-50/80 to-white/80">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Request New Campaign</h2>
                  <p className="text-sm text-slate-500 mt-1">Step {step} of 2: {step === 1 ? 'Core Details' : 'Schedule & Distribution'}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto bg-white/40">
                <form id="campaign-request-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {step === 1 ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Campaign Name</label>
                        <input
                          type="text"
                          required
                          value={formData.campaignName}
                          onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
                          placeholder="e.g., Summer Flash Sale"
                          className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Campaign Description</label>
                        <textarea
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Briefly describe what this campaign should do."
                          rows={2}
                          className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Product Type</label>
                          <select
                            multiple
                            value={formData.productType}
                            onChange={handleProductTypeChange}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm h-28"
                          >
                            <option value="All Products">All Products</option>
                            <option value="Specific Categories">Specific Categories</option>
                            <option value="New Arrivals">New Arrivals</option>
                          </select>
                          <p className="text-[10px] text-slate-400 mt-1 italic">Hold Ctrl/Cmd to select multiple.</p>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Customer Group</label>
                            <select
                              value={formData.customerGroup}
                              onChange={(e) => setFormData({...formData, customerGroup: e.target.value})}
                              className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                            >
                              <option value="Gold">Gold</option>
                              <option value="Silver">Silver</option>
                              <option value="Bronze">Bronze</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Campaign Type</label>
                            <select
                              value={formData.campaignType}
                              onChange={(e) => setFormData({...formData, campaignType: e.target.value})}
                              className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                            >
                              <option value="Promotion">Promotion</option>
                              <option value="Discount">Discount</option>
                              <option value="Flash Sale">Flash Sale</option>
                              <option value="Point Multiplier">Point Multiplier</option>
                            </select>
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Start Date</label>
                          <input
                            type="date"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">End Date</label>
                          <input
                            type="date"
                            required
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/60 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-slate-800 text-sm">Recurring Campaign</h3>
                            <p className="text-xs text-slate-500">Should this campaign repeat automatically?</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, recurring: !formData.recurring})}
                            className={`w-12 h-6 rounded-full transition-colors relative ${formData.recurring ? 'bg-rose-500' : 'bg-slate-300'}`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${formData.recurring ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {formData.recurring && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2">
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Recurrence Details</label>
                                <select
                                  value={formData.recurrenceDetails}
                                  onChange={(e) => setFormData({...formData, recurrenceDetails: e.target.value})}
                                  className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                                >
                                  <option value="Weekly">Weekly</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annual">Annual</option>
                                </select>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Social Media Channels</label>
                          <select
                            multiple
                            value={formData.socialMediaChannels}
                            onChange={handleSocialMediaChange}
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm h-32"
                          >
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS</option>
                          </select>
                          <p className="text-[10px] text-slate-400 mt-1 italic">Hold Ctrl/Cmd to select multiple.</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Geographic Areas</label>
                          <input
                            type="text"
                            required
                            value={formData.geographicAreas}
                            onChange={(e) => setFormData({...formData, geographicAreas: e.target.value})}
                            placeholder="e.g., Colombo, All Regions"
                            className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-sm"
                          />
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
                    form="campaign-request-form"
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 transition-colors shadow-lg shadow-rose-200 flex items-center gap-2"
                  >
                    Submit Campaign Request
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
