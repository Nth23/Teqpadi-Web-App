import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const brandId = searchParams.get("brandId") || searchParams.get("brand_id") // Support both
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let devices

    if (brandId && category) {
      devices = await sql`
        SELECT d.id, d.model, d.category, d.storage_options, d.release_year, d.image_url,
               b.name as brand_name, b.id as brand_id
        FROM devices d
        JOIN brands b ON d.brand_id = b.id
        WHERE d.brand_id = ${brandId}::uuid
          AND d.category = ${category}
          AND d.is_active = true
        ORDER BY d.release_year DESC, d.model ASC
      `
    } else if (brandId) {
      devices = await sql`
        SELECT d.id, d.model, d.category, d.storage_options, d.release_year, d.image_url,
               b.name as brand_name, b.id as brand_id
        FROM devices d
        JOIN brands b ON d.brand_id = b.id
        WHERE d.brand_id = ${brandId}::uuid
          AND d.is_active = true
        ORDER BY d.release_year DESC, d.model ASC
      `
    } else if (category) {
      devices = await sql`
        SELECT d.id, d.model, d.category, d.storage_options, d.release_year, d.image_url,
               b.name as brand_name, b.id as brand_id
        FROM devices d
        JOIN brands b ON d.brand_id = b.id
        WHERE d.category = ${category}
          AND d.is_active = true
        ORDER BY b.name ASC, d.release_year DESC, d.model ASC
      `
    } else if (search) {
      devices = await sql`
        SELECT d.id, d.model, d.category, d.storage_options, d.release_year, d.image_url,
               b.name as brand_name, b.id as brand_id
        FROM devices d
        JOIN brands b ON d.brand_id = b.id
        WHERE d.is_active = true
          AND (
            LOWER(d.model) LIKE LOWER(${`%${search}%`})
            OR LOWER(b.name) LIKE LOWER(${`%${search}%`})
          )
        ORDER BY b.name ASC, d.release_year DESC
        LIMIT 50
      `
    } else {
      devices = await sql`
        SELECT d.id, d.model, d.category, d.storage_options, d.release_year, d.image_url,
               b.name as brand_name, b.id as brand_id
        FROM devices d
        JOIN brands b ON d.brand_id = b.id
        WHERE d.is_active = true
        ORDER BY b.name ASC, d.release_year DESC, d.model ASC
        LIMIT 100
      `
    }

    return NextResponse.json({ devices })
  } catch (error) {
    console.error("Error fetching devices:", error)
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    )
  }
}
