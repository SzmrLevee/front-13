<script setup>
import { reactive, defineEmits } from 'vue';

const emits = defineEmits(['modify-rectangle']);

const formData = reactive({
  width: '',
  height: '',
});

const handleSubmit = () => emits('modify-rectangle', { ...formData });
</script>

<template>
  <form @submit.prevent="handleSubmit" class="p-6 rounded-lg bg-green-300">
    <div class="grid md:grid-cols-2 gap-4 text-sm">
      <div class="flex flex-col gap-1">
        <label for="width">Szélesség</label>
        <input
          type="number"
          id="width"
          v-model="formData.width"
          class="w-full px-3 py-2 rounded bg-white"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="height">Magasság</label>
        <input
          type="number"
          id="height"
          v-model="formData.height"
          class="w-full px-3 py-2 rounded bg-white"
        />
      </div>

      <button
        type="submit"
        class="bg-green-600 w-fit px-6 py-3 rounded-lg text-white hover:bg-green-700 cursor-pointer transition-colors"
      >
        Módosítás
      </button>
    </div>
  </form>
</template>
