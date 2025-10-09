<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ value }}</p>
        <p v-if="change" class="text-sm mt-2" :class="changeClass">
          <span>{{ changePrefix }}{{ Math.abs(change) }}%</span>
          <span class="text-gray-600 dark:text-gray-400 ml-1">vs last period</span>
        </p>
      </div>
      <div
        class="p-3 rounded-full"
        :class="`bg-${color}-100 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400`"
      >
        <component :is="icon" class="h-8 w-8" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

interface Props {
  title: string
  value: string | number
  icon?: any
  color?: string
  change?: number
}

const props = withDefaults(defineProps<Props>(), {
  icon: ChartBarIcon,
  color: 'primary'
})

const changeClass = computed(() => {
  if (!props.change) return ''
  return props.change >= 0 ? 'text-green-600' : 'text-red-600'
})

const changePrefix = computed(() => {
  if (!props.change) return ''
  return props.change >= 0 ? '+' : '-'
})
</script>

