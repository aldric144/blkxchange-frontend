import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-ivory">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-6 h-6 text-brand-gold" />
            <h3 className="text-2xl font-heading font-bold text-brand-gold">
              BlkXchange™
            </h3>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            Born from the legacy of Black Wall Street, BlkXchange™ represents a new digital economy 
            built on unity, excellence, and reinvestment. Every purchase builds our future.
          </p>
          <p className="text-brand-gold font-semibold text-lg">
            Empower. Exchange. Elevate.
          </p>
        </div>

        {/* Revenue Model */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <p className="text-center text-gray-300 text-sm max-w-4xl mx-auto">
            BlkXchange™ operates on a 15% community-centered revenue model: <span className="text-brand-gold font-semibold">85%</span> goes directly to our vendors, 
            <span className="text-brand-gold font-semibold"> 12%</span> sustains platform operations, and <span className="text-brand-gold font-semibold">3%</span> supports HBCUs, scholarships, and nonprofit partners.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-brand-gold font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link to="/professionals" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Find Professionals
                </Link>
              </li>
              <li>
                <Link to="/vendor-apply" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blkxchange360/community-hub" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Community Hub
                </Link>
              </li>
              <li>
                <Link to="/blkxchange360/legacy-wall" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Legacy Wall
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-brand-gold transition-colors">
                  News & Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-semibold mb-4">Opportunities</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/wealth-hub" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Wealth Hub
                </Link>
              </li>
              <li>
                <Link to="/investor-impact" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Investor Impact
                </Link>
              </li>
              <li>
                <Link to="/vendor-apply" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Community Impact
                </Link>
              </li>
              <li>
                <Link to="/blkxchange360/history-window" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Our History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 BlkXchange™. All rights reserved.
            </p>
            <p className="text-brand-gold text-sm font-semibold">
              Empower. Exchange. Elevate.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
