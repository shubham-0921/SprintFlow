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

    </div>
  )
}
