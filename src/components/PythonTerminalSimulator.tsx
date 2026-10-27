import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Send,
  HelpCircle,
  Cpu,
} from 'lucide-react';
import { TerminalLog } from '../types/calculator';

type ExecutionStep =
  | 'WAITING_OPTION'
  | 'WAITING_NUM1'
  | 'WAITING_NUM2'
  | 'TERMINATED';

const INITIAL_LOGS: TerminalLog[] = [
  {
    id: '1',
    type: 'system',
    text: '$ python calculadora.py',
  },
  {
    id: '2',
    type: 'output',
    text: '================================',
  },
  {
    id: '3',
    type: 'output',
    text: '      CALCULADORA EM PYTHON     ',
  },
  {
    id: '4',
    type: 'output',
    text: '================================',
  },
  {
    id: '5',
    type: 'output',
    text: '1. Adição (+)\n2. Subtração (-)\n3. Multiplicação (*)\n4. Divisão (/)\n5. Sair',
  },
  {
    id: '6',
    type: 'output',
    text: '--------------------------------',
  },
  {
    id: '7',
    type: 'system',
    text: 'Escolha uma opção (1-5):',
  },
];

export const PythonTerminalSimulator: React.FC = () => {
  const [logs, setLogs] = useState<TerminalLog[]>(INITIAL_LOGS);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<ExecutionStep>('WAITING_OPTION');
  const [selectedOp, setSelectedOp] = useState<string | null>(null);
  const [num1, setNum1] = useState<number | null>(null);
  const [activeCallTrace, setActiveCallTrace] = useState<string>(
    'main() -> loop while True ativo'
  );

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Focus input automatically
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const getMenuText = () => {
    return `\n================================\n      CALCULADORA EM PYTHON     \n================================\n1. Adição (+)\n2. Subtração (-)\n3. Multiplicação (*)\n4. Divisão (/)\n5. Sair\n--------------------------------`;
  };

  const executeInput = (rawVal: string) => {
    const val = rawVal.trim();
    if (!val) return;

    const userLog: TerminalLog = {
      id: Math.random().toString(),
      type: 'input',
      text: val,
    };

    if (currentStep === 'WAITING_OPTION') {
      if (val === '5') {
        setLogs((prev) => [
          ...prev,
          userLog,
          {
            id: Math.random().toString(),
            type: 'system',
            text: '\nObrigado por usar a calculadora! Encerrando...',
          },
          {
            id: Math.random().toString(),
            type: 'output',
            text: '[Processo finalizado com código de saída 0]',
          },
        ]);
        setCurrentStep('TERMINATED');
        setActiveCallTrace('main() -> if opcao == "5" -> break (finalizado)');
        return;
      }

      if (!['1', '2', '3', '4'].includes(val)) {
        setLogs((prev) => [
          ...prev,
          userLog,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '\nOpção inválida! Escolha um número de 1 a 5.',
          },
          {
            id: Math.random().toString(),
            type: 'output',
            text: getMenuText(),
          },
          {
            id: Math.random().toString(),
            type: 'system',
            text: 'Escolha uma opção (1-5):',
          },
        ]);
        setActiveCallTrace('if opcao not in ("1", "2", "3", "4") -> continue');
        return;
      }

      // Valid option chosen
      setSelectedOp(val);
      setCurrentStep('WAITING_NUM1');
      setLogs((prev) => [
        ...prev,
        userLog,
        {
          id: Math.random().toString(),
          type: 'system',
          text: '\nDigite o primeiro número:',
        },
      ]);
      setActiveCallTrace(
        `opcao = "${val}" -> chamando obter_numero("Digite o primeiro número: ")`
      );
      return;
    }

    if (currentStep === 'WAITING_NUM1') {
      // Validate float
      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        setLogs((prev) => [
          ...prev,
          userLog,
          {
            id: Math.random().toString(),
            type: 'error',
            text: 'Entrada inválida! Por favor, digite um número válido.',
          },
          {
            id: Math.random().toString(),
            type: 'system',
            text: 'Digite o primeiro número:',
          },
        ]);
        setActiveCallTrace('try: float(input()) -> except ValueError: acionado!');
        return;
      }

      setNum1(parsed);
      setCurrentStep('WAITING_NUM2');
      setLogs((prev) => [
        ...prev,
        userLog,
        {
          id: Math.random().toString(),
          type: 'system',
          text: 'Digite o segundo número:',
        },
      ]);
      setActiveCallTrace(
        `num1 = ${parsed} -> chamando obter_numero("Digite o segundo número: ")`
      );
      return;
    }

    if (currentStep === 'WAITING_NUM2') {
      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        setLogs((prev) => [
          ...prev,
          userLog,
          {
            id: Math.random().toString(),
            type: 'error',
            text: 'Entrada inválida! Por favor, digite um número válido.',
          },
          {
            id: Math.random().toString(),
            type: 'system',
            text: 'Digite o segundo número:',
          },
        ]);
        setActiveCallTrace('try: float(input()) -> except ValueError: acionado!');
        return;
      }

      const n1 = num1 ?? 0;
      const n2 = parsed;

      let resText = '';
      let isErr = false;
      let trace = '';

      if (selectedOp === '1') {
        const res = n1 + n2;
        resText = `Resultado: ${n1} + ${n2} = ${res}`;
        trace = `somar(${n1}, ${n2}) -> return ${res}`;
      } else if (selectedOp === '2') {
        const res = n1 - n2;
        resText = `Resultado: ${n1} - ${n2} = ${res}`;
        trace = `subtrair(${n1}, ${n2}) -> return ${res}`;
      } else if (selectedOp === '3') {
        const res = n1 * n2;
        resText = `Resultado: ${n1} * ${n2} = ${res}`;
        trace = `multiplicar(${n1}, ${n2}) -> return ${res}`;
      } else if (selectedOp === '4') {
        if (n2 === 0) {
          resText = 'Aviso: Erro: Não é possível dividir por zero!';
          isErr = true;
          trace = `dividir(${n1}, 0) -> if b == 0 -> return "Erro: Não é possível dividir por zero!"`;
        } else {
          const res = n1 / n2;
          resText = `Resultado: ${n1} / ${n2} = ${res}`;
          trace = `dividir(${n1}, ${n2}) -> return ${res}`;
        }
      }

      setLogs((prev) => [
        ...prev,
        userLog,
        {
          id: Math.random().toString(),
          type: 'output',
          text: '\n--------------------------------',
        },
        {
          id: Math.random().toString(),
          type: isErr ? 'error' : 'success',
          text: resText,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: '--------------------------------',
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: getMenuText(),
        },
        {
          id: Math.random().toString(),
          type: 'system',
          text: 'Escolha uma opção (1-5):',
        },
      ]);

      // Reset for next operation
      setCurrentStep('WAITING_OPTION');
      setSelectedOp(null);
      setNum1(null);
      setActiveCallTrace(trace);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    executeInput(inputValue);
    setInputValue('');
  };

  const handleResetTerminal = () => {
    setLogs(INITIAL_LOGS);
    setCurrentStep('WAITING_OPTION');
    setSelectedOp(null);
    setNum1(null);
    setActiveCallTrace('main() -> reiniciado com sucesso');
    setInputValue('');
  };

  // Quick preset runner
  const runPreset = (sequence: string[], description: string) => {
    handleResetTerminal();
    let currentLogs = [...INITIAL_LOGS];

    setActiveCallTrace(`Simulação: ${description}`);

    setTimeout(() => {
      // Execute each step with tiny delays
      sequence.forEach((seqVal, idx) => {
        setTimeout(() => {
          executeInput(seqVal);
        }, (idx + 1) * 350);
      });
    }, 100);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Terminal Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {/* Mac style dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono text-slate-300 font-medium">
            Terminal Python 3 · calculadora.py
          </span>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetTerminal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Reiniciar sessão do terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Execution Call Tracer HUD */}
      <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between gap-3 text-xs font-mono overflow-x-auto">
        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-slate-500">Rastreamento de Execução:</span>
          <span className="text-emerald-300 font-semibold truncate max-w-md">
            {activeCallTrace}
          </span>
        </div>
        <div className="text-[11px] text-slate-500 shrink-0 hidden md:block">
          Passo:{' '}
          <span className="text-slate-300 font-medium">
            {currentStep === 'WAITING_OPTION'
              ? 'Aguardando Opção (1-5)'
              : currentStep === 'WAITING_NUM1'
              ? 'Lendo 1º Número'
              : currentStep === 'WAITING_NUM2'
              ? 'Lendo 2º Número'
              : 'Finalizado'}
          </span>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        onClick={handleFocus}
        className="p-5 font-mono text-xs sm:text-sm bg-slate-950/95 min-h-[380px] max-h-[500px] overflow-y-auto leading-relaxed cursor-text selection:bg-emerald-500/30"
      >
        {logs.map((log) => {
          let colorClass = 'text-slate-300';
          if (log.type === 'system') colorClass = 'text-cyan-400 font-medium';
          if (log.type === 'input')
            colorClass = 'text-emerald-400 font-bold';
          if (log.type === 'error')
            colorClass = 'text-rose-400 font-semibold';
          if (log.type === 'success')
            colorClass = 'text-emerald-300 font-bold bg-emerald-950/40 px-2 py-0.5 rounded';

          return (
            <div key={log.id} className="whitespace-pre-wrap mb-1">
              {log.type === 'input' && (
                <span className="text-slate-500 mr-2 select-none">&gt;&gt;&gt;</span>
              )}
              <span className={colorClass}>{log.text}</span>
            </div>
          );
        })}

        {/* Input prompt line when active */}
        {currentStep !== 'TERMINATED' ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-emerald-400 font-bold select-none">&gt;&gt;&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                currentStep === 'WAITING_OPTION'
                  ? 'Digite 1, 2, 3, 4 ou 5 e pressione Enter'
                  : 'Digite um número (ex: 25 ou 3.14) e pressione Enter'
              }
              className="flex-1 bg-transparent text-emerald-300 focus:outline-none placeholder:text-slate-600 font-mono text-xs sm:text-sm caret-emerald-400"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs text-slate-400 hover:text-emerald-400 p-1 rounded transition-colors"
              title="Enviar entrada"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
            <span>Programa encerrado via opção 5.</span>
            <button
              onClick={handleResetTerminal}
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              Executar novamente (python calculadora.py)
            </button>
          </div>
        )}

        <div ref={logsEndRef} />
      </div>

      {/* Quick Test Scenarios Bar */}
      <div className="p-3.5 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Cenários de Teste Rápidos (1-Clique):
          </span>
          <span className="text-[11px] text-slate-500">
            Experimente situações comuns
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => runPreset(['1', '15.5', '4.5'], 'Soma com números decimais')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 text-emerald-400" />
            <span>Soma: 15.5 + 4.5</span>
          </button>

          <button
            onClick={() => runPreset(['4', '50', '0'], 'Divisão por Zero protegida')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Testar Divisão por Zero (50 / 0)</span>
          </button>

          <button
            onClick={() => runPreset(['1', 'ola', '20', '30'], 'Validação de erro ValueError')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3 h-3 text-amber-400" />
            <span>Testar Digitação Inválida ("ola")</span>
          </button>

          <button
            onClick={() => runPreset(['3', '8', '7.5'], 'Multiplicação rápida')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 text-emerald-400" />
            <span>Multiplicação: 8 * 7.5</span>
          </button>
        </div>
      </div>
    </div>
  );
};
