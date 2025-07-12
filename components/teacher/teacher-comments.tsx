"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fetchTeacherComments } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { MessageSquare } from "lucide-react"

interface TeacherCommentsProps {
  teacherId: string
}

export function TeacherComments({ teacherId }: TeacherCommentsProps) {
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR(`teacher-comments-${teacherId}`, () => fetchTeacherComments(teacherId))

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-destructive">Failed to load comments</div>
  if (!comments || comments.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No comments yet</div>
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Comment by {comment.author}</CardTitle>
              <span className="text-xs text-muted-foreground ml-auto">{formatDate(comment.createdAt)}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
