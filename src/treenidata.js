//let listatreeneistaa = [
    /*{
        otsikko: 'Legs 1',
        sarjat: [
            {
                liike: "kyykky",
                painotJaToistot: [
                    {
                        paino: 50,
                        toistot: 10
                    }
                ]
            }
        ]
    },*/
//];
let listatreeneistaa = JSON.parse(localStorage.getItem('listatreeneistaa')) || [];

function lisaaReeniListaan(treeni) {
    listatreeneistaa = [...listatreeneistaa, treeni];
    tallennaLocalStorageen();
}

function poistaReeniListasta(indeksi) {
    listatreeneistaa.splice(indeksi, 1);
    tallennaLocalStorageen();
}

function tallennaLocalStorageen() {
    localStorage.setItem('listatreeneistaa', JSON.stringify(listatreeneistaa));
}


export {listatreeneistaa, lisaaReeniListaan, poistaReeniListasta};
