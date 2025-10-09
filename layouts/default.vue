<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300"
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <!-- Logo -->
        <div class="flex items-center mb-5 px-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">N</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Nuxt Dashboard</span>
          </div>
        </div>

        <!-- Navigation -->
        <ul class="space-y-2 font-medium">
          <li>
            <NuxtLink
              to="/"
              class="sidebar-link"
              :class="{ active: $route.path === '/' }"
              @click="closeSidebarOnMobile"
            >
              <HomeIcon class="w-5 h-5" />
              <span>Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/analytics"
              class="sidebar-link"
              :class="{ active: $route.path === '/analytics' }"
              @click="closeSidebarOnMobile"
            >
              <ChartBarIcon class="w-5 h-5" />
              <span>Analytics</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/users"
              class="sidebar-link"
              :class="{ active: $route.path === '/users' }"
              @click="closeSidebarOnMobile"
            >
              <UserGroupIcon class="w-5 h-5" />
              <span>Users</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/settings"
              class="sidebar-link"
              :class="{ active: $route.path === '/settings' }"
              @click="closeSidebarOnMobile"
            >
              <CogIcon class="w-5 h-5" />
              <span>Settings</span>
            </NuxtLink>
          </li>
        </ul>

        <!-- User Section -->
        <div class="absolute bottom-4 left-3 right-3">
          <div class="card p-3">
            <div v-if="authStore.user" class="flex items-center gap-3">
              <img
                :src="authStore.user.avatar"
                :alt="authStore.user.name"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ authStore.user.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ authStore.user.email }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="transition-all duration-300" :class="{ 'lg:ml-64': sidebarOpen }">
      <!-- Top Bar -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div class="px-4 py-3">
          <div class="flex items-center justify-between">
            <!-- Mobile Menu Button -->
            <button
              @click="toggleSidebar"
              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <Bars3Icon v-if="!sidebarOpen" class="w-6 h-6" />
              <XMarkIcon v-else class="w-6 h-6" />
            </button>

            <!-- Desktop Menu Button -->
            <button
              @click="toggleSidebar"
              class="hidden lg:block p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bars3Icon class="w-6 h-6" />
            </button>

            <!-- Right Side -->
            <div class="flex items-center gap-3">
              <ThemeToggle />
              <button
                @click="handleLogout"
                class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 lg:p-6">
        <slot />
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const closeSidebarOnMobile = () => {
  if (process.client && window.innerWidth < 1024) {
    closeSidebar()
  }
}

const handleLogout = async () => {
  await authStore.logout()
}

onMounted(() => {
  if (process.client && window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
})
</script>

