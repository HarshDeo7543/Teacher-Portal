import { NextResponse } from "next/server"
import type { PaymentStats } from "@/types/payment"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const stats: PaymentStats = {
      totalSalaryPayments: 45,
      totalCoursePayments: 128,
      pendingPayments: 12,
      completedPayments: 161,
      failedPayments: 3,
      monthlyRevenue: 28450,
      monthlyExpenses: 15200,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching payment stats:", error)
    return NextResponse.json({ error: "Failed to fetch payment stats" }, { status: 500 })
  }
}
