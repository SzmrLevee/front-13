/**
 * HTTP kliens konfiguráció axios használatával
 * 
 * Ez a fájl egy központi axios példányt hoz létre, amely tartalmazza
 * a backend API alapértelmezett beállításait.
 * 
 * A baseURL-t az API proxy címére állítjuk be (/api),
 * így minden kérés automatikusan a json-server-hez irányul.
 */

import axios from 'axios';

// Központi axios példány létrehozása alapbeállításokkal
const http = axios.create({
  // Az API alap URL-je - a proxy átirányítja a json-server-hez
  baseURL: '/api',
  
  // Alapértelmezett fejlécek
  headers: {
    'Content-Type': 'application/json',
  },
  
  // Timeout beállítás (10 másodperc)
  timeout: 10000,
});

// Exportáljuk az axios példányt, hogy más fájlokban használhassuk
export default http;
