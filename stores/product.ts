import { defineStore } from 'pinia'
import type { Product } from '~/types'

export interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  itemsPerPage: number
  selectedProduct: Product | null
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
    selectedProduct: null
  }),

  getters: {
    paginatedProducts(): Product[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.products.slice(start, end)
    },

    totalPages(): number {
      return Math.ceil(this.products.length / this.itemsPerPage)
    },

    hasProducts: (state) => state.products.length > 0,

    getProductById: (state) => (id: number) => {
      return state.products.find(product => product.id === id)
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.products = [
          {
            id: 1,
            name: 'Laptop Pro',
            description: 'High-performance laptop for professionals',
            price: 1299.99,
            stock: 15,
            category: 'Electronics',
            createdAt: '2025-10-01T10:30:00Z',
            updatedAt: '2025-10-01T10:30:00Z',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
          },
          {
            id: 2,
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse',
            price: 29.99,
            stock: 50,
            category: 'Accessories',
            createdAt: '2025-10-02T14:15:00Z',
            updatedAt: '2025-10-02T14:15:00Z',
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'
          },
          {
            id: 3,
            name: 'Smartphone X',
            description: 'Latest generation smartphone',
            price: 899.99,
            stock: 25,
            category: 'Electronics',
            createdAt: '2025-10-03T11:20:00Z',
            updatedAt: '2025-10-03T11:20:00Z',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
          },
          {
            id: 4,
            name: 'Phone Case',
            description: 'Protective phone case',
            price: 19.99,
            stock: 100,
            category: 'Accessories',
            createdAt: '2025-10-04T09:00:00Z',
            updatedAt: '2025-10-04T09:00:00Z',
            image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400'
          },
          {
            id: 5,
            name: 'Tablet Plus',
            description: 'Versatile tablet for work and play',
            price: 499.99,
            stock: 30,
            category: 'Electronics',
            createdAt: '2025-10-05T16:45:00Z',
            updatedAt: '2025-10-05T16:45:00Z',
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
          },
          {
            id: 6,
            name: 'Headphones Pro',
            description: 'Premium noise-cancelling headphones',
            price: 299.99,
            stock: 20,
            category: 'Audio',
            createdAt: '2025-10-06T13:30:00Z',
            updatedAt: '2025-10-06T13:30:00Z',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
          },
          {
            id: 7,
            name: 'Smart Watch',
            description: 'Feature-rich smartwatch',
            price: 399.99,
            stock: 35,
            category: 'Wearables',
            createdAt: '2025-10-07T10:15:00Z',
            updatedAt: '2025-10-07T10:15:00Z',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
          },
          {
            id: 8,
            name: 'Camera Pro',
            description: 'Professional DSLR camera',
            price: 1499.99,
            stock: 10,
            category: 'Photography',
            createdAt: '2025-10-08T08:00:00Z',
            updatedAt: '2025-10-08T08:00:00Z',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400'
          }
        ]
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch products'
        throw err
      } finally {
        this.loading = false
      }
    },

    async addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true
      this.error = null

      try {
        await new Promise(resolve => setTimeout(resolve, 800))

        const newProduct: Product = {
          ...productData,
          id: this.products.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        this.products.unshift(newProduct)
        return newProduct
      } catch (err: any) {
        this.error = err.message || 'Failed to add product'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id: number, productData: Partial<Product>) {
      this.loading = true
      this.error = null

      try {
        await new Promise(resolve => setTimeout(resolve, 800))

        const index = this.products.findIndex(p => p.id === id)
        if (index === -1) {
          throw new Error('Product not found')
        }

        this.products[index] = {
          ...this.products[index],
          ...productData,
          updatedAt: new Date().toISOString()
        }

        return this.products[index]
      } catch (err: any) {
        this.error = err.message || 'Failed to update product'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id: number) {
      this.loading = true
      this.error = null

      try {
        await new Promise(resolve => setTimeout(resolve, 800))

        const index = this.products.findIndex(p => p.id === id)
        if (index === -1) {
          throw new Error('Product not found')
        }

        this.products.splice(index, 1)
      } catch (err: any) {
        this.error = err.message || 'Failed to delete product'
        throw err
      } finally {
        this.loading = false
      }
    },

    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },

    setSelectedProduct(product: Product | null) {
      this.selectedProduct = product
    }
  }
})