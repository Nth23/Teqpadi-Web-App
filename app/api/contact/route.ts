import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, serviceType, deviceInfo } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Insert contact submission
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, message, service_type, device_info)
      VALUES (${name}, ${email}, ${phone}, ${message}, ${serviceType || null}, ${deviceInfo || null})
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon!",
      submission: result[0]
    })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 }
    )
  }
}
