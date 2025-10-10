<template>
  <Teleport to="body">
    <Transition name="loader">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div class="relative">
          <!-- Spinner Container -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4">
            <!-- Animated Spinner -->
            <div class="relative w-16 h-16">
              <div class="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"/>
              <div class="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-400 rounded-full border-t-transparent animate-spin"/>
            </div>

            <!-- Loading Text -->
            <p class="text-gray-700 dark:text-gray-300 font-medium text-sm">
              {{ loadingText }}
            </p>

            <!-- Animated Dots -->
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0ms"/>
              <div class="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 150ms"/>
              <div class="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 300ms"/>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { loaderState } from '../../composables/useLoader'

const isLoading = computed(() => loaderState.isLoading)
const loadingText = computed(() => loaderState.text || 'Loading...')
</script>

<style scoped>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.3s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}

.loader-enter-active .relative,
.loader-leave-active .relative {
  transition: transform 0.3s ease;
}

.loader-enter-from .relative,
.loader-leave-to .relative {
  transform: scale(0.9);
}
</style>

