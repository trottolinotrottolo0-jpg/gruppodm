import type { IncomingMessage, ServerResponse } from 'node:http'

type SocialVideo = {
  id: string
  platform: 'youtube' | 'instagram' | 'tiktok' | 'facebook'
  title: string
  url: string
  embedUrl: string
  thumbnailUrl: string
}

type Cache = { expiresAt: number; items: SocialVideo[] }

declare const globalThis: {
  __socialVideosCache?: Cache
}

function getQuery(req: IncomingMessage): URLSearchParams {
  const host = (req.headers['x-forwarded-host'] || req.headers.host || 'localhost').toString()
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString().split(',')[0].trim()
  const url = new URL(req.url || '/', `${proto}://${host}`)
  return url.searchParams
}

function loadFallback(): SocialVideo[] {
  return [
    {
      id: 'yt-1',
      platform: 'youtube',
      title: 'Gruppo DM — Produzione scatole',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      id: 'ig-1',
      platform: 'instagram',
      title: 'Dietro le quinte',
      url: 'https://www.instagram.com/',
      embedUrl: 'https://www.instagram.com/',
      thumbnailUrl: '/logo.png',
    },
    {
      id: 'tt-1',
      platform: 'tiktok',
      title: 'Packaging in 15s',
      url: 'https://www.tiktok.com/',
      embedUrl: 'https://www.tiktok.com/',
      thumbnailUrl: '/logo.png',
    },
    {
      id: 'fb-1',
      platform: 'facebook',
      title: 'Novità e offerte',
      url: 'https://www.facebook.com/',
      embedUrl: 'https://www.facebook.com/',
      thumbnailUrl: '/logo.png',
    },
  ]
}

function loadFromEnv(): SocialVideo[] | null {
  const raw = (process.env.SOCIAL_VIDEOS_JSON || '').trim()
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return null
    return parsed as SocialVideo[]
  } catch {
    return null
  }
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const query = getQuery(req)
  const countRaw = query.get('count')
  const count = countRaw ? Math.max(4, Math.min(12, Number(countRaw))) : 6

  const now = Date.now()
  const cached = globalThis.__socialVideosCache
  if (cached && cached.expiresAt > now) {
    res.statusCode = 200
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.setHeader('cache-control', 'public, max-age=300, stale-while-revalidate=21600')
    res.end(JSON.stringify({ items: cached.items.slice(0, count), cached: true }))
    return
  }

  const items = loadFromEnv() || loadFallback()
  globalThis.__socialVideosCache = { items, expiresAt: now + 6 * 60 * 60 * 1000 }

  res.statusCode = 200
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader('cache-control', 'public, max-age=300, stale-while-revalidate=21600')
  res.end(JSON.stringify({ items: items.slice(0, count), cached: false }))
}
