import { Link } from 'react-router-dom'
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
    <div className="mt-8 pt-8 border-t border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="hover:opacity-75 transition-opacity"
          >
            <Card className="flex items-center gap-3">
              <span 
                className="material-symbols-outlined text-blue-600"
                style={{ fontSize: '24px', fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
              >
                {tool.icon}
              </span>
              <span className="text-sm font-medium text-slate-700">{tool.title}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
