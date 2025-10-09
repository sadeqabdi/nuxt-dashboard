<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {{ authStore.user?.name }}!</p>
    </div>

    <!-- Stats Grid -->
    <div v-if="!dashboardStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Total Users"
        :value="dashboardStore.stats?.totalUsers || 0"
        :icon="UserGroupIcon"
        color="blue"
        :change="12.5"
      />
      <StatCard
        title="Total Revenue"
        :value="`$${dashboardStore.stats?.totalRevenue?.toLocaleString() || 0}`"
        :icon="CurrencyDollarIcon"
        color="green"
        :change="8.2"
      />
      <StatCard
        title="Active Projects"
        :value="dashboardStore.stats?.activeProjects || 0"
        :icon="FolderIcon"
        color="purple"
        :change="-3.1"
      />
      <StatCard
        title="Completed Tasks"
        :value="dashboardStore.stats?.completedTasks || 0"
        :icon="CheckCircleIcon"
        color="orange"
        :change="15.3"
      />
    </div>

    <!-- Loading State -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div v-for="i in 4" :key="i" class="card h-32 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardChart
        title="Revenue Overview"
        :data="revenueChartData"
        type="line"
      />
      <DashboardChart
        title="User Distribution"
        :data="userChartData"
        type="doughnut"
      />
      <DashboardChart
        title="Monthly Sales"
        :data="salesChartData"
        type="bar"
      />
      <DashboardChart
        title="Traffic Sources"
        :data="trafficChartData"
        type="pie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  FolderIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const themeStore = useThemeStore()

// Fetch dashboard stats
onMounted(async () => {
  await dashboardStore.fetchStats()
})

// Chart colors based on theme
const chartColors = computed(() => {
  const isDark = themeStore.isDark
  return {
    primary: isDark ? '#60a5fa' : '#3b82f6',
    secondary: isDark ? '#a78bfa' : '#8b5cf6',
    success: isDark ? '#34d399' : '#10b981',
    warning: isDark ? '#fbbf24' : '#f59e0b',
    danger: isDark ? '#f87171' : '#ef4444'
  }
})

const revenueChartData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: chartColors.value.primary,
      backgroundColor: chartColors.value.primary + '20',
      tension: 0.4
    }
  ]
}))

const userChartData = computed(() => ({
  labels: ['Active', 'Inactive', 'New'],
  datasets: [
    {
      data: [450, 180, 120],
      backgroundColor: [
        chartColors.value.primary,
        chartColors.value.warning,
        chartColors.value.success
      ]
    }
  ]
}))

const salesChartData = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 90],
      backgroundColor: chartColors.value.secondary
    }
  ]
}))

const trafficChartData = computed(() => ({
  labels: ['Direct', 'Organic', 'Social', 'Referral'],
  datasets: [
    {
      data: [300, 150, 100, 80],
      backgroundColor: [
        chartColors.value.primary,
        chartColors.value.success,
        chartColors.value.warning,
        chartColors.value.danger
      ]
    }
  ]
}))
</script>

