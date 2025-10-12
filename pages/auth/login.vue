<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Theme Toggle -->
    <div class="fixed top-4 right-4">
      <ThemeToggle />
    </div>

    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to access your dashboard
        </p>
      </div>

      <!-- Login Form Card -->
      <div class="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm text-red-800 dark:text-red-400">{{ errorMessage }}</p>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                :class="{ 'border-red-500 focus:ring-red-500': errors.email }"
                placeholder="you@example.com"
                @blur="validateEmail"
              >
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                :class="{ 'border-red-500 focus:ring-red-500': errors.password }"
                placeholder="Enter your password"
                @blur="validatePassword"
              >
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.password }}</p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition">
                Forgot password?
              </a>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span v-if="!loading">Sign in</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Signing in...
              </span>
            </button>
          </div>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"/>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                Demo Credentials
              </span>
            </div>
          </div>
          <div class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div class="text-sm text-indigo-800 dark:text-indigo-300">
                <p><strong>Email:</strong> john@example.com</p>
                <p><strong>Password:</strong> password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition">
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useToast } from '../../composables/useToast'
import { useLoader } from '../../composables/useLoader'
import { useThemeStore } from '../../stores/theme'

// Disable layout and middleware for this page
definePageMeta({
  layout: false,
  middleware: []
})

// Initialize theme on mount
const themeStore = useThemeStore()
onMounted(() => {
  themeStore.initTheme()
})

// Store and composables
const authStore = useAuthStore()
const { success, error: showError } = useToast()
const loader = useLoader()

// Form state
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Validation errors
const errors = reactive({
  email: '',
  password: ''
})

// UI state
const loading = ref(false)
const errorMessage = ref('')

// Validation functions
const validateEmail = () => {
  errors.email = ''
  if (!form.email) {
    errors.email = 'Email is required'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    return false
  }
  return true
}

const validatePassword = () => {
  errors.password = ''
  if (!form.password) {
    errors.password = 'Password is required'
    return false
  }
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return false
  }
  return true
}

const validateForm = () => {
  const emailValid = validateEmail()
  const passwordValid = validatePassword()
  return emailValid && passwordValid
}

// Handle form submission
const handleSubmit = async () => {
  // Clear previous error message
  errorMessage.value = ''
  
  // Validate fields
  if (!validateForm()) {
    showError('Please fix the validation errors')
    return
  }

  // Set loading state
  loading.value = true
  loader.show('Logging in...')

  try {
    // Call login action from store
    const result = await authStore.login(form.email, form.password)

    if (result.success) {
      // Success - show toast and redirect
      success('Login successful! Redirecting...', 'Welcome Back')
      await navigateTo('/dashboard')
    } else {
      // Show error message
      errorMessage.value = result.message || 'Invalid email or password. Please try again.'
      showError(result.message || 'Invalid email or password', 'Login Failed')
    }
  } catch (error: any) {
    // Handle unexpected errors
    errorMessage.value = error.message || 'An unexpected error occurred. Please try again.'
    showError(error.message || 'An unexpected error occurred', 'Error')
    console.error('Login error:', error)
  } finally {
    // Reset loading state
    loading.value = false
    loader.hide()
  }
}
</script>

