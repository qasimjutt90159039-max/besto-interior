import React, { useState } from 'react';
import { submitInquiry } from '../services/api';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

interface InquiryFormProps {
  initialFurnitureType?: string;
  initialMaterial?: string;
  onSuccess?: () => void;
  title?: string;
  compact?: boolean;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialFurnitureType = 'Sofa Upholstery',
  initialMaterial = '',
  onSuccess,
  title = 'Initiate An Upholstery Inquiry',
  compact = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    furnitureType: initialFurnitureType,
    material: initialMaterial,
    message: '',
    referenceImage: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your contact phone number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      errs.phone = 'Please provide a valid phone number (at least 7 digits).';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      await submitInquiry({
        name: formData.name,
        phone: formData.phone,
        furnitureType: formData.furnitureType,
        material: formData.material,
        message: formData.message,
        referenceImage: formData.referenceImage
      });

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        furnitureType: initialFurnitureType,
        material: '',
        message: '',
        referenceImage: ''
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(
        'Unable to send inquiry directly right now. You can also call Besto Interior directly at ' +
          BUSINESS_INFO.phone
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[#FAF9F6] border border-[#DED8CF] p-8 text-center rounded-sm">
        <CheckCircle2 className="w-12 h-12 text-[#252525] mx-auto mb-4" />
        <h3 className="text-xl font-serif text-[#252525] mb-2">
          Inquiry Received
        </h3>
        <p className="text-sm text-[#252525]/75 max-w-md mx-auto mb-6">
          Thank you for contacting Besto Interior. Your upholstery inquiry has been registered. For immediate guidance or on-site evaluation in Ichra Furniture Market, feel free to call our shop.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BUSINESS_INFO.phoneTel}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#252525] text-white text-xs tracking-wider uppercase rounded-sm hover:bg-black transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Shop Directly</span>
          </a>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="px-4 py-2 border border-[#DED8CF] text-xs uppercase tracking-wider text-[#252525] hover:bg-white transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="upholstery-inquiry-form"
      onSubmit={handleSubmit}
      className={`bg-white border border-[#DED8CF] p-6 sm:p-8 rounded-sm ${compact ? '' : 'shadow-sm'}`}
    >
      <div className="mb-6">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-1">
          Direct Inquiry
        </span>
        <h3 className="text-2xl font-serif text-[#252525]">{title}</h3>
        <p className="text-xs text-[#252525]/70 mt-1">
          Share your piece specifications or visit us at Hashmi Street, Ichra Furniture Market, Lahore.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-sm flex items-start gap-3 text-amber-900 text-xs">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-700" />
          <div>{error}</div>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#252525] mb-1">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="inquiry-name-input"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Tariq Mehmood"
            className={`w-full px-3.5 py-2.5 bg-[#FAF9F6] border text-sm text-[#252525] rounded-sm focus:outline-none focus:border-[#252525] transition-colors ${
              fieldErrors.name ? 'border-red-500' : 'border-[#DED8CF]'
            }`}
          />
          {fieldErrors.name && (
            <span className="text-red-500 text-xs mt-1 block">{fieldErrors.name}</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#252525] mb-1">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            id="inquiry-phone-input"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +92 300 1234567"
            className={`w-full px-3.5 py-2.5 bg-[#FAF9F6] border text-sm text-[#252525] rounded-sm focus:outline-none focus:border-[#252525] transition-colors ${
              fieldErrors.phone ? 'border-red-500' : 'border-[#DED8CF]'
            }`}
          />
          {fieldErrors.phone && (
            <span className="text-red-500 text-xs mt-1 block">{fieldErrors.phone}</span>
          )}
        </div>

        {/* Furniture Type & Material Preference in a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#252525] mb-1">
              Furniture Type
            </label>
            <select
              id="inquiry-furniture-type-select"
              value={formData.furnitureType}
              onChange={(e) => setFormData({ ...formData, furnitureType: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#DED8CF] text-sm text-[#252525] rounded-sm focus:outline-none focus:border-[#252525] transition-colors"
            >
              <option value="Sofa Upholstery">Sofa Upholstery (2/3 Seater, L-Shape)</option>
              <option value="Armchair / Accent Chair">Armchair / Accent Chair</option>
              <option value="Dining Chairs Set">Dining Chairs Set</option>
              <option value="Custom Seating / Headboard">Custom Seating / Headboard</option>
              <option value="Furniture Reupholstery / Re-cushioning">Furniture Reupholstery / Re-cushioning</option>
              <option value="Fabric Inquiries Only">Fabric Inquiries Only</option>
              <option value="Other Seating Piece">Other Seating Piece</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#252525] mb-1">
              Preferred Material / Tone
            </label>
            <input
              id="inquiry-material-input"
              type="text"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="e.g. Textured bouclé, linen, velvet, beige"
              className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DED8CF] text-sm text-[#252525] rounded-sm focus:outline-none focus:border-[#252525] transition-colors"
            />
          </div>
        </div>

        {/* Optional Reference Image Link */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#252525] mb-1">
            Optional Reference Image URL
          </label>
          <input
            id="inquiry-reference-image-input"
            type="url"
            value={formData.referenceImage}
            onChange={(e) => setFormData({ ...formData, referenceImage: e.target.value })}
            placeholder="https://example.com/furniture-photo.jpg"
            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DED8CF] text-sm text-[#252525] rounded-sm focus:outline-none focus:border-[#252525] transition-colors"
          />
          <span className="text-[11px] text-[#252525]/50 block mt-0.5">
            Share an online photo link or reference image of your furniture piece.
          </span>
        </div>

        {/* Message / Project Notes */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#252525] mb-1">
            Project Description / Notes
          </label>
          <textarea
            id="inquiry-message-textarea"
            rows={compact ? 3 : 4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Describe your furniture frame, foam condition, or specific fabric questions..."
            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DED8CF] text-sm text-[#252525] rounded-sm focus:outline-none focus:border-[#252525] transition-colors resize-none"
          ></textarea>
        </div>

        <button
          id="inquiry-submit-btn"
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-6 bg-[#252525] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting to Shop...</span>
            </>
          ) : (
            <>
              <span>Submit Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-[#F1EEE9] text-center text-xs text-[#252525]/60">
        Direct telephone contact: <a href={BUSINESS_INFO.phoneTel} className="font-semibold underline text-[#252525]">{BUSINESS_INFO.phone}</a>
      </div>
    </form>
  );
};
