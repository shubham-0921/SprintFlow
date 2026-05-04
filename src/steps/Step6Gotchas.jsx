import GotchaCard from '../components/GotchaCard'
import { Lightbulb } from 'lucide-react'

const gotchas = [
  {
    number: 1,
    title: '`Custom.Application` Is Always Required',
    description: "When creating a Story in Qwipo B2B (and likely in other customised Azure DevOps projects), there's a required custom field called Custom.Application. Passing only standard fields will fail.",
    error: `TF401320: Rule Error for field Application. Error code: Required, HasValues, LimitedToValues, AllowsOldValue, InvalidEmpty.`,
    fix: 'Before creating a new story, fetch an existing story from the same project to discover the required field values. For Qwipo B2B: Custom.Application → "Seller App", Custom.StoryType → "User".',
    fixPrompt: `Fetch story #19137 and show me the Custom.Application and Custom.StoryType fields.`,
  },
  {
    number: 2,
    title: '`System.Parent` on Create Does NOT Set Hierarchy',
    description: 'Passing System.Parent: 19136 as a field in wit_create_work_item does not establish the parent-child hierarchy link. The story is created but appears as an orphan — not visible under the feature in the backlog.',
    fix: 'After creating the story, use a separate link call. Claude Code will use wit_work_items_link with type: "parent", which correctly adds the Hierarchy-Reverse relation and sets System.Parent.',
    fixPrompt: `Link story #<NEW_ID> to feature #19136 as a child.`,
  },
  {
    number: 3,
    title: 'Always Inspect an Existing Item Before Creating',
    description: 'Azure DevOps projects can have project-specific required fields (Custom.Application, Custom.StoryType, Custom.RuntimeEnvironment). These are not in the standard API schema and only surface as errors at creation time.',
    fix: 'Use this best-practice prompt before creating any new work item in an unfamiliar project:',
    fixPrompt: `Before I create a new story, fetch story #19137 and show me all custom fields and their values.`,
  },
]

export default function Step6Gotchas() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        These are real issues discovered during usage of the Azure DevOps MCP server. Save yourself hours — read these before creating work items.
      </p>

      <div className="space-y-4">
        {gotchas.map((g) => (
          <GotchaCard key={g.number} {...g} />
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
        <Lightbulb size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Pro tip: Let Claude explore first</p>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1 leading-relaxed">
            Before batch-creating stories, ask Claude to fetch the project's work item types and required fields. This eliminates all validation errors upfront and produces cleaner results.
          </p>
        </div>
      </div>
    </div>
  )
}
