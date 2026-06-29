import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserForm from './components/UserForm';
import FilterPopup from './components/FilterPopup';
import ConfirmDelete from './components/ConfirmDelete';
import { useUsers } from './hooks/useUsers';
import styles from './App.module.css';

// Simple toast system
let toastId = 0;
const Toast = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast toast-${t.type}`}>
        {t.type === 'success' ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5v4M8 10.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
        {t.message}
      </div>
    ))}
  </div>
);

export default function App() {
  const {
    users, visibleUsers, processedUsers,
    loading, error,
    searchQuery, filters, sortField, sortOrder,
    currentPage, pageSize, totalPages, startIndex, activeFiltersCount,
    addUser, editUser, removeUser,
    handleSort, handleSearch, handleFilter,
    setCurrentPage, handlePageSize,
  } = useUsers();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const handleAddUser = () => { setEditingUser(null); setShowForm(true); };
  const handleEditUser = (user) => { setEditingUser(user); setShowForm(true); };
  const handleDeleteUser = (user) => { setDeletingUser(user); };

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (editingUser) {
        await editUser(editingUser.id, form);
        addToast(`${form.firstName} ${form.lastName} updated successfully`);
      } else {
        await addUser(form);
        addToast(`${form.firstName} ${form.lastName} added successfully`);
      }
      setShowForm(false);
      setEditingUser(null);
    } catch {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    setDeleting(true);
    try {
      await removeUser(deletingUser.id);
      addToast(`${deletingUser.firstName} ${deletingUser.lastName} deleted`);
      setDeletingUser(null);
    } catch {
      addToast('Could not delete user. Please try again.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.app}>
      <Toast toasts={toasts} />

      <Header onAddUser={handleAddUser} totalUsers={users.length} />

      <main className={styles.main}>
        {error && (
          <div className={styles.errorBanner}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 6v4M9 11.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        <div className={styles.toolbar}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            onFilterClick={() => setShowFilter(true)}
            activeFiltersCount={activeFiltersCount}
          />
          <div className={styles.resultCount}>
            {!loading && (
              <span>{processedUsers.length} result{processedUsers.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>

        <div className={styles.card}>
          <UserTable
            users={visibleUsers}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            loading={loading}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={processedUsers.length}
            startIndex={startIndex}
            onPageChange={setCurrentPage}
            onPageSize={handlePageSize}
          />
        </div>
      </main>

      {showForm && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingUser(null); }}
          saving={saving}
        />
      )}

      {showFilter && (
        <FilterPopup
          filters={filters}
          onApply={handleFilter}
          onClose={() => setShowFilter(false)}
        />
      )}

      {deletingUser && (
        <ConfirmDelete
          user={deletingUser}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingUser(null)}
          deleting={deleting}
        />
      )}
    </div>
  );
}
