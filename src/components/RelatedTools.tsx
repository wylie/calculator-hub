import Card from './Card'

interface RelatedTool {
  path: string
  title: string
  icon: string
}

interface RelatedToolsProps {
  tools: RelatedTool[]
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null

  return (
    <section className="mt-8 pt-8 border-t border-slate-200" aria-label="Related calculators and converters">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Related Tools</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
        Explore more calculators and converters for related scenarios.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <a
            key={tool.path}
            href={tool.path}
            title={`Open ${tool.title}`}
            className="hover:opacity-75 transition-opacity"
          >
            <Card className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-blue-600"
                style={{ fontSize: '24px', fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
              >
                {tool.icon}
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{tool.title}</span>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}
