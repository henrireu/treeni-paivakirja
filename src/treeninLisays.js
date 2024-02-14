import listatreeneistaa from './treenidata.js';
import {useState} from 'react';

export default function TreeninLisays({ lisaaButton }) {
    const [sarja, setSarja] = useState({});
    const [syotetila, setSyotetila] = useState(false);

    const [liike, setLiike] = useState("");

    const [sarjalkm, setSarjalkm] = useState(0);

    function lisaaTreeni() {
        listatreeneistaa.push({otsikko: 'testi', paivamaara: '696969'});
        console.log(listatreeneistaa);
    }

    function lisaaSarja() {
        setSyotetila(true);
    }

    function takaisinButton() {
        setSyotetila(false);
        setSarjaindeksi(1);
        setSarjalkm(0);
    }

    function plus() {
        let luku = sarjalkm;
        luku++;
        setSarjalkm(luku);
    }

    function minus() {
        let luku = sarjalkm;
        if (luku > 0) {
            luku--;
            setSarjalkm(luku);
        }
    }

    const [sarjaindeksi, setSarjaindeksi] = useState(1);

    function sarjaX() {
        let luku = sarjalkm;

        function lisaaYksi() {
            let indeksix = sarjaindeksi;
            indeksix++;
            setSarjaindeksi(indeksix);
        }


        if (sarjalkm > 0 && sarjaindeksi <= luku) {
            return (
                <div>
                    <h4 className="otsikko">Sarja{sarjaindeksi}</h4>
                    <div className="yksisyotediv">
                        <p className="pee">Paino: </p>
                        <input 
                        className="inputti"
                        type="text"
                        />
                    </div>
                    <div className="yksisyotediv">
                        <p className="pee">Toistot: </p>
                        <input 
                        className="inputti"
                        type="text"
                        />
                    </div>
                    <button onClick={() => lisaaYksi()}>Lisää</button>
                </div>
                
            )
        }
        
    }
    
    function liikeChange(event) {
        setLiike(event.target.value);
    }

    //mieti tämä uusiksi. kun kirjataan toistoja ja sarjoja niin miten se kannattaa tehdä.
    //nyt sarja lkm ja toisto kysytään kerran vaan ja esimerkiksi jos on ollu sarja missä on 8,8,7 niin ei nyt onnistu
    // voisi toimia siten esim että kun syöttää lkm niin kysytään niin monta kertaa kuin lkm on paino ja toistot.
    return (
        <div>
            {syotetila === false ? (
                <div className="paanakyma">
                    <div className="syotepuoli">
                        <button onClick={() => lisaaSarja()}>Lisää sarja</button>
                        <button className="lisaatreeni" onClick={() => lisaaTreeni()}>Lisää treeni</button>
                        <button onClick={lisaaButton}>Palaa takaisin</button>
                    </div>
                    <div className="tarkastelupuoli">
                        <h3 className="otsikko">Treeni</h3>
                    </div>
                </div>
            ) : (
                <div className="syotenakyma">
                    <div className="syotepuoli">
                        <div className="yksisyotediv">
                            <p className="pee">Liikkeen nimi:</p>
                            <input 
                            className="inputti"
                            type="text"
                            value={liike}
                            onChange={liikeChange}
                            />
                        </div>
                        <div className="yksisyotediv">
                            <p className="pee">Sarja lkm:</p>
                            <button className="plus" onClick={() => plus()}>+</button>
                            <p>{sarjalkm}</p>
                            <button className="minus" onClick={() => minus()}>-</button>
                        </div>
                        {sarjaX()}
                        <button className="takasbutton" onClick={() => takaisinButton()}>takaisin</button>
                    </div>

                    <div className="tarkastelupuoli">
                        <h3 className="otsikko">Sarja</h3>
                        <h4 className="otsikko">{liike}</h4>
                    </div>
                </div>  
            )}
        </div>
    )
}