/**
 * Portal de Assinaturas
 * 
 * @copyright 2025 JAIEL JOHABE MACEDO BARBOZA
 * @license MIT
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import SignaturePortal from './pages/SignaturePortal';
import SignatureDownload from './pages/SignatureDownload';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/portal" 
            element={
              <ProtectedRoute>
                <SignaturePortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/download" 
            element={
              <ProtectedRoute>
                <SignatureDownload />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/portal" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
