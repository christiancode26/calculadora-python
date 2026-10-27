import React, { useState } from 'react';
import {
  Calculator,
  Layout,
  ShieldCheck,
  Repeat,
  Sparkles,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { PYTHON_COMPONENTS_EXPLANATIONS } from '../data/pythonCodes';
import { CodeComponentExplanation } from '../types/calculator';

interface ComponentsBreakdownProps {
  onHighlightComponent: (lines: [number, number]) => void;
}

export const ComponentsBreakdown: React.FC<ComponentsBreakdownProps> = ({
  onHighlightComponent,
}) => {
  const [copiedDoc, setCopiedDoc] = useState(false);
  const [expandedId, setExpandedId] = useState<string>(
    PYTHON_COMPONENTS_EXPLANATIONS[0].id
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-emerald-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'Repeat':
        return <Repeat className="w-5 h-5 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-violet-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-emerald-300" />;
      default:
        return <Calculator className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleCopyFullDocumentation = async () => {
    const markdown = `# GUIA COMPLETO: CALCULADORA BÁSICA EM PYTHON
    
Este guia explica passo a passo a arquitetura, lógica e boas práticas do código da calculadora em Python que realiza as 4 operações matemáticas básicas (Adição, Subtração, Multiplicação e Divisão).

${PYTHON_COMPONENTS_EXPLANATIONS.map(
  (c) => `## ${c.name}

### Resumo
${c.summary}

### Por que é importante?
${c.whyItMatters}

### Trecho de Código
\`\`\`python
${c.codeSnippet}
\`\`\`

### Conceitos-Chave
${c.keyConcepts.map((k) => `- ${k}`).join('\n')}

### Erro Comum a Evitar
> ${c.commonMistakes}
`
).join('\n---\n\n')}
`;

    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedDoc(true);
      setTimeout(() => setCopiedDoc(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = markdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedDoc(true);
      setTimeout(() => setCopiedDoc(false), 2000);
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Guia Didático</span>
            <span aria-hidden="true">·</span>
            <span>6 Componentes Essenciais</span>
            <span aria-hidden="true">·</span>
            <span>Estruturado e Didático</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Anatomia e Explicação dos Componentes
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Cada parte de uma calculadora profissional em Python foi desenhada
            com um propósito específico. Clique nos blocos abaixo para explorar o
            funcionamento interno e boas práticas.
          </p>
        </div>

        <button
          onClick={handleCopyFullDocumentation}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 self-start sm:self-auto ${
            copiedDoc
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
          }`}
          title="Copiar todas as explicações em formato Markdown formatado"
        >
          {copiedDoc ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Explicação Copiada!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Explicação em Markdown</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {PYTHON_COMPONENTS_EXPLANATIONS.map((component: CodeComponentExplanation) => {
          const isSelected = expandedId === component.id;

          return (
            <div
              key={component.id}
              onClick={() => {
                setExpandedId(component.id);
                if (component.linesReference) {
                  onHighlightComponent(component.linesReference);
                }
              }}
              className={`cursor-pointer rounded-xl p-5 transition-all text-left border ${
                isSelected
                  ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/20'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  {getIcon(component.iconName)}
                </div>
                {component.linesReference && (
                  <span className="text-xs font-mono text-slate-500">
                    Linhas {component.linesReference[0]}-{component.linesReference[1]}
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold text-white mb-1.5">
                {component.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {component.summary}
              </p>

              <div className="flex items-center text-xs font-medium text-emerald-400 group">
                <span>{isSelected ? 'Em foco' : 'Ver detalhes completos'}</span>
                <ArrowRight
                  className={`w-3.5 h-3.5 ml-1 transition-transform ${
                    isSelected ? 'translate-x-1' : ''
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Active Component View */}
      {(() => {
        const activeComp =
          PYTHON_COMPONENTS_EXPLANATIONS.find((c) => c.id === expandedId) ||
          PYTHON_COMPONENTS_EXPLANATIONS[0];

        return (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-7 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                  {getIcon(activeComp.iconName)}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">
                    Detalhamento do Componente
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activeComp.name}
                  </h3>
                </div>
              </div>

              {activeComp.linesReference && (
                <button
                  onClick={() => onHighlightComponent(activeComp.linesReference!)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-1.5 self-start md:self-auto"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Destacar Linhas {activeComp.linesReference[0]}-{activeComp.linesReference[1]} no Código</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Left Column: Explanations & Concepts */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    O que é e o que faz
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeComp.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">
                    Por que isso importa na prática
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                    {activeComp.whyItMatters}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Conceitos-Chave da Linguagem Python
                  </h4>
                  <ul className="space-y-2">
                    {activeComp.keyConcepts.map((concept, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Erro comum de iniciantes</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {activeComp.commonMistakes}
                  </p>
                </div>
              </div>

              {/* Right Column: Code Snippet */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 rounded-t-lg border-t border-x border-slate-800 text-xs text-slate-400 font-mono">
                  <span>trecho_python.py</span>
                  <span className="text-emerald-400">Python 3</span>
                </div>
                <pre className="p-4 bg-slate-950 rounded-b-lg border border-slate-800 font-mono text-xs text-emerald-300 leading-6 overflow-x-auto flex-1">
                  <code>{activeComp.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};
