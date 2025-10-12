<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"/>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {{ user ? 'Edit User' : 'Add New User' }}
              </h3>
              <button
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                @click="close"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="px-6 py-4">
              <form @submit.prevent="handleSubmit">
                <!-- Name -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Name *
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter user name"
                  >
                </div>

                <!-- Email -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Email *
                  </label>
                  <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter email address"
                  >
                </div>

                <!-- Role -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Role *
                  </label>
                  <select
                    v-model="formData.role"
                    required
                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                  </select>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    @click="close"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {{ loading ? 'Saving...' : (user ? 'Update' : 'Create') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '~/types'

interface Props {
  isOpen: boolean
  user?: User | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  loading: false
})

const emit = defineEmits<{
  close: []
  submit: [data: Omit<User, 'id'>]
}>()

const formData = ref({
  name: '',
  email: '',
  role: 'user' as 'admin' | 'user' | 'guest'
})

// Reset or populate form when user changes
watch(() => props.user, (newUser) => {
  if (newUser) {
    formData.value = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'admin' | 'user' | 'guest'
    }
  } else {
    formData.value = {
      name: '',
      email: '',
      role: 'user'
    }
  }
}, { immediate: true })

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  const userData = {
    name: formData.value.name,
    email: formData.value.email,
    role: formData.value.role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.value.name)}&background=random&color=fff`
  }
  emit('submit', userData)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
