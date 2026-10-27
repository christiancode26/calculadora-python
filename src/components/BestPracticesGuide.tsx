import React from 'react';
import {
  CheckCircle2,
  Terminal,
  Code2,
  FileCheck,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

export const BestPracticesGuide: React.FC = () => {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Padrões de Engenharia</span>
          <span aria-hidden="true">·</span>
          <span>PEP 8</span>
          <span aria-hidden="true">·</span>
          <span>Python Moderno</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Como Rodar no seu Computador & Boas Práticas
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Dicas práticas para executar seu arquivo Python localmente e escrever
          código limpo, seguro e organizado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Como executar no Terminal */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Passo a Passo de Execução Local</span>
          </div>

          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500"># 1. Verifique se o Python está instalado:</span>
              <div className="text-emerald-300 mt-1">python --version</div>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500"># 2. Navegue até a pasta onde salvou calculadora.py:</span>
              <div className="text-emerald-300 mt-1">cd ~/Downloads</div>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500"># 3. Execute o script:</span>
              <div className="text-emerald-300 mt-1">python calculadora.py</div>
            </div>
          </div>
        </div>

        {/* Card 2: 4 Pilares do Código Organizado */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>4 Pilares do Código Limpo em Python</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-400 font-semibold shrink-0">
                1.
              </span>
              <span>
                <strong>Princípio da Responsabilidade Única:</strong> Cada função
                faz apenas uma coisa (ex: <code className="text-emerald-300">somar()</code> calcula e retorna; não lê inputs).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-400 font-semibold shrink-0">
                2.
              </span>
              <span>
                <strong>Nomenclatura Descritiva (snake_case):</strong> Nomes claros
                como <code className="text-emerald-300">obter_numero()</code> e{' '}
                <code className="text-emerald-300">exibir_menu()</code> em vez de nomes crípticos como <code className="text-rose-400">f1()</code> ou <code className="text-rose-400">calc()</code>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-400 font-semibold shrink-0">
                3.
              </span>
              <span>
                <strong>Defesa contra Falhas:</strong> Nunca confie que o usuário
                vai digitar apenas números; sempre use blocos <code className="text-emerald-300">try/except</code>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-400 font-semibold shrink-0">
                4.
              </span>
              <span>
                <strong>Type Hints e Docstrings:</strong> Especificar tipos como{' '}
                <code className="text-emerald-300">a: float</code> facilita
                autocompletar no VS Code e documenta a intenção sem ambiguidade.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
