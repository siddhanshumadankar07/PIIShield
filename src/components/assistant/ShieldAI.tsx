import { useState } from 'react'
import { generateShieldAIResponse, SUGGESTED_QUESTIONS } from '../../engine/shieldAi.ts'
import type { ShieldAISummary } from '../../engine/shieldAi.ts'
import { Button, TextInput } from '../ui/index.ts'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export interface ShieldAIProps {
  summary: ShieldAISummary
}

export function ShieldAI({ summary }: ShieldAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hello, I am Shield AI — a deterministic local privacy assistant. I only see aggregate scan counts, never your raw document text or detected PII values.',
    },
  ])
  const [input, setInput] = useState('')

  const askQuestion = (question: string) => {
    const trimmed = question.trim()
    if (!trimmed) return
    const nextId = messages.length + 1
    const userMsg: ChatMessage = { id: `u-${nextId}`, role: 'user', text: trimmed }
    const botMsg: ChatMessage = {
      id: `a-${nextId + 1}`,
      role: 'assistant',
      text: generateShieldAIResponse(trimmed, summary),
    }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 outline-none sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            Local Intelligence
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            Shield AI — Local Privacy Assistant
          </h1>
          <p className="mt-1 text-xs text-muted">
            Deterministic local guidance. Zero external AI calls, zero raw PII in chat history.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            setMessages([
              {
                id: 'welcome-reset',
                role: 'assistant',
                text: 'Chat cleared. Ask any question about PII categories, redaction modes, or your session summary.',
              },
            ])
          }
        >
          Clear Chat
        </Button>
      </div>

      <section aria-label="Suggested Questions" className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q) => (
          <Button key={q} variant="tertiary" size="sm" onClick={() => askQuestion(q)}>
            {q}
          </Button>
        ))}
      </section>

      <section
        aria-label="Chat History"
        className="flex min-h-80 flex-col gap-3 rounded-lg border border-border-subtle bg-charcoal p-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-3xl rounded-md border px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'self-end border-border-subtle bg-elevated text-ink'
                : 'self-start border-border-subtle bg-surface text-ink'
            }`}
          >
            <p className="mb-1 font-mono text-[11px] uppercase text-icy">
              {msg.role === 'user' ? 'You' : 'Shield AI (Local)'}
            </p>
            <p className="leading-relaxed text-muted">{msg.text}</p>
          </div>
        ))}
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          askQuestion(input)
        }}
        className="flex items-end gap-3"
      >
        <div className="flex-1">
          <TextInput
            label="Ask Shield AI"
            placeholder="Ask about PII, redaction modes, or your risk score..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary" size="md">
          Send
        </Button>
      </form>
    </main>
  )
}
