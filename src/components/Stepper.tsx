import * as Progress from "@radix-ui/react-progress"

export default function Stepper({ value }: { value: number }) {
  return (
    <Progress.Root
      className="relative h-4 overflow-hidden rounded-full bg-slate-200 shadow-inner"
      value={value}
      max={100}
    >
      <Progress.Indicator
        className="relative h-full bg-gradient-to-r from-arrow via-vmware to-vmware.blue transition-all duration-500"
        style={{ width: `${value}%` }}
      >
        <span className="absolute inset-0 bg-white/20 mix-blend-overlay" aria-hidden />
      </Progress.Indicator>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-slate-700 drop-shadow-sm">{value}%</span>
      </div>
      <span className="sr-only">Progresso completato al {value}%</span>
    </Progress.Root>
  )
}
