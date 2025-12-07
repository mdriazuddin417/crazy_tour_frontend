// Client-side auth store using browser localStorage
export interface AuthStore {
  token: string | null
  userId: string | null
}

const STORAGE_KEY = "localguide_auth"

export function getAuthFromStorage(): AuthStore {
  if (typeof window === "undefined") return { token: null, userId: null }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return { token: null, userId: null }

  try {
    return JSON.parse(stored)
  } catch {
    return { token: null, userId: null }
  }
}

export function setAuthToStorage(auth: AuthStore) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
}

export function clearAuthFromStorage() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
