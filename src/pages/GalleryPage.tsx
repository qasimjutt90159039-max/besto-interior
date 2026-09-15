import React, { useState } from 'react';
import { GalleryItem, BUSINESS_INFO } from '../types';
import { Maximize2, Tag, Phone } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

interface GalleryPageProps {
  gallery: GalleryItem[];
  loading: boolean;
  error: string | null;
  onOpenLightbox: (item: any) => void;
  onOpenInquiry: (initialFurniture?: string, initialMaterial?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  gallery,
  loading,
  error,
  onOpenLightbox,
  onOpenInquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sofas', 'Chairs', 'Textures', 'Custom', 'Living'];

  const filteredItems = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Header */}
      <section className="py-14 sm:py-20 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
              Inspiration Archive • Editorial Gallery
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#252525] leading-tight">
              Visual Showcase & Textile Gallery
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-1">
              A curated masonry collection of upholstery silhouettes, fabric details, close-up weaves, and seating profiles presented for visual design inspiration.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#DED8CF] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`filter-gallery-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs tracking-wider uppercase rounded-xs transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#252525] text-white font-medium'
                    : 'bg-[#FAF9F6] border border-[#DED8CF] text-[#252525]/80 hover:bg-[#F1EEE9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#252525]/60">
            Showing {filteredItems.length} visual items
          </div>
        </div>
      </section>

      {/* Masonry-Style Gallery Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {loading ? (
            <div className="py-20 text-center text-xs text-[#252525]/60">
              Loading visual showcase...
            </div>
          ) : error ? (
            <div className="py-16 text-center text-xs text-red-600 bg-white border border-red-200 rounded-sm p-6 max-w-md mx-auto">
              {error}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center bg-white border border-[#DED8CF] rounded-xs p-8 max-w-lg mx-auto">
              <h3 className="font-serif text-lg text-[#252525]">Gallery images will appear here.</h3>
              <p className="text-xs text-[#252525]/60 mt-1">
                No items currently match this category.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="break-inside-avoid bg-white border border-[#DED8CF] rounded-xs overflow-hidden group hover:border-[#252525] transition-all shadow-xs"
                >
                  <div className="relative overflow-hidden bg-[#F1EEE9]">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#252525] font-medium border border-[#DED8CF]">
                      {item.category}
                    </div>

                    {/* Expand button */}
                    <button
                      type="button"
                      onClick={() => onOpenLightbox({
                        title: item.title,
                        image: item.image,
                        caption: item.caption,
                        category: item.category
                      })}
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-[#252525] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs shadow-xs"
                      aria-label={`Enlarge image: ${item.title}`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs">
                      Visual Inspiration
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg text-[#252525]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#252525]/70 leading-relaxed">
                      {item.caption}
                    </p>

                    <div className="pt-3 border-t border-[#F1EEE9] flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#252525]/50">
                        Design Inspiration
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenInquiry('Custom Upholstery', item.title)}
                        className="text-xs font-semibold text-[#252525] hover:underline underline-offset-4"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Direct Shop Contact CTA */}
          <div className="mt-16 bg-[#FAF9F6] border border-[#DED8CF] p-8 text-center rounded-xs space-y-3">
            <h3 className="text-2xl font-serif text-[#252525]">Like a specific visual style?</h3>
            <p className="text-xs sm:text-sm text-[#252525]/75 max-w-lg mx-auto">
              Call our shop or share your furniture photo to discuss matching fabrics, foam specifications, and tailored seam details.
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

        </div>
      </section>
    </div>
  );
};
