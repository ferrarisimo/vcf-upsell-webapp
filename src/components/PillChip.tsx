import type { Pillar } from '../types'
const colors: Record<Pillar, string> = {
  'Modern Infrastructure': 'bg-vmw-blue/10 text-vmw-blue',
  'Unified Cloud Experience': 'bg-emerald-50 text-emerald-700',
  'Secure & Resilient': 'bg-rose-50 text-rose-700',
  'Business Operations': 'bg-indigo-50 text-indigo-700'
}
export default function PillChip({label}:{label:Pillar}){
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[label]}`}>{label}</span>
}