<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Detailed analytics and insights</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardChart
        title="Website Traffic"
        :data="trafficData"
        type="line"
      />
      <DashboardChart
        title="Page Views by Device"
        :data="deviceData"
        type="doughnut"
      />
      <DashboardChart
        title="User Engagement"
        :data="engagementData"
        type="bar"
      />
      <DashboardChart
        title="Conversion Rate"
        :data="conversionData"
        type="line"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const themeStore = useThemeStore()

const chartColors = computed(() => {
  const isDark = themeStore.isDark
  return {
    primary: isDark ? '#60a5fa' : '#3b82f6',
    secondary: isDark ? '#a78bfa' : '#8b5cf6',
    success: isDark ? '#34d399' : '#10b981',
    warning: isDark ? '#fbbf24' : '#f59e0b'
  }
})

const trafficData = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Visitors',
      data: [1200, 1900, 1500, 2500, 2200, 3000, 2800],
      borderColor: chartColors.value.primary,
      backgroundColor: chartColors.value.primary + '20',
      tension: 0.4
    }
  ]
}))

const deviceData = computed(() => ({
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [450, 380, 120],
      backgroundColor: [
        chartColors.value.primary,
        chartColors.value.secondary,
        chartColors.value.success
      ]
    }
  ]
}))

const engagementData = computed(() => ({
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Engagement Score',
      data: [75, 82, 68, 90],
      backgroundColor: chartColors.value.success
    }
  ]
}))

const conversionData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Conversion %',
      data: [2.5, 3.2, 2.8, 3.5, 4.1, 3.8],
      borderColor: chartColors.value.warning,
      backgroundColor: chartColors.value.warning + '20',
      tension: 0.4
    }
  ]
}))
</script>

