import { Search, Calendar, Download } from 'lucide-react';

export function Header() {
  return (
    <header className="px-8 py-6 flex items-center justify-between shrink-0 border-b border-slate-200/30">
      <div className="relative w-72">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 shadow-sm transition-all">
          <Calendar className="w-4 h-4 text-slate-500" />
          May 1 - May 31
        </button>
        <button className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-all">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </header>
  );
}
