import React from 'react';
import { PAGE_SIZE_OPTIONS } from '../utils/constants';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, pageSize, totalItems, startIndex, onPageChange, onPageSize }) => {
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '…', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages);
    }
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className={styles.pagination}>
      <div className={styles.info}>
        Showing <strong>{totalItems === 0 ? 0 : startIndex + 1}–{endIndex}</strong> of <strong>{totalItems}</strong>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {getPages().map((page, i) =>
          page === '…' ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
          ) : (
            <button
              key={page}
              className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )
        )}

        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.sizeSelect}>
        <span className={styles.sizeLabel}>Rows:</span>
        <select
          className={styles.select}
          value={pageSize}
          onChange={e => onPageSize(Number(e.target.value))}
          aria-label="Rows per page"
        >
          {PAGE_SIZE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
