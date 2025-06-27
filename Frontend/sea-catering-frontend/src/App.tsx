import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/public/HomePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Route untuk Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Route untuk halaman lain akan ditambahkan di sini */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
