import React, { useState, useEffect } from 'react';
import { validateUserForm, hasErrors } from '../utils/validators';
import { DEPARTMENTS } from '../utils/constants';
import styles from './UserForm.module.css';

const EMPTY_FORM = { firstName: '', lastName: '', email: '', department: '' };

const UserForm = ({ user, onSave, onClose, saving }) => {
  const isEdit = Boolean(user);
  const [form, setForm] = useState(isEdit ? { ...user } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errs = validateUserForm({ ...form, [field]: value });
      setErrors(prev => ({ ...prev, [field]: errs[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validateUserForm(form);
    setErrors(prev => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateUserForm(form);
    setErrors(errs);
    setTouched({ firstName: true, lastName: true, email: true, department: true });
    if (hasErrors(errs)) return;
    onSave(form);
  };

  const fields = [
    { key: 'firstName', label: 'First Name', type: 'text', placeholder: 'e.g. Jane' },
    { key: 'lastName',  label: 'Last Name',  type: 'text', placeholder: 'e.g. Smith' },
    { key: 'email',     label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
  ];

  return (
    <div className="overlay-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-label={isEdit ? 'Edit user' : 'Add user'}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{isEdit ? 'Edit User' : 'Add New User'}</h2>
            <p className={styles.subtitle}>{isEdit ? `Updating details for #${user.id}` : 'Fill in the details below'}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.body}>
            {fields.map(f => (
              <div key={f.key} className={styles.field}>
                <label className={styles.label}>{f.label}</label>
                <input
                  className={`${styles.input} ${errors[f.key] && touched[f.key] ? styles.inputError : ''}`}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => handleChange(f.key, e.target.value)}
                  onBlur={() => handleBlur(f.key)}
                />
                {errors[f.key] && touched[f.key] && (
                  <span className={styles.error}>{errors[f.key]}</span>
                )}
              </div>
            ))}

            <div className={styles.field}>
              <label className={styles.label}>Department</label>
              <select
                className={`${styles.select} ${errors.department && touched.department ? styles.inputError : ''}`}
                value={form.department}
                onChange={e => handleChange('department', e.target.value)}
                onBlur={() => handleBlur('department')}
              >
                <option value="">Select a department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && touched.department && (
                <span className={styles.error}>{errors.department}</span>
              )}
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? (
                <><span className={styles.spinner} /> Saving…</>
              ) : (
                isEdit ? 'Save Changes' : 'Add User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
