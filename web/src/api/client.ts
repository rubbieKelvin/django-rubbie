/**
 * Base API client for dashboard ↔ Django backend.
 * Configure baseURL (e.g. from env) and auth headers here.
 */

const getBaseURL = (): string => {
  return import.meta.env.VITE_API_BASE_URL ?? '/api'
}

export const apiClient = {
  baseURL: getBaseURL(),

  async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)
    return res.json() as Promise<T>
  },

  get<T>(path: string) {
    return this.request<T>(path, { method: 'GET' })
  },

  post<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: 'POST', body: JSON.stringify(body) })
  },

  patch<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: 'PATCH', body: JSON.stringify(body) })
  },

  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' })
  },
}
