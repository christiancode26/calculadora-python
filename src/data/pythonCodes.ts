import { CodeComponentExplanation, CodeVariant } from '../types/calculator';

export const STANDARD_PYTHON_CODE = `# ==============================================================================
# CALCULADORA BÁSICA EM PYTHON
# Operações: Adição, Subtração, Multiplicação e Divisão
# ==============================================================================

def somar(a: float, b: float) -> float:
    """Retorna a soma de dois números."""
    return a + b


def subtrair(a: float, b: float) -> float:
    """Retorna a subtração entre dois números."""
    return a - b


def multiplicar(a: float, b: float) -> float:
    """Retorna o produto da multiplicação de dois números."""
    return a * b


def dividir(a: float, b: float) -> float | str:
    """
    Retorna a divisão do primeiro número pelo segundo.
    Evita divisão por zero retornando uma mensagem de erro clara.
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b


def exibir_menu() -> None:
    """Exibe o menu de opções formatado no terminal."""
    print("\\n" + "=" * 32)
    print("      CALCULADORA EM PYTHON     ")
    print("=" * 32)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair")
    print("-" * 32)


def obter_numero(mensagem: str) -> float:
    """
    Solicita um número ao usuário e valida a entrada com try/except.
    Repete até que o usuário forneça um valor numérico válido.
    """
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("Entrada inválida! Por favor, digite um número válido.")


def main() -> None:
    """Função principal que coordena o fluxo da calculadora."""
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-5): ").strip()

        if opcao == "5":
            print("\\nObrigado por usar a calculadora! Encerrando...")
            break

        if opcao not in ("1", "2", "3", "4"):
            print("\\nOpção inválida! Escolha um número de 1 a 5.")
            continue

        # Coleta os dois números com validação
        num1 = obter_numero("\\nDigite o primeiro número: ")
        num2 = obter_numero("Digite o segundo número: ")

        # Executa a operação correspondente
        if opcao == "1":
            resultado = somar(num1, num2)
            operador = "+"
        elif opcao == "2":
            resultado = subtrair(num1, num2)
            operador = "-"
        elif opcao == "3":
            resultado = multiplicar(num1, num2)
            operador = "*"
        elif opcao == "4":
            resultado = dividir(num1, num2)
            operador = "/"

        # Exibição do resultado
        print("\\n" + "-" * 32)
        if isinstance(resultado, str):
            print(f"Aviso: {resultado}")
        else:
            print(f"Resultado: {num1} {operador} {num2} = {resultado}")
        print("-" * 32)


if __name__ == "__main__":
    main()
`;

export const MATCH_CASE_PYTHON_CODE = `# ==============================================================================
# CALCULADORA MODERNA EM PYTHON (Python 3.10+)
# Utiliza Pattern Matching (match / case) e Type Hints
# ==============================================================================

def calcular(num1: float, num2: float, operacao: str) -> float | str:
    """Executa a operação matemática usando match-case idiomático."""
    match operacao:
        case "1" | "+":
            return num1 + num2
        case "2" | "-":
            return num1 - num2
        case "3" | "*":
            return num1 * num2
        case "4" | "/":
            return num1 / num2 if num2 != 0 else "Erro: Divisão por zero!"
        case _:
            return "Operação desconhecida"


def main() -> None:
    simbolos = {"1": "+", "2": "-", "3": "*", "4": "/"}
    
    while True:
        print("\\n--- CALCULADORA MODERNA (Python 3.10+) ---")
        print("1. [+] Somar | 2. [-] Subtrair | 3. [*] Multiplicar | 4. [/] Dividir | 5. Sair")
        
        opcao = input("Opção desejada (1-5): ").strip()
        if opcao == "5":
            print("Programa finalizado.")
            break
            
        if opcao not in simbolos:
            print("Opção inválida! Tente novamente.")
            continue

        try:
            n1 = float(input("1º valor: "))
            n2 = float(input("2º valor: "))
        except ValueError:
            print("Erro: Apenas valores numéricos são aceitos!")
            continue

        res = calcular(n1, n2, opcao)
        simbolo = simbolos[opcao]
        
        if isinstance(res, str):
            print(f"Atenção: {res}")
        else:
            print(f">>> {n1} {simbolo} {n2} = {res}")


if __name__ == "__main__":
    main()
`;

