import React from 'react'
import styles from './NavigationBar.module.scss'

const NavigationBar = () => {
  return (
    <div className={styles.navContainer}>
        <nav className={styles.navBar}>
            <div className={styles.logo}>Movies.</div>
            <div className={styles.navOptions}>
                <a className={styles.options} href="#upcoming">Upcoming</a>
                <a className={styles.options} href="#toprated">Top Rated</a>
                <a className={styles.options} href="#popular">Popular</a>
            </div>
        </nav>
    </div>
  )
}

export default NavigationBar