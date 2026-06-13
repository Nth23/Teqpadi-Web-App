import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    // Mock products - replace with actual database query
    const allProducts = [
      {
        id: "1",
        model: "iPhone 15 Pro",
        category: "iPhone",
        brand_id: "apple",
        image_url: "https://via.placeholder.com/400",
        storage_options: ["128GB", "256GB", "512GB"],
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: "2",
        model: "Samsung S24",
        category: "Android",
        brand_id: "samsung",
        image_url: "https://via.placeholder.com/400",
        storage_options: ["128GB", "256GB"],
        is_active: true,
        created_at: new Date().toISOString()
      }
    ]

    let products = allProducts

    if (category && category !== "all") {
      products = products.filter(p => p.category === category)
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      created_at: new Date().toISOString()
    }

    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Failed to create product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
