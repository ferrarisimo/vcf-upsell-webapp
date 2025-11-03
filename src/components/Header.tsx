export default function Header(){
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-100">
      <div className="container-xl py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/arrow-logo.svg" alt="Arrow" className="h-7" />
          <div className="h-6 w-px bg-slate-200" />
          <img src="/vmware-logo.svg" alt="VMware" className="h-6 opacity-80" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-arrow/10 px-3 py-1 text-arrow text-sm font-semibold">
          Arrow ECS | VMware Specialist
        </div>
      </div>
    </header>
  )
}
