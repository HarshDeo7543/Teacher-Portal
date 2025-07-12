"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, User, BookOpen, Settings, AlertCircle, CheckCircle, UserPlus } from "lucide-react"

interface TimelineEvent {
  id: string
  type: "user" | "lesson" | "system" | "enrollment"
  title: string
  description: string
  timestamp: Date
  user: string
  status: "success" | "warning" | "info" | "error"
}

/**
 * Timeline page showing chronological system events
 */
export default function TimelinePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    const loadTimeline = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEvents([
        {
          id: "1",
          type: "user",
          title: "New Teacher Registration",
          description: "Sarah Johnson registered as a Piano Instructor",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          user: "System",
          status: "success",
        },
        {
          id: "2",
          type: "lesson",
          title: "Lesson Completed",
          description: "Advanced Calculus lesson with Michael Rodriguez",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          user: "Michael Chen",
          status: "success",
        },
        {
          id: "3",
          type: "enrollment",
          title: "Student Enrollment",
          description: "Emily Chen enrolled in Piano Fundamentals course",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          user: "Admin",
          status: "info",
        },
        {
          id: "4",
          type: "system",
          title: "System Maintenance",
          description: "Scheduled maintenance completed successfully",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          user: "System",
          status: "success",
        },
        {
          id: "5",
          type: "lesson",
          title: "Lesson Cancelled",
          description: "Literature Analysis lesson cancelled due to teacher illness",
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
          user: "Emily Rodriguez",
          status: "warning",
        },
      ])

      setIsLoading(false)
    }

    loadTimeline()
  }, [])

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "user":
        return UserPlus
      case "lesson":
        return BookOpen
      case "enrollment":
        return User
      case "system":
        return Settings
      default:
        return Clock
    }
  }

  const getStatusIcon = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "success":
        return CheckCircle
      case "warning":
      case "error":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Clock className="h-8 w-8" />
          Timeline
        </h1>
        <p className="text-muted-foreground">Chronological view of system events and activities</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-6">
          {events.map((event, index) => {
            const EventIcon = getEventIcon(event.type)
            const StatusIcon = getStatusIcon(event.status)

            return (
              <div key={event.id} className="relative flex space-x-4" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 bg-background border-2 border-border rounded-full">
                  <EventIcon className="w-4 h-4 text-muted-foreground" />
                </div>

                {/* Event content */}
                <Card className="flex-1 hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(event.status)}`} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{event.timestamp.toLocaleString()}</span>
                          <span>•</span>
                          <span>by {event.user}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          event.status === "success"
                            ? "default"
                            : event.status === "warning"
                              ? "secondary"
                              : event.status === "error"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
