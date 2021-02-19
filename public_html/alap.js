
function $(nev) {
    return document.querySelectorAll(nev);
}
function ID(nev) {
    return document.getElementById(nev);
}
function CLASS(nev) {
    return document.getElementByclassName(nev);
}

var allatok = [];
var tanulok1 = [];
function allatok_beolvas() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            allatok = JSON.parse(xhttp.responseText).allatok;
            console.log(allatok);
        }
    };


    xhttp.open("GET", "allatok.json", true);
    xhttp.send();


}

function tanulok_beolvasasa() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            tanulok1 = JSON.parse(xhttp.responseText).tanulokneve;
            console.log(tanulok1);
            hozzarendel();
        }
    };
    if (ID("osztaly").value !== "nincs") {
        var kivalaszt = ID("osztaly").value + ".json";

        xhttp.open("GET", kivalaszt, true);
        xhttp.send();
    }



}
//minden sorban 4 elem lesz
var tanulokesallatok = [];
function hozzarendel() {
    console.log("hozzárendel");
    console.log(tanulok1);
    var segedtomb = [];
    var szam1, szam2, szam3;
    for (var i = 0; i < tanulok1.length; i++) {
        do{
        szam1 = Math.floor(Math.random() * allatok.length) + 1;
        szam2 = Math.floor(Math.random() * allatok.length) + 1;
        szam3 = Math.floor(Math.random() * allatok.length) + 1;}
    while(szam1 === szam2||szam1 === szam3||szam2 === szam3);
//        if (szam1 === szam2) {
//            szam1 = Math.floor(Math.random() * allatok.length) + 1;
//        }
//        if (szam1 === szam3) {
//            szam3 = Math.floor(Math.random() * allatok.length) + 1;
//        }
//        if (szam2 === szam3) {
//            szam2 = Math.floor(Math.random() * allatok.length) + 1;
//        }
        segedtomb[i] = [tanulok1[i], allatok[szam1], allatok[szam2], allatok[szam3]];
        tanulokesallatok.push(segedtomb[i]);
    }
    console.log(tanulokesallatok);
    kiir();
}
function kiir(){
    var txt = "<table><tr><th>Név</th><th>1. állat</th><th>2. állat</th><th>3. állat</th></tr>";
    for (var i = 0; i < tanulokesallatok.length; i++) {
        txt += "<tr>";
        for (var item in  tanulokesallatok[i]) {
            txt += "<td>" + tanulokesallatok[i][item] + "</td>";
        }
        txt += "</tr>";
    }
    txt += "</table>";
    ID("tablazat").innerHTML += txt + "<br>";
    console.log(tanulokesallatok.length);
}
function init() {
    allatok_beolvas();

    ID("osztaly").addEventListener('change', tanulok_beolvasasa, false);
    
}
window.addEventListener('load', init, false);

