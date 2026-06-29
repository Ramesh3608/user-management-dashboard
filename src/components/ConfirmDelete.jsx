import React, { useEffect } from 'react';
import styles from './ConfirmDelete.module.css';

const ConfirmDelete = ({ user, onConfirm, onCancel, deleting }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div className="overlay-backdrop" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className={styles.modal} role="dialog" aria-label="Confirm delete">
        <div className={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 9v6M14 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5.07 21.5L14 5l8.93 16.5H5.07z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className={styles.title}>Delete User?</h2>
        <p className={styles.body}>
          You are about to permanently delete{' '}
          <strong>{user.firstName} {user.lastName}</strong>.
          This action cannot be undone.
        </p>
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onCancel}>Keep User</button>
          <button className={styles.deleteBtn} onClick={onConfirm} disabled={deleting}>
            {deleting ? (
              <><span className={styles.spinner} />Deleting…</>
            ) : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
