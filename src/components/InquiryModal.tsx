import React from 'react';
import { X } from 'lucide-react';
import { InquiryForm } from './InquiryForm';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFurnitureType?: string;
  initialMaterial?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialFurnitureType,
  initialMaterial
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-[#DED8CF] shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          id="close-inquiry-modal-btn"
          className="absolute top-4 right-4 p-2 text-[#252525]/60 hover:text-black hover:bg-[#FAF9F6] rounded-sm transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <InquiryForm
          initialFurnitureType={initialFurnitureType}
          initialMaterial={initialMaterial}
          onSuccess={() => {
            setTimeout(() => {
              onClose();
            }, 3500);
          }}
          compact
        />
      </div>
    </div>
  );
};
