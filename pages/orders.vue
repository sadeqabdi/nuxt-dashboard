<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Orders Management
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          View and manage all customer orders
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div
          v-for="(count, status) in ordersStore.ordersByStatus"
          :key="status"
          :class="[
            'bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-lg',
            ordersStore.statusFilter === status ? 'ring-2 ring-blue-500' : ''
          ]"
          @click="setFilter(status as any)"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                {{ status }}
              </p>
              <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ count }}
              </p>
            </div>
            <div :class="getStatusIconClasses(status)">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <!-- Status Filter -->
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Status:
            </label>
            <div class="relative">
              <select
                v-model="ordersStore.statusFilter"
                class="appearance-none px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500"
                @change="ordersStore.setPage(1)"
              >
                <option value="all" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2">All Orders</option>
                <option value="pending" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2">Pending</option>
                <option value="processing" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2">Processing</option>
                <option value="shipped" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2">Shipped</option>
                <option value="delivered" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2">Delivered</option>
                <option value="cancelled" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2">Cancelled</option>
              </select>
              <!-- Custom Dropdown Icon -->
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Reset Button -->
          <button
            v-if="ordersStore.statusFilter !== 'all'"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            @click="resetFilters"
          >
            Reset Filters
          </button>
        </div>

        <!-- Results Summary -->
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {{ ordersStore.paginatedOrders.length }} of {{ ordersStore.filteredOrders.length }} orders
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"/>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="mt-2 text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
        <button
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          @click="loadOrders"
        >
          Try Again
        </button>
      </div>

      <!-- Orders Table -->
      <div v-else>
        <OrderTable
          :orders="ordersStore.paginatedOrders"
          :empty-message="ordersStore.statusFilter === 'all' ? 'No orders yet' : `No ${ordersStore.statusFilter} orders`"
          @status-change="handleStatusChange"
          @view-details="openDetailsModal"
        />

        <!-- Pagination -->
        <div v-if="ordersStore.totalPages > 1" class="mt-6 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-4">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Page <span class="font-medium">{{ ordersStore.currentPage }}</span> of 
            <span class="font-medium">{{ ordersStore.totalPages }}</span>
          </div>
          
          <div class="flex items-center gap-2">
            <button
              :disabled="ordersStore.currentPage === 1"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                ordersStore.currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
              @click="ordersStore.setPage(ordersStore.currentPage - 1)"
            >
              Previous
            </button>
            
            <div class="flex items-center gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  ordersStore.currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
                @click="ordersStore.setPage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button
              :disabled="ordersStore.currentPage === ordersStore.totalPages"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                ordersStore.currentPage === ordersStore.totalPages
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
              @click="ordersStore.setPage(ordersStore.currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Order Detail Modal -->
      <OrderDetailModal
        :is-open="isModalOpen"
        :order="selectedOrder"
        @close="closeDetailsModal"
        @status-updated="handleStatusUpdateFromModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useOrdersStore } from '../stores/orders'
import { useToast } from '../composables/useToast'
import { useLoader } from '../composables/useLoader'
import OrderTable from '../components/orders/OrderTable.vue'
import OrderDetailModal from '../components/orders/OrderDetailModal.vue'
import type { Order, OrderStatus } from '../types'

const ordersStore = useOrdersStore()
const toast = useToast()
const loader = useLoader()

const loading = ref(false)
const error = ref<string | null>(null)
const isModalOpen = ref(false)
const selectedOrder = ref<Order | null>(null)

// Watch loading state from orders store
watch(() => ordersStore.loading, (isLoading) => {
  if (isLoading) {
    loader.show('Loading orders...')
  } else {
    loader.hide()
  }
})

// Watch local loading state
watch(loading, (isLoading) => {
  if (isLoading) {
    loader.show('Processing...')
  } else {
    loader.hide()
  }
})

// Load orders on mount
onMounted(async () => {
  await loadOrders()
})

const loadOrders = async () => {
  loading.value = true
  error.value = null
  
  try {
    await ordersStore.fetchOrders()
  } catch (err: any) {
    error.value = err.message || 'Failed to load orders'
    toast.error('Failed to load orders')
  } finally {
    loading.value = false
  }
}

const handleStatusChange = async (orderId: number, newStatus: string) => {
  try {
    await ordersStore.updateOrderStatus(orderId, newStatus as OrderStatus)
    toast.success(`Order #${orderId} status updated to ${newStatus}`)
  } catch (err: any) {
    toast.error('Failed to update order status')
  }
}

const handleStatusUpdateFromModal = async (orderId: number, newStatus: OrderStatus) => {
  try {
    await ordersStore.updateOrderStatus(orderId, newStatus)
    toast.success(`Order #${orderId} status updated to ${newStatus}`)
    
    // Update the selected order to reflect changes
    if (selectedOrder.value && selectedOrder.value.id === orderId) {
      selectedOrder.value = ordersStore.getOrderById(orderId) || null
    }
  } catch (err: any) {
    toast.error('Failed to update order status')
  }
}

const openDetailsModal = (order: Order) => {
  selectedOrder.value = order
  isModalOpen.value = true
}

const closeDetailsModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedOrder.value = null
  }, 300)
}

const setFilter = (status: OrderStatus | 'all') => {
  ordersStore.setStatusFilter(status)
}

const resetFilters = () => {
  ordersStore.resetFilters()
}

// Calculate visible page numbers for pagination
const visiblePages = computed(() => {
  const total = ordersStore.totalPages
  const current = ordersStore.currentPage
  const delta = 2
  const range = []
  const rangeWithDots = []

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i)
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (current + delta < total - 1) {
    rangeWithDots.push('...', total)
  } else if (total > 1) {
    rangeWithDots.push(total)
  }

  return rangeWithDots.filter(p => typeof p === 'number') as number[]
})

const getStatusIconClasses = (status: string) => {
  const statusMap: Record<string, string> = {
    all: 'text-gray-500',
    pending: 'text-yellow-500',
    processing: 'text-blue-500',
    shipped: 'text-purple-500',
    delivered: 'text-green-500',
    cancelled: 'text-red-500'
  }
  return statusMap[status] || 'text-gray-500'
}
</script>

<style scoped>
/* Better dropdown styling for dark mode */
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
  color: white;
}

:global(.dark) select option:hover,
:global(.dark) select option:focus,
:global(.dark) select option:checked {
  background: linear-gradient(0deg, #6366f1 0%, #6366f1 100%);
  color: white;
}
</style>
