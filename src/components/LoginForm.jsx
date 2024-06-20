import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const { token } = await login(username, password)
      // Store token in localStorage
      localStorage.setItem('token', token);
      // Redirect to posts page
      navigate('/posts');
    } catch (error) {
      console.error('Login error:', error);
      // Handle error state or display error message to user
    }
  };

  return (
    <div className='m-2 p-8 '>
      <h2 className='text-2xl mb-5'>Admin Login</h2>
      <form className='flex flex-col items-start gap-3' onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
        className='border border-black rounded'
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          className='border border-black rounded'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className='border border-black rounded p-1' type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;