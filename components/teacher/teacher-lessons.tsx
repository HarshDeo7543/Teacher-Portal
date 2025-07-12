"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fetchTeacherLessons } from "@/lib/api"
import { formatDate, formatTime } from "@/lib/utils"
import { Calendar, Clock } from "lucide-react"

interface TeacherLessonsProps {
  teacherId: string
  invoiced: boolean
}

export function TeacherLessons({ teacherId, invoiced }: TeacherLessonsProps) {
  const {
    data: lessons,
    error,
    isLoading,
  } = useSWR(`teacher-lessons-${teacherId}-${invoiced}`, () => fetchTeacherLessons(teacherId))

  const filteredLessons = lessons?.filter((lesson) => lesson.invoiced === invoiced)

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-destructive">Failed to load lessons</div>
  if (!filteredLessons || filteredLessons.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No {invoiced ? "invoiced" : "unscheduled"} lessons found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredLessons.map((lesson) => (
        <Card key={lesson.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Lesson #{lesson.id}</CardTitle>
              <Badge
                variant={
                  lesson.status === "completed"
                    ? "default"
                    : lesson.status === "cancelled"
                      ? "destructive"
                      : "secondary"
                }
              >
                {lesson.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(lesson.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
