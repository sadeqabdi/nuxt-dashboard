<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300"
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <!-- Logo -->
        <div class="flex items-center mb-8 px-2">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-xl">N</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-1">
          <NuxtLink
            to="/dashboard"
            class="sidebar-link"
            :class="{ active: $route.path === '/dashboard' }"
            @click="closeSidebarOnMobile"
          >
            <HomeIcon class="w-5 h-5" />
            <span>Dashboard</span>
          </NuxtLink>

          <NuxtLink
            to="/users"
            class="sidebar-link"
            :class="{ active: $route.path === '/users' }"
            @click="closeSidebarOnMobile"
          >
            <UserGroupIcon class="w-5 h-5" />
            <span>Users</span>
          </NuxtLink>

          <NuxtLink
            to="/orders"
            class="sidebar-link"
            :class="{ active: $route.path === '/orders' }"
            @click="closeSidebarOnMobile"
          >
            <ShoppingBagIcon class="w-5 h-5" />
            <span>Orders</span>
          </NuxtLink>

          <NuxtLink
            to="/profile"
            class="sidebar-link"
            :class="{ active: $route.path === '/profile' }"
            @click="closeSidebarOnMobile"
          >
            <UserCircleIcon class="w-5 h-5" />
            <span>Profile</span>
          </NuxtLink>
        </nav>

        <!-- Divider -->
        <div class="my-4 border-t border-gray-200 dark:border-gray-700"/>

        <!-- Additional Links -->
        <nav class="space-y-1">
          <NuxtLink
            to="/analytics"
            class="sidebar-link"
            :class="{ active: $route.path === '/analytics' }"
            @click="closeSidebarOnMobile"
          >
            <ChartBarIcon class="w-5 h-5" />
            <span>Analytics</span>
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="sidebar-link"
            :class="{ active: $route.path === '/settings' }"
            @click="closeSidebarOnMobile"
          >
            <CogIcon class="w-5 h-5" />
            <span>Settings</span>
          </NuxtLink>
        </nav>

        <!-- User Section at Bottom -->
        <div class="absolute bottom-4 left-3 right-3">
          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 border border-indigo-200 dark:border-indigo-800">
            <div v-if="authStore.user" class="flex items-center gap-3">
              <img
                :src="authStore.user.avatar"
                :alt="authStore.user.name"
                class="w-10 h-10 rounded-full border-2 border-indigo-300 dark:border-indigo-600"
              >
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {{ authStore.user.name }}
                </p>
                <p class="text-xs text-gray-600 dark:text-gray-400 truncate">
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
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
        <div class="px-4 py-3">
          <div class="flex items-center justify-between">
            <!-- Mobile Menu Button -->
            <button
              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition lg:hidden"
              @click="toggleSidebar"
            >
              <Bars3Icon v-if="!sidebarOpen" class="w-6 h-6" />
              <XMarkIcon v-else class="w-6 h-6" />
            </button>

            <!-- Desktop Menu Button -->
            <button
              class="hidden lg:block p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              @click="toggleSidebar"
            >
              <Bars3Icon class="w-6 h-6" />
            </button>

            <!-- Page Title (visible on larger screens) -->
            <div class="hidden md:block">
              <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ pageTitle }}
              </h1>
            </div>

            <!-- Right Side -->
            <div class="flex items-center gap-2">
              <!-- Dark Mode Toggle -->
              <ThemeToggle />

              <!-- User Avatar Dropdown -->
              <div ref="dropdownRef" class="relative">
                <button
                  class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  @click="toggleDropdown"
                >
                  <img
                    v-if="authStore.user"
                    :src="authStore.user.avatar"
                    :alt="authStore.user.name"
                    class="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
                  >
                  <div v-else class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"/>
                  <ChevronDownIcon class="w-4 h-4 text-gray-600 dark:text-gray-400 hidden sm:block" />
                </button>

                <!-- Dropdown Menu -->
                <Transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-if="dropdownOpen"
                    class="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-200 dark:border-gray-700 focus:outline-none"
                  >
                    <!-- User Info -->
                    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">
                        {{ authStore.user?.name || 'User' }}
                      </p>
                      <p class="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {{ authStore.user?.email || 'user@example.com' }}
                      </p>
                    </div>

                    <!-- Menu Items -->
                    <div class="py-1">
                      <NuxtLink
                        to="/profile"
                        class="dropdown-item"
                        @click="closeDropdown"
                      >
                        <UserCircleIcon class="w-5 h-5" />
                        <span>My Profile</span>
                      </NuxtLink>
                      <NuxtLink
                        to="/settings"
                        class="dropdown-item"
                        @click="closeDropdown"
                      >
                        <CogIcon class="w-5 h-5" />
                        <span>Settings</span>
                      </NuxtLink>
                    </div>

                    <!-- Logout -->
                    <div class="border-t border-gray-200 dark:border-gray-700 py-1">
                      <button
                        class="dropdown-item w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        @click="handleLogout"
                      >
                        <ArrowRightOnRectangleIcon class="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
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
    />
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const route = useRoute()
const sidebarOpen = ref(true)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Sidebar functions
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const closeSidebarOnMobile = () => {
  if (import.meta.client && window.innerWidth < 1024) {
    closeSidebar()
  }
}

// Dropdown functions
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

// Logout handler
const handleLogout = async () => {
  closeDropdown()
  await authStore.logout()
}

// Page title based on route
const pageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard'
  if (path === '/users') return 'Users'
  if (path === '/orders') return 'Orders'
  if (path === '/profile') return 'Profile'
  if (path === '/analytics') return 'Analytics'
  if (path === '/settings') return 'Settings'
  return 'Dashboard'
})

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  // Set initial sidebar state based on screen size
  if (import.meta.client && window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
  
  // Add click outside listener for dropdown
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped>
.sidebar-link {
  @apply flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200;
}

.sidebar-link.active {
  @apply bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold;
}

.dropdown-item {
  @apply flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150;
}
</style>

