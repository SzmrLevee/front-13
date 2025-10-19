# Vue – Téglalap

## Komponensek létrehozása

1. Hozza létre a `BaseForm.vue` komponenst a `components` könyvtárba.
2. A komponens tartalmazzon egy űrlapot a mintának megfelelően!
3. A `BaseForm` tartalmazzon egy `rectangle` objektumot, amely tulajdonságai össze
van kötve a két beviteli mezővel. A `width` a szélességet, a `height` a magasságot tárolja!
4. Jelezze a szülő felé, hogy van egy esemény, amely módosítja a meglévő `rectangle`
objektum `width` és `height` tulajdonságait. A *Módosítás* gomb kattintás eseményére
váltsa ki az előbbi eseményt és adja át paraméterként az állapotként tárolt `rectangle`
objektumot.

## Gyökér komponens

5. Az előbb elkészített komponenst importálja be, és helyezze fel a gyökér komponensre!
6. A gyökérkomponensnek is legyen egy hasonló szerkezetű állapota. A `rectangle`
`width` értéke legyen 200px, a height értéke 100px és legyen pluszba egy
`backgroundColor` tulajdonsága is, amely kezdőértéke `lightblue` legyen!
7. Legyen két kiszámított állapota, amely a téglalap kerületét és területét számolja ki.
Ezeket hívja meg a gyökérkomponens betöltődésére is.
8. Készítsen egy `modifyRectangle(rectangle)` metódust, amely módosítja a
téglalap szélességét és a magasságát a formtól kapott új értékekkel, valamint
háttérszínként egy véletlen színt generáljon le!
   1. A `BaseForm` komponensen rendelje hozzá az előbb létrehozott
`modifyRectangle` metódust!
9. A téglalapon érvényesítse a módosított formázásokat!
10.   A téglalap közepére a mintának megfelelően írja ki a kerületet és a területet!