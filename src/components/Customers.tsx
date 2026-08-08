import React, { useState } from 'react';
import { Customer, Program } from '../types';
import { Search, Filter, Download, Plus, MoreHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Customers({ customers, setCustomers, programs }: { customers: Customer[], setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>, programs: Program[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tier: 'Gold',
    initialPoints: 0,
    enrolledProgram: ''
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.firstName.trim() || !newCustomer.lastName.trim()) return;

    const fullName = `${newCustomer.firstName.trim()} ${newCustomer.lastName.trim()}`;
    const newCustomerObj: Customer = {
      id: Math.random().toString(36).substr(2, 9),
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
      fullName,
      email: newCustomer.email,
      phone: newCustomer.phone,
      tier: newCustomer.tier,
      pointsBalance: Number(newCustomer.initialPoints),
      visits: 0,
      totalSpent: 0,
      status: 'Active',
      lastVisitDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      enrolledProgram: newCustomer.enrolledProgram || undefined
    };

    setCustomers([newCustomerObj, ...customers]);
    setIsAddCustomerOpen(false);
    setNewCustomer({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      tier: 'Gold',
      initialPoints: 0,
      enrolledProgram: ''
    });
  };

  const filteredCustomers = customers.filter(c => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = c.fullName.toLowerCase().includes(term) || 
                          c.phone.includes(searchTerm) || 
                          (c.email && c.email.toLowerCase().includes(term));
    const matchesTier = tierFilter === 'All' || c.tier === tierFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const totalCustomers = customers.length;
  const activeMembers = customers.filter(c => c.status === 'Active').length;
  const totalPoints = customers.reduce((acc, c) => acc + c.pointsBalance, 0);
  const avgLtv = customers.length > 0 ? (customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length) : 0;

  return (
    <div className="flex-1 flex flex-col relative z-10 p-8">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Customers</span>
          <span className="text-3xl font-bold text-slate-800">{totalCustomers.toLocaleString()}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Members</span>
          <span className="text-3xl font-bold text-slate-800">{activeMembers.toLocaleString()}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Points Earned</span>
          <span className="text-3xl font-bold text-slate-800">{totalPoints.toLocaleString()}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Avg Lifetime Value</span>
          <span className="text-3xl font-bold text-slate-800">${avgLtv.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 flex flex-col overflow-hidden">
        {/* Header Actions */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner"
              />
            </div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner outline-none"
            >
              <option value="All">All Tiers</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Lapsed">Lapsed</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={() => setIsAddCustomerOpen(true)}
              className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Customer
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tier</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Points</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Visits</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Spent</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Visit</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={customer.avatarUrl} alt={customer.fullName} className="w-10 h-10 rounded-full bg-slate-100 object-cover border border-slate-200" />
                      <div>
                        <p className="font-bold text-sm text-slate-800">{customer.fullName}</p>
                        <p className="text-xs text-slate-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-sm text-slate-600">{customer.phone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      customer.tier === 'Gold' ? 'bg-amber-100 text-amber-700' :
                      customer.tier === 'Silver' ? 'bg-slate-200 text-slate-700' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {customer.tier}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-sm text-slate-700">{customer.pointsBalance.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-sm text-slate-600">{customer.visits}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-sm text-emerald-600">${customer.totalSpent.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      customer.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-sm text-slate-600">{customer.lastVisitDate}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500 text-sm font-medium">
                    No customers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      <AnimatePresence>
        {isAddCustomerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setIsAddCustomerOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 w-full max-w-lg border border-white/60 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Add New Customer</h2>
                <p className="text-sm font-medium text-slate-500">Enter customer details to enroll them.</p>
              </div>

              <form onSubmit={handleAddCustomer} className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">First Name</label>
                    <input
                      type="text"
                      required
                      value={newCustomer.firstName}
                      onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Last Name</label>
                    <input
                      type="text"
                      required
                      value={newCustomer.lastName}
                      onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    placeholder="jane.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Membership Tier</label>
                    <select
                      value={newCustomer.tier}
                      onChange={(e) => setNewCustomer({ ...newCustomer, tier: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm"
                    >
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Initial Points</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newCustomer.initialPoints}
                      onChange={(e) => setNewCustomer({ ...newCustomer, initialPoints: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Enroll in Loyalty Program (Optional)</label>
                  <select
                    value={newCustomer.enrolledProgram}
                    onChange={(e) => setNewCustomer({ ...newCustomer, enrolledProgram: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm"
                  >
                    <option value="">None</option>
                    {programs.filter(p => p.status === 'Active').map(program => (
                      <option key={program.id} value={program.id}>{program.name} ({program.type})</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddCustomerOpen(false)}
                    className="flex-1 px-5 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all"
                  >
                    Add Customer
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
