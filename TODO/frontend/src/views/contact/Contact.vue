<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)

function handleSubmit(event) {
  event.preventDefault()
  // Itt később lehet valós backend hívás
  console.log('Kapcsolatfelvétel adatok:', formData.value)
  submitted.value = true
  
  // Űrlap törlése
  setTimeout(() => {
    formData.value = {
      name: '',
      email: '',
      message: ''
    }
    submitted.value = false
  }, 3000)
}
</script>

<template>
  <div class="flex flex-col items-center p-6 w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Kapcsolatfelvétel</h1>

    <div v-if="submitted" class="w-full mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      Köszönjük az üzenetet! Hamarosan felvesszük veled a kapcsolatot.
    </div>

    <form @submit="handleSubmit" class="w-full space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Név *
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="w-full p-3 bg-gray-50 border border-gray-300 rounded text-black focus:outline-none focus:border-blue-500"
          placeholder="Add meg a neved"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full p-3 bg-gray-50 border border-gray-300 rounded text-black focus:outline-none focus:border-blue-500"
          placeholder="Add meg az email címed"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
          Üzenet *
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="6"
          required
          class="w-full p-3 bg-gray-50 border border-gray-300 rounded text-black focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Írd le, miben segíthetünk..."
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors font-medium"
      >
        Üzenet küldése
      </button>
    </form>
  </div>
</template>
