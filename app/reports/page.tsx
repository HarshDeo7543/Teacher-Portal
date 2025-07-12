"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { exportToExcel, mockReportData } from "@/lib/excel-export"
import { Download, FileText, Calendar, Users, BookOpen, TrendingUp } from "lucide-react"

/**
 * Reports page with export functionality
 */
export default function ReportsPage() {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExportReport = async () => {
    setIsExporting(true)

    try {
      await exportToExcel(mockReportData, "teacher-portal-report")

      toast({
        title: "Report Exported",
        description: "The report has been downloaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const reportStats = [
    {
      title: "Total Lessons",
      value: "156",
      change: "+12%",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Active Teachers",
      value: "24",
      change: "+3",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Students Enrolled",
      value: "89",
      change: "+8%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">View and export system reports</p>
        </div>
        <Button onClick={handleExportReport} disabled={isExporting}>
          {isExporting ? (
            <>
              <Download className="mr-2 h-4 w-4 animate-pulse" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="outline" className="mt-1">
                    {stat.change}
                  </Badge>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Teacher</th>
                  <th className="text-left p-2 font-medium">Student</th>
                  <th className="text-left p-2 font-medium">Subject</th>
                  <th className="text-left p-2 font-medium">Date</th>
                  <th className="text-left p-2 font-medium">Duration</th>
                  <th className="text-left p-2 font-medium">Status</th>
                  <th className="text-left p-2 font-medium">Campus</th>
                </tr>
              </thead>
              <tbody>
                {mockReportData.slice(0, 5).map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2">{row.teacherName}</td>
                    <td className="p-2">{row.studentName}</td>
                    <td className="p-2">{row.subject}</td>
                    <td className="p-2">{new Date(row.date).toLocaleDateString()}</td>
                    <td className="p-2">{row.duration}</td>
                    <td className="p-2">
                      <Badge variant={row.status === "Completed" ? "default" : "secondary"}>{row.status}</Badge>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">{row.campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing 5 of {mockReportData.length} records. Export to view all data.
          </div>
        </CardContent>
      </Card>

      {/* Additional Report Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive monthly report including all lessons, payments, and performance metrics.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Generate Monthly Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Teacher Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed analysis of teacher performance, student feedback, and lesson completion rates.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              <Users className="mr-2 h-4 w-4" />
              View Performance Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Revenue analysis, payment tracking, and financial insights across all campuses.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Financial Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
