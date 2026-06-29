import { DEPARTMENTS } from './constants';

/**
 * Maps raw JSONPlaceholder user to our app's user schema.
 * Assumption: Full name is split at the first space for first/last name.
 * Assumption: Department is assigned cyclically from DEPARTMENTS list.
 */
export const mapApiUser = (user, index = 0) => {
  const parts = user.name.trim().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  const department = DEPARTMENTS[index % DEPARTMENTS.length];

  return {
    id: user.id,
    firstName,
    lastName,
    email: user.email,
    department,
  };
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
};

export const getDepartmentColor = (dept) => {
  const colors = {
    Engineering: '#6366f1',
    Marketing:   '#ec4899',
    Sales:       '#f59e0b',
    HR:          '#10b981',
    Finance:     '#3b82f6',
    IT:          '#8b5cf6',
    Design:      '#f97316',
    Operations:  '#06b6d4',
  };
  return colors[dept] || '#64748b';
};

export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);
