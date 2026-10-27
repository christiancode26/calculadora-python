export type CodeVariantId = 'standard' | 'match_case' | 'oop';

export interface CodeVariant {
  id: CodeVariantId;
  title: string;
  badge: string;
  description: string;
  fileName: string;
  code: string;
}

export interface CodeComponentExplanation {
  id: string;
  name: string;
  iconName: string;
  summary: string;
  whyItMatters: string;
  codeSnippet: string;
  keyConcepts: string[];
  commonMistakes: string;
  linesReference?: [number, number];
}

export interface TerminalLog {
  id: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success' | 'highlight';
  text: string;
  timestamp?: string;
}
