import React from 'react';
import { MaterialItem } from '../types';
import { Maximize2, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface MaterialCardProps {
  material: MaterialItem;
  onOpenLightbox: (item: { title: string; image: string; caption?: string; category?: string }) => void;
  onSelectForInquiry?: (materialName: string) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  onOpenLightbox,
  onSelectForInquiry
}) => {
  return (
    <div className="group relative bg-[#FAF9F6] border border-[#DED8CF] rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
      {/* Visual Tile */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1EEE9]">
        <SafeImage
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#252525] font-medium border border-[#DED8CF]">
          {material.category}
        </div>

        {/* Hover zoom trigger */}
        <button
          type="button"
          onClick={() => onOpenLightbox({
            title: material.name,
            image: material.image,
            caption: material.description,
            category: material.category
          })}
          aria-label={`View full texture for ${material.name}`}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-[#252525] opacity-0 group-hover:opacity-100 transition-all rounded-xs shadow-xs"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <div className="absolute bottom-2 right-2 text-[9px] uppercase tracking-widest text-white/90 bg-black/40 px-2 py-0.5 backdrop-blur-xs">
          Visual Inspiration
        </div>
      </div>

      {/* Information details */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white border-t border-[#DED8CF]">
        <div>
          <h3 className="font-serif text-lg text-[#252525] tracking-wide mb-1.5">
            {material.name}
          </h3>
          <p className="text-xs text-[#252525]/70 leading-relaxed line-clamp-2">
            {material.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F1EEE9] flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[#252525]/60 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#252525]/50" />
            <span>Studio Texture Sample</span>
          </span>

          {onSelectForInquiry && (
            <button
              type="button"
              onClick={() => onSelectForInquiry(material.name)}
              className="text-xs font-medium text-[#252525] hover:underline underline-offset-4"
            >
              Inquire
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
