<!--
  Főkomponens (App.vue)
  
  Ez az alkalmazás gyökér komponense, amely minden oldalon megjelenik.
  
  Tartalmazza:
  - Header komponens: navigációs menü
  - RouterView: a route-oknak megfelelő komponensek megjelenítése
  
  A RouterView dinamikusan cseréli a tartalmat az URL alapján,
  anélkül, hogy újratöltené az oldalt (SPA - Single Page Application).
-->

<script setup>
// Header komponens importálása
import Header from '@/components/Header.vue';

// RouterView importálása - ez jeleníti meg az aktuális route komponenst
import { RouterView } from 'vue-router';
</script>

<template>
  <!-- 
    Alkalmazás konténer
    
    min-h-screen: minimum magasság az egész képernyő
    bg-gray-100: világosszürke háttér
  -->
  <div class="min-h-screen bg-gray-100">
    <!-- 
      Header komponens
      
      Ez minden oldalon megjelenik, és tartalmazza a navigációt.
      A komponens egyszer van definiálva, és automatikusan frissül,
      ha változik az aktív route.
    -->
    <Header />

    <!-- 
      RouterView komponens
      
      Ez a "slot", ahol a route-oknak megfelelő komponensek jelennek meg.
      
      Példák:
      - Ha az URL /books, akkor a List.vue komponens jelenik meg itt
      - Ha az URL /books/new, akkor a New.vue komponens jelenik meg itt
      
      A váltás animált lehet (transition használatával), de most
      egyszerűen csak lecseréljük a komponenst.
    -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/**
 * Scoped stílusok
 * 
 * Itt nincs szükség extra CSS-re, a Tailwind osztályok
 * elegendőek a megfelelő elrendezéshez.
 */
</style>
