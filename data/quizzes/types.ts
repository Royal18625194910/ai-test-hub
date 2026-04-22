export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  score: Record<string, number>;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  results: Result[];
  icon: string;
  color: string;
  resultCalculator?: 'simple' | 'mbti';
}

export interface Result {
  id: string;
  title: string;
  description: string;
  minScore?: number;
  maxScore?: number;
  type: string;
  mbtiType?: string;
}

export interface MBTIDimensionScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}
