import { NextResponse } from "next/server"
import type { UPIStats } from "@/types/upi"

/**
 * GET /api/upi/stats
 * Fetch UPI statistics and metrics
 */
export async function GET() {
  try {
    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const stats: UPIStats = {
      totalTransactions: 247,
      successfulTransactions: 235,
      failedTransactions: 12,
      totalAmountSent: 125000,
      totalAmountReceived: 89500,
      monthlyTransactions: 45,
      averageTransactionAmount: 2750,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Failed to fetch UPI stats:", error)
    return NextResponse.json({ error: "Failed to fetch UPI stats" }, { status: 500 })
  }
}
