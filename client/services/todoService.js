// Todo service để fetch từ backend với server-side filtering
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Helper function để make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');

  try {
    const res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      body: options.body,
      mode: "cors",
    });

    // Handle unauthorized/forbidden globally
    if (res.status === 401 || res.status === 403) {
      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userId');
      } catch {}
      // Redirect to login preserving current path
      const loginUrl = '/login';
      if (window.location.pathname !== '/login') {
        window.location.replace(loginUrl);
      }
      throw new Error(res.status === 401 ? 'Unauthorized' : 'Forbidden');
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.message || `Error ${res.status}`);

    return data;
  } catch (err) {
    console.error("❌ API fetch error:", err);
    if (err.name === "TypeError") {
      throw new Error("Không thể kết nối đến server. Kiểm tra backend có chạy không.");
    }
    throw err;
  }
};

// Build query string từ filters object
const buildQueryString = (filters) => {
  const params = new URLSearchParams();
  
  // Status filter
  if (filters.status && filters.status !== "all") {
    params.append("status", filters.status);
  }
  
  // Priority filter (support multiple)
  if (filters.priorities && filters.priorities.length > 0) {
    filters.priorities.forEach(priority => {
      params.append("priorities", priority);
    });
  }
  
  // Overdue filter
  if (filters.overdueOnly) {
    params.append("overdueOnly", "true");
  }
  
  // Search filter
  if (filters.search && filters.search.trim()) {
    params.append("search", filters.search.trim());
  }
  
  // Sort filter
  if (filters.sort) {
    params.append("sort", filters.sort);
  }
  
  return params.toString();
};

// Get todos với filters
export const getTodos = async (filters = {}) => {
  const queryString = buildQueryString(filters);
  const endpoint = `/api/todos${queryString ? `?${queryString}` : ''}`;

  const response = await apiCall(endpoint);
  return response.data || [];
};

// Create todo
export const createTodo = async (todoData) => {
  const response = await apiCall('/api/todos', {
    method: 'POST',
    body: JSON.stringify(todoData),
  });
  return response;
};

// Update todo
export const updateTodo = async (id, todoData) => {
  const response = await apiCall(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todoData),
  });
  return response;
};

// Delete todo
export const deleteTodo = async (id) => {
  const response = await apiCall(`/api/todos/${id}`, {
    method: 'DELETE',
  });
  return response;
};

// Default filters
export const defaultFilters = {
  status: "all",
  priorities: [],
  overdueOnly: false,
  search: "",
  sort: "createdDesc"
};