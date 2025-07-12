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
import { coursePaymentSchema, type CoursePaymentFormData } from "@/lib/payment-validation"
import { createCoursePayment } from "@/lib/payment-api"
import { GraduationCap, User, BookOpen, CreditCard, Loader2 } from "lucide-react"

interface CoursePaymentFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Course payment collection form component
 */
export function CoursePaymentForm({ onSuccess, onCancel }: CoursePaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CoursePaymentFormData>({
    resolver: zodResolver(coursePaymentSchema),
    defaultValues: {
      currency: "USD",
      paymentMethod: "",
    },
  })

  // Mock data - in real app, this would come from API
  const students = [
    { id: "1", name: "Emily Chen", email: "emily.chen@student.com", phone: "+1 (555) 123-4567" },
    { id: "2", name: "Michael Rodriguez", email: "michael.rodriguez@student.com", phone: "+1 (555) 234-5678" },
    { id: "3", name: "Jessica Thompson", email: "jessica.thompson@student.com", phone: "+1 (555) 345-6789" },
    { id: "4", name: "David Kim", email: "david.kim@student.com", phone: "+1 (555) 456-7890" },
  ]

  const courses = [
    {
      id: "1",
      name: "Piano Fundamentals",
      teacher: "Sarah Johnson",
      duration: "8 weeks",
      price: 480,
      description: "Learn basic piano techniques and music theory",
    },
    {
      id: "2",
      name: "Advanced Calculus",
      teacher: "Michael Chen",
      duration: "12 weeks",
      price: 720,
      description: "Advanced mathematical concepts and problem solving",
    },
    {
      id: "3",
      name: "Literature Analysis",
      teacher: "Emily Rodriguez",
      duration: "10 weeks",
      price: 600,
      description: "Critical analysis of classic and modern literature",
    },
    {
      id: "4",
      name: "Spanish Conversation",
      teacher: "David Wilson",
      duration: "6 weeks",
      price: 360,
      description: "Improve Spanish speaking and listening skills",
    },
  ]

  const paymentMethods = [
    { id: "credit_card", name: "Credit Card", icon: "💳" },
    { id: "debit_card", name: "Debit Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "🅿️" },
    { id: "bank_transfer", name: "Bank Transfer", icon: "🏦" },
  ]

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
  ]

  const onSubmit = async (data: CoursePaymentFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const payment = await createCoursePayment(data)

      toast({
        title: "Payment Collected",
        description: `Course payment of ${data.currency} ${data.amount} has been successfully collected.`,
      })

      reset()
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing the course payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedStudent = students.find((s) => s.id === watch("studentId"))
  const selectedCourse = courses.find((c) => c.id === watch("courseId"))
  const selectedCurrency = currencies.find((c) => c.code === watch("currency"))

  // Auto-fill amount when course is selected
  const handleCourseChange = (courseId: string) => {
    setValue("courseId", courseId)
    const course = courses.find((c) => c.id === courseId)
    if (course) {
      setValue("amount", course.price)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Course Payment Collection
        </CardTitle>
        <p className="text-sm text-muted-foreground">Collect payment from student upon course completion</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Student Selection */}
          <div className="space-y-2">
            <Label htmlFor="studentId">Select Student *</Label>
            <Select onValueChange={(value) => setValue("studentId", value)}>
              <SelectTrigger className={errors.studentId ? "border-red-500" : ""}>
                <SelectValue placeholder="Choose a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.studentId && <p className="text-sm text-red-500">{errors.studentId.message}</p>}
          </div>

          {/* Course Selection */}
          <div className="space-y-2">
            <Label htmlFor="courseId">Select Course *</Label>
            <Select onValueChange={handleCourseChange}>
              <SelectTrigger className={errors.courseId ? "border-red-500" : ""}>
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {course.teacher} • {course.duration} • ${course.price}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.courseId && <p className="text-sm text-red-500">{errors.courseId.message}</p>}
          </div>

          {/* Course Details */}
          {selectedCourse && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <h4 className="font-medium">Course Details</h4>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Course:</strong> {selectedCourse.name}
                </div>
                <div>
                  <strong>Teacher:</strong> {selectedCourse.teacher}
                </div>
                <div>
                  <strong>Duration:</strong> {selectedCourse.duration}
                </div>
                <div>
                  <strong>Description:</strong> {selectedCourse.description}
                </div>
              </div>
            </div>
          )}

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
                  max="10000"
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
            <Label htmlFor="description">Payment Notes (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any additional notes about this payment..."
              rows={3}
              {...register("description")}
            />
          </div>

          {/* Payment Summary */}
          {selectedStudent && selectedCourse && watch("amount") > 0 && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <h4 className="font-medium">Payment Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Student:</span>
                  <span className="font-medium">{selectedStudent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span className="font-medium">{selectedCourse.name}</span>
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
                  Collect Payment
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
