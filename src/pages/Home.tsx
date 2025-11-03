import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <>
      <Header/>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">Valuta il valore di <span className="text-vmw-blue">VMware Cloud Foundation</span> per il tuo ambiente</h1>
            <p className="mt-5 text-lg text-slate-600">Per clienti già VMware (vSphere Standard/Ent Plus o VVF) che vogliono capire come <strong>VCF</strong> può estendere sicurezza, automazione e controllo dei costi.</p>
            <div className="mt-8 flex gap-3">
              <Link to="/assessment" className="rounded-xl bg-arrow-primary text-white font-semibold px-6 py-3 hover:bg-arrow-dark">Inizia il questionario</Link>
              <a href="#how" className="rounded-xl border border-slate-300 px-6 py-3 font-semibold">Come funziona</a>
            </div>
          </div>
          <div className="card p-6">
            <img src="/vmware-logo.svg" alt="VMware" className="h-6 opacity-70"/>
            <h3 className="mt-4 text-xl font-semibold">Target</h3>
            <ul className="mt-2 list-disc list-inside text-slate-600">
              <li>Clienti con vSphere Standard / Enterprise Plus / VVF</li>
              <li>Obiettivo: comprendere il valore dell’upsell verso <strong>VCF</strong></li>
              <li>Report PDF con raccomandazioni e follow‑up Arrow</li>
            </ul>
          </div>
        </div>
        <section id="how" className="mt-16 grid md:grid-cols-3 gap-6">
          {["Valuta", "Ricevi il Report", "Piano d’Azione"].map((t,i)=> (
            <div key={t} className="card p-6">
              <div className="text-sm text-slate-500">Step {i+1}</div>
              <h4 className="text-lg font-semibold mt-1">{t}</h4>
              <p className="mt-2 text-slate-600">{i===0? 'Rispondi a 12+ domande in 4 aree: infrastruttura, esperienza cloud, sicurezza, operations.': i===1? 'Ricevi via email un PDF brandizzato Arrow×VMware con punteggi e raccomandazioni.':'Allinea priorità e timeline con il team Arrow ECS.'}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer/>
    </>
  )
}
