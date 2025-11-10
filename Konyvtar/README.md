# 📚 Könyvtár Kezelő Alkalmazás

Vue 3 alapú egyoldalas alkalmazás (SPA) könyvek kezeléséhez CRUD műveletekkel (listázás, létrehozás, törlés).

## 🎯 Projekt célja

Egy egyszerű könyvtár kezelő rendszer, ahol:
- **Listázhatók** a könyvek
- **Új könyv** adható hozzá
- **Törlés** funkció elérhető

## 📋 Adatmodell

A könyvek 4 mezővel rendelkeznek:
- **title** (string): A könyv címe
- **author** (string): A szerző neve  
- **year** (number): Kiadás éve
- **genre** (string): Műfaj

## 🛠️ Technológiák

### Frontend
- **Vue 3** - JavaScript keretrendszer
- **Vue Router** - Navigáció és route kezelés
- **Pinia** - Állapotkezelés (state management)
- **FormKit** - Űrlapok kezelése validációval
- **Axios** - HTTP kliens a backend kommunikációhoz
- **Tailwind CSS** - Stílusok

### Backend
- **json-server** - REST API mock szerver
- Docker konténerizáció

## 📁 Projekt struktúra

```
vue-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.vue          # Navigációs fejléc
│   │   ├── views/
│   │   │   └── books/
│   │   │       ├── List.vue        # Könyvek listázása
│   │   │       └── New.vue         # Új könyv űrlap
│   │   ├── stores/
│   │   │   └── BooksStore.js       # Pinia store - REST műveletek
│   │   ├── utils/
│   │   │   └── http.js             # Központi axios konfiguráció
│   │   ├── router.js               # Vue Router konfiguráció
│   │   ├── App.vue                 # Főkomponens
│   │   └── main.js                 # Alkalmazás belépési pont
│   └── vite.config.js              # Vite konfiguráció (@views alias)
├── json-server/
│   └── data/
│       └── db.json                 # JSON adatbázis
└── proxy/
    └── conf.d/
        └── frotnend.conf           # Nginx proxy (/api route)
```

## 🚀 Indítás

### 1. Docker konténerek indítása

```bash
cd vue-app
./start.sh
```

Ez elindítja:
- **frontend** konténer - Vite dev szerver (port: 5173)
- **jsonserver** konténer - json-server API (port: 3000)
- **proxy** konténer - Nginx reverse proxy (port: 80)

### 2. Alkalmazás elérése

Nyisd meg a böngészőben: `http://frontend.vm1.test`

## 📖 Használat

### Könyvek listázása
- Navigálj a **"📖 Könyvek listája"** menüpontra
- A táblázat megjeleníti az összes könyvet
- Minden könyvnél van egy **🗑️ Törlés** gomb

### Új könyv hozzáadása
- Navigálj a **"➕ Új könyv"** menüpontra
- Töltsd ki az űrlapot:
  - **Könyv címe** (kötelező, szöveg)
  - **Szerző** (kötelező, szöveg)
  - **Kiadás éve** (kötelező, szám, 1000-2100 között)
  - **Műfaj** (kötelező, legördülő lista)
- Kattints a **💾 Könyv mentése** gombra
- Sikeres mentés után visszairányít a listára

### Könyv törlése
- A listában kattints a **🗑️ Törlés** gombra
- Erősítsd meg a törlést
- A könyv eltűnik a listából

## 🔧 Implementáció részletei

### HTTP Kliens (axios)

**Fájl:** `src/utils/http.js`

```javascript
import axios from 'axios';

const http = axios.create({
  baseURL: '/api',  // Proxy átirányítja a json-server-hez
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default http;
```

**Hogyan működik:**
- Központi axios példány létrehozása
- `baseURL: '/api'` - minden kérés ezt az előtagot kapja
- A Nginx proxy `/api/*` kéréseket átirányítja a `json-server:3000`-re

### Pinia Store

**Fájl:** `src/stores/BooksStore.js`

```javascript
import { defineStore } from 'pinia';
import { ref } from 'vue';
import http from '@utils/http.js';

export const useBooksStore = defineStore('books', () => {
  // Állapotok
  const books = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Műveletek
  async function loadBooks() { ... }
  async function createBook(book) { ... }
  async function deleteBook(id) { ... }

  return { books, isLoading, error, loadBooks, createBook, deleteBook };
});
```

**Hogyan működik:**
- `defineStore`: Pinia store létrehozása Composition API módszerrel
- `ref()`: reaktív változók (automatikusan frissítik a komponenseket)
- `loadBooks()`: GET /api/books - könyvek betöltése
- `createBook()`: POST /api/books - új könyv létrehozása
- `deleteBook()`: DELETE /api/books/:id - könyv törlése

### Vue Router

**Fájl:** `src/router.js`

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/books' },
    { path: '/books', component: BooksList },
    { path: '/books/new', component: BooksNew },
  ],
});
```

**Hogyan működik:**
- `createWebHistory()`: HTML5 History API - tiszta URL-ek # nélkül
- Route-ok definiálása: URL path ↔ Vue komponens kapcsolat
- `redirect`: automatikus átirányítás a gyökérről a `/books`-ra

### Header Komponens

**Fájl:** `src/components/Header.vue`

```vue
<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <RouterLink to="/books">📖 Könyvek listája</RouterLink>
    <RouterLink to="/books/new">➕ Új könyv</RouterLink>
  </header>
