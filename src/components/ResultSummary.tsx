import type { BaselineContext, Pillar } from "../types"

type Props = {
  baseline: BaselineContext
  pillarScores: Record<Pillar, number>
  maturityScores: Record<Pillar, number>
  needScores: Record<Pillar, number>
  totalCores: number
}

export default function ResultSummary({ baseline, pillarScores, maturityScores, needScores, totalCores }: Props) {
  const entries = Object.entries(pillarScores) as [Pillar, number][]
  const radarData = entries.map(([pillar, score]) => ({ pillar, score }))

  return (
    <div className="card p-6 space-y-6">
      <header className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Panoramica finale</h3>
        <p className="text-sm text-slate-600">
          Con {baseline.hosts} host da {baseline.cpusPerHost} CPU (≥{baseline.coresPerCpu} core) hai un potenziale di {totalCores} core totali
          equivalenti a {totalCores} TB di capacità vSAN calcolata. VCF permette di orchestrare questo patrimonio con policy unificate.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700">Mappa radar della maturità</h4>
          <RadarCanvas data={radarData} />
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-inner space-y-4">
          <h4 className="text-sm font-semibold text-slate-700">Priorità vs livello attuale</h4>
          <div className="space-y-4">
            {entries.map(([pillar, maturity]) => (
              <DualBarRow
                key={pillar}
                pillar={pillar}
                maturity={Number((maturityScores[pillar] ?? 0).toFixed(2))}
                need={Number((needScores[pillar] ?? 0).toFixed(2))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {entries.map(([pillar, score]) => (
          <div key={pillar} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{pillar}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{score.toFixed(1)}/5</p>
            <p className="text-xs text-slate-500 mt-1">
              Necessità percepita: {(needScores[pillar] ?? 0).toFixed(1)}/5 · Maturità attuale: {(maturityScores[pillar] ?? 0).toFixed(1)}/5
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadarCanvas({ data }: { data: { pillar: Pillar; score: number }[] }) {
  const size = 260
  const center = size / 2
  const radius = center - 20
  const levels = 5
  const angleStep = (Math.PI * 2) / data.length

  const polygons = Array.from({ length: levels }, (_, levelIndex) => {
    const ratio = ((levelIndex + 1) / levels)
    const points = data
      .map((item, idx) => {
        const angle = -Math.PI / 2 + angleStep * idx
        const r = radius * ratio
        const x = center + r * Math.cos(angle)
        const y = center + r * Math.sin(angle)
        return `${x},${y}`
      })
      .join(" ")
    return <polygon key={levelIndex} points={points} fill="none" stroke="#CBD5F5" strokeWidth={0.5} />
  })

  const axes = data.map((item, idx) => {
    const angle = -Math.PI / 2 + angleStep * idx
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    const labelX = center + (radius + 16) * Math.cos(angle)
    const labelY = center + (radius + 16) * Math.sin(angle)
    return (
      <g key={item.pillar}>
        <line x1={center} y1={center} x2={x} y2={y} stroke="#94A3B8" strokeWidth={0.5} />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fill="#334155"
        >
          {item.pillar}
        </text>
      </g>
    )
  })

  const valuePoints = data
    .map((item, idx) => {
      const angle = -Math.PI / 2 + angleStep * idx
      const r = radius * (item.score / 5)
      const x = center + r * Math.cos(angle)
      const y = center + r * Math.sin(angle)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width="100%" height={260} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar maturità VCF">
      <g>{polygons}</g>
      <g>{axes}</g>
      <polygon points={valuePoints} fill="rgba(0,149,217,0.25)" stroke="#0095d9" strokeWidth={2} />
      <circle cx={center} cy={center} r={4} fill="#0f172a" />
    </svg>
  )
}

function DualBarRow({ pillar, maturity, need }: { pillar: Pillar; maturity: number; need: number }) {
  const maturityWidth = Math.min(100, (maturity / 5) * 100)
  const needWidth = Math.min(100, (need / 5) * 100)
  const gap = (need - maturity).toFixed(1)
  const gapLabel = Number(gap) > 0 ? `Gap ${gap}` : "Allineato"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span className="font-semibold text-slate-700">{pillar}</span>
        <span>{gapLabel}</span>
      </div>
      <BarRow label="Maturità" value={maturityWidth} display={maturity} color="bg-violet-500" />
      <BarRow label="Necessità" value={needWidth} display={need} color="bg-orange-500" />
    </div>
  )
}

function BarRow({ label, value, display, color }: { label: string; value: number; display: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-xs uppercase tracking-wide text-slate-500">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="w-12 text-xs text-right text-slate-600">{display.toFixed(1)}/5</span>
    </div>
  )
}
