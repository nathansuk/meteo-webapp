import styles from './styles.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Login()
{
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

                <form method="POST" action="" className={styles.loginForm}>
                    <input type="text" name="email" placeholder="Adresse mail" className={styles.loginFormInput}></input>
                    <input type="password" name="password" placeholder="Mot de passe" className={styles.loginFormInput}></input>

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