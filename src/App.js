import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IndexPage from './pages/IndexPage';
import AdminPage from './pages/AdminPage';
import axios from 'axios';
import './index.css';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage';




function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      const [, tokenValue] = token.split('=');
      setToken(tokenValue);
    }
  }, []);

    // Configure axios with base URL and credentials

    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}> {/* Wrap the routes with a Layout component */}
        <Route index={true} path="/" element={<IndexPage />} /> {/* Render IndexPage component when the path matches '/' */}
        <Route path="/admin" element={<AdminPage />} /> {/* Render AdminPage component when the path matches '/admin' */}
        <Route path="/register" element={<RegisterPage />} /> {/* Render RegisterPage component when the path matches '/register' */}
        <Route path="/login" element={<LoginPage />} /> {/* Render LoginPage component when the path matches '/login' */}
        <Route path="/change-password" element={<ChangePasswordPage />} /> {/* Render ChangePasswordPage component when the path matches '/change-password' */}
      </Route>
    </Routes>
  );
}

export default App;
