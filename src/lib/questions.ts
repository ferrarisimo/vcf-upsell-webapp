import type { NarrativeBucket, Pillar, QuestionType } from "../types"
import questionBankRaw from "../data/question-bank.json?raw"

export type Question = {
  id: string
  pillar: Pillar
  title: string
  helper?: string
  type: QuestionType
}

type NarrativeFragment = Partial<NarrativeBucket>

export type QuestionNarratives = {
  low?: NarrativeFragment
  mid?: NarrativeFragment
  high?: NarrativeFragment
}

export type QuestionBankEntry = Question & {
  narratives: QuestionNarratives
}

const parsedQuestionBank = JSON.parse(questionBankRaw) as QuestionBankEntry[]

export const QUESTION_BANK: QuestionBankEntry[] = parsedQuestionBank

export const QUESTIONS: Question[] = QUESTION_BANK.map(({ narratives, ...question }) => question)

export const QUESTION_NARRATIVES: Record<string, QuestionNarratives> = QUESTION_BANK.reduce(
  (acc, entry) => {
    acc[entry.id] = entry.narratives
    return acc
  },
  {} as Record<string, QuestionNarratives>,
)
