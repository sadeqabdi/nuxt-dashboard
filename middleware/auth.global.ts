export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Check if user is authenticated on client side
  if (process.client && !authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/login', '/register', '/forgot-password', '/']
  const isPublicRoute = publicRoutes.includes(to.path)

  // If token is missing → redirect to /auth/login
  // Exception: Allow root path (/) for testing dashboard
  if (!isPublicRoute && !authStore.token && to.path !== '/') {
    return navigateTo('/auth/login')
  }

  // If token exists → allow route access
  // If authenticated user tries to access login page, redirect to dashboard
  // Exception: Don't redirect from root path
  if (isPublicRoute && authStore.token && to.path === '/auth/login') {
    return navigateTo('/dashboard')
  }
})

