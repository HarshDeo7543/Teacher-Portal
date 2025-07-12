"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { salaryPaymentSchema, type SalaryPaymentFormData } from "@/lib/payment-validation"
import { createSalaryPayment } from "@/lib/payment-api"
import { DollarSign, User, CreditCard, Loader2 } from "lucide-react"

interface SalaryPaymentFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Salary payment form component with validation and error handling
 */
export function SalaryPaymentForm({ onSuccess, onCancel }: SalaryPaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<SalaryPaymentFormData>({
    resolver: zodResolver(salaryPaymentSchema),
    defaultValues: {
      currency: "USD",
      paymentMethod: "",
    },
  })

  // Mock teachers data - in real app, this would come from API
  const teachers = [
    { id: "1", name: "Sarah Johnson", email: "sarah.johnson@teacherportal.com" },
    { id: "2", name: "Michael Chen", email: "michael.chen@teacherportal.com" },
    { id: "3", name: "Emily Rodriguez", email: "emily.rodriguez@teacherportal.com" },
    { id: "4", name: "David Wilson", email: "david.wilson@teacherportal.com" },
  ]

  const paymentMethods = [
    { id: "bank_transfer", name: "Bank Transfer", icon: "🏦" },
    { id: "paypal", name: "PayPal", icon: "💳" },
    { id: "stripe", name: "Stripe", icon: "💰" },
    { id: "check", name: "Check", icon: "📝" },
  ]

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
  ]

  const onSubmit = async (data: SalaryPaymentFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const payment = await createSalaryPayment(data)

      toast({
        title: "Payment Initiated",
        description: `Salary payment of ${data.currency} ${data.amount} has been initiated for the selected teacher.`,
      })

      reset()
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing the salary payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedTeacher = teachers.find((t) => t.id === watch("teacherId"))
  const selectedCurrency = currencies.find((c) => c.code === watch("currency"))

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Salary Payment
        </CardTitle>
        <p className="text-sm text-muted-foreground">Process salary payment to a teacher</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Teacher Selection */}
          <div className="space-y-2">
            <Label htmlFor="teacherId">Select Teacher *</Label>
            <Select onValueChange={(value) => setValue("teacherId", value)}>
              <SelectTrigger className={errors.teacherId ? "border-red-500" : ""}>
                <SelectValue placeholder="Choose a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-xs text-muted-foreground">{teacher.email}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.teacherId && <p className="text-sm text-red-500">{errors.teacherId.message}</p>}
          </div>

          {/* Amount and Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="amount">Payment Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  {selectedCurrency?.symbol || "$"}
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100000"
                  placeholder="0.00"
                  className={`pl-8 ${errors.amount ? "border-red-500" : ""}`}
                  {...register("amount", { valueAsNumber: true })}
                />
              </div>
              {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency *</Label>
              <Select onValueChange={(value) => setValue("currency", value)} defaultValue="USD">
                <SelectTrigger className={errors.currency ? "border-red-500" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currency && <p className="text-sm text-red-500">{errors.currency.message}</p>}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method *</Label>
            <Select onValueChange={(value) => setValue("paymentMethod", value)}>
              <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    <div className="flex items-center gap-2">
                      <span>{method.icon}</span>
                      <span>{method.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Payment Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this payment..."
              rows={3}
              {...register("description")}
            />
          </div>

          {/* Payment Summary */}
          {selectedTeacher && watch("amount") > 0 && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <h4 className="font-medium">Payment Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Teacher:</span>
                  <span className="font-medium">{selectedTeacher.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">
                    {selectedCurrency?.symbol}
                    {watch("amount")?.toFixed(2) || "0.00"} {watch("currency")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-medium">
                    {paymentMethods.find((m) => m.id === watch("paymentMethod"))?.name || "Not selected"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Payment
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
