<template>
  <nav class="bg-blue-600 dark:bg-blue-800 text-white">
    <div class="flex justify-between p-3 flex-wrap dark:border-none">
      <RouterLink to="/" class="flex items-center space-x-3">
        <span class="self-center text-2xl font-semibold dark:text-white">Bluu</span>
      </RouterLink>
      <button class="block md:hidden" @click="toggleMenu">
        <svg
          class="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="w-full md:block md:w-auto" :class="{ hidden: !menuOpen }"></div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>
