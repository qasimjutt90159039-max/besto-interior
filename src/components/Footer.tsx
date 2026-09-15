import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#DED8CF] text-[#252525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-serif tracking-[0.2em] font-medium uppercase block">
              Besto Interior
            </span>
            <p className="text-xs uppercase tracking-widest text-[#252525]/60 font-medium">
              Category: {BUSINESS_INFO.category}
            </p>
            <p className="text-sm text-[#252525]/75 leading-relaxed pr-6">
              Specialized upholstery shop providing cushion rejuvenation, fabric reupholstery, and custom tailored furniture finishing in Ichra Furniture Market, Lahore.
            </p>
            <div className="pt-2">
              <a
                id="footer-call-cta-btn"
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#252525] text-white text-xs tracking-wider uppercase rounded-sm hover:bg-black transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Shop: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#252525]/90">
              Studio Pages
            </h4>
            <ul className="space-y-2 text-sm text-[#252525]/70">
              <li>
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-black transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-black transition-colors">Upholstery Services</Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-black transition-colors">Material Gallery</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-black transition-colors">Visual Showcase</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black transition-colors">Contact Shop</Link>
              </li>
            </ul>
          </div>

          {/* Services & Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#252525]/90">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-[#252525]/70">
              <li>
                <Link to="/sofa-upholstery" className="hover:text-black transition-colors">Sofa Upholstery</Link>
              </li>
              <li>
                <Link to="/chair-upholstery" className="hover:text-black transition-colors">Chair & Dining Seating</Link>
              </li>
              <li>
                <Link to="/custom-upholstery" className="hover:text-black transition-colors">Custom Upholstery Orders</Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-black transition-colors">Fabric Textures & Linens</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-black transition-colors">Furniture Re-covering</Link>
              </li>
            </ul>
          </div>

          {/* Location & Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#252525]/90">
              Shop Location
            </h4>
            <div className="text-sm text-[#252525]/75 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#252525]/70 flex-shrink-0 mt-0.5" />
                <p className="leading-snug">
                  {BUSINESS_INFO.address}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#252525]/70 flex-shrink-0" />
                <a href={BUSINESS_INFO.phoneTel} className="font-medium hover:underline">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="pt-2 text-xs text-[#252525]/50">
                Social Media: {BUSINESS_INFO.socialMedia}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="mt-14 pt-8 border-t border-[#DED8CF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#252525]/60">
          <div>
            &copy; {new Date().getFullYear()} Besto Interior. All rights reserved.
            <span className="block sm:inline sm:ml-2 text-[11px] text-[#252525]/50">
              Upholstery visuals shown for design & material inspiration.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hover:text-black transition-colors"
            >
              Location & Directions
            </Link>
            <span>•</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 hover:text-black transition-colors font-medium"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
