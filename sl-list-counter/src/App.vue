<template>
  <main class="flex flex-col gap-8 p-8">
    <div class="rounded-lg bg-blue-200 p-6">
      <input
        type="text"
        class="bg-white w-full border rounded-lg border-neutral-200 h-10 py-2 px-3"
        placeholder="Új elem..."
        v-model="item"
        @keydown.ctrl.enter="insertFront"
        @keydown.alt.enter="insertBack"
      />
    </div>

    <div class="rounded-lg bg-yellow-100 p-6 flex flex-col gap-2 text-center">
      <h3 class="text-2xl">{{ items.length }} elem van a listában</h3>
      <h5 class="text-xl">Legutóbb {{ where }} lett elem beszúrva</h5>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(i, index) in items"
        :key="index"
        class="bg-white rounded-lg p-4 border border-neutral-200"
      >
        {{ i }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([]);
const item = ref('');
const where = ref('nem');

function insertFront() {
  if (!item.value) return;

  items.value.unshift(item.value);
  item.value = '';
  where.value = 'előre';
}

function insertBack() {
  if (!item.value) return;

  items.value.push(item.value);
  item.value = '';
  where.value = 'hátulra';
}
</script>
