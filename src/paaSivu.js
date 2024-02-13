import './cssTyylit/paaSivu.css';
import {useState, useEffect} from 'react';


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

    const listatreeneistaa = [
        { otsikko: 'Legs 1', paivamaara: '2024-02-13' },
        { otsikko: 'Push 1', paivamaara: '2024-02-14' },
        { otsikko: 'Pull 1', paivamaara: '2024-02-15' },
        // Lisää tarvittaessa muita treenejä
    ];

    useEffect(() => {
        setListatreeneista(listatreeneistaa);
    }, []);


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
            </div>
        );
    }

    function lisaaButton() {
        setTreeninlisaysnakyma(true);
    }

    function takaisinPaasivulle() {
        setTreeninlisaysnakyma(false);
    }

    return (
        <div className="paadiv">
            {treeninlisaysnakyma === false ? (
                <div>
                    <h1 className="paaotsikko">Salipäiväkirja</h1>
                    <div className="treenilistadiv">
                        {palautalistatreeneista()}
                        <button className="lisaaButton" onClick={() => lisaaButton()}>+</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="paaotsikko">Salipäiväkirja</h1>
                    <div className="treeninkirjausdiv">
                        <p>Treenin otsikko: </p>
                        <input type="text"></input>

                        <button onClick={() => takaisinPaasivulle()}>takaisin</button>
                    </div>
                </div>
            )}
        </div>
    )
}