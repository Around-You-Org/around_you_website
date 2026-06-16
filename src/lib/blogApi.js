

const API_BASE = (import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '')

// cover_image comes back as a relative /media/... path -> make it absolute.
export function mediaUrl(path) {
  if (!path) return null
  if (/^https?:\/\//i.test(path)) return path
  return API_BASE + (path.startsWith('/') ? '' : '/') + path
}

export async function fetchPosts() {
  const res = await fetch(`${API_BASE}/api/blog/posts/`)
  if (!res.ok) throw new Error(`Failed to load posts (HTTP ${res.status})`)
  return res.json()
}

export async function fetchPost(slug) {
  const res = await fetch(`${API_BASE}/api/blog/posts/${encodeURIComponent(slug)}/`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to load post (HTTP ${res.status})`)
  return res.json()
}