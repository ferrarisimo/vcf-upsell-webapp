export type Pillar = 'Modern Infrastructure' | 'Unified Cloud Experience' | 'Secure & Resilient' | 'Business Operations';
export type QuestionType = 'maturity' | 'need';
export type Answer = {
  id: string; // question id
  pillar: Pillar;
  type: QuestionType;
  score: number; // 0..5
};

export type NarrativeBucket = {
  critical: string[];
  insights: string[];
  strengths: string[];
};

export type BaselineContext = {
  currentVersion: string;
  hosts: number;
  cpusPerHost: number;
  coresPerCpu: number;
};
export type Submission = {
  projectName: string;
  customer: string;
  dateISO: string;
  email: string;
  notes?: string;
  answers: Answer[];
  pillarScores: Record<Pillar, number>;
  maturityScores: Record<Pillar, number>;
  needScores: Record<Pillar, number>;
};