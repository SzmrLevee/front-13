<template>
  <main class="flex flex-col gap-8 p-8 bg-neutral-200 min-h-screen">
    <div class="flex flex-col gap-6 rounded-lg bg-blue-200 p-6 items-center">
      <input
        type="range"
        min="-40"
        max="120"
        class="bg-white w-full border rounded-lg border-neutral-200 h-10 py-2 px-3"
        v-model="temperature"
      />

      <div class="text-2xl font-medium">{{ temperature }} °C</div>
    </div>

    <div class="w-full text-center text-5xl">
      <h1 v-if="temperature < 0" class="bg-white text-black p-12 rounded-lg">Fagyott</h1>
      <h1
        v-if="temperature >= 0 && temperature < 100"
        class="bg-blue-600 text-white p-12 rounded-lg"
      >
        Folyékony
      </h1>
      <h1 v-if="temperature >= 100" class="bg-red-600 text-white p-12 rounded-lg">Forr</h1>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const temperature = ref(0);
</script>
