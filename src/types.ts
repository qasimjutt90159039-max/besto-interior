export interface MaterialItem {
  _id?: string;
  id?: string;
  name: string;
  category: 'Neutral' | 'Textured' | 'Soft' | 'Contemporary' | string;
  description: string;
  image: string;
  status: 'Active' | 'Archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status: 'Active' | 'Inactive';
  suitableFor?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  _id?: string;
  id?: string;
  title: string;
  image: string;
  category: string;
  caption: string;
  createdAt?: string;
  updatedAt?: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed';

export interface InquiryItem {
  _id?: string;
  id?: string;
  name: string;
  phone: string;
  furnitureType: string;
  material: string;
  message: string;
  referenceImage?: string;
  status: InquiryStatus;
  createdAt?: string;
}

export const BUSINESS_INFO = {
  name: 'Besto Interior',
  category: 'Upholstery Shop',
  phone: '+92 301 8482871',
  phoneTel: 'tel:+923018482871',
  address: 'Hashmi Street, Ichra Furniture Market, Lahore Main Feroz, Road, Pur, Lahore, 54000, Pakistan',
  locationBrief: 'Ichra Furniture Market, Lahore',
  socialMedia: 'None provided'
} as const;
