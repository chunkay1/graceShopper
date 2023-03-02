import React, { useEffect, useState } from 'react';
import styles from '../styles/Banner.module.css'


function Banner ({ text }) {

    return (
    <div className='mainDiv'>
      <header></header>
      <div className={styles.banner}>
        <video autoPlay muted loop>
            <source src="mixkit-landscape-of-a-large-lake-during-sunset-from-the-air-4998.mp4" type="video/mp4"/>
        </video>
        <h2 className = {styles.fadeIn}>{text ? text : 'Adventure awaits'}</h2>
    </div>
    <footer></footer>
 </div>
    )
}

export default Banner