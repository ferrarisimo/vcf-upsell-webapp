import { FileDown } from "lucide-react"
import { useMemo, useState } from "react"
import Layout from "../components/Layout"
import Stepper from "../components/Stepper"
import QuestionCard from "../components/QuestionCard"
import ResultSummary from "../components/ResultSummary"
import BaselineForm from "../components/BaselineForm"
import BaselineOverview from "../components/BaselineOverview"
import AnswerFeedbackCard from "../components/AnswerFeedbackCard"
import InsightsPanel from "../components/InsightsPanel"
import { QUESTIONS } from "../lib/questions"
import { aggregate } from "../lib/scoring"
import {
  buildBaselineNarrative,
  buildPillarAverageNarratives,
  evaluateAnswer,
  mergeNarratives,
} from "../lib/insights"
import type { Answer, BaselineContext, Pillar } from "../types"

export default function Assessment() {
  const [baseline, setBaseline] = useState<BaselineContext | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [narratives, setNarratives] = useState<Record<string, ReturnType<typeof evaluateAnswer>>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pendingScore, setPendingScore] = useState<number | null>(null)
  const [lastQuestionId, setLastQuestionId] = useState<string | null>(null)

  const totalQuestions = QUESTIONS.length
  const currentQuestion = QUESTIONS[currentIndex]

  const totalCores = baseline ? baseline.hosts * baseline.cpusPerHost * baseline.coresPerCpu : 0
  const { pillarScores, maturityScores, needScores } = useMemo(() => aggregate(answers), [answers])
  const baselineNarrative = useMemo(
    () => (baseline ? buildBaselineNarrative(baseline, totalCores) : { critical: [], insights: [], strengths: [] }),
    [baseline, totalCores],
  )
  const combinedNarrative = useMemo(
    () => mergeNarratives([baselineNarrative, ...Object.values(narratives)]),
    [baselineNarrative, narratives],
  )
  const pillarNarratives = useMemo(
    () => buildPillarAverageNarratives(pillarScores as Record<Pillar, number>),
    [pillarScores],
  )
  const progress = baseline ? Math.round((answers.length / totalQuestions) * 100) : 0
  const isComplete = baseline !== null && answers.length === totalQuestions

  const escapeHtml = (value: string | number) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

  function buildList(items: string[], emptyLabel: string) {
    const source = items.length ? items : [emptyLabel]
    return source
      .map((item) => `<li><span class="dot"></span><p>${escapeHtml(item)}</p></li>`)
      .join("")
  }

  function handleExportPdf() {
    if (!baseline || !isComplete) return

    const reportWindow = window.open("", "_blank", "width=900,height=650")
    if (!reportWindow) return

    const safe = escapeHtml
    const entries = Object.entries(pillarScores) as [Pillar, number][]
    const detailRows = entries
      .map(([pillar, score]) => {
        const need = (needScores[pillar] ?? 0).toFixed(1)
        const maturity = (maturityScores[pillar] ?? 0).toFixed(1)
        return `
          <tr>
            <td>${safe(pillar)}</td>
            <td>${safe(score.toFixed(1))}/5</td>
            <td>${safe(need)}/5</td>
            <td>${safe(maturity)}/5</td>
          </tr>
        `
      })
      .join("")

    const pillarNotes = pillarNarratives
      .map((item) => `<li class="${item.tone}"><strong>${safe(item.pillar)}</strong><span>${safe(item.message)}</span></li>`)
      .join("")

    const html = `<!DOCTYPE html>
      <html lang="it">
        <head>
          <meta charset="utf-8" />
          <title>Report Assessment VMware Cloud Foundation</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; margin: 32px; }
            h1 { font-size: 24px; margin-bottom: 4px; }
            h2 { font-size: 18px; margin: 24px 0 12px; color: #1e293b; }
            p { line-height: 1.6; margin: 0 0 6px; }
            ul { padding: 0; margin: 12px 0; list-style: none; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
            th, td { border: 1px solid #cbd5f5; padding: 6px 8px; text-align: left; }
            th { background: #e2e8f0; font-weight: 600; }
            section { page-break-inside: avoid; }
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
            .grid article { background: #f8fafc; padding: 10px 12px; border-radius: 10px; border: 1px solid #e2e8f0; }
            .grid article span { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }
            .grid article strong { display: block; margin-top: 4px; font-size: 14px; color: #0f172a; }
            li.critical { border-left: 3px solid #f87171; padding-left: 10px; margin-bottom: 8px; }
            li.positive { border-left: 3px solid #34d399; padding-left: 10px; margin-bottom: 8px; }
            li.critical strong, li.positive strong { display: block; font-size: 12px; text-transform: uppercase; color: #475569; letter-spacing: 0.08em; }
            li.critical span, li.positive span { display: block; font-size: 13px; color: #0f172a; margin-top: 2px; }
            .list { margin: 0; padding: 0; }
            .list li { display: flex; gap: 8px; margin-bottom: 6px; }
            .list .dot { width: 6px; height: 6px; border-radius: 9999px; background: #0f172a; margin-top: 6px; display: inline-block; }
            .list p { margin: 0; font-size: 13px; }
            footer { margin-top: 36px; font-size: 11px; color: #64748b; }
            @media print {
              body { margin: 24px 40px; }
              a { color: inherit; text-decoration: none; }
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Report Assessment VMware Cloud Foundation</h1>
            <p>Generato il ${safe(new Date().toLocaleDateString("it-IT"))} alle ${safe(new Date().toLocaleTimeString("it-IT"))}</p>
          </header>

          <section>
            <h2>Baseline operativa</h2>
            <div class="grid">
              <article><span>Release attuale</span><strong>${safe(baseline.currentVersion)}</strong></article>
              <article><span>Numero host</span><strong>${safe(baseline.hosts)}</strong></article>
              <article><span>CPU per host</span><strong>${safe(baseline.cpusPerHost)}</strong></article>
              <article><span>Core per CPU</span><strong>${safe(baseline.coresPerCpu)}</strong></article>
              <article><span>Core totali stimati</span><strong>${safe(totalCores)}</strong></article>
            </div>
          </section>

          <section>
            <h2>Sintesi dei punteggi medi</h2>
            <ul>
              ${pillarNotes || '<li>Nessun punteggio disponibile</li>'}
            </ul>
          </section>

          <section>
            <h2>Dettaglio punteggi per pilastro</h2>
            <table>
              <thead>
                <tr>
                  <th>Pilastro</th>
                  <th>Punteggio medio</th>
                  <th>Necessità percepita</th>
                  <th>Maturità attuale</th>
                </tr>
              </thead>
              <tbody>
                ${detailRows}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Punti critici</h2>
            <ul class="list">${buildList(combinedNarrative.critical, "Nessun punto critico registrato")}</ul>
          </section>

          <section>
            <h2>Insight VMware Cloud Foundation</h2>
            <ul class="list">${buildList(combinedNarrative.insights, "Nessun insight disponibile")}</ul>
          </section>

          <section>
            <h2>Punti di forza</h2>
            <ul class="list">${buildList(combinedNarrative.strengths, "Nessun punto di forza registrato")}</ul>
          </section>

          <footer>
            Report creato automaticamente dalla piattaforma di assessment VMware Cloud Foundation.
          </footer>

          <script>
            window.addEventListener('load', () => {
              setTimeout(() => { window.print(); }, 300);
            });
          </script>
        </body>
      </html>`

    reportWindow.document.write(html)
    reportWindow.document.close()
  }

  function handleBaselineSubmit(payload: BaselineContext) {
    setBaseline(payload)
  }

  function handleScoreSelection(score: number) {
    setPendingScore(score)
  }

  function commitAnswer() {
    if (!baseline || pendingScore === null) return

    const question = QUESTIONS[currentIndex]
    const nextAnswer: Answer = {
      id: question.id,
      pillar: question.pillar,
      type: question.type,
      score: pendingScore,
    }

    const updatedAnswers = [...answers.filter((a) => a.id !== question.id), nextAnswer]

    setAnswers(updatedAnswers)

    setNarratives((prev) => ({
      ...prev,
      [question.id]: evaluateAnswer(question, pendingScore, baseline),
    }))

    setLastQuestionId(question.id)
    setPendingScore(null)

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((idx) => idx + 1)
    }
  }

  const lastNarrative = lastQuestionId ? narratives[lastQuestionId] : null
  const lastQuestion = lastQuestionId ? QUESTIONS.find((q) => q.id === lastQuestionId) ?? null : null

  return (
    <Layout>
      <section className="container-xl py-10 space-y-8">
        <div className="card p-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="grow">
            <h2 className="text-3xl font-bold">Percorso verso VMware Cloud Foundation</h2>
            <p className="text-slate-600 mt-1">
              Dalla release attuale all'adozione completa di VCF: rispondi alle domande sequenziali e scopri immediatamente gap e
              opportunità.
            </p>
          </div>
          <div className="w-full lg:w-64">
            <Stepper value={progress} />
            <p className="text-xs text-slate-500 mt-2 text-center lg:text-left">
              {baseline ? `${answers.length}/${totalQuestions} completate` : "Inserisci prima la baseline"}
            </p>
          </div>
        </div>

        {!baseline && <BaselineForm onSubmit={handleBaselineSubmit} />}

        {baseline && (
          <>
            <BaselineOverview baseline={baseline} totalCores={totalCores} />

            {answers.length < totalQuestions && (
              <div className="space-y-4">
                <QuestionCard
                  key={currentQuestion.id}
                  index={answers.length + 1}
                  total={totalQuestions}
                  pillar={currentQuestion.pillar}
                  title={currentQuestion.title}
                  helper={currentQuestion.helper}
                  type={currentQuestion.type}
                  onChange={handleScoreSelection}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={commitAnswer}
                    disabled={pendingScore === null}
                    className={`btn-primary sm:w-auto ${pendingScore === null ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Conferma risposta e mostra insight
                  </button>
                </div>
              </div>
            )}

            {lastNarrative && lastQuestion && <AnswerFeedbackCard question={lastQuestion} narrative={lastNarrative} />}

            <InsightsPanel narrative={combinedNarrative} />

            {isComplete && (
              <ResultSummary
                baseline={baseline}
                pillarScores={pillarScores}
                maturityScores={maturityScores}
                needScores={needScores}
                totalCores={totalCores}
                pillarNarratives={pillarNarratives}
              />
            )}

            {isComplete && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <FileDown className="h-4 w-4" aria-hidden />
                  Esporta report PDF
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </Layout>
  )
}
