<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Order ID
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            User
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Amount
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Date
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <!-- Order ID -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
              #{{ order.id }}
            </div>
          </td>

          <!-- User -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <img v-if="order.userAvatar" :src="order.userAvatar" :alt="order.userName" class="h-10 w-10 rounded-full" >
              <div v-else class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {{ order.userName.charAt(0) }}
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ order.userName }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ order.userEmail }}
                </div>
              </div>
            </div>
          </td>

          <!-- Amount -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              ${{ order.totalAmount.toFixed(2) }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ order.items.length }} item{{ order.items.length > 1 ? 's' : '' }}
            </div>
          </td>

          <!-- Date -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900 dark:text-gray-100">
              {{ formatDate(order.createdAt) }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatTime(order.createdAt) }}
            </div>
          </td>

          <!-- Status -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="relative inline-block">
              <select
                :value="order.status"
                :class="getStatusClasses(order.status)"
                class="appearance-none text-xs font-medium px-3 py-1.5 pr-8 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                @change="(e) => $emit('status-change', order.id, (e.target as HTMLSelectElement).value)"
              >
                <option value="pending" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Pending</option>
                <option value="processing" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Processing</option>
                <option value="shipped" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Shipped</option>
                <option value="delivered" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Delivered</option>
                <option value="cancelled" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Cancelled</option>
              </select>
              <!-- Dropdown Icon -->
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </td>

          <!-- Actions -->
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <button
              class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              @click="$emit('view-details', order)"
            >
              View Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty State -->
    <div v-if="orders.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No orders found</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ emptyMessage || 'Try adjusting your filters to find orders.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order, OrderStatus } from '~/types'

interface Props {
  orders: Order[]
  emptyMessage?: string
}

defineProps<Props>()

defineEmits<{
  'status-change': [orderId: number, newStatus: string]
  'view-details': [order: Order]
}>()

const getStatusClasses = (status: OrderStatus) => {
  const baseClasses = 'text-xs font-medium px-3 py-1.5 rounded-full'
  
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }

  return `${baseClasses} ${statusMap[status]}`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
/* Better dropdown styling for status options */
select option {
  background-color: white;
  color: #111827;
  padding: 0.5rem;
}

:global(.dark) select option {
  background-color: #1f2937;
  color: #f9fafb;
}

select option:hover,
select option:focus,
select option:checked {
  background: linear-gradient(0deg, #6366f1 0%, #6366f1 100%);
  background-color: #6366f1;
  color: white;
}

:global(.dark) select option:hover,
:global(.dark) select option:focus,
:global(.dark) select option:checked {
  background: linear-gradient(0deg, #6366f1 0%, #6366f1 100%);
  background-color: #6366f1;
  color: white;
}
</style>
