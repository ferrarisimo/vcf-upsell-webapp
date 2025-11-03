# Arrow × VMware — VCF Value Assessment

## Prerequisiti
- Azure Subscription
- Azure Static Web Apps (piano Standard/BYOF)
- Azure Storage Account + Tabella `Submissions` (usata per tracking)
- SendGrid (piano gratuito sufficiente) o Azure Communication Services Email
- Node 20 LTS, Azure Functions runtime v4

## Setup locale
```bash
npm i
npm run dev
```

## Deploy su Azure Static Web Apps
1. **Creazione risorsa**
   - In Azure Portal: *Create Resource* → **Static Web App**
   - Piano: *Standard*. Region: EU.
   - *Source*: `Other` (deploy manuale);
   - App location: `/`
   - Api location: `/api`
   - Output location: `dist`

2. **Configurare Storage Table**
   - Crea un *Storage Account*.
   - Abilita una **Tabella** chiamata `Submissions`.
   - Genera una **SAS URL** per la Tabella (permessi Add/Update). Conserva l’URL completo.

3. **Configurare variabili d’ambiente** (Static Web Apps → *Configuration*)
   - `TABLE_SAS_URL` = `<SAS URL della tabella Submissions>`
   - `SENDGRID_API_KEY` = `<API key>`
   - `MAIL_FROM` = `noreply@tuodominio` (indirizzo mittente verificato)

4. **Build & Deploy**
   - Da locale: `npm run build`
   - Zippa il contenuto della root (includendo `/dist` e la cartella `/api`).
   - In Static Web Apps → *Deployment Center* → *Upload* → carica lo zip.

   *Alternativa (GitHub Actions)*: collegare il repo GitHub; Azure genererà il workflow con build di `dist` e deploy delle Functions.

5. **Test**
   - Apri l’URL della SWA.
   - Compila il questionario, inserisci l’email, verifica ricezione PDF.
   - Controlla la Tabella `Submissions` per il tracking.

## Branding
- Sostituisci `public/arrow-logo.svg` e `public/vmware-logo.svg` con asset ufficiali.
- Colori Arrow e VMware definiti in `tailwind.config.js`.

## Note di sicurezza
- Non salvare risposte raw nel database; persistiamo solo punteggi aggregati (GDPR friendly).
- Per esigenze di *data residency*, usa risorse in region EU.
- Opzionalmente abilita **AAD B2C** per autenticare utenti interni.

## Estensioni suggerite
- Esportare anche **CSV** lato Functions.
- Integrazione con **Microsoft Forms/CRM** (Dynamics, HubSpot) via webhook.
- Aggiungere toggle per **VCF Edge** e requisiti **PAIF‑N**.
