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

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected Routes */}
          <Route 
            path="/subscription" 
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;