import React, { useState } from 'react';
import { Plus, X, Tag, MoreHorizontal, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Reward } from '../types';

export function Rewards({ rewards, setRewards }: { rewards: Reward[], setRewards: React.Dispatch<React.SetStateAction<Reward[]>> }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReward, setNewReward] = useState<Partial<Reward>>({ name: '', category: 'Food', pointsCost: 100, cashValue: 0, status: 'Active' });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReward.name?.trim()) return;

    const reward: Reward = {
      id: Math.random().toString(36).substr(2, 9),
      name: newReward.name,
      category: newReward.category as 'Food' | 'Merch' | 'Discount',
      pointsCost: Number(newReward.pointsCost),
      cashValue: Number(newReward.cashValue),
      totalRedeemed: 0,
      status: newReward.status as 'Active' | 'Inactive',
    };

    setRewards([reward, ...rewards]);
    setIsModalOpen(false);
    setNewReward({ name: '', category: 'Food', pointsCost: 100, cashValue: 0, status: 'Active' });
  };

  const filteredRewards = rewards.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeRewards = rewards.filter(r => r.status === 'Active').length;
  const totalRedemptions = rewards.reduce((acc, r) => acc + r.totalRedeemed, 0);
  const avgPoints = rewards.length > 0 ? (rewards.reduce((acc, r) => acc + r.pointsCost, 0) / rewards.length) : 0;
  const totalValue = rewards.reduce((acc, r) => acc + (r.cashValue * r.totalRedeemed), 0);

  return (
    <div className="flex-1 flex flex-col relative z-10 p-8">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Rewards</span>
          <span className="text-3xl font-bold text-slate-800">{activeRewards.toLocaleString()}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Redemptions</span>
          <span className="text-3xl font-bold text-slate-800">{totalRedemptions.toLocaleString()}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Avg Points Cost</span>
          <span className="text-3xl font-bold text-slate-800">{Math.round(avgPoints).toLocaleString()} pts</span>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Value Redeemed</span>
          <span className="text-3xl font-bold text-slate-800">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 flex flex-col overflow-hidden">
        {/* Header Actions */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative flex-1 md:w-64 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Merch">Merch</option>
              <option value="Discount">Discount</option>
            </select>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Reward
          </button>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reward Name</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Points Cost</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cash Value</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Redeemed</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRewards.map((reward) => (
                <tr key={reward.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                        <Tag className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm text-slate-800">{reward.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-sm text-slate-600">{reward.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-sm text-slate-700">{reward.pointsCost.toLocaleString()} pts</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-sm text-emerald-600">${reward.cashValue.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-sm text-slate-600">{reward.totalRedeemed.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                        reward.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {reward.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRewards.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Tag className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-1">No rewards found</p>
                      <p className="text-sm font-medium text-slate-500 mb-6">Create a reward to get started, or adjust your filters.</p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Create Reward
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 w-full max-w-md border border-white/60 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Reward</h2>
                <p className="text-sm font-medium text-slate-500">Configure a new redeemable item.</p>
              </div>

              <form onSubmit={handleCreateReward} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Reward Name</label>
                  <input
                    type="text"
                    required
                    value={newReward.name}
                    onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    placeholder="e.g. Free Premium Coffee"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Category</label>
                  <select
                    value={newReward.category}
                    onChange={(e) => setNewReward({ ...newReward, category: e.target.value as Reward['category'] })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm"
                  >
                    <option value="Food">Food</option>
                    <option value="Merch">Merch</option>
                    <option value="Discount">Discount</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Points Cost</label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        min="1"
                        value={newReward.pointsCost}
                        onChange={(e) => setNewReward({ ...newReward, pointsCost: Number(e.target.value) })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-slate-400 font-semibold text-xs">pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Cash Value</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-slate-400 font-semibold text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={newReward.cashValue}
                        onChange={(e) => setNewReward({ ...newReward, cashValue: Number(e.target.value) })}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Status</label>
                  <select
                    value={newReward.status}
                    onChange={(e) => setNewReward({ ...newReward, status: e.target.value as Reward['status'] })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-5 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all"
                  >
                    Create Reward
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
