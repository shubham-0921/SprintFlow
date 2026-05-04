import { AlertTriangle } from 'lucide-react'
import CodeBlock from './CodeBlock'

export default function GotchaCard({ number, title, description, error, fix, fixPrompt }) {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
          <AlertTriangle size={16} strokeWidth={2} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">Gotcha #{number}</span>
          </div>
          <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 mt-0.5">{title}</h4>
          <p className="text-sm text-amber-800 dark:text-amber-300 mt-1.5 leading-relaxed">{description}</p>
        </div>
      </div>

      {error && (
        <div className="ml-11">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1.5 uppercase tracking-wider">Error you'll see</p>
          <pre className="bg-red-950/40 border border-red-900/50 rounded-lg p-3 text-xs font-mono text-red-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {error}
          </pre>
        </div>
      )}

      <div className="ml-11 space-y-2">
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Fix</p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{fix}</p>
        {fixPrompt && (
          <div className="mt-2">
            <CodeBlock code={fixPrompt} language="text" />
          </div>
        )}
      </div>
    </div>
  )
}
