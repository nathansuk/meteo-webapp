import styles from '../../styles.module.css'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'
import StationData from '../StationData'
import Modal from '../Modal'

export default function Landing()
{

    const [stationNumber, setStationNumber] = useState(0)
    async function getUser(token) {
        try {
            const response = await fetch('/user/get/'+token, {
                method: 'GET'
            })
    
            const data = await response.json()
            console.log(data)
            if(data.errors) {
                setErrors(data.errors)
                console.log("Erreur" + errors)
                return
            }
            setStationNumber(data["userStations"].length)
            setFavoriteStation(data["userStations"][0]["stationName"])
    
        } catch(err) {
            console.log(err)
        }
    
    }

    const modalData = {
        name: "temperature"
    }

    useEffect(() => {
        getUser(localStorage.getItem('session_token'))
    }, [])

    return(
        <>
            <h1>Bienvenue, </h1>

            <div className={styles.dashboardContentBoxes}>

                <div className={styles.dashboardContentBox}>
                    <h2>Nombre de station</h2>
                    <div className={styles.boxContent}>
                        <i class="fi fi-sr-marker dashboardContentBoxIcon" style={{marginRight: 30, marginTop: 30}}></i>
                        <h1>{stationNumber}</h1>
                    </div>
                </div>


                <div className={styles.dashboardContentBox}>
                    <h2>Ajouter une station</h2>
                    <div className={styles.boxContent}>
                        
                        <h1>C'est ici</h1>
                    </div>
                </div>


            </div>  
            
            <StationData />

            <Modal modalDatas={modalData} />


        </>
    )
}