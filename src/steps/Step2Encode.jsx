import PATEncoder from '../components/PATEncoder'

export default function Step2Encode() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Before adding your PAT to the Claude Code config, you need to base64-encode it. Paste your PAT below and copy the encoded value — you'll use it in Step 3. Everything runs in your browser, nothing is sent anywhere.
      </p>

      <PATEncoder />
    </div>
  )
}
