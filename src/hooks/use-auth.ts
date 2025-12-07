"use client"

import { db } from "@/lib/db-mock"
import { clearAuthFromStorage, getAuthFromStorage, setAuthToStorage } from "@/lib/store"
import type { User, UserRole } from "@/lib/types"
import { useEffect, useState } from "react"

export interface UseAuthReturn {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>
  logout: () => void
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from storage
  useEffect(() => {
    const auth = getAuthFromStorage()
    if (auth.token && auth.userId) {
      setToken(auth.token)
      // Fetch user data
      fetchUser(auth.userId, auth.token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUser = async (userId: string, token: string) => {
    try {
      // const response = await fetch(`/api/users/${userId}`)
      // const data = await response.json()
      // if (data.success && data.data) {
      //   setUser(data.data)
      // }
      setUser(db.getUser(userId) as User)
    } catch (error) {
      console.error("Failed to fetch user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success && data.data) {
        setUser(data.data.user)
        setToken(data.data.token)
        setAuthToStorage({
          token: data.data.token,
          userId: data.data.user.id,
        })
        return true
      }

      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      })

      const data = await response.json()

      if (data.success && data.data) {
        setUser(data.data.user)
        setToken(data.data.token)
        setAuthToStorage({
          token: data.data.token,
          userId: data.data.user.id,
        })
        return true
      }

      return false
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    clearAuthFromStorage()
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
  }
}