</template>
```

**Hogyan működik:**
- `RouterLink`: Vue Router által biztosított komponens
- `to="/books"`: a cél útvonal
- Automatikusan hozzáadja a `router-link-active` osztályt az aktív linkhez
- SPA módon navigál (nem tölti újra az oldalt)

### Lista Nézet

**Fájl:** `src/views/books/List.vue`

```vue
<script setup>
import { onMounted } from 'vue';
import { useBooksStore } from '@/stores/BooksStore.js';

const booksStore = useBooksStore();

// Komponens betöltésekor lekérjük a könyveket
onMounted(async () => {
  await booksStore.loadBooks();
});

async function handleDelete(id) {
  if (confirm('Biztosan törölni szeretnéd?')) {
    await booksStore.deleteBook(id);
  }
}
</script>

<template>
  <!-- Töltés állapot -->
  <div v-if="booksStore.isLoading">Betöltés...</div>
  
  <!-- Hiba állapot -->
  <div v-else-if="booksStore.error">{{ booksStore.error }}</div>
  
  <!-- Könyvek táblázat -->
  <table v-else>
    <tr v-for="book in booksStore.books" :key="book.id">
      <td>{{ book.title }}</td>
      <td>{{ book.author }}</td>
      <td>{{ book.year }}</td>
      <td>{{ book.genre }}</td>
      <td>
        <button @click="handleDelete(book.id)">Törlés</button>
      </td>
    </tr>
  </table>
</template>
```

**Hogyan működik:**
- `onMounted`: lifecycle hook - komponens betöltésekor fut
- `useBooksStore()`: store példány lekérése
- `v-if/v-else-if/v-else`: feltételes renderelés
- `v-for`: ciklus a könyvek tömbön
- `:key`: egyedi azonosító (Vue követelmény)
- `@click`: eseménykezelő

### Új Könyv Űrlap

**Fájl:** `src/views/books/New.vue`

```vue
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBooksStore } from '@/stores/BooksStore.js';

const router = useRouter();
const booksStore = useBooksStore();

const formData = ref({
  title: '',
  author: '',
  year: null,
  genre: ''
});

async function submitForm(data) {
  await booksStore.createBook(data);
  router.push('/books');  // Átirányítás a listára
}
</script>

<template>
  <FormKit type="form" @submit="submitForm" v-model="formData">
    <FormKit type="text" name="title" label="Cím" validation="required" />
    <FormKit type="text" name="author" label="Szerző" validation="required" />
    <FormKit type="number" name="year" label="Év" validation="required|number|min:1000|max:2100" />
    <FormKit type="select" name="genre" label="Műfaj" validation="required" :options="[...]" />
  </FormKit>
</template>
```

**Hogyan működik:**
- `FormKit`: űrlap könyvtár komponensek
- `v-model`: kétirányú adatkötés
- `validation`: validációs szabályok (required, number, min, max)
- `@submit`: űrlap beküldése után fut le
- `router.push()`: programmatikus navigáció

### App.vue (Főkomponens)

**Fájl:** `src/App.vue`

```vue
<script setup>
import Header from '@/components/Header.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>
```

**Hogyan működik:**
- `Header`: minden oldalon megjelenik
- `RouterView`: a route-oknak megfelelő komponens jelenik meg itt
- URL változásakor a `RouterView` automatikusan lecseréli a komponenst

### main.js (Belépési pont)

**Fájl:** `src/main.js`

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { createPinia } from 'pinia'
import { plugin as FormKitPlugin, defaultConfig } from '@formkit/vue'

const app = createApp(App)

app.use(createPinia())      // Pinia - állapotkezelés
app.use(router)              // Vue Router - navigáció
app.use(FormKitPlugin, defaultConfig)  // FormKit - űrlapok

app.mount('#app-root')
```

**Hogyan működik:**
- `createApp()`: Vue alkalmazás példány létrehozása
- `.use()`: plugin-ok regisztrálása
- `.mount()`: alkalmazás csatolása a DOM-hoz

## 🌐 Proxy Konfiguráció

**Fájl:** `proxy/conf.d/frotnend.conf`

```nginx
server {
    server_name frontend.vm1.test;
    listen 80;

    # API proxy - átirányítás a json-server-hez
    location /api/ {
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://jsonserver:3000/;
    }

    # Frontend proxy
    location / {
        proxy_pass http://frontend:5173/;
    }
}
```

**Hogyan működik:**
- `/api/*` kérések → `json-server:3000`
- `rewrite`: levágja az `/api` előtagot
- Minden más kérés → `frontend:5173` (Vite)

## ✅ Elfogadási kritériumok

- [x] Header komponens megjelenik minden oldalon navigációval
- [x] `/books` listázza a könyveket táblázatban
- [x] `/books/new` új könyvet vesz fel FormKit űrlappal
- [x] Mentés után visszairányít a listára
- [x] Törlés működik, lista automatikusan frissül
- [x] Minden adat a json-server db.json-ból töltődik és oda mentődik

## 🐛 Hibakeresés

### Frontend nem érhető el
```bash
docker logs vue-app-frontend-1
```

### API nem működik
```bash
docker logs vue-app-jsonserver-1
curl http://localhost/api/books
```

### Proxy hibák
```bash
docker logs vue-app-proxy-1
docker compose restart proxy
```

## 📝 Megjegyzések

- A FormKit Tailwind 3-at vár, de 4 van telepítve - ez csak figyelmeztetés, működik
- A json-server custom wrapper-t használ: `{ data: {...} }` formátumú válaszok
- Az alias-ok (@, @views, @utils) a `vite.config.js`-ben vannak definiálva
