import { defineStore } from "pinia"
import { ref } from 'vue'
import http from '../utils/http'

export const useTodosStore = defineStore("todos", () => {
    const todos = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    async function loadTodos() {
        isLoading.value = true
        error.value = null
        
        try {
            const response = await http.get('/todos')
            todos.value = response.data.data
        } catch (err) {
            error.value = err.message
            console.error('Todos betöltési hiba:', err)
        } finally {
            isLoading.value = false
        }
    }

    async function addTodo(text) {
        if (!text.trim()) return
        
        isLoading.value = true
        error.value = null
        
        try {
            const response = await http.post('/todos', {
                text: text.trim(),
                done: false
            })
            todos.value.push(response.data.data)
        } catch (err) {
            error.value = err.message
            console.error('Todo hozzáadási hiba:', err)
        } finally {
            isLoading.value = false
        }
    }

    async function toggleTodo(todo) {
        isLoading.value = true
        error.value = null
        
        try {
            const response = await http.patch(`/todos/${todo.id}`, {
                done: !todo.done
            })
            const index = todos.value.findIndex(t => t.id === todo.id)
            if (index !== -1) {
                todos.value[index] = response.data.data
            }
        } catch (err) {
            error.value = err.message
            console.error('Todo módosítási hiba:', err)
        } finally {
            isLoading.value = false
        }
    }

    async function deleteDoneTodos() {
        isLoading.value = true
        error.value = null
        
        try {
            const doneTodos = todos.value.filter(todo => todo.done)
            
            for (const todo of doneTodos) {
                await http.delete(`/todos/${todo.id}`)
            }
            
            todos.value = todos.value.filter(todo => !todo.done)
        } catch (err) {
            error.value = err.message
            console.error('Todos törlési hiba:', err)
        } finally {
            isLoading.value = false
        }
    }

    loadTodos()
    
    return { 
        todos, 
        isLoading, 
        error, 
        loadTodos, 
        addTodo, 
        toggleTodo, 
        deleteDoneTodos 
    } 
})
