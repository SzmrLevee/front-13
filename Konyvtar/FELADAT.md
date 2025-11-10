# 📝 Vue.js CRUD Alkalmazás - Feladat Specifikáció

> **Cél:** Készíts egy egyoldalas Vue 3 alkalmazást, amely REST API-n keresztül végez CRUD műveleteket (listázás, létrehozás, törlés) egy egyszerű erőforráson.

---

## 📋 Feladat Összefoglalás

Egy kis SPA (Single Page Application) fejlesztése Vue 3-ban, amely képes:
- ✅ **Listázni** az elemeket
- ✅ **Létrehozni** új elemet
- ✅ **Törölni** meglévő elemet

Az alkalmazás egy json-server backend-del kommunikál REST API-n keresztül.

---

## 🎯 0. Előkészület: Copilot Kikapcsolása

**VSCode beállítás:**
1. Jobb alsó sarokban **Copilot ikon**
2. Az **All files** mellől vedd ki a pipát
3. Ez automatikusan kikapcsolja minden fájltípusnál

> **Miért?** A feladat célja a saját kódolási készség fejlesztése, nem az AI segítség.

---

## 🏷️ 1. Témaválasztás és Adatmodell

### Választható témák:

| Téma | Mezők (4 db) | Típusok |
|------|-------------|---------|
| **Könyvek** | cím, szerző, év, műfaj | String, String, Number, String |
| **Film/sorozat** | cím, műfaj, értékelés, év | String, String, Number, Number |
| **Receptek** | név, hozzávalók, elkészítési idő, nehézség | String, String, Number, String |
| **Felhasználók** | név, email, szerepkör, születési dátum | String, String, String, Date |
| **Termékek** | név, leírás, ár, készlet | String, String, Number, Number |

### Követelmények:
- ✅ **4 mező** összesen
- ✅ **Legalább 1 nem szöveges** mező (Number, Date, Boolean)
- ✅ **Erőforrás név** többes számban (pl. `books`, `movies`, `users`)

### Példa választás:

**Téma:** Könyvek

**Erőforrás név:** `books`

**Adatmodell:**
```javascript
{
  id: Number,          // Automatikus (json-server)
  title: String,       // Könyv címe
  author: String,      // Szerző neve
  year: Number,        // ⭐ Kiadás éve (nem szöveges!)
  genre: String        // Műfaj
}
```

---

## 📂 2. Projekt Struktúra és Tooling

### Kötelező mappastruktúra:

```
frontend/src/
├── components/
│   └── Header.vue              # Navigációs fejléc
├── views/
│   └── [resource]/             # pl. books, movies, users
│       ├── List.vue            # Lista nézet
│       ├── New.vue             # Új elem űrlap
│       └── Edit.vue            # Szerkesztés (opcionális ebben a feladatban)
├── stores/
│   └── [Resource]Store.js      # pl. BooksStore.js
├── utils/
│   └── http.js                 # Axios konfiguráció
├── router.js                   # Vue Router
├── App.vue                     # Főkomponens
└── main.js                     # Belépési pont
```

### Alias konfiguráció:

**vite.config.js:**
```javascript
resolve: {
  alias: {
    '@': './src',
    '@views': './src/views',    // ⭐ Kötelező!
    '@utils': './src/utils'
  }
}
```

### Kötelező csomagok:

```json
{
  "dependencies": {
    "vue": "^3.5.x",
    "vue-router": "^4.x",       // ⭐ Navigáció
    "pinia": "^3.x",            // ⭐ Állapotkezelés
    "@formkit/vue": "^1.x",     // ⭐ Űrlapok
    "axios": "^1.x"             // ⭐ HTTP kliens
  }
}
```

---

## 🗄️ 3. JSON-Server Beállítás és Seed Adatok

### db.json létrehozása:

**Hely:** `json-server/data/db.json`

**Tartalom:** (példa könyvekkel)
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

### Követelmények:
- ✅ Erőforrás neve többes számban
- ✅ **Legalább 3 minta rekord**
- ✅ Minden rekordnak van `id` mezője
- ✅ Az id automatikusan generálódik POST kérésnél

