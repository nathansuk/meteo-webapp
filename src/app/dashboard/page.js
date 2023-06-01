'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

export default function Dashboard()
{

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    const [user, setUser] = useState({})
    const [errors, setErrors] = useState([])
    const [stationData, setStationData] = useState()

    const [stationDataPressure, setStationDataPressure] = useState([])
    const [stationDataPressureDate, setStationDataPressureDate] = useState([])

    async function getStationData()
    {
        try {

            const response = await fetch('/station/data/ESIEE-1', {
                method: 'GET'
            })

            const data = await response.json()
            setStationData(data)

            const pressureDatas = []
            const dataDates = []

            data.forEach(item => {
                pressureDatas.push(item.datas.pressure)
                const dateFormatted = new Date(item.dataDate)
                dataDates.push(dateFormatted.getHours() + " : " + dateFormatted.getMinutes())
            });

            
            setStationDataPressure(pressureDatas)
            setStationDataPressureDate(dataDates)

            console.log(pressureDatas)
            console.log(dataDates)

        } catch(err) {
            console.log("Erreur lors de la récupération des données de la station" + err)
            setErrors(err)
        }
    }



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

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('session_token')
        window.location.href = '/login'
        return
    }

    
    useEffect( () => {
        const token = localStorage.getItem('session_token')
        if(!token)
        {
            window.location.href = '/login'
            return
        }

        getUser(token)
        getStationData()
    }, [])

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Line Chart',
        },
      },
    };

    const labels = stationDataPressureDate

    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: stationDataPressure,
          tension: 0.4,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: stationDataPressureDate,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
      ],
    };

    return (

        <main className={styles.dashboardMain}>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css'></link>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>

                <div className={styles.navigation}>

                    <div className={styles.navigationContent}>

                    <h1 className={styles.navigationTitle}>Meteo</h1>

                    <div className={styles.navigationUserBox}>

                        <div className={styles.navigationUserBoxPic} style={{
                            width:100 + 'px', 
                            height: 100 + 'px', 
                            backgroundImage: "url('https://p325k7wa.twic.pics/high/cyberpunk/cyberpunk-2077/00-page-setup/cp2077_game-thumbnail.jpg?twic=v1/resize=760/step=10/quality=80')", 
                            backgroundSize: 'cover',
                            borderRadius:100 + '%',
                            margin: 'auto',
                            }}>
                        </div>

                        <span className={styles.navigationUserBoxName}>
                            {user.firstName} {user.lastName}
                        </span>
                        
                        <a href="#" className={styles.navigationEditProfile}>Editer mon profil</a>

                    </div>  

                        <nav className={styles.navigationList}>
                            <ul className={styles.elements}>
                                <li className={styles.element}><span className={styles.elementContent}><i className="fi fi-rr-apps elementIcone"></i><span className={styles.elementText}>Accueil</span></span></li>
                                <li className={styles.element}><span className={styles.elementContent}><i className="fi fi-rr-marker elementIcone"></i><span className={styles.elementText}>Appareil</span></span></li>
                                <li className={styles.element}><span className={styles.elementContent}><i className="fi fi-rr-user elementIcone"></i><span className={styles.elementText}>Mon compte</span></span></li>
                            </ul>
                        </nav>


                    </div>
                
                <button 
                className={styles.navigationLogoutButton}
                onClick={logout}>Déconnexion</button>

                
                </div>  

                <div className={styles.dashboardContent}>

                    <h1>Bienvenue, </h1>

                    <div className={styles.dashboardContentBoxes}>

                        <div className={styles.dashboardContentBox}>
                            <h2>Nombre de station</h2>
                            <div className={styles.boxContent}>
                                <i class="fi fi-sr-marker dashboardContentBoxIcon" style={{marginRight: 30, marginTop: 30}}></i>
                                <h1>5</h1>
                            </div>
                        </div>

                        <div className={styles.dashboardContentBox}>
                            <h2>Stat au pif</h2>
                            <div className={styles.boxContent}>
                                <i class="fi fi-sr-info dashboardContentBoxIcon" style={{marginRight: 30, marginTop: 30}}></i>
                                <h1>38</h1>
                            </div>
                        </div>

                        <div className={styles.dashboardContentBox}>
                            <h2>Ajouter une station</h2>
                            <div className={styles.boxContent}>
                                
                                <h1>C'est ici</h1>
                            </div>
                        </div>


                    </div>  


                    <h2>Station favorite (ESIEE-1)</h2>

                    <div className={styles.dashboardStationBox}>
                        <h2><i class="fi fi-sr-dashboard"></i>Pression</h2>
                        <Line options={options} data={data} />
                    </div>

                </div>  



        </main>



    )





}