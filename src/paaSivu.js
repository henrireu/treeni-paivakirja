import './cssTyylit/paaSivu.css';
import './cssTyylit/treeninLisays.css';
import {useState, useEffect} from 'react';
import {listatreeneistaa, poistaReeniListasta} from './treenidata';

import TreeninLisays from'./treeninLisays';

//käännä listan suunta siten että uusin näytetään ensimmäiseksi, tee tämä vasta kun muut toiminnallisuudet ovat kunnossa

// tämä local storage tallennus ei toimi
// muuta ehkä koko sovelluksen rakennetta siten että ei ole treenidata.js kansiota vaan päivitä local storage useState listatreeneista
//perusteella
//sitten anna useState lista lisaaButtonin sisällä treeninLisäys näkymään
export default function Paasivu() {
    const [listatreeneista, setListatreeneista] = useState([]);
    // varmistus ikkuna kun poistetaan treeniä. tämä on state sen näkymiselle
    const [varmistusPoistolle, setVarmistusPoistolle] = useState(false);
    // indeksi mikä poistetaan
    const [poistoindeksi, setPoistoindeksi] = useState();
    // naytetaanko treenin lisäys näkymä
    const [treeninlisaysnakyma, setTreeninlisaysnakyma] = useState(false);
    //näytetäänkö yksittäinen treeni kokonaan div klikkauksella tila
    const [treeniNakyma, setTreeniNakyma] = useState(false);
    //indeksi mikä treeni näytetään
    const [treeniIndeksi, setTreeniIndeksi] = useState();


    const kasittelePoisto = (indeksi) => {
        setVarmistusPoistolle(true);
        setPoistoindeksi(indeksi);
    };

    const kasitteleVarmistus = () => {
        const indeksi = poistoindeksi;
        poistaReeniListasta(indeksi);
        setVarmistusPoistolle(false);
    } 

    const kasittelePeruutus = () => {
        setVarmistusPoistolle(false);
    }

    useEffect(() => {
        /*listatreeneista.map((objekti, indeksi) => {
            console.log(objekti.otsikko);
    
            objekti.sarjat.map((sarja, sarjaindeksi) => {
                console.log(sarja.liike); 
                sarja.painotJaToistot.map((painoToisto, ptIndeksi) => {
                    console.log(painoToisto.paino + "kg " + painoToisto.toistot + "x");
                });
            });
        });*/
        setListatreeneista(listatreeneistaa);

        // tänne ehkä funktio mikä on treenidata.js ja tallentaa local storageen
    }, [listatreeneistaa]);


    function naytaTreeni(indeksi) {
        setTreeniNakyma(!treeniNakyma);
        setTreeniIndeksi(indeksi);
    }


    function palautalistatreeneista() {
        return (
            <div className="treenilista">
                {listatreeneista.map((treeni, indeksi) => (
                    <div className="treeniotsikkodiv" key ={indeksi}>
                        <div className="treeniklik" onClick={() => naytaTreeni(indeksi)}>
                            <p className="treeniotsikko">{treeni.otsikko}</p>
                            {treeniNakyma === true && indeksi === treeniIndeksi && (
                                //muuta listatreeneista vain listatreeneistaa jos ei toimi
                                listatreeneista[indeksi].sarjat.map((objekti, indeksix) => (
                                    <div key={indeksix}>
                                        <p>{objekti.liike}</p>
                                        {objekti.painotJaToistot.map((painoToisto, ptIndeksi) => (
                                            <p key={ptIndeksi}>{painoToisto.paino}kg {painoToisto.toistot}</p>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>
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