import { type NextRequest, NextResponse } from "next/server"

/**
 * POST /api/upi/verify-vpa
 * Verify if a UPI VPA is valid and get account holder name
 */
export async function POST(request: NextRequest) {
  try {
    const { vpa } = await request.json()

    if (!vpa) {
      return NextResponse.json({ error: "VPA is required" }, { status: 400 })
    }

    // Simulate VPA verification delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock VPA verification (simulate 85% success rate)
    const isValid = Math.random() > 0.15

    // Mock account holder names for valid VPAs
    const mockNames = [
      "Sarah Johnson",
      "Michael Chen",
      "Emily Rodriguez",
      "David Wilson",
      "Jessica Thompson",
      "Robert Kumar",
      "Lisa Patel",
      "James Anderson",
    ]

    const response = {
      isValid,
      name: isValid ? mockNames[Math.floor(Math.random() * mockNames.length)] : undefined,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("VPA verification failed:", error)
    return NextResponse.json({ error: "VPA verification failed" }, { status: 500 })
  }
}
