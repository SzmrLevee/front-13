## `<monogram>-water`

> Minta: [https://vue-alap-water.web.app](https://vue-alap-water.web.app)

Ebben a feladatban azt fogjuk gyakorloni, hogy hogyan működik a `v-if`. Ehhez szükségünk lesz 4 tárolóra.

1. Egy range típusú mezőt és egy főcímet tárolunk. A range `-40` és `+120` között képes értéket megjeleníteni és hozzá van csatolva a temp nevű állapothoz, amelynek a kezdő értéke 0. Ezt az állapotot fogjuk a címsorba is kiírni.
2. Ezt a tárolót csak akkor pakoljuk fel, ha a víz hőmérséklete 0 fok alatt van. A mintához hasonlóan fehér háttérrel és fekete betűszinnel jelenjen meg és "Fagyott" szöveggel
3. Ez a tárolón csak a 100 fokos vagy annál melegebb víz esetén jelenjen meg a mintának megfelelően.
4. Végül ha egyik előző feltétel sem teljesül, akkor kék héttérrel és fehér betűszínnel írjuk ki ebben a tárolóban, hogy "Folyékony"