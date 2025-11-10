<!--
  Header komponens navigációval
  
  Ez a komponens a fejléc részt jeleníti meg az alkalmazásban,
  amely minden oldalon megjelenik.
  
  Tartalmazza:
  - Az alkalmazás címét/nevét
  - Navigációs linkeket a különböző oldalakra
  
  A RouterLink komponens használata:
  - Automatikusan hozzáad egy 'router-link-active' CSS osztályt az aktív linkhez
  - SPA módon navigál (nem tölti újra az oldalt)
-->

<script setup>
// A RouterLink komponenst a vue-router-ből importáljuk
// Ez a komponens felelős a navigációért az alkalmazásban
import { RouterLink } from 'vue-router';
</script>

<template>
  <!-- Fejléc konténer - Tailwind CSS osztályokkal stilizálva -->
  <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Alkalmazás címe/logó -->
        <h1 class="text-2xl font-bold">
          📚 Könyvtár Kezelő
        </h1>

        <!-- Navigációs menü -->
        <nav class="flex gap-4">
          <!-- 
            RouterLink: Vue Router által biztosított komponens
            - to="/books": a cél útvonal
            - aktív link automatikusan megkapja a 'router-link-active' osztályt
          -->
          <RouterLink
            to="/books"
            class="px-4 py-2 rounded-lg transition-all hover:bg-white hover:text-blue-600 font-medium"
            active-class="bg-white text-blue-600"
          >
            📖 Könyvek listája
          </RouterLink>

          <RouterLink
            to="/books/new"
            class="px-4 py-2 rounded-lg transition-all hover:bg-white hover:text-blue-600 font-medium"
            active-class="bg-white text-blue-600"
          >
            ➕ Új könyv
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/**
 * Scoped stílusok
 * 
 * A 'scoped' attribútum miatt ezek a stílusok csak erre a komponensre vonatkoznak.
 * Vue automatikusan hozzáad egy egyedi attribútumot a komponens elemeihez.
 */

/* Nincs szükség további CSS-re, a Tailwind osztályok elég szépek */
</style>
