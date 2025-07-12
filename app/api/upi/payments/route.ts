import { type NextRequest, NextResponse } from "next/server"
import type { UPITransaction } from "@/types/upi"

/**
 * POST /api/upi/payments
 * Initiate a new UPI payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toVPA, amount, description, category, pin } = body

    // Validate required fields
    if (!toVPA || !amount || !description || !category || !pin) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate payment success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1

    const transaction: UPITransaction = {
      id: `txn_${Date.now()}`,
      transactionId: `UPI${Date.now()}`,
      upiRef: `${Math.floor(Math.random() * 1000000000000)}`,
      fromVPA: "teacher@paytm", // Current user's VPA
      toVPA,
      amount,
      currency: "INR",
      description,
      status: isSuccess ? "success" : "failed",
      type: "send",
      category,
      timestamp: new Date().toISOString(),
      completedAt: isSuccess ? new Date().toISOString() : undefined,
      failureReason: isSuccess ? undefined : "Transaction declined by bank",
    }

    if (!isSuccess) {
      return NextResponse.json({ error: "Payment failed", transaction }, { status: 400 })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Payment processing failed:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
