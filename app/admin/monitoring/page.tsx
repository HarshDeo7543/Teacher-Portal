"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Server, Cpu, HardDrive, Wifi, Database, Activity, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"

interface SystemMetric {
  name: string
  value: string
  status: "healthy" | "warning" | "critical"
  icon: React.ComponentType<{ className?: string }>
  details: string
}

interface ServerStatus {
  uptime: string
  lastRestart: string
  version: string
  environment: string
}

/**
 * Server monitoring page
 */
export default function MonitoringPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState<SystemMetric[]>([])
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMetrics([
      {
        name: "CPU Usage",
        value: "45%",
        status: "healthy",
        icon: Cpu,
        details: "4 cores, 2.4 GHz average",
      },
      {
        name: "Memory Usage",
        value: "68%",
        status: "warning",
        icon: HardDrive,
        details: "6.8 GB of 10 GB used",
      },
      {
        name: "Disk Space",
        value: "23%",
        status: "healthy",
        icon: Database,
        details: "230 GB of 1 TB used",
      },
      {
        name: "Network",
        value: "Normal",
        status: "healthy",
        icon: Wifi,
        details: "Latency: 12ms, Bandwidth: 100 Mbps",
      },
      {
        name: "Database",
        value: "Online",
        status: "healthy",
        icon: Database,
        details: "Response time: 45ms",
      },
      {
        name: "API Response",
        value: "125ms",
        status: "healthy",
        icon: Activity,
        details: "Average response time",
      },
    ])

    setServerStatus({
      uptime: "15 days, 4 hours",
      lastRestart: "2024-01-05T10:30:00Z",
      version: "2.1.0",
      environment: "Production",
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadData()
    setIsRefreshing(false)
  }

  const getStatusColor = (status: SystemMetric["status"]) => {
    switch (status) {
      case "healthy":
        return "default"
      case "warning":
        return "secondary"
      case "critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: SystemMetric["status"]) => {
    switch (status) {
      case "healthy":
        return CheckCircle
      case "warning":
      case "critical":
        return AlertTriangle
      default:
        return Activity
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
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
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
            <Server className="h-8 w-8" />
            Server Monitoring
          </h1>
          <p className="text-muted-foreground">Monitor system performance and health</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Server Status */}
      {serverStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-lg font-semibold">{serverStatus.uptime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Restart</p>
                <p className="text-lg font-semibold">{new Date(serverStatus.lastRestart).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Version</p>
                <p className="text-lg font-semibold">{serverStatus.version}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Environment</p>
                <Badge variant="default">{serverStatus.environment}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const StatusIcon = getStatusIcon(metric.status)
          return (
            <Card
              key={metric.name}
              className="hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <metric.icon className="h-4 w-4" />
                  {metric.name}
                </CardTitle>
                <StatusIcon
                  className={`h-4 w-4 ${
                    metric.status === "healthy"
                      ? "text-green-600"
                      : metric.status === "warning"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.details}</p>
                <Badge variant={getStatusColor(metric.status)} className="mt-2">
                  {metric.status}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
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
                <p className="font-medium">High Memory Usage</p>
                <p className="text-sm text-muted-foreground">
                  Memory usage is at 68%. Consider optimizing or adding more RAM.
                </p>
              </div>
              <Button size="sm">Investigate</Button>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-md bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">System Health Check Passed</p>
                <p className="text-sm text-muted-foreground">All critical systems are operating normally</p>
              </div>
              <Badge variant="outline">Resolved</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
