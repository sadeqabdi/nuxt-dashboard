export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Check auth status on app initialization (client-side only)
  await authStore.checkAuth()
})

