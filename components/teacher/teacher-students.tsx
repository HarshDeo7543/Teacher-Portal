"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fetchTeacherStudents } from "@/lib/api"
import { Mail, Phone } from "lucide-react"

interface TeacherStudentsProps {
  teacherId: string
}

export function TeacherStudents({ teacherId }: TeacherStudentsProps) {
  const {
    data: students,
    error,
    isLoading,
  } = useSWR(`teacher-students-${teacherId}`, () => fetchTeacherStudents(teacherId))

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-destructive">Failed to load students</div>
  if (!students || students.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No students assigned</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <Card key={student.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{student.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                Active Student
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
