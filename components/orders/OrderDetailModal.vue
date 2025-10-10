<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && order"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"/>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Order Details
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Order #{{ order.id }}
                </p>
              </div>
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
            <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
              <!-- Customer Info -->
              <div class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Customer Information</h4>
                <div class="flex items-center space-x-4">
                  <img
                    v-if="order.userAvatar"
                    :src="order.userAvatar"
                    :alt="order.userName"
                    class="h-16 w-16 rounded-full"
                  >
                  <div v-else class="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                    {{ order.userName.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-base font-medium text-gray-900 dark:text-gray-100">{{ order.userName }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ order.userEmail }}</p>
                  </div>
                </div>
              </div>

              <!-- Order Info -->
              <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Order Date</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ formatDateTime(order.createdAt) }}
                  </p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Last Updated</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ formatDateTime(order.updatedAt) }}
                  </p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Status</h4>
                  <select
                    :value="localStatus"
                    :class="getStatusClasses(localStatus)"
                    class="w-full px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                    @change="updateStatus"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Total Amount</h4>
                  <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${{ order.totalAmount.toFixed(2) }}
                  </p>
                </div>
              </div>

              <!-- Shipping Address -->
              <div v-if="order.shippingAddress" class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Shipping Address</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  {{ order.shippingAddress }}
                </p>
              </div>

              <!-- Order Items -->
              <div class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Order Items</h4>
                <div class="space-y-3">
                  <div
                    v-for="item in order.items"
                    :key="item.id"
                    class="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                  >
                    <div class="flex-1">
                      <p class="font-medium text-gray-900 dark:text-gray-100">{{ item.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Quantity: {{ item.quantity }}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold text-gray-900 dark:text-gray-100">
                        ${{ (item.price * item.quantity).toFixed(2) }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        ${{ item.price.toFixed(2) }} each
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Total -->
                <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">Total</span>
                  <span class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${{ order.totalAmount.toFixed(2) }}
                  </span>
                </div>
              </div>

              <!-- Notes -->
              <div v-if="order.notes" class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Notes</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border-l-4 border-yellow-400">
                  {{ order.notes }}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <button
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                @click="close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Order, OrderStatus } from '~/types'

interface Props {
  isOpen: boolean
  order: Order | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'status-updated': [orderId: number, newStatus: OrderStatus]
}>()

const localStatus = ref<OrderStatus>(props.order?.status || 'pending')

watch(() => props.order, (newOrder) => {
  if (newOrder) {
    localStatus.value = newOrder.status
  }
}, { immediate: true })

const close = () => {
  emit('close')
}

const updateStatus = (e: Event) => {
  const newStatus = (e.target as HTMLSelectElement).value as OrderStatus
  localStatus.value = newStatus
  if (props.order) {
    emit('status-updated', props.order.id, newStatus)
  }
}

const getStatusClasses = (status: OrderStatus) => {
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 focus:ring-yellow-500',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 focus:ring-blue-500',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 focus:ring-purple-500',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 focus:ring-green-500',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 focus:ring-red-500'
  }

  return statusMap[status]
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>

