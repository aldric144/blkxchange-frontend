import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { api } from '../api';

interface VendorUploadFormProps {
  vendorId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const categories = [
  { label: 'Apparel', value: 'apparel' },
  { label: 'Beauty', value: 'beauty' },
  { label: 'Books', value: 'books' },
  { label: 'Art', value: 'art' },
  { label: 'Tech', value: 'tech' },
  { label: 'Food', value: 'food' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Home', value: 'home' },
  { label: 'Jewelry', value: 'jewelry' }
];

export default function VendorUploadForm({ vendorId, onSuccess, onCancel }: VendorUploadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        try {
          const uploadResult = await api.uploadImage(imageFile);
          imageUrl = uploadResult.url;
        } catch (err) {
          console.warn('Image upload failed, continuing without image:', err);
        }
      }

      await api.createProduct(vendorId, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image_url: imageUrl || undefined
      });

      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-brand-emerald text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      toast.textContent = '✅ Product submitted successfully for review.';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);

      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image_url: ''
      });
      setImageFile(null);
      setImagePreview(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-brand-black">Upload New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Product Name *
            </label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Description *
            </label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product"
              rows={4}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Category *
              </label>
              <Select
                required
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Price ($) *
              </label>
              <Input
                required
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Stock Quantity *
            </label>
            <Input
              required
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="0"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Product Image (Optional)
            </label>
            <div className="space-y-2">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-brand-gold">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-xs text-gray-500">
                Or enter image URL:
              </p>
              <Input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-brand-gold text-brand-black hover:bg-opacity-90"
            >
              {uploading ? 'Submitting...' : 'Submit Product'}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={uploading}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
