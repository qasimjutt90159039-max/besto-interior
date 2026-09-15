import React from 'react';
import { InquiryForm } from '../components/InquiryForm';
import { Phone, MapPin, Building, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

export const Contact: React.FC = () => {
  // Google maps embed query for Hashmi Street, Ichra Furniture Market, Lahore
  const mapsSearchQuery = encodeURIComponent(
    'Hashmi Street, Ichra Furniture Market, Lahore Main Ferozepur Road, Lahore, 54000, Pakistan'
  );
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapsSearchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-[#FAF9F6] text-[#252525]">
      {/* Header */}
      <section className="py-14 sm:py-20 border-b border-[#DED8CF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/60 font-semibold block">
              Direct Contact • Shop Details
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#252525] leading-tight">
              Contact Besto Interior
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/75 leading-relaxed pt-1">
              Visit our workshop in Ichra Furniture Market or connect directly via telephone. You may also submit your furniture details below for personalized advice.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Info Card + Contact Form */}
      <section className="py-16 sm:py-24 border-b border-[#DED8CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Verified Business Information Card */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white border border-[#DED8CF] p-8 rounded-xs shadow-xs space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#252525]/50 font-bold block mb-1">
                    Verified Business Details
                  </span>
                  <h2 className="text-2xl font-serif text-[#252525]">
                    {BUSINESS_INFO.name}
                  </h2>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Category */}
                  <div className="flex items-start gap-3 p-3 bg-[#FAF9F6] border border-[#DED8CF]/80 rounded-xs">
                    <Building className="w-4 h-4 text-[#252525] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#252525]/60 block">Category</span>
                      <span className="font-semibold text-[#252525] text-sm">{BUSINESS_INFO.category}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 p-3 bg-[#FAF9F6] border border-[#DED8CF]/80 rounded-xs">
                    <Phone className="w-4 h-4 text-[#252525] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#252525]/60 block">Direct Telephone</span>
                      <a
                        id="contact-page-phone-link"
                        href={BUSINESS_INFO.phoneTel}
                        className="font-semibold text-sm text-[#252525] hover:underline"
                      >
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 p-3 bg-[#FAF9F6] border border-[#DED8CF]/80 rounded-xs">
                    <MapPin className="w-4 h-4 text-[#252525] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#252525]/60 block">Shop Address</span>
                      <p className="font-normal text-[#252525] leading-relaxed">
                        {BUSINESS_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Social Media Notice */}
                  <div className="p-3 bg-[#FAF9F6] border border-[#DED8CF]/80 rounded-xs text-[11px] text-[#252525]/70">
                    <span className="text-[10px] uppercase tracking-wider text-[#252525]/60 block mb-0.5">Social Media</span>
                    <span>{BUSINESS_INFO.socialMedia}</span>
                  </div>
                </div>

                {/* Primary Call Action */}
                <div className="pt-2">
                  <a
                    id="contact-call-action-btn"
                    href={BUSINESS_INFO.phoneTel}
                    className="w-full py-3.5 px-4 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-xs hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Shop: {BUSINESS_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Market Context */}
              <div className="p-6 bg-white border border-[#DED8CF] rounded-xs text-xs text-[#252525]/75 space-y-2">
                <span className="font-semibold block text-[#252525]">Visiting Ichra Furniture Market</span>
                <p className="leading-relaxed">
                  Hashmi Street is situated within the bustling Ichra Furniture Market near Lahore Main Ferozepur Road. For directions or scheduling on-site furniture inspection, please contact us by phone before arrival.
                </p>
              </div>

            </div>

            {/* Right: Working Upholstery & Contact Inquiry Form */}
            <div className="lg:col-span-7">
              <InquiryForm
                title="Send An Upholstery Inquiry"
                initialFurnitureType="General Inquiry / Furniture Consultation"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Location Section using Exact Address */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#252525]/50 block mb-1">
              Location Map
            </span>
            <h2 className="text-3xl font-serif text-[#252525]">
              Hashmi Street, Ichra Furniture Market, Lahore
            </h2>
            <p className="text-xs text-[#252525]/70 mt-1">
              Lahore Main Feroz, Road, Pur, Lahore, 54000, Pakistan
            </p>
          </div>

          <div className="w-full h-[450px] border border-[#DED8CF] rounded-xs overflow-hidden bg-[#FAF9F6] shadow-xs relative">
            <iframe
              id="google-maps-embed-frame"
              title="Besto Interior Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>
    </div>
  );
};
