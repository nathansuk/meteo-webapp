import styles from '../styles.module.css'
import react from 'react'
import StatisticBox from './StatisticBox'
import {useState, useEffect} from 'react'
import { io } from 'socket.io-client';

export default function StationData()
{

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

    useEffect( () => {
        
        const socket = io("ws://localhost:3001")

        socket.onopen = () => {
            console.log("Connexion établie avec le serveur socket")
            setIsConnectedToSocket(true)
        }

        socket.on("data", data => {
            console.log("DONNEES RECUES DEPUIS LE SERVEUR SOCKET" + JSON.stringify(data))
            
            let newData = stationData.slice()
            newData.push(data)
            if(newData.length > 10) {
                newData.shift()
            }
            setStationData(newData)
            console.log(stationData)
        })
    

    }, [stationData])


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
            </div>
        </>

    )
}