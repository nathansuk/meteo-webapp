import React from "react"
import styles from '../../styles.module.css'
import Image from "next/image"


export default function UserStation() {



    return (

        <>
            <h1>Mes Appareils</h1>


            <div className={styles.userStationsList}>

                <div className={styles.userStationBox}>
                    <i className={`${styles.favoriteIcon} fi fi-rr-heart`}></i>
                    <Image 
                        src="/icons/measurement.png"
                        width={200}
                        height={200}
                        alt="Station image"></Image>
                    <h2>ESIEE-1</h2>
                </div>
                
                <div className={styles.userStationBoxButton}>
                    <div className={styles.addButtonContent}>
                        <h1>+</h1>
                        <span>Ajouter une station</span>
                    </div>
                </div>
            </div>
        </>

    )





}