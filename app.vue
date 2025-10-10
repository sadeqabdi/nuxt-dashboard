<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Global UI Components -->
    <Toast />
    <Loader />
  </div>
</template>

<script setup lang="ts">
import Toast from './components/ui/Toast.vue'
import Loader from './components/ui/Loader.vue'
</script>
