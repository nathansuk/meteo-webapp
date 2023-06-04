'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'
import StatisticBox from './components/StatisticBox'
import StationData from './components/StationData'
import Menu from './components/Menu'
import Landing from './components/Landing/Landing'

export default function Dashboard()
{
    const [user, setUser] = useState({})
    const [pageContent, setPageContent] = useState(<Landing />)

    async function getUser(token) {

        try {
            const response = await fetch('/user/get/'+token, {
                method: 'GET'
            })
    
            const data = await response.json()
    
            if(data.errors) {
                setErrors(data.errors)
                console.log("Erreur" + errors)
                return
            }

            setUser(data)
            console.log(user)
    
        } catch(err) {
            setErrors(err)
            console.log(err)
        }
    
    }

    useEffect( () => {
        const token = localStorage.getItem('session_token')
        if(!token)
        {
            window.location.href = '/login'
            return
        }

        getUser(token)
    }, [])

    const handleMenuClick = (content) => {
        switch (content) {
            case 'landing':
              setPageContent(<Landing />);
              break;
            case 'apparels':
              console.log('Appareils')
              break;
            case 'account':
              console.log('Mon compte')
              break;
            default:
              setPageContent(<Landing />);
          }
    }


    return (

        <main className={styles.dashboardMain}>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css'></link>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>

                <Menu firstName={user.firsName} lastName={user.lastName} onMenuItemClick={handleMenuClick}/>

                <div className={styles.dashboardContent}>

                    { pageContent }
                
                </div>  



        </main>



    )





}