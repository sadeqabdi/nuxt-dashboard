import { defineStore } from 'pinia'
import type { User, AuthState } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    // Required getter: isAuthenticated
    isAuthenticated: (state) => state.isAuthenticated,
    // Additional helpful getters
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    // Required action: login()
    async login(email: string, password: string) {
      try {
        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock validation (accept any password for demo)
        // In production, the API would validate credentials
        
        // Mock user data
        const user: User = {
          id: 1,
          name: 'John Doe',
          email: email,
          role: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe'
        }

        // Generate mock token
        const token = 'mock-jwt-token-' + Date.now()

        // Update state
        this.user = user
        this.token = token
        this.isAuthenticated = true

        // Save token in localStorage
        if (import.meta.client) {
          localStorage.setItem('auth_token', token)
          localStorage.setItem('user', JSON.stringify(user))
        }

        return { success: true, message: 'Login successful' }
      } catch (error) {
        return { success: false, message: 'Login failed. Please check your credentials.' }
      }
    },

    // Required action: logout()
    async logout() {
      // Clear state
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Remove from localStorage
      if (import.meta.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }

      // Redirect to login
      await navigateTo('/auth/login')
    },

    // Required action: setUser()
    setUser(user: User | null) {
      this.user = user
      if (user && import.meta.client) {
        localStorage.setItem('user', JSON.stringify(user))
      } else if (import.meta.client) {
        localStorage.removeItem('user')
      }
    },

    // Additional helper action for checking authentication
    async checkAuth() {
      if (import.meta.client) {
        const token = localStorage.getItem('auth_token')
        const userStr = localStorage.getItem('user')

        if (token && userStr) {
          this.token = token
          this.user = JSON.parse(userStr)
          this.isAuthenticated = true
          return true
        }
      }
      return false
    }
  }
})

