<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <div class="flex items-center justify-center">
      <RouterView />
    </div>
  </div>
</template>