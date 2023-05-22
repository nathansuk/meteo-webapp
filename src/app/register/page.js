'use client'
import styles from './styles.module.css'
import loginStyles from '../login/styles.module.css'
import Link from 'next/link'
import React from "react"
import {useState} from "react"


export default function Register()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showErrors, setShowErrors] = useState(false)
    const [errors, setErrors] = useState([])

    async function registerUser () {
        try {
            const response = await fetch('/auth/register', {
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
                setShowErrors(true)
                setErrors(jsonResponse.errors)
            }
            


        } catch(err) {
            console.log(err)
        }
    }

    return (
    <main className={styles.main}>


     <div className={styles.registerView}>
        
        <h1 className={[loginStyles.loginTitle, styles.registerFormTitle ]}>Inscription</h1>
        
        {
            showErrors &&
            <div className={styles.registerFormError}>
                <div className={styles.registerFormErrorTitle}>
                    <h2>Erreurs</h2>
                </div>
                <div className={styles.errorList}>
                    {
                        errors.map((error, index) => {
                            return <span> • {error}</span>
                        })
                    }
                </div>
            </div>
        }
        
    

        <form onSubmit={(e) => {
            e.preventDefault() 
            registerUser()
        }} 
        className={styles.registerForm}>

            <input 
                type='email' 
                name='email' 
                placeholder='Adresse mail'
                onChange = {(e) => { setEmail(e.target.value)}}
                value = {email}
                className={loginStyles.loginFormInput}>
             </input>

            <input 
                type='password' 
                name='password' 
                placeholder='Mot de passe' 
                onChange={(e) => { setPassword(e.target.value)}}
                value = {password}
                className={loginStyles.loginFormInput} 
                minLength={8}>
            </input>

            <button type='submit' className={loginStyles.loginButton}>Inscription</button>

            <Link href="/login" className={styles.backLogin}> &larr; Retour </Link>

        </form>
        
        
        
    </div> 


    </main> 



    )
}