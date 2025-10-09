import { useState, useEffect } from 'react';
import { Building2, ShoppingBag } from 'lucide-react';

interface WelcomeOverlayProps {
  onClose: () => void;
}

export default function WelcomeOverlay({ onClose }: WelcomeOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedRraynex');
    if (hasVisited) {
      setIsVisible(false);
      onClose();
    }
  }, [onClose]);

  const handleExplore = () => {
    setIsAnimating(true);
    localStorage.setItem('hasVisitedRraynex', 'true');
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 600);
  };

  const handleLuxe = () => {
    localStorage.setItem('hasVisitedRraynex', 'true');
    window.location.href = '/rraynex-luxe';
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-600 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in-up">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <Building2 className="relative w-24 h-24 text-orange-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Rraynex Pharmaceuticals
        </h1>

        <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-blue-900 mx-auto mb-6 rounded-full"></div>

        <p className="text-2xl md:text-3xl text-gray-300 mb-3 font-light">
          Pioneering Quality Healthcare Solutions
        </p>

        <p className="text-lg text-gray-400 mb-12 italic max-w-2xl mx-auto">
          Excellence in pharmaceutical manufacturing, from raw materials to finished dosage forms, serving 58+ countries worldwide
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={handleExplore}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 min-w-[240px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Our Website
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>

          <button
            onClick={handleLuxe}
            className="group relative px-8 py-4 bg-transparent border-2 border-blue-900 text-blue-300 font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:border-blue-700 hover:text-white hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 min-w-[240px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Rraynex LUXE Store
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>

        <button
          onClick={handleExplore}
          className="mt-12 text-gray-500 hover:text-gray-300 transition-colors text-sm flex items-center gap-2 mx-auto"
        >
          Skip
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
