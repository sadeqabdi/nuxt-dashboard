<template>
  <div class="card">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{{ title }}</h3>
    <div class="relative h-64">
      <canvas ref="chartCanvas"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import type { ChartData } from '~/types'

Chart.register(...registerables)

interface Props {
  title: string
  data: ChartData
  type?: 'line' | 'bar' | 'doughnut' | 'pie'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'line'
})

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null
const themeStore = useThemeStore()

const createChart = () => {
  if (!chartCanvas.value) return

  const isDark = themeStore.isDark

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: props.type,
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: isDark ? '#e5e7eb' : '#374151'
          }
        }
      },
      scales:
        props.type === 'doughnut' || props.type === 'pie'
          ? undefined
          : {
              y: {
                ticks: {
                  color: isDark ? '#9ca3af' : '#6b7280'
                },
                grid: {
                  color: isDark ? '#374151' : '#e5e7eb'
                }
              },
              x: {
                ticks: {
                  color: isDark ? '#9ca3af' : '#6b7280'
                },
                grid: {
                  color: isDark ? '#374151' : '#e5e7eb'
                }
              }
            }
    }
  })
}

watch(
  () => themeStore.isDark,
  () => {
    createChart()
  }
)

watch(
  () => props.data,
  () => {
    createChart()
  },
  { deep: true }
)

onMounted(() => {
  createChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

