import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, ariaLabel, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.content}
        onClick={event => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="icon-close" size={16} className={styles.closeIcon} />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  ariaLabel: 'Modal window',
};

export default Modal;
