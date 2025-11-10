<script setup>
import { ref, watch } from 'vue'
import { useProfileStore } from '@/stores/ProfileStore'

const profileStore = useProfileStore()

const formData = ref({
  name: '',
  email: '',
  bio: ''
})

watch(
  () => profileStore.profile,
  (newProfile) => {
    formData.value = { ...newProfile }
  },
  { immediate: true }
)

function handleSubmit(event) {
  event.preventDefault()
  profileStore.updateProfile(formData.value)
}
</script>

<template>
  <div class="flex flex-col items-center p-6 w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Profil</h1>

    <div v-if="profileStore.isLoading" class="text-gray-600 mb-4">
      Betöltés...
    </div>

    <div v-if="profileStore.error" class="text-red-600 mb-4">
      Hiba: {{ profileStore.error }}
    </div>

    <form @submit="handleSubmit" class="w-full space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Név
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="w-full p-3 bg-gray-50 border border-gray-300 rounded text-black focus:outline-none focus:border-blue-500"
          placeholder="Add meg a neved"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full p-3 bg-gray-50 border border-gray-300 rounded text-black focus:outline-none focus:border-blue-500"
          placeholder="Add meg az email címed"
        />
      </div>

      <div>
        <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">
          Bemutatkozás
        </label>
        <textarea
          id="bio"
          v-model="formData.bio"
          rows="4"
          class="w-full p-3 bg-gray-50 border border-gray-300 rounded text-black focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Írj magadról néhány sort..."
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="profileStore.isLoading"
        class="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
      >
        {{ profileStore.isLoading ? 'Mentés...' : 'Mentés' }}
      </button>
    </form>
  </div>
</template>
