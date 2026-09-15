import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Layers, Sparkles, Check, Sliders } from 'lucide-react';
import { BUSINESS_INFO } from '../types';
import { SafeImage } from '../components/SafeImage';

interface SofaUpholsteryProps {
  onOpenInquiry: (initialFurniture?: string, initialMaterial?: string) => void;
}

export const SofaUpholstery: React.FC<SofaUpholsteryProps> = ({ onOpenInquiry }) => {
  // Interactive material + sofa simulator
  const [selectedFinish, setSelectedFinish] = useState<{
    id: string;
    title: string;
    description: string;
    tone: string;
    imageUrl: string;
  }>({
    id: 'linen',
    title: 'Natural Flax Linen',
    description: 'Crisp organic drape, light sand tone with subtle weave texture.',
    tone: 'Soft Ivory / Sand',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85'
  });

  const finishOptions = [
    {
      id: 'linen',
      title: 'Natural Flax Linen',
      description: 'Crisp organic drape, light sand tone with subtle weave texture.',
      tone: 'Soft Ivory / Sand',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'boucle',
      title: 'Textured Cream Bouclé',
      description: 'Dense looped fiber for architectural, sculptured furniture presence.',
      tone: 'Warm Off-White',
      imageUrl: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'velvet',
      title: 'Muted Taupe Velvet',
      description: 'Soft low-pile velvet with subdued matte sheen and cushioned feel.',
      tone: 'Muted Taupe',
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'charcoal',
      title: 'Heathered Stone Tweed',
      description: 'Dual-tone micro-weave for contemporary contrast and high wear resistance.',
      tone: 'Light Charcoal / Stone',
      imageUrl: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Visual Header with Split Layout */}
      <section className="bg-white border-b border-[#DED8CF] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
                Specialized Upholstery • Living Seating
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#252525] leading-tight">
                Sofa Upholstery & Cushion Renewal.
              </h1>
              <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-2">
                A structured, frame-first approach to re-covering sectionals, two-seaters, and three-seaters. We revitalize sagging seating with high-density foam and tailor new fabrics with precision.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onOpenInquiry('Sofa Upholstery')}
                  className="px-6 py-3.5 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-black transition-colors cursor-pointer"
                >
                  Inquire For Sofa
                </button>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="px-6 py-3.5 border border-[#DED8CF] bg-white text-[#252525] text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#FAF9F6] transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] rounded-xs overflow-hidden border border-[#DED8CF] bg-[#F1EEE9]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
                  alt="Tailored sofa in soft ivory linen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                  Visual Inspiration
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sofa Transformation Concept */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-1">
              Transformation Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
              Reviving The Structural Foundation
            </h2>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-2">
              Sofa re-covering is not simply wrapping new cloth over tired stuffing. Our upholstery methodology rebuilds internal layers to restore geometric posture and ergonomic comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white border border-[#DED8CF] p-7 rounded-xs space-y-3">
              <span className="text-2xl font-serif text-[#252525]/40 block">01</span>
              <h3 className="font-serif text-xl text-[#252525]">Springs & Base Webbing</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Re-tensioning sagging elastomeric webbing or hand-tied steel coil springs that cause the middle of the sofa to sink downwards over time.
              </p>
            </div>

            <div className="bg-white border border-[#DED8CF] p-7 rounded-xs space-y-3">
              <span className="text-2xl font-serif text-[#252525]/40 block">02</span>
              <h3 className="font-serif text-xl text-[#252525]">Multi-Density Foam Core</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Replacing collapsed low-grade foam with durable high-resilience cores wrapped in soft polyester dacron wrap for crowned, wrinkle-free cushion tops.
              </p>
            </div>

            <div className="bg-white border border-[#DED8CF] p-7 rounded-xs space-y-3">
              <span className="text-2xl font-serif text-[#252525]/40 block">03</span>
              <h3 className="font-serif text-xl text-[#252525]">Tailored Pattern Alignment</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Ensuring fabric weaves, vertical stripes, or textures match harmoniously across armrests, seat cushions, back rests, and kick pleats.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Material + Furniture Section */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold mb-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Pairing Visualizer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
              Explore Material Finish & Tone
            </h2>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-1">
              Select a material swatch below to view its corresponding upholstery styling preview (Visual Inspiration).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Swatch Selector Column */}
            <div className="lg:col-span-5 space-y-3">
              {finishOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedFinish(opt)}
                  className={`w-full text-left p-4 rounded-xs border transition-all cursor-pointer flex items-center justify-between ${
                    selectedFinish.id === opt.id
                      ? 'bg-[#FAF9F6] border-[#252525] shadow-xs'
                      : 'bg-white border-[#DED8CF] hover:bg-[#FAF9F6]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block">
                      {opt.tone}
                    </span>
                    <h4 className="font-serif text-lg text-[#252525]">{opt.title}</h4>
                    <p className="text-xs text-[#252525]/70 line-clamp-1">{opt.description}</p>
                  </div>
                  {selectedFinish.id === opt.id && (
                    <span className="w-2 h-2 rounded-full bg-[#252525] ml-4 flex-shrink-0"></span>
                  )}
                </button>
              ))}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onOpenInquiry('Sofa Upholstery', selectedFinish.title)}
                  className="w-full py-3 bg-[#252525] text-white text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-black transition-colors cursor-pointer"
                >
                  Inquire With {selectedFinish.title}
                </button>
              </div>
            </div>

            {/* Visualizer Display */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#DED8CF] bg-[#FAF9F6]">
                <SafeImage
                  src={selectedFinish.imageUrl}
                  alt={selectedFinish.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3.5 border border-[#DED8CF] max-w-xs shadow-xs">
                  <span className="text-[9px] uppercase tracking-widest text-[#252525]/50 font-bold block">
                    Active Pairing
                  </span>
                  <p className="font-serif text-base text-[#252525]">{selectedFinish.title}</p>
                  <p className="text-[11px] text-[#252525]/70 mt-0.5">{selectedFinish.description}</p>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                  Visual Inspiration
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Sofa Types Supported */}
      <section className="py-16 bg-[#FAF9F6] border-b border-[#DED8CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#252525]">
              Sofa Configurations Handled
            </h3>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-1">
              Every sofa shape presents distinct structural seam requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
              <h4 className="font-serif text-lg text-[#252525] mb-1">Standard 3-Seater</h4>
              <p className="text-xs text-[#252525]/60">Formal & family seating</p>
            </div>
            <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
              <h4 className="font-serif text-lg text-[#252525] mb-1">L-Shaped Sectional</h4>
              <p className="text-xs text-[#252525]/60">Multi-unit modular sets</p>
            </div>
            <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
              <h4 className="font-serif text-lg text-[#252525] mb-1">Chesterfield</h4>
              <p className="text-xs text-[#252525]/60">Deep diamond tufting</p>
            </div>
            <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
              <h4 className="font-serif text-lg text-[#252525] mb-1">Daybeds & Chaises</h4>
              <p className="text-xs text-[#252525]/60">Flat tailored bolsters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif text-[#252525]">Ready to refresh your sofa?</h3>
          <p className="text-xs sm:text-sm text-[#252525]/70">
            Visit Besto Interior on Hashmi Street, Ichra Furniture Market or send us your sofa dimensions.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenInquiry('Sofa Upholstery')}
              className="px-6 py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-black transition-colors cursor-pointer"
            >
              Send Sofa Details
            </button>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="px-6 py-3 border border-[#DED8CF] text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#FAF9F6] transition-colors"
            >
              Call: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
