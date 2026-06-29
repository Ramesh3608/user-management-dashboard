import { useState, useEffect, useCallback, useMemo } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { mapApiUser, generateId } from '../utils/helpers';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search / filter / sort / pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers();
      const mapped = response.data.map((u, i) => mapApiUser(u, i));
      setUsers(mapped);
    } catch (err) {
      setError('Failed to load users. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const addUser = useCallback(async (formData) => {
    const response = await createUser(formData);
    const newUser = {
      id: response.data.id || generateId(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      department: formData.department,
    };
    setUsers(prev => [newUser, ...prev]);
    return newUser;
  }, []);

  const editUser = useCallback(async (id, formData) => {
    await updateUser(id, formData);
    setUsers(prev =>
      prev.map(u => u.id === id ? { ...u, ...formData } : u)
    );
  }, []);

  const removeUser = useCallback(async (id) => {
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  const handleSort = useCallback((field) => {
    setSortField(prev => {
      if (prev === field) {
        setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
        return field;
      }
      setSortOrder('asc');
      return field;
    });
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const handleFilter = useCallback((f) => {
    setFilters(f);
    setCurrentPage(1);
  }, []);

  const handlePageSize = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  // Derived: filtered + searched + sorted + paginated
  const processedUsers = useMemo(() => {
    let result = [...users];

    // Search across firstName, lastName, email
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }

    // Filters
    if (filters.firstName) result = result.filter(u => u.firstName.toLowerCase().includes(filters.firstName.toLowerCase()));
    if (filters.lastName)  result = result.filter(u => u.lastName.toLowerCase().includes(filters.lastName.toLowerCase()));
    if (filters.email)     result = result.filter(u => u.email.toLowerCase().includes(filters.email.toLowerCase()));
    if (filters.department) result = result.filter(u => u.department === filters.department);

    // Sort
    result.sort((a, b) => {
      const va = String(a[sortField]).toLowerCase();
      const vb = String(b[sortField]).toLowerCase();
      if (sortField === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      }
      return sortOrder === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    return result;
  }, [users, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(processedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleUsers = processedUsers.slice(startIndex, startIndex + pageSize);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return {
    // Data
    users,
    visibleUsers,
    processedUsers,
    loading,
    error,
    // State
    searchQuery,
    filters,
    sortField,
    sortOrder,
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    activeFiltersCount,
    // Actions
    fetchUsers,
    addUser,
    editUser,
    removeUser,
    handleSort,
    handleSearch,
    handleFilter,
    setCurrentPage,
    handlePageSize,
  };
};
