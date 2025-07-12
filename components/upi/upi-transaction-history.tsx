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
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  RefreshCw,
} from "lucide-react"
import type { UPITransaction } from "@/types/upi"
import { formatAmount } from "@/lib/upi-validation"

/**
 * UPI Transaction History Component
 * Displays comprehensive transaction history with filtering and search capabilities
 */
export function UPITransactionHistory() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<UPITransaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const loadTransactions = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1800))

      const mockTransactions: UPITransaction[] = [
        {
          id: "txn_001",
          transactionId: "UPI2024011501",
          upiRef: "402912345678",
          fromVPA: "teacher@paytm",
          toVPA: "sarah.johnson@gpay",
          amount: 3200,
          currency: "INR",
          description: "Monthly salary - January 2024",
          status: "success",
          type: "send",
          category: "salary",
          timestamp: "2024-01-15T10:30:00Z",
          completedAt: "2024-01-15T10:30:15Z",
        },
        {
          id: "txn_002",
          transactionId: "UPI2024011502",
          upiRef: "402912345679",
          fromVPA: "student@phonepe",
          toVPA: "teacher@paytm",
          amount: 1500,
          currency: "INR",
          description: "Piano course fee - Advanced level",
          status: "success",
          type: "receive",
          category: "course_fee",
          timestamp: "2024-01-15T14:20:00Z",
          completedAt: "2024-01-15T14:20:08Z",
        },
        {
          id: "txn_003",
          transactionId: "UPI2024011503",
          upiRef: "402912345680",
          fromVPA: "teacher@paytm",
          toVPA: "michael.chen@bhim",
          amount: 2800,
          currency: "INR",
          description: "Monthly salary - January 2024",
          status: "pending",
          type: "send",
          category: "salary",
          timestamp: "2024-01-16T09:15:00Z",
        },
        {
          id: "txn_004",
          transactionId: "UPI2024011504",
          upiRef: "402912345681",
          fromVPA: "teacher@paytm",
          toVPA: "invalid@user",
          amount: 500,
          currency: "INR",
          description: "Refund for cancelled session",
          status: "failed",
          type: "send",
          category: "refund",
          timestamp: "2024-01-16T16:45:00Z",
          failureReason: "Invalid UPI ID",
        },
        {
          id: "txn_005",
          transactionId: "UPI2024011505",
          upiRef: "402912345682",
          fromVPA: "parent@amazonpay",
          toVPA: "teacher@paytm",
          amount: 2400,
          currency: "INR",
          description: "Mathematics tutoring - 8 sessions",
          status: "success",
          type: "receive",
          category: "course_fee",
          timestamp: "2024-01-17T11:30:00Z",
          completedAt: "2024-01-17T11:30:12Z",
        },
        {
          id: "txn_006",
          transactionId: "UPI2024011506",
          upiRef: "402912345683",
          fromVPA: "teacher@paytm",
          toVPA: "emily.rodriguez@gpay",
          amount: 3500,
          currency: "INR",
          description: "Monthly salary - January 2024",
          status: "processing",
          type: "send",
          category: "salary",
          timestamp: "2024-01-18T08:00:00Z",
        },
      ]

      setTransactions(mockTransactions)
      setIsLoading(false)
    }

    loadTransactions()
  }, [])

  /**
   * Get status icon based on transaction status
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  /**
   * Get status badge variant
   */
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "success":
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

  /**
   * Filter transactions based on active tab and search term
   */
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.toVPA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.fromVPA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "sent" && transaction.type === "send") ||
      (activeTab === "received" && transaction.type === "receive") ||
      (activeTab === "pending" && transaction.status === "pending") ||
      (activeTab === "failed" && transaction.status === "failed")

    return matchesSearch && matchesTab
  })

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
        <Skeleton className="h-10 w-full" />

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
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
          <h2 className="text-2xl font-bold">Transaction History</h2>
          <p className="text-muted-foreground">View all your UPI transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Transaction Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({transactions.length})</TabsTrigger>
          <TabsTrigger value="sent">Sent ({transactions.filter((t) => t.type === "send").length})</TabsTrigger>
          <TabsTrigger value="received">
            Received ({transactions.filter((t) => t.type === "receive").length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({transactions.filter((t) => t.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="failed">Failed ({transactions.filter((t) => t.status === "failed").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Transaction Type Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        transaction.type === "send" ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"
                      }`}
                    >
                      {transaction.type === "send" ? (
                        <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                      ) : (
                        <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>

                    {/* Transaction Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">
                          {transaction.type === "send" ? `To: ${transaction.toVPA}` : `From: ${transaction.fromVPA}`}
                        </h3>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{transaction.transactionId}</span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{transaction.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Category:</span>{" "}
                          <span className="capitalize">{transaction.category.replace("_", " ")}</span>
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(transaction.timestamp).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span>{" "}
                          {new Date(transaction.timestamp).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      {transaction.failureReason && (
                        <div className="mt-2 text-xs text-red-600 bg-red-50 dark:bg-red-950 px-2 py-1 rounded">
                          <AlertTriangle className="h-3 w-3 inline mr-1" />
                          {transaction.failureReason}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Amount and Status */}
                  <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          transaction.type === "send" ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {transaction.type === "send" ? "-" : "+"}
                        {formatAmount(transaction.amount)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <Badge variant={getStatusVariant(transaction.status)} className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>

                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Try adjusting your search terms or filters."
                  : "No transactions recorded yet for this category."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
