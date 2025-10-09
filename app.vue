<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Auth Testing Dashboard -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          🔐 Auth System Testing Dashboard
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Test and monitor the complete authentication system in real-time
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column: Auth State Display -->
        <div class="space-y-6">
          <!-- Current Auth State Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Current Auth State
            </h2>

            <!-- Authentication Status -->
            <div class="mb-4 p-4 rounded-lg" :class="authStore.isAuthenticated ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg v-if="authStore.isAuthenticated" class="h-6 w-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-6 w-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium" :class="authStore.isAuthenticated ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'">
                    <strong>Authenticated:</strong> {{ authStore.isAuthenticated ? 'TRUE ✓' : 'FALSE ✗' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Token Display -->
            <div class="mb-4">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Token:
              </h3>
              <div v-if="authStore.token" class="p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                <code class="text-xs text-gray-800 dark:text-gray-200 break-all font-mono">{{ authStore.token }}</code>
              </div>
              <div v-else class="p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                <span class="text-sm text-gray-500 dark:text-gray-400 italic">No token available</span>
              </div>
            </div>

            <!-- User Information -->
            <div>
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                User Information:
              </h3>
              <div v-if="authStore.user" class="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <div class="space-y-2">
                  <div class="flex items-center">
                    <img :src="authStore.user.avatar" :alt="authStore.user.name" class="w-12 h-12 rounded-full mr-3 border-2 border-indigo-300 dark:border-indigo-600" />
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">{{ authStore.user.name }}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ authStore.user.email }}</p>
                    </div>
                  </div>
                  <div class="pt-2 border-t border-indigo-200 dark:border-indigo-700">
                    <p class="text-xs text-gray-700 dark:text-gray-300"><strong>ID:</strong> {{ authStore.user.id }}</p>
                    <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Role:</strong> 
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">
                        {{ authStore.user.role }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div v-else class="p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                <span class="text-sm text-gray-500 dark:text-gray-400 italic">No user logged in</span>
              </div>
            </div>

            <!-- Logout Button -->
            <div v-if="authStore.isAuthenticated" class="mt-6">
              <button
                @click="handleLogout"
                class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          <!-- LocalStorage View -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
              LocalStorage Contents
            </h2>
            <div class="space-y-2 text-xs">
              <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p class="text-gray-600 dark:text-gray-400 mb-1"><strong>auth_token:</strong></p>
                <code class="text-gray-800 dark:text-gray-200 break-all font-mono">{{ localStorageToken || 'null' }}</code>
              </div>
              <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p class="text-gray-600 dark:text-gray-400 mb-1"><strong>user:</strong></p>
                <code class="text-gray-800 dark:text-gray-200 break-all font-mono">{{ localStorageUser || 'null' }}</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Login Form -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login Form
            </h2>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-shake">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm text-red-800 dark:text-red-400">{{ errorMessage }}</p>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm text-green-800 dark:text-green-400">{{ successMessage }}</p>
              </div>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
              <!-- Email Field -->
              <div>
                <label for="test-email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="test-email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  :disabled="loading"
                  class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="admin@example.com"
                />
              </div>

              <!-- Password Field -->
              <div>
                <label for="test-password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="test-password"
                  v-model="loginForm.password"
                  type="password"
                  required
                  :disabled="loading"
                  class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter any password"
                />
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span v-if="!loading" class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Test Login
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                </button>
              </div>
            </form>

            <!-- Demo Credentials -->
            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Demo Credentials:</h3>
              <div class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <p><strong>Email:</strong> admin@example.com</p>
                <p><strong>Password:</strong> Any password works</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            <div class="space-y-3">
              <button
                @click="fillDemoCredentials"
                class="w-full flex items-center justify-center py-2 px-4 border border-indigo-300 dark:border-indigo-700 rounded-lg text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Fill Demo Credentials
              </button>
              <button
                @click="clearLocalStorage"
                class="w-full flex items-center justify-center py-2 px-4 border border-orange-300 dark:border-orange-700 rounded-lg text-sm font-medium text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear LocalStorage
              </button>
              <button
                @click="refreshAuthState"
                class="w-full flex items-center justify-center py-2 px-4 border border-green-300 dark:border-green-700 rounded-lg text-sm font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Auth State
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden: Original Layout (for reference) -->
    <div class="hidden">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const authStore = useAuthStore()

// Login form state
const loginForm = reactive({
  email: '',
  password: ''
})

// UI state
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// LocalStorage reactive values
const localStorageToken = ref('')
const localStorageUser = ref('')

// Update localStorage display
const updateLocalStorageDisplay = () => {
  if (process.client) {
    localStorageToken.value = localStorage.getItem('auth_token') || ''
    localStorageUser.value = localStorage.getItem('user') || ''
  }
}

// Handle login
const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    const result = await authStore.login(loginForm.email, loginForm.password)

    if (result.success) {
      successMessage.value = '✓ Login successful! Auth state updated.'
      loginForm.password = '' // Clear password
      updateLocalStorageDisplay()
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      errorMessage.value = result.message || 'Login failed'
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}

// Handle logout
const handleLogout = async () => {
  try {
    await authStore.logout()
    successMessage.value = '✓ Logged out successfully'
    updateLocalStorageDisplay()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error: any) {
    errorMessage.value = 'Logout failed: ' + error.message
  }
}

// Fill demo credentials
const fillDemoCredentials = () => {
  loginForm.email = 'admin@example.com'
  loginForm.password = 'password123'
  successMessage.value = 'Demo credentials filled!'
  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}

// Clear localStorage
const clearLocalStorage = () => {
  if (process.client) {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    authStore.user = null
    authStore.token = null
    authStore.isAuthenticated = false
    updateLocalStorageDisplay()
    successMessage.value = 'LocalStorage cleared!'
    setTimeout(() => {
      successMessage.value = ''
    }, 2000)
  }
}

// Refresh auth state
const refreshAuthState = async () => {
  await authStore.checkAuth()
  updateLocalStorageDisplay()
  successMessage.value = 'Auth state refreshed from localStorage!'
  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}

// Initialize theme and auth
onMounted(async () => {
  themeStore.initTheme()
  await authStore.checkAuth()
  updateLocalStorageDisplay()
  
  // Watch for localStorage changes
  if (process.client) {
    window.addEventListener('storage', updateLocalStorageDisplay)
    
    // Update localStorage display every second to catch changes
    setInterval(updateLocalStorageDisplay, 1000)
  }
})

// Cleanup
onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('storage', updateLocalStorageDisplay)
  }
})
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.animate-shake {
  animation: shake 0.5s;
}
</style>

