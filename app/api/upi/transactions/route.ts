import { type NextRequest, NextResponse } from "next/server"
import type { UPITransaction } from "@/types/upi"

/**
 * GET /api/upi/transactions
 * Fetch UPI transaction history with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const mockTransactions: UPITransaction[] = [
      {
        id: "txn_001",
        transactionId: "UPI2024011501",
        upiRef: "402912345678",
        fromVPA: "teacher@paytm",
        toVPA: "sarah.johnson@gpay",
        amount: 3200,
        currency: "INR",
        description: "Monthly salary - January 2024",
        status: "success",
        type: "send",
        category: "salary",
        timestamp: "2024-01-15T10:30:00Z",
        completedAt: "2024-01-15T10:30:15Z",
      },
      {
        id: "txn_002",
        transactionId: "UPI2024011502",
        upiRef: "402912345679",
        fromVPA: "student@phonepe",
        toVPA: "teacher@paytm",
        amount: 1500,
        currency: "INR",
        description: "Piano course fee - Advanced level",
        status: "success",
        type: "receive",
        category: "course_fee",
        timestamp: "2024-01-15T14:20:00Z",
        completedAt: "2024-01-15T14:20:08Z",
      },
      // Add more mock transactions...
    ]

    // Apply filters
    let filteredTransactions = mockTransactions
    if (status) {
      filteredTransactions = filteredTransactions.filter((t) => t.status === status)
    }
    if (type) {
      filteredTransactions = filteredTransactions.filter((t) => t.type === type)
    }

    // Apply pagination
    const paginatedTransactions = filteredTransactions.slice(offset, offset + limit)

    return NextResponse.json(paginatedTransactions)
  } catch (error) {
    console.error("Failed to fetch transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