### Indítás és ellenőrzés:

```bash
# Docker indítása
./start.sh

# json-server újraindítása (ha módosítottad a db.json-t)
docker compose restart jsonserver

# Ellenőrzés
curl http://localhost/api/books
# vagy böngészőben: http://localhost/api/books
```

---

## 🌐 4. HTTP Kliens (Axios)

### Axios példány létrehozása:

**Fájl:** `src/utils/http.js`

**Tartalom:**
```javascript
import axios from 'axios';

const http = axios.create({
  baseURL: '/api',              // Proxy átirányítja a json-server-hez
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default http;
```

### Működés:
- `http.get('/books')` → `/api/books`
- Nginx proxy: `/api/books` → `http://jsonserver:3000/books`
- json-server válaszol

### Használat a store-ban:
```javascript
import http from '@utils/http.js';

const response = await http.get('/books');
await http.post('/books', newBook);
await http.delete(`/books/${id}`);
```

---

## 💾 5. Pinia Store - REST Műveletek

### Store létrehozása:

**Fájl:** `src/stores/BooksStore.js` (vagy a saját témád szerint)

### Kötelező állapotok (state):

```javascript
const books = ref([]);          // Az erőforrás neve
const isLoading = ref(false);   // Töltés állapot
const error = ref(null);        // Hibaüzenet
```

### Kötelező műveletek (actions):

#### 1. **loadBooks()** - GET kérés
```javascript
async function loadBooks() {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await http.get('/books');
    books.value = response.data.data || response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
```

#### 2. **createBook(book)** - POST kérés
```javascript
async function createBook(book) {
  isLoading.value = true;
  
  try {
    const response = await http.post('/books', book);
    const newBook = response.data.data || response.data;
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

#### 3. **deleteBook(id)** - DELETE kérés
```javascript
async function deleteBook(id) {
  isLoading.value = true;
  
  try {
    await http.delete(`/books/${id}`);
    books.value = books.value.filter(book => book.id !== id);
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    isLoading.value = false;
  }
}
```

### Exportálás:
```javascript
return {
  books, isLoading, error,
  loadBooks, createBook, deleteBook
};
```

---

## 🛤️ 6. Vue Router - Útvonalak

### Router konfiguráció:

**Fájl:** `src/router.js`

### Kötelező route-ok:

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import BooksList from '@views/books/List.vue';
import BooksNew from '@views/books/New.vue';

const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      redirect: '/books'        // ⭐ Gyökér → lista
    },
    {
      path: '/books',
      name: 'books-list',
      component: BooksList,     // ⭐ Lista nézet
    },
    {
      path: '/books/new',
      name: 'books-new',
      component: BooksNew,      // ⭐ Új elem
    },
  ],
});

export default router;
```

### URL struktúra:
- `/` → átirányít `/books`-ra
- `/books` → Lista nézet
- `/books/new` → Új elem űrlap

---

## 🎨 7. Header Komponens Navigációval

### Header létrehozása:

**Fájl:** `src/components/Header.vue`

### Kötelező elemek:

```vue
<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <h1>Könyvtár Kezelő</h1>
    
    <nav>
      <!-- RouterLink komponens a navigációhoz -->
      <RouterLink to="/books">Könyvek listája</RouterLink>
      <RouterLink to="/books/new">Új könyv</RouterLink>
    </nav>
  </header>
</template>
```

### Követelmények:
- ✅ Megjelenik **minden oldalon**
- ✅ **RouterLink** használata (nem `<a href>`)
- ✅ Aktív link jelzése (`active-class`)
- ✅ Tiszta, átlátható navigáció

---

## 📝 8. FormKit - Új Elem Űrlap

### Űrlap komponens:

**Fájl:** `src/views/books/New.vue`

### Kötelező elemek:

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
  router.push('/books');  // ⭐ Mentés után vissza a listára
}
</script>

