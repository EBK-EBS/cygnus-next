import { useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import { chatCompletion, markdownLigeroAI } from '@/lib/api/deepseek'
import { creditosDe } from '@/data/mock'
import { fmt } from '@/lib/format'
import { saludFinanciera } from '@/data/types'
import { useUIStore } from '@/store/uiStore'

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
  loading?: boolean
}

let msgId = 0

/**
 * Asistente IA global (IA-COOP) — reemplaza el .ai-card del right sidebar original.
 * El score del asociado actual vive en el store; el chat consulta DeepSeek.
 */
export function RightSidebar({ mini }: { mini: boolean }) {
  const currentAsoc = useUIStore((s) => s.currentAsoc)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgId++,
      role: 'bot',
      text: 'Estoy analizando los datos del asociado. Escribe tu consulta abajo para recibir recomendaciones financieras reales.',
    },
  ])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  const health = saludFinanciera(currentAsoc.score)
  const healthBg =
    currentAsoc.score >= 80 ? 'var(--color-brand-500)' : currentAsoc.score >= 60 ? '#f59e0b' : 'var(--color-danger)'

  const scrollBottom = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    })
  }

  const send = async () => {
    const txt = input.trim()
    if (!txt) return
    setInput('')
    setMessages((m) => [...m, { id: msgId++, role: 'user', text: txt }])
    const loadingId = msgId++
    setMessages((m) => [...m, { id: loadingId, role: 'bot', text: 'Analizando...', loading: true }])
    scrollBottom()

    const creds = creditosDe(currentAsoc.id)
    const deudaTotal = creds.reduce((a, b) => a + b.saldo, 0)
    const asocData = `Nombre: ${currentAsoc.nombre}, Sueldo: $${fmt(currentAsoc.sueldo)}, Cupo Rotativo: $${fmt(currentAsoc.cupoRotativo)}, Score Financiero: ${currentAsoc.score}/100.`
    const credsData = `Deuda Total en Créditos: $${fmt(deudaTotal)}. Número de créditos activos: ${creds.length}.`

    const systemPrompt = `Eres IA-COOP, un asistente virtual experto integrado en la plataforma CYGNUS NEXT. Tu rol es asistir y asesorar al FUNCIONARIO de la cooperativa que está utilizando el sistema, ayudándole a brindar el mejor servicio al asociado actual. 
Conoces el funcionamiento del software CYGNUS NEXT (un ERP y Core Financiero para cooperativas con módulos de Personas, Aportes, Crédito, Cartera y Tesorería).
Datos del asociado en pantalla para tu análisis: ${asocData} ${credsData}. 
Responde a las consultas del funcionario de forma profesional, corta y concisa (máximo un párrafo). Sugiérele estrategias, alertas de riesgo o recomendaciones de productos para ofrecer al asociado.`

    try {
      const reply = await chatCompletion(
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: txt },
        ],
        { temperature: 0.7 },
      )
      setMessages((m) =>
        m.map((msg) => (msg.id === loadingId ? { ...msg, text: reply, loading: false } : msg)),
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error de conexión con la API de DeepSeek.'
      setMessages((m) =>
        m.map((msg2) =>
          msg2.id === loadingId ? { ...msg2, text: `⚠️ ${msg}. Verifica la consola (F12).`, loading: false } : msg2,
        ),
      )
    }
    scrollBottom()
  }

  return (
    <aside
      className={clsx(
        'flex shrink-0 flex-col gap-5 overflow-y-auto overflow-x-hidden border-l border-line bg-surface transition-[width,padding] duration-300',
        mini ? 'w-[60px] cursor-pointer px-1.5 py-5' : 'w-[320px] p-5',
      )}
    >
      {mini ? (
        <div className="flex flex-col items-center gap-6 text-muted">
          <Sparkles className="size-5" />
        </div>
      ) : (
        <>
          <div className="flex w-[280px] flex-1 flex-col gap-5">
            {/* Score financiero */}
            <div className="rounded-lg border border-line bg-card shadow-soft">
              <div className="flex items-center justify-between rounded-t-lg bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white">
                <span>IA-COOP</span>
                <span
                  className="rounded px-2 py-0.5 text-xs font-bold text-white"
                  style={{ background: healthBg }}
                >
                  {health}
                </span>
              </div>
              <div className="p-4">
                <div className="text-[2rem] font-bold text-ink">
                  {currentAsoc.score} <span className="text-sm font-normal text-muted">/ 100</span>
                </div>
                <div className="mb-3.5 h-2 w-full overflow-hidden rounded-full bg-hover">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all"
                    style={{ width: `${currentAsoc.score}%` }}
                  />
                </div>
                <div className="flex flex-col gap-2.5 rounded-lg border border-line bg-hover/50 p-3 text-[0.8rem] text-ink">
                  <p><strong>SALUD FINANCIERA</strong></p>
                  <p className="text-muted">Estoy analizando los datos del asociado. Escribe tu consulta abajo.</p>
                </div>
              </div>
            </div>

            {/* Chat IA */}
            <div className="flex min-h-[400px] flex-1 flex-col overflow-hidden rounded-lg border border-line bg-card shadow-soft">
              <div ref={bodyRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3.5">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={clsx(
                      'max-w-[95%] rounded-md px-3 py-2.5 text-[0.85rem] leading-relaxed',
                      m.role === 'user'
                        ? 'self-end bg-sky-100 text-sky-800'
                        : 'self-start border border-slate-200 bg-slate-50 text-ink',
                    )}
                    dangerouslySetInnerHTML={{
                      __html: m.loading
                        ? '<strong>IA-COOP:</strong> Analizando...'
                        : `<strong>${m.role === 'bot' ? 'IA-COOP:' : 'Tú:'}</strong> ${markdownLigeroAI(m.text)}`,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2.5 border-t border-line bg-card px-3.5 py-2.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 rounded-full border border-line bg-slate-50 px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
                />
                <button
                  onClick={send}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition-opacity hover:opacity-90"
                  aria-label="Enviar"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}