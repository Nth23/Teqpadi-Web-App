"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  model: string;
  category: string;
  price: number;
  image_url: string;
  storage_options: string[];
}

// Dummy products data
const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    model: "Samsung Galaxy S25 FE",
    category: "Samsung",
    price: 350000,
    image_url: "https://via.placeholder.com/300x300?text=Samsung+S25+FE",
    storage_options: ["128GB", "256GB"],
  },
  {
    id: "2",
    model: 'Magic Keyboard for iPad Pro 12.9"',
    category: "Accessories",
    price: 85000,
    image_url: "https://via.placeholder.com/300x300?text=Magic+Keyboard",
    storage_options: [],
  },
  {
    id: "3",
    model: "iPhone 17 Pro Max",
    category: "Apple",
    price: 1950000,
    image_url: "https://via.placeholder.com/300x300?text=iPhone+17+Pro+Max",
    storage_options: ["128GB", "256GB", "512GB"],
  },
  {
    id: "4",
    model: "MacBook Air M3",
    category: "Apple",
    price: 850000,
    image_url: "https://via.placeholder.com/300x300?text=MacBook+Air+M3",
    storage_options: ["256GB", "512GB"],
  },
  {
    id: "5",
    model: "Apple Watch Series 10",
    category: "Apple",
    price: 480000,
    image_url: "https://via.placeholder.com/300x300?text=Apple+Watch+Series+10",
    storage_options: ["32GB", "64GB"],
  },
  {
    id: "6",
    model: "iPhone 16",
    category: "Apple",
    price: 750000,
    image_url: "https://via.placeholder.com/300x300?text=iPhone+16",
    storage_options: ["128GB", "256GB"],
  },
  {
    id: "7",
    model: 'iPad Pro 11"',
    category: "Apple",
    price: 620000,
    image_url: "https://via.placeholder.com/300x300?text=iPad+Pro+11",
    storage_options: ["128GB", "256GB", "512GB"],
  },
  {
    id: "8",
    model: "AirPods Pro 2",
    category: "Accessories",
    price: 120000,
    image_url: "https://via.placeholder.com/300x300?text=AirPods+Pro+2",
    storage_options: [],
  },
  {
    id: "9",
    model: "Samsung Galaxy Tab S9",
    category: "Samsung",
    price: 430000,
    image_url: "https://via.placeholder.com/300x300?text=Galaxy+Tab+S9",
    storage_options: ["128GB", "256GB"],
  },
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₦100,000", min: 0, max: 100000 },
  { label: "₦100,000 – ₦300,000", min: 100000, max: 300000 },
  { label: "₦300,000 – ₦600,000", min: 300000, max: 600000 },
  { label: "₦600,000 – ₦1,000,000", min: 600000, max: 1000000 },
  { label: "Above ₦1,000,000", min: 1000000, max: Infinity },
];

const CATEGORIES = [
  { label: "All Categories", value: "All Categories", subcategories: [] },
  {
    label: "Apple",
    value: "Apple",
    subcategories: [
      "iPhone",
      "iPad",
      "MacBook",
      "Apple Watch",
      "AirPods",
      "Apple TV",
    ],
  },
  {
    label: "Samsung",
    value: "Samsung",
    subcategories: [
      "Galaxy S Series",
      "Galaxy Tab",
      "Galaxy Watch",
      "Galaxy Buds",
      "Galaxy A Series",
    ],
  },
  {
    label: "Infinix",
    value: "Infinix",
    subcategories: ["Infinix Note", "Infinix Smart", "Infinix Hot"],
  },
  {
    label: "Tecno",
    value: "Tecno",
    subcategories: ["Tecno Camon", "Tecno Spark", "Tecno Phantom"],
  },
  {
    label: "Oppo",
    value: "Oppo",
    subcategories: ["Oppo Reno", "Oppo A Series", "Oppo Find"],
  },
  {
    label: "Dell",
    value: "Dell",
    subcategories: [
      "Dell Inspiron",
      "Dell XPS",
      "Dell Latitude",
      "Dell Alienware",
    ],
  },
  {
    label: "HP",
    value: "HP",
    subcategories: ["HP Pavilion", "HP Envy", "HP ZBook", "HP Omen"],
  },
  {
    label: "PlayStation",
    value: "PlayStation",
    subcategories: ["PlayStation 4", "PlayStation 5"],
  },
  {
    label: "Xbox",
    value: "Xbox",
    subcategories: ["Xbox Series X", "Xbox Series S", "Xbox One"],
  },
  {
    label: "Accessories",
    value: "Accessories",
    subcategories: [
      "Chargers",
      "Cables",
      "Cases",
      "Screen Protectors",
      "Headphones",
    ],
  },
];

