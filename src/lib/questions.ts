import type { Pillar, QuestionType } from "../types"

export type Question = {
  id: string
  pillar: Pillar
  title: string
  helper?: string
  type: QuestionType
}

export const QUESTIONS: Question[] = [
  // Modern Infrastructure
  { id: "mi-01", pillar: "Modern Infrastructure", title: "Come gestite oggi gli aggiornamenti di host, cluster e componenti VMware?", type: "maturity", helper: "Con VCF il ciclo di vita è automatizzato e uniforme su tutta l’infrastruttura." },
  { id: "mi-02", pillar: "Modern Infrastructure", title: "Avete necessità di ridurre il TCO storage/compute (es. dedup globale, tiering NVMe)?", type: "need", helper: "Efficienze di costo grazie a ottimizzazioni integrate in VCF." },
  { id: "mi-03", pillar: "Modern Infrastructure", title: "Quanto è semplice per voi attivare nuovi siti o ambienti di test?", type: "maturity", helper: "Con VCF il deployment è standardizzato e validato." },

  // Unified Cloud Experience
  { id: "uc-01", pillar: "Unified Cloud Experience", title: "I team IT possono richiedere risorse (VM o container) in modo autonomo?", type: "maturity" },
  { id: "uc-02", pillar: "Unified Cloud Experience", title: "Avete interesse a uniformare la gestione tra on-prem e cloud pubblico?", type: "need" },
  { id: "uc-03", pillar: "Unified Cloud Experience", title: "L’infrastruttura è pronta per workload moderni (container, AI, dati)?", type: "maturity" },

  // Secure & Resilient
  { id: "sr-01", pillar: "Secure & Resilient", title: "Come proteggete i workload interni da minacce o movimenti laterali?", type: "maturity" },
  { id: "sr-02", pillar: "Secure & Resilient", title: "Avete necessità di rafforzare la resilienza o il piano di cyber recovery?", type: "need" },
  { id: "sr-03", pillar: "Secure & Resilient", title: "La vostra infrastruttura soddisfa già requisiti di compliance o audit?", type: "maturity" },

  // Business Operations
  { id: "bo-01", pillar: "Business Operations", title: "Quanto è chiaro oggi il costo e l’utilizzo delle risorse IT per dipartimento o progetto?", type: "maturity" },
  { id: "bo-02", pillar: "Business Operations", title: "Avete necessità di migliorare la visibilità su capacità e costi?", type: "need" },
  { id: "bo-03", pillar: "Business Operations", title: "Utilizzate strumenti per ottimizzare risorse inutilizzate o sottoutilizzate?", type: "maturity" },
]
