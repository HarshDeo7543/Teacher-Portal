import { z } from "zod"

// VPA (Virtual Payment Address) validation
const vpaRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/

export const upiPaymentSchema = z.object({
  toVPA: z
    .string()
    .min(1, "UPI ID is required")
    .regex(vpaRegex, "Please enter a valid UPI ID (e.g., user@paytm)")
    .max(50, "UPI ID is too long"),
  amount: z
    .number()
    .min(1, "Amount must be at least ₹1")
    .max(100000, "Amount cannot exceed ₹1,00,000")
    .refine((val) => Number(val.toFixed(2)) === val, "Amount can have maximum 2 decimal places"),
  description: z.string().min(1, "Description is required").max(100, "Description cannot exceed 100 characters"),
  category: z.enum(["salary", "course_fee", "refund", "other"], {
    required_error: "Please select a category",
  }),
  pin: z
    .string()
    .min(4, "UPI PIN must be 4-6 digits")
    .max(6, "UPI PIN must be 4-6 digits")
    .regex(/^\d+$/, "UPI PIN must contain only numbers"),
})

export const addVPASchema = z.object({
  vpa: z
    .string()
    .min(1, "UPI ID is required")
    .regex(vpaRegex, "Please enter a valid UPI ID (e.g., user@paytm)")
    .max(50, "UPI ID is too long"),
  provider: z.enum(["gpay", "paytm", "phonepe", "bhim", "amazonpay", "other"]),
  setAsDefault: z.boolean().optional(),
})

export const upiRequestSchema = z.object({
  fromVPA: z.string().min(1, "UPI ID is required").regex(vpaRegex, "Please enter a valid UPI ID"),
  amount: z.number().min(1, "Amount must be at least ₹1").max(100000, "Amount cannot exceed ₹1,00,000"),
  description: z.string().min(1, "Description is required").max(100, "Description cannot exceed 100 characters"),
  expiresIn: z.number().min(5).max(1440).optional(), // 5 minutes to 24 hours
})

export type UPIPaymentFormData = z.infer<typeof upiPaymentSchema>
export type AddVPAFormData = z.infer<typeof addVPASchema>
export type UPIRequestFormData = z.infer<typeof upiRequestSchema>

/**
 * Validates UPI VPA format
 */
export function validateVPA(vpa: string): boolean {
  return vpaRegex.test(vpa)
}

/**
 * Formats amount for display
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Masks UPI VPA for security
 */
export function maskVPA(vpa: string): string {
  const [username, domain] = vpa.split("@")
  if (username.length <= 3) return vpa
  const maskedUsername = username.slice(0, 2) + "*".repeat(username.length - 4) + username.slice(-2)
  return `${maskedUsername}@${domain}`
}
