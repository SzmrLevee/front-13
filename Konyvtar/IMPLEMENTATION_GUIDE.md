# Könyvtár Kezelő Alkalmazás - Megvalósítási Útmutató

## 📚 Mi lett elkészítve?

Egy teljes Vue 3 alapú CRUD alkalmazás könyvek kezeléséhez, amely tartalmazza:
- Könyvek listázását táblázatban
- Új könyv hozzáadását FormKit űrlappal
- Könyvek törlését megerősítéssel

---

## 🎯 1. Témaválasztás és Adatmodell

**Választott téma:** Könyvek kezelése

**Adatmodell (4 mező):**
- `title` (string) - Könyv címe
- `author` (string) - Szerző neve
- `year` (number) - Kiadás éve ⭐ (nem szöveges)
- `genre` (string) - Műfaj

**Erőforrás neve:** `books`

---

## 📂 2. Projekt Struktúra és Alias-ok

### Létrehozott mappák és fájlok:

```
frontend/src/
├── components/
│   └── Header.vue              ✅ Navigációs fejléc
├── views/
│   └── books/
│       ├── List.vue            ✅ Könyvek listázása
│       └── New.vue             ✅ Új könyv űrlap
├── stores/
│   └── BooksStore.js           ✅ Pinia store
├── utils/
│   └── http.js                 ✅ Axios konfiguráció
├── router.js                   ✅ Route-ok
├── App.vue                     ✅ Főkomponens
└── main.js                     ✅ Belépési pont
```

### Alias beállítások (vite.config.js):

```javascript
resolve: {
    alias: {
        '@': './src',
        '@views': './src/views',    // ⭐ Új alias
        '@utils': './src/utils',
        '@assets': './src/assets'
    }
}
```

**Használat:**
```javascript
import BooksList from '@views/books/List.vue';
import http from '@utils/http.js';
```

---

## 🗄️ 3. json-server Beállítás

### db.json (json-server/data/db.json):

```json
{
  "books": [
    {
      "id": 1,
      "title": "Az önző gén",
      "author": "Richard Dawkins",
      "year": 1976,
      "genre": "Tudományos"
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell",
      "year": 1949,
      "genre": "Disztópia"
    },
    {
      "id": 3,
      "title": "A hatalom gyűrűi",
      "author": "J.R.R. Tolkien",
      "year": 1954,
      "genre": "Fantasy"
    }
  ]
}
```

**Ellenőrzés:**
```bash
curl http://localhost/api/books
```

---

## 🌐 4. HTTP Kliens (axios)

### Telepítés (package.json):

```json
{
  "dependencies": {
    "axios": "^1.7.9",
    "vue-router": "^4.5.0",
    "@formkit/vue": "^1.6.9",
    ...
  }
}
```

### Központi axios példány (src/utils/http.js):

```javascript
import axios from 'axios';

const http = axios.create({
  baseURL: '/api',              // ⭐ Proxy átirányítja json-server-hez
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default http;
```

**Hogyan működik:**
1. `http.get('/books')` → `/api/books` kérés
2. Nginx proxy `/api/*` → `json-server:3000/*`
3. json-server válaszol

---

## 💾 5. Pinia Store (src/stores/BooksStore.js)

### Állapotok (State):

```javascript
const books = ref([]);          // Könyvek tömbje
const isLoading = ref(false);   // Töltés állapot
const error = ref(null);        // Hibaüzenet
```

### Műveletek (Actions):

#### 1️⃣ loadBooks() - GET kérés

```javascript
async function loadBooks() {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await http.get('/books');
    // ⭐ json-server wrapper: { data: [...] }
    books.value = response.data.data || response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
```

#### 2️⃣ createBook(book) - POST kérés

```javascript
async function createBook(book) {
  isLoading.value = true;
  
  try {
    const response = await http.post('/books', book);
    const newBook = response.data.data || response.data;
    
    // ⭐ Lokális state frissítése
    books.value.push(newBook);
    
    return newBook;
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    isLoading.value = false;
  }
}
```

#### 3️⃣ deleteBook(id) - DELETE kérés

```javascript
async function deleteBook(id) {
  isLoading.value = true;
  
  try {
    await http.delete(`/books/${id}`);
    
    // ⭐ Törölt elem eltávolítása a lokális state-ből
    books.value = books.value.filter(book => book.id !== id);
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    isLoading.value = false;
  }
}
```

