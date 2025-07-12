"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { UserPlus, BookCheck, Calendar, Settings, AlertCircle, Clock } from "lucide-react"

interface ActivityItem {
  id: string
  type: "teacher" | "lesson" | "schedule" | "system" | "alert"
  title: string
  description: string
  timestamp: Date
  status: "success" | "warning" | "info"
}

/**
 * Recent Activity component showing system events and updates with Indian names
 */
export function RecentActivity() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    // Simulate API call
    const loadActivities = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setActivities([
        {
          id: "1",
          type: "teacher",
          title: "New teacher registered",
          description: "Priya Sharma joined as Mathematics Instructor",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          status: "success",
        },
        {
          id: "2",
          type: "lesson",
          title: "Lesson completed",
          description: "Physics lesson with Aarav Agarwal - Advanced Mechanics",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          status: "success",
        },
        {
          id: "3",
          type: "schedule",
          title: "Schedule updated",
          description: "Rajesh Kumar updated availability for next week",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          status: "info",
        },
        {
          id: "4",
          type: "alert",
          title: "Payment reminder",
          description: "3 students have pending payments due this week",
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          status: "warning",
        },
        {
          id: "5",
          type: "system",
          title: "System maintenance",
          description: "Scheduled maintenance completed successfully",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          status: "success",
        },
        {
          id: "6",
          type: "lesson",
          title: "New lesson scheduled",
          description: "Chemistry lesson between Anita Patel and Diya Bansal",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
          status: "info",
        },
      ])

      setIsLoading(false)
    }

    loadActivities()
  }, [])

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "teacher":
        return UserPlus
      case "lesson":
        return BookCheck
      case "schedule":
        return Calendar
      case "system":
        return Settings
      case "alert":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="w-2 h-2 rounded-full mt-2" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 group hover:bg-accent/50 -mx-2 px-2 py-2 rounded-md transition-colors duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
                  <Icon className="absolute -top-1 -left-2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{activity.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
