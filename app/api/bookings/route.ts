import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      deviceId,
      deviceDescription,
      issueDescription,
      preferredDate,
      preferredTime,
      address,
      notes
    } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !serviceType) {
      return NextResponse.json(
        { error: "Customer name, email, phone, and service type are required" },
        { status: 400 }
      )
    }

    // Validate service type
    const validServiceTypes = ['repair', 'trade_in', 'purchase', 'consultation']
    if (!validServiceTypes.includes(serviceType)) {
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Insert booking
    const result = await sql`
      INSERT INTO service_bookings (
        customer_name,
        customer_email,
        customer_phone,
        service_type,
        device_id,
        device_description,
        issue_description,
        preferred_date,
        preferred_time,
        address,
        notes
      )
      VALUES (
        ${customerName},
        ${customerEmail},
        ${customerPhone},
        ${serviceType},
        ${deviceId ? deviceId : null}::uuid,
        ${deviceDescription || null},
        ${issueDescription || null},
        ${preferredDate || null}::date,
        ${preferredTime || null},
        ${address || null},
        ${notes || null}
      )
      RETURNING id, created_at, status
    `

    return NextResponse.json({
      success: true,
      message: "Your booking has been submitted successfully. We will confirm your appointment soon!",
      booking: result[0]
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json(
        { error: "Email is required to fetch bookings" },
        { status: 400 }
      )
    }

    const bookings = await sql`
      SELECT sb.id, sb.service_type, sb.device_description, sb.issue_description,
             sb.preferred_date, sb.preferred_time, sb.status, sb.created_at,
             d.model as device_model, b.name as brand_name
      FROM service_bookings sb
      LEFT JOIN devices d ON sb.device_id = d.id
      LEFT JOIN brands b ON d.brand_id = b.id
      WHERE sb.customer_email = ${email}
      ORDER BY sb.created_at DESC
    `

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
