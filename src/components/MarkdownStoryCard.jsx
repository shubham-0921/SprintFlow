import { useState } from 'react'
import { FileText, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import CopyButton from './CopyButton'

const PLACEHOLDER = `## Story Title
Sellers — Add Seller (Profile + Company / Brand Selection)

## Overview
Allow super admins to onboard a new seller by filling in their profile details and associating them with one or more companies and brands.

## Acceptance Criteria
1. Admin can fill in seller name, phone number, and email
2. Admin can select from existing companies or create a new one inline
3. Admin can associate multiple brands per company
4. Form validates required fields before submission
5. On success, seller appears in the Sellers list immediately`

function buildPrompt(markdown) {
  return `Read the following story brief and create a user story in the Qwipo B2B Azure DevOps project.

Map the content like this:
- First heading or "Story Title" → title field
- Overview / Background / Scope sections → HTML description field
- Acceptance Criteria section → acceptance criteria field as a numbered list
- Set Custom.Application to "Seller App" and Custom.StoryType to "User"

Before creating, fetch an existing story (e.g. #19137) to confirm the required custom fields for this project.

---
${markdown.trim()}
---

After creating, confirm the story ID and which feature it should be linked to (ask me if unsure).`
}

export default function MarkdownStoryCard() {
  const [markdown, setMarkdown] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)

  const prompt = buildPrompt(markdown || PLACEHOLDER)
  const hasContent = markdown.trim().length > 0

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3 bg-indigo-50/50 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/40">
        <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
          <FileText size={14} strokeWidth={2} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Create a story from a markdown brief
            </h4>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
              Create
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Paste your story brief in markdown — title, overview, acceptance criteria — and Claude will map it to the right Azure DevOps fields.
          </p>
        </div>
      </div>

      {/* Markdown input */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Your story brief (markdown)
          </p>
          {hasContent && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Ready to use</span>
          )}
        </div>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={10}
          className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Generated prompt preview */}
      <div className="px-4 pb-4 space-y-2">
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          {showPrompt ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {showPrompt ? 'Hide' : 'Preview'} generated prompt
        </button>

        {showPrompt && (
          <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 overflow-x-auto">
            <pre className="text-xs font-mono text-slate-400 leading-relaxed whitespace-pre-wrap">{prompt}</pre>
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <CopyButton
            text={prompt}
            label="Copy prompt"
            className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white px-4 py-2 text-sm"
          />
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles size={12} className="text-indigo-500" />
            {hasContent ? 'Prompt includes your brief' : 'Using placeholder — paste your own brief above'}
          </div>
        </div>
      </div>
    </div>
  )
}
