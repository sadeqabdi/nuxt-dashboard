/**
 * Dashboard Composable
 * Handles fetching and managing dashboard statistics and chart data
 */

export interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  userGrowth: number
  orderGrowth: number
  revenueGrowth: number
}

export interface OrderTrend {
  date: string
  orders: number
}

/**
 * Composable for dashboard data management
 * @returns Dashboard state and methods
 */
export const useDashboard = () => {
  const stats = ref<DashboardStats | null>(null)
  const orderTrends = ref<OrderTrend[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Simulate API call to fetch dashboard statistics
   */
  const fetchStats = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock data - in production, this would be an API call
      stats.value = {
        totalUsers: 1254,
        totalOrders: 3842,
        totalRevenue: 89250,
        userGrowth: 12.5,
        orderGrowth: 8.3,
        revenueGrowth: 15.7
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch dashboard stats'
      console.error('Error fetching stats:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Simulate API call to fetch order trends for the last 7 days
   */
  const fetchOrderTrends = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // Generate mock data for the last 7 days
      const trends: OrderTrend[] = []
      const today = new Date()

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        trends.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          orders: Math.floor(Math.random() * 100) + 50 // Random orders between 50-150
        })
      }

      orderTrends.value = trends
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch order trends'
      console.error('Error fetching trends:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch all dashboard data
   */
  const fetchAllData = async (): Promise<void> => {
    await Promise.all([
      fetchStats(),
      fetchOrderTrends()
    ])
  }

  /**
   * Refresh dashboard data
   */
  const refresh = async (): Promise<void> => {
    await fetchAllData()
  }

  return {
    // State
    stats: readonly(stats),
    orderTrends: readonly(orderTrends),
    loading: readonly(loading),
    error: readonly(error),

    // Methods
    fetchStats,
    fetchOrderTrends,
    fetchAllData,
    refresh
  }
}

