import React from 'react';
import { Download, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: 'code' | 'breakdown' | 'terminal' | 'visual';
  setActiveTab: (tab: 'code' | 'breakdown' | 'terminal' | 'visual') => void;
  onDownloadScript: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onDownloadScript,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/60 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <span>
            Python <span className="text-emerald-400 font-mono">Calc</span>
          </span>
        </a>

        {/* Zone 2: 4 single-line nav links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'text-emerald-300 bg-slate-900 border border-slate-800'
                : 'hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            Código Fonte
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'breakdown'
                ? 'text-emerald-300 bg-slate-900 border border-slate-800'
                : 'hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            Explicação dos Componentes
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'text-emerald-300 bg-slate-900 border border-slate-800'
                : 'hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            Terminal Interativo
          </button>
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'visual'
                ? 'text-emerald-300 bg-slate-900 border border-slate-800'
                : 'hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            Calculadora Visual
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadScript}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-95 transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap shrink-0"
            title="Baixar arquivo calculadora.py pronto para rodar"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
