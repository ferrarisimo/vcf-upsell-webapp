import * as Progress from "@radix-ui/react-progress"

export default function Stepper({ value }: { value: number }) {
  return (
    <Progress.Root className="relative h-3 overflow-hidden rounded-full bg-slate-200">
      <Progress.Indicator className="h-full bg-arrow transition-all" style={{ width: `${value}%` }} />
    </Progress.Root>
  )
}
