import type { Pillar } from '../types'
import PillChip from './PillChip'

export default function SummaryPanel({scores}:{scores:Record<Pillar,number>}){
  const entries = Object.entries(scores) as [Pillar, number][]
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold">Sintesi maturità</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {entries.map(([pillar,score])=> (
          <div key={pillar} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <PillChip label={pillar}/>
            <span className="text-xl font-bold tabular-nums">{score.toFixed(1)}/5</span>
          </div>
        ))}
      </div>
    </div>
  )
}