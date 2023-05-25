'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import React from "react"
import { NextResponse } from 'next/server'
import {useState, useEffect} from "react"
import withAuth from '../middleware/auth'

export default function Login()
{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    useEffect( () => {
        const token = localStorage.getItem('session_token')
        if(token)
        {
            window.location.href = '/dashboard'
        }
    })

    async function loginUser() {

        try {
            const response = await fetch("/auth/login", {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "content-type": "application/json"
                }
            })

            const jsonResponse = await response.json()

            if(jsonResponse.errors)
            {
                setErrors(jsonResponse.errors)
                console.log(errors)
                return
            }

            localStorage.setItem('session_token', jsonResponse.token)
            window.location.href('/dashboard')
            console.log(jsonResponse)


        } catch(err) {
            console.log(err)
        }

    }

    return (
        <main className={styles.main}>

        <div className={styles.loginLeft}>

            <div className={styles.loginView}>
                
                <h1 className={styles.loginTitle}>Bienvenue !</h1>
                <span className={styles.loginTitleCaption}>Accédez aux données de vos appareils en vous connectant</span>
                <button className={styles.googleAuth}>
                    <Image src="/google.png" width={25} height={25} className={styles.googleAuthImage}></Image>
                    <span className={styles.googleAuthText}>Connexion avec Google</span>
                    </button>

                <div className={styles.loginSeparator}>

                        <div className={styles.lineSeparator}></div>
                        <span className={styles.loginSeparatorText}>ou</span>
                        <div className={styles.lineSeparator}></div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    loginUser()
                }} 
                className={styles.loginForm}>

                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Adresse mail"
                        onChange={(e) => { setEmail(e.target.value)}}
                        value={email}
                        className={styles.loginFormInput}>
                    </input>

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Mot de passe" 
                        onChange={(e) => { setPassword(e.target.value)}}
                        value={password}
                        className={styles.loginFormInput}>
                    </input>

                    <a href='#' className={styles.forgotPasswordLink}>Mot de passe oublié ?</a>

                    <button type='submit' className={styles.loginButton}>Connexion</button>
                </form>

                <div className={styles.separator}></div>

                <span className={styles.registerPhrase}>Nouveau sur Meteo ? <Link href="/register" className={styles.registerLink}>Inscrivez-vous</Link></span>

            </div>
        
        </div>

        <div className={styles.loginRight}>

                <span className={styles.loginQuote}>
                    Meteo est votre compagnon permettant d'obtenir en temps réel vos données météorologies
                </span>

        </div>


        </main>
    )
}