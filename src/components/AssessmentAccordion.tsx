import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import QuestionCard from "./QuestionCard"
import type { Pillar, Answer } from "../types"
import { aggregate } from "../lib/scoring"

type AccordionProps = {
  pillar: Pillar
  questions: { id: string; title: string; helper?: string }[]
  onChange: (answers: Answer[]) => void
}

export default function AssessmentAccordion({ pillar, questions, onChange }: AccordionProps) {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])

  function updateAnswer(id: string, score: number) {
    const updated = answers.some(a => a.id === id)
      ? answers.map(a => (a.id === id ? { ...a, score } : a))
      : [...answers, { id, score }]
    setAnswers(updated)
    onChange(updated)
  }

  const { pillarScores } = aggregate(answers)
  const average = pillarScores[pillar] ?? 0

  return (
    <div className="card p-0 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{pillar}</h3>
          <p className="text-sm text-slate-500">
            Punteggio medio:{" "}
            <span className="font-bold text-arrow">{average ? average.toFixed(1) : "–"}/5</span>
          </p>
        </div>
        {open ? <ChevronUp className="h-5 w-5 text-arrow" /> : <ChevronDown className="h-5 w-5 text-arrow" />}
      </button>

      {open && (
        <div className="divide-y divide-slate-100 bg-white">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-6">
              <QuestionCard
                index={idx + 1}
                total={questions.length}
                pillar={pillar}
                title={q.title}
                helper={q.helper}
                onChange={(v) => updateAnswer(q.id, v)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
