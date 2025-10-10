<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {{ title }}
        </p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ formattedValue }}
        </h3>
        <div class="flex items-center">
          <span 
            class="inline-flex items-center text-sm font-semibold"
            :class="growthClass"
          >
            <svg 
              v-if="growth > 0" 
              class="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <svg 
              v-else 
              class="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {{ Math.abs(growth) }}%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
            vs last month
          </span>
        </div>
      </div>
      <div :class="iconBgClass" class="p-3 rounded-lg">
        <component :is="icon" :class="iconColorClass" class="w-8 h-8" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  title: string
  value: number | string
  growth: number
  icon: Component
  color?: 'blue' | 'green' | 'purple' | 'orange'
  prefix?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  prefix: ''
})

const formattedValue = computed(() => {
  if (typeof props.value === 'string') {
    return props.value
  }
  
  if (props.prefix === '$') {
    return `$${props.value.toLocaleString()}`
  }
  
  return props.value.toLocaleString()
})

const growthClass = computed(() => {
  return props.growth > 0 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400'
})

const iconBgClass = computed(() => {
  const classes = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    green: 'bg-green-50 dark:bg-green-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    orange: 'bg-orange-50 dark:bg-orange-900/20'
  }
  return classes[props.color]
})

const iconColorClass = computed(() => {
  const classes = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400'
  }
  return classes[props.color]
})
</script>

