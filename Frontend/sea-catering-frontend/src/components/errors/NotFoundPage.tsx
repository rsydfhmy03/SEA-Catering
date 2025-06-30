import { Home, ArrowLeft, Leaf, Frown } from 'lucide-react';

// 404 Not Found Component
export const NotFoundPage = () => {
  const handleGoHome = () => {
    // In actual implementation, replace with: navigate('/')
    window.location.href = '/';
  };

  const handleGoBack = () => {
    // In actual implementation, replace with: navigate(-1)
    window.history.back();
  };

  const ErrorVector = () => (
    <div className="relative">
      <svg viewBox="0 0 300 200" className="w-full h-auto max-w-lg mx-auto mb-1" xmlns="http://www.w3.org/2000/svg">
        {/* Animated background shapes */}
        <defs>
          <radialGradient id="errorGrad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor:"rgba(239, 68, 68, 0.3)", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"rgba(239, 68, 68, 0.1)", stopOpacity:0}} />
          </radialGradient>
          <radialGradient id="errorGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor:"rgba(52, 211, 153, 0.4)", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"rgba(52, 211, 153, 0.1)", stopOpacity:0}} />
          </radialGradient>
        </defs>
        
        {/* Background circles */}
        <circle cx="80" cy="60" r="35" fill="url(#errorGrad1)" className="animate-pulse" />
        <circle cx="220" cy="120" r="30" fill="url(#errorGrad2)" className="animate-pulse" style={{animationDelay: '1s'}} />
        
        {/* Broken path lines */}
        <path d="M 20 150 Q 40 60 80 100" stroke="rgba(239, 68, 68, 0.6)" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="10,5" className="animate-pulse"/>
        <path d="M 120 80 Q 180 40 220 90" stroke="rgba(52, 211, 153, 0.7)" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,4" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
        <path d="M 250 120 Q 270 140 280 170" stroke="rgba(239, 68, 68, 0.5)" fill="none" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,3" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
        
        {/* Floating question marks */}
        <text x="150" y="100" fontSize="40" fill="rgba(239, 68, 68, 0.7)" className="animate-bounce" style={{fontFamily: 'serif'}}>?</text>
        <text x="60" y="140" fontSize="24" fill="rgba(52, 211, 153, 0.8)" className="animate-bounce" style={{animationDelay: '0.3s', fontFamily: 'serif'}}>?</text>
        <text x="240" y="70" fontSize="30" fill="rgba(239, 68, 68, 0.6)" className="animate-bounce" style={{animationDelay: '0.6s', fontFamily: 'serif'}}>?</text>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-green-50 via-emerald-50 to-red-50 flex items-center justify-center px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-green-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-emerald-400 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto relative z-10 text-center">
        <ErrorVector />
        
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 mb-4 tracking-tight leading-none">
            404
          </h1>
          <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-red-100 mb-6">
            <span className="text-red-800 font-semibold flex items-center gap-2">
              <Frown className="w-5 h-5" />
              Page Not Found
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Oops! Pages Not Found
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            It looks like the page you're looking for doesn't exist or has been moved. 
            Don't worry, let's go back to the main page and find your favorite healthy menu!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGoHome}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
            <button 
              onClick={handleGoBack}
              className="px-8 py-4 bg-white/90 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-green-200 flex items-center gap-2 justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous Page
            </button>
          </div>
        </div>

        {/* SEA Catering branding */}
        <div className="mt-16 mb-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-green-100">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">SEA Catering - Healthy Meals, Anytime, Anywhere</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
