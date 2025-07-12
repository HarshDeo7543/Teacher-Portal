"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UPIStatsDashboard } from "@/components/upi/upi-stats-dashboard"
import { UPIPaymentForm } from "@/components/upi/upi-payment-form"
import { UPITransactionHistory } from "@/components/upi/upi-transaction-history"
import { UPIQuickActions } from "@/components/upi/upi-quick-actions"
import { UPIQRGenerator } from "@/components/upi/upi-qr-generator"
import { Smartphone, Zap, TrendingUp, History } from "lucide-react"

/**
 * Main UPI Page Component
 * Comprehensive UPI interface with all payment functionalities
 */
export default function UPIPage() {
  const [activeView, setActiveView] = useState<"dashboard" | "send" | "qr" | "history">("dashboard")

  const handleFormSuccess = () => {
    setActiveView("dashboard")
  }

  const handleFormCancel = () => {
    setActiveView("dashboard")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-8 w-8 text-primary" />
            UPI Payments
          </h1>
          <p className="text-muted-foreground">Unified Payments Interface for seamless transactions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeView === "send" ? "default" : "outline"}
            onClick={() => setActiveView("send")}
            size="sm"
          >
            <Zap className="mr-2 h-4 w-4" />
            Send Money
          </Button>
          <Button variant={activeView === "qr" ? "default" : "outline"} onClick={() => setActiveView("qr")} size="sm">
            <Smartphone className="mr-2 h-4 w-4" />
            QR Code
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
        <Button
          variant={activeView === "dashboard" ? "default" : "ghost"}
          onClick={() => setActiveView("dashboard")}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant={activeView === "send" ? "default" : "ghost"}
          onClick={() => setActiveView("send")}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          <Zap className="mr-2 h-4 w-4" />
          Send Money
        </Button>
        <Button
          variant={activeView === "qr" ? "default" : "ghost"}
          onClick={() => setActiveView("qr")}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          <Smartphone className="mr-2 h-4 w-4" />
          QR Code
        </Button>
        <Button
          variant={activeView === "history" ? "default" : "ghost"}
          onClick={() => setActiveView("history")}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          <History className="mr-2 h-4 w-4" />
          History
        </Button>
      </div>

      {/* Content based on active view */}
      {activeView === "dashboard" && (
        <div className="space-y-6">
          {/* UPI Statistics */}
          <UPIStatsDashboard />

          {/* Quick Actions */}
          <UPIQuickActions
            onSendMoney={() => setActiveView("send")}
            onRequestMoney={() => setActiveView("send")}
            onScanQR={() => setActiveView("qr")}
            onShowQR={() => setActiveView("qr")}
          />
        </div>
      )}

      {activeView === "send" && (
        <div className="flex justify-center">
          <UPIPaymentForm onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
        </div>
      )}

      {activeView === "qr" && (
        <div className="flex justify-center">
          <UPIQRGenerator onClose={handleFormCancel} />
        </div>
      )}

      {activeView === "history" && <UPITransactionHistory />}
    </div>
  )
}
