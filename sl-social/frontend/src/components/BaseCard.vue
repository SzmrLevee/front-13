<script setup>
import { format } from 'date-fns';
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="border-2 border-blue-400 rounded-lg flex flex-col gap-4 justify-between overflow-hidden h-full"
  >
    <div class="p-4 flex flex-col gap-2">
      <h3 class="text-xl">{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>

    <div class="flex gap-2 justify-between bg-blue-400 px-4 py-2 text-white">
      <span class="font-bold">{{ post.creator }}</span>
      <span>{{ format(new Date(post.date), 'yyyy-MM-dd') }}</span>
    </div>
  </div>
</template>
