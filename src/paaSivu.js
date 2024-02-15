import './cssTyylit/paaSivu.css';
import './cssTyylit/treeninLisays.css';
import {useState, useEffect} from 'react';
import listatreeneistaa from './treenidata';
import TreeninLisays from'./treeninLisays';

//käännä listan suunta siten että uusin näytetään ensimmäiseksi, tee tämä vasta kun muut toiminnallisuudet ovat kunnossa
export default function Paasivu() {
    // tee lista objekteista
    const [listatreeneista, setListatreeneista] = useState([{}]);
    // varmistus ikkuna kun poistetaan treeniä. tämä on state sen näkymiselle
    const [varmistusPoistolle, setVarmistusPoistolle] = useState(false);
    // indeksi mikä poistetaan
    const [poistoindeksi, setPoistoindeksi] = useState();
    // naytetaanko treenin lisäys näkymä
    const [treeninlisaysnakyma, setTreeninlisaysnakyma] = useState(false);

    const kasittelePoisto = (indeksi) => {
        setVarmistusPoistolle(true);
        setPoistoindeksi(indeksi);
    };

    const kasitteleVarmistus = () => {
        const indeksi = poistoindeksi;
        const uusilista = listatreeneista.filter((item, index) => index !== indeksi);
        setListatreeneista(uusilista);
        setVarmistusPoistolle(false);
    } 

    const kasittelePeruutus = () => {
        setVarmistusPoistolle(false);
    }

    useEffect(() => {

        setListatreeneista(listatreeneistaa);
    }, []);

    function testi() {
        console.log(listatreeneista);
    }

    function palautalistatreeneista() {
        return (
            <div className="treenilista">
                {listatreeneista.map((treeni, indeksi) => (
                    <div className="treeniotsikkodiv" key ={indeksi}>
                        <p className="treeniotsikko">{treeni.otsikko}</p>
                        <button className="poistaButton" onClick={() => kasittelePoisto(indeksi)}>🗑️</button>
                        {varmistusPoistolle === true && indeksi === poistoindeksi &&(
                            <div className="varmistuspoistolle">
                                <p>Oletko varma, että haluat poistaa tämän?</p>
                                <button onClick={kasitteleVarmistus}>Kyllä</button>
                                <button onClick={kasittelePeruutus}>Peruuta</button>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={() => testi()}>testi</button>
            </div>
        );
    }

    function lisaaButton() {
        setTreeninlisaysnakyma(!treeninlisaysnakyma);
    }

    

    return (
        <div className="paadiv">
            {treeninlisaysnakyma === false ? (
                <div>
                    <h1 className="paaotsikko">Salipäiväkirja</h1>
                    <div className="treenilistadiv">
                        <button className="lisaaButton" onClick={() => lisaaButton()}>+</button>
                        {palautalistatreeneista()}
                    </div>
                </div>
            ) : (
                <TreeninLisays lisaaButton={lisaaButton} />
            )}
        </div>
    )
}