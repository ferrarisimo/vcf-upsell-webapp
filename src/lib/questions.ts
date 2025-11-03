import type { Pillar } from '../types'

export type Question = { id:string; pillar:Pillar; title:string; helper?:string }

export const QUESTIONS: Question[] = [
  // 🔹 Modern Infrastructure
  { id:'mi-01', pillar:'Modern Infrastructure', title:'Come gestite oggi gli aggiornamenti di host, cluster e componenti VMware?', helper:'Con VCF il ciclo di vita è automatizzato e uniforme su tutta l’infrastruttura.' },
  { id:'mi-02', pillar:'Modern Infrastructure', title:'Avete visibilità centralizzata su performance e capacità di server e storage?', helper:'VCF offre una vista unica e strumenti integrati per analisi e ottimizzazione.' },
  { id:'mi-03', pillar:'Modern Infrastructure', title:'Quanto è semplice per voi attivare nuovi siti o ambienti di test?', helper:'Con VCF il deployment è standardizzato e validato, riducendo tempi e rischi.' },

  // 🔹 Unified Cloud Experience
  { id:'uc-01', pillar:'Unified Cloud Experience', title:'I team IT o DevOps possono richiedere risorse (VM o container) in modo autonomo?', helper:'VCF abilita un portale self-service e policy di provisioning sicure.' },
  { id:'uc-02', pillar:'Unified Cloud Experience', title:'Avete una gestione unificata tra ambienti on-premise e cloud pubblico?', helper:'VCF estende la stessa esperienza operativa su più cloud.' },
  { id:'uc-03', pillar:'Unified Cloud Experience', title:'L’infrastruttura è pronta per supportare workload moderni (container, AI, dati)?', helper:'VCF integra nativamente Kubernetes e servizi dati per nuove applicazioni.' },

  // 🔹 Secure & Resilient
  { id:'sr-01', pillar:'Secure & Resilient', title:'Come proteggete i workload interni da minacce o movimenti laterali?', helper:'VCF introduce sicurezza distribuita e micro-segmentazione nativa.' },
  { id:'sr-02', pillar:'Secure & Resilient', title:'Avete un piano di ripristino in caso di incidente o ransomware?', helper:'VCF semplifica recovery e isolamento di ambienti di emergenza.' },
  { id:'sr-03', pillar:'Secure & Resilient', title:'La vostra infrastruttura soddisfa requisiti di compliance o audit?', helper:'VCF integra controlli e configurazioni validate per policy aziendali.' },

  // 🔹 Business Operations
  { id:'bo-01', pillar:'Business Operations', title:'Quanto è chiaro oggi il costo e l’utilizzo delle risorse IT per dipartimento o progetto?', helper:'VCF abilita showback e chargeback automatici per una visione finanziaria.' },
  { id:'bo-02', pillar:'Business Operations', title:'Monitorate in modo proattivo capacità e rischio di saturazione?', helper:'VCF prevede la crescita e ottimizza l’uso dell’infrastruttura.' },
  { id:'bo-03', pillar:'Business Operations', title:'Utilizzate strumenti per ottimizzare risorse inutilizzate o sottoutilizzate?', helper:'VCF automatizza il rightsizing e riduce gli sprechi operativi.' },

  // 🔹 Advanced / Upsell
  { id:'adv-01', pillar:'Unified Cloud Experience', title:'State valutando di offrire servizi dati o applicativi come piattaforma interna?', helper:'VCF può gestire Database as a Service e altri servizi nativi.' },
  { id:'adv-02', pillar:'Modern Infrastructure', title:'Avete progetti di intelligenza artificiale o analisi avanzata nei prossimi 12 mesi?', helper:'VCF supporta Private AI e workload GPU-ready.' }
]
