import { defineStore } from 'pinia'

/**
 * Theme Store
 * Manages dark/light mode with localStorage persistence
 * Uses Tailwind CSS dark mode (class strategy)
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),

  getters: {
    // Get current theme as string ('dark' or 'light')
    theme: (state) => (state.isDark ? 'dark' : 'light'),
    
    // Check if dark mode is active
    isDarkMode: (state) => state.isDark
  },

  actions: {
    /**
     * Toggle between dark and light mode
     */
    toggleTheme() {
      this.isDark = !this.isDark
      this.updateDOM()
      this.saveToLocalStorage()
    },

    /**
     * Set theme explicitly
     * @param isDark - true for dark mode, false for light mode
     */
    setTheme(isDark: boolean) {
      this.isDark = isDark
      this.updateDOM()
      this.saveToLocalStorage()
    },

    /**
     * Update DOM with current theme
     * Adds or removes 'dark' class from document root
     */
    updateDOM() {
      if (import.meta.client) {
        if (this.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    },

    /**
     * Save theme preference to localStorage
     */
    saveToLocalStorage() {
      if (import.meta.client) {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      }
    },

    /**
     * Initialize theme from localStorage or system preference
     * Should be called on app mount
     */
    initTheme() {
      if (import.meta.client) {
        // First, check localStorage
        const savedTheme = localStorage.getItem('theme')
        
        if (savedTheme) {
          // Use saved preference
          this.isDark = savedTheme === 'dark'
        } else {
          // Fall back to system preference
          this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        
        // Apply theme to DOM
        this.updateDOM()
      }
    },

    /**
     * Listen to system preference changes
     */
    watchSystemPreference() {
      if (import.meta.client) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        mediaQuery.addEventListener('change', (e) => {
          // Only auto-switch if user hasn't set a preference
          if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches)
          }
        })
      }
    }
  }
})


