import { defineStore } from 'pinia'
import type { User } from '~/types'

export interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  totalUsers: number
}

/**
 * Users Store
 * Manages user data with CRUD operations
 */
export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 10,
    totalUsers: 0
  }),

  getters: {
    /**
     * Get filtered users based on search query
     */
    filteredUsers: (state) => {
      if (!state.searchQuery) {
        return state.users
      }
      
      const query = state.searchQuery.toLowerCase()
      return state.users.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      )
    },

    /**
     * Get paginated users
     */
    paginatedUsers(): User[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    },

    /**
     * Get total pages
     */
    totalPages(): number {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },

    /**
     * Check if there are users
     */
    hasUsers: (state) => state.users.length > 0,

    /**
     * Get user by ID
     */
    getUserById: (state) => (id: number) => {
      return state.users.find(user => user.id === id)
    }
  },

  actions: {
    /**
     * Fetch all users (mock API)
     */
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock data - in production, this would be an API call
        this.users = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff'
          },
          {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=10b981&color=fff'
          },
          {
            id: 4,
            name: 'Alice Williams',
            email: 'alice@example.com',
            role: 'guest',
            avatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=f59e0b&color=fff'
          },
          {
            id: 5,
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=ef4444&color=fff'
          },
          {
            id: 6,
            name: 'Diana Prince',
            email: 'diana@example.com',
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=06b6d4&color=fff'
          },
          {
            id: 7,
            name: 'Evan Davis',
            email: 'evan@example.com',
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=Evan+Davis&background=f97316&color=fff'
          },
          {
            id: 8,
            name: 'Fiona Green',
            email: 'fiona@example.com',
            role: 'guest',
            avatar: 'https://ui-avatars.com/api/?name=Fiona+Green&background=84cc16&color=fff'
          },
          {
            id: 9,
            name: 'sadeq abdi',
            email: 'sadeq@example.com',
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=sadeq+abdi&background=10b981&color=fff'
          },
          {
            id: 10,
            name: 'shoaib manager',
            email: 'shoaib@example.com',
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=sadeq+abdi&background=10b981&color=fff'
          },
          {
            id: 11,
            name: 'saber valimohammadi',
            email: 'saber@example.com',
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=sadeq+abdi&background=10b981&color=fff'
          }
        ]

        this.totalUsers = this.users.length
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch users'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Add a new user
     */
    async addUser(userData: Omit<User, 'id'>) {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // Generate new ID
        const newId = Math.max(...this.users.map(u => u.id), 0) + 1

        // Create new user
        const newUser: User = {
          ...userData,
          id: newId,
          avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random&color=fff`
        }

        // Add to users array
        this.users.push(newUser)
        this.totalUsers = this.users.length

        return newUser
      } catch (err: any) {
        this.error = err.message || 'Failed to add user'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Update an existing user
     */
    async updateUser(id: number, userData: Partial<User>) {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        const index = this.users.findIndex(u => u.id === id)
        if (index === -1) {
          throw new Error('User not found')
        }

        // Update user
        this.users[index] = {
          ...this.users[index],
          ...userData,
          id // Ensure ID doesn't change
        }

        return this.users[index]
      } catch (err: any) {
        this.error = err.message || 'Failed to update user'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Delete a user
     */
    async deleteUser(id: number) {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600))

        const index = this.users.findIndex(u => u.id === id)
        if (index === -1) {
          throw new Error('User not found')
        }

        // Remove user
        this.users.splice(index, 1)
        this.totalUsers = this.users.length

        // Adjust current page if needed
        if (this.paginatedUsers.length === 0 && this.currentPage > 1) {
          this.currentPage--
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to delete user'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Set search query
     */
    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1 // Reset to first page when searching
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
     * Reset pagination
     */
    resetPagination() {
      this.currentPage = 1
      this.searchQuery = ''
    }
  }
})

