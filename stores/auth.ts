import { defineStore } from 'pinia'
import type { User, AuthState } from '~/types'
import { useUsersStore } from './users'

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
        // Get users store to validate credentials
        const usersStore = useUsersStore()
        
        // Ensure users are loaded
        if (usersStore.users.length === 0) {
          await usersStore.fetchUsers()
        }

        // Find user by email
        const foundUser = usersStore.users.find(u => u.email.toLowerCase() === email.toLowerCase())
        
        if (!foundUser) {
          return { success: false, message: 'Invalid email or password' }
        }

        // Validate password (using "password123" as default for all users)
        // In production, each user would have their own hashed password
        if (password !== 'password123') {
          return { success: false, message: 'Invalid email or password' }
        }

        // Generate mock token
        const token = 'mock-jwt-token-' + Date.now()

        // Update state with actual user data
        this.user = foundUser
        this.token = token
        this.isAuthenticated = true

        // Save token in localStorage
        if (import.meta.client) {
          localStorage.setItem('auth_token', token)
          localStorage.setItem('user', JSON.stringify(foundUser))
        }

        return { success: true, message: 'Login successful' }
      } catch (error) {
        return { success: false, message: 'Login failed. Please try again.' }
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

