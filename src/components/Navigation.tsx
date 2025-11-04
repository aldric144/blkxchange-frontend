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
    <nav className="bg-brand-black text-brand-light border-b border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-heading font-bold text-brand-gold">
              BlkXchange™
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/marketplace" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Marketplace
            </Link>
            <Link 
              to="/professionals" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Professionals
            </Link>
            <Link 
              to="/investor-impact" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Invest
            </Link>
            <Link 
              to="/blkxchange360/community-hub" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Community
            </Link>
            <Link 
              to="/vendor-apply" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Partner
            </Link>
            <Link 
              to="/news" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              News
            </Link>
            <Link 
              to="/impact" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Impact
            </Link>
            <Link 
              to="/about" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              About
            </Link>
            
            <div className="relative" ref={dropdown360Ref}>
              <button
                onClick={() => setIs360DropdownOpen(!is360DropdownOpen)}
                className="gold-underline-hover hover:text-brand-gold transition-colors font-medium flex items-center space-x-1"
              >
                <span>BlkXchange 360™</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${is360DropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {is360DropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-brand-surface rounded-md shadow-gold-glow py-1 z-50 border border-brand-gold">
                  <Link
                    to="/wealth-hub"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Wealth Hub</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/community-hub"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Community Hub</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/legacy-wall"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Legacy Wall</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/history-window"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                    onClick={() => setIs360DropdownOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>History Window</span>
                  </Link>
                  
                  <Link
                    to="/blkxchange360/groups"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
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
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Become a Vendor
            </Link>
            
            <Link 
              to="/login" 
              className="gold-underline-hover hover:text-brand-gold transition-colors font-medium"
            >
              Login
            </Link>
            
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-gold-metallic text-brand-black font-semibold rounded hover:shadow-gold-glow-hover transition-all"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-brand-light hover:text-brand-gold transition-colors font-semibold"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-gold-metallic text-brand-black font-semibold rounded hover:shadow-gold-glow-hover transition-all"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gold-metallic text-brand-black font-semibold rounded hover:shadow-gold-glow-hover transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>My Account</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-brand-surface rounded-md shadow-gold-glow py-1 z-50 border border-brand-gold">
                    <div className="px-4 py-2 border-b border-brand-gold">
                      <p className="text-sm font-semibold text-brand-light">{user?.username}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                      <p className="text-xs text-brand-gold font-semibold mt-1">{user?.membership_tier} Member</p>
                    </div>
                    
                    <Link
                      to="/wallet"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>My Wallet</span>
                    </Link>
                    
                    <Link
                      to="/subscription"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>
                    
                    <Link
                      to="/investor-impact"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Investor Impact</span>
                    </Link>
                    
                    <Link
                      to="/wealth-hub"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Wealth Hub</span>
                    </Link>
                    
                    <Link
                      to="/dao"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-light hover:bg-brand-black hover:text-brand-gold transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Vote className="w-4 h-4" />
                      <span>DAO Governance</span>
                    </Link>
                    
                    <div className="border-t border-brand-gold mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-brand-black hover:text-red-300 transition-colors w-full text-left"
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
