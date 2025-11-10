<!--
  Új könyv hozzáadása nézet
  
  Ez az oldal egy űrlapot jelenít meg új könyv hozzáadásához.
  A FormKit könyvtárat használjuk az űrlap kezelésére.
  
  Funkciók:
  - Űrlap megjelenítése 4 mezővel (title, author, year, genre)
  - Validáció (kötelező mezők, típusok)
  - Adatok küldése a store-on keresztül a backend-re
  - Sikeres mentés után átirányítás a listára
-->

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBooksStore } from '@/stores/BooksStore.js';

// === COMPOSABLES ===

// Router példány - az átirányításhoz szükséges
const router = useRouter();

// Store példány - a könyv létrehozásához
const booksStore = useBooksStore();

// === STATE ===

// Űrlap adatai - kezdeti üres objektum
const formData = ref({
  title: '',
  author: '',
  year: null,
  genre: ''
});

// Mentés folyamatban állapot
const isSaving = ref(false);

// === MŰVELETEK ===

/**
 * Űrlap elküldése
 * 
 * Ez a függvény fut le, amikor a felhasználó beküldi az űrlapot.
 * A FormKit automatikusan meghívja ezt a függvényt validáció után.
 * 
 * @param {Object} data - Az űrlap adatai (FormKit automatikusan átadja)
 */
async function submitForm(data) {
  // Mentés állapot beállítása (gomb letiltásához)
  isSaving.value = true;

  try {
    // Store createBook metódusának meghívása
    // Ez elküldi a POST kérést a backend-nek
    await booksStore.createBook(data);

    // Sikeres mentés esetén visszairányítás a könyvek listájára
    // A push metódus programmatikusan navigál egy másik route-ra
    router.push('/books');
  } catch (error) {
    // Hiba esetén jelezzük a felhasználónak
    alert('Hiba történt a könyv mentése során!');
    console.error('Mentési hiba:', error);
  } finally {
    // Mentés állapot visszaállítása
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Oldal címe -->
    <h2 class="text-3xl font-bold mb-6 text-gray-800">➕ Új könyv hozzáadása</h2>

    <!-- Űrlap konténer -->
    <div class="max-w-2xl bg-white shadow-md rounded-lg p-6">
      <!--
        FormKit Form komponens
        
        A FormKit egy Vue 3 űrlap könyvtár, amely egyszerűsíti az űrlapok kezelését.
        
        @submit: esemény, ami lefut, amikor az űrlapot beküldjük
        v-model: kétirányú adatkötés - az űrlap mezők és a formData objektum között
        
        Főbb előnyök:
        - Automatikus validáció
        - Hibaüzenetek kezelése
        - Konzisztens megjelenés
      -->
      <FormKit 
        type="form" 
        @submit="submitForm"
        v-model="formData"
        submit-label="Könyv mentése"
      >
        <!--
          FormKit Input mezők
          
          Minden mező egy FormKit komponens, amely tartalmazza:
          - label: a mező címkéje
          - name: a mező neve (ez lesz a kulcs a formData objektumban)
          - type: a mező típusa (text, number, stb.)
          - validation: validációs szabályok
          - help: segítő szöveg a mező alatt
        -->

        <!-- Cím mező (szöveges, kötelező) -->
        <FormKit
          type="text"
          name="title"
          label="Könyv címe"
          validation="required"
          validation-visibility="blur"
          help="Add meg a könyv teljes címét"
          placeholder="pl. Az önző gén"
        />

        <!-- Szerző mező (szöveges, kötelező) -->
        <FormKit
          type="text"
          name="author"
          label="Szerző"
          validation="required"
          validation-visibility="blur"
          help="A könyv szerzőjének neve"
          placeholder="pl. Richard Dawkins"
        />

        <!-- Kiadás éve mező (szám, kötelező) -->
        <!--
          validation="required|number|min:1000|max:2100"
          
          Validációs szabályok:
          - required: kötelező mező
          - number: csak számok
          - min:1000: minimum érték 1000
          - max:2100: maximum érték 2100
        -->
        <FormKit
          type="number"
          name="year"
          label="Kiadás éve"
          validation="required|number|min:1000|max:2100"
          validation-visibility="blur"
          help="A könyv első kiadásának éve"
          placeholder="pl. 1976"
        />

        <!-- Műfaj mező (legördülő lista, kötelező) -->
        <!--
          type="select": legördülő menü
          :options: lehetőségek tömbje
          
          A FormKit select mezőnél az options lehet:
          - Egyszerű string tömb: ['Fantasy', 'Disztópia']
          - Objektumok tömbje: [{ value: 'fantasy', label: 'Fantasy' }]
        -->
        <FormKit
          type="select"
          name="genre"
          label="Műfaj"
          validation="required"
          validation-visibility="blur"
          help="Válaszd ki a könyv műfaját"
          :options="[
            'Fantasy',
            'Sci-Fi',
            'Disztópia',
            'Krimi',
            'Romantikus',
            'Thriller',
            'Horror',
            'Történelmi',
            'Tudományos',
            'Életrajz'
          ]"
          placeholder="Válassz műfajt..."
        />

        <!--
          A submit gomb automatikusan hozzáadódik a FormKit form-hoz
          a submit-label attribútum alapján.
          
          Ha mentés folyamatban van (isSaving), akkor letiltjuk a gombot
          egy v-if direktívával megjelenített töltés üzenettel.
        -->
        <template #submit>
          <button
            type="submit"
            :disabled="isSaving"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="isSaving">⏳ Mentés folyamatban...</span>
            <span v-else>💾 Könyv mentése</span>
          </button>
        </template>
      </FormKit>

      <!-- Mégse gomb - visszairányít a listára mentés nélkül -->
      <div class="mt-4">
        <button
          @click="router.push('/books')"
          class="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
        >
          ❌ Mégse
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/**
 * FormKit alapértelmezett stílusai
 * 
 * A FormKit saját CSS-t használ, amit be kell tölteni.
 * Ezt a main.js-ben tesszük meg a FormKit plugin beállításánál.
 * 
 * Itt csak extra, komponens-specifikus stílusokat adnánk hozzá.
 */
</style>
