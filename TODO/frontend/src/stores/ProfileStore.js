import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '../utils/http'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref({
    name: '',
    email: '',
    bio: ''
  })
  const isLoading = ref(false)
  const error = ref(null)

  async function loadProfile() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await http.get('/profile')
      profile.value = response.data.data
    } catch (err) {
      error.value = err.message
      console.error('Profil betöltési hiba:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(updatedData) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await http.patch('/profile', updatedData)
      profile.value = response.data.data
    } catch (err) {
      error.value = err.message
      console.error('Profil mentési hiba:', err)
    } finally {
      isLoading.value = false
    }
  }
  
  loadProfile()
 
  return {
    profile,
    isLoading,
    error,
    loadProfile,
    updateProfile
  }
})