---

## 🛤️ 6. Vue Router (src/router.js)

### Route-ok:

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),  // ⭐ Tiszta URL-ek # nélkül
  
  routes: [
    // Gyökér → átirányítás
    {
      path: '/',
      redirect: '/books'
    },
    
    // Könyvek listája
    {
      path: '/books',
      name: 'books-list',
      component: BooksList,
    },
    
    // Új könyv
    {
      path: '/books/new',
      name: 'books-new',
      component: BooksNew,
    },
  ],
});
```

**URL-ek:**
- `http://frontend.vm1.test/` → `/books`
- `http://frontend.vm1.test/books` → Lista
- `http://frontend.vm1.test/books/new` → Új könyv

---

## 🎨 7. Header Komponens (src/components/Header.vue)

```vue
<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
    <div class="container mx-auto px-4 py-4">
      <h1 class="text-2xl font-bold">📚 Könyvtár Kezelő</h1>
      
      <nav class="flex gap-4">
        <!-- ⭐ RouterLink - SPA navigáció -->
        <RouterLink 
          to="/books" 
          active-class="bg-white text-blue-600"
        >
          📖 Könyvek listája
        </RouterLink>
        
        <RouterLink 
          to="/books/new"
          active-class="bg-white text-blue-600"
        >
          ➕ Új könyv
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
```

**Hogyan működik:**
- `RouterLink`: automatikusan hozzáadja `router-link-active` osztályt
- `active-class`: egyedi CSS osztály az aktív linkhez
- SPA: nem tölti újra az oldalt navigáláskor

---

## 📋 8. FormKit Űrlap (src/views/books/New.vue)

### Script rész:

```javascript
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
  router.push('/books');  // ⭐ Átirányítás a listára
}
```

### Template rész:

```vue
<template>
  <FormKit 
    type="form" 
    @submit="submitForm"
    v-model="formData"
  >
    <!-- Cím -->
    <FormKit
      type="text"
      name="title"
      label="Könyv címe"
      validation="required"
    />

    <!-- Szerző -->
    <FormKit
      type="text"
      name="author"
      label="Szerző"
      validation="required"
    />

    <!-- Év (⭐ szám típus) -->
    <FormKit
      type="number"
      name="year"
      label="Kiadás éve"
      validation="required|number|min:1000|max:2100"
    />

    <!-- Műfaj -->
    <FormKit
      type="select"
      name="genre"
      label="Műfaj"
      validation="required"
      :options="['Fantasy', 'Sci-Fi', 'Disztópia', ...]"
    />
  </FormKit>
</template>
```

**FormKit előnyei:**
- Automatikus validáció
- Hibaüzenetek kezelése
- Kétirányú adatkötés (v-model)
- Beépített stílusok

---

## 📊 9. Lista Nézet (src/views/books/List.vue)

### Script rész:

```javascript
import { onMounted } from 'vue';
import { useBooksStore } from '@/stores/BooksStore.js';

const booksStore = useBooksStore();

// ⭐ Komponens betöltésekor lekérjük a könyveket
onMounted(async () => {
  await booksStore.loadBooks();
});

async function handleDelete(id) {
  if (confirm('Biztosan törölni szeretnéd?')) {
    await booksStore.deleteBook(id);
  }
}
```

### Template rész:

```vue
<template>
  <!-- ⭐ Töltés állapot -->
  <div v-if="booksStore.isLoading">
    Könyvek betöltése...
  </div>

  <!-- ⭐ Hiba állapot -->
  <div v-else-if="booksStore.error">
    {{ booksStore.error }}
  </div>

  <!-- ⭐ Könyvek táblázat -->
  <table v-else>
    <thead>
      <tr>
        <th>ID</th>
        <th>Cím</th>
        <th>Szerző</th>
        <th>Kiadás éve</th>
        <th>Műfaj</th>
        <th>Műveletek</th>
      </tr>
    </thead>
    <tbody>
      <!-- ⭐ v-for ciklus -->
      <tr v-for="book in booksStore.books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.year }}</td>
        <td>{{ book.genre }}</td>
        <td>
          <!-- ⭐ Törlés gomb -->
          <button @click="handleDelete(book.id)">
            🗑️ Törlés
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

**Kulcs koncepciók:**
- `v-if/v-else-if/v-else`: feltételes renderelés
- `v-for`: ciklus a könyvek tömbön
- `:key`: egyedi azonosító (Vue követelmény)
- `@click`: eseménykezelő

---

## 🔗 10. App.vue és main.js

### App.vue:

```vue
<script setup>
import Header from '@/components/Header.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <!-- ⭐ Header minden oldalon megjelenik -->
    <Header />
    
    <!-- ⭐ RouterView: aktuális route komponens -->
    <main>
      <RouterView />
    </main>
  </div>
