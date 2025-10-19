<script setup>
import { onMounted, ref } from 'vue';
import NavBar from '@components/NavBar.vue';
import BaseForm from '@components/BaseForm.vue';
import BaseCard from '@components/BaseCard.vue';
import { api } from '@utils/http';

const posts = ref([]);

async function fetchPosts() {
  try {
    const response = await api.get('/posts');
    posts.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function handleNewPost(postData) {
  try {
    await api.post('/posts', postData);
    await fetchPosts();
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => await fetchPosts());
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main class="container mx-auto max-w-5xl p-6 flex flex-col gap-6">
    <BaseForm @add-post="handleNewPost" />

    <div class="grid md:grid-cols-2 gap-4">
      <BaseCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </main>
</template>
