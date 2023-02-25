import styles from './Dropdown.module.css'

function Dropdown() {
    return (
        <div className={styles.container}>
            <h4>Log In</h4>
            <form
                onSubmit={
                    (event) => {
                        event.preventDefault();
                        console.log('Submit Form')
                    }
                }
            >
                <div className={styles.input}>
                    <input
                        type="text"
                        name='username'
                        placeholder='Enter Username'
                        id='username'
                        required
                    />
                </div>

                <div className={styles.input}>
                    <input
                        type="password"
                        name='password'
                        placeholder='Enter Password'
                        id='password'
                        required
                    />
                </div>

                <div className={styles.submit}>
                    <button className={styles.button}>Log In</button>
                </div>
            </form>

        </div>
    )
}

export default Dropdown;