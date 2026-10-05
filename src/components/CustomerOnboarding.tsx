import React, { useState } from 'react';
import { FileUp, UserPlus, Users, ArrowLeft, UploadCloud, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Customer } from '../types';

interface CustomerOnboardingProps {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
}

export function CustomerOnboarding({ customers, setCustomers }: CustomerOnboardingProps) {
  const [onboardingView, setOnboardingView] = useState<'menu' | 'bulk' | 'single'>('menu');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Single form state
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    age: '',
    gender: 'Prefer not to say',
    initialPoints: ''
  });
  
  // Bulk upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadProgress(0);
          showToast('54 Customers Successfully Onboarded');
          setOnboardingView('menu');
        }
      }, 200);
    }
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const points = parseInt(formData.initialPoints, 10) || 0;
    
    let calculatedTier = 'Bronze';
    if (points >= 5000) calculatedTier = 'Platinum';
    else if (points >= 2000) calculatedTier = 'Gold';
    else if (points >= 500) calculatedTier = 'Silver';
    
    const newCustomer: Customer = {
      id: `c_${Date.now()}`,
      avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
      fullName: formData.fullName,
      email: `${formData.fullName.replace(/\s/g, '').toLowerCase()}@example.com`,
      phone: formData.mobileNumber,
      tier: calculatedTier,
      pointsBalance: points,
      visits: 1,
      totalSpent: points * 1.5,
      status: 'Active',
      lastVisitDate: new Date().toISOString().split('T')[0],
      enrolledProgram: 'Merchant Direct'
    };
    
    setCustomers([newCustomer, ...customers]);
    showToast(`${formData.fullName} Successfully Onboarded (${calculatedTier} Tier)`);
    setFormData({
      fullName: '',
      mobileNumber: '',
      age: '',
      gender: 'Prefer not to say',
      initialPoints: ''
    });
    setOnboardingView('menu');
  };

  return (
    <div className="flex-1 p-4 lg:p-8 relative z-10 h-full overflow-y-auto flex flex-col gap-8 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-600" /> Customer Onboarding
        </h1>
        <p className="text-sm text-slate-500 mt-2 font-medium">Add new customers to your loyalty program seamlessly.</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* MENU VIEW */}
          {onboardingView === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12"
            >
              {/* Card 1: Bulk Upload */}
              <button 
                onClick={() => setOnboardingView('bulk')}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all text-left overflow-hidden h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-24 h-24 rounded-3xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors flex items-center justify-center shrink-0">
                  <FileUp className="w-12 h-12 text-indigo-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Bulk Customer Upload</h3>
                  <p className="text-slate-500 font-medium px-4">Upload an Excel/CSV file to onboard multiple customers at once.</p>
                </div>
              </button>

              {/* Card 2: Single Registration */}
              <button 
                onClick={() => setOnboardingView('single')}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-6 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all text-left overflow-hidden h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center shrink-0">
                  <UserPlus className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Single Customer Onboarding</h3>
                  <p className="text-slate-500 font-medium px-4">Manually register a single customer at the point of sale.</p>
                </div>
              </button>
            </motion.div>
          )}

          {/* BULK UPLOAD VIEW */}
          {onboardingView === 'bulk' && (
            <motion.div
              key="bulk"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <button 
                onClick={() => setOnboardingView('menu')}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Options
              </button>
              
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-12">
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-bold text-slate-800">Upload Customer Data</h2>
                  <p className="text-slate-500 mt-2">Supports .xlsx and .csv formats.</p>
                </div>

                <div className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 rounded-3xl p-16 flex flex-col items-center justify-center transition-colors relative">
                  <input 
                    type="file" 
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    onChange={handleBulkUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={isUploading}
                  />
                  
                  {!isUploading ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
                        <UploadCloud className="w-10 h-10 text-indigo-500" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-700 mb-2">Drag & Drop your file here</h3>
                      <p className="text-sm text-slate-500 mb-6">or</p>
                      <span className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 shadow-md shadow-indigo-200 cursor-pointer">
                        Browse Files (.xlsx, .csv)
                      </span>
                    </>
                  ) : (
                    <div className="w-full max-w-md flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin mb-6"></div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">Uploading Data...</h3>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-200 ease-out" 
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-500 mt-3 font-medium">{uploadProgress}% Complete</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SINGLE REGISTRATION VIEW */}
          {onboardingView === 'single' && (
            <motion.div
              key="single"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <button 
                onClick={() => setOnboardingView('menu')}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Options
              </button>

              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60 p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Manual Registration</h2>
                  <p className="text-slate-500 mt-2">Enter customer details. Tier will be automatically assigned based on points.</p>
                </div>

                <form onSubmit={handleSingleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Customer Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g., Jane Doe"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                        placeholder="e.g., +1 234 567 8900"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Age</label>
                      <input
                        type="number"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        placeholder="e.g., 28"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Initial Points</label>
                      <input
                        type="number"
                        required
                        value={formData.initialPoints}
                        onChange={(e) => setFormData({...formData, initialPoints: e.target.value})}
                        placeholder="e.g., 1500"
                        className="w-full bg-emerald-50/50 border border-emerald-200/80 rounded-xl px-4 py-3 text-sm font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                      <p className="text-[10px] font-bold text-slate-400 mt-2">
                        Tier Thresholds: &lt;500 Bronze | 500+ Silver | 2000+ Gold | 5000+ Platinum
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button 
                      type="submit"
                      className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-colors shadow-lg shadow-emerald-200 flex items-center gap-2"
                    >
                      Onboard Customer
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-medium"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
