import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, CheckCircle2, Circle } from 'lucide-react'
import Step1PAT from './steps/Step1PAT'
import Step2Encode from './steps/Step2Encode'
import Step3Config from './steps/Step3Config'
import Step4Verify from './steps/Step4Verify'
import Step5Prompts from './steps/Step5Prompts'
import Step6Gotchas from './steps/Step6Gotchas'

const STEPS_CONFIG = [
  {
    id: 'step-1',
    num: 1,
    title: 'Generate a PAT Token',
    subtitle: 'Your Azure DevOps access key',
    renderStep: (ctx) => <Step1PAT orgName={ctx.orgName} setOrgName={ctx.setOrgName} />,
  },
  {
    id: 'step-2',
    num: 2,
    title: 'Encode your PAT',
    subtitle: 'For direct REST API calls',
    renderStep: () => <Step2Encode />,
  },
  {
    id: 'step-3',
    num: 3,
    title: 'Connect Claude to Azure DevOps',
    subtitle: 'MCP server setup — JSON or prompt',
    renderStep: (ctx) => <Step3Config orgName={ctx.orgName} />,
  },
  {
    id: 'step-4',
    num: 4,
    title: 'Verify the Connection',
    subtitle: 'Confirm everything is working',
    renderStep: () => <Step4Verify />,
  },
  {
    id: 'step-5',
    num: 5,
    title: 'Prompt Library',
    subtitle: 'Ready-to-use prompts for your work',
    renderStep: () => <Step5Prompts />,
  },
  {
    id: 'step-6',
    num: 6,
    title: 'Gotchas & Learnings',
    subtitle: 'Known issues, already solved',
    renderStep: () => <Step6Gotchas />,
  },
]

export default function App() {
  const [dark, setDark] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [orgName, setOrgName] = useState('xavica')
  const [doneSteps, setDoneSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('done-steps') || '[]')
    } catch {
      return []
    }
  })
  const stepRefs = useRef([])

  const steps = STEPS_CONFIG
  const stepCtx = { orgName, setOrgName }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120 // offset for sticky header
      let current = 0
      stepRefs.current.forEach((ref, i) => {
        if (ref && ref.offsetTop <= scrollY) current = i
      })
      setActiveStep(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDone = (idx) => {
    const next = doneSteps.includes(idx)
      ? doneSteps.filter((i) => i !== idx)
      : [...doneSteps, idx]
    setDoneSteps(next)
    localStorage.setItem('done-steps', JSON.stringify(next))
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const doneCount = doneSteps.length

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

        {/* Top navbar */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">SF</span>
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">SprintFlow</span>
              <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-700 pl-3">Azure DevOps × Claude AI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-1.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${(doneCount / steps.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  {doneCount}/{steps.length}
                </span>
              </div>
              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-4">
                Setup Steps
              </p>
              {steps.map((step, i) => {
                const isDone = doneSteps.includes(i)
                const isActive = activeStep === i
                return (
                  <button
                    key={step.id}
                    onClick={() => scrollTo(step.id)}
                    className={`sidebar-link w-full text-left ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 size={14} strokeWidth={2.5} /> : step.num}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold truncate ${isActive ? 'text-indigo-700 dark:text-indigo-300' : ''}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">{step.subtitle}</p>
                    </div>
                  </button>
                )
              })}

              <div className="pt-4 px-3">
                <div className="h-px bg-slate-200 dark:bg-slate-800 mb-4" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 dark:text-slate-500">Progress</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{doneCount} of {steps.length} done</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${(doneCount / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-6">

            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur-sm mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Up and running in under 10 minutes
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                  Your Azure DevOps backlog,<br />managed from Claude AI
                </h1>
                <p className="text-sm text-indigo-200 leading-relaxed max-w-lg">
                  Create user stories, manage sprints, and update work items by just describing what you want — no Azure DevOps portal needed. This guide walks you from zero to fully operational in 6 steps.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['Create stories', 'Manage sprints', 'Link features', 'No portal needed'].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/15 text-white/90">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step cards */}
            {steps.map((step, i) => {
              const isDone = doneSteps.includes(i)
              return (
                <div
                  key={step.id}
                  id={step.id}
                  ref={(el) => (stepRefs.current[i] = el)}
                  className="step-card overflow-hidden"
                >
                  <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                        isDone
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                      }`}>
                        {isDone ? <CheckCircle2 size={18} strokeWidth={2} /> : step.num}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{step.title}</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.subtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleDone(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isDone ? (
                        <><CheckCircle2 size={13} strokeWidth={2.5} /> Done</>
                      ) : (
                        <><Circle size={13} strokeWidth={2} /> Mark done</>
                      )}
                    </button>
                  </div>

                  <div className="px-6 py-6">
                    {step.renderStep(stepCtx)}
                  </div>
                </div>
              )
            })}

            <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500 space-y-1">
              <p>MCP server: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">@azure-devops/mcp</code></p>
              <p className="text-slate-500 dark:text-slate-500">Built by <strong className="text-slate-600 dark:text-slate-400">Shubham</strong> for the {orgName} team.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
