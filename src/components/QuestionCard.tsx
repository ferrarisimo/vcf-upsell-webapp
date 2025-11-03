import { useState } from "react"
import type { Pillar } from "../types"

const colors: Record<Pillar, string> = {
  "Modern Infrastructure": "bg-vmware-blue/10 text-vmware-blue",
  "Unified Cloud Experience": "bg-emerald-50 text-emerald-700",
  "Secure & Resilient": "bg-rose-50 text-rose-700",
  "Business Operations": "bg-indigo-50 text-indigo-700",
}

export default function QuestionCard({
  index, total, pillar, title, helper, onChange,
}: {
  index: number; total: number; pillar: Pillar; title: string; helper?: string; onChange: (v: number) => void;
}){
  const [v, setV] = useState(0)

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[pillar]}`}>{pillar}</span>
        <span className="text-sm text-slate-500">{index}/{total}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
      {helper && <p className="mt-2 text-slate-600">{helper}</p>}

      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={5}
          step={1}
          value={v}
          onChange={(e) => { const nv = Number(e.target.value); setV(nv); onChange(nv) }}
          className="w-full accent-arrow"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
        </div>
      </div>
    </div>
  )
}
