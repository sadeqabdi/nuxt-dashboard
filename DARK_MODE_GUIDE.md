# 🌙 Dark Mode Implementation Guide

## Overview

This project uses **Tailwind CSS dark mode** with **localStorage persistence** and the **Composition API** for theme management.

## ✅ Features

- ✨ **Tailwind CSS dark mode** (class strategy)
- 💾 **localStorage persistence** - Theme preference is saved
- 🎨 **System preference detection** - Respects OS dark mode setting
- 🔄 **Live system preference sync** - Auto-updates when OS theme changes (if no manual preference set)
- 🎭 **Smooth animations** - Beautiful transitions between themes
- 🎯 **Composition API** - Modern Vue 3 reactive patterns
- 🔌 **Reusable composable** - Easy to use across components

## 📁 File Structure

```
stores/
  └── theme.ts          # Pinia store for theme state
components/
  └── ThemeToggle.vue   # Theme toggle button component
composables/
  └── useTheme.ts       # Composition API composable
tailwind.config.js      # Tailwind config with dark mode enabled
```

## 🚀 Usage

### Method 1: Using the Composable (Recommended)

```vue
<script setup lang="ts">
// Import the composable
const { isDark, theme, toggleTheme, setTheme } = useTheme()

// Initialize on mount
onMounted(() => {
  initTheme()
  watchSystemPreference()
})
</script>

<template>
  <div>
    <p>Current theme: {{ theme }}</p>
    <p>Is dark mode: {{ isDark }}</p>
    
    <!-- Toggle button -->
    <button @click="toggleTheme">Toggle Theme</button>
    
    <!-- Set specific theme -->
    <button @click="setTheme(true)">Dark Mode</button>
    <button @click="setTheme(false)">Light Mode</button>
  </div>
</template>
```

### Method 2: Using the Store Directly

```vue
<script setup lang="ts">
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <button @click="themeStore.toggleTheme()">
    {{ themeStore.isDark ? 'Light' : 'Dark' }} Mode
  </button>
</template>
```

### Method 3: Using the ThemeToggle Component

```vue
<template>
  <ThemeToggle />
</template>
```

## 🎨 Styling with Dark Mode

### In Templates

```vue
<template>
  <!-- Light mode: white bg, Dark mode: gray-800 bg -->
  <div class="bg-white dark:bg-gray-800">
    <!-- Light mode: gray-900 text, Dark mode: white text -->
    <h1 class="text-gray-900 dark:text-white">Hello</h1>
    
    <!-- Border colors -->
    <div class="border border-gray-200 dark:border-gray-700"></div>
    
    <!-- Hover states -->
    <button class="hover:bg-gray-100 dark:hover:bg-gray-700">
      Click me
    </button>
  </div>
</template>
```

### Common Dark Mode Patterns

```css
/* Background colors */
bg-white dark:bg-gray-800
bg-gray-50 dark:bg-gray-900
bg-gray-100 dark:bg-gray-700

/* Text colors */
text-gray-900 dark:text-white
text-gray-600 dark:text-gray-400
text-gray-700 dark:text-gray-300

/* Border colors */
border-gray-200 dark:border-gray-700
border-gray-300 dark:border-gray-600

/* Hover states */
hover:bg-gray-100 dark:hover:bg-gray-700
hover:bg-gray-200 dark:hover:bg-gray-600
```

## 🔧 API Reference

### Theme Store

```typescript
interface ThemeStore {
  state: {
    isDark: boolean
  }
  
  getters: {
    theme: 'dark' | 'light'
    isDarkMode: boolean
  }
  
  actions: {
    toggleTheme(): void
    setTheme(isDark: boolean): void
    initTheme(): void
    updateDOM(): void
    saveToLocalStorage(): void
    watchSystemPreference(): void
  }
}
```

### useTheme Composable

```typescript
interface UseTheme {
  // Reactive state
  isDark: ComputedRef<boolean>
  theme: ComputedRef<'dark' | 'light'>
  
  // Methods
  toggleTheme: () => void
  setTheme: (isDarkMode: boolean) => void
  initTheme: () => void
  watchSystemPreference: () => void
}
```

## 💡 How It Works

1. **Initialization**: On app load, `initTheme()` checks localStorage for saved preference
2. **Fallback**: If no saved preference, it checks system preference using `prefers-color-scheme`
3. **DOM Update**: Adds/removes `dark` class on `<html>` element
4. **Persistence**: Saves preference to localStorage on every change
5. **System Sync**: Watches for OS theme changes and updates automatically (if no manual preference)

## 🎯 Best Practices

1. **Initialize early**: Call `initTheme()` in your app's root component or layout
2. **Use Tailwind classes**: Always use `dark:` variants for consistent theming
3. **Test both modes**: Always check your UI in both light and dark mode
4. **Semantic colors**: Use semantic color names (like `bg-background`, `text-foreground`) for consistency
5. **Avoid hardcoded colors**: Use Tailwind's color system for automatic dark mode support

## 🔍 Debugging

### Check current theme:
```javascript
// In browser console
localStorage.getItem('theme')  // 'dark' or 'light'
document.documentElement.classList.contains('dark')  // true or false
```

### Reset theme:
```javascript
// In browser console
localStorage.removeItem('theme')
location.reload()
```

## 📝 Examples

### Full Component Example

```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          My App
        </h1>
        
        <!-- Theme Toggle -->
        <ThemeToggle />
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Welcome
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          This component supports dark mode!
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { initTheme, watchSystemPreference } = useTheme()

onMounted(() => {
  initTheme()
  watchSystemPreference()
})
</script>
```

## 🎨 Color Palette

The theme uses Tailwind's default gray scale for dark mode:
- **Light backgrounds**: `gray-50`, `white`
- **Dark backgrounds**: `gray-900`, `gray-800`
- **Light text**: `gray-900`, `gray-700`, `gray-600`
- **Dark text**: `white`, `gray-300`, `gray-400`
- **Borders light**: `gray-200`, `gray-300`
- **Borders dark**: `gray-700`, `gray-600`

## 🚨 Troubleshooting

**Theme not persisting?**
- Check that localStorage is enabled in your browser
- Verify `import.meta.client` checks are working

**Dark mode not applying?**
- Ensure `darkMode: 'class'` is set in `tailwind.config.js`
- Check that `dark` class is on `<html>` element
- Verify you're using `dark:` prefixes in your classes

**System preference not working?**
- Make sure `watchSystemPreference()` is called
- Check browser support for `prefers-color-scheme`

## 📚 Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Store](https://pinia.vuejs.org/)

---

**Built with ❤️ using Nuxt 3, Vue 3, Tailwind CSS, and Pinia**

