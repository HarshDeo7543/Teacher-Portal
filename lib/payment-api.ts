import type {
  SalaryPayment,
  CoursePayment,
  PaymentStats,
  SalaryPaymentFormData,
  CoursePaymentFormData,
} from "@/types/payment"

const API_BASE = "/api/payments"

export async function fetchPaymentStats(): Promise<PaymentStats> {
  const response = await fetch(`${API_BASE}/stats`)
  if (!response.ok) {
    throw new Error("Failed to fetch payment stats")
  }
  return response.json()
}

export async function fetchSalaryPayments(): Promise<SalaryPayment[]> {
  const response = await fetch(`${API_BASE}/salary`)
  if (!response.ok) {
    throw new Error("Failed to fetch salary payments")
  }
  return response.json()
}

export async function fetchCoursePayments(): Promise<CoursePayment[]> {
  const response = await fetch(`${API_BASE}/course`)
  if (!response.ok) {
    throw new Error("Failed to fetch course payments")
  }
  return response.json()
}

export async function createSalaryPayment(data: SalaryPaymentFormData): Promise<SalaryPayment> {
  const response = await fetch(`${API_BASE}/salary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create salary payment")
  }
  return response.json()
}

export async function createCoursePayment(data: CoursePaymentFormData): Promise<CoursePayment> {
  const response = await fetch(`${API_BASE}/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create course payment")
  }
  return response.json()
}

export async function updatePaymentStatus(paymentId: string, status: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${paymentId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) {
    throw new Error("Failed to update payment status")
  }
}
