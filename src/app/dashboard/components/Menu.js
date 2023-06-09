'use client'
import styles from '../styles.module.css'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'

export default function Menu({ firstName, lastName, onMenuItemClick})
{

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('session_token')
        window.location.href = '/login'
        return
    }
    
    return (
        <div className={styles.navigation}>

        <div className={styles.navigationContent}>

        <h1 className={styles.navigationTitle}>T-laloc</h1>

        <div className={styles.navigationUserBox}>

            <div className={styles.navigationUserBoxPic} style={{
                width:100 + 'px', 
                height: 100 + 'px', 
                backgroundImage: "url('http://localhost:3000/icons/des-arbres.png')", 
                backgroundSize: 'cover',
                borderRadius:100 + '%',
                margin: 'auto',
                }}>
            </div>

            <span className={styles.navigationUserBoxName}>
                {firstName} {lastName}
            </span>

        </div>  

            <nav className={styles.navigationList}>
                <ul className={styles.elements}>
                    <li onClick={() => onMenuItemClick('landing')} className={styles.element}><span className={styles.elementContent}><i className="fi fi-rr-apps elementIcone"></i><span className={styles.elementText}>Accueil</span></span></li>
                    <li onClick={() => onMenuItemClick('apparels')} className={styles.element}><span className={styles.elementContent}><i className="fi fi-rr-marker elementIcone"></i><span className={styles.elementText}>Appareils</span></span></li>
                    <li onClick={() => onMenuItemClick('account')} className={styles.element}><span className={styles.elementContent}><i className="fi fi-rr-user elementIcone"></i><span className={styles.elementText}>Compte</span></span></li>
                </ul>
            </nav>


        </div>
    
        <button 
        className={styles.navigationLogoutButton}
        onClick={logout}>Déconnexion
        </button>

        
        </div>  
    )
}