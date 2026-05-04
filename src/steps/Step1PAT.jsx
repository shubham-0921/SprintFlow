import { useState } from 'react'
import { ExternalLink, CheckCircle2, Pencil, Check } from 'lucide-react'

const scopes = [
  { name: 'Work Items', permission: 'Read & Write', required: true },
  { name: 'Project and Team', permission: 'Read', required: true },
  { name: 'Code', permission: 'Not required', required: false },
]

export default function Step1PAT({ orgName, setOrgName }) {
  const [editingOrg, setEditingOrg] = useState(false)
  const [draft, setDraft] = useState(orgName)

  const confirmOrg = () => {
    setOrgName(draft.trim() || 'xavica')
    setEditingOrg(false)
  }

  const patUrl = `https://dev.azure.com/${orgName}/_usersSettings/tokens`

  const steps = [
    {
      num: 1,
      content: (
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <span>Go to</span>
          {editingOrg ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-xs">https://dev.azure.com/</span>
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') confirmOrg() }}
                className="w-28 px-2 py-0.5 text-xs font-mono rounded-md bg-white dark:bg-slate-800 border-2 border-indigo-400 text-slate-900 dark:text-slate-100 outline-none"
              />
              <button
                onClick={confirmOrg}
                className="p-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <Check size={12} strokeWidth={3} />
              </button>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 group">
              <a
                href={`https://dev.azure.com/${orgName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-700 dark:hover:text-indigo-300 px-2 py-0.5 rounded font-mono border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
              >
                https://dev.azure.com/{orgName}
              </a>
              <button
                onClick={() => { setDraft(orgName); setEditingOrg(true) }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                title="Edit org name"
              >
                <Pencil size={11} />
              </button>
            </span>
          )}
          <span className="text-slate-500 text-xs italic">(hover the URL to change your org name)</span>
        </div>
      ),
    },
    {
      num: 2,
      content: (
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Click your <strong>profile avatar</strong> (top-right corner) → <strong>Personal Access Tokens</strong>.
        </p>
      ),
    },
    {
      num: 3,
      content: (
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Click <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-600 text-white text-xs font-medium">+ New Token</span>.
        </p>
      ),
    },
    {
      num: 4,
      content: (
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">Fill in the form:</p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            {[
              { label: 'Name', value: "claude-code-mcp (any name you'll recognise)" },
              { label: 'Organisation', value: `Select your org — "${orgName}"` },
              { label: 'Expiration', value: '90 days recommended' },
              { label: 'Scopes', value: 'Custom defined → Work Items (Read & Write) + Project and Team (Read)' },
            ].map((item, i, arr) => (
              <div key={i} className={`flex items-start gap-3 px-3 py-2 ${i !== arr.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                <span className="w-28 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{item.label}</span>
                <span className="text-slate-700 dark:text-slate-300 text-xs">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      num: 5,
      content: (
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Click <strong>Create</strong> and <span className="text-amber-600 dark:text-amber-400 font-semibold">copy your token immediately</span> — Azure DevOps won't show it again after you close the dialog.
        </p>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        A PAT (Personal Access Token) is your personal key that lets Claude AI read and write to your Azure DevOps workspace. It takes about 2 minutes to generate and only needs to be done once per team member.
      </p>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
              {step.num}
            </div>
            <div className="flex-1 pt-0.5">{step.content}</div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Required permissions</p>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="grid grid-cols-3 px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Area</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Access Level</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Needed?</span>
          </div>
          {scopes.map((scope, i) => (
            <div key={i} className={`grid grid-cols-3 px-4 py-3 ${i !== scopes.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
              <span className="text-slate-700 dark:text-slate-300 font-medium text-xs">{scope.name}</span>
              <span className="text-slate-600 dark:text-slate-400 text-xs">{scope.permission}</span>
              <span className={`flex items-center gap-1 text-xs font-medium ${scope.required ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                {scope.required && <CheckCircle2 size={12} strokeWidth={2.5} />}
                {scope.required ? 'Yes' : 'No'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={patUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors duration-200"
      >
        Open PAT Settings for {orgName}
        <ExternalLink size={14} strokeWidth={2} />
      </a>
    </div>
  )
}
