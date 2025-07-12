"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaymentStatsCards } from "@/components/payments/payment-stats"
import { SalaryPaymentForm } from "@/components/payments/salary-payment-form"
import { CoursePaymentForm } from "@/components/payments/course-payment-form"
import { PaymentHistory } from "@/components/payments/payment-history"
import { CreditCard, DollarSign, GraduationCap, Plus, History, TrendingUp } from "lucide-react"

/**
 * Main payments page with comprehensive payment management
 */
export default function PaymentsPage() {
  const [activeForm, setActiveForm] = useState<"salary" | "course" | null>(null)

  const handleFormSuccess = () => {
    setActiveForm(null)
    // In a real app, you would refresh the data here
  }

  const handleFormCancel = () => {
    setActiveForm(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Payment Management
          </h1>
          <p className="text-muted-foreground">Manage salary payments and course payment collection</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setActiveForm("salary")} disabled={activeForm !== null}>
            <DollarSign className="mr-2 h-4 w-4" />
            Pay Salary
          </Button>
          <Button onClick={() => setActiveForm("course")} disabled={activeForm !== null} variant="outline">
            <GraduationCap className="mr-2 h-4 w-4" />
            Collect Payment
          </Button>
        </div>
      </div>

      {/* Payment Stats */}
      <PaymentStatsCards />

      {/* Payment Forms */}
      {activeForm === "salary" && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <SalaryPaymentForm onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
        </div>
      )}

      {activeForm === "course" && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <CoursePaymentForm onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
        </div>
      )}

      {/* Quick Actions */}
      {!activeForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Payment Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                onClick={() => setActiveForm("salary")}
              >
                <DollarSign className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Process Salary</div>
                  <div className="text-xs text-muted-foreground">Pay teacher salary</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                onClick={() => setActiveForm("course")}
              >
                <GraduationCap className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Collect Payment</div>
                  <div className="text-xs text-muted-foreground">Course completion</div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <History className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">View History</div>
                  <div className="text-xs text-muted-foreground">Payment records</div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs text-muted-foreground">Payment insights</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      {!activeForm && <PaymentHistory />}
    </div>
  )
}
