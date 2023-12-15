import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <header className={styles.header}>
        <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="Logo" />
            <p className={styles.logoTitle}>Wealth Health</p>
        </div>
        <p className={styles.title}>HRNet</p>
        <div className={styles.linksContainer}>
        <NavLink to="/" className={styles.link}>
          <i className={`fas fa-plus-circle ${styles.icon}`}></i>
          Create a new employee
        </NavLink>
        <NavLink to="/view" className={styles.link}>
          <i className={`fas fa-list-ul ${styles.icon}`}></i>
          View current employees
        </NavLink>
      </div>
    </header>
  );
}

export default NavBar;