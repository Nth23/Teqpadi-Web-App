import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, context: any) {
  try {
    const params =
      context?.params && typeof context.params.then === "function"
        ? await context.params
        : context?.params;
    const id = params?.id;
    // Mock delete - replace with actual database deletion
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest, context: any) {
  try {
    const params =
      context?.params && typeof context.params.then === "function"
        ? await context.params
        : context?.params;
    const id = params?.id;
    // Mock get - replace with actual database query
    const product = {
      id,
      model: "iPhone 15 Pro",
      category: "iPhone",
      brand_id: "apple",
      image_url: "https://via.placeholder.com/400",
      storage_options: ["128GB", "256GB", "512GB"],
      is_active: true,
      created_at: new Date().toISOString(),
    };
    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, context: any) {
  try {
    const params =
      context?.params && typeof context.params.then === "function"
        ? await context.params
        : context?.params;
    const id = params?.id;
    const body = await request.json();
    // Mock update - replace with actual database update
    const updatedProduct = { id, ...body };
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}
