import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),

  getters: {
    theme: state => (state.isDark ? 'dark' : 'light')
  },

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.updateDOM()
    },

    setTheme(isDark: boolean) {
      this.isDark = isDark
      this.updateDOM()
    },

    updateDOM() {
      if (process.client) {
        if (this.isDark) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('theme', 'light')
        }
      }
    },

    initTheme() {
      if (process.client) {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
          this.isDark = savedTheme === 'dark'
        } else {
          // Check system preference
          this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        this.updateDOM()
      }
    }
  }
})

