import styles from './styles.module.css'
import Image from 'next/image'

export default function Dashboard()
{

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
                            Nathan SUK
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
                
                <button className={styles.navigationLogoutButton}>Déconnexion</button>

                </div>  




        </main>



    )





}