"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductForm {
  model: string
  category: string
  brand_id: string
  storage_options: string[]
  is_active: boolean
  release_year: number
  image_url: string
  price: number
  trade_in_value: number
}

const categories = ["iPhone", "MacBook", "iPad", "Apple Watch", "Android", "Accessories"]
const brands = [
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "google", name: "Google" },
  { id: "nokia", name: "Nokia" },
]

export default function ProductForm({ params }: { params?: { id?: string } }) {
  const router = useRouter()
  const isEditing = params?.id
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [form, setForm] = useState<ProductForm>({
    model: "",
    category: "",
    brand_id: "",
    storage_options: [],
    is_active: true,
    release_year: new Date().getFullYear(),
    image_url: "",
    price: 0,
    trade_in_value: 0,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStorageToggle = (option: string) => {
    setForm(prev => ({
      ...prev,
      storage_options: prev.storage_options.includes(option)
        ? prev.storage_options.filter(s => s !== option)
        : [...prev.storage_options, option]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In production, upload image to blob storage first
      const productData = {
        ...form,
        image_url: imagePreview || form.image_url,
      }

      const response = await fetch(
        isEditing ? `/api/admin/products/${params?.id}` : "/api/admin/products",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      )

      if (response.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        alert("Failed to save product")
      }
    } catch (error) {
      console.error("Failed to save product:", error)
      alert("Failed to save product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#f7f4ef' }}>
      {/* Header */}
      <div className="border-b" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.1)' }}>
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <Link href="/admin" className="inline-flex items-center gap-2 mb-4" style={{ color: '#5b1fa8' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black" style={{ color: '#0d0a1a' }}>
            {isEditing ? "Edit Product" : "Create New Product"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border-2" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.12)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image Upload */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#0d0a1a' }}>Product Image</label>
              <div 
                className="w-full h-64 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-all"
                onClick={() => document.getElementById("image-input")?.click()}
                style={{
                  background: imagePreview ? `url(${imagePreview})` : 'rgba(91, 31, 168, 0.05)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderColor: 'rgba(91, 31, 168, 0.2)',
                }}
              >
                {!imagePreview && (
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#5b1fa8' }} />
                    <p className="text-sm font-semibold" style={{ color: '#5b1fa8' }}>Click to upload</p>
                  </div>
                )}
              </div>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: '#0d0a1a' }}>Brand</label>
                <select
                  value={form.brand_id}
                  onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                >
                  <option value="">Select Brand</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: '#0d0a1a' }}>Model Name</label>
                <input
                  type="text"
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  placeholder="e.g. iPhone 15 Pro"
                  className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: '#0d0a1a' }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: '#0d0a1a' }}>Release Year</label>
                <input
                  type="number"
                  value={form.release_year}
                  onChange={(e) => setForm({ ...form, release_year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                />
              </div>
            </div>
          </div>

          {/* Storage Options */}
          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(91, 31, 168, 0.1)' }}>
            <label className="block text-sm font-bold mb-4" style={{ color: '#0d0a1a' }}>Storage Options</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {["64GB", "128GB", "256GB", "512GB", "1TB"].map(size => (
                <label key={size} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.storage_options.includes(size)}
                    onChange={() => handleStorageToggle(size)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm" style={{ color: '#0d0a1a' }}>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-8 pt-8 border-t grid grid-cols-2 gap-4" style={{ borderColor: 'rgba(91, 31, 168, 0.1)' }}>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: '#0d0a1a' }}>Price (₦)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })}
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: '#0d0a1a' }}>Trade-in Value (₦)</label>
              <input
                type="number"
                value={form.trade_in_value}
                onChange={(e) => setForm({ ...form, trade_in_value: parseInt(e.target.value) })}
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(91, 31, 168, 0.1)' }}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold" style={{ color: '#0d0a1a' }}>Active</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-8 pt-8 border-t flex gap-4" style={{ borderColor: 'rgba(91, 31, 168, 0.1)' }}>
            <Link href="/admin" className="flex-1">
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
            <Button 
              type="submit"
              disabled={loading}
              className="flex-1 gap-2"
              style={{ background: '#5b1fa8', color: 'white' }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
