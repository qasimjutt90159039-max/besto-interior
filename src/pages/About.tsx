import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, ShieldCheck, Scissors, Feather, Layers, Check } from 'lucide-react';
import { BUSINESS_INFO } from '../types';
import { SafeImage } from '../components/SafeImage';

export const About: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Page Header */}
      <section className="py-14 sm:py-20 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
              About The Studio • {BUSINESS_INFO.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#252525] leading-tight">
              The Craft of Furniture Renewal and Upholstery.
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-2">
              Located at Hashmi Street within Lahore’s renowned Ichra Furniture Market, Besto Interior specializes in the tactile art of upholstery, structural foam replenishment, and fabric re-covering.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative / Introduction */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-serif text-[#252525]">
                Upholstery as an Architectural Transformation
              </h2>
              <p className="text-sm text-[#252525]/80 leading-relaxed">
                Furniture is often built upon sturdy internal wooden frames that easily outlast their external textiles. Over time, sunlight, daily seating, and fabric wear diminish comfort. Upholstery shops offer the disciplined solution of preserving the frame's structural foundation while renewing every tactile surface.
              </p>
              <p className="text-sm text-[#252525]/80 leading-relaxed">
                From adjusting tensioned elastic webbing to selecting high-density polyurethane foam and applying tailored seam weltings, reupholstery bridges functional durability with contemporary aesthetic harmony.
              </p>

              <div className="pt-2 border-t border-[#DED8CF] flex flex-col sm:flex-row gap-6 text-xs text-[#252525]/70">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#252525] flex-shrink-0 mt-0.5" />
                  <span>Precision pattern cutting for diverse sofa and chair geometries</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#252525] flex-shrink-0 mt-0.5" />
                  <span>Consultation on textile durability, texture, and care</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#DED8CF] bg-white">
                <SafeImage
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
                  alt="Upholstery craftsmanship in neutral workshop environment"
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

      {/* Material & Finish Philosophy */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 block mb-1">
              Material Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
              Balancing Texture, Drape, and Longevity
            </h2>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-2">
              Choosing an upholstery material requires balancing visual refinement with tactile resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-3">
              <Layers className="w-5 h-5 text-[#252525]" />
              <h3 className="font-serif text-xl text-[#252525]">Textile Density</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Tightly woven structures provide resistance to thread pulling and stretching, making them ideal for high-traffic living room seating and family sofas.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-3">
              <Feather className="w-5 h-5 text-[#252525]" />
              <h3 className="font-serif text-xl text-[#252525]">Foam & Cushion Dynamics</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Support is determined beneath the fabric. Multi-layer foam grading balances immediate surface softness with resilient core support that doesn't collapse.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs space-y-3">
              <Scissors className="w-5 h-5 text-[#252525]" />
              <h3 className="font-serif text-xl text-[#252525]">Tailored Finishing</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Clean edge weltings, French seams, or minimal topstitched seams align the piece with modern architectural interiors or classical forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Timeline Structure (Craft Stages, no fake historical dates) */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF] bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block">
              Execution Sequence
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#252525]">
              Phases of an Upholstery Project
            </h2>
            <p className="text-xs text-[#252525]/70 max-w-lg mx-auto">
              How individual pieces are systematically handled through an upholstery workshop.
            </p>
          </div>

          <div className="relative border-l border-[#DED8CF] ml-4 sm:ml-8 space-y-12 pb-4">
            
            {/* Phase 1 */}
            <div className="relative pl-8 sm:pl-10 group">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#252525] border-2 border-white"></div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#252525]/50 block mb-1">
                Phase I
              </span>
              <h3 className="text-xl font-serif text-[#252525] mb-1">Frame Examination & Measurement</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Evaluating the wooden joints, springs, and internal webbing of the sofa or chair. Measuring exact yardage required according to pattern repeat and seat volume.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="relative pl-8 sm:pl-10 group">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#252525] border-2 border-white"></div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#252525]/50 block mb-1">
                Phase II
              </span>
              <h3 className="text-xl font-serif text-[#252525] mb-1">Fabric Selection & Pairing</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Selecting the material profile—bouclé, linen weave, velvet, or blended canvas—balancing visual tone with daily use conditions.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="relative pl-8 sm:pl-10 group">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#252525] border-2 border-white"></div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#252525]/50 block mb-1">
                Phase III
              </span>
              <h3 className="text-xl font-serif text-[#252525] mb-1">Deconstruction & Foam Rebuilding</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Carefully stripping worn fabrics, replacing collapsed batting, re-tying or replacing seat springs, and wrapping new high-resilience foam layers.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="relative pl-8 sm:pl-10 group">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#252525] border-2 border-white"></div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#252525]/50 block mb-1">
                Phase IV
              </span>
              <h3 className="text-xl font-serif text-[#252525] mb-1">Precision Tailoring & Seam Detailing</h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Pattern cutting, edge welting, tensioned stretching, hand tacking, and underside cambric lining application for a clean, lasting presentation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Location / Shop Card */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 border border-[#DED8CF] p-8 sm:p-12 rounded-xs bg-[#FAF9F6]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#252525]/50 font-semibold block">
                Visit Besto Interior
              </span>
              <h3 className="text-2xl font-serif text-[#252525]">Hashmi Street, Ichra Furniture Market</h3>
              <p className="text-xs text-[#252525]/70 max-w-md">
                Lahore Main Ferozepur Road, Lahore, 54000, Pakistan. Contact our shop directly for consultation or on-site piece evaluation.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="px-6 py-3 bg-[#252525] text-white text-xs uppercase tracking-wider font-medium text-center rounded-sm hover:bg-black transition-colors"
              >
                Call: {BUSINESS_INFO.phone}
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 border border-[#DED8CF] bg-white text-xs uppercase tracking-wider font-medium text-[#252525] text-center rounded-sm hover:bg-[#F1EEE9] transition-colors"
              >
                View Map & Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
