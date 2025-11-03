import Layout from "../components/Layout"
import { Link } from "react-router-dom"

export default function Thanks(){
  return (
    <Layout>
      <section className="container-xl py-24 text-center">
        <h2 className="text-3xl font-bold">Grazie!</h2>
        <p className="mt-2 text-slate-600">
          Se tutto è andato a buon fine, riceverai il PDF riepilogativo entro pochi minuti nella tua casella di posta.
        </p>
        <Link to="/" className="btn-ghost mt-6 inline-block">Torna alla Home</Link>
      </section>
    </Layout>
  )
}
