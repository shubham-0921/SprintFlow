import { useState } from 'react'
import CopyButton from './CopyButton'
import { MessageSquare, Sparkles, ChevronDown } from 'lucide-react'

function EditablePrompt({ initial }) {
  const [value, setValue] = useState(initial)

  return (
    <div className="relative group">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={value.split('\n').length || 1}
        className="w-full bg-slate-950 rounded-lg px-3 py-3 text-xs font-mono text-slate-300 border border-slate-800 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none resize leading-relaxed transition-colors cursor-text"
        spellCheck={false}
        autoComplete="off"
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        <CopyButton text={value} />
      </div>
    </div>
  )
}

export default function PromptCard({ label, prompt, expect, tag, multi }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200">
      {/* Header — always visible, click to expand */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-4 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150"
      >
        <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shrink-0">
          <MessageSquare size={14} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</h4>
          {tag && (
            <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
              {tag}
            </span>
          )}
        </div>
        <span className={`text-xs font-medium transition-colors duration-150 ${open ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
          {open ? 'Close' : 'Expand'}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-indigo-500' : ''}`}
        />
      </button>

      {/* Expandable body */}
      {open && (
        <div className="border-t border-slate-100 dark:border-slate-800">
          {multi ? (
            <div className="px-4 py-3 space-y-3">
              {multi.map((step, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{step.label}</p>
                  <EditablePrompt initial={step.prompt} />
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3">
              <EditablePrompt initial={prompt} />
            </div>
          )}

          {expect && (
            <div className="px-4 pb-4">
              <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg px-3 py-2.5">
                <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">{expect}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
