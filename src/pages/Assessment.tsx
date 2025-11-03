import * as React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { QUESTIONS } from '../lib/questions'
import QuestionCard from '../components/QuestionCard'
import Stepper from '../components/Stepper'
import SummaryPanel from '../components/SummaryPanel'
import EmailCapture from '../components/EmailCapture'
import { aggregate, recommendations } from '../lib/scoring'
import type { Answer, Pillar, Submission } from '../types'
import { useNavigate } from 'react-router-dom'

export default function Assessment(){
  const [answers,setAnswers] = React.useState<Answer[]>([])
  const [scores,setScores] = React.useState<Record<Pillar, number>>({
    'Modern Infrastructure':0,'Unified Cloud Experience':0,'Secure & Resilient':0,'Business Operations':0
  })
  const progress = Math.round((answers.length / QUESTIONS.length) * 100)
  const navigate = useNavigate()

  function setAnswer(id:string, score:number){
    setAnswers(prev => {
      const ex = prev.find(a=>a.id===id)
      let arr
      if(ex){ arr = prev.map(a=> a.id===id? {...a, score}: a) } else { arr = [...prev, {id, score}] }
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
    const res = await fetch('/api/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(submission) })
    if(res.ok){ navigate('/grazie') } else { alert('Errore nell\'invio del report. Riprovare.')}    
  }

  return (
    <>
      <Header/>
      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="grow">
            <h2 className="text-2xl font-bold">Questionario di Valutazione</h2>
            <p className="text-slate-600">Rispondi alle domande spostando lo slider (0 = non presente, 5 = completamente adottato).</p>
          </div>
          <div className="w-64"><Stepper value={progress}/></div>
        </div>

        <div className="space-y-4">
          {QUESTIONS.map((q,idx)=> (
            <QuestionCard key={q.id} index={idx+1} total={QUESTIONS.length} pillar={q.pillar} title={q.title} helper={q.helper} onChange={(v)=>setAnswer(q.id, v)}/>
          ))}
        </div>
        <SummaryPanel scores={scores}/>

        <EmailCapture onSubmit={submitEmail}/>
      </main>
      <Footer/>
    </>
  )
}