<template>
  <FormKit 
    type="form" 
    @submit="submitForm"
    v-model="formData"
  >
    <!-- 4 mező az adatmodell szerint -->
    <FormKit type="text" name="title" label="Cím" validation="required" />
    <FormKit type="text" name="author" label="Szerző" validation="required" />
    <FormKit type="number" name="year" label="Év" validation="required|number" />
    <FormKit type="select" name="genre" label="Műfaj" validation="required" :options="[...]" />
  </FormKit>
</template>
```

### Követelmények:
- ✅ **FormKit** használata (nem sima HTML form)
- ✅ **4 mező** az adatmodellnek megfelelően
- ✅ **Validáció** minden mezőn (`required`)
- ✅ Legalább 1 **nem szöveges** mező (number, date, stb.)
- ✅ **Mentés után** átirányítás a listára
- ✅ Store **createBook()** metódus hívása

---

## 📊 9. Lista Nézet - Táblázat és Törlés

### Lista komponens:

**Fájl:** `src/views/books/List.vue`

### Kötelező elemek:

```vue
<script setup>
import { onMounted } from 'vue';
import { useBooksStore } from '@/stores/BooksStore.js';

const booksStore = useBooksStore();

onMounted(async () => {
  await booksStore.loadBooks();  // ⭐ Automatikus betöltés
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
    <thead>
      <tr>
        <th>Cím</th>
        <th>Szerző</th>
        <th>Év</th>
        <th>Műfaj</th>
        <th>Műveletek</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in booksStore.books" :key="book.id">
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.year }}</td>
        <td>{{ book.genre }}</td>
        <td>
          <!-- ⭐ Törlés gomb -->
          <button @click="handleDelete(book.id)">Törlés</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

### Követelmények:
- ✅ **Táblázat** vagy **kártyák** (választható)
- ✅ **Minden adat** megjelenik
- ✅ **Törlés gomb** minden elemnél
- ✅ **Megerősítés** törlés előtt (`confirm()`)
- ✅ **Automatikus frissülés** törlés után
- ✅ **Töltés állapot** kezelése (`v-if="isLoading"`)
- ✅ **Hiba kezelés** (`v-else-if="error"`)

---

## ✅ 10. Elfogadási Kritériumok

### Funkcionális követelmények:

- [ ] **Header komponens** megjelenik minden oldalon
- [ ] **Navigációs linkek** működnek (RouterLink)
- [ ] **`/books`** (vagy saját resource) listázza az elemeket
- [ ] **Összes adat** látható a listában
- [ ] **`/books/new`** új elemet vesz fel FormKit űrlappal
- [ ] **Validáció** működik az űrlapon
- [ ] **Mentés után** automatikusan visszairányít a listára
- [ ] **Törlés gomb** működik minden elemnél
- [ ] **Megerősítés** jelenik meg törlés előtt
- [ ] **Lista frissül** törlés után (automatikusan)
- [ ] **Minden adat** a json-server `db.json`-ból jön
- [ ] **Új elemek** a `db.json`-ba mentődnek

### Technikai követelmények:

- [ ] **Vue 3** Composition API használata
- [ ] **Pinia** store az állapotkezeléshez
- [ ] **Vue Router** a navigációhoz
- [ ] **FormKit** az űrlapokhoz
- [ ] **Axios** a HTTP hívásokhoz
- [ ] **@views** alias működik
- [ ] **Proxy** konfiguráció működik (`/api/*`)
- [ ] **Docker konténerek** futnak

### Kód minőség:

- [ ] **Kommentek** minden fájlban (mi a fájl célja)
- [ ] **Értelmes nevek** (komponensek, változók, függvények)
- [ ] **Hibakezelés** (try-catch, error state)
- [ ] **Tiszta kód** (nincs felesleges console.log)

---

## 🚀 Indítás és Tesztelés

### 1. Docker konténerek indítása:

```bash
cd vue-app
./start.sh

# Ha módosítottad a db.json-t:
docker compose restart jsonserver
```

### 2. Alkalmazás elérése:

```
http://frontend.vm1.test
```

### 3. Tesztelési lépések:

1. **Navigáció tesztelése**
   - Kattints a "Könyvek listája" linkre
   - Kattints az "Új könyv" linkre
   - Ellenőrizd, hogy az URL változik

