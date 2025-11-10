/**
 * Alkalmazás belépési pont (main.js)
 * 
 * Ez a fájl inicializálja a Vue alkalmazást és regisztrálja
 * a szükséges plugin-okat és könyvtárakat.
 * 
 * Regisztrált plugin-ok:
 * - Vue Router: navigáció és route kezelés
 * - Pinia: állapotkezelés (state management)
 * - FormKit: űrlapok kezelése
 */

// Stílusok importálása
import "@assets/style.css"

// Vue core importálása
import { createApp } from 'vue'

// Főkomponens importálása
import App from "./App.vue"

// === PLUGIN IMPORTOK ===

// Router importálása (src/router.js-ből)
import router from './router.js'

// Pinia importálása (állapotkezelés)
import { createPinia } from 'pinia'

// FormKit importálása (űrlapok)
import { plugin as FormKitPlugin, defaultConfig } from '@formkit/vue'

// === ALKALMAZÁS LÉTREHOZÁSA ===

// Vue app példány létrehozása
const app = createApp(App)

// === PLUGIN-OK REGISZTRÁLÁSA ===

/**
 * Pinia regisztrálása
 * 
 * A Pinia a Vue 3 hivatalos állapotkezelő könyvtára.
 * Store-okat hozunk létre vele, amelyek központi helyen tárolják
 * az alkalmazás állapotát.
 */
app.use(createPinia())

/**
 * Vue Router regisztrálása
 * 
 * A router lehetővé teszi, hogy többoldalas alkalmazást építsünk
 * SPA (Single Page Application) formában - az oldal nem töltődik újra
 * navigáció közben.
 */
app.use(router)

/**
 * FormKit regisztrálása
 * 
 * A FormKit egyszerűsíti az űrlapok kezelését Vue-ban.
 * Beépített validációval, hibaüzenetekkel és stílusokkal rendelkezik.
 * 
 * defaultConfig: alapértelmezett FormKit konfiguráció
 * - témák, nyelvek, validációs szabályok
 */
app.use(FormKitPlugin, defaultConfig)

// === ALKALMAZÁS MOUNT-OLÁSA ===

/**
 * Az alkalmazás csatolása a DOM-hoz
 * 
 * Az #app-root elem a public/index.html fájlban található.
 * Ide kerül be a teljes Vue alkalmazás.
 */
app.mount('#app-root')
