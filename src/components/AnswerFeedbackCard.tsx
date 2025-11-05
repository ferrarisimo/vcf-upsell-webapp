import { ArrowRight } from "lucide-react"
import type { Question } from "../lib/questions"
import type { NarrativeBucket } from "../lib/insights"

export default function AnswerFeedbackCard({
  question,
  narrative,
}: {
  question: Question
  narrative: NarrativeBucket
}) {
  return (
    <div className="card p-5 border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Ultima risposta registrata</p>
          <h3 className="text-lg font-semibold text-slate-900 mt-1">{question.title}</h3>
          <p className="text-sm text-slate-500">Area: {question.pillar}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-arrow" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <FeedbackList title="Punti critici" items={narrative.critical} tone="text-red-600" />
        <FeedbackList title="Insight" items={narrative.insights} tone="text-sky-600" />
        <FeedbackList title="Forze" items={narrative.strengths} tone="text-emerald-600" />
      </div>
    </div>
  )
}

function FeedbackList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  const safeItems = items.length ? items : ["Nessun elemento"]
  return (
    <div className="space-y-2">
      <h4 className={`text-sm font-semibold ${tone}`}>{title}</h4>
      <ul className="space-y-1 text-xs text-slate-600">
        {safeItems.map((item, idx) => (
          <li key={idx} className="leading-snug">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
