import React, { useState, useEffect, useRef } from 'react';
import { DEPARTMENTS } from '../utils/constants';
import styles from './FilterPopup.module.css';

const FilterPopup = ({ filters, onApply, onClose }) => {
  const [local, setLocal] = useState({ ...filters });
  const ref = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleChange = (field, value) => {
    setLocal(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  const handleReset = () => {
    const empty = { firstName: '', lastName: '', email: '', department: '' };
    setLocal(empty);
    onApply(empty);
    onClose();
  };

  const hasAny = Object.values(local).some(Boolean);

  return (
    <div className="overlay-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.popup} ref={ref} role="dialog" aria-label="Filter users">
        <div className={styles.header}>
          <h2 className={styles.title}>Filter Users</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filter">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>First Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g. John"
              value={local.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Last Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g. Doe"
              value={local.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g. john@example.com"
              value={local.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Department</label>
            <select
              className={styles.select}
              value={local.department}
              onChange={e => handleChange('department', e.target.value)}
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.resetBtn} onClick={handleReset} disabled={!hasAny}>
            Clear All
          </button>
          <button className={styles.applyBtn} onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
