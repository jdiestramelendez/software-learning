import { useState } from 'react'
import { useLanguage } from '@/features/i18n/useLanguage'
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
  LanguageSwitch,
  OrderList,
  ProgressBar,
  SectionHeader,
  SkillNode,
  StatPill,
} from '@/design-system'

const SWATCHES = [
  { name: 'iris', hex: '#7a5af8', use: 'Brand, primary action, selection' },
  { name: 'plum', hex: '#5b3bd4', use: 'Pressed iris; iris text on a wash' },
  { name: 'lilac', hex: '#f0ecff', use: 'Purple wash' },
  { name: 'coral', hex: '#ff7a5c', use: 'Secondary: streaks, rewards' },
  { name: 'clay', hex: '#c2451f', use: 'Pressed coral' },
  { name: 'meadow', hex: '#3ed598', use: 'Correct, progress' },
  { name: 'tide', hex: '#1877c0', use: 'Links, information' },
  { name: 'poppy', hex: '#d33544', use: 'Errors, hearts' },
  { name: 'sunbeam', hex: '#ffc53d', use: 'XP, gold' },
  { name: 'ink', hex: '#2e2640', use: 'Body text' },
  { name: 'slate', hex: '#655e79', use: 'Secondary text' },
  { name: 'pebble', hex: '#8c85a3', use: 'Disabled, hints' },
  { name: 'linen', hex: '#e8e2f2', use: 'Borders' },
  { name: 'sand', hex: '#f5efe6', use: 'Subtle surface' },
  { name: 'cream', hex: '#fdf8f1', use: 'The page itself' },
  { name: 'paper', hex: '#ffffff', use: 'Cards and raised surfaces' },
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
        <p className="text-sm text-slate">{note}</p>
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
  const { lang, setLang } = useLanguage()
  const [gap, setGap] = useState<number | null>(null)
  const [ordered, setOrdered] = useState<number[]>([])

  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-10">
      <header>
        <p className="text-eyebrow uppercase text-slate">Bitwise design system</p>
        <h1 className="mt-1 text-hero text-iris">The look</h1>
        <p className="mt-3 text-slate">
          A purple brand on a warm cream page, with coral as the energetic
          secondary. Rounded geometric type, soft dimensional shadows, and colour
          that always carries meaning. Every token lives in{' '}
          <code className="rounded bg-sand px-1.5 py-0.5 font-mono text-sm">
            src/design-system/tokens.css
          </code>
          .
        </p>
      </header>

      <Section
        title="Colour"
        note="Named after light and garden — what they look like, not what they are for."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SWATCHES.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-chunky border-2 border-linen">
              <div className="h-14" style={{ backgroundColor: s.hex }} />
              <div className="p-3">
                <p className="text-sm">{s.name}</p>
                <p className="font-mono text-xs font-medium text-slate">{s.hex}</p>
                <p className="mt-1 text-xs text-slate">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Buttons"
        note="Press one. The surface travels down and its thickness collapses."
      >
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
        <div className="flex flex-wrap items-center gap-4">
          <LanguageSwitch
            value={lang}
            onChange={setLang}
            label="Language"
            names={{ en: 'English', es: 'Español' }}
          />
          <p className="text-sm text-slate">
            Two-position toggle. Both options stay visible, and the pressed one carries
            <code className="mx-1 rounded bg-sand px-1 font-mono text-xs">aria-pressed</code>
            rather than relying on colour alone.
          </p>
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
          <p className="mb-2 text-eyebrow uppercase text-slate">Fill the gap</p>
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
          <p className="mb-2 text-eyebrow uppercase text-slate">Put in order</p>
          <OrderList
            ordered={ordered.map((index) => ({ index, label: STEPS[index] }))}
            pool={STEPS.map((label, index) => ({ index, label })).filter(
              (item) => !ordered.includes(item.index),
            )}
            emptyHint="Tap the steps below in the right order"
            onPick={(index) => setOrdered((o) => [...o, index])}
            onUnpick={(index) => setOrdered((o) => o.filter((x) => x !== index))}
          />
        </div>

        <div>
          <p className="mb-2 text-eyebrow uppercase text-slate">Code block</p>
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
