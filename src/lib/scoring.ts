import type { Answer } from "../types"

export function aggregate(answers: Answer[]) {
  const pillarScores: Record<string, number> = {}
  const pillarCounts: Record<string, number> = {}
  const maturityScores: Record<string, number> = {}
  const needScores: Record<string, number> = {}

  for (const a of answers) {
    const { pillar, score, type } = a

    // calcolo medio per pillar globale
    pillarScores[pillar] = (pillarScores[pillar] || 0) + score
    pillarCounts[pillar] = (pillarCounts[pillar] || 0) + 1

    // separazione per tipo
    if (type === "maturity") {
      maturityScores[pillar] = (maturityScores[pillar] || 0) + score
    } else if (type === "need") {
      needScores[pillar] = (needScores[pillar] || 0) + score
    }
  }

  // normalizzazione
  for (const p of Object.keys(pillarScores)) {
    pillarScores[p] = pillarScores[p] / pillarCounts[p]
    if (maturityScores[p]) maturityScores[p] /= pillarCounts[p]
    if (needScores[p]) needScores[p] /= pillarCounts[p]
  }

  return { pillarScores, maturityScores, needScores }
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
