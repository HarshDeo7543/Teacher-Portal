"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react"
import type { UPIStats } from "@/types/upi"
import { formatAmount } from "@/lib/upi-validation"

/**
 * UPI Statistics Dashboard Component
 * Displays comprehensive UPI transaction statistics and metrics
 */
export function UPIStatsDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<UPIStats | null>(null)

  useEffect(() => {
    const loadStats = async () => {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStats({
        totalTransactions: 247,
        successfulTransactions: 235,
        failedTransactions: 12,
        totalAmountSent: 125000,
        totalAmountReceived: 89500,
        monthlyTransactions: 45,
        averageTransactionAmount: 2750,
      })

      setIsLoading(false)
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  const successRate = ((stats.successfulTransactions / stats.totalTransactions) * 100).toFixed(1)
  const netAmount = stats.totalAmountReceived - stats.totalAmountSent

  const statCards = [
    {
      title: "Total Transactions",
      value: stats.totalTransactions.toLocaleString(),
      change: "+12% from last month",
      changeType: "increase" as const,
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      change: `${stats.successfulTransactions}/${stats.totalTransactions} successful`,
      changeType: "increase" as const,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Amount Sent",
      value: formatAmount(stats.totalAmountSent),
      change: "This month",
      changeType: "neutral" as const,
      icon: ArrowUpRight,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      borderColor: "border-red-200 dark:border-red-800",
    },
    {
      title: "Amount Received",
      value: formatAmount(stats.totalAmountReceived),
      change: "This month",
      changeType: "increase" as const,
      icon: ArrowDownLeft,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Net Amount",
      value: formatAmount(Math.abs(netAmount)),
      change: netAmount >= 0 ? "Net received" : "Net sent",
      changeType: netAmount >= 0 ? ("increase" as const) : ("decrease" as const),
      icon: netAmount >= 0 ? TrendingUp : TrendingDown,
      color: netAmount >= 0 ? "text-green-600" : "text-red-600",
      bgColor: netAmount >= 0 ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950",
      borderColor: netAmount >= 0 ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800",
    },
    {
      title: "Monthly Transactions",
      value: stats.monthlyTransactions.toString(),
      change: "Current month",
      changeType: "neutral" as const,
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Average Amount",
      value: formatAmount(stats.averageTransactionAmount),
      change: "Per transaction",
      changeType: "neutral" as const,
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      title: "Failed Transactions",
      value: stats.failedTransactions.toString(),
      change: "Needs attention",
      changeType: "decrease" as const,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      borderColor: "border-red-200 dark:border-red-800",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((stat, index) => (
        <Card
          key={stat.title}
          className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${stat.bgColor} ${stat.borderColor} border-2 animate-in slide-in-from-bottom-4`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {stat.changeType === "increase" && <TrendingUp className="h-3 w-3 text-green-600" />}
              {stat.changeType === "decrease" && <TrendingDown className="h-3 w-3 text-red-600" />}
              <span
                className={`${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : stat.changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
