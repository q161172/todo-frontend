import { useState, useEffect, useCallback } from "react";
import { getTodos, defaultFilters } from "../services/todoService";

export const useFilters = (currentUser = null) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todos từ server với current filters
  const fetchTodos = useCallback(async () => {
  // Chỉ fetch khi có user đã login
    if (!currentUser) {
      setTodos([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getTodos(filters);
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, currentUser]);

  // Fetch todos khi filters thay đổi hoặc user thay đổi
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Clear todos khi user logout và reset filters khi user mới login
  useEffect(() => {
    if (!currentUser) {
      setTodos([]);
      setError(null);
    } else {
      // Reset filters về default khi user mới login
      setFilters(defaultFilters);
    }
  }, [currentUser]);

  // Update filters và trigger refetch
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Individual filter setters
  const setStatus = useCallback((status) => {
    updateFilters({ status });
  }, [updateFilters]);

  const setPriorities = useCallback((priorities) => {
    updateFilters({ priorities });
  }, [updateFilters]);

  const setOverdueOnly = useCallback((overdueOnly) => {
    updateFilters({ overdueOnly });
  }, [updateFilters]);

  const setSearch = useCallback((search) => {
    updateFilters({ search });
  }, [updateFilters]);

  const setSort = useCallback((sort) => {
    updateFilters({ sort });
  }, [updateFilters]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    // Data
    todos,
    loading,
    error,
    
    // Filters state
    filters,
    
    // Filter setters
    setFilters: updateFilters,
    setStatus,
    setPriorities,
    setOverdueOnly,
    setSearch,
    setSort,
    resetFilters,
    
    // Manual refresh
    refresh: fetchTodos,
  };
};

