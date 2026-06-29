import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange, onFilterClick, activeFiltersCount }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrap}>
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          className={styles.input}
          placeholder="Search by name or email…"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label="Search users"
        />
        {value && (
          <button className={styles.clear} onClick={() => onChange('')} aria-label="Clear search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
      <button className={styles.filterBtn} onClick={onFilterClick}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Filters
        {activeFiltersCount > 0 && (
          <span className={styles.badge}>{activeFiltersCount}</span>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
