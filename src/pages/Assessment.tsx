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
import { buildBaselineNarrative, evaluateAnswer, mergeNarratives } from "../lib/insights"
import type { Answer, BaselineContext } from "../types"

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
  const progress = baseline ? Math.round((answers.length / totalQuestions) * 100) : 0

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
      [question.id]: evaluateAnswer(question, pendingScore, baseline, updatedAnswers),
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

            {answers.length === totalQuestions && (
              <ResultSummary
                baseline={baseline}
                pillarScores={pillarScores}
                maturityScores={maturityScores}
                needScores={needScores}
                totalCores={totalCores}
              />
            )}
          </>
        )}
      </section>
    </Layout>
  )
}
