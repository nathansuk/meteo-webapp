import styles from '../styles.module.css'
import react from 'react'
import StatisticBox from './StatisticBox'
import {useState, useEffect} from 'react'

export default function StationData()
{

    const [errors, setErrors] = useState([])
    const [stationData, setStationData] = useState([])

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
        getStationData()
    }, [])


    return (
        
        <div className={styles.statsBoxes}>
            <StatisticBox statName="pressure" datas={stationData} unitName="mBar" />
            <StatisticBox statName="humidity" datas={stationData} unitName="%" />
            <StatisticBox statName="temperature" datas={stationData} unitName="°C" />
            <StatisticBox statName="luminosity" datas={stationData} unitName="%" />
        </div>

    )
}