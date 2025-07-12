"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Shield, Users, Settings, Database, Activity, AlertTriangle, CheckCircle, Server } from "lucide-react"

/**
 * Admin dashboard page for system management
 */
export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [systemStatus, setSystemStatus] = useState<any>(null)

  useEffect(() => {
    const loadAdminData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setSystemStatus({
        database: "healthy",
        server: "healthy",
        backup: "warning",
        security: "healthy",
      })

      setIsLoading(false)
    }

    loadAdminData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-16" />
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
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">System administration and management</p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={systemStatus.database === "healthy" ? "default" : "destructive"}>
              {systemStatus.database}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={systemStatus.server === "healthy" ? "default" : "destructive"}>{systemStatus.server}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={systemStatus.backup === "warning" ? "secondary" : "default"}>{systemStatus.backup}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={systemStatus.security === "healthy" ? "default" : "destructive"}>
              {systemStatus.security}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="mr-2 h-4 w-4" />
              Role Permissions
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Activity className="mr-2 h-4 w-4" />
              User Activity Logs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start">
              <Database className="mr-2 h-4 w-4" />
              Database Management
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Server className="mr-2 h-4 w-4" />
              Server Monitoring
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border rounded-md bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium">Backup Warning</p>
                <p className="text-sm text-muted-foreground">
                  Last backup was 3 days ago. Consider running a manual backup.
                </p>
              </div>
              <Button size="sm">Resolve</Button>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-md bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">System Update Complete</p>
                <p className="text-sm text-muted-foreground">All systems updated successfully to version 2.1.0</p>
              </div>
              <Badge variant="outline">Resolved</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
