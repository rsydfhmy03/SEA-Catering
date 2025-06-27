import { Zap, Leaf, Truck, HeartHandshake , ArrowRight, CheckCircle } from 'lucide-react';

// Enhanced animated SVG
const HeroVector = () => (
    <div className="relative">
        <svg viewBox="0 0 300 150" className="w-full h-auto max-w-2xl mx-auto mb-8" xmlns="http://www.w3.org/2000/svg">
            {/* Animated background shapes */}
            <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{stopColor:"rgba(52, 211, 153, 0.3)", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"rgba(52, 211, 153, 0.1)", stopOpacity:0}} />
                </radialGradient>
                <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{stopColor:"rgba(16, 185, 129, 0.4)", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"rgba(16, 185, 129, 0.1)", stopOpacity:0}} />
                </radialGradient>
            </defs>
            
            {/* Background circles */}
            <circle cx="80" cy="40" r="30" fill="url(#grad1)" className="animate-pulse" />
            <circle cx="220" cy="80" r="25" fill="url(#grad2)" className="animate-pulse" style={{animationDelay: '1s'}} />
            
            {/* Flowing lines */}
            <path d="M 20 120 Q 40 40 150 70 T 280 30" stroke="rgba(52, 211, 153, 0.6)" fill="none" strokeWidth="4" strokeLinecap="round" className="animate-pulse"/>
            <path d="M 20 100 Q 80 20 150 60 T 280 50" stroke="rgba(16, 185, 129, 0.7)" fill="none" strokeWidth="4" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            
            {/* Floating elements */}
            <circle cx="60" cy="70" r="6" fill="rgba(249, 115, 22, 0.9)" className="animate-bounce" />
            <circle cx="200" cy="90" r="8" fill="rgba(239, 68, 68, 0.8)" className="animate-bounce" style={{animationDelay: '0.3s'}} />
            <circle cx="150" cy="110" r="7" fill="rgba(139, 92, 246, 0.8)" className="animate-bounce" style={{animationDelay: '0.6s'}} />
        </svg>
    </div>
);

const HomePage = () => {
  return (
    <>
      {/* Enhanced Hero Section with gradient and animations */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-center py-20 sm:py-32 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-emerald-400 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <HeroVector />
          
          {/* Enhanced heading with gradient text */}
          <div className="space-y-7">
            <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 mb-5 py-3 tracking-tight leading-tight">
              SEA Catering
            </h1>
            <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-green-100">
              <p className="text-xl sm:text-2xl text-green-800 font-bold flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                "Healthy Meals, Anytime, Anywhere"
              </p>
            </div>
            
            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 justify-center">
                Mulai Sekarang <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/90 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-green-200">
                Lihat Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Welcome Section with stats */}
      <section className="py-20 sm:py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full text-sm mb-6">
              ⭐ Dipercaya 10,000+ Pelanggan
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Partner Terpercaya untuk 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Hidup Sehat</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              SEA Catering hadir untuk merevolusi cara Anda menikmati makanan sehat. Dengan teknologi AI dan chef berpengalaman, kami menyediakan layanan katering yang disesuaikan dengan kebutuhan nutrisi personal Anda.
            </p>
            
            {/* Stats section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600">Meals Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600">Kota di Indonesia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
                <div className="text-gray-600">Rating Pelanggan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with better cards */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full text-sm mb-4">
              Keunggulan Kami
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Mengapa Memilih SEA Catering?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pengalaman kuliner sehat yang tak terlupakan dengan teknologi terdepan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Enhanced Feature Cards */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-500 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Smart Customization</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  AI-powered meal planning yang disesuaikan dengan target kalori, preferensi diet, dan kondisi kesehatan Anda.
                </p>
                <div className="flex items-center justify-center text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Personal Nutrition
                </div>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-500 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Express Delivery</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Pengiriman cepat dan terpercaya ke 25+ kota besar di Indonesia dengan sistem cold chain terjamin.
                </p>
                <div className="flex items-center justify-center text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Same Day Delivery
                </div>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-500 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Complete Nutrition</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Informasi gizi detail dengan tracking kalori, makro & mikronutrien melalui aplikasi mobile kami.
                </p>
                <div className="flex items-center justify-center text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Real-time Tracking
                </div>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-500 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <HeartHandshake className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Premium Quality</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Bahan organik pilihan dari petani lokal, diproses dengan standar HACCP untuk kesegaran maksimal.
                </p>
                <div className="flex items-center justify-center text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Farm to Table
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default HomePage;