"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Activity, User, Search, Download, Filter, Eye } from "lucide-react"

interface ActivityLog {
  id: string
  user: string
  action: string
  resource: string
  details: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  status: "success" | "warning" | "error"
}

/**
 * User activity logs page
 */
export default function ActivityPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadActivities = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setActivities([
        {
          id: "1",
          user: "john.admin@teacherportal.com",
          action: "LOGIN",
          resource: "Authentication",
          details: "User logged in successfully",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          ipAddress: "192.168.1.100",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          status: "success",
        },
        {
          id: "2",
          user: "sarah.johnson@teacherportal.com",
          action: "CREATE",
          resource: "Student",
          details: "Created new student: Emily Chen",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          ipAddress: "192.168.1.101",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          status: "success",
        },
        {
          id: "3",
          user: "mike.wilson@teacherportal.com",
          action: "UPDATE",
          resource: "Teacher Profile",
          details: "Updated availability schedule",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          ipAddress: "192.168.1.102",
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
          status: "success",
        },
        {
          id: "4",
          user: "unknown@example.com",
          action: "LOGIN_FAILED",
          resource: "Authentication",
          details: "Failed login attempt - invalid credentials",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          ipAddress: "203.0.113.1",
          userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
          status: "error",
        },
        {
          id: "5",
          user: "admin@teacherportal.com",
          action: "DELETE",
          resource: "User Account",
          details: "Deleted inactive user account",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          ipAddress: "192.168.1.100",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          status: "warning",
        },
      ])

      setIsLoading(false)
    }

    loadActivities()
  }, [])

  const filteredActivities = activities.filter(
    (activity) =>
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: ActivityLog["status"]) => {
    switch (status) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
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
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Activity className="h-8 w-8" />
            User Activity Logs
          </h1>
          <p className="text-muted-foreground">Monitor user actions and system events</p>
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
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-sm">{activity.action}</h3>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{activity.resource}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{activity.details}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">User:</span> {activity.user}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {activity.timestamp.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {activity.ipAddress}
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
                <Badge variant={getStatusColor(activity.status)} className="flex-shrink-0">
                  {activity.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No activities found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "No user activities recorded yet."}
          </p>
        </div>
      )}
    </div>
  )
}
