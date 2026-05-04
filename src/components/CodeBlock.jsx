import { useState } from 'react'
import CopyButton from './CopyButton'
import { Pencil, Eye } from 'lucide-react'

function highlight(code, language) {
  if (language === 'json') {
    return code
      .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="text-sky-400">$1</span>:')
      .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="text-emerald-400">$1</span>')
      .replace(/:\s*(true|false|null)/g, ': <span class="text-purple-400">$1</span>')
      .replace(/:\s*(\d+)/g, ': <span class="text-amber-400">$1</span>')
  }
  if (language === 'bash' || language === 'sh') {
    return code
      .replace(/(#[^\n]*)/g, '<span class="text-slate-500">$1</span>')
      .replace(/\b(echo|base64|export|cd|npx|npm|node)\b/g, '<span class="text-sky-400">$1</span>')
      .replace(/(-n|-y|--version)\b/g, '<span class="text-amber-400">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-emerald-400">$1</span>')
  }
  return code
    .replace(/\b(const|let|var|function|return|import|export|from|default|if|else)\b/g,
      '<span class="text-purple-400">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-emerald-400">$1</span>')
}

export default function CodeBlock({ code, language = 'text', filename, className = '', editable = false, onChange }) {
  const [editing, setEditing] = useState(false)
  const displayCode = code

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-800 dark:border-slate-700 ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          {filename && (
            <span className="text-xs text-slate-500 font-mono ml-2">{filename}</span>
          )}
          {!filename && language && (
            <span className="text-xs text-slate-500 font-mono ml-2 uppercase">{language}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {editable && (
            <button
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                editing
                  ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
              aria-label={editing ? 'Done editing' : 'Edit code'}
            >
              {editing ? <><Eye size={12} /> Done</> : <><Pencil size={12} /> Edit</>}
            </button>
          )}
          <CopyButton text={displayCode} label="Copy" />
        </div>
      </div>
      <div className="bg-slate-950 relative">
        {editing ? (
          <textarea
            value={displayCode}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full p-4 bg-transparent text-sm font-mono leading-relaxed text-slate-300 outline-none resize-none min-h-[120px]"
            style={{ caretColor: '#818cf8' }}
            spellCheck={false}
            autoComplete="off"
            rows={displayCode.split('\n').length + 1}
          />
        ) : (
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-slate-300">
              <code dangerouslySetInnerHTML={{ __html: highlight(displayCode, language) }} />
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
