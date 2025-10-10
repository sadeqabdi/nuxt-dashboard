<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back, {{ authStore.user?.name }}!
        </p>
      </div>
      <button
        :disabled="loading"
        class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        @click="handleRefresh"
      >
        <svg 
          class="w-4 h-4" 
          :class="{ 'animate-spin': loading }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
      </button>
    </div>

    <!-- Error State -->
    <div 
      v-if="error" 
      class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <p class="text-sm text-red-800 dark:text-red-400">{{ error }}</p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div v-if="!loading && stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <DashboardStatCard
        title="Total Users"
        :value="stats.totalUsers"
        :growth="stats.userGrowth"
        :icon="UserGroupIcon"
        color="blue"
      />
      <DashboardStatCard
        title="Total Orders"
        :value="stats.totalOrders"
        :growth="stats.orderGrowth"
        :icon="ShoppingBagIcon"
        color="purple"
      />
      <DashboardStatCard
        title="Total Revenue"
        :value="stats.totalRevenue"
        :growth="stats.revenueGrowth"
        :icon="CurrencyDollarIcon"
        color="green"
        prefix="$"
      />
    </div>

    <!-- Loading State for Stats -->
    <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div 
        v-for="i in 3" 
        :key="i" 
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-32 animate-pulse"
      >
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"/>
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"/>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"/>
      </div>
    </div>

    <!-- Order Trends Chart -->
    <div v-if="!loading && orderTrends.length > 0" class="mb-6">
      <OrderTrendsChart :data="orderTrends" @refresh="handleRefresh" />
    </div>

    <!-- Loading State for Chart -->
    <div 
      v-else-if="loading" 
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-96 animate-pulse mb-6"
    >
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"/>
      <div class="h-full bg-gray-200 dark:bg-gray-700 rounded"/>
    </div>

    <!-- Additional Info Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div class="space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
            <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">New order received</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ i }} hour{{ i > 1 ? 's' : '' }} ago</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Stats
        </h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Average Order Value</span>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">$124.50</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</span>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">3.2%</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">892</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Pending Orders</span>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">23</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { useDashboard } from '../composables/useDashboard'
import { useToast } from '../composables/useToast'
import { useLoader } from '../composables/useLoader'
import OrderTrendsChart from '../components/OrderTrendsChart.vue'

definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
const { error: showError, success } = useToast()
const loader = useLoader()

// Use the dashboard composable
const { stats, orderTrends, loading, error, fetchAllData } = useDashboard()

// Watch loading state and show/hide loader
watch(loading, (isLoading) => {
  if (isLoading) {
    loader.show('Loading dashboard data...')
  } else {
    loader.hide()
  }
})

// Watch error state and show toast
watch(error, (err) => {
  if (err) {
    showError(err, 'Dashboard Error')
  }
})

// Fetch data on mount
onMounted(async () => {
  await fetchAllData()
})

// Handle refresh
const handleRefresh = async () => {
  await fetchAllData()
  if (!error.value) {
    success('Dashboard refreshed successfully')
  }
}
</script>

