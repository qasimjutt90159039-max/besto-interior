import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ArrowUpRight, Sparkles, Layers, Compass, Sliders } from 'lucide-react';
import { MaterialItem, ServiceItem, BUSINESS_INFO } from '../types';
import { MaterialCard } from '../components/MaterialCard';
import { SafeImage } from '../components/SafeImage';

interface HomeProps {
  materials: MaterialItem[];
  services: ServiceItem[];
  onOpenLightbox: (item: any) => void;
  onOpenInquiry: (initialFurniture?: string, initialMaterial?: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  materials,
  services,
  onOpenLightbox,
  onOpenInquiry
}) => {
  const [activeMaterialTab, setActiveMaterialTab] = useState<'All' | 'Neutral' | 'Textured' | 'Soft' | 'Contemporary'>('All');

  const filteredMaterials = activeMaterialTab === 'All'
    ? materials.slice(0, 6)
    : materials.filter(m => m.category.toLowerCase() === activeMaterialTab.toLowerCase());

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* ========================================================
          SECTION 2 — EDITORIAL ASYMMETRIC HERO
      ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#DED8CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & Intent */}
            <div className="lg:col-span-6 space-y-8 pr-0 lg:pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#DED8CF] text-[11px] tracking-[0.25em] uppercase text-[#252525]/70 rounded-xs">
                <span className="w-1.5 h-1.5 bg-[#252525] rounded-full"></span>
                <span>Ichra Furniture Market • Lahore</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.08] text-[#252525]">
                  Refined Upholstery. <br />
                  <span className="italic font-light text-[#252525]/80">Thoughtfully Finished.</span>
                </h1>
                <p className="text-sm sm:text-base text-[#252525]/70 max-w-lg leading-relaxed pt-2">
                  A specialized upholstery studio dedicated to breathing fresh life into cherished furniture. Re-cushioning, tailored fabric application, and meticulous material finishing tailored for homes and bespoke spaces.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  id="hero-explore-services-btn"
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-black transition-all group"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  id="hero-contact-shop-btn"
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#DED8CF] bg-white text-[#252525] text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#F1EEE9] transition-all"
                >
                  <span>Contact Besto Interior</span>
                </Link>
              </div>

              {/* Fast Facts Badge */}
              <div className="pt-6 border-t border-[#DED8CF]/70 grid grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block mb-1">
                    Specialty
                  </span>
                  <p className="font-medium text-[#252525]">
                    Sofas, Armchairs & Custom Covers
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block mb-1">
                    Direct Contact
                  </span>
                  <a href={BUSINESS_INFO.phoneTel} className="font-medium text-[#252525] hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Full-Height Asymmetric Visual with Floating Material Labels */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] max-h-[580px] w-full overflow-hidden rounded-xs border border-[#DED8CF] bg-white shadow-sm">
                <SafeImage
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
                  alt="Fine tailored upholstery detail in light neutral tone"
                  className="w-full h-full object-cover"
                />

                {/* Floating Architectural Label 1: Fabric */}
                <div className="absolute top-8 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 border border-[#DED8CF] shadow-xs text-left animate-fade-in">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#252525]/60 font-semibold block">01 / Material</span>
                  <span className="text-xs font-serif text-[#252525]">Natural Flax & Textured Weaves</span>
                </div>

                {/* Floating Architectural Label 2: Texture */}
                <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/95 backdrop-blur-md px-3.5 py-2 border border-[#DED8CF] shadow-xs text-left">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#252525]/60 font-semibold block">02 / Texture</span>
                  <span className="text-xs font-serif text-[#252525]">Tactile Bouclé & Soft Velvets</span>
                </div>

                {/* Floating Architectural Label 3: Finish */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md px-3.5 py-2 border border-[#DED8CF] shadow-xs text-left">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#252525]/60 font-semibold block">03 / Finish</span>
                  <span className="text-xs font-serif text-[#252525]">Precision Piped & Tailored Seams</span>
                </div>

                {/* Visual inspiration disclaimer */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-xs text-[9px] uppercase tracking-widest text-white/90">
                  Visual Inspiration
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — MATERIAL INTRODUCTION (Split Layout)
      ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#252525]/60">
                <Layers className="w-3.5 h-3.5" />
                <span>The Material Palette</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#252525] leading-tight">
                Curating Fabrics, Textures, Colors, and Finishes.
              </h2>
              <p className="text-sm text-[#252525]/75 leading-relaxed">
                Great upholstery begins with the tactile dialogue between fabric structure and seating geometry. At our Ichra workshop, we work with breathable linens, dense looped bouclés, matte velvets, and durable woven blends chosen for lasting drape and everyday comfort.
              </p>
              
              <div className="pt-2">
                <Link
                  to="/materials"
                  id="split-view-materials-btn"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#252525] hover:underline underline-offset-8"
                >
                  <span>Browse Full Material Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Split Grid of Material Attributes */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-6 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 block">01 / Fabrics</span>
                <h3 className="font-serif text-lg text-[#252525]">Organic Flax & Canvas</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Naturally breathable weaves suited to warm climates, providing soft structured posture for everyday sofas.
                </p>
              </div>

              <div className="p-6 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 block">02 / Textures</span>
                <h3 className="font-serif text-lg text-[#252525]">Heavyweight Bouclé</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Deep textural character that creates sculptured silhouettes and soft light reflections across lounge chairs.
                </p>
              </div>

              <div className="p-6 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 block">03 / Colors</span>
                <h3 className="font-serif text-lg text-[#252525]">Warm Neutrals & Earth Tones</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Soft ivory, sand, pebble gray, and muted taupe palettes that settle peacefully into contemporary interiors.
                </p>
              </div>

              <div className="p-6 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 block">04 / Finishes</span>
                <h3 className="font-serif text-lg text-[#252525]">Piped Edges & Channel Tufting</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Tailored seam profiles, blind stitching, and cushion edge weltings customized to your frame requirements.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 4 — UPHOLSTERY JOURNEY (Storytelling Layout)
      ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-2">
              Process Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
              The Upholstery Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-2">
              A general upholstery-service workflow demonstrating how furniture transformations are typically structured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 01 */}
            <div className="bg-white border border-[#DED8CF] p-7 rounded-xs flex flex-col justify-between relative group hover:border-[#252525] transition-colors">
              <div>
                <span className="text-3xl font-serif text-[#252525]/30 group-hover:text-[#252525] transition-colors block mb-4">
                  01
                </span>
                <h3 className="font-serif text-xl text-[#252525] mb-2">Consultation</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Reviewing the furniture frame, evaluating internal webbing and cushion foam firmness, and discussing your usage requirements.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#F1EEE9] text-[10px] uppercase tracking-widest text-[#252525]/50">
                Frame & Foam Assessment
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white border border-[#DED8CF] p-7 rounded-xs flex flex-col justify-between relative group hover:border-[#252525] transition-colors">
              <div>
                <span className="text-3xl font-serif text-[#252525]/30 group-hover:text-[#252525] transition-colors block mb-4">
                  02
                </span>
                <h3 className="font-serif text-xl text-[#252525] mb-2">Material Selection</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Selecting suitable textiles—from heavy linen to textured bouclé or easy-care velvet—matching shade, drape, and durability.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#F1EEE9] text-[10px] uppercase tracking-widest text-[#252525]/50">
                Fabric Swatch Swapping
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white border border-[#DED8CF] p-7 rounded-xs flex flex-col justify-between relative group hover:border-[#252525] transition-colors">
              <div>
                <span className="text-3xl font-serif text-[#252525]/30 group-hover:text-[#252525] transition-colors block mb-4">
                  03
                </span>
                <h3 className="font-serif text-xl text-[#252525] mb-2">Upholstery Work</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Stripping tired fabric, rebuilding core layers, precision pattern cutting, and tensioned stretching over the structural frame.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#F1EEE9] text-[10px] uppercase tracking-widest text-[#252525]/50">
                Workshop Tailoring
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-white border border-[#DED8CF] p-7 rounded-xs flex flex-col justify-between relative group hover:border-[#252525] transition-colors">
              <div>
                <span className="text-3xl font-serif text-[#252525]/30 group-hover:text-[#252525] transition-colors block mb-4">
                  04
                </span>
                <h3 className="font-serif text-xl text-[#252525] mb-2">Finishing</h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  Detailing seams, adding edge piping, securing under-dust covers, and inspecting every seam for clean geometric perfection.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#F1EEE9] text-[10px] uppercase tracking-widest text-[#252525]/50">
                Final Inspection & Delivery
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 5 — SERVICE EXPLORER (Large Horizontal Panels)
      ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-1">
                Studio Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
                Upholstery Service Panels
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#252525] hover:underline underline-offset-8"
            >
              View All 6 Services &rarr;
            </Link>
          </div>

          <div className="space-y-6">
            
            {/* Panel 1: Sofa Upholstery */}
            <div className="group border border-[#DED8CF] bg-[#FAF9F6] rounded-xs p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 hover:border-[#252525] transition-all">
              <div className="w-full lg:w-1/3 aspect-[16/10] overflow-hidden rounded-xs bg-[#F1EEE9]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                  alt="Sofa Upholstery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 font-semibold">
                    01 • Living Room Seating
                  </div>
                  <h3 className="text-2xl font-serif text-[#252525]">Sofa Upholstery</h3>
                  <p className="text-sm text-[#252525]/75 leading-relaxed max-w-2xl">
                    Comprehensive restoration of 2-seater, 3-seater, and sectional sofas. We renew sagging foam, replace inner cotton padding, and apply tight, tailored upholstery fabric.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DED8CF]/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#252525]/60">
                    Suitable for: Sectionals, Chesterfield, Modern Track Arm Sofas
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/sofa-upholstery"
                      className="px-4 py-2 border border-[#DED8CF] bg-white text-xs uppercase tracking-wider text-[#252525] hover:bg-[#FAF9F6] transition-colors"
                    >
                      Learn More
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpenInquiry('Sofa Upholstery')}
                      className="px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: Chair & Furniture Upholstery */}
            <div className="group border border-[#DED8CF] bg-[#FAF9F6] rounded-xs p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 hover:border-[#252525] transition-all">
              <div className="w-full lg:w-1/3 aspect-[16/10] overflow-hidden rounded-xs bg-[#F1EEE9]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
                  alt="Chair Upholstery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 font-semibold">
                    02 • Accent & Dining
                  </div>
                  <h3 className="text-2xl font-serif text-[#252525]">Chair & Furniture Upholstery</h3>
                  <p className="text-sm text-[#252525]/75 leading-relaxed max-w-2xl">
                    Delicate re-covering for dining sets, accent armchairs, vanity seats, and reading chairs. High attention to welt cord lines, curved edges, and frame integrity.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DED8CF]/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#252525]/60">
                    Suitable for: Wingback Chairs, Dining Chairs, Ottomans, Benches
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/chair-upholstery"
                      className="px-4 py-2 border border-[#DED8CF] bg-white text-xs uppercase tracking-wider text-[#252525] hover:bg-[#FAF9F6] transition-colors"
                    >
                      Learn More
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpenInquiry('Chair & Furniture Upholstery')}
                      className="px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: Custom Upholstery */}
            <div className="group border border-[#DED8CF] bg-[#FAF9F6] rounded-xs p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 hover:border-[#252525] transition-all">
              <div className="w-full lg:w-1/3 aspect-[16/10] overflow-hidden rounded-xs bg-[#F1EEE9]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Custom Upholstery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 font-semibold">
                    03 • Bespoke Projects
                  </div>
                  <h3 className="text-2xl font-serif text-[#252525]">Custom Upholstery</h3>
                  <p className="text-sm text-[#252525]/75 leading-relaxed max-w-2xl">
                    Tailored solutions for unique architectural headboards, custom banquettes, bespoke window seats, and personalized furniture creations crafted to exact customer dimensions.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DED8CF]/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#252525]/60">
                    Suitable for: Custom Headboards, Built-in Banquettes, Specialty Pieces
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/custom-upholstery"
                      className="px-4 py-2 border border-[#DED8CF] bg-white text-xs uppercase tracking-wider text-[#252525] hover:bg-[#FAF9F6] transition-colors"
                    >
                      Build Request
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpenInquiry('Custom Upholstery')}
                      className="px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 4: Fabric & Material Selection */}
            <div className="group border border-[#DED8CF] bg-[#FAF9F6] rounded-xs p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 hover:border-[#252525] transition-all">
              <div className="w-full lg:w-1/3 aspect-[16/10] overflow-hidden rounded-xs bg-[#F1EEE9]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80"
                  alt="Fabric & Material Selection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 font-semibold">
                    04 • Textile Consultation
                  </div>
                  <h3 className="text-2xl font-serif text-[#252525]">Fabric & Material Selection</h3>
                  <p className="text-sm text-[#252525]/75 leading-relaxed max-w-2xl">
                    Navigate between soft velvet textures, breathable flax linens, structured canvas, and durable weaves. We help you choose the right fabric weight and rub-resistance for your lifestyle.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DED8CF]/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#252525]/60">
                    Category: Swatches & Material Consultation in Ichra
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/materials"
                      className="px-4 py-2 border border-[#DED8CF] bg-white text-xs uppercase tracking-wider text-[#252525] hover:bg-[#FAF9F6] transition-colors"
                    >
                      Browse Swatches
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpenInquiry('Fabric & Material Selection')}
                      className="px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 6 — FABRIC GALLERY (Horizontal Material Showcase)
      ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-1">
                Material Gallery
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
                Tactile Fabric Catalog
              </h2>
              <p className="text-xs text-[#252525]/70 mt-1">
                Visual material inspiration illustrating textures, weaves, and surfaces.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {(['All', 'Neutral', 'Textured', 'Soft', 'Contemporary'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveMaterialTab(tab)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase rounded-xs transition-colors cursor-pointer ${
                    activeMaterialTab === tab
                      ? 'bg-[#252525] text-white font-medium'
                      : 'bg-white border border-[#DED8CF] text-[#252525]/70 hover:bg-[#F1EEE9]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {filteredMaterials.length === 0 ? (
            <div className="text-center py-12 bg-white border border-[#DED8CF] rounded-sm text-xs text-[#252525]/60">
              Material collection will appear here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((mat) => (
                <MaterialCard
                  key={mat._id || mat.id}
                  material={mat}
                  onOpenLightbox={onOpenLightbox}
                  onSelectForInquiry={(name) => onOpenInquiry('Fabric & Material Selection', name)}
                />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/materials"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#DED8CF] bg-white text-xs uppercase tracking-[0.2em] font-medium text-[#252525] hover:bg-[#F1EEE9] transition-colors"
            >
              <span>Explore All Studio Fabrics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 7 — ASYMMETRIC VISUAL SHOWCASE
      ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-xl mb-12">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-1">
              Composition
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
              Visual Showcase
            </h2>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-1">
              Visual inspiration highlighting craftsmanship, silhouette alignment, and upholstery materiality.
            </p>
          </div>

          {/* Asymmetrical composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Large Image */}
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto min-h-[380px] lg:min-h-[500px] rounded-xs overflow-hidden border border-[#DED8CF] bg-[#F1EEE9] group">
              <SafeImage
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85"
                alt="Sculptural lounge chair in cream boucle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-3 border border-[#DED8CF] max-w-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block">Form & Foam</span>
                <p className="font-serif text-sm text-[#252525]">Organic Curve Armchair Finish</p>
                <span className="text-[9px] uppercase tracking-wider text-[#252525]/50 mt-1 block">Visual Inspiration</span>
              </div>
            </div>

            {/* Right Column: Two stacked complementary visuals */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              
              <div className="relative aspect-[16/10] rounded-xs overflow-hidden border border-[#DED8CF] bg-[#F1EEE9] group">
                <SafeImage
                  src="https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80"
                  alt="Texture close up"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                  Close-up Texture
                </div>
              </div>

              <div className="relative aspect-[16/10] rounded-xs overflow-hidden border border-[#DED8CF] bg-[#F1EEE9] group">
                <SafeImage
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Interior detail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                  Interior Detail
                </div>
              </div>

            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/gallery"
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#252525] hover:underline underline-offset-8"
            >
              Open Complete Visual Gallery &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 8 — CONTACT CTA (Full Width)
      ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#DED8CF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#252525]/60 font-semibold block">
            Besto Interior • Upholstery Shop
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#252525] leading-tight">
            Give Your Furniture a New Character.
          </h2>
          <p className="text-sm sm:text-base text-[#252525]/75 max-w-xl mx-auto leading-relaxed">
            Visit our workshop at Hashmi Street, Ichra Furniture Market, Lahore or speak directly with our team to discuss cushions, fabric options, or custom re-covering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              id="cta-call-besto-btn"
              href={BUSINESS_INFO.phoneTel}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-black transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Besto Interior: {BUSINESS_INFO.phone}</span>
            </a>

            <Link
              id="cta-view-location-btn"
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#DED8CF] bg-white text-[#252525] text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#F1EEE9] transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>View Location & Details</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
