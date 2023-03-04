import LogInForm from "./LogInForm"
import styles from '../styles/NavBar1.module.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { logOut } from "../api/userRequests"
import { BASEURL } from "../constants/constants"

function NavBar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-success">
                <div class="container-fluid">

                    <div className={styles.TitleandIcon}>
                        <a
                            class="navbar-brand text-white"
                            href="home">Hike & Seek</a>
                        <a
                            class="navbar-brand"
                            href="www.google.com">
                            <img
                                className={styles.icon}
                                src="SolidForest.png"
                                alt="Forest"
                                width="45"
                                height="36">
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

                                {/* <li className={`nav-item dropdown ${styles.dropdown}`}> */}
                                <li className={`nav-item dropdown`}>
                                    <a
                                        class="nav-link dropdown-toggle text-white"
                                        href={`${BASEURL}`}
                                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Log In
                                    </a>

                                    <ul
                                        className={`dropdown-menu dropdown-menu-lg-end ${styles.dropdown}`}>
                                        {/* <li><a class="dropdown-item" href="#">Action</a></li> */}
                                        <li><LogInForm /></li>
                                    </ul>
                                </li>

                                <li class="nav-item">
                                <button 
                                    type="button" 
                                    class="btn btn-link text-white" 
                                    onClick={ (event) => {
                                        event.preventDefault();
                                        console.log('logout!');
                                        logOut();
                                    }}>LogOut</button>
                                </li>

                                <li class="nav-item">
                                    <a
                                        class="nav-link text-white" href="products">Products
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link text-white"
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

