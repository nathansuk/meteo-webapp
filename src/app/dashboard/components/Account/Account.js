import styles from './styles.module.css'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'

export default function Account()
{

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")


    const [mdpErrors, setMdpErrors] = useState([])
    const [infosErrors, setInfosErrors] = useState([])

    const [showMdpErrors, setShowMdpErrors] = useState(false)
    const [showInfosErrors, setShowInfosErrors] = useState(false)

    async function sendForm(form) {

        const route = (form === "password") ? '/user/change-password' : "/user/change-infos"
        try{
            const response = await fetch(route, {
                method: 'POST',
                body: JSON.stringify({
                    token: localStorage.getItem('session_token'),
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }),
                headers: {
                    "content-type": "application/json"
                }
            })

            const jsonResponse = await response.json()

            console.log(jsonResponse)
            if(jsonResponse.errors) {
                setInfosErrors(jsonResponse.errors)
                setShowInfosErrors(true)
                return
            }
    
            console.log("success")

        } catch(err) {
            console.log("Erreur lors de la modification des informations générales : " + err)
        }


    }

    return (
        <div className={styles.account}>

            <h1>Compte</h1>

            <form className={styles.generalInfo} onSubmit={(e) => {
                e.preventDefault()
                sendForm("infos")
            }}>

                <h2>Informations générales</h2>

                { 
                    showInfosErrors && (
                        <div className={styles.formErrors}> 
                            <div className={styles.formErrorsTitle}>
                                <h3>Erreurs</h3>
                            </div>
                            <div className={styles.formErrorsContent}>
                                {
                                    infosErrors.map((error, index) => {
                                        return <span className={styles.error}> - {error}</span>
                                    })
                                }
                            </div>
                        </div>
                    )
                }

                
                <input 
                    type="text"
                    name="lastName"
                    placeholder="Nom" 
                    onChange={(e) => { setLastName(e.target.value)}}
                    value={lastName}
                >
                </input>

                <input 
                    type="text" 
                    name="firstName"
                    placeholder="Prénom" 
                    onChange={(e) => { setFirstName(e.target.value)}}
                    value={firstName}>
                </input>

                <input 
                    type="email" 
                    placeholder="Adresse email" 
                    name="email"
                    onChange={(e) => { setEmail(e.target.value)}}
                    value={email}>
                </input>

                <button type="submit">Modifier</button>

            </form>

            <form>
                
                <h2>Changement de mot de passe</h2>

                { 
                    showMdpErrors && (
                        <div className={styles.formErrors}> 
                            <div className={styles.formErrorsTitle}>
                                <h3>Erreurs</h3>
                            </div>
                            <div className={styles.formErrorsContent}>
                                {
                                    mdpErrors.map((error, index) => {
                                        return <span className={styles.error}> - {error}</span>
                                    })
                                }
                            </div>
                        </div>
                    )
                }

                <input type="password" placeholder="Ancien mot de passe"></input>
                <input type="password" placeholder="Nouveau mot de passe"></input>
                <input type="password" placeholder="Confirmation du mot de passe"></input>

                <button type="submit">Changer</button>

            </form>


        </div>
    )
}