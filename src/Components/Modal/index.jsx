import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ icon, title, buttonText, onClose, onButtonClick }) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
            <span className={styles.closeBtn} onClick={onClose}>&times;</span>
        </div>
        <div className={styles.modalBody}>
            <span>{title}</span>
            {icon && <img src={icon} alt="Icon" className={styles.closeIcon} />}
        </div>
        <div className={styles.modalFooter}>
            <button onClick={handleButtonClick} className={styles.modalbutton} >{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;