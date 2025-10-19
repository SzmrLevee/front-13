## `<monogram>-random`

> Minta: [https://vue-alap-random.web.app](https://vue-alap-random.web.app)

Most megnézzük, hogy hogyan működik a v-show, amihez szükségünk lesz két tárolóra.

Az első tárolóban egy beviteli mezőnk lesz, ami `enter` billentyűre elhelyezi a beírt szöveget egy lista típusú állapotba, és törli a mező tartalmát. Valamint lesz egy gombunk, ami a random nevű állapot értékét állítja `0` és a lista mérete közötti random számra. A random alapértéke legyen `-1`.

A második tárolóban irassuk ki a lista összes elemét egy-egy kártyára és csak akkor jelenjen meg az adott kártya, ha a random értéke az megegyezik az indexével. A kártya háttérszínét random állítsd elő függvény segítségével, valamint egy 3-as szintű címsorba írasd ki a listaelemet.