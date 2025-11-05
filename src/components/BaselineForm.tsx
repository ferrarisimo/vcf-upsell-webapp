import { useState } from "react"
import type { BaselineContext } from "../types"

const VERSION_OPTIONS = ["Standard", "Enterprise Plus", "vSphere Foundation"] as const

export default function BaselineForm({ onSubmit }: { onSubmit: (baseline: BaselineContext) => void }) {
  const [form, setForm] = useState({
    currentVersion: "",
    hosts: "",
    cpusPerHost: "",
    coresPerCpu: "",
  })
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const hosts = Number(form.hosts)
    const cpusPerHost = Number(form.cpusPerHost)
    const coresPerCpu = Number(form.coresPerCpu)

    if (!form.currentVersion.trim()) {
      setError("Indica la release in produzione.")
      return
    }
    if (!Number.isFinite(hosts) || hosts <= 0) {
      setError("Inserisci un numero di host valido.")
      return
    }
    if (!Number.isFinite(cpusPerHost) || cpusPerHost <= 0) {
      setError("Inserisci il numero di CPU per host.")
      return
    }
    if (!Number.isFinite(coresPerCpu) || coresPerCpu < 16) {
      setError("Ogni CPU deve avere almeno 16 core per essere considerata per l'upgrade VCF.")
      return
    }

    setError(null)
    onSubmit({
      currentVersion: form.currentVersion.trim(),
      hosts,
      cpusPerHost,
      coresPerCpu,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Partiamo dall'infrastruttura attuale</h2>
        <p className="text-slate-600 mt-1">
          Questi dati ci permettono di confrontare la baseline con le capability VMware Cloud Foundation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Versione in produzione</span>
          <select
            required
            name="currentVersion"
            value={form.currentVersion}
            onChange={handleChange}
            className="input appearance-none"
          >
            <option value="" disabled>
              Seleziona edizione
            </option>
            {VERSION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Numero di host</span>
          <input
            required
            type="number"
            min={1}
            name="hosts"
            value={form.hosts}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">CPU per host</span>
          <input
            required
            type="number"
            min={1}
            name="cpusPerHost"
            value={form.cpusPerHost}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Core per CPU</span>
          <input
            required
            type="number"
            min={16}
            name="coresPerCpu"
            value={form.coresPerCpu}
            onChange={handleChange}
            className="input"
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" className="btn-primary w-full md:w-auto">
        Prosegui con la valutazione
      </button>
    </form>
  )
}
