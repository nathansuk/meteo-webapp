'use client'
import styles from './styles.module.css'
import {React, ReactDOM} from 'react'
import {useState, useEffect} from 'react'
import Menu from './components/Menu'
import Landing from './components/Landing/Landing'
import Account from './components/Account/Account'
import Modal from './components/Modal'
import UserStation from './components/Station/UserStation'

export default function Dashboard()
{
    const [user, setUser] = useState({})
    const [pageContent, setPageContent] = useState(<Landing />)
    const [errors, setErrors] = useState([])

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

        const user = getUser(token)
        console.log(user)

        if(!user) 
        {
            window.location.href = '/login'
            console.log("Utilisateur inexistant")
        }
    }, [])

    const handleMenuClick = (content) => {
        switch (content) {
            case 'landing':
              setPageContent(<Landing />);
              break;
            case 'apparels':
              setPageContent(<UserStation />)
              break;
            case 'account':
              setPageContent(<Account />)
              break;
            default:
              setPageContent(<Landing />);
          }
    }

    const modalData = {
        name: "Température"
    }

    const handleClick = () => {
        console.log("clicked on")
    }

    return (

        <main className={styles.dashboardMain}>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css'></link>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
                
                <Modal modalDatas={modalData} />

                <Menu firstName={user.firsName} lastName={user.lastName} onMenuItemClick={handleMenuClick}/>

                
                <div className={styles.dashboardContent}>

                    { pageContent }
                
                </div>  



        </main>



    )





}