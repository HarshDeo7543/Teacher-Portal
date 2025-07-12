export interface UPIPaymentMethod {
  id: string
  vpa: string // Virtual Payment Address (e.g., user@paytm, user@gpay)
  provider: "gpay" | "paytm" | "phonepe" | "bhim" | "amazonpay" | "other"
  isVerified: boolean
  isDefault: boolean
  lastUsed?: string
  createdAt: string
}

export interface UPITransaction {
  id: string
  transactionId: string
  upiRef: string
  fromVPA: string
  toVPA: string
  amount: number
  currency: string
  description: string
  status: "pending" | "processing" | "success" | "failed" | "cancelled" | "expired"
  type: "send" | "receive" | "request"
  category: "salary" | "course_fee" | "refund" | "other"
  timestamp: string
  completedAt?: string
  failureReason?: string
  merchantInfo?: {
    name: string
    category: string
    id: string
  }
  metadata?: Record<string, any>
}

export interface UPIContact {
  id: string
  name: string
  vpa: string
  avatar?: string
  isFrequent: boolean
  lastTransactionDate?: string
  totalTransactions: number
}

export interface UPIPaymentRequest {
  toVPA: string
  amount: number
  description: string
  category: "salary" | "course_fee" | "refund" | "other"
  expiresIn?: number // minutes
}

export interface UPIStats {
  totalTransactions: number
  successfulTransactions: number
  failedTransactions: number
  totalAmountSent: number
  totalAmountReceived: number
  monthlyTransactions: number
  averageTransactionAmount: number
}

export interface UPIQRCode {
  id: string
  vpa: string
  amount?: number
  description?: string
  qrCodeData: string
  expiresAt?: string
  isActive: boolean
}
