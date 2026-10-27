import React, { useState } from 'react';
import {
  Calculator as CalcIcon,
  RotateCcw,
  Code2,
  Check,
  History,
  Delete,
} from 'lucide-react';

interface CalculationHistoryItem {
  id: string;
  expression: string;
  pythonCall: string;
  result: string | number;
  time: string;
}

export const VisualCalculatorSimulator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [lastPythonCall, setLastPythonCall] = useState<string>(
    'Pronto para executar funções Python'
  );
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  const handleDigit = (digit: string) => {
    if (waitingForNext) {
      setDisplay(digit);
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForNext) {
      setDisplay('0.');
      setWaitingForNext(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNext(false);
    setLastPythonCall('Valores redefinidos');
  };

  const handleBackspace = () => {
    if (waitingForNext) return;
    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleOperator = (nextOp: string) => {
    const currentNum = parseFloat(display);

    if (previousValue !== null && operator && !waitingForNext) {
      // Calculate intermediate result
      calculateResult(previousValue, currentNum, operator);
    } else {
      setPreviousValue(currentNum);
    }

    setOperator(nextOp);
    setWaitingForNext(true);
  };

  const calculateResult = (n1: number, n2: number, op: string) => {
    let res: number | string = 0;
    let callString = '';

    if (op === '+') {
      res = n1 + n2;
      callString = `somar(${n1}, ${n2}) -> return ${res}`;
    } else if (op === '-') {
      res = n1 - n2;
      callString = `subtrair(${n1}, ${n2}) -> return ${res}`;
    } else if (op === '*') {
      res = n1 * n2;
      callString = `multiplicar(${n1}, ${n2}) -> return ${res}`;
    } else if (op === '/') {
      if (n2 === 0) {
        res = 'Erro: Divisão por zero!';
        callString = `dividir(${n1}, 0) -> return "Erro: Não é possível dividir por zero!"`;
      } else {
        res = n1 / n2;
        callString = `dividir(${n1}, ${n2}) -> return ${res}`;
      }
    }

    const resultStr = typeof res === 'number' ? String(res) : res;
    setDisplay(resultStr);
    setLastPythonCall(callString);
    setPreviousValue(typeof res === 'number' ? res : null);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setHistory((prev) => [
      {
        id: Math.random().toString(),
        expression: `${n1} ${op} ${n2}`,
        pythonCall: callString,
        result: res,
        time: timeStr,
      },
      ...prev.slice(0, 7),
    ]);

    return res;
  };

  const handleEquals = () => {
    if (previousValue === null || !operator) return;
    const currentNum = parseFloat(display);
    calculateResult(previousValue, currentNum, operator);
    setOperator(null);
    setWaitingForNext(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Visual Calculator Card */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CalcIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-white">
                Calculadora Visual Interativa
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Limpar calculadora (C)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            </div>
          </div>

          {/* Display screen */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-5 border border-slate-800/80 mb-5 shadow-inner">
            <div className="text-right text-xs font-mono text-slate-500 h-5 overflow-hidden">
              {previousValue !== null && operator
                ? `${previousValue} ${operator} ${waitingForNext ? '' : display}`
                : ''}
            </div>
            <div className="text-right text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight overflow-x-auto whitespace-nowrap mt-1 tabular-nums">
              {display}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-rose-400 font-semibold text-sm transition-colors"
            >
              C
            </button>
            <button
              onClick={handleBackspace}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-medium text-sm flex items-center justify-center transition-colors"
            >
              <Delete className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const val = parseFloat(display);
                setDisplay(String(-val));
              }}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-medium text-sm transition-colors"
            >
              +/-
            </button>
            <button
              onClick={() => handleOperator('/')}
              className={`py-3 sm:py-3.5 rounded-lg font-bold text-base transition-colors ${
                operator === '/'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              /
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleDigit('7')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              7
            </button>
            <button
              onClick={() => handleDigit('8')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              8
            </button>
            <button
              onClick={() => handleDigit('9')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('*')}
              className={`py-3 sm:py-3.5 rounded-lg font-bold text-base transition-colors ${
                operator === '*'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              *
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleDigit('4')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              4
            </button>
            <button
              onClick={() => handleDigit('5')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              5
            </button>
            <button
              onClick={() => handleDigit('6')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('-')}
              className={`py-3 sm:py-3.5 rounded-lg font-bold text-base transition-colors ${
                operator === '-'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              -
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleDigit('1')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              1
            </button>
            <button
              onClick={() => handleDigit('2')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              2
            </button>
            <button
              onClick={() => handleDigit('3')}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              3
            </button>
            <button
              onClick={() => handleOperator('+')}
              className={`py-3 sm:py-3.5 rounded-lg font-bold text-base transition-colors ${
                operator === '+'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => handleDigit('0')}
              className="col-span-2 py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="py-3 sm:py-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-white font-medium text-lg transition-colors border border-slate-800"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="py-3 sm:py-3.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-lg shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
            >
              =
            </button>
          </div>
        </div>

        {/* Live Python Call mapping bar */}
        <div className="mt-5 p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2.5">
          <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-xs font-mono truncate">
            <span className="text-slate-500">Mapeamento Python: </span>
            <span className="text-emerald-300 font-semibold">
              {lastPythonCall}
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Calculation History and Python Bridge */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">
                Histórico & Chamadas Python
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {history.length} operações
            </span>
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              <p>Nenhuma operação realizada nesta sessão.</p>
              <p className="mt-1">
                Use os botões da calculadora ao lado para ver as chamadas Python em tempo real!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 font-mono text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span>{item.expression}</span>
                    <span className="text-slate-600">{item.time}</span>
                  </div>
                  <div className="text-emerald-300 font-semibold mb-1">
                    = {item.result}
                  </div>
                  <div className="text-[11px] text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800/60 truncate">
                    def {item.pythonCall}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informative footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
          <p>
            💡 <strong className="text-slate-200">Dica Didática:</strong> Na interface gráfica, cada clique no operador seleciona qual função ({' '}
            <code className="text-emerald-300">somar</code>,{' '}
            <code className="text-emerald-300">subtrair</code>, etc.) será despachada quando o sinal de igual for acionado.
          </p>
        </div>
      </div>
    </div>
  );
};
