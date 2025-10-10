<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Order Trends
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Last 7 days
        </p>
      </div>
      <button
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Refresh data"
        @click="$emit('refresh')"
      >
        <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <div class="relative h-80">
      <canvas ref="chartCanvas"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'

import type { OrderTrend } from '../composables/useDashboard'

// Register Chart.js components
Chart.register(...registerables)

interface Props {
  data: readonly OrderTrend[] | OrderTrend[]
}

const props = defineProps<Props>()
defineEmits(['refresh'])

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const themeStore = useThemeStore()

// Chart colors based on theme
const chartColors = computed(() => {
  const isDark = themeStore.isDark
  return {
    borderColor: isDark ? '#60a5fa' : '#3b82f6',
    backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
    gridColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    textColor: isDark ? '#e5e7eb' : '#374151'
  }
})

const createChart = () => {
  if (!chartCanvas.value) return

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map(d => d.date),
      datasets: [
        {
          label: 'Orders',
          data: props.data.map(d => d.orders),
          borderColor: chartColors.value.borderColor,
          backgroundColor: chartColors.value.backgroundColor,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: chartColors.value.borderColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: themeStore.isDark ? '#1f2937' : '#ffffff',
          titleColor: themeStore.isDark ? '#f3f4f6' : '#111827',
          bodyColor: themeStore.isDark ? '#e5e7eb' : '#374151',
          borderColor: themeStore.isDark ? '#374151' : '#e5e7eb',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} orders`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: chartColors.value.gridColor,
            drawBorder: false
          },
          ticks: {
            color: chartColors.value.textColor,
            font: {
              size: 12
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: chartColors.value.gridColor,
            drawBorder: false
          },
          ticks: {
            color: chartColors.value.textColor,
            font: {
              size: 12
            },
            callback: function(value) {
              return value.toString()
            }
          }
        }
      }
    }
  })
}

// Watch for data changes
watch(() => props.data, () => {
  createChart()
}, { deep: true })

// Watch for theme changes
watch(() => themeStore.isDark, () => {
  createChart()
})

// Create chart on mount
onMounted(() => {
  createChart()
})

// Cleanup on unmount
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

