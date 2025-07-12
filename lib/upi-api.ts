import type { UPITransaction, UPIPaymentMethod, UPIContact, UPIStats, UPIPaymentRequest, UPIQRCode } from "@/types/upi"

const API_BASE = "/api/upi"

/**
 * UPI API service for handling all UPI-related operations
 */
export class UPIApiService {
  /**
   * Fetch user's UPI payment methods
   */
  static async getPaymentMethods(): Promise<UPIPaymentMethod[]> {
    const response = await fetch(`${API_BASE}/payment-methods`)
    if (!response.ok) {
      throw new Error("Failed to fetch payment methods")
    }
    return response.json()
  }

  /**
   * Add new UPI payment method
   */
  static async addPaymentMethod(data: {
    vpa: string
    provider: string
    setAsDefault?: boolean
  }): Promise<UPIPaymentMethod> {
    const response = await fetch(`${API_BASE}/payment-methods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to add payment method")
    }
    return response.json()
  }

  /**
   * Verify UPI VPA
   */
  static async verifyVPA(vpa: string): Promise<{ isValid: boolean; name?: string }> {
    const response = await fetch(`${API_BASE}/verify-vpa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vpa }),
    })
    if (!response.ok) {
      throw new Error("Failed to verify VPA")
    }
    return response.json()
  }

  /**
   * Initiate UPI payment
   */
  static async initiatePayment(data: UPIPaymentRequest & { pin: string }): Promise<UPITransaction> {
    const response = await fetch(`${API_BASE}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Payment failed")
    }
    return response.json()
  }

  /**
   * Fetch transaction history
   */
  static async getTransactions(params?: {
    limit?: number
    offset?: number
    status?: string
    type?: string
  }): Promise<UPITransaction[]> {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.offset) searchParams.set("offset", params.offset.toString())
    if (params?.status) searchParams.set("status", params.status)
    if (params?.type) searchParams.set("type", params.type)

    const response = await fetch(`${API_BASE}/transactions?${searchParams}`)
    if (!response.ok) {
      throw new Error("Failed to fetch transactions")
    }
    return response.json()
  }

  /**
   * Get transaction by ID
   */
  static async getTransaction(id: string): Promise<UPITransaction> {
    const response = await fetch(`${API_BASE}/transactions/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch transaction")
    }
    return response.json()
  }

  /**
   * Fetch UPI statistics
   */
  static async getStats(): Promise<UPIStats> {
    const response = await fetch(`${API_BASE}/stats`)
    if (!response.ok) {
      throw new Error("Failed to fetch UPI stats")
    }
    return response.json()
  }

  /**
   * Fetch frequent contacts
   */
  static async getContacts(): Promise<UPIContact[]> {
    const response = await fetch(`${API_BASE}/contacts`)
    if (!response.ok) {
      throw new Error("Failed to fetch contacts")
    }
    return response.json()
  }

  /**
   * Generate QR code for payment
   */
  static async generateQRCode(data: {
    vpa: string
    amount?: number
    description?: string
  }): Promise<UPIQRCode> {
    const response = await fetch(`${API_BASE}/qr-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to generate QR code")
    }
    return response.json()
  }

  /**
   * Request money from another UPI user
   */
  static async requestMoney(data: {
    fromVPA: string
    amount: number
    description: string
    expiresIn?: number
  }): Promise<{ requestId: string; status: string }> {
    const response = await fetch(`${API_BASE}/request-money`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to send money request")
    }
    return response.json()
  }
}
