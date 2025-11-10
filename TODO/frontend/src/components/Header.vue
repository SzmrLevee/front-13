<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-white shadow-md mb-8">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex justify-center space-x-8">
        <RouterLink 
          to="/todos" 
          class="text-gray-600 hover:text-blue-500 font-medium transition-colors px-4 py-2 rounded"
          active-class="text-blue-600 bg-blue-50 font-semibold"
        >
          Tennivalók
        </RouterLink>
        <RouterLink 
          to="/profile" 
          class="text-gray-600 hover:text-blue-500 font-medium transition-colors px-4 py-2 rounded"
          active-class="text-blue-600 bg-blue-50 font-semibold"
        >
          Profil
        </RouterLink>
        <RouterLink 
          to="/contact" 
          class="text-gray-600 hover:text-blue-500 font-medium transition-colors px-4 py-2 rounded"
          active-class="text-blue-600 bg-blue-50 font-semibold"
        >
          Kapcsolat
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
