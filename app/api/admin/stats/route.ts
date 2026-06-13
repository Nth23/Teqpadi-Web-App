import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock stats - replace with actual database queries
    const stats = {
      total_products: 42,
      active_products: 38,
      total_bookings: 156
    }
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Failed to fetch stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