</template>
```

### main.js:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { createPinia } from 'pinia'
import { plugin as FormKitPlugin, defaultConfig } from '@formkit/vue'

const app = createApp(App)

// ⭐ Plugin-ok regisztrálása
app.use(createPinia())              // Állapotkezelés
app.use(router)                     // Navigáció
app.use(FormKitPlugin, defaultConfig)  // Űrlapok

app.mount('#app-root')
```

---

## 🌐 Proxy Konfiguráció (proxy/conf.d/frotnend.conf)

```nginx
server {
    server_name frontend.vm1.test;
    listen 80;

    # ⭐ API proxy - átirányítás a json-server-hez
    location /api/ {
        # Levágja az /api előtagot
        rewrite ^/api/(.*)$ /$1 break;
        
        # Proxyzza a json-server-hez
        proxy_pass http://jsonserver:3000/;
    }

    # Frontend proxy
    location / {
        proxy_pass http://frontend:5173/;
    }
}
```

**Hogyan működik:**
1. Frontend: `http.get('/books')` → `/api/books`
2. Nginx: `/api/books` → `http://jsonserver:3000/books`
3. json-server: válaszol `{ data: [...] }`
4. Frontend: feldolgozza az adatot

---

## ✅ Elfogadási Kritériumok Ellenőrzése

- [x] **Header komponens** megjelenik minden oldalon navigációval ✅
- [x] **/books** listázza az elemeket táblázatban ✅
- [x] **/books/new** új elemet vesz fel FormKit űrlappal ✅
- [x] **Mentés után** visszairányít a listára ✅
- [x] **Törlés** működik, lista automatikusan frissül ✅
- [x] **Minden adat** a json-server db.json-ból töltődik és oda mentődik ✅

---

## 🚀 Indítás és Tesztelés

### 1. Indítás:
```bash
cd vue-app
./start.sh
```

### 2. Elérés:
```
http://frontend.vm1.test
```

### 3. Tesztelés:
1. Nyisd meg a listát → láthatóak a könyvek
2. Kattints "Új könyv"-ra
3. Töltsd ki az űrlapot
4. Mentsd el → visszairányít a listára
5. Az új könyv megjelenik
6. Kattints "Törlés"-re → eltűnik a könyv

---

## 📝 Kommentek a Kódban

Minden fájl tartalmaz:
- **Fejléc komment**: mi a fájl célja
- **Funkció kommentek**: mit csinál egy függvény
- **Inline kommentek**: hogyan működik a kód
- **JSDoc stílusú kommentek**: paraméterek és visszatérési értékek

Példa:
```javascript
/**
 * Könyv törlése
 * DELETE /api/books/:id
 * 
 * @param {number} id - A törlendő könyv azonosítója
 */
async function deleteBook(id) {
  // Töltés állapot beállítása
  isLoading.value = true;
  
  try {
    // HTTP DELETE kérés
    await http.delete(`/books/${id}`);
    
    // Lokális state frissítése
    books.value = books.value.filter(book => book.id !== id);
  } finally {
    isLoading.value = false;
  }
}
```

---

## 🎓 Összefoglalás

Ez az alkalmazás bemutatja:
- **Vue 3 Composition API** használatát
- **Pinia** állapotkezelést
- **Vue Router** navigációt
- **FormKit** űrlapkezelést
- **Axios** HTTP kommunikációt
- **REST API** műveleteket (GET, POST, DELETE)
- **Reactive Programming**-ot (ref, computed)
- **Lifecycle Hooks**-ot (onMounted)
- **Component-based Architecture**-t
- **SPA** (Single Page Application) koncepciót

Minden részlet részletesen kommentezve van, hogy könnyen követhető legyen! 🎉
