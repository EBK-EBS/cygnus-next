/**
 * Cliente DeepSeek — la API key se lee de VITE_DEEPSEEK_API_KEY (.env),
 * nunca se hardcodea en el código fuente (el HTML original la exponía).
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface DeepSeekResponse {
  choices?: Array<{ message?: { content?: string } }>
}

const API_URL = 'https://api.deepseek.com/chat/completions'

function apiKey(): string {
  const key = import.meta.env.VITE_DEEPSEEK_API_KEY as string | undefined
  if (!key) {
    throw new Error('Falta VITE_DEEPSEEK_API_KEY en el archivo .env')
  }
  return key
}

/** Chat simple con DeepSeek (deepseek-chat). */
export async function chatCompletion(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey()}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.maxTokens ?? 250,
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.status}`)
  }

  const data = (await response.json()) as DeepSeekResponse
  const content = data.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('DeepSeek no devolvió contenido')
  }
  return content
}

/** Analiza un reporte JSON de cartera y devuelve hallazgos en HTML básico. */
export async function analyzeReportWithAI(dataStr: string): Promise<string> {
  const prompt = `Eres un experto analista de datos cooperativos. Analiza el siguiente reporte JSON de la cartera de asociados y dame 3 hallazgos clave, alertas o insights rápidos (usa formato HTML básico con <ul> y <li>, sin formato markdown tradicional y muy conciso). Datos a analizar: ${dataStr}`
  return chatCompletion([{ role: 'user', content: prompt }], { temperature: 0.5 })
}

/** Convierte texto plano del asistente en HTML seguro para render (markdown ligero). */
export function markdownLigeroAI(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}