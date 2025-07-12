"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fetchTeacherHistory } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { History, User } from "lucide-react"

interface TeacherHistoryProps {
  teacherId: string
}

export function TeacherHistory({ teacherId }: TeacherHistoryProps) {
  const {
    data: history,
    error,
    isLoading,
  } = useSWR(`teacher-history-${teacherId}`, () => fetchTeacherHistory(teacherId))

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-destructive">Failed to load history</div>
  if (!history || history.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No history available</div>
  }

  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <Card key={entry.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">{entry.action}</CardTitle>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">{entry.details}</p>
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">by {entry.author}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
