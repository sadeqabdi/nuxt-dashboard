export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  activeProjects: number
  completedTasks: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: number
  userId: number
  userName: string
  userEmail: string
  userAvatar?: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  shippingAddress?: string
  notes?: string
}

