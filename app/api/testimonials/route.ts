import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get("featured")

    let testimonials

    if (featured === "true") {
      testimonials = await sql`
        SELECT id, name, content, rating, created_at
        FROM testimonials
        WHERE is_featured = true AND is_approved = true
        ORDER BY created_at DESC
        LIMIT 6
      `
    } else {
      testimonials = await sql`
        SELECT id, name, content, rating, created_at
        FROM testimonials
        WHERE is_approved = true
        ORDER BY created_at DESC
        LIMIT 20
      `
    }

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, content, rating } = body

    // Validate required fields
    if (!name || !content || !rating) {
      return NextResponse.json(
        { error: "Name, content, and rating are required" },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      )
    }

    // Insert testimonial (not approved by default)
    const result = await sql`
      INSERT INTO testimonials (name, content, rating)
      VALUES (${name}, ${content}, ${rating})
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      message: "Thank you for your review! It will be published after approval.",
      testimonial: result[0]
    })
  } catch (error) {
    console.error("Error submitting testimonial:", error)
    return NextResponse.json(
      { error: "Failed to submit review. Please try again." },
      { status: 500 }
    )
  }
}
