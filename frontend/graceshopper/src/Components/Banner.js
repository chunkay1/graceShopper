import React, { useState } from 'react';
import styles from '../styles/Banner.module.css'


function Banner ({ bannerText = '' }) {
    const [textChanger, setTextChanger] = useState(bannerText)

    return (
    <div className={styles.mainDiv}>
      <header className={styles.header}></header>
      <div className={styles.banner}>
        <video autoPlay muted loop>
            <source src="mountainVideo.mp4" type="video/mp4"/>
            
        </video>
        <h2 className = {styles.fadeIn}>{bannerText ? bannerText : 'Adventure awaits'}</h2>
      </div>
      <footer className={styles.footer}></footer>
    </div>
    )
}

export default Banner