import { useThemeStore } from '~/stores/theme'

export const useTheme = () => {
  const themeStore = useThemeStore()

  // Reactive state
  const isDark = computed(() => themeStore.isDark)
  const theme = computed(() => themeStore.theme)

  /**
   * Toggle between dark and light mode
   */
  const toggleTheme = () => {
    themeStore.toggleTheme()
  }

  /**
   * Set theme explicitly
   * @param isDarkMode - true for dark mode, false for light mode
   */
  const setTheme = (isDarkMode: boolean) => {
    themeStore.setTheme(isDarkMode)
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  const initTheme = () => {
    themeStore.initTheme()
  }

  /**
   * Watch system preference changes
   */
  const watchSystemPreference = () => {
    themeStore.watchSystemPreference()
  }

  return {
    // State
    isDark,
    theme,
    
    // Actions
    toggleTheme,
    setTheme,
    initTheme,
    watchSystemPreference
  }
}

