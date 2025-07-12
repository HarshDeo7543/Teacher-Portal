import { z } from "zod"

export const salaryPaymentSchema = z.object({
  teacherId: z.string().min(1, "Please select a teacher"),
  amount: z.number().min(0.01, "Amount must be greater than 0").max(100000, "Amount cannot exceed $100,000"),
  currency: z.string().min(1, "Please select a currency"),
  description: z.string().optional(),
  paymentMethod: z.string().min(1, "Please select a payment method"),
})

export const coursePaymentSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  courseId: z.string().min(1, "Please select a course"),
  amount: z.number().min(0.01, "Amount must be greater than 0").max(10000, "Amount cannot exceed $10,000"),
  currency: z.string().min(1, "Please select a currency"),
  description: z.string().optional(),
  paymentMethod: z.string().min(1, "Please select a payment method"),
})

export const creditCardSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19, "Invalid card number"),
  expiryMonth: z.number().min(1).max(12),
  expiryYear: z.number().min(new Date().getFullYear()),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4),
  holderName: z.string().min(2, "Cardholder name is required"),
})

export type SalaryPaymentFormData = z.infer<typeof salaryPaymentSchema>
export type CoursePaymentFormData = z.infer<typeof coursePaymentSchema>
export type CreditCardFormData = z.infer<typeof creditCardSchema>
