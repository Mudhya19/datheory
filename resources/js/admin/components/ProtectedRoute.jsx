import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah token admin ada di localStorage
    const adminToken = localStorage.getItem('adminToken');

    // Jika tidak ada token, redirect ke halaman login
    if (!adminToken) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Cek apakah token ada sebelum merender children
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    return null; // Akan di-redirect oleh useEffect
  }

 return children;
}
