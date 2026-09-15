import { Router, Request, Response } from 'express';
import {
  MaterialModel,
  ServiceModel,
  GalleryModel,
  InquiryModel,
  isMongoConnected
} from './db.js';
import { initialMaterials, initialServices, initialGallery } from './seedData.js';

const router = Router();

// In-memory persistent state if MongoDB is not connected
let memoryMaterials = [...initialMaterials.map(m => ({ ...m, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }))];
let memoryServices = [...initialServices.map(s => ({ ...s, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }))];
let memoryGallery = [...initialGallery.map(g => ({ ...g, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }))];
let memoryInquiries: any[] = [];

// Seed MongoDB if empty and connected
export async function seedMongoIfEmpty() {
  if (!isMongoConnected()) return;
  try {
    const matCount = await MaterialModel.countDocuments();
    if (matCount === 0) {
      await MaterialModel.insertMany(initialMaterials.map(m => ({ ...m, _id: undefined })) as any);
    }
    const srvCount = await ServiceModel.countDocuments();
    if (srvCount === 0) {
      await ServiceModel.insertMany(initialServices.map(s => ({ ...s, _id: undefined })) as any);
    }
    const galCount = await GalleryModel.countDocuments();
    if (galCount === 0) {
      await GalleryModel.insertMany(initialGallery.map(g => ({ ...g, _id: undefined })) as any);
    }
  } catch (err) {
    console.error('Error seeding initial MongoDB collections:', err);
  }
}

// -------------------------------------------------------------
// Admin Auth & Stats
// -------------------------------------------------------------
router.post('/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || 'admin';
  if (password === configuredPassword) {
    return res.json({ success: true, token: 'besto-admin-token-' + Date.now() });
  }
  return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
});

router.get('/overview', async (req: Request, res: Response) => {
  try {
    if (isMongoConnected()) {
      const [materials, services, gallery, inquiries] = await Promise.all([
        MaterialModel.countDocuments(),
        ServiceModel.countDocuments(),
        GalleryModel.countDocuments(),
        InquiryModel.find().sort({ createdAt: -1 })
      ]);
      const statusCounts = inquiries.reduce((acc: any, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});
      return res.json({
        materials,
        services,
        gallery,
        inquiriesCount: inquiries.length,
        statusCounts,
        recentInquiries: inquiries.slice(0, 5)
      });
    } else {
      const statusCounts = memoryInquiries.reduce((acc: any, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});
      return res.json({
        materials: memoryMaterials.length,
        services: memoryServices.length,
        gallery: memoryGallery.length,
        inquiriesCount: memoryInquiries.length,
        statusCounts,
        recentInquiries: memoryInquiries.slice(0, 5)
      });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch overview metrics' });
  }
});

// -------------------------------------------------------------
// MATERIALS API
// -------------------------------------------------------------
router.get('/materials', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    if (isMongoConnected()) {
      const query: any = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { name: { $regex: String(search), $options: 'i' } },
          { description: { $regex: String(search), $options: 'i' } }
        ];
      }
      const materials = await MaterialModel.find(query).sort({ createdAt: -1 });
      return res.json(materials);
    } else {
      let filtered = [...memoryMaterials];
      if (category && category !== 'All') {
        filtered = filtered.filter(m => m.category.toLowerCase() === String(category).toLowerCase());
      }
      if (search) {
        const q = String(search).toLowerCase();
        filtered = filtered.filter(m => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
      }
      return res.json(filtered);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching materials' });
  }
});

router.post('/materials', async (req: Request, res: Response) => {
  try {
    const { name, category, description, image, status } = req.body;
    if (!name || !category || !image) {
      return res.status(400).json({ error: 'Name, category, and image URL are required' });
    }
    const itemData = {
      name,
      category,
      description: description || '',
      image,
      status: status || 'Active'
    };

    if (isMongoConnected()) {
      const doc = await MaterialModel.create(itemData);
      return res.status(201).json(doc);
    } else {
      const newItem = {
        id: 'mat-' + Date.now(),
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      memoryMaterials.unshift(newItem);
      return res.status(201).json(newItem);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create material record' });
  }
});

router.get('/materials/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const doc = await MaterialModel.findById(id);
      if (!doc) return res.status(404).json({ error: 'Material not found' });
      return res.json(doc);
    } else {
      const item = memoryMaterials.find(m => m.id === id || (m as any)._id === id);
      if (!item) return res.status(404).json({ error: 'Material not found' });
      return res.json(item);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching material' });
  }
});