export default function PricesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const PRODUCTS_PER_PAGE = 6;

  const selectedCat = CATEGORIES.find((c) => c.value === selectedCategory);

  // Filter products
  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter((product) => {
      const categoryMatch =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;
      const priceRange = PRICE_RANGES[selectedPriceRange];
      const priceMatch =
        product.price >= priceRange.min && product.price <= priceRange.max;
      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, selectedPriceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const handleResetFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedSubcategory(null);
    setSelectedPriceRange(0);
    setCurrentPage(1);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div style={{ background: "#f7f4ef" }}>
      {/* Header */}
      <div
        className="py-16"
        style={{ background: "linear-gradient(to bottom, #3a0e6e, #2a0850)" }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Buy a Device
          </h1>
          <p className="text-lg text-white/75">
            Browse our certified, quality-checked devices.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Filters */}
        <div
          className="mb-12 p-6 rounded-lg border-2"
          style={{
            background: "white",
            borderColor: "rgba(91, 31, 168, 0.12)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#0d0a1a" }}
              >
                Brand
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory(null);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ borderColor: "rgba(91, 31, 168, 0.2)" }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory !== "All Categories" &&
              (selectedCat?.subcategories?.length ?? 0) > 0 && (
                <div className="flex-1">
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: "#0d0a1a" }}
                  >
                    Sub-Category
                  </label>
                  <select
                    value={selectedSubcategory || ""}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value || null);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: "rgba(91, 31, 168, 0.2)" }}
                  >
                    <option value="">All {selectedCat?.label} Products</option>
                    {selectedCat?.subcategories?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#0d0a1a" }}
              >
                Price Range
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => {
                  setSelectedPriceRange(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ borderColor: "rgba(91, 31, 168, 0.2)" }}
              >
                {PRICE_RANGES.map((range, idx) => (
                  <option key={idx} value={idx}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleResetFilters}
              className="px-6 py-2 rounded-lg border-2"
              style={{
                background: "transparent",
                color: "#5b1fa8",
                borderColor: "#5b1fa8",
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg" style={{ color: "#6b6480" }}>
              No devices found for the selected filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border-2 overflow-hidden transition-all hover:scale-[1.02]"
                  style={{
                    background: "white",
                    borderColor: "rgba(91, 31, 168, 0.12)",
                  }}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 bg-gray-100">
                    <img
                      src={product.image_url}
                      alt={product.model}
                      className="w-full h-full object-cover"
                    />
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      style={{
                        background: wishlist.includes(product.id)
                          ? "#f5c800"
                          : "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={
                          wishlist.includes(product.id) ? "#f5c800" : "none"
                        }
                        style={{
                          color: wishlist.includes(product.id)
                            ? "#0d0a1a"
                            : "#5b1fa8",
                        }}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{ color: "#0d0a1a" }}
                    >
                      {product.model}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "#6b6480" }}>
                      {product.storage_options.length > 0
                        ? product.storage_options.join(", ")
                        : product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p
                        className="text-xl font-black"
                        style={{ color: "#f5c800" }}
                      >
                        ₦{product.price.toLocaleString()}
                      </p>
                      <Button
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{ background: "#5b1fa8", color: "white" }}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-10 h-10 rounded-lg font-semibold transition-all border-2"
                      style={{
                        background: currentPage === page ? "#5b1fa8" : "white",
                        color: currentPage === page ? "white" : "#0d0a1a",
                        borderColor:
                          currentPage === page
                            ? "#5b1fa8"
                            : "rgba(91, 31, 168, 0.2)",
                      }}
                    >
                      {page}
                    </button>
                  ),
                )}

                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
