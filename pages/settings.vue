<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Settings Sidebar -->
      <div class="lg:col-span-1">
        <div class="card">
          <nav class="space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors"
              :class="activeTab === tab.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              <component :is="tab.icon" class="w-5 h-5" />
              <span>{{ tab.name }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2">
        <!-- Profile Settings -->
        <div v-if="activeTab === 'profile'" class="card">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Profile Settings</h2>
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                v-model="profileForm.name"
                type="text"
                class="input-field"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                v-model="profileForm.email"
                type="email"
                class="input-field"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Avatar URL
              </label>
              <input
                v-model="profileForm.avatar"
                type="url"
                class="input-field"
                placeholder="Enter avatar URL"
              />
            </div>
            <button type="submit" class="btn-primary">
              Save Changes
            </button>
          </form>
        </div>

        <!-- Appearance Settings -->
        <div v-if="activeTab === 'appearance'" class="card">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Appearance</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Theme
              </label>
              <div class="flex gap-4">
                <button
                  @click="themeStore.setTheme(false)"
                  class="flex-1 p-4 border-2 rounded-lg transition-colors"
                  :class="!themeStore.isDark ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'"
                >
                  <div class="text-2xl mb-2">☀️</div>
                  <div class="font-medium">Light</div>
                </button>
                <button
                  @click="themeStore.setTheme(true)"
                  class="flex-1 p-4 border-2 rounded-lg transition-colors"
                  :class="themeStore.isDark ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'"
                >
                  <div class="text-2xl mb-2">🌙</div>
                  <div class="font-medium">Dark</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="card">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Security Settings</h2>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                v-model="securityForm.currentPassword"
                type="password"
                class="input-field"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                v-model="securityForm.newPassword"
                type="password"
                class="input-field"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                v-model="securityForm.confirmPassword"
                type="password"
                class="input-field"
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit" class="btn-primary">
              Change Password
            </button>
          </form>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeTab === 'notifications'" class="card">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Notification Preferences</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Email Notifications</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Receive email updates</div>
              </div>
              <input type="checkbox" v-model="notificationForm.email" class="toggle" />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Push Notifications</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Receive push notifications</div>
              </div>
              <input type="checkbox" v-model="notificationForm.push" class="toggle" />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">SMS Notifications</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Receive SMS updates</div>
              </div>
              <input type="checkbox" v-model="notificationForm.sms" class="toggle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserIcon,
  SwatchIcon,
  ShieldCheckIcon,
  BellIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
const themeStore = useThemeStore()
const toast = useToast()

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', name: 'Profile', icon: UserIcon },
  { id: 'appearance', name: 'Appearance', icon: SwatchIcon },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon }
]

const profileForm = reactive({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  avatar: authStore.user?.avatar || ''
})

const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const notificationForm = reactive({
  email: true,
  push: false,
  sms: false
})

const saveProfile = () => {
  authStore.updateUser(profileForm)
  toast.success('Profile updated successfully!')
}

const changePassword = () => {
  if (securityForm.newPassword !== securityForm.confirmPassword) {
    toast.error('Passwords do not match!')
    return
  }
  toast.success('Password changed successfully!')
  securityForm.currentPassword = ''
  securityForm.newPassword = ''
  securityForm.confirmPassword = ''
}
</script>

