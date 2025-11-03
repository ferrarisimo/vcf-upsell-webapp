import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Thanks(){
  return (
    <>
      <Header/>
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-3xl font-bold">Grazie!</h2>
        <p className="mt-2 text-slate-600">Se tutto è andato a buon fine, riceverai il PDF riepilogativo entro pochi minuti nella tua casella di posta.</p>
        <Link to="/" className="inline-block mt-6 rounded-xl border border-slate-300 px-6 py-3 font-semibold">Torna alla Home</Link>
      </main>
      <Footer/>
    </>
  )
}