2. **Lista nézet tesztelése**
   - Láthatóak-e a 3 minta könyv?
   - Minden adat megjelenik?
   - Van törlés gomb?

3. **Új elem hozzáadása**
   - Töltsd ki az űrlapot
   - Kattints "Mentés"-re
   - Visszairányít a listára?
   - Az új elem megjelenik?

4. **Törlés tesztelése**
   - Kattints "Törlés"-re
   - Megerősítés jelenik meg?
   - Elem eltűnik a listából?

5. **Perzisztencia tesztelése**
   - Frissítsd az oldalt (F5)
   - Az adatok megmaradnak?
   - Ellenőrizd a db.json fájlt

---

## 📦 Beadandó

### Mit kell leadni:

1. **Teljes vue-app mappa** a következő fájlokkal:
   - `frontend/src/` - összes Vue komponens és store
   - `json-server/data/db.json` - seed adatokkal
   - `proxy/conf.d/` - proxy konfiguráció
   - `docker-compose.yml` és `start.sh`

2. **README.md** a főkönyvtárban:
   - Projekt leírás
   - Választott téma és adatmodell
   - Indítási útmutató
   - Használati útmutató

3. **Opcionális:**
   - Screenshotok a működő alkalmazásról
   - Extra funkciók (keresés, rendezés, stb.)

### Nem szükséges:

- ❌ `node_modules/` mappa
- ❌ `.git/` mappa
- ❌ Docker image-ek

---

## 🎓 Értékelési Szempontok

| Szempont | Pontszám | Leírás |
|----------|----------|--------|
| **Funkcionális követelmények** | 40% | Listázás, létrehozás, törlés működik |
| **Technikai implementáció** | 30% | Pinia, Router, FormKit használata |
| **Kód minőség** | 20% | Tiszta kód, kommentek, hibakezlés |
| **Dokumentáció** | 10% | README, használati útmutató |

### Plusz pontok:

- ⭐ Extra funkciók (keresés, rendezés, szerkesztés)
- ⭐ Egyedi design (nem csak Tailwind)
- ⭐ Toast értesítések
- ⭐ Form validáció üzenetek testreszabása
- ⭐ Loading skeleton a lista betöltésekor

---

## 🐛 Gyakori Hibák és Megoldások

### 1. **404 hiba az API hívásoknál**

**Probléma:** `Request failed with status code 404`

**Megoldás:**
```bash
docker compose restart jsonserver
curl http://localhost/api/books
```

### 2. **RouterLink nem működik**

**Probléma:** Kattintásra újratölt az oldal

**Megoldás:** 
- `RouterLink` használata `<a href>` helyett
- Router regisztrálása a `main.js`-ben

### 3. **FormKit validáció nem működik**

**Probléma:** Űrlap elküldhető üres mezőkkel

**Megoldás:**
- `validation="required"` minden mezőn
- FormKit plugin regisztrálva a `main.js`-ben

### 4. **Store nem frissül**

**Probléma:** Törlés után az elem még látszik

**Megoldás:**
- `ref()` használata a state-ben
- `filter()` a törlés után

### 5. **Proxy nem működik**

**Probléma:** CORS vagy 502 hiba

**Megoldás:**
```bash
docker compose restart proxy
docker logs vue-app-proxy-1
```

---

## 📚 Hasznos Linkek

- [Vue 3 dokumentáció](https://vuejs.org/)
- [Pinia dokumentáció](https://pinia.vuejs.org/)
- [Vue Router dokumentáció](https://router.vuejs.org/)
- [FormKit dokumentáció](https://formkit.com/)
- [Axios dokumentáció](https://axios-http.com/)
- [JSON Server dokumentáció](https://github.com/typicode/json-server)

---

## ✨ Sikereket a fejlesztéshez!

Ha elakadtál, nézd meg:
- A `IMPLEMENTATION_GUIDE.md` fájlt részletes útmutatóért
- A `README.md` fájlt használati útmutatóért
- A Docker logokat hibakereséshez

**Jó munkát! 🚀**
