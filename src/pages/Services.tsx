import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ServiceItem, BUSINESS_INFO } from '../types';
import { SafeImage } from '../components/SafeImage';

interface ServicesProps {
  services: ServiceItem[];
  onOpenInquiry: (initialFurniture?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onOpenInquiry }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services[0]?._id || services[0]?.id || 'srv-1'
  );

  const activeService = services.find(
    s => s._id === selectedServiceId || s.id === selectedServiceId
  ) || services[0];

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Header */}
      <section className="py-14 sm:py-20 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
              Capabilities • Upholstery Shop
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#252525] leading-tight">
              Upholstery Service Explorer
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-1">
              Explore specialized upholstery techniques, from full sofa rejuvenation and chair re-covering to custom tailored architectural headboards and fabric selection.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Service Explorer (Split Focus) */}
      {activeService && (
        <section className="py-12 sm:py-16 border-b border-[#DED8CF] bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#252525]/50 font-semibold block mb-3">
                Select Service To Inspect
              </span>
              
              {/* Service tabs */}
              <div className="flex flex-wrap gap-2">
                {services.map((srv) => {
                  const srvId = srv._id || srv.id || '';
                  const isSelected = srvId === selectedServiceId;
                  return (
                    <button
                      key={srvId}
                      type="button"
                      onClick={() => setSelectedServiceId(srvId)}
                      className={`px-4 py-2 text-xs tracking-wider uppercase transition-all rounded-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[#252525] text-white font-medium shadow-xs'
                          : 'bg-white border border-[#DED8CF] text-[#252525]/80 hover:bg-[#F1EEE9]'
                      }`}
                    >
                      {srv.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Explorer View */}
            <div className="bg-white border border-[#DED8CF] rounded-xs p-6 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Visual */}
                <div className="lg:col-span-6 relative aspect-[4/3] rounded-xs overflow-hidden border border-[#DED8CF] bg-[#F1EEE9]">
                  <SafeImage
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                    Visual Inspiration
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 border border-[#DED8CF] px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-[#252525]">
                    {activeService.category}
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#252525]/50 block mb-1">
                      Upholstery Focus
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
                      {activeService.title}
                    </h2>
                  </div>

                  <p className="text-sm text-[#252525]/80 leading-relaxed">
                    {activeService.description}
                  </p>

                  {activeService.suitableFor && (
                    <div className="p-4 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-1">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-[#252525]/60 block">
                        Suitable Furniture Types:
                      </span>
                      <p className="text-xs text-[#252525] font-medium">
                        {activeService.suitableFor}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(activeService.title)}
                      className="px-6 py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-black transition-colors text-center cursor-pointer"
                    >
                      Inquire for {activeService.title}
                    </button>

                    <a
                      href={BUSINESS_INFO.phoneTel}
                      className="px-6 py-3 border border-[#DED8CF] text-[#252525] text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#FAF9F6] transition-colors text-center inline-flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call: {BUSINESS_INFO.phone}</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* Comprehensive Service Catalog Cards */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-1">
              All Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
              Comprehensive Upholstery Services
            </h2>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-1">
              Every service is handled individually according to your frame structure, fabric choice, and interior styling requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => (
              <div
                key={srv._id || srv.id}
                className="bg-[#FAF9F6] border border-[#DED8CF] rounded-xs overflow-hidden flex flex-col justify-between group hover:border-[#252525] transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F1EEE9]">
                    <SafeImage
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#252525] font-medium border border-[#DED8CF]">
                      0{idx + 1} • {srv.category}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                      Visual Inspiration
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-serif text-[#252525]">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#252525]/75 leading-relaxed">
                      {srv.description}
                    </p>

                    {srv.suitableFor && (
                      <div className="pt-2 text-[11px] text-[#252525]/60 border-t border-[#F1EEE9]">
                        <span className="font-semibold text-[#252525]">Suitable for: </span>
                        {srv.suitableFor}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(srv.title)}
                    className="w-full py-2.5 bg-white border border-[#DED8CF] hover:bg-[#252525] hover:text-white text-xs uppercase tracking-wider font-medium text-[#252525] rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inquire About Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom Shop CTA */}
      <section className="py-16 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h3 className="text-2xl font-serif text-[#252525]">Have a unique furniture piece in mind?</h3>
          <p className="text-xs sm:text-sm text-[#252525]/70 max-w-lg mx-auto">
            Call our shop directly or visit Hashmi Street in Ichra Furniture Market for practical advice on foam firmness, fabric durability, and yardage estimates.
          </p>
          <div className="pt-2">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-black transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Besto Interior: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
