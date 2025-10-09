export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Check if user is authenticated
  if (process.client && !authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  const isPublicRoute = publicRoutes.includes(to.path)

  // If trying to access protected route without authentication
  if (!isPublicRoute && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  // If authenticated user tries to access login page, redirect to dashboard
  if (isPublicRoute && authStore.isAuthenticated) {
    return navigateTo('/')
  }
})

