import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { LightboxModal } from './components/LightboxModal';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Materials } from './pages/Materials';
import { SofaUpholstery } from './pages/SofaUpholstery';
import { ChairUpholstery } from './pages/ChairUpholstery';
import { CustomUpholstery } from './pages/CustomUpholstery';
import { GalleryPage } from './pages/GalleryPage';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { fetchMaterials, fetchServices, fetchGallery } from './services/api';
import { MaterialItem, ServiceItem, GalleryItem } from './types';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Global Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryFurnitureType, setInquiryFurnitureType] = useState<string | undefined>();
  const [inquiryMaterial, setInquiryMaterial] = useState<string | undefined>();

  // Global Lightbox Modal State
  const [lightboxItem, setLightboxItem] = useState<{
    title: string;
    image: string;
    caption?: string;
    category?: string;
  } | null>(null);

  // Load initial backend catalog
  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      try {
        setLoading(true);
        const [mats, srvs, gals] = await Promise.all([
          fetchMaterials().catch(() => []),
          fetchServices().catch(() => []),
          fetchGallery().catch(() => [])
        ]);

        if (isMounted) {
          setMaterials(mats);
          setServices(srvs);
          setGallery(gals);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to load studio catalog');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenInquiry = (initialFurniture?: string, initialMaterial?: string) => {
    setInquiryFurnitureType(initialFurniture);
    setInquiryMaterial(initialMaterial);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setInquiryFurnitureType(undefined);
    setInquiryMaterial(undefined);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#252525] antialiased selection:bg-[#252525] selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar onOpenInquiry={() => handleOpenInquiry('General Furniture Consultation')} />

        {/* Dynamic Route Content */}
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  materials={materials}
                  services={services}
                  onOpenLightbox={setLightboxItem}
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/services"
              element={
                <Services
                  services={services}
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/materials"
              element={
                <Materials
                  materials={materials}
                  loading={loading}
                  error={error}
                  onOpenLightbox={setLightboxItem}
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/sofa-upholstery"
              element={
                <SofaUpholstery
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/chair-upholstery"
              element={
                <ChairUpholstery
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/custom-upholstery"
              element={<CustomUpholstery />}
            />
            <Route
              path="/gallery"
              element={
                <GalleryPage
                  gallery={gallery}
                  loading={loading}
                  error={error}
                  onOpenLightbox={setLightboxItem}
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
                  <h2 className="text-3xl font-serif text-[#252525]">Page Not Found</h2>
                  <p className="text-xs text-[#252525]/70">
                    The requested page does not exist or has been relocated.
                  </p>
                  <div>
                    <a
                      href="/"
                      className="inline-block px-6 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-black"
                    >
                      Return to Studio Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Global Inquiry Modal */}
        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={handleCloseInquiry}
          initialFurnitureType={inquiryFurnitureType}
          initialMaterial={inquiryMaterial}
        />

        {/* Global Lightbox Modal */}
        <LightboxModal
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
          onInquire={(title) => {
            setLightboxItem(null);
            handleOpenInquiry(title);
          }}
        />

      </div>
    </BrowserRouter>
  );
}
