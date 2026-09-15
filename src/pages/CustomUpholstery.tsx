import React, { useState } from 'react';
import { InquiryForm } from '../components/InquiryForm';
import { Phone, MapPin, Sparkles, Check, Layers, Sliders } from 'lucide-react';
import { BUSINESS_INFO } from '../types';
import { SafeImage } from '../components/SafeImage';

export const CustomUpholstery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Custom Seating / Headboard');

  const customTypes = [
    {
      name: 'Custom Headboards',
      desc: 'Channel tufted, winged, or geometric segmented bedroom headboards.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Built-in Banquettes',
      desc: 'Dining nooks, bay window seat cushions, and corner banquettes.',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Bespoke Ottomans',
      desc: 'Coffee-table footstools, oversized tufted benches, and modular blocks.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Commercial & Restaurant Seating',
      desc: 'Durable upholstered booths and hospitality benches.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Header */}
      <section className="py-14 sm:py-20 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
              Bespoke Work • Made To Measure
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#252525] leading-tight">
              Custom Upholstery Projects.
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-1">
              Have an architecturally distinct furniture frame or custom dimensions in mind? Submit your requirements directly to our Ichra workshop for individualized fabric and foam consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: Interactive Form + Custom Inspiration Grid */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Custom Types Gallery & Guidelines */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#252525]/50 font-semibold block mb-1">
                  Custom Capabilities
                </span>
                <h2 className="text-3xl font-serif text-[#252525]">
                  Bespoke Seating Categories
                </h2>
                <p className="text-xs sm:text-sm text-[#252525]/70 mt-2">
                  Select a category to prefill your inquiry, or specify your unique project details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customTypes.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setSelectedCategory(item.name)}
                    className={`p-4 border rounded-xs cursor-pointer transition-all bg-white ${
                      selectedCategory === item.name
                        ? 'border-[#252525] shadow-xs bg-[#FAF9F6]'
                        : 'border-[#DED8CF] hover:border-[#252525]/50'
                    }`}
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xs mb-3 bg-[#F1EEE9]">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-serif text-base text-[#252525] mb-1">{item.name}</h4>
                    <p className="text-xs text-[#252525]/70">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Consultation details */}
              <div className="p-6 bg-white border border-[#DED8CF] rounded-xs space-y-3">
                <h4 className="font-serif text-lg text-[#252525]">How We Handle Custom Orders</h4>
                <ul className="space-y-2 text-xs text-[#252525]/80">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#252525] mt-0.5 flex-shrink-0" />
                    <span>Exact dimension alignment based on your room or frame blueprint</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#252525] mt-0.5 flex-shrink-0" />
                    <span>Density options from ultra-soft down-alternative to firm commercial seating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#252525] mt-0.5 flex-shrink-0" />
                    <span>Material matching with our extensive fabric catalog</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#F1EEE9]/50 border border-[#DED8CF] rounded-xs text-xs text-[#252525]/70 flex items-center justify-between">
                <span>Direct questions? Call us:</span>
                <a href={BUSINESS_INFO.phoneTel} className="font-semibold text-[#252525] hover:underline">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            {/* Right: Full Interactive Inquiry Form */}
            <div className="lg:col-span-6">
              <div className="sticky top-28">
                <InquiryForm
                  initialFurnitureType={selectedCategory}
                  title="Configure Your Custom Inquiry"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Workshop Location Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#252525]/50 font-semibold block">
            Visit For Material Consultation
          </span>
          <h3 className="text-2xl font-serif text-[#252525]">
            Besto Interior • Hashmi Street, Ichra Furniture Market
          </h3>
          <p className="text-xs sm:text-sm text-[#252525]/70 max-w-lg mx-auto">
            Lahore Main Ferozepur Road, Lahore, 54000, Pakistan. Direct telephone inquiries welcome: {BUSINESS_INFO.phone}.
          </p>
        </div>
      </section>
    </div>
  );
};
