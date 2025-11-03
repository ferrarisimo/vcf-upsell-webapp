import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import type { Submission } from '../../src/types'

export async function buildPdf(sub: Submission){
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595, 842]) // A4 portrait
  const font = await pdf.embedFont(StandardFonts.Helvetica)

  const draw = (text:string, x:number, y:number, size=12)=>{
    page.drawText(text, { x, y, size, font, color: rgb(0.06,0.08,0.12) })
  }

  draw('Arrow × VMware — VCF Value Assessment', 40, 800, 16)
  draw(`Cliente: ${sub.customer}`, 40, 775)
  draw(`Progetto: ${sub.projectName}`, 40, 760)
  draw(`Data: ${new Date(sub.dateISO).toLocaleString('it-IT')}`, 40, 745)
  draw(`Email: ${sub.email}`, 40, 730)

  let y = 700
  draw('Punteggi per pilastro (0..5):', 40, y)
  y -= 18
  Object.entries(sub.pillarScores).forEach(([k,v])=>{ draw(`${k}: ${v.toFixed(1)}`, 60, y); y -= 16 })

  y -= 10
  draw('Raccomandazioni prioritarie:', 40, y); y -= 18
  const recs = recommendFromScores(sub.pillarScores)
  recs.forEach((r)=>{ wrap(r, 60, () => { page.drawText('•', {x:50, y, size:12, font}); }, 500, (line)=>{draw(line, 65, y); y-=14}) })

  function wrap(text:string, bullet:()=>void, lineWidth:number, lineCb:(line:string)=>void){
    const words = text.split(' ')
    let line = ''
    words.forEach(w=>{
      const test = line + w + ' '
      const width = font.widthOfTextAtSize(test, 12)
      if(width > lineWidth){ bullet(); lineCb(line); line = w+' ' } else { line = test }
    })
    if(line){ bullet(); lineCb(line) }
  }

  const bytes = await pdf.save()
  return Buffer.from(bytes)
}

function recommendFromScores(scores: Record<string, number>){
  const r: string[] = []
  if(scores['Modern Infrastructure'] < 4) r.push('Introdurre VCF Installer e gestione fleet per standardizzare il bring‑up; considerare vSAN ESA con dedup globale e tiering NVMe per ridurre TCO.')
  if(scores['Unified Cloud Experience'] < 4) r.push('Abilitare catalogo self‑service con VKS, VPC e multi‑tenancy per unificare il consumo di VM e Kubernetes.')
  if(scores['Secure & Resilient'] < 4) r.push('Implementare vDefend per micro‑segmentazione e IDS/IPS; adottare Live Recovery con clean room on‑prem e snapshot immutabili per cyber recovery.')
  if(scores['Business Operations'] < 4) r.push('Abilitare showback/chargeback e reclaim automatico; introdurre capacity planning previsionale per evitare saturazioni e ottimizzare costi.')
  r.push('Valutare Advanced Services: Data Services Manager per PostgreSQL/MySQL; Private AI Foundation per workload AI in sicurezza.')
  return r
}
