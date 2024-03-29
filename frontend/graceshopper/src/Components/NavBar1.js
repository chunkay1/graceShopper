import LogInForm from "./LogInForm"
import styles from '../styles/NavBar1.module.css'
import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"
import { logOut } from "../api/userRequests"
import { BASEURL } from "../constants/constants"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function NavBar({ token }) {
    const [loginDropdown, setLoginDropdown] = useState(true)

    const navigate = useNavigate()


    return (
        <div>
            <nav class={`navbar navbar-expand-lg bg-success ${styles.mainBar}`}>
                <div class="container-fluid">

                    <div className={styles.TitleandIcon}>
                        <a
                            className={`navbar-brand text-white ${styles.title}`}
                            href="home">Hike & Seek</a>
                        <a
                            class="navbar-brand"
                            href="www.google.com">
                            <img
                                className={`nav-item ${styles.icon}`}
                                src="TransparentMountains.png"
                                alt="Forest"
                                width="100"
                                height="50">
                            </img>
                        </a>
                    </div>


                    <div className={styles.links}>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">

                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div
                            class="collapse navbar-collapse" id="navbarNavDropdown">

                            <ul class="navbar-nav">

                                <li class="nav-item">
                                    <a
                                        class="nav-link active text-white" aria-current="page"
                                        href="home">Home
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a
                                        class="nav-link text-white" href="products">Products
                                    </a>
                                </li>

                                {
                                    (!token && loginDropdown)

                                    ?

                                <li className={`nav-item dropdown`}>
                                    <a
                                        class="nav-link dropdown-toggle text-white"
                                        href={`${BASEURL}`}
                                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Log In
                                    </a>

                                    <ul className={`dropdown-menu dropdown-menu-lg-end ${styles.dropdown}`}>
                                        <li>
                                            <LogInForm 
                                              loginDropdown = {loginDropdown} 
                                              setLoginDropdown = {setLoginDropdown}
                                            />
                                        </li>
                                    </ul>
                                </li>

                                    :

                                    <li className={`nav-item ${styles.logOut}`}>
                                        <button 
                                            type="button" 
                                            className={`btn text-white ${styles.logOut}`} 
                                            onClick={ (event) => {
                                                console.log('logout!');
                                                logOut();
                                                navigate('/home');
                                                window.location.reload();
                                            }}>Logout</button>
                                    </li>
                                }

                                <li className="nav-item">
                                    <a
                                        class="nav-link text-white" 
                                        className={`nav-link text-white ${styles.profileIconLi}`}
                                        href="profile">
                                        
                                        <i className={`bi bi-person-square ${styles.profileIcon}`}></i>

                                            
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a
                                        class="nav-link text-white"
                                        className={`nav-link text-white ${styles.cartIconLi}`}
                                        href="cart">

                                        <i className={`bi bi-cart text-white ${styles.cartIcon}`}></i>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>



        </div>
    )
}

export default NavBar

