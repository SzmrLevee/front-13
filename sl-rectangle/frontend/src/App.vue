<script setup>
import { ref, computed } from 'vue';
import BaseForm from './components/BaseForm.vue';

const rectangle = ref({
  width: 200,
  height: 100,
});

const perimeter = computed(() => 2 * (rectangle.value.width + rectangle.value.height));
const area = computed(() => rectangle.value.width * rectangle.value.height);

function modifyRectangle(newRect) {
  rectangle.value.width = Number(newRect.width);
  rectangle.value.height = Number(newRect.height);
  rectangle.value.backgroundColor = getRandomRGB();
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r} ${g} ${b})`;
}
</script>

<template>
  <main class="container mx-auto max-w-5xl p-6 flex flex-col gap-6">
    <h1 class="text-2xl">Téglalap kerület, terület</h1>

    <BaseForm @modify-rectangle="modifyRectangle" />

    <div
      class="p-6 mx-auto bg-blue-200 grid place-items-center"
      :style="{
        width: `${rectangle.width}px`,
        height: `${rectangle.height}px`,
        backgroundColor: rectangle.backgroundColor,
      }"
    >
      <div class="flex flex-col gap-1">
        <p>Kerület: {{ perimeter }}</p>
        <p>Terület: {{ area }}</p>
      </div>
    </div>
  </main>
</template>
