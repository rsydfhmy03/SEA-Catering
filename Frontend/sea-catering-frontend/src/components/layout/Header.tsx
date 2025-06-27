import { UtensilsCrossed } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-green-600" />
          <a href="/" className="text-2xl font-bold text-gray-800">
            SEA Catering
          </a>
        </div>
        {/* Tautan navigasi akan ditambahkan di Level 2 */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-green-600">Home</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Meal Plans</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Subscription</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Contact Us</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;