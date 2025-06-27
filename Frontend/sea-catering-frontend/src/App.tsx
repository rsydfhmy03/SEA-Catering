import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/public/HomePage';
import MenuPage from './pages/public/MenuPage';
import ContactPage from './pages/public/ContactPage';
import SubscriptionPage from './pages/user/SubscriptionPage';
import { Toaster } from 'react-hot-toast'; // Impor Toaster

function App() {
  return (
    <Router>
      {/* Toaster untuk notifikasi global */}
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;