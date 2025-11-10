/**
 * Pinia Store a könyvek kezeléséhez
 * 
 * Ez a store felelős a könyvek állapotkezeléséért és a backend kommunikációért.
 * 
 * Állapotok (state):
 * - books: tömb, amely tartalmazza az összes könyvet
 * - isLoading: boolean, jelzi, hogy folyamatban van-e egy API kérés
 * - error: string vagy null, hibaüzenet tárolása
 * 
 * Műveletek (actions):
 * - loadBooks(): GET kérés az összes könyv lekéréséhez
 * - createBook(book): POST kérés új könyv létrehozásához
 * - deleteBook(id): DELETE kérés könyv törléséhez
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import http from '@utils/http.js';

export const useBooksStore = defineStore('books', () => {
  // === ÁLLAPOTOK (STATE) ===
  
  // A könyvek listája - kezdetben üres tömb
  const books = ref([]);
  
  // Jelzi, hogy folyamatban van-e API hívás (töltés állapot)
  const isLoading = ref(false);
  
  // Hibaüzenet tárolása - null, ha nincs hiba
  const error = ref(null);

  // === MŰVELETEK (ACTIONS) ===

  /**
   * Könyvek betöltése a szerverről
   * GET /api/books
   */
  async function loadBooks() {
    // Töltés állapot beállítása
    isLoading.value = true;
    error.value = null;

    try {
      // HTTP GET kérés a /api/books endpointra
      const response = await http.get('/books');
      
      // A válasz adatainak eltárolása a state-ben
      // A json-server wrapper miatt a válasz { data: [...] } formátumú
      books.value = response.data.data || response.data;
    } catch (err) {
      // Hiba esetén az error state-be mentjük a hibaüzenetet
      error.value = err.message || 'Hiba történt a könyvek betöltése során';
      console.error('Könyvek betöltési hiba:', err);
    } finally {
      // Töltés állapot kikapcsolása (akár sikeres, akár sikertelen volt a kérés)
      isLoading.value = false;
    }
  }

  /**
   * Új könyv létrehozása
   * POST /api/books
   * 
   * @param {Object} book - Az új könyv adatai (title, author, year, genre)
   * @returns {Object} A létrehozott könyv objektum
   */
  async function createBook(book) {
    isLoading.value = true;
    error.value = null;

    try {
      // HTTP POST kérés új könyv létrehozásához
      const response = await http.post('/books', book);
      
      // A json-server wrapper miatt a válasz { data: {...} } formátumú
      const newBook = response.data.data || response.data;
      
      // Az új könyvet hozzáadjuk a lokális books tömbhöz
      // (így nem kell újra lekérni az összes könyvet)
      books.value.push(newBook);
      
      return newBook;
    } catch (err) {
      error.value = err.message || 'Hiba történt a könyv létrehozása során';
      console.error('Könyv létrehozási hiba:', err);
      throw err; // Továbbadjuk a hibát, hogy a komponens is reagálhasson rá
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Könyv törlése
   * DELETE /api/books/:id
   * 
   * @param {number} id - A törlendő könyv azonosítója
   */
  async function deleteBook(id) {
    isLoading.value = true;
    error.value = null;

    try {
      // HTTP DELETE kérés a könyv törléséhez
      await http.delete(`/books/${id}`);
      
      // A törölt könyvet eltávolítjuk a lokális books tömbből
      // filter: csak azokat tartjuk meg, amelyek id-ja különbözik a törölt id-tól
      books.value = books.value.filter(book => book.id !== id);
    } catch (err) {
      error.value = err.message || 'Hiba történt a könyv törlése során';
      console.error('Könyv törlési hiba:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Exportáljuk az állapotokat és műveleteket
  return {
    // States
    books,
    isLoading,
    error,
    
    // Actions
    loadBooks,
    createBook,
    deleteBook,
  };
});
