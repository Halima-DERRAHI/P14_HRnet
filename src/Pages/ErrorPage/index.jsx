import React from 'react';
import { Link } from 'react-router-dom'
import styles from './ErrorPage.module.css'

export default function ErrorPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <div className={styles.textContainer}>
                <p className={styles.text}>Oups! La page que </p>
                <p className={styles.text}>vous demandez n'existe pas.</p>
            </div>
            <Link to="/" className={styles.link}>Retourner sur la page d’accueil</Link>
        </div>
    )
}