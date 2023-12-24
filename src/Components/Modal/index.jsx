import React, { useEffect } from 'react';
import styles from './Modal.module.css';

/**
 * Reusable modal component.
 * @param {object} props - The properties of the modal.
 * @param {string} props.icon - Image for the icon.
 * @param {string} props.message - Message displayed in the modal.
 * @param {string} props.buttonText - Text for the action button.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {Function} props.onButtonClick - Callback for button action.
 * @param {string} [props.className] - CSS class to customize the modal.
 * @returns {JSX.Element} Modal component.
 */

const Modal = ({ icon, message, buttonText, onClose, onButtonClick, className }) => {

  const modalClass = className || styles.modal;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Enter') {
        onButtonClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onButtonClick]);

  return (
    <div className={styles.modalOverlay}>
      <div className={modalClass}>
        <div className={styles.modalHeader}>
          <span className={styles.closeBtn} onClick={onClose}>&times;</span>
        </div>
        <div className={styles.modalBody}>
          <span>{message}</span>
          {icon && <img src={icon} alt="Icon" className={styles.closeIcon} />}
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onButtonClick} autoFocus>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;