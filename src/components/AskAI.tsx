import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Sparkles, Send } from 'lucide-react';

export function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform border border-white/20"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 z-50 w-[340px] bg-white/70 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 overflow-hidden flex flex-col"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm tracking-wide">Ask AI</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors relative z-10 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 h-64 overflow-y-auto flex flex-col gap-4 bg-slate-50/50">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 border border-white shadow-sm mt-1">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100">
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    How can I help optimize your program today?
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/80 border-t border-slate-100/60 backdrop-blur-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      setMessage('');
                    }
                  }}
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-colors shadow-sm"
                  onClick={() => setMessage('')}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
