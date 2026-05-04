import { useState } from 'react'
import { Info, Terminal, FileCode, Sparkles, Key } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import CopyButton from '../components/CopyButton'

function buildConfig(orgName, token) {
  return `{
  "mcpServers": {
    "azure-devops": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@azure-devops/mcp",
        "${orgName}",
        "--authentication",
        "pat"
      ],
      "env": {
        "PERSONAL_ACCESS_TOKEN": "${token || 'PASTE_YOUR_BASE64_ENCODED_PAT_HERE'}"
      }
    }
  }
}`
}

function buildPrompt(orgName, token) {
  const config = buildConfig(orgName, token)
  return `Please set up the Azure DevOps MCP server for me:

${config}

Once done, let me know I need to restart Claude Code for changes to take effect.`
}

const tabs = [
  { id: 'prompt', label: 'Use a Prompt', icon: Terminal },
  { id: 'json', label: 'JSON Config', icon: FileCode },
]

export default function Step3Config({ orgName }) {
  const [activeTab, setActiveTab] = useState('prompt')
  const [token, setToken] = useState('')
  const [configCode, setConfigCode] = useState('')

  const effectiveConfig = configCode || buildConfig(orgName, token)
  const claudePrompt = buildPrompt(orgName, token)

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Choose how you'd like to set this up — let Claude do it for you with a prompt, or manually edit the config file.
      </p>

      {/* Token input — shared across both tabs */}
      <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-xl p-4 space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
          <Key size={12} />
          Your base64-encoded PAT (from Step 2)
        </label>
        <input
          type="text"
          value={token}
          onChange={(e) => { setToken(e.target.value); setConfigCode('') }}
          placeholder="Paste your encoded token here — e.g. OkNabTVN..."
          className="w-full px-3 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-700 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <p className="text-xs text-indigo-600 dark:text-indigo-400">
          Paste your token here and it will be injected into the config and prompt below automatically.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon size={14} strokeWidth={2} />
              {tab.label}
              {tab.id === 'prompt' && isActive === false && (
                <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                  Recommended
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* JSON Config tab */}
      {activeTab === 'json' && (
        <div className="space-y-4">
          <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
            <Info size={14} className="text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Click <strong className="text-slate-800 dark:text-slate-200">Edit</strong> to modify inline. Your encoded PAT from Step 2 is already injected if you pasted it above. Save to{' '}
              <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded text-xs">~/.claude/settings.json</code>{' '}
              then restart Claude Code.
            </p>
          </div>

          <CodeBlock
            code={effectiveConfig}
            language="json"
            filename="~/.claude/settings.json"
            editable
            onChange={setConfigCode}
          />

          <div className="flex items-start gap-2.5 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 rounded-xl px-4 py-3">
            <Info size={14} className="text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
            <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
              If the file already has other MCP servers, merge the <code className="font-mono bg-sky-100 dark:bg-sky-900/40 px-1 rounded">azure-devops</code> block into the existing <code className="font-mono bg-sky-100 dark:bg-sky-900/40 px-1 rounded">mcpServers</code> object — don't overwrite the whole file.
            </p>
          </div>
        </div>
      )}

      {/* Use a Prompt tab */}
      {activeTab === 'prompt' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-xl px-4 py-3.5">
            <Sparkles size={15} className="text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">Let Claude handle the setup</p>
              <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-0.5 leading-relaxed">
                Open Claude Code, paste the prompt below, and Claude will figure out where to add the MCP config and set it up for you. Make sure you've pasted your encoded PAT in the field above first.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Paste into Claude Code</p>
              <CopyButton text={claudePrompt} label="Copy prompt" />
            </div>
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">{claudePrompt}</pre>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">What happens</p>
            {[
              'Claude figures out where to add the MCP config and merges in the Azure DevOps block',
              'Your encoded PAT is already in the prompt above — nothing else needed',
              'Restart Claude Code to load the new MCP server',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
