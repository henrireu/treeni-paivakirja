import {listatreeneistaa, lisaaReeniListaan} from './treenidata.js';
import {useState} from 'react';

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


        function lisaayksSarja() {
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

            let luku = sarjalkm;
            luku++;
            setSarjalkm(luku);
        }

        return (
            <div className="divXX">
                <div className="jotainxx">
                    {painoToistoLista.map((objekti, indeksi) => (
                        <p key={indeksi}>{objekti.paino}kg {objekti.toistot}x</p>
                    ))}
                    <div className="jotain">
                        <p className="syotteenNimi">Paino: (kg)</p>
                        <input 
                        className="inputtix"
                        type="text"
                        value={paino}
                        onChange={painoChange}
                        />
                        <p className="syotteenNimi">Toistot: </p>
                        <input 
                        className="inputtix"
                        type="text"
                        value={toistot}
                        onChange={toistoChange}
                        />
                        <button className="lisaaSarjaBtn" onClick={() => lisaayksSarja()}>+</button>
                    </div>
                </div>
            </div>
        )

        /*return (
            <div>
                <h4 className="otsikko">Sarja{sarjaindeksi}</h4>
                <div className="yksisyotediv">
                    <p className="pee">Paino: (kg)</p>
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
            
        )*/
        
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
        let objekti = {
            otsikko: treeninNimi,
            sarjat: kokotreeni
        }
        if (treeninNimi !== "" && kokotreeni.length > 0) {
            lisaaReeniListaan(objekti);
            //lisaaButtonista siirrytään takas paaSivulle
            lisaaButton();
        }   
    }

    function poista(indeksi) {
        let uusilista = [...kokotreeni];
        uusilista.splice(indeksi, 1);
        setKokotreeni(uusilista);
    }

    const [sarjaNakyma, setSarjaNakyma] = useState(false);
    const [sarjadivIndeksi, setSarjadivIndeksi] = useState();

    function naytaSarja(indeksi) {
        setSarjaNakyma(!sarjaNakyma);
        setSarjadivIndeksi(indeksi);
    }

    //toiminto kun klikkaa sarjaa toimii mutta css kusee ja paljon hiottavaa. täytyy klikata tekstiä että toimii

    // laita pop up ikkuna kun painaa tallenna treeni ja jokin tieto puuttuu.
    // tee jossain vaiheessa alasvetovalikko mistä voi valita treenin listasta
    return (
        <div>
            {syotetila === false ? (
                <div className="paanakyma">
                    <div className="syotepuoli">
                        <div className="yksisyotediv">
                            <p className="syotteenNimi">Treenin nimi:</p>
                            <input 
                                className="inputti"
                                type="text"
                                value={treeninNimi}
                                onChange={treeninNimiChange}
                            />
                        </div>
                        {kokotreeni.map((nimi, indeksi) => (
                            <div key={indeksi} className="nimidiv">
                                <div className="sarjaklik" onClick={() => naytaSarja(indeksi)}>
                                    <div className="ylarivi">
                                        <p className="nimi">{nimi.liike}</p>
                                        <button className="poistaButtoni" onClick={() => poista(indeksi)}>🗑️</button>
                                    </div>
                                    {sarjaNakyma === true && indeksi === sarjadivIndeksi && (
                                        nimi.painotJaToistot.map((objekti, indeksi) => (
                                            <div key={indeksi} className="yksisarja">
                                                <p className="yksiteksti">{objekti.paino}kg {objekti.toistot}x</p>
                                            </div>
                                        ))       
                                    )}
                                </div>
                            </div>
                        ))}
                        <button className="lisaaSarjaBtn" onClick={() => lisaaSarja()}>+</button>
                        <div className="alarivi">
                            <button className="lisaatreeni" onClick={() => lisaaTreeni()}>Tallenna treeni</button>
                            <button className="takasbutton" onClick={lisaaButton}>Palaa takaisin</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="syotenakyma">
                    <div className="syotepuoli">
                        <div className="yksisyotediv">
                            <p className="syotteenNimi">Liikkeen nimi:</p>
                            <input 
                            className="inputti"
                            type="text"
                            value={liike}
                            onChange={liikeChange}
                            />
                        </div>
                        {/*<div className="yksisyotediv">
                            <p className="syotteenNimi">Sarja lkm:</p>
                            <button className="plus" onClick={() => plus()}>+</button>
                            <p>{sarjalkm}</p>
                            <button className="minus" onClick={() => minus()}>-</button>
                        </div>*/}
                        {sarjaX()}
                        <button onClick={() => tallennaSarja()}>Tallenna sarja</button>
                        <button className="takasbutton" onClick={() => takaisinButton()}>takaisin</button>
                    </div>
                </div>  
            )}
        </div>
    )
}