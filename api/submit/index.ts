import { EmailClient, EmailMessage } from "@azure/communication-email";

const connectionString = process.env["AZURE_COMMUNICATION_CONNECTION_STRING"];

export async function post(context, req) {
  try {
    const { projectName, customer, email, dateISO, answers, pillarScores, maturityScores, needScores } = await req.json();

    if (!connectionString) throw new Error("ACS connection string missing");

    const client = new EmailClient(connectionString);

    const message: EmailMessage = {
      senderAddress: process.env["MAIL_FROM"]!,
      content: {
        subject: `Report VCF - ${customer}`,
        html: `
          <h2>Report valutazione VMware Cloud Foundation</h2>
          <p><b>Cliente:</b> ${customer}</p>
          <p><b>Progetto:</b> ${projectName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Data:</b> ${new Date(dateISO).toLocaleString("it-IT")}</p>
          <h3 style="color:#0077cc;">🔹 Maturità attuale</h3>
          <ul>
            ${Object.entries(maturityScores)
             .map(([pillar, score]) => `<li><b>${pillar}</b>: ${score.toFixed(1)}/5</li>`)
             .join("")}
          </ul>

          <h3 style="color:#ff6600;">🔸 Esigenze prioritarie</h3>
          <ul>
            ${Object.entries(needScores)
              .map(([pillar, score]) => `<li><b>${pillar}</b>: ${score.toFixed(1)}/5</li>`)
              .join("")}
          </ul>

  <h3 style="color:#444;">📊 Totale complessivo</h3>
  <ul>
    ${Object.entries(pillarScores)
      .map(([pillar, score]) => `<li><b>${pillar}</b>: ${score.toFixed(1)}/5</li>`)
      .join("")}
  </ul>
        `,
        plainText: `Cliente: ${customer}\nProgetto: ${projectName}\nPunteggi:\n${Object.entries(pillarScores).map(([p,s])=>`${p}: ${s.toFixed(1)}/5`).join("\n")}`
      },
      recipients: {
        to: [
          {
            address: process.env["MAIL_TO"]!,
            displayName: "Arrow ECS Team"
          }
        ]
      }
    };

    const poller = await client.beginSend(message);
    const result = await poller.pollUntilDone();

    if (result.status === "succeeded") {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      throw new Error(`Email send failed: ${JSON.stringify(result.error)}`);
    }

  } catch (err) {
    console.error("Errore invio email ACS:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
