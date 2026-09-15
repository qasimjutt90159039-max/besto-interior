import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Check, Sparkles, Layers } from 'lucide-react';
import { BUSINESS_INFO } from '../types';
import { SafeImage } from '../components/SafeImage';

interface ChairUpholsteryProps {
  onOpenInquiry: (initialFurniture?: string) => void;
}

export const ChairUpholstery: React.FC<ChairUpholsteryProps> = ({ onOpenInquiry }) => {
  const chairCategories = [
    {
      title: 'Lounge & Accent Armchairs',
      description: 'Single-seater statement chairs with curved backrests, flared arms, and deep seat cushions.',
      fabricPairing: 'Textured Bouclé, Heavy Linen, or Muted Velvet',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      label: 'Sculptural Seating'
    },
    {
      title: 'Dining Chairs & Sets',
      description: 'Sets of 4, 6, or 8 dining seats. Re-padding seat bases and applying durable, stain-resilient upholstery fabrics.',
      fabricPairing: 'Tightly Woven Canvas, Performance Weaves, or Flat Chenille',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      label: 'Dining Sets'
    },
    {
      title: 'Wingback & High-Back Reading Chairs',
      description: 'Traditional architectural frames with high side wings, roll arms, and piped perimeter seams.',
      fabricPairing: 'Textured Tweed, Soft Cord, or Brushed Cotton',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      label: 'High-Back Profiles'
    },
    {
      title: 'Ottomans, Footstools & Benches',
      description: 'Padded footrests, entryway benches, and storage ottomans with smooth top upholstery or tufted detail.',
      fabricPairing: 'Dense Bouclé or Durable Linen Blends',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
      label: 'Accent Benches'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Header */}
      <section className="py-14 sm:py-20 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
              Individual Seating • Accent Furniture
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#252525] leading-tight">
              Chair & Furniture Upholstery.
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-2">
              From classic dining chairs to modern curved lounge armchairs, our workshop handles edge weltings, spring adjustments, and fresh fabric applications.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Image Strips & Editorial Composition */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="space-y-16">
            {chairCategories.map((item, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={item.title}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Vertical Strip Visual */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[3/4] max-h-[500px] w-full rounded-xs overflow-hidden border border-[#DED8CF] bg-[#F1EEE9] group">
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Floating Architectural Label */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 border border-[#DED8CF] shadow-xs text-xs font-serif text-[#252525]">
                        {item.label}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                        Visual Inspiration
                      </div>
                    </div>
                  </div>

                  {/* Editorial Details */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#252525]/40 block mb-1">
                        Category 0{idx + 1}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
                        {item.title}
                      </h2>
                    </div>

                    <p className="text-sm text-[#252525]/80 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="p-4 bg-white border border-[#DED8CF] rounded-xs space-y-2">
                      <div className="text-xs">
                        <span className="font-semibold text-[#252525]">Recommended Material Profile: </span>
                        <span className="text-[#252525]/75">{item.fabricPairing}</span>
                      </div>
                      <div className="text-xs text-[#252525]/60 flex items-center gap-1.5 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#252525]/60" />
                        <span>Tailored weltings, tufting, or clean seams according to frame</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => onOpenInquiry(item.title)}
                        className="px-6 py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-black transition-colors cursor-pointer"
                      >
                        Inquire For This Chair Type
                      </button>

                      <a
                        href={BUSINESS_INFO.phoneTel}
                        className="px-4 py-3 border border-[#DED8CF] bg-white text-xs uppercase tracking-wider font-medium text-[#252525] hover:bg-[#FAF9F6] transition-colors inline-flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Direct Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Chair Care & Reupholstery Advice */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 border border-[#DED8CF] p-8 sm:p-12 rounded-xs bg-[#FAF9F6] space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#252525]/50 font-semibold block">
            Ichra Workshop Consultation
          </span>
          <h3 className="text-2xl font-serif text-[#252525]">
            Bringing Dining Sets or Single Chairs for Evaluation
          </h3>
          <p className="text-xs sm:text-sm text-[#252525]/75 leading-relaxed">
            Customers frequently bring dining chair slip-seats or accent armchairs directly to our shop at Hashmi Street, Ichra Furniture Market for exact fabric measurement and foam density recommendations.
          </p>
          <div className="pt-2">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#252525] hover:underline underline-offset-4"
            >
              <span>Call Shop at {BUSINESS_INFO.phone}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
