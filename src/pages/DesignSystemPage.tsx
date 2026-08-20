import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  ChoiceCard,
  CodeBlock,
  FeedbackFooter,
  GapCode,
  IconButton,
  OrderList,
  ProgressBar,
  SectionHeader,
  SkillNode,
  StatPill,
} from '@/design-system'

const SWATCHES = [
  { name: 'feather-green', hex: '#58cc02', use: 'Primary action, correct' },
  { name: 'tree-frog', hex: '#58a700', use: 'Pressed face of green' },
  { name: 'macaw', hex: '#1cb0f6', use: 'Links, selected state' },
  { name: 'cardinal', hex: '#ff4b4b', use: 'Errors, hearts' },
  { name: 'bee', hex: '#ffc800', use: 'XP, streaks' },
  { name: 'fox', hex: '#ff9600', use: 'Streak flame' },
  { name: 'beetle', hex: '#ce82ff', use: 'Premium' },
  { name: 'eel', hex: '#4b4b4b', use: 'Body text' },
  { name: 'wolf', hex: '#777777', use: 'Secondary text' },
  { name: 'swan', hex: '#e5e5e5', use: 'Borders' },
  { name: 'polar', hex: '#f7f7f7', use: 'Background' },
]

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-title">{title}</h2>
        <p className="text-sm text-wolf">{note}</p>
      </div>
      <Card className="space-y-5">{children}</Card>
    </section>
  )
}

/** A living style guide. If a component is not shown here, it does not exist. */
const STEPS = ['Reproduce the bug', 'Read the stack trace', 'Form a hypothesis']

export function DesignSystemPage() {
  const [picked, setPicked] = useState<number | null>(1)
  const [progress, setProgress] = useState(40)
  const [gap, setGap] = useState<number | null>(null)
  const [ordered, setOrdered] = useState<string[]>([])

  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-10">
      <header>
        <p className="text-eyebrow uppercase text-wolf">Bitwise design system</p>
        <h1 className="mt-1 text-hero text-feather-green">The look</h1>
        <p className="mt-3 text-wolf">
          Bold rounded type, hard 4px bottom shadows that press down, 2px swan
          borders, and colour that always carries meaning. Every token lives in{' '}
          <code className="rounded bg-polar px-1.5 py-0.5 font-mono text-sm">
            src/design-system/tokens.css
          </code>
          .
        </p>
      </header>

      <Section title="Colour" note="Named after animals, the way Duolingo does it.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SWATCHES.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-chunky border-2 border-swan">
              <div className="h-14" style={{ backgroundColor: s.hex }} />
              <div className="p-3">
                <p className="text-sm">{s.name}</p>
                <p className="font-mono text-xs font-medium text-wolf">{s.hex}</p>
                <p className="mt-1 text-xs text-wolf">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons" note="Press one. The 4px shadow collapses as it moves down.">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="info">Info</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="super">Super</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <IconButton label="Close">✕</IconButton>
        </div>
      </Section>

      <Section title="Progress" note="Rounded tube with an inner highlight sliver.">
        <ProgressBar value={progress} label="Demo progress" />
        <ProgressBar value={progress} color="yellow" label="Demo progress yellow" />
        <ProgressBar value={progress} color="blue" label="Demo progress blue" />
        <div className="flex gap-3">
          <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.max(0, p - 20))}>
            −20
          </Button>
          <Button size="sm" onClick={() => setProgress((p) => Math.min(100, p + 20))}>
            +20
          </Button>
        </div>
      </Section>

      <Section title="Choices" note="Selection reads through border, wash, and aria-pressed.">
        <div className="grid gap-3 sm:grid-cols-2">
          {['O(1)', 'O(log n)', 'O(n)', 'O(n²)'].map((label, i) => (
            <ChoiceCard
              key={label}
              shortcut={i + 1}
              state={picked === i ? 'selected' : 'idle'}
              onClick={() => setPicked(i)}
            >
              {label}
            </ChoiceCard>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ChoiceCard state="correct" shortcut={1}>
            Correct answer
          </ChoiceCard>
          <ChoiceCard state="wrong" shortcut={2}>
            Wrong answer
          </ChoiceCard>
        </div>
      </Section>

      <Section title="Badges, stats & avatars" note="Small pieces of status.">
        <div className="flex flex-wrap gap-2">
          <Badge tone="green">Complete</Badge>
          <Badge tone="blue">New</Badge>
          <Badge tone="red">2 mistakes</Badge>
          <Badge tone="yellow">40 XP</Badge>
          <Badge tone="purple">Max</Badge>
          <Badge>Neutral</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <StatPill icon="🔥" value={7} label="Day streak" tone="fox" />
          <StatPill icon="💎" value={480} label="Gems" tone="macaw" />
          <StatPill icon="❤️" value={5} label="Hearts" tone="cardinal" />
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Grace Hopper" />
        </div>
      </Section>

      <Section title="Skill nodes" note="The bubbles on the learning path.">
        <div className="flex flex-wrap items-start gap-8">
          <SkillNode status="active" icon="📈" title="In progress" progress={0.4} />
          <SkillNode status="complete" icon="🌿" title="Complete" progress={1} />
          <SkillNode status="legendary" icon="👑" title="Legendary" progress={1} />
          <SkillNode status="locked" icon="🌐" title="Locked" />
        </div>
      </Section>

      <Section title="Question types" note="Four ways to ask, so 200 questions do not feel like one form.">
        <div>
          <p className="mb-2 text-eyebrow uppercase text-wolf">Fill the gap</p>
          <GapCode
            code={'const lookup = new ___(ids)\nlookup.has(99999)'}
            filled={gap === null ? null : ['Set', 'Array'][gap]}
            state="idle"
          />
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {['Set', 'Array'].map((choice, i) => (
              <ChoiceCard
                key={choice}
                shortcut={i + 1}
                state={gap === i ? 'selected' : 'idle'}
                onClick={() => setGap(i)}
              >
                {choice}
              </ChoiceCard>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-eyebrow uppercase text-wolf">Put in order</p>
          <OrderList
            ordered={ordered}
            pool={STEPS.filter((s) => !ordered.includes(s))}
            onPick={(item) => setOrdered((o) => [...o, item])}
            onUnpick={(item) => setOrdered((o) => o.filter((x) => x !== item))}
          />
        </div>

        <div>
          <p className="mb-2 text-eyebrow uppercase text-wolf">Code block</p>
          <CodeBlock>{'git bisect start\ngit bisect bad\ngit bisect good v1.4.0'}</CodeBlock>
        </div>
      </Section>

      <Section title="Section headers" note="What separates one part of the path from the next.">
        <SectionHeader
          eyebrow="Section 1"
          title="How a computer thinks"
          subtitle="The mental model everything else is built on."
        />
        <SectionHeader
          eyebrow="Section 2"
          title="Cloud fundamentals"
          subtitle="What you are actually renting."
          accent="blue"
        />
      </Section>

      <Section title="Feedback" note="The sheet that answers 'why was I wrong?'">
        <div className="-mx-5 -mb-5 space-y-px overflow-hidden rounded-b-slab">
          <FeedbackFooter
            status="correct"
            title="Nice one!"
            detail="+10 XP"
            actionLabel="Continue"
            onAction={() => {}}
          />
          <FeedbackFooter
            status="wrong"
            title="Not quite"
            detail="The loop touches every element once — that is O(n)."
            actionLabel="Got it"
            onAction={() => {}}
          />
        </div>
      </Section>
    </div>
  )
}
