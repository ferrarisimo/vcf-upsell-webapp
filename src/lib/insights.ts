import type { Answer, BaselineContext, Pillar } from "../types"
import type { Question } from "./questions"
import { aggregate } from "./scoring"

type NarrativeDetails = {
  critical: string[]
  insights: string[]
  strengths: string[]
}

const pillarHooks: Record<Pillar, { gap: string; vcf: string }> = {
  "Modern Infrastructure": {
    gap: "L'infrastruttura attuale richiede effort manuale su provisioning e lifecycle.",
    vcf: "VCF introduce LCM orchestrato end-to-end, vSAN ottimizzato e automazione del provisioning validata VMware.",
  },
  "Unified Cloud Experience": {
    gap: "L'esperienza tra on-prem e cloud pubblico è frammentata per i team applicativi.",
    vcf: "VCF fornisce un control plane coerente per VM e container con cataloghi self-service integrati.",
  },
  "Secure & Resilient": {
    gap: "La postura di sicurezza è distribuita tra strumenti differenti con copertura disomogenea.",
    vcf: "VCF abilita micro-segmentazione NSX, crittografia by design e automazione del disaster & cyber recovery.",
  },
  "Business Operations": {
    gap: "Il monitoraggio di costi e capacità è reattivo e basato su report manuali.",
    vcf: "VCF offre visibilità in tempo reale, showback e ottimizzazione automatica delle risorse.",
  },
}

const MATURITY_MESSAGES = {
  low: (question: Question) =>
    `La maturità per \"${question.title}\" è bassa: è necessario colmare il gap operativo prima di scalare.`,
  mid: (question: Question) =>
    `La maturità per \"${question.title}\" è parziale: occorrono processi standard e automazioni aggiuntive.`,
  high: (question: Question) =>
    `La maturità per \"${question.title}\" è elevata: ottimo punto di partenza per capitalizzare le funzionalità avanzate di VCF.`,
}

const NEED_MESSAGES = {
  low: (question: Question) =>
    `Il bisogno su \"${question.title}\" non è prioritario al momento: è possibile pianificare gradualmente l'adozione VCF.`,
  mid: (question: Question) =>
    `Il bisogno su \"${question.title}\" è percepito: serve un piano di modernizzazione coordinato.`,
  high: (question: Question) =>
    `Il bisogno su \"${question.title}\" è critico: VCF risponde in modo diretto a questa esigenza.`,
}

function parseVersion(version: string) {
  const match = version.match(/(\d+(?:\.\d+)?)/)
  return match ? Number.parseFloat(match[1]) : undefined
}

export function buildBaselineNarrative(baseline: BaselineContext, totalCores: number): NarrativeDetails {
  const versionNumber = parseVersion(baseline.currentVersion)
  const narrative: NarrativeDetails = { critical: [], insights: [], strengths: [] }

  if (versionNumber && versionNumber < 8) {
    narrative.critical.push(
      `La release attuale (${baseline.currentVersion}) è precedente alla famiglia vSphere 8/VCF 5: gli upgrade richiedono finestre lunghe e interventi manuali.`,
    )
    narrative.insights.push(
      "VCF consolida upgrade e sicurezza in un unico ciclo automatizzato riducendo i downtime programmati.",
    )
  } else {
    narrative.insights.push(
      `La release ${baseline.currentVersion} è allineata ma priva delle automazioni full-stack di VCF 5: l'upgrade porta governance centralizzata.`,
    )
  }

  narrative.insights.push(
    `L'infrastruttura coinvolge ${baseline.hosts} host con ${baseline.cpusPerHost} CPU ciascuno da ${baseline.coresPerCpu} core: il footprint cresce rapidamente senza lifecycle coordinato.`,
  )
  narrative.strengths.push(
    `Con ${totalCores} core disponibili equivalenti a ${totalCores} TB vSAN potenziali, VCF abilita consolidamento storage e resilienza integrata.`,
  )

  if (baseline.coresPerCpu < 24) {
    narrative.critical.push(
      "Il numero di core per CPU è contenuto: adottare nodi certificati per VCF consente di massimizzare densità e performance.",
    )
  }

  return narrative
}

export function evaluateAnswer(
  question: Question,
  score: number,
  baseline: BaselineContext,
  answers: Answer[],
): NarrativeDetails {
  const { pillarScores } = aggregate(answers)
  const pillarContext = pillarHooks[question.pillar]
  const narrative: NarrativeDetails = { critical: [], insights: [], strengths: [] }

  if (question.type === "maturity") {
    if (score <= 2) {
      narrative.critical.push(MATURITY_MESSAGES.low(question))
      narrative.critical.push(pillarContext.gap)
      narrative.insights.push(`VCF introduce ${pillarContext.vcf}`)
    } else if (score === 3) {
      narrative.insights.push(MATURITY_MESSAGES.mid(question))
      narrative.insights.push(`Standardizzare il processo con i blueprint VCF accelera l'evoluzione della release ${baseline.currentVersion}.`)
    } else {
      narrative.strengths.push(MATURITY_MESSAGES.high(question))
      narrative.insights.push(`Abbinando VCF a ${question.helper || "le funzionalità native"} puoi scalare in modo uniforme.`)
    }
  } else {
    if (score >= 4) {
      narrative.critical.push(NEED_MESSAGES.high(question))
      narrative.insights.push(`VCF offre capacità dedicate per rispondere rapidamente a questa richiesta.`)
    } else if (score === 3) {
      narrative.insights.push(NEED_MESSAGES.mid(question))
      narrative.insights.push(`Pianificare l'adozione VCF subito dopo l'upgrade della release ${baseline.currentVersion} consente un time-to-value rapido.`)
    } else {
      narrative.strengths.push(NEED_MESSAGES.low(question))
      narrative.insights.push("VCF può essere introdotto progressivamente per consolidare gli use case futuri.")
    }
  }

  const normalizedScore = pillarScores[question.pillar]
  if (normalizedScore !== undefined && normalizedScore < 3.5) {
    narrative.critical.push(
      `Il punteggio medio per ${question.pillar} è ${normalizedScore.toFixed(1)}/5: occorre intervenire per colmare la distanza rispetto ai benchmark VCF.`,
    )
  } else if (normalizedScore !== undefined) {
    narrative.strengths.push(
      `Il punteggio medio per ${question.pillar} è ${normalizedScore.toFixed(1)}/5: ottima base per sfruttare i servizi cloud-nativi VCF.`,
    )
  }

  return narrative
}

export function mergeNarratives(items: NarrativeDetails[]): NarrativeDetails {
  return items.reduce<NarrativeDetails>(
    (acc, item) => ({
      critical: [...acc.critical, ...item.critical],
      insights: [...acc.insights, ...item.insights],
      strengths: [...acc.strengths, ...item.strengths],
    }),
    { critical: [], insights: [], strengths: [] },
  )
}

export type NarrativeBucket = ReturnType<typeof mergeNarratives>
