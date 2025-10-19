## `<monogram>-list-counter`

> Minta: [https://vue-alap-list.web.app](https://vue-alap-list.web.app)

Ebben a projektben egy tömböt fogunk kezelni. Amire szükségünk lesz, az 3 taroló:

1. Az elsőben egy szöveges mező lesz, amely `CTRL`+`ENTER` billentyű leütésre a lista elejére, `ALT`+`ENTER` leütésre a lista végére szúr be egy elemet, beszúrás után töröljük a mező értékét. Ezeket egy-egy függvény segítségével oldd meg.
2. A második tárolóban egy 3-as és egy 5-ös szintű címsor, melyek dinamikusan fognak adatot megjeleníteni. Az első sorban a lista aktuális elemszámát számított állapottal adjuk meg. A második sorban pedig egy sima állapottal, hogy melyik irányba volt az utolsó elem beszúrva. Ennek az állítását a listát töltő függvények végezzék.
3. Valamint lesz egy rácsrendszerünk, amelyben a lista alapján fogunk oszlopokat elhelyezni kártyákkal, minden sorban 4 db férjen ki. Az kártya kapjon olyan dirketívát, amellyel a listán végig lehet menni (ügyelj arra, hogy szét kell bontani az elemet az indextől). A kártyákon jelenjen meg a listaelem, a kártyára középső egérgombbal kattinva pedig töröljük az adott elemet. A törlendő indexet ehhez paraméternént adjuk át.
