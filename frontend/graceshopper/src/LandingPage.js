import React from 'react';
import styles from './LandingPage.module.css'


function LandingPage () {
    return (
    <body>
      <header></header>
      <div className={styles.banner}>
        <video autoPlay muted loop>
            <source src="mixkit-landscape-of-a-large-lake-during-sunset-from-the-air-4998.mp4" type="video/mp4"/>
        </video>
        <h2 className = {styles.fadeIn}>Outspire</h2>
        <img className={styles.fadeIn2} id="mountain" height = "250px" src ="Icy-Mountains-Transparent-Background.png" alt = "moutain png"/>
        <div className={`${styles.container} ${styles.fadeIn2}`}>

            <a href="#" className={styles.button}>
              <div className={styles.button__line}></div>
              <div className={styles.button__line}></div>
              <span className={styles.button__text}>Explore</span>
              <div className={styles.button__drow1}></div>
              <div className={styles.button__drow2}></div>
            </a>
          
        </div>
    </div>
    <footer></footer>
 </body>
    )
}

export default LandingPage