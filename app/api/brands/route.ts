import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const brands = await sql`
      SELECT id, name, logo_url
      FROM brands
      ORDER BY name ASC
    `
    
    return NextResponse.json({ brands })
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    )
  }
}
