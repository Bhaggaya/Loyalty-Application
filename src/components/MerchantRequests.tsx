import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Inbox, CheckCircle2, XCircle, Clock, Search, Filter } from 'lucide-react';
import { ProgramRequest, CampaignRequest, TierRequest } from '../types';

interface MerchantRequestsProps {
  programRequests: ProgramRequest[];
  setProgramRequests: React.Dispatch<React.SetStateAction<ProgramRequest[]>>;
  campaignRequests: CampaignRequest[];
  setCampaignRequests: React.Dispatch<React.SetStateAction<CampaignRequest[]>>;
  tierRequests: TierRequest[];
  setTierRequests: React.Dispatch<React.SetStateAction<TierRequest[]>>;
}

export function MerchantRequests({ 
  programRequests, 
  setProgramRequests, 
  campaignRequests, 
  setCampaignRequests,
  tierRequests,
  setTierRequests
}: MerchantRequestsProps) {
  const [activeTab, setActiveTab] = useState<'programs' | 'campaigns' | 'tiers'>('programs');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApproveProgram = (id: string) => {
    setProgramRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Fulfilled' } : req));
    showToast('Program Sent to Rules Engine');
  };

  const handleDeclineProgram = (id: string) => {
    setProgramRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
    showToast('Program Request Declined');
  };

  const handleApproveCampaign = (id: string) => {
    setCampaignRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Fulfilled' } : req));
    showToast('Campaign Sent to Campaign Manager');
  };

  const handleDeclineCampaign = (id: string) => {
    setCampaignRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
    showToast('Campaign Request Declined');
  };

  const handleApproveTier = (id: string) => {
    setTierRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Fulfilled' } : req));
    showToast('Tier Setup Approved');
  };

  const handleDeclineTier = (id: string) => {
    setTierRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
    showToast('Tier Request Declined');
  };

  return (
    <div className="p-8 h-full flex flex-col relative z-10 overflow-y-auto bg-slate-50">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
             <Inbox className="w-8 h-8 text-indigo-600" /> Merchant Requests Inbox
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Review and fulfill incoming requests from merchants.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1 min-h-0">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 p-2 gap-2">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'tiers' 
                ? 'bg-white text-amber-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            Tier Requests
            {tierRequests.filter(r => r.status === 'Pending').length > 0 && (
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">
                {tierRequests.filter(r => r.status === 'Pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'programs' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            Program Requests
            {programRequests.filter(r => r.status === 'Pending').length > 0 && (
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                {programRequests.filter(r => r.status === 'Pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'campaigns' 
                ? 'bg-white text-rose-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            Campaign Requests
            {campaignRequests.filter(r => r.status === 'Pending').length > 0 && (
              <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs">
                {campaignRequests.filter(r => r.status === 'Pending').length}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            
            {activeTab === 'tiers' && (
              <motion.div
                key="tiers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {tierRequests.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-medium">No tier requests available.</div>
                ) : (
                  tierRequests.map(req => (
                    <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{req.merchantName}</span>
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {req.requestDate}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: req.tierColor }}></div>
                            {req.tierName}
                          </h3>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                          req.status === 'Fulfilled' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-5 p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Points Needed</p>
                          <p className="text-sm font-medium text-slate-700">{req.pointsNeeded} pts</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</p>
                          <p className="text-sm text-slate-600">{req.description}</p>
                        </div>
                      </div>

                      {req.status === 'Pending' && (
                        <div className="flex gap-3 justify-end border-t border-slate-100 pt-4 mt-2">
                          <button 
                            onClick={() => handleDeclineTier(req.id)}
                            className="px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <XCircle className="w-4 h-4" /> Decline
                          </button>
                          <button 
                            onClick={() => handleApproveTier(req.id)}
                            className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-200 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve & Build
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'programs' && (
              <motion.div
                key="programs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {programRequests.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-medium">No program requests available.</div>
                ) : (
                  programRequests.map(req => (
                    <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{req.merchantName}</span>
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {req.requestDate}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: req.programColor }}></div>
                             {req.programName}
                          </h3>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                          req.status === 'Fulfilled' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-5 p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Selected Tier</p>
                          <p className="text-sm font-medium text-slate-700">{req.selectedTier}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Validity Period</p>
                          <p className="text-sm font-medium text-slate-700">{req.startDate} to {req.endDate}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Accumulation</p>
                          <p className="text-sm font-medium text-slate-700">{req.accRuleType === 'existing' ? req.selectedAccRule : req.newAccRuleRatio}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Redemption</p>
                          <p className="text-sm font-medium text-slate-700">{req.redRuleType === 'existing' ? req.selectedRedRule : req.newRedRuleLogic}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</p>
                          <p className="text-sm text-slate-600">{req.description}</p>
                        </div>
                      </div>

                      {req.status === 'Pending' && (
                        <div className="flex gap-3 justify-end border-t border-slate-100 pt-4 mt-2">
                          <button 
                            onClick={() => handleDeclineProgram(req.id)}
                            className="px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <XCircle className="w-4 h-4" /> Decline
                          </button>
                          <button 
                            onClick={() => handleApproveProgram(req.id)}
                            className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve & Build
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'campaigns' && (
              <motion.div
                key="campaigns"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {campaignRequests.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-medium">No campaign requests available.</div>
                ) : (
                  campaignRequests.map(req => (
                    <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{req.merchantName}</span>
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {req.requestDate}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800">{req.campaignName}</h3>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                          req.status === 'Fulfilled' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-5 p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Campaign Type</p>
                          <p className="text-sm font-medium text-slate-700">{req.campaignType}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target Group</p>
                          <p className="text-sm font-medium text-slate-700">{req.customerGroup}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Channels</p>
                          <p className="text-sm font-medium text-slate-700 text-xs">{req.socialMediaChannels.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Validity</p>
                          <p className="text-sm font-medium text-slate-700">{req.startDate} to {req.endDate}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</p>
                          <p className="text-sm text-slate-600">{req.description}</p>
                        </div>
                      </div>

                      {req.status === 'Pending' && (
                        <div className="flex gap-3 justify-end border-t border-slate-100 pt-4 mt-2">
                          <button 
                            onClick={() => handleDeclineCampaign(req.id)}
                            className="px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <XCircle className="w-4 h-4" /> Decline
                          </button>
                          <button 
                            onClick={() => handleApproveCampaign(req.id)}
                            className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve & Build
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
