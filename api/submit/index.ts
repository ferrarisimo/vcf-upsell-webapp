import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { getTable } from '../_shared/storage'
import { buildPdf } from '../_shared/pdf'
import fetch from 'node-fetch'

app.http('submit', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> => {
    try{
      const payload = await req.json()
      const table = getTable()
      const rowKey = Date.now().toString()
      const partitionKey = (payload.customer || 'Unknown').replace(/[^a-zA-Z0-9]/g,'_')
      // Persist minimal data
      await table.createEntity({ partitionKey, rowKey, ...{
        email: payload.email,
        projectName: payload.projectName,
        customer: payload.customer,
        dateISO: payload.dateISO,
        pillarScores: JSON.stringify(payload.pillarScores)
      } })

      // Build PDF
      const pdf = await buildPdf(payload)

      // Send email via SendGrid
      const sgKey = process.env.SENDGRID_API_KEY
      const from = process.env.MAIL_FROM || 'noreply@arrow-ecs.example'
      const subject = `Report VCF Value Assessment — ${payload.projectName}`
      const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${sgKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations:[{ to:[{ email: payload.email }], subject }],
          from: { email: from, name: 'Arrow ECS' },
          content: [{ type:'text/plain', value: 'In allegato il report VCF Value Assessment. Grazie per aver utilizzato la nostra webapp.' }],
          attachments: [{ content: pdf.toString('base64'), filename: 'VCF-Value-Assessment.pdf', type: 'application/pdf', disposition: 'attachment' }]
        })
      })
      if(!resp.ok){ ctx.error(`SendGrid error: ${await resp.text()}`) }

      return { status: 200, jsonBody: { ok:true } }
    }catch(e:any){
      ctx.error(e)
      return { status: 500, jsonBody: { ok:false, error: e?.message || 'error' } }
    }
  }
})
