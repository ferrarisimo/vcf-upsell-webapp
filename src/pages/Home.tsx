import Layout from "../components/Layout"
import { Link } from "react-router-dom"

export default function Home(){
  return (
    <Layout>
      {/* HERO */}
      <section className="bg-gradient-to-br from-vmware.slate via-slate-800 to-vmware.blue text-white">
        <div className="container-xl py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Valuta il valore di <span className="text-vmware">VMware Cloud Foundation</span>
              </h1>
              <p className="mt-5 text-lg text-slate-300">
                Per clienti già VMware (vSphere Standard/Ent Plus o VVF) che vogliono capire come <strong>VCF</strong>
                può estendere sicurezza, automazione e controllo dei costi.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/assessment" className="btn-primary">Inizia il questionario</Link>
              </div>
            </div>
            <div className="card p-6 bg-white/10 border-white/20 backdrop-blur">
              <img src="/vmware-logo.svg" alt="VMware" className="h-6 opacity-80" />
              <h3 className="mt-4 text-xl font-semibold text-white">Target</h3>
              <ul className="mt-2 list-disc list-inside text-slate-200">
                <li>Clienti con vSphere Standard / Enterprise Plus / VVF</li>
                <li>Obiettivo: comprendere il valore dell’upsell verso <strong>VCF</strong></li>
                <li>Report PDF con raccomandazioni e follow-up Arrow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="how" className="container-xl -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Valuta", d: "12+ domande in 4 aree: infrastruttura, esperienza cloud, sicurezza, operations." },
            { t: "Ricevi il Report", d: "PDF brandizzato Arrow×VMware con punteggi e raccomandazioni." },
            { t: "Piano d’Azione", d: "Allinea priorità e timeline con il team Arrow ECS." },
          ].map((x,i)=>(
            <div key={x.t} className="card p-8">
              <div className="text-sm text-slate-500">Step {i+1}</div>
              <h4 className="text-xl font-semibold mt-1">{x.t}</h4>
              <p className="mt-2 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
