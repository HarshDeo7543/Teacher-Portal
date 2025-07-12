import { type NextRequest, NextResponse } from "next/server"
import type { SalaryPayment, SalaryPaymentFormData } from "@/types/payment"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const salaryPayments: SalaryPayment[] = [
      {
        id: "sal_001",
        teacherId: "1",
        teacherName: "Sarah Johnson",
        amount: 3200,
        currency: "USD",
        paymentDate: "2024-01-15",
        paymentMethod: "bank_transfer",
        status: "completed",
        description: "Monthly salary - January 2024",
        reference: "SAL-2024-001",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "sal_002",
        teacherId: "2",
        teacherName: "Michael Chen",
        amount: 2800,
        currency: "USD",
        paymentDate: "2024-01-15",
        paymentMethod: "paypal",
        status: "completed",
        description: "Monthly salary - January 2024",
        reference: "SAL-2024-002",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:45:00Z",
      },
    ]

    return NextResponse.json(salaryPayments)
  } catch (error) {
    console.error("Error fetching salary payments:", error)
    return NextResponse.json({ error: "Failed to fetch salary payments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: SalaryPaymentFormData = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate payment processing
    const payment: SalaryPayment = {
      id: `sal_${Date.now()}`,
      teacherId: data.teacherId,
      teacherName: "Selected Teacher", // In real app, fetch from database
      amount: data.amount,
      currency: data.currency,
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: data.paymentMethod,
      status: "pending",
      description: data.description,
      reference: `SAL-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error creating salary payment:", error)
    return NextResponse.json({ error: "Failed to create salary payment" }, { status: 500 })
  }
}