router.put('/materials/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, description, image, status } = req.body;
    if (isMongoConnected()) {
      const doc = await MaterialModel.findByIdAndUpdate(
        id,
        { name, category, description, image, status },
        { new: true }
      );
      if (!doc) return res.status(404).json({ error: 'Material not found' });
      return res.json(doc);
    } else {
      const index = memoryMaterials.findIndex(m => m.id === id || (m as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Material not found' });
      memoryMaterials[index] = {
        ...memoryMaterials[index],
        name: name !== undefined ? name : memoryMaterials[index].name,
        category: category !== undefined ? category : memoryMaterials[index].category,
        description: description !== undefined ? description : memoryMaterials[index].description,
        image: image !== undefined ? image : memoryMaterials[index].image,
        status: status !== undefined ? status : memoryMaterials[index].status,
        updatedAt: new Date().toISOString()
      };
      return res.json(memoryMaterials[index]);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error updating material' });
  }
});

router.delete('/materials/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const deleted = await MaterialModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Material not found' });
      return res.json({ success: true, message: 'Material deleted successfully' });
    } else {
      const index = memoryMaterials.findIndex(m => m.id === id || (m as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Material not found' });
      memoryMaterials.splice(index, 1);
      return res.json({ success: true, message: 'Material deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting material' });
  }
});

// -------------------------------------------------------------
// SERVICES API
// -------------------------------------------------------------
router.get('/services', async (req: Request, res: Response) => {
  try {
    if (isMongoConnected()) {
      const services = await ServiceModel.find().sort({ createdAt: 1 });
      return res.json(services);
    } else {
      return res.json(memoryServices);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching services' });
  }
});

router.post('/services', async (req: Request, res: Response) => {
  try {
    const { title, description, image, category, status, suitableFor } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ error: 'Title, description, and image URL are required' });
    }
    const data = {
      title,
      description,
      image,
      category: category || 'Upholstery',
      status: status || 'Active',
      suitableFor: suitableFor || ''
    };
    if (isMongoConnected()) {
      const doc = await ServiceModel.create(data);
      return res.status(201).json(doc);
    } else {
      const newItem = {
        id: 'srv-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      memoryServices.push(newItem);
      return res.status(201).json(newItem);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create service' });
  }
});

router.get('/services/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const doc = await ServiceModel.findById(id);
      if (!doc) return res.status(404).json({ error: 'Service not found' });
      return res.json(doc);
    } else {
      const item = memoryServices.find(s => s.id === id || (s as any)._id === id);
      if (!item) return res.status(404).json({ error: 'Service not found' });
      return res.json(item);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching service' });
  }
});

router.put('/services/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, image, category, status, suitableFor } = req.body;
    if (isMongoConnected()) {
      const doc = await ServiceModel.findByIdAndUpdate(
        id,
        { title, description, image, category, status, suitableFor },
        { new: true }
      );
      if (!doc) return res.status(404).json({ error: 'Service not found' });
      return res.json(doc);
    } else {
      const index = memoryServices.findIndex(s => s.id === id || (s as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Service not found' });
      memoryServices[index] = {
        ...memoryServices[index],
        title: title !== undefined ? title : memoryServices[index].title,
        description: description !== undefined ? description : memoryServices[index].description,
        image: image !== undefined ? image : memoryServices[index].image,
        category: category !== undefined ? category : memoryServices[index].category,
        status: status !== undefined ? status : memoryServices[index].status,
        suitableFor: suitableFor !== undefined ? suitableFor : memoryServices[index].suitableFor,
        updatedAt: new Date().toISOString()
      };
      return res.json(memoryServices[index]);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error updating service' });
  }
});

router.delete('/services/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const deleted = await ServiceModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Service not found' });
      return res.json({ success: true, message: 'Service deleted successfully' });
    } else {
      const index = memoryServices.findIndex(s => s.id === id || (s as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Service not found' });
      memoryServices.splice(index, 1);
      return res.json({ success: true, message: 'Service deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting service' });
  }
});

// -------------------------------------------------------------
// GALLERY API
// -------------------------------------------------------------
router.get('/gallery', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    if (isMongoConnected()) {
      const query: any = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const gallery = await GalleryModel.find(query).sort({ createdAt: -1 });
      return res.json(gallery);
    } else {
      let filtered = [...memoryGallery];
      if (category && category !== 'All') {
        filtered = filtered.filter(g => g.category.toLowerCase() === String(category).toLowerCase());
      }
      return res.json(filtered);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching gallery items' });
  }
});

