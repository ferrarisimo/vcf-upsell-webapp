import Layout from "../components/Layout"
import Stepper from "../components/Stepper"
import QuestionCard from "../components/QuestionCard"
import ResultSummary from "../components/ResultSummary"
import EmailCapture from "../components/EmailCapture"
import { QUESTIONS } from "../lib/questions"
import { aggregate } from "../lib/scoring"
import type { Answer, Pillar, Submission } from "../types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Assessment(){
  const [answers, setAnswers] = useState<Answer[]>([])
  const [scores, setScores] = useState<Record<Pillar, number>>({
    "Modern Infrastructure":0, "Unified Cloud Experience":0, "Secure & Resilient":0, "Business Operations":0
  })
  const progress = Math.round((answers.length / QUESTIONS.length) * 100)
  const navigate = useNavigate()

  function setAnswer(id:string, score:number){
    setAnswers(prev => {
      const ex = prev.find(a=>a.id===id)
      const arr = ex ? prev.map(a=> a.id===id ? {...a, score} : a) : [...prev, {id, score}]
      const agg = aggregate(arr)
      setScores(agg.pillarScores)
      return arr
    })
  }

  async function submitEmail(payload:{email:string;projectName:string;customer:string;notes?:string}){
    const submission: Submission = {
      projectName: payload.projectName,
      customer: payload.customer,
      email: payload.email,
      dateISO: new Date().toISOString(),
      notes: payload.notes,
      answers,
      pillarScores: scores
    }
    const res = await fetch("/api/submit", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(submission) })
    if(res.ok){ navigate("/grazie") } else { alert("Errore nell'invio del report. Riprovare.") }
  }

  return (
    <Layout>
      <section className="container-xl py-10 space-y-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="grow">
            <h2 className="text-2xl font-bold">Questionario di Valutazione</h2>
            <p className="text-slate-600">Sposta lo slider (0 = non presente, 5 = completamente adottato).</p>
          </div>
          <div className="w-64"><Stepper value={progress} /></div>
        </div>

        <div className="space-y-4">
          {QUESTIONS.map((q,idx)=>(
            <QuestionCard
              key={q.id}
              index={idx+1}
              total={QUESTIONS.length}
              pillar={q.pillar}
              title={q.title}
              helper={q.helper}
              onChange={(v)=>setAnswer(q.id, v)}
            />
          ))}
        </div>

        <ResultSummary scores={scores} />
        <EmailCapture onSubmit={submitEmail} />
      </section>
    </Layout>
  )
}
