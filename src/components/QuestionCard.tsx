import { useState } from "react"
import type { Pillar, QuestionType } from "../types"

const OPTIONS_MATURITY = [
  { value: 1, label: "Non implementato" },
  { value: 2, label: "In valutazione" },
  { value: 3, label: "Parzialmente adottato" },
  { value: 4, label: "Avanzato" },
  { value: 5, label: "Completamente adottato" },
]

const OPTIONS_NEED = [
  { value: 1, label: "Nessuna priorità" },
  { value: 2, label: "Bassa priorità" },
  { value: 3, label: "Media priorità" },
  { value: 4, label: "Alta priorità" },
  { value: 5, label: "Priorità critica" },
]

export default function QuestionCard({
  index,
  total,
  pillar,
  title,
  helper,
  type,
  onChange,
}: {
  index: number
  total: number
  pillar: Pillar
  title: string
  helper?: string
  type: QuestionType
  onChange: (v: number) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const OPTIONS = type === "need" ? OPTIONS_NEED : OPTIONS_MATURITY

  function handleSelect(v: number) {
    setSelected(v)
    onChange(v)
  }

  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-medium text-arrow">{pillar}</span>
        <span className="text-xs text-slate-500">{index}/{total}</span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {helper && <p className="text-slate-600 text-sm mt-1">{helper}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-4">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={`text-sm px-3 py-2 rounded-lg border text-center transition-all ${
              selected === opt.value
                ? "bg-arrow text-white border-arrow shadow-md"
                : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