export const OOP_PYTHON_CODE = `# ==============================================================================
# CALCULADORA ORIENTADA A OBJETOS (POO) EM PYTHON
# Encapsulamento com classe, histórico de cálculos e métodos estáticos
# ==============================================================================
from dataclasses import dataclass
from typing import List


@dataclass
class RegistroCalculo:
    num1: float
    num2: float
    operador: str
    resultado: float | str


class Calculadora:
    """Classe responsável pelas operações e histórico da calculadora."""

    def __init__(self) -> None:
        self.historico: List[RegistroCalculo] = []

    def somar(self, a: float, b: float) -> float:
        res = a + b
        self._registrar(a, b, "+", res)
        return res

    def subtrair(self, a: float, b: float) -> float:
        res = a - b
        self._registrar(a, b, "-", res)
        return res

    def multiplicar(self, a: float, b: float) -> float:
        res = a * b
        self._registrar(a, b, "*", res)
        return res

    def dividir(self, a: float, b: float) -> float | str:
        if b == 0:
            res = "Erro: Divisão por zero"
        else:
            res = a / b
        self._registrar(a, b, "/", res)
        return res

    def _registrar(self, a: float, b: float, op: str, res: float | str) -> None:
        self.historico.append(RegistroCalculo(a, b, op, res))

    def exibir_historico(self) -> None:
        if not self.historico:
            print("Histórico vazio.")
            return
        print("\\n--- Histórico de Operações ---")
        for i, reg in enumerate(self.historico, start=1):
            print(f"{i}. {reg.num1} {reg.operador} {reg.num2} = {reg.resultado}")


def main() -> None:
    calc = Calculadora()
    print("Instância de Calculadora pronta. Execute métodos como calc.somar(10, 5)!")


if __name__ == "__main__":
    main()
`;

export const CODE_VARIANTS: CodeVariant[] = [
  {
    id: 'standard',
    title: 'Padrão / Modular (Recomendado)',
    badge: 'Iniciante & Intermediário',
    description: 'Funções independentes, validação de tipos, proteção contra divisão por zero e loop interativo.',
    fileName: 'calculadora.py',
    code: STANDARD_PYTHON_CODE,
  },
  {
    id: 'match_case',
    title: 'Moderno com match / case',
    badge: 'Python 3.10+',
    description: 'Código compacto aproveitando o Pattern Matching estrutural nativo do Python 3.10 ou superior.',
    fileName: 'calculadora_moderna.py',
    code: MATCH_CASE_PYTHON_CODE,
  },
  {
    id: 'oop',
    title: 'Orientada a Objetos (POO)',
    badge: 'Avançado & Extensível',
    description: 'Encapsulamento com classe Calculadora, métodos específicos e histórico de cálculos realizados.',
    fileName: 'calculadora_poo.py',
    code: OOP_PYTHON_CODE,
  },
];

