import { defineStore } from 'pinia'
import type { DashboardStats } from '~/types'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: null as DashboardStats | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    dashboardStats: state => state.stats,
    isLoading: state => state.loading
  },

  actions: {
    async fetchStats() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.stats = {
          totalUsers: 1234,
          totalRevenue: 45678,
          activeProjects: 23,
          completedTasks: 156
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch dashboard stats'
      } finally {
        this.loading = false
      }
    }
  }
})

