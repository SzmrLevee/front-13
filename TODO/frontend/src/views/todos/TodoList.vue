<script setup>
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todosStore.js'

const todosStore = useTodosStore()
const newTodoText = ref('')

async function addTodo() {
  const text = newTodoText.value.trim()
  if (text !== '') {
    await todosStore.addTodo(text)
    newTodoText.value = ''
  }
}

async function handleToggle(todo) {
  await todosStore.toggleTodo(todo)
}
</script>

<template>
  <div class="flex flex-col items-center p-6 w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">TODO</h1>

    <!-- Betöltés jelző -->
    <div v-if="todosStore.isLoading" class="text-gray-600 mb-4 text-sm">
      Betöltés...
    </div>

    <!-- Hibaüzenet -->
    <div v-if="todosStore.error" class="text-red-600 mb-4 text-sm">
      Hiba: {{ todosStore.error }}
    </div>

    <input
      v-model="newTodoText"
      type="text"
      @keydown.enter="addTodo"
      placeholder="Új feladat hozzáadása..."
      class="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded text-black focus:outline-none focus:border-blue-500"
      :disabled="todosStore.isLoading"
    />

    <ul class="w-full space-y-2">
      <li
        v-for="todo in todosStore.todos"
        :key="todo.id"
        class="flex items-center bg-gray-50 p-3 rounded border border-gray-200"
      >
        <label class="flex items-center space-x-3 flex-1 cursor-pointer">
          <input
            type="checkbox"
            :checked="todo.done"
            @change="handleToggle(todo)"
            class="w-5 h-5 accent-blue-500"
            :disabled="todosStore.isLoading"
          />
          <span
            :class="{ 'line-through text-gray-400': todo.done }"
            class="text-gray-800"
          >
            {{ todo.text }}
          </span>
        </label>
      </li>
    </ul>

    <button
      @click="todosStore.deleteDoneTodos()"
      :disabled="todosStore.isLoading"
      class="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Kész feladatok törlése
    </button>
  </div>
</template>
