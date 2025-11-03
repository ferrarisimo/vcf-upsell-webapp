export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Arrow ECS. Tutti i diritti riservati.</p>
        <a href="https://www.arrow.com/" target="_blank" className="hover:text-slate-900">arrow.com</a>
      </div>
    </footer>
  )
}