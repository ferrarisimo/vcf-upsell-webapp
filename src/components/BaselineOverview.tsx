import { Server, Cpu, Database, Gauge } from "lucide-react"
import type { BaselineContext } from "../types"

export default function BaselineOverview({ baseline, totalCores }: { baseline: BaselineContext; totalCores: number }) {
  const metrics = [
    {
      label: "Host attivi",
      value: baseline.hosts,
      icon: <Server className="w-5 h-5" />,
      description: "Nodo fisico da considerare per il lifecycle orchestrato.",
    },
    {
      label: "CPU per host",
      value: baseline.cpusPerHost,
      icon: <Cpu className="w-5 h-5" />,
      description: `Ogni CPU deve mantenere ≥${baseline.coresPerCpu} core per aderire ai requisiti VCF.`,
    },
    {
      label: "Core totali",
      value: totalCores,
      icon: <Gauge className="w-5 h-5" />,
      description: "Capacità computazionale consolidata per workload misti.",
    },
    {
      label: "Capacità vSAN potenziale",
      value: `${totalCores} TB`,
      icon: <Database className="w-5 h-5" />,
      description: "Equivalente ai core totali calcolati sui server dichiarati.",
    },
  ]

  return (
    <section className="card p-6 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Baseline infrastrutturale</p>
        <h2 className="text-2xl font-semibold text-slate-900 mt-1">
          Release {baseline.currentVersion} con {baseline.hosts} host in valutazione
        </h2>
        <p className="text-sm text-slate-600">
          I dati raccolti guidano il confronto verso VMware Cloud Foundation mettendo in evidenza gap e opportunità.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="inline-flex items-center justify-center rounded-full bg-white p-2 shadow-sm">{metric.icon}</span>
              <span className="text-xs font-semibold uppercase">{metric.label}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{metric.value}</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{metric.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
