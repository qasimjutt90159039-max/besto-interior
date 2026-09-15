import React, { useState } from 'react';
import { MaterialItem, BUSINESS_INFO } from '../types';
import { MaterialCard } from '../components/MaterialCard';
import { Sparkles, Search, SlidersHorizontal, Phone, Check } from 'lucide-react';

interface MaterialsProps {
  materials: MaterialItem[];
  loading: boolean;
  error: string | null;
  onOpenLightbox: (item: any) => void;
  onOpenInquiry: (initialFurniture?: string, initialMaterial?: string) => void;
}

export const Materials: React.FC<MaterialsProps> = ({
  materials,
  loading,
  error,
  onOpenLightbox,
  onOpenInquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Neutral', 'Textured', 'Soft', 'Contemporary'];

  const filteredMaterials = materials.filter((m) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      m.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Header */}
      <section className="py-14 sm:py-20 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
              Tactile Archive • Upholstery Textiles
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#252525] leading-tight">
              Fabric & Material Gallery
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-1">
              Explore texture profiles, neutral tones, woven surfaces, and soft finishes. Click any swatch tile to inspect full-screen or inquire with our shop.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#DED8CF] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`filter-material-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs tracking-wider uppercase rounded-xs transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#252525] text-white font-medium'
                    : 'bg-[#FAF9F6] border border-[#DED8CF] text-[#252525]/80 hover:bg-[#F1EEE9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#252525]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="material-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search textures or fabrics..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs text-xs text-[#252525] focus:outline-none focus:border-[#252525] transition-colors"
            />
          </div>

        </div>
      </section>

      {/* Material Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {loading ? (
            <div className="py-20 text-center text-xs text-[#252525]/60">
              Loading material collection...
            </div>
          ) : error ? (
            <div className="py-16 text-center text-xs text-red-600 bg-white border border-red-200 rounded-sm p-6 max-w-md mx-auto">
              {error}
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="py-20 text-center bg-white border border-[#DED8CF] rounded-xs p-8 max-w-lg mx-auto">
              <Sparkles className="w-8 h-8 text-[#252525]/30 mx-auto mb-3" />
              <h3 className="font-serif text-lg text-[#252525]">Material collection will appear here.</h3>
              <p className="text-xs text-[#252525]/60 mt-1">
                No materials match your current category or search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

          {/* Textile Consultation Banner */}
          <div className="mt-16 bg-white border border-[#DED8CF] p-8 sm:p-10 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#252525]/50 font-semibold block">
                Physical Swatch Library
              </span>
              <h3 className="text-2xl font-serif text-[#252525]">
                Touch and Inspect Swatches at Ichra Market
              </h3>
              <p className="text-xs text-[#252525]/75 leading-relaxed">
                Fabric colors and textures naturally vary across screens. We invite you to visit Besto Interior on Hashmi Street to evaluate physical fabric swatches under natural light before confirming your upholstery project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => onOpenInquiry('Fabric & Material Selection')}
                className="px-5 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-black transition-colors cursor-pointer"
              >
                Inquire With Shop
              </button>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="px-5 py-2.5 border border-[#DED8CF] text-[#252525] text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-[#FAF9F6] transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
