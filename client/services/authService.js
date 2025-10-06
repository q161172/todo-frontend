// Authentication service để fetch từ backend
const API_BASE_URL = 'http://localhost:4000';

// Helper function để make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body,
      mode: "cors",
    });

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
export async function login(email, password) {
  const response = await apiCall('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // Lưu token vào localStorage
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  
  return response;
}

export async function register(name, email, password) {
  const response = await apiCall('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  
  return response;
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
}

export function getStoredToken() {
  return localStorage.getItem('authToken');
}

// Test function để kiểm tra kết nối