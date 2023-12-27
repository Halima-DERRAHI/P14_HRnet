import React from 'react';
import styles from './Modal.module.css';

/**
 * Reusable modal component.
 * @param {object} props - The properties of the modal.
 * @param {string} props.icon - Image for the icon.
 * @param {string} props.message - Message displayed in the modal.
 * @param {string} props.buttonText - Text for the action button.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {Function} props.onButtonClick - Callback for button action.
 * @param {string} [props.buttonColor] - Background color for the action button.
 * @param {string} [props.className] - CSS class to customize the modal.
 * @returns {JSX.Element} Modal component.
 */

const Modal = ({ icon, message, buttonText, onClose, onButtonClick, buttonColor, className }) => {

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    } else if (event.key === 'Enter') {
      onButtonClick();
    }
  };

  const modalClass = className || styles.modal;

  return (
    <div className={styles.modalOverlay}>
      <div className={modalClass} onKeyDown={handleKeyDown} tabIndex={-1}>
        <div className={styles.modalHeader}>
          <span className={styles.closeBtn} onClick={onClose}>&times;</span>
        </div>
        <div className={styles.modalBody}>
          <span>{message}</span>
          {icon && <img src={icon} alt="Icon" className={styles.closeIcon} />}
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onButtonClick} style={{ backgroundColor: buttonColor }} autoFocus>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;