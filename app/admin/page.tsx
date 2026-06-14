"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  model: string;
  category: string;
  brand_id: string;
  image_url: string;
  storage_options: string[];
  is_active: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stats, setStats] = useState({
    total_products: 0,
    active_products: 0,
    total_bookings: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const query =
        selectedCategory && selectedCategory !== "all"
          ? `?category=${selectedCategory}`
          : "";
      const response = await fetch(`/api/admin/products${query}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const categories = [
    "all",
    "iPhone",
    "MacBook",
    "iPad",
    "Apple Watch",
    "Android",
    "Accessories",
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f7f4ef" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{ background: "white", borderColor: "rgba(91, 31, 168, 0.1)" }}
      >
        <div className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/Teqpadi_logo_3-removebg-preview.png"
              alt="Teqpadi"
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-black" style={{ color: "#0d0a1a" }}>
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/settings">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            className="p-6 rounded-xl border-2"
            style={{
              background: "white",
              borderColor: "rgba(91, 31, 168, 0.12)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: "#6b6480" }}>
                  Total Products
                </p>
                <p className="text-3xl font-black" style={{ color: "#0d0a1a" }}>
                  {stats.total_products}
                </p>
              </div>
              <Package
                className="w-10 h-10 opacity-20"
                style={{ color: "#5b1fa8" }}
              />
            </div>
          </div>
          <div
            className="p-6 rounded-xl border-2"
            style={{
              background: "white",
              borderColor: "rgba(245, 200, 0, 0.12)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: "#6b6480" }}>
                  Active Products
                </p>
                <p className="text-3xl font-black" style={{ color: "#0d0a1a" }}>
                  {stats.active_products}
                </p>
              </div>
              <BarChart3
                className="w-10 h-10 opacity-20"
                style={{ color: "#f5c800" }}
              />
            </div>
          </div>
          <div
            className="p-6 rounded-xl border-2"
            style={{
              background: "white",
              borderColor: "rgba(124, 61, 214, 0.12)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: "#6b6480" }}>
                  Total Bookings
                </p>
                <p className="text-3xl font-black" style={{ color: "#0d0a1a" }}>
                  {stats.total_bookings}
                </p>
              </div>
              <BarChart3
                className="w-10 h-10 opacity-20"
                style={{ color: "#7c3dd6" }}
              />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div
          className="p-8 rounded-2xl border-2"
          style={{
            background: "white",
            borderColor: "rgba(91, 31, 168, 0.12)",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black" style={{ color: "#0d0a1a" }}>
              Products
            </h2>
            <Link href="/admin/products/new">
              <Button
                className="gap-2"
                style={{ background: "#5b1fa8", color: "white" }}
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize border-2"
                style={{
                  background:
                    selectedCategory === cat ? "#5b1fa8" : "transparent",
                  color: selectedCategory === cat ? "white" : "#0d0a1a",
                  borderColor:
                    selectedCategory === cat
                      ? "#5b1fa8"
                      : "rgba(91, 31, 168, 0.2)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Table */}
          {loading ? (
            <div className="text-center py-12" style={{ color: "#6b6480" }}>
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: "#6b6480" }}>No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{ borderBottom: "2px solid rgba(91, 31, 168, 0.1)" }}
                  >
                    <th
                      className="text-left py-4 px-4 font-bold"
                      style={{ color: "#0d0a1a" }}
                    >
                      Model
                    </th>
                    <th
                      className="text-left py-4 px-4 font-bold"
                      style={{ color: "#0d0a1a" }}
                    >
                      Category
                    </th>
                    <th
                      className="text-left py-4 px-4 font-bold"
                      style={{ color: "#0d0a1a" }}
                    >
                      Storage
                    </th>
                    <th
                      className="text-left py-4 px-4 font-bold"
                      style={{ color: "#0d0a1a" }}
                    >
                      Status
                    </th>
                    <th
                      className="text-right py-4 px-4 font-bold"
                      style={{ color: "#0d0a1a" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: "1px solid rgba(91, 31, 168, 0.05)",
                      }}
                    >
                      <td
                        className="py-4 px-4 font-semibold"
                        style={{ color: "#0d0a1a" }}
                      >
                        {product.model}
                      </td>
                      <td className="py-4 px-4" style={{ color: "#6b6480" }}>
                        {product.category}
                      </td>
                      <td className="py-4 px-4" style={{ color: "#6b6480" }}>
                        {product.storage_options?.join(", ") || "—"}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: product.is_active
                              ? "rgba(245, 200, 0, 0.1)"
                              : "rgba(107, 100, 128, 0.1)",
                            color: product.is_active ? "#d4a800" : "#6b6480",
                          }}
                        >
                          {product.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Edit2
                                className="w-4 h-4"
                                style={{ color: "#5b1fa8" }}
                              />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="gap-1"
                          >
                            <Trash2
                              className="w-4 h-4"
                              style={{ color: "#ff6b6b" }}
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
