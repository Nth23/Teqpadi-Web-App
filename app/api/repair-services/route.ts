import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")

    let services

    if (category) {
      services = await sql`
        SELECT id, name, description, icon, category
        FROM repair_services
        WHERE category = ${category} OR category = 'general'
        ORDER BY category, name ASC
      `
    } else {
      services = await sql`
        SELECT id, name, description, icon, category
        FROM repair_services
        ORDER BY category, name ASC
      `
    }

    return NextResponse.json({ services })
  } catch (error) {
    console.error("Error fetching repair services:", error)
    return NextResponse.json(
      { error: "Failed to fetch repair services" },
      { status: 500 }
    )
  }
}
