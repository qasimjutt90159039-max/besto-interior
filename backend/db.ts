import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterial extends Document {
  name: string;
  category: string;
  description: string;
  image: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IService extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  status: string;
  suitableFor?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGallery extends Document {
  title: string;
  image: string;
  category: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInquiry extends Document {
  name: string;
  phone: string;
  furnitureType: string;
  material: string;
  message: string;
  referenceImage?: string;
  status: string;
  createdAt: Date;
}

const MaterialSchema = new Schema<IMaterial>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  status: { type: String, default: 'Active' },
}, { timestamps: true });

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, default: 'Upholstery' },
  status: { type: String, default: 'Active' },
  suitableFor: { type: String, default: '' }
}, { timestamps: true });

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, default: 'Fabric' },
  caption: { type: String, default: '' }
}, { timestamps: true });

const InquirySchema = new Schema<IInquiry>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  furnitureType: { type: String, default: 'Sofa' },
  material: { type: String, default: 'Not specified' },
  message: { type: String, default: '' },
  referenceImage: { type: String, default: '' },
  status: { type: String, default: 'New' }
}, { timestamps: true });

export const MaterialModel: mongoose.Model<IMaterial> = mongoose.models.Material || mongoose.model<IMaterial>('Material', MaterialSchema);
export const ServiceModel: mongoose.Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
export const GalleryModel: mongoose.Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
export const InquiryModel: mongoose.Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

let isConnected = false;

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[DB] No MONGODB_URI provided. Running with active in-memory / local persistent repository.');
    return false;
  }
  if (isConnected) return true;
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('[DB] Connected successfully to MongoDB.');
    return true;
  } catch (err) {
    console.warn('[DB] MongoDB connection failed, utilizing resilient repository fallback:', (err as Error).message);
    return false;
  }
}

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
