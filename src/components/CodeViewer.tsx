import React, { useState } from 'react';
import { Check, Copy, Download, Code2, Sparkles, FileCode } from 'lucide-react';
import { CODE_VARIANTS } from '../data/pythonCodes';
import { CodeVariantId } from '../types/calculator';

interface CodeViewerProps {
  selectedVariantId: CodeVariantId;
  onSelectVariant: (id: CodeVariantId) => void;
  highlightRange?: [number, number] | null;
  onDownloadScript: (variantId: CodeVariantId) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  selectedVariantId,
  onSelectVariant,
  highlightRange,
  onDownloadScript,
}) => {
  const [copied, setCopied] = useState(false);

  const currentVariant =
    CODE_VARIANTS.find((v) => v.id === selectedVariantId) || CODE_VARIANTS[0];

  const lines = currentVariant.code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentVariant.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = currentVariant.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper syntax highlighting for Python lines
  const renderHighlightedLine = (line: string) => {
    // Comments
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    // Docstrings
    if (line.trim().startsWith('"""') || line.trim().startsWith("'''")) {
      return <span className="text-amber-300/80 italic">{line}</span>;
    }

    // Replace keywords and patterns safely using regex segmentation
    const tokenRegex =
      /(\b(?:def|return|if|elif|else|while|try|except|break|continue|match|case|class|from|import|in|not|is|None|True|False)\b)|(\b(?:float|int|str|print|input|isinstance|range|enumerate|len)\b)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(#.*$)/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }

      if (match[1]) {
        // Keywords
        parts.push(
          <span key={match.index} className="text-violet-400 font-semibold">
            {match[1]}
          </span>
        );
      } else if (match[2]) {
        // Builtins & Types
        parts.push(
          <span key={match.index} className="text-cyan-400">
            {match[2]}
          </span>
        );
      } else if (match[3]) {
        // Strings
        parts.push(
          <span key={match.index} className="text-emerald-300">
            {match[3]}
          </span>
        );
      } else if (match[4]) {
        // Numbers
        parts.push(
          <span key={match.index} className="text-amber-400">
            {match[4]}
          </span>
        );
      } else if (match[5]) {
        // Inline comment
        parts.push(
          <span key={match.index} className="text-slate-500 italic">
            {match[5]}
          </span>
        );
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts.length > 0 ? parts : line;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-emerald-400">python 3.x</span>
            <span aria-hidden="true">·</span>
            <span>{currentVariant.fileName}</span>
            <span aria-hidden="true">·</span>
            <span>{lines.length} linhas</span>
            <span aria-hidden="true">·</span>
            <span>PEP 8 compatível</span>
          </div>
          <h2 className="text-base font-semibold text-white mt-1 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-emerald-400" />
            {currentVariant.title}
          </h2>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={() => onDownloadScript(currentVariant.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all"
            title="Baixar arquivo Python"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Variant Selector Tabs */}
      <div className="flex items-center gap-1 p-2 bg-slate-950/40 border-b border-slate-800/80 overflow-x-auto">
        {CODE_VARIANTS.map((variant) => {
          const isActive = variant.id === selectedVariantId;
          return (
            <button
              key={variant.id}
              onClick={() => onSelectVariant(variant.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span>{variant.title}</span>
              <span className="text-[10px] text-slate-500">
                ({variant.badge})
              </span>
            </button>
          );
        })}
      </div>

      {/* Code Display Area */}
      <div className="relative font-mono text-[13px] leading-6 overflow-x-auto max-h-[640px] p-4 bg-slate-950/80">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted =
                highlightRange &&
                lineNumber >= highlightRange[0] &&
                lineNumber <= highlightRange[1];

              return (
                <tr
                  key={lineNumber}
                  className={`transition-colors ${
                    isHighlighted
                      ? 'bg-emerald-500/10 border-l-2 border-emerald-400'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="w-12 select-none text-right pr-4 text-slate-600 font-mono text-xs align-top tabular-nums">
                    {lineNumber}
                  </td>
                  <td className="text-slate-300 whitespace-pre font-mono">
                    {renderHighlightedLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer info banner */}
      <div className="px-4 py-3 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            Para executar no seu computador: salve como{' '}
            <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
              {currentVariant.fileName}
            </code>{' '}
            e execute no terminal com{' '}
            <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
              python {currentVariant.fileName}
            </code>
          </span>
        </div>
      </div>
    </div>
  );
};
