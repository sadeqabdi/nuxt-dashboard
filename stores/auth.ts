import { defineStore } from 'pinia'
import type { User, AuthState } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    currentUser: state => state.user,
    isAdmin: state => state.user?.role === 'admin',
    isLoggedIn: state => state.isAuthenticated
  },

  actions: {
    async login(email: string, password: string) {
      try {
        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock user data
        const user: User = {
          id: 1,
          name: 'John Doe',
          email: email,
          role: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe'
        }

        this.user = user
        this.token = 'mock-jwt-token-' + Date.now()
        this.isAuthenticated = true

        // Store in localStorage
        if (process.client) {
          localStorage.setItem('auth_token', this.token)
          localStorage.setItem('user', JSON.stringify(user))
        }

        return { success: true, message: 'Login successful' }
      } catch (error) {
        return { success: false, message: 'Login failed' }
      }
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }

      await navigateTo('/login')
    },

    async checkAuth() {
      if (process.client) {
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
    },

    updateUser(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData }
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
      }
    }
  }
})

