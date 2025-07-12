export interface PaymentMethod {
  id: string
  type: "credit_card" | "debit_card" | "bank_transfer" | "paypal" | "stripe"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  holderName?: string
  isDefault: boolean
}

export interface SalaryPayment {
  id: string
  teacherId: string
  teacherName: string
  amount: number
  currency: string
  paymentDate: string
  paymentMethod: string
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  description?: string
  reference: string
  createdAt: string
  updatedAt: string
}

export interface CoursePayment {
  id: string
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  teacherId: string
  teacherName: string
  amount: number
  currency: string
  paymentDate: string
  paymentMethod: PaymentMethod
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  reference: string
  createdAt: string
  updatedAt: string
}

export interface PaymentFormData {
  amount: number
  currency: string
  description?: string
  paymentMethod: string
}

export interface SalaryPaymentFormData extends PaymentFormData {
  teacherId: string
}

export interface CoursePaymentFormData extends PaymentFormData {
  studentId: string
  courseId: string
}

export interface PaymentStats {
  totalSalaryPayments: number
  totalCoursePayments: number
  pendingPayments: number
  completedPayments: number
  failedPayments: number
  monthlyRevenue: number
  monthlyExpenses: number
}
