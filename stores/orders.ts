import { defineStore } from 'pinia'
import type { Order, OrderStatus } from '~/types'

export interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
  statusFilter: OrderStatus | 'all'
  currentPage: number
  itemsPerPage: number
  selectedOrder: Order | null
}

/**
 * Orders Store
 * Manages order data with filtering and status updates
 */
export const useOrdersStore = defineStore('orders', {
  state: (): OrdersState => ({
    orders: [],
    loading: false,
    error: null,
    statusFilter: 'all',
    currentPage: 1,
    itemsPerPage: 10,
    selectedOrder: null
  }),

  getters: {
    /**
     * Get filtered orders based on status
     */
    filteredOrders: (state) => {
      if (state.statusFilter === 'all') {
        return state.orders
      }
      
      return state.orders.filter(order => order.status === state.statusFilter)
    },

    /**
     * Get paginated orders
     */
    paginatedOrders(): Order[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredOrders.slice(start, end)
    },

    /**
     * Get total pages
     */
    totalPages(): number {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage)
    },

    /**
     * Check if there are orders
     */
    hasOrders: (state) => state.orders.length > 0,

    /**
     * Get order by ID
     */
    getOrderById: (state) => (id: number) => {
      return state.orders.find(order => order.id === id)
    },

    /**
     * Get orders count by status
     */
    ordersByStatus: (state) => {
      return {
        all: state.orders.length,
        pending: state.orders.filter(o => o.status === 'pending').length,
        processing: state.orders.filter(o => o.status === 'processing').length,
        shipped: state.orders.filter(o => o.status === 'shipped').length,
        delivered: state.orders.filter(o => o.status === 'delivered').length,
        cancelled: state.orders.filter(o => o.status === 'cancelled').length
      }
    }
  },

  actions: {
    /**
     * Fetch all orders (mock API)
     */
    async fetchOrders() {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock data - in production, this would be an API call
        this.orders = [
          {
            id: 1001,
            userId: 1,
            userName: 'John Doe',
            userEmail: 'john@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff',
            items: [
              { id: 1, name: 'Laptop Pro', quantity: 1, price: 1299.99 },
              { id: 2, name: 'Wireless Mouse', quantity: 2, price: 29.99 }
            ],
            totalAmount: 1359.97,
            status: 'delivered',
            createdAt: '2025-10-01T10:30:00Z',
            updatedAt: '2025-10-05T14:20:00Z',
            shippingAddress: '123 Main St, City, Country',
            notes: 'Please deliver before noon'
          },
          {
            id: 1002,
            userId: 2,
            userName: 'Jane Smith',
            userEmail: 'jane@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff',
            items: [
              { id: 3, name: 'Smartphone X', quantity: 1, price: 899.99 },
              { id: 4, name: 'Phone Case', quantity: 1, price: 19.99 }
            ],
            totalAmount: 919.98,
            status: 'shipped',
            createdAt: '2025-10-03T14:15:00Z',
            updatedAt: '2025-10-07T09:45:00Z',
            shippingAddress: '456 Oak Ave, Town, Country'
          },
          {
            id: 1003,
            userId: 3,
            userName: 'Bob Johnson',
            userEmail: 'bob@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=10b981&color=fff',
            items: [
              { id: 5, name: 'Tablet Plus', quantity: 1, price: 499.99 },
              { id: 6, name: 'Stylus Pen', quantity: 1, price: 79.99 }
            ],
            totalAmount: 579.98,
            status: 'processing',
            createdAt: '2025-10-05T11:20:00Z',
            updatedAt: '2025-10-06T16:30:00Z',
            shippingAddress: '789 Pine Rd, Village, Country'
          },
          {
            id: 1004,
            userId: 4,
            userName: 'Alice Williams',
            userEmail: 'alice@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=f59e0b&color=fff',
            items: [
              { id: 7, name: 'Headphones Pro', quantity: 1, price: 299.99 }
            ],
            totalAmount: 299.99,
            status: 'pending',
            createdAt: '2025-10-07T09:00:00Z',
            updatedAt: '2025-10-07T09:00:00Z',
            shippingAddress: '321 Elm St, City, Country'
          },
          {
            id: 1005,
            userId: 5,
            userName: 'Charlie Brown',
            userEmail: 'charlie@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=ef4444&color=fff',
            items: [
              { id: 8, name: 'Smart Watch', quantity: 1, price: 399.99 },
              { id: 9, name: 'Watch Band', quantity: 2, price: 24.99 }
            ],
            totalAmount: 449.97,
            status: 'pending',
            createdAt: '2025-10-08T15:30:00Z',
            updatedAt: '2025-10-08T15:30:00Z',
            shippingAddress: '654 Maple Dr, Town, Country'
          },
          {
            id: 1006,
            userId: 6,
            userName: 'Diana Prince',
            userEmail: 'diana@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=06b6d4&color=fff',
            items: [
              { id: 10, name: 'Camera Pro', quantity: 1, price: 1499.99 },
              { id: 11, name: 'Camera Lens', quantity: 1, price: 599.99 },
              { id: 12, name: 'Memory Card', quantity: 2, price: 49.99 }
            ],
            totalAmount: 2199.96,
            status: 'delivered',
            createdAt: '2025-09-28T08:00:00Z',
            updatedAt: '2025-10-02T11:00:00Z',
            shippingAddress: '987 Cedar Ln, Village, Country'
          },
          {
            id: 1007,
            userId: 7,
            userName: 'Evan Davis',
            userEmail: 'evan@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=Evan+Davis&background=f97316&color=fff',
            items: [
              { id: 13, name: 'Gaming Console', quantity: 1, price: 499.99 }
            ],
            totalAmount: 499.99,
            status: 'cancelled',
            createdAt: '2025-10-04T12:00:00Z',
            updatedAt: '2025-10-04T18:00:00Z',
            shippingAddress: '147 Birch St, City, Country',
            notes: 'Cancelled by customer'
          },
          {
            id: 1008,
            userId: 8,
            userName: 'Fiona Green',
            userEmail: 'fiona@example.com',
            userAvatar: 'https://ui-avatars.com/api/?name=Fiona+Green&background=84cc16&color=fff',
            items: [
              { id: 14, name: 'Keyboard Mechanical', quantity: 1, price: 149.99 },
              { id: 15, name: 'Mouse Pad XL', quantity: 1, price: 29.99 }
            ],
            totalAmount: 179.98,
            status: 'processing',
            createdAt: '2025-10-06T13:45:00Z',
            updatedAt: '2025-10-07T10:15:00Z',
            shippingAddress: '258 Spruce Ave, Town, Country'
          }
        ]
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch orders'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Update order status
     */
    async updateOrderStatus(orderId: number, newStatus: OrderStatus) {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        const order = this.orders.find(o => o.id === orderId)
        if (!order) {
          throw new Error('Order not found')
        }

        // Update order status and timestamp
        order.status = newStatus
        order.updatedAt = new Date().toISOString()

        // Update selected order if it's the one being modified
        if (this.selectedOrder?.id === orderId) {
          this.selectedOrder = { ...order }
        }

        return order
      } catch (err: any) {
        this.error = err.message || 'Failed to update order status'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Set status filter
     */
    setStatusFilter(status: OrderStatus | 'all') {
      this.statusFilter = status
      this.currentPage = 1 // Reset to first page when filtering
    },

    /**
     * Set current page
     */
    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },

    /**
     * Set selected order
     */
    setSelectedOrder(order: Order | null) {
      this.selectedOrder = order
    },

    /**
     * Reset filters and pagination
     */
    resetFilters() {
      this.statusFilter = 'all'
      this.currentPage = 1
    }
  }
})

