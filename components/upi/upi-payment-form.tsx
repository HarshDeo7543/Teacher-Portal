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
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { Send, User, DollarSign, MessageSquare, Tag, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import { upiPaymentSchema, type UPIPaymentFormData, formatAmount, validateVPA } from "@/lib/upi-validation"
import { UPIApiService } from "@/lib/upi-api"

interface UPIPaymentFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  prefilledData?: Partial<UPIPaymentFormData>
}

/**
 * UPI Payment Form Component
 * Handles UPI payment initiation with comprehensive validation and user feedback
 */
export function UPIPaymentForm({ onSuccess, onCancel, prefilledData }: UPIPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isVerifyingVPA, setIsVerifyingVPA] = useState(false)
  const [vpaVerified, setVpaVerified] = useState<{ isValid: boolean; name?: string } | null>(null)
  const [showPin, setShowPin] = useState(false)
  const [step, setStep] = useState<"details" | "confirm" | "pin" | "processing" | "success">("details")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<UPIPaymentFormData>({
    resolver: zodResolver(upiPaymentSchema),
    defaultValues: {
      amount: prefilledData?.amount || 0,
      toVPA: prefilledData?.toVPA || "",
      description: prefilledData?.description || "",
      category: prefilledData?.category || "other",
      pin: "",
    },
    mode: "onChange",
  })

  const watchedValues = watch()

  /**
   * Verify UPI VPA when user stops typing
   */
  const handleVPAVerification = async (vpa: string) => {
    if (!validateVPA(vpa)) {
      setVpaVerified(null)
      return
    }

    setIsVerifyingVPA(true)
    try {
      const result = await UPIApiService.verifyVPA(vpa)
      setVpaVerified(result)
      if (!result.isValid) {
        toast({
          title: "Invalid UPI ID",
          description: "The UPI ID you entered is not valid or doesn't exist.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("VPA verification failed:", error)
      setVpaVerified(null)
    } finally {
      setIsVerifyingVPA(false)
    }
  }

  /**
   * Handle form submission
   */
  const onSubmit = async (data: UPIPaymentFormData) => {
    if (step === "details") {
      setStep("confirm")
      return
    }

    if (step === "confirm") {
      setStep("pin")
      return
    }

    if (step === "pin") {
      setIsProcessing(true)
      setStep("processing")

      try {
        const transaction = await UPIApiService.initiatePayment({
          toVPA: data.toVPA,
          amount: data.amount,
          description: data.description,
          category: data.category,
          pin: data.pin,
        })

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 3000))

        setStep("success")
        toast({
          title: "Payment Successful!",
          description: `₹${data.amount.toLocaleString()} sent to ${data.toVPA}`,
        })

        setTimeout(() => {
          onSuccess?.()
          handleReset()
        }, 2000)
      } catch (error) {
        console.error("Payment failed:", error)
        toast({
          title: "Payment Failed",
          description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
          variant: "destructive",
        })
        setStep("pin")
      } finally {
        setIsProcessing(false)
      }
    }
  }

  /**
   * Reset form and state
   */
  const handleReset = () => {
    reset()
    setStep("details")
    setVpaVerified(null)
    setShowPin(false)
  }

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    if (step === "confirm") setStep("details")
    else if (step === "pin") setStep("confirm")
    else if (step === "processing") setStep("pin")
  }

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    handleReset()
    onCancel?.()
  }

  // Success state
  if (step === "success") {
    return (
      <Card className="w-full max-w-md mx-auto animate-in zoom-in-95 duration-300">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground mb-4">
            {formatAmount(watchedValues.amount)} sent to {watchedValues.toVPA}
          </p>
          <div className="text-sm text-muted-foreground">Transaction will be processed within 2-3 minutes</div>
        </CardContent>
      </Card>
    )
  }

  // Processing state
  if (step === "processing") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
          <p className="text-muted-foreground mb-4">Please wait while we process your payment...</p>
          <div className="text-sm text-muted-foreground">
            {formatAmount(watchedValues.amount)} to {watchedValues.toVPA}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          {step === "details" && "Send Money"}
          {step === "confirm" && "Confirm Payment"}
          {step === "pin" && "Enter UPI PIN"}
        </CardTitle>
        {step !== "details" && (
          <Button variant="ghost" size="sm" onClick={handleBack} className="w-fit">
            ← Back
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Payment Details Step */}
          {step === "details" && (
            <>
              {/* UPI ID Field */}
              <div className="space-y-2">
                <Label htmlFor="toVPA" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  UPI ID
                </Label>
                <div className="relative">
                  <Input
                    id="toVPA"
                    placeholder="user@paytm, user@gpay"
                    {...register("toVPA")}
                    onBlur={(e) => handleVPAVerification(e.target.value)}
                    className={`${
                      vpaVerified?.isValid
                        ? "border-green-500 focus:border-green-500"
                        : vpaVerified?.isValid === false
                          ? "border-red-500 focus:border-red-500"
                          : ""
                    }`}
                  />
                  {isVerifyingVPA && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <LoadingSpinner className="w-4 h-4" />
                    </div>
                  )}
                  {vpaVerified?.isValid && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                  {vpaVerified?.isValid === false && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                  )}
                </div>
                {vpaVerified?.name && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {vpaVerified.name}
                  </p>
                )}
                {errors.toVPA && <p className="text-sm text-red-600">{errors.toVPA.message}</p>}
              </div>

              {/* Amount Field */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Amount (₹)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="1"
                  max="100000"
                  placeholder="0.00"
                  {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                </Label>
                <Select value={watchedValues.category} onValueChange={(value) => setValue("category", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salary Payment</SelectItem>
                    <SelectItem value="course_fee">Course Fee</SelectItem>
                    <SelectItem value="refund">Refund</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Description
                </Label>
                <Textarea id="description" placeholder="Payment for..." rows={3} {...register("description")} />
                {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
              </div>
            </>
          )}

          {/* Confirmation Step */}
          {step === "confirm" && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">To</span>
                  <span className="font-medium">{watchedValues.toVPA}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-xl font-bold">{formatAmount(watchedValues.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="capitalize">{watchedValues.category.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Description</span>
                  <span className="text-right max-w-48 text-sm">{watchedValues.description}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Please review the details before proceeding
              </div>
            </div>
          )}

          {/* PIN Entry Step */}
          {step === "pin" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-lg font-semibold">{formatAmount(watchedValues.amount)}</div>
                <div className="text-sm text-muted-foreground">to {watchedValues.toVPA}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  UPI PIN
                </Label>
                <div className="relative">
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="Enter 4-6 digit PIN"
                    maxLength={6}
                    {...register("pin")}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.pin && <p className="text-sm text-red-600">{errors.pin.message}</p>}
              </div>

              <div className="text-xs text-muted-foreground text-center">Your PIN is encrypted and secure</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isProcessing || (step === "details" && !vpaVerified?.isValid)}
              className="flex-1"
            >
              {isProcessing && <LoadingSpinner className="w-4 h-4 mr-2" />}
              {step === "details" && "Continue"}
              {step === "confirm" && "Confirm"}
              {step === "pin" && "Pay Now"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
