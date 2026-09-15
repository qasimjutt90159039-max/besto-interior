import { MaterialItem, ServiceItem, GalleryItem, InquiryItem } from '../types';

export const API_BASE = '/api';

export async function fetchMaterials(category?: string, search?: string): Promise<MaterialItem[]> {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search && search.trim()) params.append('search', search.trim());
  const res = await fetch(`${API_BASE}/materials?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load materials');
  return res.json();
}

export async function createMaterial(data: Partial<MaterialItem>): Promise<MaterialItem> {
  const res = await fetch(`${API_BASE}/materials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create material' }));
    throw new Error(err.error || 'Failed to create material');
  }
  return res.json();
}

export async function updateMaterial(id: string, data: Partial<MaterialItem>): Promise<MaterialItem> {
  const res = await fetch(`${API_BASE}/materials/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update material' }));
    throw new Error(err.error || 'Failed to update material');
  }
  return res.json();
}

export async function deleteMaterial(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/materials/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete material');
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/services`);
  if (!res.ok) throw new Error('Failed to load services');
  return res.json();
}

export async function createService(data: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch(`${API_BASE}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create service' }));
    throw new Error(err.error || 'Failed to create service');
  }
  return res.json();
}

export async function updateService(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch(`${API_BASE}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update service' }));
    throw new Error(err.error || 'Failed to update service');
  }
  return res.json();
}

export async function deleteService(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/services/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete service');
}

export async function fetchGallery(category?: string): Promise<GalleryItem[]> {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  const res = await fetch(`${API_BASE}/gallery?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load gallery items');
  return res.json();
}

export async function createGalleryItem(data: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to add gallery item' }));
    throw new Error(err.error || 'Failed to add gallery item');
  }
  return res.json();
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update gallery item' }));
    throw new Error(err.error || 'Failed to update gallery item');
  }
  return res.json();
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete gallery item');
}

export async function submitInquiry(data: {
  name: string;
  phone: string;
  furnitureType?: string;
  material?: string;
  message?: string;
  referenceImage?: string;
}): Promise<{ success: boolean; data: InquiryItem }> {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to submit inquiry' }));
    throw new Error(err.error || 'Failed to submit inquiry');
  }
  return res.json();
}

export async function fetchInquiries(status?: string): Promise<InquiryItem[]> {
  const params = new URLSearchParams();
  if (status && status !== 'All') params.append('status', status);
  const res = await fetch(`${API_BASE}/inquiries?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load inquiries');
  return res.json();
}

export async function updateInquiryStatus(id: string, status: string): Promise<InquiryItem> {
  const res = await fetch(`${API_BASE}/inquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update inquiry status' }));
    throw new Error(err.error || 'Failed to update inquiry status');
  }
  return res.json();
}

export async function deleteInquiry(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/inquiries/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete inquiry');
}

export async function adminLogin(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  return res.json();
}

export async function fetchOverviewStats(): Promise<any> {
  const res = await fetch(`${API_BASE}/overview`);
  if (!res.ok) throw new Error('Failed to load stats');
  return res.json();
}