router.post('/gallery', async (req: Request, res: Response) => {
  try {
    const { title, image, category, caption } = req.body;
    if (!title || !image) {
      return res.status(400).json({ error: 'Title and image URL are required' });
    }
    const data = {
      title,
      image,
      category: category || 'Inspiration',
      caption: caption || ''
    };
    if (isMongoConnected()) {
      const doc = await GalleryModel.create(data);
      return res.status(201).json(doc);
    } else {
      const newItem = {
        id: 'gal-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      memoryGallery.unshift(newItem);
      return res.status(201).json(newItem);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

router.get('/gallery/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const doc = await GalleryModel.findById(id);
      if (!doc) return res.status(404).json({ error: 'Gallery item not found' });
      return res.json(doc);
    } else {
      const item = memoryGallery.find(g => g.id === id || (g as any)._id === id);
      if (!item) return res.status(404).json({ error: 'Gallery item not found' });
      return res.json(item);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching gallery item' });
  }
});

router.put('/gallery/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, image, category, caption } = req.body;
    if (isMongoConnected()) {
      const doc = await GalleryModel.findByIdAndUpdate(
        id,
        { title, image, category, caption },
        { new: true }
      );
      if (!doc) return res.status(404).json({ error: 'Gallery item not found' });
      return res.json(doc);
    } else {
      const index = memoryGallery.findIndex(g => g.id === id || (g as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Gallery item not found' });
      memoryGallery[index] = {
        ...memoryGallery[index],
        title: title !== undefined ? title : memoryGallery[index].title,
        image: image !== undefined ? image : memoryGallery[index].image,
        category: category !== undefined ? category : memoryGallery[index].category,
        caption: caption !== undefined ? caption : memoryGallery[index].caption,
        updatedAt: new Date().toISOString()
      };
      return res.json(memoryGallery[index]);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error updating gallery item' });
  }
});

router.delete('/gallery/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const deleted = await GalleryModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Gallery item not found' });
      return res.json({ success: true, message: 'Gallery item deleted' });
    } else {
      const index = memoryGallery.findIndex(g => g.id === id || (g as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Gallery item not found' });
      memoryGallery.splice(index, 1);
      return res.json({ success: true, message: 'Gallery item deleted' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting gallery item' });
  }
});

// -------------------------------------------------------------
// INQUIRIES API
// -------------------------------------------------------------
router.post('/inquiries', async (req: Request, res: Response) => {
  try {
    const { name, phone, furnitureType, material, message, referenceImage } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Customer name is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Customer contact phone is required' });
    }

    const inquiryData = {
      name: name.trim(),
      phone: phone.trim(),
      furnitureType: furnitureType || 'Sofa Upholstery',
      material: material || 'Inquire in-shop',
      message: message ? message.trim() : '',
      referenceImage: referenceImage || '',
      status: 'New'
    };

    if (isMongoConnected()) {
      const doc = await InquiryModel.create(inquiryData);
      return res.status(201).json({ success: true, data: doc });
    } else {
      const newInquiry = {
        id: 'inq-' + Date.now(),
        ...inquiryData,
        createdAt: new Date().toISOString()
      };
      memoryInquiries.unshift(newInquiry);
      return res.status(201).json({ success: true, data: newInquiry });
    }
  } catch (error) {
    return res.status(500).json({ error: 'We could not submit your inquiry at this moment. Please call directly at +92 301 8482871.' });
  }
});

router.get('/inquiries', async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    if (isMongoConnected()) {
      const query: any = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      const list = await InquiryModel.find(query).sort({ createdAt: -1 });
      return res.json(list);
    } else {
      let list = [...memoryInquiries];
      if (status && status !== 'All') {
        list = list.filter(i => i.status === status);
      }
      return res.json(list);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching inquiries' });
  }
});

router.put('/inquiries/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    if (isMongoConnected()) {
      const doc = await InquiryModel.findByIdAndUpdate(id, { status }, { new: true });
      if (!doc) return res.status(404).json({ error: 'Inquiry not found' });
      return res.json(doc);
    } else {
      const index = memoryInquiries.findIndex(i => i.id === id || (i as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Inquiry not found' });
      memoryInquiries[index] = {
        ...memoryInquiries[index],
        status
      };
      return res.json(memoryInquiries[index]);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error updating inquiry status' });
  }
});

router.delete('/inquiries/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const deleted = await InquiryModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Inquiry not found' });
      return res.json({ success: true, message: 'Inquiry deleted' });
    } else {
      const index = memoryInquiries.findIndex(i => i.id === id || (i as any)._id === id);
      if (index === -1) return res.status(404).json({ error: 'Inquiry not found' });
      memoryInquiries.splice(index, 1);
      return res.json({ success: true, message: 'Inquiry deleted' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting inquiry' });
  }
});

export default router;
