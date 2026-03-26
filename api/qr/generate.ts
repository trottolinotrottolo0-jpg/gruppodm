import type { IncomingMessage, ServerResponse } from 'node:http'
import * as QRCode from 'qrcode'

type GenerateBody = {
  sku?: string
  slug?: string
  size?: number
  format?: 'svg' | 'png' | 'eps' | 'SVG' | 'PNG' | 'EPS'
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

function normalizeFormat(format: GenerateBody['format']): 'svg' | 'png' | 'eps' {
  const f = (format || 'svg').toString().toLowerCase()
  if (f === 'png' || f === 'eps') return f
  return 'svg'
}

function getOrigin(req: IncomingMessage): string {
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString().split(',')[0].trim()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString().split(',')[0].trim()
  if (!host) return 'https://gruppodm.it'
  return `${proto}://${host}`
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

  const body = (bodyUnknown || {}) as GenerateBody
  const sku = (body.sku || '').trim()
  const slug = (body.slug || '').trim()
  const size = Number.isFinite(body.size) ? Math.max(300, Math.min(1200, Number(body.size))) : 300
  const format = normalizeFormat(body.format)

  if (!sku || !slug) {
    res.statusCode = 400
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Missing sku or slug' }))
    return
  }

  const origin = getOrigin(req)
  const url = new URL(`${origin}/prodotto/${encodeURIComponent(sku)}/${encodeURIComponent(slug)}`)
  url.searchParams.set('utm_source', 'qr_code')
  url.searchParams.set('utm_medium', 'product_scan')
  url.searchParams.set('utm_campaign', sku)

  const options = {
    errorCorrectionLevel: 'H' as const,
    margin: 4,
    width: size,
  }

  try {
    if (format === 'png') {
      const buffer = await QRCode.toBuffer(url.toString(), { ...options, type: 'png' })
      res.statusCode = 200
      res.setHeader('content-type', 'image/png')
      res.setHeader('cache-control', 'public, max-age=31536000, immutable')
      res.end(buffer)
      return
    }

    if (format === 'eps') {
      res.statusCode = 501
      res.setHeader('content-type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'EPS not supported in this deployment' }))
      return
    }

    const svg = await QRCode.toString(url.toString(), { ...options, type: 'svg' })
    res.statusCode = 200
    res.setHeader('content-type', 'image/svg+xml; charset=utf-8')
    res.setHeader('cache-control', 'public, max-age=31536000, immutable')
    res.end(svg)
  } catch {
    res.statusCode = 500
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Failed generating QR' }))
  }
}
