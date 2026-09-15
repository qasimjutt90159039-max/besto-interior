import React from 'react';
import { X, Phone, Tag } from 'lucide-react';
import { BUSINESS_INFO } from '../types';
import { SafeImage } from './SafeImage';

interface LightboxModalProps {
  item: {
    title: string;
    image: string;
    caption?: string;
    category?: string;
  } | null;
  onClose: () => void;
  onInquire?: (title: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onInquire }) => {
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#FAF9F6] border border-[#DED8CF] rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-lightbox-btn"
          aria-label="Close image viewer"
          className="absolute top-3 right-3 z-10 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Full Visual */}
        <div className="md:w-2/3 bg-black flex items-center justify-center overflow-hidden">
          <SafeImage
            src={item.image}
            alt={item.title}
            className="w-full h-full max-h-[60vh] md:max-h-[85vh] object-contain"
          />
        </div>

        {/* Editorial Details Sidebar */}
        <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF9F6] overflow-y-auto">
          <div>
            {item.category && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#DED8CF] text-[10px] uppercase tracking-widest text-[#252525] font-medium mb-3">
                <Tag className="w-3 h-3" />
                <span>{item.category}</span>
              </div>
            )}

            <h3 className="text-2xl font-serif text-[#252525] mb-2 leading-tight">
              {item.title}
            </h3>

            <p className="text-xs text-[#252525]/75 leading-relaxed mb-6">
              {item.caption || 'High-tactile upholstery material sample presented for visual inspiration and custom finish styling.'}
            </p>

            <div className="p-3.5 bg-white border border-[#DED8CF] rounded-xs text-[11px] text-[#252525]/70 space-y-1">
              <span className="font-semibold block text-[#252525]">Visual Inspiration Note</span>
              <p>
                Images reflect texture style categories available for consultation at our Ichra Furniture Market shop.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#DED8CF] space-y-3">
            {onInquire && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquire(item.title);
                }}
                className="w-full py-2.5 bg-[#252525] hover:bg-black text-white text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
              >
                Inquire With This Reference
              </button>
            )}

            <a
              href={BUSINESS_INFO.phoneTel}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#DED8CF] text-xs uppercase tracking-wider font-medium text-[#252525] hover:bg-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
