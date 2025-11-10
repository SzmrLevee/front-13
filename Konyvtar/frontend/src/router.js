/**
 * Vue Router konfiguráció
 * 
 * Ez a fájl definiálja az alkalmazás útvonalait (route-okat).
 * 
 * Útvonalak:
 * - / (gyökér): átirányít a /books útvonalra (könyvek listája)
 * - /books: könyvek listázása (List.vue)
 * - /books/new: új könyv hozzáadása (New.vue)
 * 
 * A router history módban működik (HTML5 History API),
 * így nincs # jel az URL-ekben.
 */

import { createRouter, createWebHistory } from 'vue-router';

// Route-ok importálása - @views alias használata
// Az @views az src/views mappára mutat (vite.config.js-ben van definiálva)
import BooksList from '@views/books/List.vue';
import BooksNew from '@views/books/New.vue';

// Router példány létrehozása
const router = createRouter({
  // History mód használata - tiszta URL-ek # nélkül
  history: createWebHistory(),
  
  // Útvonalak (routes) definíciója
  routes: [
    {
      // Gyökér útvonal - átirányít a könyvek listájára
      path: '/',
      redirect: '/books'
    },
    {
      // Könyvek listázása
      path: '/books',
      name: 'books-list',
      component: BooksList,
    },
    {
      // Új könyv hozzáadása
      path: '/books/new',
      name: 'books-new',
      component: BooksNew,
    },
  ],
});

// Router exportálása, hogy a main.js-ben használhassuk
export default router;
