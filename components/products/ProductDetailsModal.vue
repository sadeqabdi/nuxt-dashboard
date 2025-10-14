<template>
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="$emit('close')"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50"/>
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full border border-gray-200 dark:border-gray-700">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ isEditMode ? 'Edit Product' : 'Add New Product' }}
              </h2>
              <button
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                @click="$emit('close')"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
  
            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter product name"
                >
              </div>
  
              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  v-model="formData.description"
                  required
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter product description"
                ></textarea>
              </div>
  
              <!-- Price and Stock -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price ($) *
                  </label>
                  <input
                    v-model.number="formData.price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock *
                  </label>
                  <input
                    v-model.number="formData.stock"
                    type="number"
                    min="0"
                    required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  >
                </div>
              </div>
  
              <!-- Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <input
                  v-model="formData.category"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter category"
                >
              </div>
  
              <!-- Image URL -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  v-model="formData.image"
                  type="url"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                >
              </div>
  
              <!-- Actions -->
              <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  @click="$emit('close')"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {{ loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Add Product') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import type { Product } from '~/types'
  
  interface Props {
    isOpen: boolean
    product: Product | null
    loading: boolean
  }
  
  const props = defineProps<Props>()
  
  const emit = defineEmits<{
    close: []
    submit: [data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>]
  }>()
  
  const isEditMode = computed(() => !!props.product)
  
  const formData = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: ''
  })
  
  // Watch for product changes to populate form
  watch(() => props.product, (product) => {
    if (product) {
      formData.value = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image || ''
      }
    } else {
      // Reset form for new product
      formData.value = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: ''
      }
    }
  }, { immediate: true })
  
  const handleSubmit = () => {
    emit('submit', formData.value)
  }
  </script>