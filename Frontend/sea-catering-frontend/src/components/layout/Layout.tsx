// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom'; // 1. Impor Outlet
import Header from './Header';
import Footer from './Footer';

// 2. Hapus props, karena kita tidak akan menggunakan children lagi
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* 3. Gunakan Outlet sebagai placeholder untuk rute anak */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;