import LogInForm from "./LogInForm"
import styles from './NavBar.module.css'

function NavBar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-success">
                <div class="container-fluid">
                    <a class="navbar-brand text-white" href="#">Hike & Seek</a>
                    <a class="navbar-brand" href="#">
                        <img className={styles.icon} src="SolidForest.png" alt="Forest" width="45" height="36"></img></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Pricing</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <ul class="dropdown-menu">
                                    {/* <li><a class="dropdown-item" href="#">Action</a></li> */}
                                    <li><LogInForm /></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="p-3 mb-2 bg-primary text-white">.bg-primary</div>

        </div>
    )
}

export default NavBar

