<template>
  <main class="flex flex-col gap-8 p-8">
    <div class="flex flex-col gap-6 rounded-lg bg-blue-200 p-6 items-center">
      <input
        type="text"
        class="bg-white w-full border rounded-lg border-neutral-200 h-10 py-2 px-3"
        v-model="item"
        @keydown.enter="addItem"
      />

      <button
        class="bg-green-600 text-white px-4 py-2 rounded-lg w-fit cursor-pointer hover:bg-green-700"
        @click="getRandom"
      >
        Randomot kérek!
      </button>
    </div>

    <div>
      <h3
        v-for="(i, index) in items"
        :key="index"
        class="rounded-lg p-4 border border-neutral-200"
        :style="{ backgroundColor: getRandomRGB() }"
        v-show="random === index"
      >
        {{ i }}
      </h3>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([]);
const item = ref('');
const random = ref(-1);

function addItem() {
  if (!item.value) return;

  items.value.push(item.value);
  item.value = '';
}

function getRandom() {
  if (items.value.length === 0) return;

  random.value = Math.floor(Math.random() * items.value.length);
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r} ${g} ${b})`;
}
</script>
