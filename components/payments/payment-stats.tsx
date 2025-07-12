"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Users, GraduationCap } from "lucide-react"
import type { PaymentStats } from "@/types/payment"

/**
 * Payment statistics dashboard component
 */
export function PaymentStatsCards() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<PaymentStats | null>(null)

  useEffect(() => {
    const loadStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setStats({
        totalSalaryPayments: 45,
        totalCoursePayments: 128,
        pendingPayments: 12,
        completedPayments: 161,
        failedPayments: 3,
        monthlyRevenue: 28450,
        monthlyExpenses: 15200,
      })

      setIsLoading(false)
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  const netProfit = stats.monthlyRevenue - stats.monthlyExpenses
  const profitMargin = ((netProfit / stats.monthlyRevenue) * 100).toFixed(1)

  const statCards = [
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: "+12.5% from last month",
      changeType: "increase" as const,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Monthly Expenses",
      value: `$${stats.monthlyExpenses.toLocaleString()}`,
      change: "+8.2% from last month",
      changeType: "increase" as const,
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      title: "Net Profit",
      value: `$${netProfit.toLocaleString()}`,
      change: `${profitMargin}% margin`,
      changeType: "neutral" as const,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Salary Payments",
      value: stats.totalSalaryPayments.toString(),
      change: "This month",
      changeType: "neutral" as const,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Course Payments",
      value: stats.totalCoursePayments.toString(),
      change: "This month",
      changeType: "neutral" as const,
      icon: GraduationCap,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments.toString(),
      change: "Awaiting processing",
      changeType: "neutral" as const,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      title: "Completed Payments",
      value: stats.completedPayments.toString(),
      change: "Successfully processed",
      changeType: "increase" as const,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Failed Payments",
      value: stats.failedPayments.toString(),
      change: "Requires attention",
      changeType: "decrease" as const,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((stat, index) => (
        <Card
          key={stat.title}
          className={`hover:shadow-md transition-all duration-200 hover:-translate-y-1 ${stat.bgColor} border-0`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
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
