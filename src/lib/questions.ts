import type { Pillar } from '../types'

export type Question = { id:string; pillar:Pillar; title:string; helper?:string }

export const QUESTIONS: Question[] = [
  // Modern Infrastructure – vSAN global dedup, NVMe tiering, fleet LCM, installer
  { id:'mi-01', pillar:'Modern Infrastructure', title:'Quanto è automatizzato oggi il lifecycle (patch/upgrade) dell’infrastruttura (vSphere/NSX/vSAN)?', helper:'Valuta l’adozione di LCM centralizzato e gestione fleet.' },
  { id:'mi-02', pillar:'Modern Infrastructure', title:'Avete necessità di ridurre il TCO storage/compute (es. dedup globale vSAN ESA, tiering NVMe)?', helper:'Efficienze su storage e memoria con nuove funzionalità.' },
  { id:'mi-03', pillar:'Modern Infrastructure', title:'Quanto è ripetibile e validato il bring‑up di nuovi domini o siti?', helper:'VCF Installer e topologie validate riducono il rischio.' },

  // Unified Cloud Experience – self-service catalog, VKS, VPC, multi-tenancy
  { id:'uc-01', pillar:'Unified Cloud Experience', title:'I team applicativi hanno un catalogo self‑service per VM e Kubernetes (VKS)?', helper:'Policy e template IaC per accelerare il rilascio.' },
  { id:'uc-02', pillar:'Unified Cloud Experience', title:'Usate VPC o segmentazioni logiche per isolare tenants/progetti?', helper:'Networking semplificato con VPC e multi‑tenancy nativi.' },
  { id:'uc-03', pillar:'Unified Cloud Experience', title:'Quanto è integrata l’esperienza di consumo fra VM e container?', helper:'Un’unica interfaccia per VM e K8s.' },

  // Secure & Resilient – vDefend, Live Recovery, compliance
  { id:'sr-01', pillar:'Secure & Resilient', title:'Avete micro‑segmentazione e IDS/IPS distribuiti a livello east‑west?', helper:'vDefend abilita firewall distribuito e threat detection.' },
  { id:'sr-02', pillar:'Secure & Resilient', title:'Esiste un runbook per cyber recovery con clean room isolata on‑prem?', helper:'Live Recovery con IRE e snapshot immutabili.' },
  { id:'sr-03', pillar:'Secure & Resilient', title:'Richiedete conformità (FIPS, sovranità del dato, air‑gap)?', helper:'Controlli di sicurezza e compliance integrati.' },

  // Business Operations – cost/showback/chargeback, capacity planning
  { id:'bo-01', pillar:'Business Operations', title:'Praticate showback/chargeback e analisi dei costi per tenant/progetto?', helper:'Trasparenza dei costi del private cloud.' },
  { id:'bo-02', pillar:'Business Operations', title:'Effettuate rightsizing e reclaim automatico (idle/powered‑off/snapshots)?', helper:'Ottimizzazione continua per ridurre sprechi.' },
  { id:'bo-03', pillar:'Business Operations', title:'Monitorate capacità e rischi a livello di data center/cluster con pianificazione previsionale?', helper:'Prevenire colli di bottiglia e pianificare la crescita.' },

  // Optional advanced services upsell
  { id:'adv-01', pillar:'Unified Cloud Experience', title:'Siete interessati a Data Services nativi (PostgreSQL/MySQL) gestiti dalla piattaforma?', helper:'DSM come servizio nativo su VCF.' },
  { id:'adv-02', pillar:'Modern Infrastructure', title:'Avete workload AI/ML o piani per Private AI con GPU e multi‑tenancy?', helper:'PAIF-N con integrazione VCF.' }
]
