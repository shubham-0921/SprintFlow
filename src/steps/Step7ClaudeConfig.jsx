import { FileText, ShieldCheck, Info } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const claudePrompt = `Update my ~/.claude/CLAUDE.md file to add an Azure DevOps section with these two standing rules:

1. Default project: always pass project: "Qwipo B2B" to every mcp__azure-devops__* tool call unless I explicitly say otherwise.

2. Story Edit Guard: before updating any work item of type Story, first fetch its current state. Only allow the update if the state is one of: New, Ready for Discussion, Ready for Refinement, or Ready For Grooming. If it's in any other state, block the update and tell me the current state. Never bypass this check even if I ask.

Replace "Qwipo B2B" with my actual Azure DevOps project name, and adjust the allowed Story states to match my team's workflow if needed.`

const rules = [
  {
    icon: <FileText size={15} className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />,
    title: 'Default project auto-fill',
    desc: 'Claude always passes your project name to every Azure DevOps tool call — you never need to specify it in a prompt.',
  },
  {
    icon: <ShieldCheck size={15} className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />,
    title: 'Story Edit Guard',
    desc: 'Claude checks the story state before any update. Stories in Active, Closed, or Resolved states are blocked — preventing accidental changes to in-flight or shipped work.',
  },
]

export default function Step7ClaudeConfig() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Give this prompt to Claude Code and it will update your{' '}
        <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">~/.claude/CLAUDE.md</code>{' '}
        with standing Azure DevOps rules that apply to every conversation — no need to repeat yourself each time.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {rules.map((r) => (
          <div key={r.title} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl">
            {r.icon}
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{r.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <CodeBlock
        code={claudePrompt}
        language="text"
        filename="Prompt for Claude Code"
      />

      <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl">
        <Info size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">Customise before sending</p>
          <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
            Tell Claude your actual Azure DevOps project name and your team's Story states when you send this prompt — it will tailor the CLAUDE.md rules accordingly.
          </p>
        </div>
      </div>
    </div>
  )
}
