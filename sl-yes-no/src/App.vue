<template>
  <header class="bg-[#1f2937] text-white font-bold text-4xl text-center py-8">
    <h1>Mi a kérdésed, halandó?</h1>
  </header>
  <main class="container mx-auto mt-6 flex flex-col gap-6">
    <section class="bg-[#1f2937] p-8 rounded">
      <form>
        <input
          type="text"
          class="text-black bg-white rounded block w-full p-1"
          v-model="question"
        />
      </form>
    </section>

    <AnswerBox v-if="answer" :answer="answer" :image="image" />
  </main>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import AnswerBox from './components/AnswerBox.vue';

const question = ref('');
const answer = ref(null);
const image = ref(null);

watch(question, async (question) => {
  if (!question.includes('?')) {
    answer.value = null;
    image.value = null;
    return;
  }

  const data = await axios.get('https://yesno.wtf/api').then((response) => response.data);

  answer.value = data.answer;
  image.value = data.image;
});
</script>
