import { type NextRequest, NextResponse } from "next/server"
import type { CoursePayment, CoursePaymentFormData } from "@/types/payment"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const coursePayments: CoursePayment[] = [
      {
        id: "crs_001",
        studentId: "1",
        studentName: "Emily Chen",
        courseId: "1",
        courseName: "Piano Fundamentals",
        teacherId: "1",
        teacherName: "Sarah Johnson",
        amount: 480,
        currency: "USD",
        paymentDate: "2024-01-18",
        paymentMethod: {
          id: "pm_001",
          type: "credit_card",
          last4: "4242",
          brand: "visa",
          expiryMonth: 12,
          expiryYear: 2025,
          holderName: "Emily Chen",
          isDefault: true,
        },
        status: "completed",
        reference: "CRS-2024-001",
        createdAt: "2024-01-18T14:00:00Z",
        updatedAt: "2024-01-18T14:05:00Z",
      },
    ]

    return NextResponse.json(coursePayments)
  } catch (error) {
    console.error("Error fetching course payments:", error)
    return NextResponse.json({ error: "Failed to fetch course payments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CoursePaymentFormData = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate payment processing
    const payment: CoursePayment = {
      id: `crs_${Date.now()}`,
      studentId: data.studentId,
      studentName: "Selected Student", // In real app, fetch from database
      courseId: data.courseId,
      courseName: "Selected Course", // In real app, fetch from database
      teacherId: "teacher_id", // In real app, fetch from course data
      teacherName: "Course Teacher", // In real app, fetch from database
      amount: data.amount,
      currency: data.currency,
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: {
        id: `pm_${Date.now()}`,
        type: data.paymentMethod as any,
        holderName: "Payment Holder",
        isDefault: false,
      },
      status: "pending",
      reference: `CRS-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error creating course payment:", error)
    return NextResponse.json({ error: "Failed to create course payment" }, { status: 500 })
  }
}
