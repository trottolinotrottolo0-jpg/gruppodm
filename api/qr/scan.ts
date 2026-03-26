import type { IncomingMessage, ServerResponse } from 'node:http'

type ScanBody = {
  sku?: string
  path?: string
  userAgent?: string
  deviceType?: string
  timestamp?: number
}

type ScanEvent = {
  sku: string
  path: string
  ip: string
  userAgent: string
  deviceType: string
  timestamp: number
}

function readJson(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += typeof chunk === 'string' ? chunk : chunk.toString('utf8')
    })
    req.on('end', () => {
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

function getIp(req: IncomingMessage): string {
  const xff = (req.headers['x-forwarded-for'] || '').toString()
  const first = xff.split(',')[0]?.trim()
  return first || ''
}

function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (ua.includes('ipad') || ua.includes('tablet')) return 'tablet'
  if (ua.includes('mobi') || ua.includes('android') || ua.includes('iphone')) return 'mobile'
  return 'desktop'
}

declare const globalThis: {
  __qrScanLog?: ScanEvent[]
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  let bodyUnknown: unknown
  try {
    bodyUnknown = await readJson(req)
  } catch {
    res.statusCode = 400
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Invalid JSON body' }))
    return
  }

  const body = (bodyUnknown || {}) as ScanBody
  const sku = (body.sku || '').trim()
  const path = (body.path || '').trim()
  const userAgent = (body.userAgent || req.headers['user-agent'] || '').toString()

  if (!sku) {
    res.statusCode = 400
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Missing sku' }))
    return
  }

  const event: ScanEvent = {
    sku,
    path: path || '',
    ip: getIp(req),
    userAgent,
    deviceType: body.deviceType || getDeviceType(userAgent),
    timestamp: Number.isFinite(body.timestamp) ? Number(body.timestamp) : Date.now(),
  }

  globalThis.__qrScanLog = globalThis.__qrScanLog || []
  globalThis.__qrScanLog.push(event)
  if (globalThis.__qrScanLog.length > 5000) globalThis.__qrScanLog.splice(0, globalThis.__qrScanLog.length - 5000)

  res.statusCode = 204
  res.end()
}
