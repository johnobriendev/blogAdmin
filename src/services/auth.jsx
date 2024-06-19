const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};

export const logout = async () => {
  try {
    await fetch(`${API_URL}/user/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    localStorage.removeItem('token'); // Remove token from local storage
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error('Logout failed');
  }
};