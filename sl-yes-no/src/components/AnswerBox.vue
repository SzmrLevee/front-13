<template>
  <section>
    <h2
      class="font-bold p-6 text-2xl text-center text-white rounded mb-2"
      :class="{
        'bg-green-500': answer === 'yes',
        'bg-red-500': answer === 'no',
      }"
    >
      {{ answer }}
    </h2>
    <img
      class="w-full border-4"
      :class="{
        'border-green-500': answer === 'yes',
        'border-red-500': answer === 'no',
      }"
      :src="image"
    />
  </section>
</template>

<script setup>
const { answer, image } = defineProps({
  answer: String,
  image: String,
});
</script>
