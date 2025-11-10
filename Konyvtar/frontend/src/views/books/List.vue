<!--
  Könyvek listázása nézet
  
  Ez az oldal megjeleníti az összes könyvet egy táblázatban,
  és lehetőséget ad a könyvek törlésére.
  
  Funkciók:
  - Könyvek betöltése az oldal megnyitásakor (onMounted)
  - Könyvek megjelenítése táblázatban
  - Törlés gomb minden könyvnél
  - Töltés és hiba állapotok kezelése
-->

<script setup>
import { onMounted } from 'vue';
import { useBooksStore } from '@/stores/BooksStore.js';

// === STORE HASZNÁLATA ===

// A Pinia store példány lekérése
// Ez tartalmazza az összes könyvet és a hozzájuk tartozó műveleteket
const booksStore = useBooksStore();

// === LIFECYCLE HOOKS ===

/**
 * onMounted: Vue lifecycle hook
 * 
 * Ez a függvény akkor fut le, amikor a komponens már be van illesztve a DOM-ba.
 * Ideális hely az adatok betöltésére az oldal megnyitásakor.
 */
onMounted(async () => {
  // Könyvek betöltése a szerverről
  await booksStore.loadBooks();
});

// === MŰVELETEK ===

/**
 * Könyv törlése
 * 
 * @param {number} id - A törlendő könyv azonosítója
 */
async function handleDelete(id) {
  // Megerősítés kérése a felhasználótól törlés előtt
  if (confirm('Biztosan törölni szeretnéd ezt a könyvet?')) {
    try {
      // Store deleteBook metódusának meghívása
      await booksStore.deleteBook(id);
      
      // A store automatikusan frissíti a books listát,
      // így a törölt könyv eltűnik a táblázatból
    } catch (error) {
      // Hiba kezelése (a store már logolja, itt csak jelezzük a usernek)
      alert('Hiba történt a könyv törlése során!');
    }
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Oldal címe -->
    <h2 class="text-3xl font-bold mb-6 text-gray-800">📚 Könyvek listája</h2>

    <!-- TÖLTÉS ÁLLAPOT -->
    <!-- 
      Ha isLoading true, akkor egy töltés üzenet jelenik meg
      A v-if direktíva feltételesen rendereli az elemet
    -->
    <div v-if="booksStore.isLoading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">Könyvek betöltése...</p>
    </div>

    <!-- HIBA ÁLLAPOT -->
    <!--
      Ha van hiba (error nem null), akkor egy piros hibaüzenet jelenik meg
      v-else-if: csak akkor fut le, ha az előző v-if false volt
    -->
    <div v-else-if="booksStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p class="font-bold">Hiba!</p>
      <p>{{ booksStore.error }}</p>
    </div>

    <!-- KÖNYVEK TÁBLÁZAT -->
    <!--
      Ha nincs töltés és nincs hiba, akkor a táblázat jelenik meg
      v-else: ha az összes előző feltétel false
    -->
    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Ha nincs könyv, jelezzük -->
      <div v-if="booksStore.books.length === 0" class="p-8 text-center text-gray-500">
        <p class="text-xl">📭 Még nincsenek könyvek az adatbázisban.</p>
        <p class="mt-2">Adj hozzá egyet az "Új könyv" menüpontban!</p>
      </div>

      <!-- Ha vannak könyvek, táblázatban megjelenítjük -->
      <table v-else class="min-w-full divide-y divide-gray-200">
        <!-- Táblázat fejléc -->
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cím
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Szerző
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kiadás éve
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Műfaj
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Műveletek
            </th>
          </tr>
        </thead>

        <!-- Táblázat törzs -->
        <tbody class="bg-white divide-y divide-gray-200">
          <!--
            v-for: ciklus a könyvek tömbön
            :key: egyedi azonosító minden sorhoz (Vue követelmény)
            
            Minden könyvhöz létrehoz egy <tr> sort
          -->
          <tr v-for="book in booksStore.books" :key="book.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ book.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ book.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ book.author }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ book.year }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {{ book.genre }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <!--
                Törlés gomb
                @click: eseménykezelő - handleDelete függvényt hívja meg a könyv id-jával
              -->
              <button
                @click="handleDelete(book.id)"
                class="text-red-600 hover:text-red-900 transition-colors font-medium"
              >
                🗑️ Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/**
 * Scoped stílusok
 * 
 * Itt akár egyedi CSS-t is írhatnánk, de a Tailwind osztályok
 * elegendőek a megfelelő megjelenéshez.
 */
</style>
