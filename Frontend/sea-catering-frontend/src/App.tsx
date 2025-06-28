// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/public/HomePage';
import MenuPage from './pages/public/MenuPage';
import ContactPage from './pages/public/ContactPage';
import SubscriptionPage from './pages/user/SubscriptionPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import AdminRoute from './components/common/AdminRoute';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import UserDashboardPage from './pages/dashboard/UserDashboardPage';
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage';
import UserManagementPage from './pages/dashboard/UserManagementPage';
import TestimonialManagementPage from './pages/dashboard/TestimonialManagementPage';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Hapus <Layout> dari sini */}
      <Routes>
        {/* --- GRUP 1: Rute dengan Layout Publik (Header + Footer) --- */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/subscription" 
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* --- GRUP 2: Rute dengan Layout Dasbor (Sidebar + Content) --- */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboardPage />} />
        </Route>
        
        {/* --- GRUP 3: Rute Admin dengan Layout Dasbor --- */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="testimonials" element={<TestimonialManagementPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;