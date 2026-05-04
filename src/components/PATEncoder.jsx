import { useState } from 'react'
import { Key, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import CopyButton from './CopyButton'

export default function PATEncoder() {
  const [pat, setPat] = useState('')
  const [showPat, setShowPat] = useState(false)

  const encoded = pat ? btoa(`:${pat}`) : ''

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded-lg px-3 py-2">
        <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
        <span>Your PAT never leaves your browser — encoding happens entirely client-side.</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Paste your PAT token
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Key size={15} />
            </div>
            <input
              type={showPat ? 'text' : 'password'}
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button
              onClick={() => setShowPat(!showPat)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPat ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {pat && (
          <div className="flex items-center gap-2 text-slate-400 pl-1">
            <ArrowRight size={14} />
            <span className="text-xs">Base64 encoded</span>
          </div>
        )}

        {encoded && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Base64 encoded (for direct REST API calls)
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 overflow-x-auto">
                <code className="text-sm font-mono text-emerald-400 whitespace-nowrap">{encoded}</code>
              </div>
              <CopyButton text={encoded} label="Copy" className="shrink-0" />
            </div>
          </div>
        )}

        {!pat && (
          <div className="bg-slate-100 dark:bg-slate-800/40 rounded-lg px-4 py-3 text-center">
            <p className="text-xs text-slate-400">Enter your PAT above to see the encoded value</p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-700 dark:text-slate-300">Next:</strong> Copy the encoded value above and use it as the value for <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">AZURE_DEVOPS_EXT_PAT</code> in Step 3.
        </p>
      </div>
    </div>
  )
}
