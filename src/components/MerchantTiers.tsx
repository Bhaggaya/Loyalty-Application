import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, CheckCircle2, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { TierRequest } from '../types';

interface MerchantTiersProps {
  tierRequests: TierRequest[];
  setTierRequests: React.Dispatch<React.SetStateAction<TierRequest[]>>;
  activeTiers: { id: string; name: string; }[];
}

export function MerchantTiers({ tierRequests, setTierRequests, activeTiers }: MerchantTiersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    tierName: '',
    description: '',
    pointsNeeded: '',
    tierColor: '#4f46e5'
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: TierRequest = {
      id: `req-t-${Date.now()}`,
      merchantName: 'ABC Merchant',
      tierName: formData.tierName,
      description: formData.description,
      pointsNeeded: Number(formData.pointsNeeded) || 0,
      tierColor: formData.tierColor,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0]
    };
    setTierRequests([newRequest, ...tierRequests]);
    setIsModalOpen(false);
    setFormData({
      tierName: '',
      description: '',
      pointsNeeded: '',
      tierColor: '#4f46e5'
    });
    showToast('Tier Request submitted to HDPS Admin');
  };

  return (
    <div className="p-8 h-full flex flex-col relative z-10 overflow-y-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
             <Layers className="w-8 h-8 text-amber-500" /> Request Tiers
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your loyalty tiers and request new ones.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-200 transition-all"
        >
          <Plus className="w-5 h-5" /> Request New Tier
        </button>
      </div>

      <div className="space-y-8 pb-12">
        {/* Active Tiers */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Active Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeTiers.map(tier => (
              <div key={tier.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{tier.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pending Requests</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {tierRequests.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No pending requests.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="p-4">Tier Name</th>
                    <th className="p-4">Points Needed</th>
                    <th className="p-4">Requested Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-100">
                  {tierRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: req.tierColor }}></div>
                        {req.tierName}
                      </td>
                      <td className="p-4 text-slate-500">{req.pointsNeeded} pts</td>
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

      {/* Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Request New Tier</h2>
                  <p className="text-sm text-slate-500 mt-1">Submit tier details to the HDPS Admin team.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <form id="tier-request-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tier Name</label>
                      <input
                        type="text"
                        required
                        value={formData.tierName}
                        onChange={(e) => setFormData({...formData, tierName: e.target.value})}
                        placeholder="e.g., Diamond, Ruby"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Description</label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe the benefits of this tier."
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Points Needed to Achieve</label>
                      <input
                        type="number"
                        required
                        value={formData.pointsNeeded}
                        onChange={(e) => setFormData({...formData, pointsNeeded: e.target.value})}
                        placeholder="e.g., 5000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tier Image</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer h-[120px]">
                          <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                          <span className="text-xs font-bold">Upload Image</span>
                          <span className="text-[10px]">PNG, JPG up to 5MB</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tier Color</label>
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 h-[120px] flex-col justify-center">
                          <input
                            type="color"
                            required
                            value={formData.tierColor}
                            onChange={(e) => setFormData({...formData, tierColor: e.target.value})}
                            className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                          />
                          <span className="text-xs font-medium text-slate-600 uppercase">{formData.tierColor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  form="tier-request-form"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center gap-2"
                >
                  Submit Tier Request
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
