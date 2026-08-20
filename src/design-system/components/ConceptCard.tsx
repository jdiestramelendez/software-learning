import { Card } from './Card'
import { CodeBlock } from './CodeBlock'

export interface ConceptCardProps {
  icon: string
  title: string
  headline: string
  body: string[]
  keyPoints: string[]
  /** Heading above the key points, e.g. "Worth remembering". */
  keyPointsLabel: string
  example?: { caption: string; code: string }
}

/**
 * The teaching screen shown before a unit's questions. Deliberately the only
 * place in the app with long-form prose — everything else is interaction.
 */
export function ConceptCard({
  icon,
  title,
  headline,
  body,
  keyPoints,
  keyPointsLabel,
  example,
}: ConceptCardProps) {
  return (
    <article className="animate-rise space-y-5">
      <header className="flex items-start gap-4">
        <span aria-hidden className="text-5xl leading-none">
          {icon}
        </span>
        <div>
          <p className="text-eyebrow uppercase text-wolf">{title}</p>
          <h1 className="mt-1 text-title text-feather-green">{headline}</h1>
        </div>
      </header>

      <div className="space-y-3">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="font-semibold leading-relaxed text-eel">
            {paragraph}
          </p>
        ))}
      </div>

      <Card className="border-macaw bg-iguana">
        <p className="text-eyebrow uppercase text-whale">{keyPointsLabel}</p>
        <ul className="mt-3 space-y-2">
          {keyPoints.map((point) => (
            <li key={point.slice(0, 24)} className="flex gap-2.5 text-sm text-eel">
              <span aria-hidden className="text-macaw">
                ●
              </span>
              <span className="font-semibold">{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {example && (
        <div>
          <p className="mb-2 text-eyebrow uppercase text-wolf">{example.caption}</p>
          <CodeBlock>{example.code}</CodeBlock>
        </div>
      )}
    </article>
  )
}
