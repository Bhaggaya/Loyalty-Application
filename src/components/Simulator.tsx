import React, { useState } from 'react';
import { Customer, Program } from '../types';
import { Smartphone, QrCode, Globe, CreditCard, ChevronRight, Zap, CheckCircle2, Store, Download, Printer, Copy, Share2, Facebook, Instagram, MessageCircle, Mail, Phone, ShieldCheck, TerminalSquare, Search, Scan, Gift, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Simulator({
  customers,
  setCustomers,
  programs
}: {
  customers: Customer[],
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>,
  programs: Program[]
}) {
  const [activeTab, setActiveTab] = useState<'qr' | 'portal' | 'card'>('qr');
  const [qrSize, setQrSize] = useState('medium');
  const [webhookUrl, setWebhookUrl] = useState('https://api.loyalty.app/webhook/pos');
  const [showNotification, setShowNotification] = useState(false);

  const activeProgram = programs[0] || {
    name: 'Rewards Program',
    pointsValuation: 1,
    urlSlug: 'enroll'
  };

  const handleTestTransaction = () => {
    setShowNotification(false);
    setTimeout(() => setShowNotification(true), 1500);
  };

  return (
    <div className="flex-1 flex flex-col relative z-10 p-4 lg:p-8 min-h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Omni-Channel Enrollment</h1>
        <p className="text-sm text-slate-500">Configure and simulate interactive enrollment experiences across all touchpoints.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full pb-10">
        
        {/* Left Pane: Enrollment Configuration (60%) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6 shrink-0 h-full overflow-y-auto pr-2 pb-20 scrollbar-hide">
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => { setActiveTab('qr'); setShowNotification(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'qr'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <QrCode className="w-4 h-4" /> Physical QR
            </button>
            <button
              onClick={() => { setActiveTab('portal'); setShowNotification(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'portal'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <Globe className="w-4 h-4" /> Customer Portal
            </button>
            <button
              onClick={() => { setActiveTab('card'); setShowNotification(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'card'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Card-Linked
            </button>
          </div>

          {/* Configuration Content */}
          <AnimatePresence mode="wait">
            
            {/* TAB 1: QR CODE */}
            {activeTab === 'qr' && (
              <motion.div
                key="qr-config"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col items-center">
                  <div className="w-40 h-40 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex items-center justify-center mb-6 relative overflow-hidden group">
                    <QrCode className="w-full h-full text-slate-800" />
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <div className="w-full max-w-sm flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Size Customization</label>
                      <select 
                        value={qrSize}
                        onChange={(e) => setQrSize(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                      >
                        <option value="small">Small (128px)</option>
                        <option value="medium">Medium (256px)</option>
                        <option value="large">Large (512px)</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download PNG
                      </button>
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2">
                        <Printer className="w-4 h-4" /> Print Ready
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Where to Display</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col items-center text-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Checkout Counter</h4>
                        <p className="text-xs text-slate-500 mt-1">Acrylic stand next to POS</p>
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col items-center text-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <TerminalSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Receipt Footer</h4>
                        <p className="text-xs text-slate-500 mt-1">Printed on every thermal receipt</p>
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col items-center text-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                        <Scan className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Table Tents</h4>
                        <p className="text-xs text-slate-500 mt-1">QR menus and posters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PORTAL */}
            {activeTab === 'portal' && (
              <motion.div
                key="portal-config"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Dynamic Enrollment Link</h3>
                  <div className="flex gap-3 mb-4">
                    <input 
                      readOnly 
                      value={`https://brand.loyalty.app/join/${activeProgram.urlSlug || 'DEMO'}`}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2">
                      <Copy className="w-4 h-4" /> Copy Link
                    </button>
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Copy Share Message
                    </button>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Share Via</h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-sm transition-colors border border-blue-100">
                      <Facebook className="w-4 h-4" /> Facebook
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 font-bold text-sm transition-colors border border-pink-100">
                      <Instagram className="w-4 h-4" /> Instagram
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-sm transition-colors border border-emerald-100">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-sm transition-colors border border-indigo-100">
                      <Mail className="w-4 h-4" /> Email
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-sm transition-colors border border-slate-200">
                      <Phone className="w-4 h-4" /> SMS
                    </button>
                  </div>
                </div>

                <div className="bg-emerald-50/80 backdrop-blur-md rounded-2xl border border-emerald-200 p-5 flex gap-4 items-start shadow-sm">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 mb-1">SMS OTP Verification Flow Active</h4>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      Customers enter their phone number on the web portal, receive a 6-digit one-time passcode via SMS, and instantly create a secure, passwordless account.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CARD-LINKED */}
            {activeTab === 'card' && (
              <motion.div
                key="card-config"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">POS Integrations</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-800 font-black text-xl">S</div>
                      <span className="text-xs font-bold text-slate-600">Square</span>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-emerald-500 font-black text-xl">C</div>
                      <span className="text-xs font-bold text-slate-600">Clover</span>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-orange-500 font-black text-xl">T</div>
                      <span className="text-xs font-bold text-slate-600">Toast</span>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-green-600 font-black text-xl">Sh</div>
                      <span className="text-xs font-bold text-slate-600">Shopify</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 text-slate-300">
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                    <TerminalSquare className="w-4 h-4 text-emerald-400" /> Webhook Configuration UI
                  </h3>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Endpoint URL</label>
                    <input 
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-mono"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleTestTransaction}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" /> Test Transaction
                    </button>
                    <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                      <Search className="w-4 h-4" /> View Logs
                    </button>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 overflow-hidden">
                  <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Frictionless Flow</h3>
                  
                  {/* Flow diagram */}
                  <div className="relative flex justify-between items-start">
                    {/* Connecting Line */}
                    <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 -z-10"></div>
                    
                    <div className="flex flex-col items-center text-center gap-2 bg-white relative z-10 w-20">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 border-2 border-white shadow-sm">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">Customer<br/>Pays</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center gap-2 bg-white relative z-10 w-20">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border-2 border-white shadow-sm">
                        <Search className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">System<br/>Detects</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center gap-2 bg-white relative z-10 w-20">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border-2 border-white shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">Auto<br/>Enroll</span>
                    </div>

                    <div className="flex flex-col items-center text-center gap-2 bg-white relative z-10 w-20">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 border-2 border-white shadow-sm">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">SMS<br/>Sent</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Pane: Live Mobile Simulator (40%) */}
        <div className="w-full lg:w-2/5 flex items-center justify-center lg:sticky lg:top-0 min-h-[650px] shrink-0 pb-10">
          <div className="relative w-[320px] h-[650px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 flex shrink-0">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-30"></div>
            
            {/* Screen */}
            <div className="flex-1 bg-slate-50 rounded-[2.5rem] overflow-hidden relative flex flex-col">
              
              <AnimatePresence mode="wait">
                
                {/* Mobile: QR Scanner */}
                {activeTab === 'qr' && (
                  <motion.div
                    key="mobile-qr"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900 flex flex-col"
                  >
                    <div className="flex-1 relative">
                      {/* Fake Camera View */}
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <div className="w-56 h-56 border-2 border-white/50 rounded-3xl relative overflow-hidden">
                          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-3xl z-10"></div>
                          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-3xl z-10"></div>
                          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-3xl z-10"></div>
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-3xl z-10"></div>
                          
                          {/* Scan line animation */}
                          <motion.div 
                            animate={{ y: [0, 220, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20"
                          />

                          <div className="absolute inset-0 flex items-center justify-center">
                             <QrCode className="w-32 h-32 text-white/30" />
                          </div>
                        </div>
                        
                        <div className="mt-8 text-center bg-black/50 backdrop-blur-md px-6 py-3 rounded-full">
                          <p className="text-white text-sm font-medium">Point camera at QR code</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Mobile: Customer Portal */}
                {activeTab === 'portal' && (
                  <motion.div
                    key="mobile-portal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white flex flex-col overflow-y-auto pb-8 scrollbar-hide"
                  >
                    {/* Header Image & Welcome */}
                    <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative p-6 pt-10 text-white shrink-0">
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider mb-1">Welcome back,</p>
                          <h2 className="text-xl font-bold">Alex Johnson</h2>
                        </div>
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                          <Store className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Card & Balance */}
                    <div className="px-5 -mt-12 relative z-20 shrink-0">
                      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-5 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Points</span>
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Gold Tier</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-slate-800">2,450</span>
                          <span className="text-sm font-bold text-slate-400">pts</span>
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
                            <span>150 pts to Platinum</span>
                            <span>$15 Value</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-400 to-amber-500 w-[85%] h-full rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="px-5 py-6 grid grid-cols-3 gap-3 shrink-0">
                       <button className="flex flex-col items-center gap-2 group">
                         <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                           <QrCode className="w-5 h-5" />
                         </div>
                         <span className="text-[10px] font-bold text-slate-600">Scan In-Store</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 group">
                         <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                           <Gift className="w-5 h-5" />
                         </div>
                         <span className="text-[10px] font-bold text-slate-600">Redeem</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 group">
                         <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                           <History className="w-5 h-5" />
                         </div>
                         <span className="text-[10px] font-bold text-slate-600">History</span>
                       </button>
                    </div>

                    {/* Available Rewards */}
                    <div className="px-5 shrink-0">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-slate-800">Available Rewards</h3>
                        <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline">View All</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 shadow-sm items-center cursor-pointer hover:border-indigo-200 transition-colors">
                           <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">☕</div>
                           <div className="flex-1">
                             <h4 className="text-xs font-bold text-slate-800">Free Coffee</h4>
                             <p className="text-[10px] text-slate-500 mt-0.5">Any size hot beverage</p>
                           </div>
                           <button className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold">500 pts</button>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 shadow-sm items-center cursor-pointer hover:border-indigo-200 transition-colors">
                           <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">🥐</div>
                           <div className="flex-1">
                             <h4 className="text-xs font-bold text-slate-800">Pastry Item</h4>
                             <p className="text-[10px] text-slate-500 mt-0.5">Select baked goods</p>
                           </div>
                           <button className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold">750 pts</button>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 shadow-sm items-center cursor-pointer hover:border-indigo-200 transition-colors">
                           <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">🥪</div>
                           <div className="flex-1">
                             <h4 className="text-xs font-bold text-slate-800">Lunch Combo</h4>
                             <p className="text-[10px] text-slate-500 mt-0.5">Sandwich & Drink</p>
                           </div>
                           <button className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold">1200 pts</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Mobile: Card Linked Lock Screen */}
                {activeTab === 'card' && (
                  <motion.div
                    key="mobile-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-start pt-16 relative overflow-hidden"
                  >
                    {/* Fake Lock Screen Wallpaper */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-70"></div>
                    
                    {/* Time */}
                    <div className="relative z-10 flex flex-col items-center mt-4">
                      <span className="text-white/90 text-6xl font-light tracking-tight">09:41</span>
                      <span className="text-white/80 text-sm font-medium mt-1">Tuesday, August 2</span>
                    </div>

                    {/* Notification Banner */}
                    <AnimatePresence>
                      {showNotification && (
                        <motion.div 
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ type: "spring", damping: 25, stiffness: 300 }}
                          className="relative z-20 mt-8 w-[90%] bg-white/90 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/20"
                        >
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                              <Store className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 pt-0.5">
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="text-sm font-bold text-slate-900">{activeProgram.name}</span>
                                <span className="text-xs text-slate-500">now</span>
                              </div>
                              <p className="text-sm text-slate-700 leading-snug font-medium">
                                <span className="font-bold text-indigo-600">Bank Alert:</span> You just earned 50 points at DEMO-HOTEL! Click here to view your new loyalty balance.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-12 text-white/50 z-10">
                       <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                         <Search className="w-5 h-5" />
                       </div>
                       <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                         <Phone className="w-5 h-5" />
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full z-30"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

