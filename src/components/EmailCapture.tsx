import * as React from 'react'

export default function EmailCapture({onSubmit}:{onSubmit:(payload:{email:string;projectName:string;customer:string;notes?:string})=>void}){
  const [email,setEmail] = React.useState('')
  const [projectName,setProjectName] = React.useState('')
  const [customer,setCustomer] = React.useState('')
  const [notes,setNotes] = React.useState('')
  return (
    <form className="card p-6 space-y-4" onSubmit={(e)=>{e.preventDefault();onSubmit({email,projectName,customer,notes})}}>
      <h3 className="text-lg font-semibold">Ricevi il report completo via email</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block text-sm">Nome progetto<input required className="mt-1 w-full rounded-xl border border-slate-200 p-2" value={projectName} onChange={e=>setProjectName(e.target.value)}/></label>
        <label className="block text-sm">Cliente<input required className="mt-1 w-full rounded-xl border border-slate-200 p-2" value={customer} onChange={e=>setCustomer(e.target.value)}/></label>
        <label className="block text-sm md:col-span-2">Email<input required type="email" className="mt-1 w-full rounded-xl border border-slate-200 p-2" value={email} onChange={e=>setEmail(e.target.value)}/></label>
        <label className="block text-sm md:col-span-2">Note (opzionale)<textarea className="mt-1 w-full rounded-xl border border-slate-200 p-2" rows={3} value={notes} onChange={e=>setNotes(e.target.value)}></textarea></label>
      </div>
      <button className="rounded-xl bg-arrow-primary text-white font-semibold px-4 py-2 hover:bg-arrow-dark">Invia report</button>
      <p className="text-xs text-slate-500">Inserendo l'email accetti il tracciamento della richiesta ai fini commerciali (GDPR). 
      I dati minimi raccolti: email, nome progetto, cliente, data, punteggi aggregati.</p>
    </form>
  )
}
