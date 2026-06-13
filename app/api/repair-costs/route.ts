import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const deviceId = searchParams.get("deviceId")
    const serviceId = searchParams.get("serviceId")

    if (deviceId && serviceId) {
      const costs = await sql`
        SELECT rc.id, rc.min_cost, rc.max_cost, rc.estimated_time, rc.notes,
               rs.name as service_name, rs.description as service_description,
               d.model, b.name as brand_name
        FROM repair_costs rc
        JOIN repair_services rs ON rc.service_id = rs.id
        JOIN devices d ON rc.device_id = d.id
        JOIN brands b ON d.brand_id = b.id
        WHERE rc.device_id = ${deviceId}::uuid
          AND rc.service_id = ${serviceId}::uuid
      `
      return NextResponse.json({ cost: costs[0] || null })
    }

    if (deviceId) {
      const costs = await sql`
        SELECT rc.id, rc.min_cost, rc.max_cost, rc.estimated_time, rc.notes,
               rs.id as service_id, rs.name as service_name, rs.description as service_description, rs.icon,
               d.model, d.category, b.name as brand_name
        FROM repair_costs rc
        JOIN repair_services rs ON rc.service_id = rs.id
        JOIN devices d ON rc.device_id = d.id
        JOIN brands b ON d.brand_id = b.id
        WHERE rc.device_id = ${deviceId}::uuid
        ORDER BY rs.name ASC
      `
      return NextResponse.json({ costs })
    }

    return NextResponse.json(
      { error: "Device ID is required" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Error fetching repair costs:", error)
    return NextResponse.json(
      { error: "Failed to fetch repair costs" },
      { status: 500 }
    )
  }
}
