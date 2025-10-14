<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Products Management
              </h1>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your product inventory
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
              Add New Product
            </button>
          </div>
        </div>
         <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <!-- Total Products -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Total Products
                    </p>
                    <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {{ productsStore.products.length }}
                    </p>
                </div>
                <div class="text-blue-500">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                </div>
                </div>
            </div>

            <!-- Total Value -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Total Value
                    </p>
                    <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${{ totalValue.toFixed(2) }}
                    </p>
                </div>
                <div class="text-green-500">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                    </svg>
                </div>
                </div>
            </div>

  <!-- Low Stock -->
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Low Stock
        </p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {{ lowStockCount }}
        </p>
      </div>
      <div class="text-red-500">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
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
            @click="loadProducts"
          >
            Try Again
          </button>
        </div>
  
        <!-- Products Table -->
        <div v-else>
          <ProductTable
            :products="productsStore.paginatedProducts"
            @edit="openEditModal"
            @delete="confirmDelete"
          />
  
          <!-- Pagination -->
          <div v-if="productsStore.totalPages > 1" class="mt-6 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-4">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Page <span class="font-medium">{{ productsStore.currentPage }}</span> of 
              <span class="font-medium">{{ productsStore.totalPages }}</span>
            </div>
            
            <div class="flex items-center gap-2">
              <button
                :disabled="productsStore.currentPage === 1"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  productsStore.currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                ]"
                @click="productsStore.setPage(productsStore.currentPage - 1)"
              >
                Previous
              </button>
              
              <div class="flex items-center gap-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    productsStore.currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]"
                  @click="productsStore.setPage(page)"
                >
                  {{ page }}
                </button>
              </div>
              
              <button
                :disabled="productsStore.currentPage === productsStore.totalPages"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  productsStore.currentPage === productsStore.totalPages
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                ]"
                @click="productsStore.setPage(productsStore.currentPage + 1)"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
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
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Delete Product</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Are you sure you want to delete <strong>{{ productToDelete?.name }}</strong>? This action cannot be undone.
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
                    :disabled="productsStore.loading"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    @click="handleDelete"
                    >
                    {{ productsStore.loading ? 'Deleting...' : 'Delete' }}
                    </button>
                </div>
                </div>
            </div>
              </div>
            </Transition>

        <!-- Product Modal -->
        <ProductDetailsModal
            :key="modalKey"
            :is-open="isModalOpen"
            :product="selectedProduct"
            :loading="productsStore.loading"
            @close="closeModal"
            @submit="handleSubmit" 
            />
    </div>
</template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useProductsStore } from '~/stores/product'
  import { useToast } from '~/composables/useToast'
  import ProductTable from '~/components/products/ProductTable.vue'
  import ProductDetailsModal from '~/components/products/ProductDetailsModal.vue'
  import type { Product } from '~/types'
  
  const productsStore = useProductsStore()
  const toast = useToast() 
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Delete confirmation modal state
  const showDeleteConfirm = ref(false)
  const productToDelete = ref<Product | null>(null)

  // Product modal state
  const isModalOpen = ref(false)
  const selectedProduct = ref<Product | null>(null)
  const modalKey = ref(0)


  // Computed properties
  const totalValue = computed(() => {
     return productsStore.products.reduce((sum, product) => 
       sum + (product.price * product.stock), 0
  )
})

  const lowStockCount = computed(() => {
    return productsStore.products.filter(p => p.stock < 10).length
})
  
  // Load products on mount
  onMounted(async () => {
    await loadProducts()
  })
  
  const loadProducts = async () => {
    loading.value = true
    error.value = null
    
    try {
      await productsStore.fetchProducts()
    } catch (err: any) {
      error.value = err.message || 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  const confirmDelete = (product: Product) => {
  productToDelete.value = product
  showDeleteConfirm.value = true
}

  const cancelDelete = () => {
  showDeleteConfirm.value = false
  productToDelete.value = null
}

  const handleDelete = async () => {
    if (!productToDelete.value) return

    try {
        const productName = productToDelete.value.name
        await productsStore.deleteProduct(productToDelete.value.id)
        toast.success(`Product ${productName} deleted successfully!`)
        cancelDelete()
    } catch (error: any) {
        toast.error(error.message || 'Failed to delete product')
    }
}
  
  const openAddModal = () => {
  selectedProduct.value = null
  modalKey.value++
  isModalOpen.value = true
}

  const openEditModal = (product: Product) => {
  selectedProduct.value = product
  modalKey.value++
  isModalOpen.value = true
}

  const closeModal = () => {
  isModalOpen.value = false
  selectedProduct.value = null
}

  const handleSubmit = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
        if (selectedProduct.value) {
        // Update existing product
        await productsStore.updateProduct(selectedProduct.value.id, productData)
        toast.success(`Product ${productData.name} updated successfully!`)
        } else {
        // Add new product
        await productsStore.addProduct(productData)
        toast.success(`Product ${productData.name} added successfully!`)
        }
        closeModal()
    } catch (error: any) {
        toast.error(error.message || 'Failed to save product')
    }
}
  const visiblePages = computed(() => {
    const total = productsStore.totalPages
    const current = productsStore.currentPage
    const delta = 2
    const range = []
  
    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i)
    }
  
    return range.length > 0 ? range : [1]
  })
  </script>