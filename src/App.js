import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import AdminPage from './pages/AdminPage';
import axios from 'axios';
import './index.css';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

// Configure axios with base URL and credentials
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
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
