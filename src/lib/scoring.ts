import type { Pillar, Answer } from '../types'
export function aggregate(answers: Answer[]){
  const weights: Record<Pillar, number> = {
    'Modern Infrastructure': 1,
    'Unified Cloud Experience': 1,
    'Secure & Resilient': 1,
    'Business Operations': 1
  }
  const sums: Record<Pillar, {sum:number; count:number}> = {
    'Modern Infrastructure': {sum:0,count:0},
    'Unified Cloud Experience': {sum:0,count:0},
    'Secure & Resilient': {sum:0,count:0},
    'Business Operations': {sum:0,count:0}
  }
  answers.forEach(a=>{
    const pillar = a.id.startsWith('mi') ? 'Modern Infrastructure' : a.id.startsWith('uc') ? 'Unified Cloud Experience' : a.id.startsWith('sr') ? 'Secure & Resilient' : 'Business Operations'
    sums[pillar].sum += a.score
    sums[pillar].count += 1
  })
  const averages = Object.fromEntries(Object.entries(sums).map(([k,v])=> [k, v.count? v.sum/v.count : 0])) as Record<Pillar, number>
  const total = (Object.entries(averages).reduce((acc,[k,v])=> acc + v*weights[k as Pillar], 0)) / 4
  return { pillarScores: averages, maturity: total }
}

export function recommendations(pillarScores: Record<Pillar, number>){
  const r: string[] = []
  if(pillarScores['Modern Infrastructure'] < 4) r.push('Valuta VCF Installer, fleet LCM e ottimizzazioni vSAN (Global Dedup) e NVMe Tiering per ridurre TCO e accelerare il bring‑up.')
  if(pillarScores['Unified Cloud Experience'] < 4) r.push('Abilita catalogo self‑service, VKS e VPC/multi‑tenancy per unificare l’esperienza di consumo di VM e Kubernetes.')
  if(pillarScores['Secure & Resilient'] < 4) r.push('Rafforza la postura con vDefend (micro‑segmentazione, IDS/IPS) e Live Recovery con clean room on‑prem per cyber recovery.')
  if(pillarScores['Business Operations'] < 4) r.push('Attiva showback/chargeback, capacity planning e reclaim automatico per controllo costi e performance.')
  r.push('Opzioni avanzate: DSM per database nativi; Private AI Foundation per accelerare use case AI in sicurezza.')
  return r
}
