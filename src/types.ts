export type Pillar = 'Modern Infrastructure' | 'Unified Cloud Experience' | 'Secure & Resilient' | 'Business Operations';
export type Answer = {
  id: string; // question id
  score: number; // 0..5
};
export type Submission = {
  projectName: string;
  customer: string;
  dateISO: string;
  email: string;
  notes?: string;
  answers: Answer[];
  pillarScores: Record<Pillar, number>;
};