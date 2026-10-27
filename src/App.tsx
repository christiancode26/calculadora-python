import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CodeViewer } from './components/CodeViewer';
import { ComponentsBreakdown } from './components/ComponentsBreakdown';
import { PythonTerminalSimulator } from './components/PythonTerminalSimulator';
import { VisualCalculatorSimulator } from './components/VisualCalculatorSimulator';
import { BestPracticesGuide } from './components/BestPracticesGuide';
import { CODE_VARIANTS } from './data/pythonCodes';
import { CodeVariantId } from './types/calculator';
import {
  Code2,
  Terminal,
  BookOpen,
  Calculator,
  Download,
  CheckCircle,
  Shield,
  Layers,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'code' | 'breakdown' | 'terminal' | 'visual'>('code');
  const [selectedVariantId, setSelectedVariantId] = useState<CodeVariantId>('standard');
  const [highlightRange, setHighlightRange] = useState<[number, number] | null>(null);

  // Trigger download of Python file
  const handleDownloadScript = (variantId?: CodeVariantId) => {
    const targetId = variantId || selectedVariantId;
    const variant = CODE_VARIANTS.find((v) => v.id === targetId) || CODE_VARIANTS[0];
    const blob = new Blob([variant.code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = variant.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleHighlightComponent = (lines: [number, number]) => {
    setHighlightRange(lines);
    setSelectedVariantId('standard');
    setActiveTab('code');
    // Smooth scroll to top of code
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* 3-Zone Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadScript={() => handleDownloadScript()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
        {/* Hero Section */}
        <section id="top" className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="text-emerald-400 font-mono">Python 3.10+</span>
            <span aria-hidden="true">·</span>
            <span>Programação Estruturada</span>
            <span aria-hidden="true">·</span>
            <span>4 Operações Básicas</span>
            <span aria-hidden="true">·</span>
            <span>Tratamento de Exceções</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Calculadora em Python: Código Limpo, Organizado e Explicado
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Aprenda a construir uma calculadora completa em Python com as quatro operações
            matemáticas fundamentais (<strong className="text-slate-200">adição, subtração, multiplicação e divisão</strong>),
            com modularização em funções puras, prevenção de divisão por zero, validação de entradas numéricas com{' '}
            <code className="text-emerald-400 font-mono bg-slate-900 px-1 py-0.5 rounded border border-slate-800">try/except</code> e
            loop contínuo amigável.
          </p>

          {/* Value props - unboxed typography (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Funções Puras e Modulares</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Proteção ZeroDivisionError</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Validação Robusta com try/except</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Pronto para Rodar no Terminal</span>
            </div>
          </div>
        </section>

        {/* View Segmented Switcher Controls */}
        <section className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl max-w-fit overflow-x-auto">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Código Python (.py)</span>
          </button>

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'breakdown'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Explicação dos Componentes</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Simulador de Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'visual'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Calculadora Visual</span>
          </button>
        </section>

        {/* Tab Content Display */}
        {activeTab === 'code' && (
          <section className="space-y-6">
            <CodeViewer
              selectedVariantId={selectedVariantId}
              onSelectVariant={setSelectedVariantId}
              highlightRange={highlightRange}
              onDownloadScript={handleDownloadScript}
            />

            <div className="pt-4">
              <ComponentsBreakdown onHighlightComponent={handleHighlightComponent} />
            </div>
          </section>
        )}

        {activeTab === 'breakdown' && (
          <section className="space-y-6">
            <ComponentsBreakdown onHighlightComponent={handleHighlightComponent} />

            <div className="pt-4">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-white">
                  Código Completo para Referência
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Acompanhe como todas as funções e componentes se conectam no script final.
                </p>
              </div>
              <CodeViewer
                selectedVariantId={selectedVariantId}
                onSelectVariant={setSelectedVariantId}
                highlightRange={highlightRange}
                onDownloadScript={handleDownloadScript}
              />
            </div>
          </section>
        )}

        {activeTab === 'terminal' && (
          <section className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Ambiente Interativo</span>
                <span aria-hidden="true">·</span>
                <span>Python CLI Simulator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Simulador do Terminal Python
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Teste o funcionamento exato do script Python aqui mesmo no seu navegador. Digite opções,
                faça contas, teste números decimais ou tente dividir por zero para ver o tratamento de erro em ação!
              </p>
            </div>

            <PythonTerminalSimulator />
          </section>
        )}

        {activeTab === 'visual' && (
          <section className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Interface Gráfica</span>
                <span aria-hidden="true">·</span>
                <span>Mapeamento de Funções</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Calculadora Visual com Mapeamento Python
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Esta interface visual demonstra como botões de uma aplicação gráfica (como Tkinter, PyQt ou Web)
                se conectam diretamente às funções Python que definimos (<code className="text-emerald-400 font-mono">somar</code>,{' '}
                <code className="text-emerald-400 font-mono">subtrair</code>, etc.).
              </p>
            </div>

            <VisualCalculatorSimulator />
          </section>
        )}

        {/* Best Practices and Execution Section */}
        <BestPracticesGuide />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Calculadora em Python</span>
            <span aria-hidden="true">·</span>
            <span>Código Aberto e Didático</span>
          </div>
          <div>
            <span>Desenvolvido seguindo as diretrizes PEP 8 e padrões de código limpo.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
