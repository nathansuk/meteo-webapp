import React from "react"
import styles from '../../styles.module.css'
import Image from "next/image"
import { useEffect, useState } from "react"

export default function UserStation() {

    const [stations, setStations] = useState([])
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [stationToAdd, setStationToAdd] = useState("")
    const [favoriteStation, setFavoriteStation] = useState()

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
            setStations(data["userStations"])
            setFavoriteStation(data['favoriteStation'])
            console.log("Station favorite : " + favoriteStation)
    
        } catch(err) {
            setErrors(err)
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    
    }

    const addStation = async(stationName) => {

        try {
            const response = await fetch('/user/add-station', {
                method: 'POST',
                body: JSON.stringify({
                        token: localStorage.getItem('session_token'),
                        stationName: stationName
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
    
            const data = await response.json()
            console.log(data)
            if(data.errors) {
                setErrors(data.errors)
                setShowErrors(true)
                console.log("Erreur" + errors)
                return
            }
    
        } catch(err) {
            setErrors(err)
            setShowErrors(true)
            console.log(err)
        } finally {
            setIsLoading(false)
        }


    }

    const handleAddStationForm = () => {
        addStation(stationToAdd)
    }

    useEffect(() => {

        const user = getUser(localStorage.getItem('session_token'))
        if(!user) {
            window.location.href = '/login'
            return
        }

    }, [favoriteStation])

    const handleFavButton = async(name) => {
        try {
            const response = await fetch('/user/fav-station', {
                method: 'POST',
                body: JSON.stringify({
                        token: localStorage.getItem('session_token'),
                        stationName: name
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
    
            const data = await response.json()
            console.log(data)
            if(data.errors) {
                setErrors(data.errors)
                setShowErrors(true)
                console.log("Erreur" + errors)
                return
            }

            setFavoriteStation(name)
    
        } catch(err) {
            setErrors(err)
            setShowErrors(true)
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }



    return (

        <>
            <h1>Mes Appareils</h1>


            <div className={styles.userStationsList}>
                {isLoading ? (
                    <p>Chargement en cours...</p>
                ) : (
                    <>
                        {stations.map((item) => (
                            <div className={styles.userStationBox} key={item.stationName}>
                                <i className={`${styles.favoriteIcon} fi ${(item._id === favoriteStation) ? 'fi-sr-heart': 'fi-rr-heart'}`} 
                                onClick={(e) => {handleFavButton(item.stationName)}}></i>
                                <Image
                                    src="/icons/measurement.png"
                                    width={200}
                                    height={200}
                                    alt="Station image"
                                />
                                <h2>{item.stationName}</h2>
                            </div>
                        ))}
                    </>
                )}
                
                <div className={styles.userStationBoxButton}>
                    
                    <form className={styles.addStationForm} onSubmit={(e) => {e.preventDefault(); handleAddStationForm()}}>
                        <h2>Ajouter une station</h2>

                        {showErrors && 
                            <div className={styles.addStationError}>
                                <span><i class="fi fi-sr-cross-circle"></i>{errors.toString()}</span>
                            </div>
                        }

                        <input 
                            type="text"
                            name="lastName"
                            placeholder="Nom" 
                            onChange={(e) => { setStationToAdd(e.target.value)}}
                            value={stationToAdd}
                        ></input>
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            </div>
        </>

    )



}