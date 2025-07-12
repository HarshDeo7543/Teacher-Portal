"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, BookOpen, Calendar, BarChart3, TrendingUp, TrendingDown } from "lucide-react"

interface StatCard {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
  icon: React.ComponentType<{ className?: string }>
  href: string
}

/**
 * Dashboard statistics cards with loading states and animations
 */
export function StatsCards() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<StatCard[]>([])

  useEffect(() => {
    // Simulate API call
    const loadStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStats([
        {
          title: "Total Teachers",
          value: "24",
          change: "+2 this month",
          changeType: "increase",
          icon: Users,
          href: "/people",
        },
        {
          title: "Active Students",
          value: "156",
          change: "+12 this week",
          changeType: "increase",
          icon: BookOpen,
          href: "/students",
        },
        {
          title: "Lessons This Week",
          value: "89",
          change: "-3 from last week",
          changeType: "decrease",
          icon: Calendar,
          href: "/lessons",
        },
        {
          title: "Revenue This Month",
          value: "$12,450",
          change: "+8.2% from last month",
          changeType: "increase",
          icon: BarChart3,
          href: "/reports",
        },
      ])

      setIsLoading(false)
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {stat.changeType === "increase" && <TrendingUp className="h-3 w-3 text-green-600" />}
              {stat.changeType === "decrease" && <TrendingDown className="h-3 w-3 text-red-600" />}
              <span
                className={
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : stat.changeType === "decrease"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }
              >
                {stat.change}
              </span>
            </div>
            <Link href={stat.href} className="mt-2 block">
              <Button variant="link" className="p-0 h-auto text-sm hover:underline">
                View details →
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
