import PromptCard from '../components/PromptCard'

const prompts = [
  {
    label: 'List all projects in the org',
    tag: 'Discovery',
    prompt: `Let's check what is inside the xavica Azure DevOps org — list all projects.`,
    expect: 'Returns a list of all projects with name, description, and last updated date.',
  },
  {
    label: 'Fetch all stories under a feature',
    tag: 'Read',
    multi: [
      {
        label: 'Step 1 — Get the feature',
        prompt: `Can you fetch the story in feature - 19136`,
      },
      {
        label: 'Step 2 — Get titles in a table',
        prompt: `Yep and create a table with titles`,
      },
    ],
    expect: 'Returns feature #19136 (Super Admin) with a markdown table of all 10 child stories — ID, Title, and State.',
  },
  {
    label: 'Get a specific story with full details',
    tag: 'Read',
    prompt: `Get the full details of story #19137 — title, description, acceptance criteria, state, sprint, and assignee.`,
    expect: 'All fields for the story rendered clearly, including custom fields, parent feature, and acceptance criteria.',
  },
  {
    label: 'Inspect custom fields before creating',
    tag: 'Best Practice',
    prompt: `Before I create a new story, fetch story #19137 and show me all custom fields and their values.`,
    expect: 'Returns Custom.Application, Custom.StoryType, and other project-specific required fields — use these values as defaults.',
  },
  {
    label: 'Create a feature in the backlog',
    tag: 'Create',
    prompt: `Create a new feature in the Qwipo B2B project backlog titled "Super Admin" under Sprint SP 67. Add a description: "This feature covers the Super Admin portal including login, seller management, and company/brand configuration."`,
    expect: 'A new Feature work item is created using wit_create_work_item with workItemType: Feature. Returns the new item ID.',
  },
  {
    label: 'Create a story under a feature (2-step)',
    tag: 'Create',
    multi: [
      {
        label: 'Step 1 — Create the story',
        prompt: `Create a new story in the Qwipo B2B project titled "Test Story : Created from Claude Code".
Set Application to "Seller App", Story Type to "User".
Add a detailed description with Overview, Background, and Scope sections.
Add acceptance criteria as a numbered list.`,
      },
      {
        label: 'Step 2 — Link to parent feature',
        prompt: `Now link story #<NEW_STORY_ID> to feature #19136 as a child (parent link).`,
      },
    ],
    expect: 'After step 2, the story appears under Feature #19136 with System.Parent: 19136 and a Hierarchy-Reverse relation confirmed.',
  },
  {
    label: 'Update a story\'s state or assignee',
    tag: 'Update',
    prompt: `Update story #19137 — change state to "Active" and assign it to Shubham.`,
    expect: 'The work item is updated via wit_update_work_item. Returns the updated item with the new state and assignee.',
  },
  {
    label: 'List all stories in the current sprint',
    tag: 'Sprint',
    prompt: `List all user stories assigned to the current sprint in the Qwipo B2B project. Show ID, title, state, and assignee in a table.`,
    expect: 'A table of all stories in the active sprint with their status and ownership.',
  },
]

export default function Step5Prompts() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Copy-paste any of these prompts directly into Claude Code. Hover over a prompt to reveal the copy button.
      </p>

      <div className="grid gap-4">
        {prompts.map((p, i) => (
          <PromptCard key={i} {...p} />
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Real stories used as examples (xavica / Qwipo B2B)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-2.5 whitespace-nowrap">ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-2.5">Type</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-2.5">Title</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-2.5">State</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#19136', type: 'Feature', title: 'Super Admin', state: 'New', typeCls: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400' },
                { id: '#19137', type: 'Story', title: 'Super Admin Login (Phone + OTP)', state: 'New', typeCls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400' },
                { id: '#19138', type: 'Story', title: 'Phase 1 Super Admin Dashboard Landing Page', state: 'New', typeCls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400' },
                { id: '#19139', type: 'Story', title: 'Sellers — List Page (Search, Add Seller)', state: 'New', typeCls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400' },
                { id: '#19230', type: 'Story', title: 'Test Story : Created from Claude Code', state: 'New', typeCls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400', note: true },
              ].map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${row.note ? 'bg-indigo-50/50 dark:bg-indigo-950/10' : ''}`}>
                  <td className="px-4 py-2.5">
                    <code className="text-xs font-mono text-slate-600 dark:text-slate-400">{row.id}</code>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${row.typeCls}`}>{row.type}</span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300">
                    {row.title}
                    {row.note && <span className="ml-2 px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 rounded font-medium">via MCP</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">{row.state}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
