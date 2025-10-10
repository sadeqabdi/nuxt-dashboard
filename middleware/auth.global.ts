export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Check if user is authenticated on client side
  if (import.meta.client && !authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  // Redirect root to login or dashboard based on auth status
  if (to.path === '/') {
    if (authStore.token) {
      return navigateTo('/dashboard')
    } else {
      return navigateTo('/auth/login')
    }
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/login', '/register', '/forgot-password']
  const isPublicRoute = publicRoutes.includes(to.path)

  // If token is missing → redirect to /auth/login
  if (!isPublicRoute && !authStore.token) {
    return navigateTo('/auth/login')
  }

  // If token exists and trying to access login → redirect to dashboard
  if (authStore.token && to.path === '/auth/login') {
    return navigateTo('/dashboard')
  }
})

