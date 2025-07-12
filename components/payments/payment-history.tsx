"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  Filter,
  Eye,
  DollarSign,
  GraduationCap,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import type { SalaryPayment, CoursePayment } from "@/types/payment"

/**
 * Payment history component showing salary and course payments
 */
export function PaymentHistory() {
  const [isLoading, setIsLoading] = useState(true)
  const [salaryPayments, setSalaryPayments] = useState<SalaryPayment[]>([])
  const [coursePayments, setCoursePayments] = useState<CoursePayment[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadPayments = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSalaryPayments([
        {
          id: "sal_001",
          teacherId: "1",
          teacherName: "Sarah Johnson",
          amount: 3200,
          currency: "USD",
          paymentDate: "2024-01-15",
          paymentMethod: "bank_transfer",
          status: "completed",
          description: "Monthly salary - January 2024",
          reference: "SAL-2024-001",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "sal_002",
          teacherId: "2",
          teacherName: "Michael Chen",
          amount: 2800,
          currency: "USD",
          paymentDate: "2024-01-15",
          paymentMethod: "paypal",
          status: "completed",
          description: "Monthly salary - January 2024",
          reference: "SAL-2024-002",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:45:00Z",
        },
        {
          id: "sal_003",
          teacherId: "3",
          teacherName: "Emily Rodriguez",
          amount: 3500,
          currency: "USD",
          paymentDate: "2024-01-20",
          paymentMethod: "bank_transfer",
          status: "pending",
          description: "Monthly salary - January 2024",
          reference: "SAL-2024-003",
          createdAt: "2024-01-20T09:00:00Z",
          updatedAt: "2024-01-20T09:00:00Z",
        },
      ])

      setCoursePayments([
        {
          id: "crs_001",
          studentId: "1",
          studentName: "Emily Chen",
          courseId: "1",
          courseName: "Piano Fundamentals",
          teacherId: "1",
          teacherName: "Sarah Johnson",
          amount: 480,
          currency: "USD",
          paymentDate: "2024-01-18",
          paymentMethod: {
            id: "pm_001",
            type: "credit_card",
            last4: "4242",
            brand: "visa",
            expiryMonth: 12,
            expiryYear: 2025,
            holderName: "Emily Chen",
            isDefault: true,
          },
          status: "completed",
          reference: "CRS-2024-001",
          createdAt: "2024-01-18T14:00:00Z",
          updatedAt: "2024-01-18T14:05:00Z",
        },
        {
          id: "crs_002",
          studentId: "2",
          studentName: "Michael Rodriguez",
          courseId: "2",
          courseName: "Advanced Calculus",
          teacherId: "2",
          teacherName: "Michael Chen",
          amount: 720,
          currency: "USD",
          paymentDate: "2024-01-19",
          paymentMethod: {
            id: "pm_002",
            type: "paypal",
            holderName: "Michael Rodriguez",
            isDefault: false,
          },
          status: "completed",
          reference: "CRS-2024-002",
          createdAt: "2024-01-19T16:00:00Z",
          updatedAt: "2024-01-19T16:10:00Z",
        },
        {
          id: "crs_003",
          studentId: "3",
          studentName: "Jessica Thompson",
          courseId: "3",
          courseName: "Literature Analysis",
          teacherId: "3",
          teacherName: "Emily Rodriguez",
          amount: 600,
          currency: "USD",
          paymentDate: "2024-01-20",
          paymentMethod: {
            id: "pm_003",
            type: "credit_card",
            last4: "1234",
            brand: "mastercard",
            expiryMonth: 8,
            expiryYear: 2026,
            holderName: "Jessica Thompson",
            isDefault: true,
          },
          status: "failed",
          reference: "CRS-2024-003",
          createdAt: "2024-01-20T11:00:00Z",
          updatedAt: "2024-01-20T11:05:00Z",
        },
      ])

      setIsLoading(false)
    }

    loadPayments()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "processing":
        return <AlertTriangle className="h-4 w-4 text-blue-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "processing":
        return "outline"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredSalaryPayments = salaryPayments.filter(
    (payment) =>
      payment.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCoursePayments = coursePayments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <Skeleton className="h-10 w-full max-w-md" />

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Payment History</h2>
          <p className="text-muted-foreground">View all salary and course payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search payments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Payment Tabs */}
      <Tabs defaultValue="salary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="salary" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Salary Payments ({salaryPayments.length})
          </TabsTrigger>
          <TabsTrigger value="course" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Course Payments ({coursePayments.length})
          </TabsTrigger>
        </TabsList>

        {/* Salary Payments */}
        <TabsContent value="salary" className="space-y-4">
          {filteredSalaryPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-sm">{payment.teacherName}</h3>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{payment.reference}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{payment.description || "Salary payment"}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Amount:</span> ${payment.amount.toLocaleString()}{" "}
                          {payment.currency}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Method:</span> {payment.paymentMethod.replace("_", " ")}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {getStatusIcon(payment.status)}
                    <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredSalaryPayments.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No salary payments found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms." : "No salary payments recorded yet."}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Course Payments */}
        <TabsContent value="course" className="space-y-4">
          {filteredCoursePayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-sm">{payment.studentName}</h3>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{payment.reference}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {payment.courseName} • {payment.teacherName}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Amount:</span> ${payment.amount.toLocaleString()}{" "}
                          {payment.currency}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Method:</span>
                          {payment.paymentMethod.type === "credit_card" || payment.paymentMethod.type === "debit_card"
                            ? `${payment.paymentMethod.brand} ****${payment.paymentMethod.last4}`
                            : payment.paymentMethod.type}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {getStatusIcon(payment.status)}
                    <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredCoursePayments.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No course payments found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms." : "No course payments recorded yet."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
