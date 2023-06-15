import styles from '../../styles.module.css'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'
import StationData from '../StationData'

export default function Landing()
{
    return(
        <>
            <h1>Bienvenue, </h1>

            <div className={styles.dashboardContentBoxes}>

                <div className={styles.dashboardContentBox}>
                    <h2>Nombre de station</h2>
                    <div className={styles.boxContent}>
                        <i class="fi fi-sr-marker dashboardContentBoxIcon" style={{marginRight: 30, marginTop: 30}}></i>
                        <h1>0</h1>
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


        </>
    )
}