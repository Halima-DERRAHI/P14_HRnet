import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <div role="alert" aria-live="assertive" className={styles.textContainer}>
        <p className={styles.text}>Oups! La page que vous demandez n'existe pas.</p>
      </div>
      <Link to="/" className={styles.link} tabIndex={0}>
        Retourner sur la page d’accueil
      </Link>
    </div>
  );
}