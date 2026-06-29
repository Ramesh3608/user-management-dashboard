import React from 'react';
import styles from './Header.module.css';

const Header = ({ onAddUser, totalUsers }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoMark}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="7" height="7" rx="2" fill="#6366f1"/>
            <rect x="11" y="2" width="7" height="7" rx="2" fill="#6366f1" opacity="0.5"/>
            <rect x="2" y="11" width="7" height="7" rx="2" fill="#6366f1" opacity="0.5"/>
            <rect x="11" y="11" width="7" height="7" rx="2" fill="#6366f1"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>{totalUsers} total users</p>
        </div>
      </div>
      <button className={styles.addBtn} onClick={onAddUser}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Add User
      </button>
    </header>
  );
};

export default Header;
