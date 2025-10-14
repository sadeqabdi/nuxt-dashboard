<template>
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Header -->
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Stock
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        
        <!-- Body -->
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr 
                v-for="product in products" 
                :key="product.id" 
                class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
                <!-- ID -->
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    #{{ product.id }}
                </div>
                </td>

                <!-- Product -->
                <td class="px-6 py-4">
                <div class="flex items-center">
                    <img 
                    v-if="product.image" 
                    :src="product.image" 
                    :alt="product.name" 
                    class="h-12 w-12 rounded-lg object-cover"
                    >
                    <div v-else class="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    </div>
                    <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {{ product.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ product.category }}
                    </div>
                    </div>
                </div>
                </td>

                <!-- Amount -->
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    ${{ product.price.toFixed(2) }}
                </div>
                </td>

                <!-- Stock -->
                <td class="px-6 py-4 whitespace-nowrap">
                <span 
                    :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    product.stock > 20 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    product.stock > 10 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    ]"
                >
                    {{ product.stock }} units
                </span>
                </td>

                <!-- Date -->
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ formatDate(product.createdAt) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatTime(product.createdAt) }}
                </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex items-center gap-3">
                    <button
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    @click="emit('edit', product)"
                    >
                    Edit
                    </button>
                    <button
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium"
                    @click="emit('delete', product)"
                    >
                    Delete
                    </button>
                </div>
                </td>
            </tr>
    </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Product } from '~/types'
  
  // Props function
  interface Props {
    products: Product[]
    emptyMessage?: string
  }
  
  const props = defineProps<Props>()
  
  // Emits function
  const emit = defineEmits<{
    edit: [product: Product]
    delete: [product: Product]
  }>()
  
  // format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  // format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  </script>