export const PYTHON_COMPONENTS_EXPLANATIONS: CodeComponentExplanation[] = [
  {
    id: 'funcoes-matematicas',
    name: '1. Funções Matemáticas Puras (def)',
    iconName: 'Calculator',
    summary: 'Cada operação matemática é isolada em sua própria função com parâmetros claros e valor de retorno.',
    whyItMatters: 'Modularidade e Reutilização: Se você precisar calcular a soma em outra parte do código ou criar testes unitários automatizados (pytest), você só precisa chamar somar(a, b) sem reescrever a lógica.',
    codeSnippet: `def somar(a: float, b: float) -> float:
    return a + b

def dividir(a: float, b: float) -> float | str:
    # Tratamento obrigatório: matematicamente a divisão por zero é indefinida
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b`,
    keyConcepts: [
      'def: Palavra-chave do Python para definir uma função.',
      'Parâmetros (a, b): As variáveis que recebem os números a serem processados.',
      'return: Envia o resultado de volta para quem chamou a função.',
      'Proteção if b == 0: Impede que o Python lance a exceção fatal ZeroDivisionError.',
      'Type Hints (a: float, b: float): Auxilia editores de código e desenvolvedores a saberem o tipo esperado.',
    ],
    commonMistakes: 'Usar print() em vez de return dentro da função matemática. Usar print impede que o resultado seja aproveitado em outras contas posteriores.',
    linesReference: [6, 28],
  },
  {
    id: 'menu-interface',
    name: '2. Menu de Navegação e Apresentação',
    iconName: 'Layout',
    summary: 'Apresenta ao usuário as opções numéricas disponíveis de forma visualmente limpa e legível no console.',
    whyItMatters: 'Experiência do Usuário (UX): Um bom programa de linha de comando guia o usuário com clareza sobre o que ele pode ou não fazer, reduzindo erros de uso.',
    codeSnippet: `def exibir_menu() -> None:
    print("\\n" + "=" * 32)
    print("      CALCULADORA EM PYTHON     ")
    print("=" * 32)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair")
    print("-" * 32)`,
    keyConcepts: [
      'Multiplicação de strings: "=" * 32 cria uma linha divisória perfeita de 32 caracteres.',
      '\\n: Caractere especial que pula uma linha para deixar a saída arejada.',
      'Opções numeradas: Facilitam a escolha (digitar "1" é muito mais rápido e imune a erros do que digitar "Adição").',
    ],
    commonMistakes: 'Misturar a exibição do menu com a leitura de valores dentro da mesma função, dificultando a manutenção.',
    linesReference: [31, 41],
  },
  {
    id: 'validacao-entradas',
    name: '3. Validação de Entradas com try / except',
    iconName: 'ShieldCheck',
    summary: 'Garante que o programa não quebre caso o usuário digite texto, letras ou símbolos onde é esperado um número.',
    whyItMatters: 'Robustez e Tolerância a Falhas: Sem essa validação, se alguém digitar "dez" ou uma letra por engano, o Python dispara um ValueError e fecha o programa abruptamente.',
    codeSnippet: `def obter_numero(mensagem: str) -> float:
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("Entrada inválida! Por favor, digite um número válido.")`,
    keyConcepts: [
      'input(): Função nativa do Python que lê a digitação do usuário sempre como texto (string).',
      'float(): Converte a string lida para número decimal (suporta tanto 10 quanto 10.5).',
      'try...except ValueError: Se a conversão float() falhar (ex: usuário digitou "abc"), o bloco except é acionado em vez de travar o programa.',
      'while True: Mantém a pergunta ativa até que uma entrada válida seja fornecida.',
    ],
    commonMistakes: 'Usar apenas int() em vez de float(), o que impede o usuário de calcular números quebrados como 2.5 ou 0.75.',
    linesReference: [44, 53],
  },
  {
    id: 'loop-controle-fluxo',
    name: '4. Loop Principal e Tomada de Decisão',
    iconName: 'Repeat',
    summary: 'O loop while True mantém a calculadora ativa para várias contas, e os if/elif/else direcionam a escolha.',
    whyItMatters: 'Fluxo Contínuo: O usuário não precisa abrir o terminal e rodar python calculadora.py novamente para cada cálculo individual.',
    codeSnippet: `while True:
    exibir_menu()
    opcao = input("Escolha uma opção (1-5): ").strip()

    if opcao == "5":
        print("Encerrando...")
        break  # Interrompe o loop e finaliza

    if opcao not in ("1", "2", "3", "4"):
        print("Opção inválida! Escolha de 1 a 5.")
        continue  # Reinicia o loop sem pedir números`,
    keyConcepts: [
      'while True: Cria um laço infinito intencional que só termina quando acionamos o comando break.',
      '.strip(): Remove espaços acidentais antes ou depois da digitação (ex: " 1 ").',
      'break: Quebra o loop imediatamente, permitindo sair do programa de forma graciosa.',
      'continue: Pula imediatamente para a próxima repetição do loop, ignorando os passos seguintes caso a opção seja inválida.',
    ],
    commonMistakes: 'Esquecer de colocar a condição de saída (break), prendendo o usuário em um loop infinito sem volta.',
    linesReference: [56, 102],
  },
  {
    id: 'saida-fstrings',
    name: '5. Interpolação de Saída com f-strings',
    iconName: 'Sparkles',
    summary: 'Formatação moderna, elegante e legível de mensagens no terminal combinando variáveis e texto.',
    whyItMatters: 'Legibilidade do Código: As f-strings (introduzidas no Python 3.6) são mais rápidas e infinitamente mais legíveis que a concatenação com "+" ou o antigo formato .format().',
    codeSnippet: `# Exibição limpa com f-strings:
print(f"Resultado: {num1} {operador} {num2} = {resultado}")

# Comparação com o modo antigo (evitar):
# print("Resultado: " + str(num1) + " " + operador + " " + str(num2) + " = " + str(resultado))`,
    keyConcepts: [
      'Prefixo f ou F antes das aspas indica que chaves {} contêm variáveis ou expressões Python.',
      'Valores são automaticamente convertidos para texto dentro das chaves.',
      'Pode formatar casas decimais: f"{resultado:.2f}" arredonda para 2 casas.',
    ],
    commonMistakes: 'Esquecer o caractere "f" antes das aspas, fazendo com que o texto imprima literalmente as chaves "{num1}".',
    linesReference: [92, 98],
  },
  {
    id: 'boas-praticas-pep8',
    name: '6. Convenções PEP 8 e Boas Práticas',
    iconName: 'BookOpen',
    summary: 'Padrões oficiais da comunidade Python para código limpo, profissional e de fácil leitura.',
    whyItMatters: 'Empregabilidade e Colaboração: Código em conformidade com a PEP 8 é o padrão exigido em equipes de desenvolvimento no mundo inteiro.',
    codeSnippet: `# if __name__ == "__main__":
# Permite que este arquivo seja executado diretamente ou importado por outro script
if __name__ == "__main__":
    main()`,
    keyConcepts: [
      'snake_case: Nomes de funções e variáveis em minúsculas separadas por underline (ex: exibir_menu, num1).',
      'Docstrings ("""..."""): Documentação padronizada na primeira linha das funções.',
      'Espaçamento: Duas linhas em branco entre funções de nível superior.',
      'Bloco __name__ == "__main__": Boa prática universal em scripts Python.',
    ],
    commonMistakes: 'Usar CamelCase (ex: ExibirMenu) para funções em Python, o que vai contra a convenção padrão.',
    linesReference: [105, 106],
  },
];
