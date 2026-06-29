import React from 'react';
import { getDepartmentColor, getInitials } from '../utils/helpers';
import styles from './UserTable.module.css';

const SortIcon = ({ field, sortField, sortOrder }) => {
  const active = field === sortField;
  return (
    <span className={`${styles.sortIcon} ${active ? styles.active : ''}`}>
      {active && sortOrder === 'desc' ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 9L2 4h8L6 9z" fill="currentColor"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 3l4 5H2L6 3z" fill="currentColor"/>
        </svg>
      )}
    </span>
  );
};

const UserTable = ({ users, sortField, sortOrder, onSort, onEdit, onDelete, loading }) => {
  const cols = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  if (loading) {
    return (
      <div className={styles.skeletonWrap}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            {[...Array(6)].map((_, j) => (
              <div key={j} className={styles.skeletonCell} style={{ width: `${[40, 100, 100, 180, 90, 80][j]}px` }} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className={styles.empty}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="var(--color-border)" strokeWidth="2"/>
          <path d="M16 24h16M24 16v16" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className={styles.emptyTitle}>No users found</p>
        <p className={styles.emptyText}>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {cols.map(col => (
              <th
                key={col.key}
                className={`${styles.th} ${col.sortable ? styles.sortable : ''} ${col.key === sortField ? styles.activeCol : ''}`}
                onClick={col.sortable ? () => onSort(col.key) : undefined}
              >
                {col.label}
                {col.sortable && <SortIcon field={col.key} sortField={sortField} sortOrder={sortOrder} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={styles.row}>
              <td className={styles.td}>
                <span className={styles.idBadge}>#{user.id}</span>
              </td>
              <td className={styles.td}>
                <div className={styles.nameCell}>
                  <div
                    className={styles.avatar}
                    style={{ background: getDepartmentColor(user.department) + '22', color: getDepartmentColor(user.department) }}
                  >
                    {getInitials(user.firstName, user.lastName)}
                  </div>
                  {user.firstName}
                </div>
              </td>
              <td className={styles.td}>{user.lastName}</td>
              <td className={styles.td}>
                <a href={`mailto:${user.email}`} className={styles.emailLink}>{user.email}</a>
              </td>
              <td className={styles.td}>
                <span
                  className={styles.deptBadge}
                  style={{ background: getDepartmentColor(user.department) + '1a', color: getDepartmentColor(user.department), borderColor: getDepartmentColor(user.department) + '40' }}
                >
                  {user.department}
                </span>
              </td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => onEdit(user)} aria-label="Edit user">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => onDelete(user)} aria-label="Delete user">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 4h10M5 4V3h4v1M6 7v3M8 7v3M3 4l1 8h6l1-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
