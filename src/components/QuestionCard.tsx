import PillChip from './PillChip'
import { Slider } from './ui/Slider'
import type { Pillar } from '../types'

export default function QuestionCard({
  index,
  total,
  pillar,
  title,
  helper,
  onChange
}:{index:number; total:number; pillar:Pillar; title:string; helper?:string; onChange:(v:number)=>void}){
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <PillChip label={pillar}/>
        <span className="text-sm text-slate-500">{index}/{total}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
      {helper && <p className="mt-2 text-slate-600">{helper}</p>}
      <div className="mt-5">
        <Slider min={0} max={5} step={1} defaultValue={[0]} onValueChange={(v)=>onChange(v[0])}/>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Nullo</span><span>Basico</span><span>Intermedio</span><span>Avanzato</span><span>Maturo</span><span>Top</span>
        </div>
      </div>
    </div>
  )
}
