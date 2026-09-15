import React, { useState, useEffect } from 'react';
import {
  adminLogin,
  fetchOverviewStats,
  fetchMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  fetchServices,
  createService,
  updateService,
  deleteService,
  fetchGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../services/api';
import { MaterialItem, ServiceItem, GalleryItem, InquiryItem, InquiryStatus, BUSINESS_INFO } from '../types';
import { SafeImage } from '../components/SafeImage';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Layers,
  Sparkles,
  Scissors,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Phone,
  Search,
  ExternalLink,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem('besto_admin_token');
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'services' | 'gallery' | 'inquiries'>('overview');

  // Stats
  const [stats, setStats] = useState<any>(null);

  // Data lists
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('All');

  // Modals & Form states
  const [editingMaterial, setEditingMaterial] = useState<Partial<MaterialItem> | null>(null);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);

  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated, inquiryStatusFilter]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsData, matData, srvData, galData, inqData] = await Promise.all([
        fetchOverviewStats().catch(() => null),
        fetchMaterials().catch(() => []),
        fetchServices().catch(() => []),
        fetchGallery().catch(() => []),
        fetchInquiries(inquiryStatusFilter).catch(() => [])
      ]);
      setStats(statsData);
      setMaterials(matData);
      setServices(srvData);
      setGallery(galData);
      setInquiries(inqData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await adminLogin(password);
      if (res.success && res.token) {
        sessionStorage.setItem('besto_admin_token', res.token);
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setAuthError(res.error || 'Invalid password');
      }
    } catch (err) {
      setAuthError('Connection error. Please retry.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('besto_admin_token');
    setIsAuthenticated(false);
  };

  const flashMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Material Actions
  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial || !editingMaterial.name || !editingMaterial.image) return;
    try {
      const id = editingMaterial._id || editingMaterial.id;
      if (id) {
        await updateMaterial(id, editingMaterial);
        flashMessage('Material updated successfully');
      } else {
        await createMaterial(editingMaterial);
        flashMessage('Material added successfully');
      }
      setEditingMaterial(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error saving material');
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;
    try {
      await deleteMaterial(id);
      flashMessage('Material deleted');
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error deleting material');
    }
  };

  // Service Actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title || !editingService.image) return;
    try {
      const id = editingService._id || editingService.id;
      if (id) {
        await updateService(id, editingService);
        flashMessage('Service updated');
      } else {
        await createService(editingService);
        flashMessage('Service added');
      }
      setEditingService(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error saving service');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteService(id);
      flashMessage('Service deleted');
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error deleting service');
    }
  };

  // Gallery Actions
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery || !editingGallery.title || !editingGallery.image) return;
    try {
      const id = editingGallery._id || editingGallery.id;
      if (id) {
        await updateGalleryItem(id, editingGallery);
        flashMessage('Gallery item updated');
      } else {
        await createGalleryItem(editingGallery);
        flashMessage('Gallery item added');
      }
      setEditingGallery(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error saving gallery item');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await deleteGalleryItem(id);
      flashMessage('Gallery item deleted');
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error deleting gallery item');
    }
  };

  // Inquiry Status Actions
  const handleStatusChange = async (inqId: string, newStatus: string) => {
    try {
      await updateInquiryStatus(inqId, newStatus);
      flashMessage('Inquiry status set to ' + newStatus);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry record?')) return;
    try {
      await deleteInquiry(id);
      flashMessage('Inquiry deleted');
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Error deleting inquiry');
    }
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FAF9F6]">
        <div className="w-full max-w-md bg-white border border-[#DED8CF] p-8 rounded-xs shadow-sm">
          <div className="text-center mb-6 space-y-2">
            <div className="w-10 h-10 bg-[#FAF9F6] border border-[#DED8CF] rounded-full flex items-center justify-center mx-auto text-[#252525]">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif text-[#252525]">Besto Interior Admin</h2>
            <p className="text-xs text-[#252525]/60">
              Upholstery studio management portal. Enter your management password.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#252525] mb-1">
                Admin Password
              </label>
              <input
                id="admin-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs text-sm text-[#252525] focus:outline-none focus:border-[#252525]"
              />
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3 bg-[#252525] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-colors cursor-pointer"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#F1EEE9] text-center text-[11px] text-[#252525]/50">
            Default environment password is configured via ADMIN_PASSWORD.
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#252525]">
      {/* Top Admin Header */}
      <div className="bg-white border-b border-[#DED8CF] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#252525]" />
            <div>
              <h1 className="font-serif text-xl text-[#252525] font-medium leading-none">
                Besto Interior Management
              </h1>
              <span className="text-[10px] tracking-widest uppercase text-[#252525]/50">
                Ichra Furniture Market Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {actionMessage && (
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xs animate-fade-in">
                {actionMessage}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#DED8CF] text-xs uppercase tracking-wider text-[#252525] hover:bg-[#FAF9F6] rounded-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#FAF9F6] border-b border-[#DED8CF] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex overflow-x-auto space-x-6 py-2.5 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: Clock },
            { id: 'materials', label: `Materials (${materials.length})`, icon: Layers },
            { id: 'services', label: `Services (${services.length})`, icon: Scissors },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
            { id: 'inquiries', label: `Customer Inquiries (${inquiries.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#252525] text-[#252525] font-semibold'
                    : 'border-transparent text-[#252525]/60 hover:text-black'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dashboard Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* ========================================================
            TAB 1: OVERVIEW
        ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block mb-1">
                  Customer Inquiries
                </span>
                <div className="text-3xl font-serif text-[#252525]">
                  {stats?.inquiriesCount || inquiries.length}
                </div>
                <div className="mt-2 text-xs text-[#252525]/60">
                  New: {stats?.statusCounts?.New || 0} • In Progress: {stats?.statusCounts?.['In Progress'] || 0}
                </div>
              </div>

              <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block mb-1">
                  Materials in Archive
                </span>
                <div className="text-3xl font-serif text-[#252525]">
                  {stats?.materials || materials.length}
                </div>
                <div className="mt-2 text-xs text-[#252525]/60">
                  Textured, Neutral, Soft & Contemporary
                </div>
              </div>

              <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block mb-1">
                  Upholstery Services
                </span>
                <div className="text-3xl font-serif text-[#252525]">
                  {stats?.services || services.length}
                </div>
                <div className="mt-2 text-xs text-[#252525]/60">
                  Active service offerings
                </div>
              </div>

              <div className="p-6 bg-white border border-[#DED8CF] rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block mb-1">
                  Gallery Visuals
                </span>
                <div className="text-3xl font-serif text-[#252525]">
                  {stats?.gallery || gallery.length}
                </div>
                <div className="mt-2 text-xs text-[#252525]/60">
                  Visual inspiration assets
                </div>
              </div>
            </div>

            {/* Recent Inquiries Quick Table */}
            <div className="bg-white border border-[#DED8CF] p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#252525]">Recent Customer Inquiries</h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs uppercase tracking-wider font-semibold text-[#252525] hover:underline"
                >
                  View All Inquiries &rarr;
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#252525]/60">
                  No inquiries received yet. Submissions from the website will appear here in real time.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#DED8CF] text-[10px] uppercase tracking-widest text-[#252525]/60">
                        <th className="pb-2">Client Name</th>
                        <th className="pb-2">Phone</th>
                        <th className="pb-2">Furniture Type</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1EEE9]">
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq._id || inq.id}>
                          <td className="py-3 font-medium text-[#252525]">{inq.name}</td>
                          <td className="py-3">
                            <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                          </td>
                          <td className="py-3">{inq.furnitureType}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs text-[10px] uppercase tracking-wider font-semibold">
                              {inq.status}
                            </span>
                          </td>
                          <td className="py-3 text-[#252525]/60">
                            {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: MATERIALS MANAGER (CRUD)
        ======================================================== */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#252525]">Materials & Fabric Catalog</h2>
                <p className="text-xs text-[#252525]/60">
                  Manage textile samples, tactile descriptions, and category tags.
                </p>
              </div>

              <button
                id="admin-add-material-btn"
                onClick={() => setEditingMaterial({
                  name: '',
                  category: 'Neutral',
                  description: '',
                  image: '',
                  status: 'Active'
                })}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider rounded-xs hover:bg-black transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Material</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((mat) => {
                const id = mat._id || mat.id || '';
                return (
                  <div key={id} className="bg-white border border-[#DED8CF] rounded-xs p-4 flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] overflow-hidden rounded-xs bg-[#F1EEE9] mb-3">
                        <SafeImage src={mat.image} alt={mat.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#252525]/60 font-semibold">
                          {mat.category}
                        </span>
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                          {mat.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-[#252525]">{mat.name}</h4>
                      <p className="text-xs text-[#252525]/70 line-clamp-2 mt-1">{mat.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F1EEE9] flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingMaterial(mat)}
                        className="p-1.5 text-[#252525]/70 hover:text-black border border-[#DED8CF] rounded-xs"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(id)}
                        className="p-1.5 text-red-600 hover:text-red-800 border border-red-200 rounded-xs"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: SERVICES MANAGER (CRUD)
        ======================================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#252525]">Upholstery Services</h2>
                <p className="text-xs text-[#252525]/60">
                  Update service titles, suitable furniture types, and workshop descriptions.
                </p>
              </div>

              <button
                id="admin-add-service-btn"
                onClick={() => setEditingService({
                  title: '',
                  category: 'Upholstery',
                  description: '',
                  image: '',
                  suitableFor: '',
                  status: 'Active'
                })}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider rounded-xs hover:bg-black transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => {
                const id = srv._id || srv.id || '';
                return (
                  <div key={id} className="bg-white border border-[#DED8CF] rounded-xs p-5 flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/9] overflow-hidden rounded-xs bg-[#F1EEE9] mb-3">
                        <SafeImage src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#252525]/60 font-semibold">
                          {srv.category}
                        </span>
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                          {srv.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl text-[#252525]">{srv.title}</h4>
                      <p className="text-xs text-[#252525]/75 mt-1">{srv.description}</p>
                      {srv.suitableFor && (
                        <p className="text-[11px] text-[#252525]/60 mt-2 font-medium">
                          Suitable for: {srv.suitableFor}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F1EEE9] flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingService(srv)}
                        className="p-1.5 text-[#252525]/70 hover:text-black border border-[#DED8CF] rounded-xs"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(id)}
                        className="p-1.5 text-red-600 hover:text-red-800 border border-red-200 rounded-xs"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: GALLERY MANAGER (CRUD)
        ======================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#252525]">Visual Inspiration Gallery</h2>
                <p className="text-xs text-[#252525]/60">
                  Manage imagery, captions, and category tags.
                </p>
              </div>

              <button
                id="admin-add-gallery-btn"
                onClick={() => setEditingGallery({
                  title: '',
                  image: '',
                  category: 'Sofas',
                  caption: ''
                })}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider rounded-xs hover:bg-black transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Visual</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => {
                const id = item._id || item.id || '';
                return (
                  <div key={id} className="bg-white border border-[#DED8CF] rounded-xs p-4 flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/3] overflow-hidden rounded-xs bg-[#F1EEE9] mb-3">
                        <SafeImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-[#252525]/60 font-semibold block mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-lg text-[#252525]">{item.title}</h4>
                      <p className="text-xs text-[#252525]/70 line-clamp-2 mt-1">{item.caption}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F1EEE9] flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingGallery(item)}
                        className="p-1.5 text-[#252525]/70 hover:text-black border border-[#DED8CF] rounded-xs"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(id)}
                        className="p-1.5 text-red-600 hover:text-red-800 border border-red-200 rounded-xs"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: CUSTOMER INQUIRIES MANAGER
        ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#252525]">Customer Inquiries</h2>
                <p className="text-xs text-[#252525]/60">
                  Track client inquiries, review details, and update project workflow status.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#252525]/60">Filter Status:</span>
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-[#DED8CF] text-xs rounded-xs focus:outline-none focus:border-[#252525]"
                >
                  <option value="All">All Inquiries</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-16 text-center bg-white border border-[#DED8CF] rounded-xs p-8">
                <p className="text-xs text-[#252525]/60">No inquiries found matching this filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => {
                  const id = inq._id || inq.id || '';
                  return (
                    <div
                      key={id}
                      className="bg-white border border-[#DED8CF] p-6 rounded-xs shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EEE9] pb-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#252525]/50 block">
                            Client Name
                          </span>
                          <h3 className="font-serif text-xl text-[#252525]">{inq.name}</h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#252525]/60">Status:</span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(id, e.target.value)}
                            className="px-3 py-1 bg-[#FAF9F6] border border-[#DED8CF] text-xs font-semibold rounded-xs focus:outline-none focus:border-[#252525]"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(id)}
                            className="p-1 text-red-600 hover:text-red-800 ml-2"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#252525]/50 block mb-0.5">
                            Phone Number
                          </span>
                          <a
                            href={`tel:${inq.phone}`}
                            className="font-medium text-[#252525] hover:underline flex items-center gap-1.5"
                          >
                            <Phone className="w-3 h-3 text-[#252525]/60" />
                            <span>{inq.phone}</span>
                          </a>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#252525]/50 block mb-0.5">
                            Furniture Type
                          </span>
                          <span className="font-medium text-[#252525]">{inq.furnitureType}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#252525]/50 block mb-0.5">
                            Preferred Material
                          </span>
                          <span className="font-medium text-[#252525]">{inq.material || 'Not specified'}</span>
                        </div>
                      </div>

                      {inq.message && (
                        <div className="p-3 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs text-xs text-[#252525]/80">
                          <span className="text-[10px] uppercase tracking-wider text-[#252525]/50 block mb-1">
                            Client Message / Notes:
                          </span>
                          <p>{inq.message}</p>
                        </div>
                      )}

                      {inq.referenceImage && (
                        <div className="text-xs">
                          <span className="text-[10px] uppercase tracking-wider text-[#252525]/50 block mb-1">
                            Reference Image Link:
                          </span>
                          <a
                            href={inq.referenceImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#252525] underline flex items-center gap-1 hover:opacity-75"
                          >
                            <span>Open Reference Image</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================
          EDIT MATERIAL MODAL
      ======================================================== */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#DED8CF] p-6 rounded-xs shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F1EEE9]">
              <h3 className="font-serif text-xl text-[#252525]">
                {editingMaterial._id || editingMaterial.id ? 'Edit Material' : 'Add New Material'}
              </h3>
              <button onClick={() => setEditingMaterial(null)} className="p-1 text-[#252525]/60 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Material Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingMaterial.name || ''}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
                  placeholder="e.g. Raw Natural Flax Linen"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingMaterial.category || 'Neutral'}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                  >
                    <option value="Neutral">Neutral</option>
                    <option value="Textured">Textured</option>
                    <option value="Soft">Soft</option>
                    <option value="Contemporary">Contemporary</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                    Status
                  </label>
                  <select
                    value={editingMaterial.status || 'Active'}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                  >
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={editingMaterial.image || ''}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Tactile Description
                </label>
                <textarea
                  rows={3}
                  value={editingMaterial.description || ''}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                  placeholder="Describe the tactile feel, weave texture, and drape..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)}
                  className="px-4 py-2 border border-[#DED8CF] rounded-xs text-[#252525]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#252525] text-white rounded-xs uppercase tracking-wider font-medium hover:bg-black"
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT SERVICE MODAL
      ======================================================== */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#DED8CF] p-6 rounded-xs shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F1EEE9]">
              <h3 className="font-serif text-xl text-[#252525]">
                {editingService._id || editingService.id ? 'Edit Service' : 'Add Service'}
              </h3>
              <button onClick={() => setEditingService(null)} className="p-1 text-[#252525]/60 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. Sofa Upholstery"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={editingService.image || ''}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Suitable Furniture Types
                </label>
                <input
                  type="text"
                  value={editingService.suitableFor || ''}
                  onChange={(e) => setEditingService({ ...editingService, suitableFor: e.target.value })}
                  placeholder="e.g. Sectionals, 2-Seaters, Armchairs..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Provide service details..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 border border-[#DED8CF] rounded-xs text-[#252525]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#252525] text-white rounded-xs uppercase tracking-wider font-medium hover:bg-black"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT GALLERY MODAL
      ======================================================== */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#DED8CF] p-6 rounded-xs shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F1EEE9]">
              <h3 className="font-serif text-xl text-[#252525]">
                {editingGallery._id || editingGallery.id ? 'Edit Gallery Item' : 'Add Gallery Item'}
              </h3>
              <button onClick={() => setEditingGallery(null)} className="p-1 text-[#252525]/60 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingGallery.title || ''}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  placeholder="e.g. Minimalist Curved Lounge Chair"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingGallery.category || 'Sofas'}
                    onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                  >
                    <option value="Sofas">Sofas</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Textures">Textures</option>
                    <option value="Custom">Custom</option>
                    <option value="Living">Living</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingGallery.image || ''}
                    onChange={(e) => setEditingGallery({ ...editingGallery, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#252525] mb-1">
                  Caption
                </label>
                <textarea
                  rows={3}
                  value={editingGallery.caption || ''}
                  onChange={(e) => setEditingGallery({ ...editingGallery, caption: e.target.value })}
                  placeholder="Caption detailing the design inspiration..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DED8CF] rounded-xs resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="px-4 py-2 border border-[#DED8CF] rounded-xs text-[#252525]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#252525] text-white rounded-xs uppercase tracking-wider font-medium hover:bg-black"
                >
                  Save Visual
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
