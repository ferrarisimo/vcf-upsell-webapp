import ArrowBadge from './ArrowBadge'
export default function Header(){
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/arrow-logo.svg" alt="Arrow" className="h-7"/>
          <div className="h-6 w-px bg-slate-200"/>
          <img src="/vmware-logo.svg" alt="VMware" className="h-6 opacity-80"/>
        </div>
        <ArrowBadge/>
      </div>
    </header>
  )
}