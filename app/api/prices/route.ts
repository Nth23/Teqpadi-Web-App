import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const deviceId = searchParams.get("deviceId") || searchParams.get("device_id") // Support both
    const storage = searchParams.get("storage")
    const condition = searchParams.get("condition")

    if (!deviceId) {
      return NextResponse.json(
        { error: "Device ID is required" },
        { status: 400 }
      )
    }

    let prices

    // If storage and condition are provided, filter more specifically
    if (storage && condition) {
      prices = await sql`
        SELECT dp.id, dp.storage, dp.condition, dp.price, dp.trade_in_value,
               d.model, d.category, d.storage_options,
               b.name as brand_name
        FROM device_prices dp
        JOIN devices d ON dp.device_id = d.id
        JOIN brands b ON d.brand_id = b.id
        WHERE dp.device_id = ${deviceId}::uuid
          AND dp.storage = ${storage}
          AND dp.condition = ${condition}
      `
    } else {
      // Return all prices for the device
      prices = await sql`
        SELECT dp.id, dp.storage, dp.condition, dp.price, dp.trade_in_value,
               d.model, d.category, d.storage_options,
               b.name as brand_name
        FROM device_prices dp
        JOIN devices d ON dp.device_id = d.id
        JOIN brands b ON d.brand_id = b.id
        WHERE dp.device_id = ${deviceId}::uuid
        ORDER BY 
          CASE dp.storage 
            WHEN '128GB' THEN 1
            WHEN '256GB' THEN 2
            WHEN '512GB' THEN 3
            WHEN '1TB' THEN 4
            WHEN '2TB' THEN 5
            ELSE 6
          END,
          CASE dp.condition
            WHEN 'new' THEN 1
            WHEN 'like_new' THEN 2
            WHEN 'good' THEN 3
            WHEN 'fair' THEN 4
            WHEN 'poor' THEN 5
          END
      `
    }

    return NextResponse.json({ prices })
  } catch (error) {
    console.error("Error fetching prices:", error)
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 }
    )
  }
}
