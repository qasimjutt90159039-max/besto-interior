import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

interface NavbarProps {
  onOpenInquiryModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiryModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Materials', path: '/materials' },
    { name: 'Sofa Upholstery', path: '/sofa-upholstery' },
    { name: 'Chairs & Furniture', path: '/chair-upholstery' },
    { name: 'Custom', path: '/custom-upholstery' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DED8CF]/60">
      {/* Slim Top Announcement / Details Bar */}
      <div className="bg-[#FAF9F6] border-b border-[#DED8CF]/40 text-xs text-[#252525]/80 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#252525]/60 flex-shrink-0" />
            <span className="truncate">Ichra Furniture Market, Lahore Main Ferozepur Road</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              id="topbar-phone-link"
              href={BUSINESS_INFO.phoneTel}
              className="flex items-center gap-1.5 font-medium hover:text-black transition-colors"
            >
              <Phone className="w-3 h-3 text-[#252525]/70" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <span className="text-[#DED8CF]">|</span>
            <span className="text-[11px] uppercase tracking-wider text-[#252525]/60 font-medium">Upholstery Shop</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Minimal Logo Treatment */}
        <Link to="/" className="group flex flex-col">
          <span className="text-xl sm:text-2xl font-serif tracking-[0.18em] font-medium uppercase text-[#252525] group-hover:opacity-75 transition-opacity">
            Besto Interior
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#252525]/50 -mt-0.5">
            Upholstery Studio
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`text-sm tracking-wide transition-all relative py-1 ${
                isActive(link.path)
                  ? 'text-[#252525] font-semibold'
                  : 'text-[#252525]/70 hover:text-black font-normal'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#252525]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            id="nav-call-button"
            href={BUSINESS_INFO.phoneTel}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-[#DED8CF] rounded-sm text-xs font-medium text-[#252525] hover:bg-[#FAF9F6] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#252525]" />
            <span>Call Shop</span>
          </a>

          {onOpenInquiryModal && (
            <button
              id="nav-inquire-button"
              onClick={onOpenInquiryModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#252525] text-white rounded-sm text-xs font-medium hover:bg-black transition-colors"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#252525] hover:bg-[#FAF9F6] rounded-sm transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[108px] bottom-0 bg-white z-50 flex flex-col px-6 py-6 overflow-y-auto border-t border-[#DED8CF]">
          <div className="space-y-1 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-lg font-serif tracking-wide border-b border-[#F1EEE9] ${
                  isActive(link.path) ? 'text-black font-semibold pl-2 border-l-2 border-l-black' : 'text-[#252525]/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-[#DED8CF] space-y-3">
            <a
              id="mobile-drawer-call-btn"
              href={BUSINESS_INFO.phoneTel}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#252525] text-white text-sm font-medium rounded-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
            <div className="text-center text-xs text-[#252525]/60 pt-2">
              Hashmi Street, Ichra Furniture Market, Lahore
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
