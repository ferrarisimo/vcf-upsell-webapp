import { AlertTriangle, Lightbulb, ShieldCheck } from "lucide-react"
import type { ReactNode } from "react"
import type { NarrativeBucket } from "../lib/insights"

const empty = ["Nessun elemento registrato"]

export default function InsightsPanel({ narrative }: { narrative: NarrativeBucket }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <InsightColumn
        title="Punti critici emersi"
        icon={<AlertTriangle className="w-5 h-5" />}
        tone="danger"
        items={narrative.critical.length ? narrative.critical : empty}
      />
      <InsightColumn
        title="Insight VMware Cloud Foundation"
        icon={<Lightbulb className="w-5 h-5" />}
        tone="brand"
        items={narrative.insights.length ? narrative.insights : empty}
      />
      <InsightColumn
        title="Punti di forza da preservare"
        icon={<ShieldCheck className="w-5 h-5" />}
        tone="positive"
        items={narrative.strengths.length ? narrative.strengths : empty}
      />
    </div>
  )
}

function InsightColumn({
  title,
  icon,
  items,
  tone,
}: {
  title: string
  icon: ReactNode
  items: string[]
  tone: "danger" | "brand" | "positive"
}) {
  const toneClasses: Record<"danger" | "brand" | "positive", string> = {
    danger: "bg-red-50 border-red-200 text-red-700",
    brand: "bg-sky-50 border-sky-200 text-sky-700",
    positive: "bg-emerald-50 border-emerald-200 text-emerald-700",
  }

  return (
    <div className={`p-4 rounded-2xl border ${toneClasses[tone]} space-y-3`}>
      <div className="flex items-center gap-2 font-semibold text-sm">
        <span className="inline-flex items-center justify-center rounded-full bg-white/70 p-2 text-slate-700">
          {icon}
        </span>
        {title}
      </div>
      <ul className="space-y-2 text-sm leading-relaxed">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
