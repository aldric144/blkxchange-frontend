import { Product, ProductCategory } from '../types';

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "African Print Ankara Dress",
    description: "Beautiful handmade Ankara dress with vibrant African prints. Perfect for special occasions.",
    price: 89.99,
    category: ProductCategory.APPAREL,
    image_url: undefined,
    vendor_id: "1",
    stock: 15,
    rating: 4.8,
    reviews_count: 24,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Shea Butter Body Cream",
    description: "100% natural shea butter cream. Moisturizes and nourishes all skin types.",
    price: 24.99,
    category: ProductCategory.BEAUTY,
    image_url: undefined,
    vendor_id: "2",
    stock: 50,
    rating: 4.9,
    reviews_count: 156,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Black History Coffee Table Book",
    description: "Comprehensive illustrated guide to Black history and culture. 300+ pages.",
    price: 45.00,
    category: ProductCategory.BOOKS,
    image_url: undefined,
    vendor_id: "3",
    stock: 30,
    rating: 5.0,
    reviews_count: 89,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Handcrafted Wooden Sculpture",
    description: "Unique African-inspired wooden sculpture. Hand-carved by local artisan.",
    price: 125.00,
    category: ProductCategory.ART,
    image_url: undefined,
    vendor_id: "4",
    stock: 8,
    rating: 4.7,
    reviews_count: 12,
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    name: "Organic Jerk Seasoning Blend",
    description: "Authentic Caribbean jerk seasoning. All-natural ingredients, no preservatives.",
    price: 12.99,
    category: ProductCategory.FOOD,
    image_url: undefined,
    vendor_id: "5",
    stock: 100,
    rating: 4.6,
    reviews_count: 67,
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    name: "Gold Hoop Earrings",
    description: "14k gold-plated hoop earrings. Hypoallergenic and nickel-free.",
    price: 34.99,
    category: ProductCategory.JEWELRY,
    image_url: undefined,
    vendor_id: "6",
    stock: 25,
    rating: 4.8,
    reviews_count: 43,
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    name: "Bamboo Cutting Board Set",
    description: "Eco-friendly bamboo cutting board set. Includes 3 sizes for all your kitchen needs.",
    price: 39.99,
    category: ProductCategory.HOME,
    image_url: undefined,
    vendor_id: "7",
    stock: 40,
    rating: 4.5,
    reviews_count: 31,
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    name: "Wireless Bluetooth Speaker",
    description: "Portable Bluetooth speaker with premium sound quality. 12-hour battery life.",
    price: 79.99,
    category: ProductCategory.TECH,
    image_url: undefined,
    vendor_id: "8",
    stock: 20,
    rating: 4.7,
    reviews_count: 98,
    created_at: new Date().toISOString()
  }
];
