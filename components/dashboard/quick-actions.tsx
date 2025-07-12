"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, GraduationCap, Calendar, FileText, CreditCard, Smartphone, Zap } from "lucide-react"

/**
 * Quick Actions component for the dashboard
 * Enhanced with payment-related actions
 */
export function QuickActions() {
  const actions = [
    {
      title: "Add New Teacher",
      description: "Register a new teacher",
      icon: UserPlus,
      href: "/people",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Enroll Student",
      description: "Add a new student",
      icon: GraduationCap,
      href: "/students",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Schedule Lesson",
      description: "Book a new lesson",
      icon: Calendar,
      href: "/lessons",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Generate Report",
      description: "Create performance report",
      icon: FileText,
      href: "/reports",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      title: "Process Payment",
      description: "Handle salary & course payments",
      icon: CreditCard,
      href: "/payments",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
    {
      title: "UPI Transfer",
      description: "Quick UPI payments",
      icon: Smartphone,
      href: "/upi",
      color: "text-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-950",
      borderColor: "border-teal-200 dark:border-teal-800",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center gap-3 w-full ${action.bgColor} ${action.borderColor} border-2 hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-transparent`}
              >
                <div className={`p-3 rounded-full ${action.bgColor}`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
