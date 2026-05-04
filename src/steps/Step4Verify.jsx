import { CheckCircle2, Terminal, RefreshCw } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const VERIFY_PROMPT = `Let's check what is inside the xavica Azure DevOps org — list all projects.`

const EXPECTED_OUTPUT = `Qwipo B2B — Application Life Cycle Management for Qwipo Inventory Model`

export default function Step4Verify() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        After saving the config file, restart Claude Code so the MCP server loads. Then paste the verification prompt below — if it works, you're ready.
      </p>

      <div className="grid gap-3">
        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
            <RefreshCw size={15} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">1. Restart Claude Code</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Press <kbd className="px-1.5 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 rounded font-mono border border-slate-300 dark:border-slate-600">Ctrl+C</kbd> to quit and relaunch. The MCP server loads at startup.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Terminal size={15} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">2. Paste the verification prompt</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Type or paste the prompt below directly into Claude Code.</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Verification prompt</p>
        <CodeBlock code={VERIFY_PROMPT} language="text" />
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Expected response</p>
        <div className="rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-800/40">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800/40">
            <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Claude Code uses <code className="font-mono bg-emerald-100 dark:bg-emerald-900/40 px-1 rounded">core_list_projects</code> and returns:</span>
          </div>
          <div className="bg-slate-950 px-4 py-3">
            <code className="text-sm font-mono text-emerald-400">{EXPECTED_OUTPUT}</code>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl">
        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
          If you see the project name returned, your MCP server is <strong>live and ready</strong>. Proceed to the prompt library.
        </p>
      </div>
    </div>
  )
}
