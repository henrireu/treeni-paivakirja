import listatreeneistaa from './treenidata.js';
import {useState} from 'react';

//tallenna button on seuraava toiminnallisuus
//muutenkin vaatii hienosäätöä
export default function TreeninLisays({ lisaaButton }) {
    const [treeninNimi, setTreeninNimi] = useState("");
    //kokotreeni on lista objekteja mikä sisältää liikkeen sarjat
    const [kokotreeni, setKokotreeni] = useState([]);
    const [syotetila, setSyotetila] = useState(false);

    const [liike, setLiike] = useState("");

    const [sarjalkm, setSarjalkm] = useState(0);


    function lisaaSarja() {
        setSyotetila(true);
    }

    function takaisinButton() {
        setSyotetila(false);
        setSarjaindeksi(1);
        setSarjalkm(0);
        setLiike("");
        setPainoToistoLista([]);
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
    const [paino, setPaino] = useState("");
    const [toistot, setToistot] = useState("");

    const [painoToistoLista, setPainoToistoLista] = useState([]);

    function sarjaX() {
        let luku = sarjalkm;

        function lisaaYksi() {
            console.log("pöö");
            let indeksix = sarjaindeksi;
            indeksix++;
            setSarjaindeksi(indeksix);

            let objekti = {
                paino: paino,
                toistot: toistot 
            }
            setPaino("");
            setToistot("");
            let lista = [...painoToistoLista];
            lista.push(objekti);
            setPainoToistoLista(lista);
        }

        function painoChange(event) {
            setPaino(event.target.value);
        }

        function toistoChange(event) {
            setToistot(event.target.value);
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
                        value={paino}
                        onChange={painoChange}
                        />
                    </div>
                    <div className="yksisyotediv">
                        <p className="pee">Toistot: </p>
                        <input 
                        className="inputti"
                        type="text"
                        value={toistot}
                        onChange={toistoChange}
                        />
                    </div>
                    <button onClick={() => lisaaYksi()}>Lisää</button>
                </div>
                
            )
        }
        
    }

    function treeninNimiChange(event) {
        setTreeninNimi(event.target.value);
    }
    
    function liikeChange(event) {
        setLiike(event.target.value);
    }

    function tallennaSarja() {
        if (sarjalkm > 0) {
            let lista = [...kokotreeni];
            let sarjaobjekti = {
                liike: liike,
                painotJaToistot: painoToistoLista
            }
            //console.log(sarjaobjekti);
            lista.push(sarjaobjekti);
            setKokotreeni(lista);
        }
        setSarjaindeksi(1);
        setSarjalkm(0);
        setLiike("");
        setPainoToistoLista([]);
        setSyotetila(false);
    }

    //tässä lisätään treeni tietokantaan tässä tapauksessa treenidata.js kansioon
    function lisaaTreeni() {
        //listatreeneistaa on se lista
        if (treeninNimi !== "" && kokotreeni.length > 0) {
            listatreeneistaa.push({otsikko: treeninNimi, sarjat: kokotreeni});
            //console.log("koko treeni: " + kokotreeni);
            /*kokotreeni.map((asia, indeksi) => {
                console.log(asia.liike);
            
                // Käsittele sisäkkäinen lista
                asia.painotJaToistot.map((sarja, sarjaIndeksi) => {
                    console.log(sarja.paino + " " + sarja.toistot);
                });
            });*/

        }
        lisaaButton();
    }

    return (
        <div>
            {syotetila === false ? (
                <div className="paanakyma">
                    <div className="syotepuoli">
                        <div className="yksisyotediv">
                            <p className="pee">Treenin nimi:</p>
                            <input 
                                className="inputti"
                                type="text"
                                value={treeninNimi}
                                onChange={treeninNimiChange}
                            />
                        </div>
                        <button onClick={() => lisaaSarja()}>Lisää sarja</button>
                        <button className="lisaatreeni" onClick={() => lisaaTreeni()}>Lisää treeni</button>
                        <button onClick={lisaaButton}>Palaa takaisin</button>
                    </div>
                    <div className="tarkastelupuoli">
                        <h3 className="otsikko">{treeninNimi}</h3>
                        {kokotreeni.length > 0 && (
                            kokotreeni.map((objekti, indeksi) => (
                                <div key={indeksi}>
                                    <h4 className="otsikko">{objekti.liike}</h4>
                                    {objekti.painotJaToistot.map((rivi, indeksi) => (
                                        <p key={indeksi}>{rivi.paino} kg {rivi.toistot}x</p>
                                    ))}
                                </div>
                            ))
                        )}
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
                        <button onClick={() => tallennaSarja()}>Tallenna sarja</button>
                        <button className="takasbutton" onClick={() => takaisinButton()}>takaisin</button>
                    </div>

                    <div className="tarkastelupuoli">
                        <h3 className="otsikko">Sarja</h3>
                        <h4 className="otsikko">{liike}</h4>
                        {painoToistoLista.length > 0 && (
                            painoToistoLista.map((objekti, indeksi) => (
                                <div key={indeksi}>
                                    <p>Sarja{indeksi + 1}: {objekti.paino} kg {objekti.toistot} kpl</p>
                                </div>
                            ))
                        )}
                        
                    </div>
                </div>  
            )}
        </div>
    )
}