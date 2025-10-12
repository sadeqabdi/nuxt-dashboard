<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage your user base ({{ usersStore.totalUsers }} total users)
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
        @click="openAddModal"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New User
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1 relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, email, or role..."
          class="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        >
        <button
          v-if="searchQuery"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          @click="clearSearch"
        >
          <svg class="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <button
        :disabled="usersStore.loading"
        class="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        @click="refreshUsers"
      >
        <svg 
          class="w-5 h-5" 
          :class="{ 'animate-spin': usersStore.loading }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="usersStore.loading && !usersStore.hasUsers" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
      <div class="flex flex-col items-center justify-center">
        <svg class="w-12 h-12 text-indigo-600 animate-spin mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <p class="text-gray-600 dark:text-gray-400 font-medium">Loading users...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!usersStore.loading && usersStore.filteredUsers.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
      <div class="flex flex-col items-center justify-center">
        <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {{ searchQuery ? 'No users found' : 'No users yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
          {{ searchQuery ? 'Try adjusting your search query' : 'Get started by adding your first user' }}
        </p>
        <button
          v-if="!searchQuery"
          class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          @click="openAddModal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Your First User
        </button>
      </div>
    </div>

    <!-- Users Table -->
    <div v-else>
      <UserTable
        :users="usersStore.paginatedUsers"
        @edit="openEditModal"
        @delete="confirmDelete"
      />

      <!-- Pagination -->
      <div v-if="usersStore.totalPages > 1" class="mt-6 flex items-center justify-between">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Showing {{ ((usersStore.currentPage - 1) * usersStore.itemsPerPage) + 1 }} 
          to {{ Math.min(usersStore.currentPage * usersStore.itemsPerPage, usersStore.filteredUsers.length) }} 
          of {{ usersStore.filteredUsers.length }} results
        </p>
        <div class="flex items-center gap-2">
          <button
            :disabled="usersStore.currentPage === 1"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            @click="previousPage"
          >
            Previous
          </button>
          <span class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            Page {{ usersStore.currentPage }} of {{ usersStore.totalPages }}
                </span>
          <button
            :disabled="usersStore.currentPage === usersStore.totalPages"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            @click="nextPage"
          >
            Next
                  </button>
                </div>
      </div>
    </div>

    <!-- User Modal -->
    <UserModal
      :key="modalKey"
      :is-open="isModalOpen"
      :user="selectedUser"
      :loading="usersStore.loading"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Modal -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="cancelDelete"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50"/>
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Delete User</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Are you sure you want to delete <strong>{{ userToDelete?.name }}</strong>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div class="flex items-center justify-end gap-3">
              <button
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                @click="cancelDelete"
              >
                Cancel
              </button>
              <button
                :disabled="usersStore.loading"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                @click="handleDelete"
              >
                {{ usersStore.loading ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { User } from '../types'
import { useUsersStore } from '../stores/users'
import { useToast } from '../composables/useToast'
import { useLoader } from '../composables/useLoader'
import UserModal from '../components/users/UserModal.vue'
import UserTable from '../components/users/UserTable.vue'

const usersStore = useUsersStore()
const toast = useToast()
const loader = useLoader()

// Watch loading state
watch(() => usersStore.loading, (isLoading) => {
  if (isLoading) {
    loader.show('Loading users...')
  } else {
    loader.hide()
  }
})

// State
const isModalOpen = ref(false)
const selectedUser = ref<User | null>(null)
const showDeleteConfirm = ref(false)
const userToDelete = ref<User | null>(null)
const modalKey = ref(0)

// Search
const searchQuery = computed({
  get: () => usersStore.searchQuery,
  set: (value) => usersStore.setSearchQuery(value)
})

const clearSearch = () => {
  usersStore.setSearchQuery('')
}

// Pagination
const nextPage = () => {
  usersStore.setPage(usersStore.currentPage + 1)
}

const previousPage = () => {
  usersStore.setPage(usersStore.currentPage - 1)
}

// Modal actions
const openAddModal = () => {
  selectedUser.value = null
  modalKey.value++
  isModalOpen.value = true
}

const openEditModal = (user: User) => {
  selectedUser.value = user
  modalKey.value++
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedUser.value = null
}

// CRUD operations
const handleSubmit = async (userData: Omit<User, 'id'>) => {
  try {
    if (selectedUser.value) {
      // Update existing user
      await usersStore.updateUser(selectedUser.value.id, userData)
      toast.success(`User ${userData.name} updated successfully!`)
    } else {
      // Add new user
      await usersStore.addUser(userData)
      toast.success(`User ${userData.name} added successfully!`)
    }
    closeModal()
  } catch (error: any) {
    toast.error(error.message || 'Failed to save user')
  }
}

const confirmDelete = (user: User) => {
  userToDelete.value = user
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  userToDelete.value = null
}

const handleDelete = async () => {
  if (!userToDelete.value) return

  try {
    const userName = userToDelete.value.name
    await usersStore.deleteUser(userToDelete.value.id)
    toast.success(`User ${userName} deleted successfully!`)
    cancelDelete()
  } catch (error: any) {
    toast.error(error.message || 'Failed to delete user')
  }
}

const refreshUsers = async () => {
  try {
    await usersStore.fetchUsers()
    toast.success('Users refreshed!')
  } catch (error: any) {
    toast.error('Failed to refresh users')
  }
}

// Fetch users on mount
onMounted(async () => {
  try {
    await usersStore.fetchUsers()
  } catch (error: any) {
    toast.error('Failed to load users')
  }
})
</script>
