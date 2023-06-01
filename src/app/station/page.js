'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'
import io from "socket.io-client"

export default function Station()
{



    const sendMessage = () => {
        const socket = io("ws://localhost:8080")
        console.log("Salut")
    }

    return(
    <main className={styles.stationMain}>

        <h1>SOCKET</h1>
        <button onClick={sendMessage}>Envoyer message</button>


    </main>
    )
}

