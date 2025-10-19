<script setup>
import { reactive, defineEmits } from 'vue';

const emits = defineEmits(['add-post']);
const formData = reactive({
  creator: '',
  title: '',
  date: '',
  content: '',
});

function handleSubmit() {
  emits('add-post', { ...formData });

  formData.creator = '';
  formData.title = '';
  formData.date = '';
  formData.content = '';
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="p-6 rounded-lg bg-blue-300">
    <div class="grid md:grid-cols-3 gap-4 text-sm">
      <div class="flex flex-col gap-1">
        <label for="creator">Név</label>
        <input
          type="text"
          id="creator"
          v-model="formData.creator"
          class="w-full px-3 py-2 rounded bg-white"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="title">Cím</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          class="w-full px-3 py-2 rounded bg-white"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="date">Dátum</label>
        <input
          type="text"
          id="date"
          placeholder="éééé. hh. nn."
          v-model="formData.date"
          class="w-full px-3 py-2 rounded bg-white"
        />
      </div>

      <div class="flex flex-col gap-1 col-span-2">
        <label for="content">Bejegyzés</label>
        <input
          type="text"
          id="content"
          v-model="formData.content"
          class="w-full px-3 py-2 rounded bg-white"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 rounded-lg text-white hover:bg-blue-700 cursor-pointer transition-colors"
      >
        Közzététel
      </button>
    </div>
  </form>
</template>
