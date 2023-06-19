import styles from '../styles.module.css'
import react from 'react'
import StatisticBox from './StatisticBox'
import {useState, useEffect, useRef} from 'react'

export default function StationData()
{

    const [isPaused, setPause] = useState(false);
    const ws = useRef(null);

    const [errors, setErrors] = useState([])
    const [stationData, setStationData] = useState([])
    const [isConnectedToSocket, setIsConnectedToSocket] = useState(false)

    async function getStationData()
    {
        try {

            const response = await fetch('/station/data/ESIEE-1', {
                method: 'GET'
            })

            const data = await response.json()
            setStationData(data)


        } catch(err) {
            console.log("Erreur lors de la récupération des données de la station" + err)
            setErrors(err)
        }
    }

    useEffect(() => {
        ws.current = new WebSocket("ws://185.163.127.5:8080");
        
        ws.current.onopen = () => {
            console.log("Websocket on")
            setIsConnectedToSocket(true)
        }
        ws.current.onclose = () => {
            console.log("Websocket off")
            setIsConnectedToSocket(false)
        }

        ws.current.addEventListener('message', function (event) {
            console.log('Voici un message du serveur', event.data);
          });

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    useEffect(() => {
        ws.current.onmessage = event => {
            console.log("e", JSON.parse(event.data));

            let newData = stationData.slice();
            newData.push(JSON.parse(event.data));
            if (newData.length > 10) {
                newData.shift();
            }
            setStationData(newData);
        };
    }, [isPaused, stationData]);



    return (
        <>
            <h2>Station favorite</h2>
            <h3> 
                { (isConnectedToSocket) ? 
                    <><i className="fi fi-sr-comment-alt-check" style={{color: '#10ac84'}}></i> <span style={{color: '#10ac84'}}>Connecté à la station</span>
                    </>
                    : <><i className="fi fi-sr-cross-circle" style={{color: '#ee5253'}}></i> <span style={{color: '#ee5253'}}>Pas connecté</span> </>
                }
            </h3>
            <div className={styles.statsBoxes}>
                <StatisticBox statName="pressure" datas={stationData} unitName="mBar" />
                <StatisticBox statName="humidity" datas={stationData} unitName="%" />
                <StatisticBox statName="temperature" datas={stationData} unitName="°C" />
                <StatisticBox statName="luminosity" datas={stationData} unitName="%" />
                <StatisticBox statName="windSpeed" datas={stationData} unitName="km/h" />
                <StatisticBox statName="rainfall" datas={stationData} unitName="litre/zeubi" />
            </div>
        </>

    )
}