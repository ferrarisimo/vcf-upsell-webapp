import Layout from "../components/Layout"
import AssessmentAccordion from "../components/AssessmentAccordion"
import Stepper from "../components/Stepper"
import ResultSummary from "../components/ResultSummary"
import EmailCapture from "../components/EmailCapture"
import { QUESTIONS } from "../lib/questions"
import { aggregate } from "../lib/scoring"
import type { Answer, Pillar, Submission } from "../types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Assessment() {
  const [answers, setAnswers] = useState<Answer[]>([])
  const navigate = useNavigate()

  const allPillars: Pillar[] = [
    "Modern Infrastructure",
    "Unified Cloud Experience",
    "Secure & Resilient",
    "Business Operations",
  ]

  function handleAnswers(newAnswers: Answer[]) {
    setAnswers((prev) => {
      const merged = [...prev]
      newAnswers.forEach((a) => {
        const idx = merged.findIndex((p) => p.id === a.id)
        if (idx !== -1) merged[idx] = a
        else merged.push(a)
      })
      return merged
    })
  }

  const { pillarScores } = aggregate(answers)
  const progress = Math.round((answers.length / QUESTIONS.length) * 100)

  async function submitEmail(payload: { email: string; projectName: string; customer: string; notes?: string }) {
    const submission: Submission = {
      projectName: payload.projectName,
      customer: payload.customer,
      email: payload.email,
      dateISO: new Date().toISOString(),
      notes: payload.notes,
      answers,
      pillarScores,
    }
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    })
    if (res.ok) navigate("/grazie")
    else alert("Errore nell'invio del report. Riprovare.")
  }

  return (
    <Layout>
      <section className="container-xl py-10 space-y-8">
        <div className="card p-6 flex items-center gap-4">
          <div className="grow">
            <h2 className="text-2xl font-bold">Valutazione VMware Cloud Foundation</h2>
            <p className="text-slate-600">
              Rispondi alle domande per ciascuna area. Ogni risposta aiuta a capire la maturità del tuo ambiente VMware.
            </p>
          </div>
          <div className="w-64">
            <Stepper value={progress} />
          </div>
        </div>

        {/* Accordion per ogni area */}
        <div className="space-y-4">
          {allPillars.map((pillar) => (
            <AssessmentAccordion
              key={pillar}
              pillar={pillar}
              questions={QUESTIONS.filter((q) => q.pillar === pillar)}
              onChange={handleAnswers}
            />
          ))}
        </div>

        <ResultSummary scores={pillarScores} />
        <EmailCapture onSubmit={submitEmail} />
      </section>
    </Layout>
  )
}
