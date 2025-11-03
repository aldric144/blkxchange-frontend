import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Users, Heart, Info, User, LogOut, Wallet, CreditCard, TrendingUp, ChevronDown, BookOpen, Vote, MessageCircle, Handshake, Newspaper, Building2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [is360DropdownOpen, setIs360DropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdown360Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (dropdown360Ref.current && !dropdown360Ref.current.contains(event.target as Node)) {
        setIs360DropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-brand-black text-brand-ivory border-b border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-heading font-bold text-brand-gold">
              BlkXchange™
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/marketplace" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Marketplace</span>
            </Link>
            <Link 
              to="/professionals" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Professionals</span>
            </Link>
            <Link 
              to="/investor-impact" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Invest</span>
            </Link>
            <Link 
              to="/blkxchange360/community-hub" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Community</span>
            </Link>
            <Link 
              to="/vendor-apply" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <Handshake className="w-4 h-4" />
              <span>Partner</span>
            </Link>
            <Link 
              to="/news" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <Newspaper className="w-4 h-4" />
              <span>News</span>
            </Link>
            <Link 
              to="/impact" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Impact</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            
            <div className="relative" ref={dropdown360Ref}>
              <button
                onClick={() => setIs360DropdownOpen(!is360DropdownOpen)}
                className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span>BlkXchange 360™</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${is360DropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {is360DropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/wealth-hub"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Wealth Hub</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/community-hub"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Community Hub</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/legacy-wall"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Legacy Wall</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/history-window"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>History Window</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/groups"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <Users className="w-4 h-4" />
                    <span>Groups</span>
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/vendor-apply" 
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <Handshake className="w-4 h-4" />
              <span>Become a Vendor</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-brand-ivory hover:text-brand-gold transition-colors font-semibold"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-brand-ivory text-brand-black font-semibold rounded hover:bg-opacity-90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-brand-ivory text-brand-black font-semibold rounded hover:bg-opacity-90 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>My Account</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-brand-black">{user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-brand-gold font-semibold mt-1">{user?.membership_tier} Member</p>
                    </div>
                    
                    <Link
                      to="/wallet"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>My Wallet</span>
                    </Link>
                    
                    <Link
                      to="/subscription"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>
                    
                    <Link
                      to="/investor-impact"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Investor Impact</span>
                    </Link>
                    
                    <Link
                      to="/wealth-hub"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Wealth Hub</span>
                    </Link>
                    
                    <Link
                      to="/dao"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Vote className="w-4 h-4" />
                      <span>DAO Governance</span>
                    </Link>
                    
                    <div className="border-t border-gray-200 mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
