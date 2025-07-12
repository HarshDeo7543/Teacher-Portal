"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Plus, Calendar, Clock, User, BookOpen } from "lucide-react"

interface Lesson {
  id: string
  title: string
  student: string
  teacher: string
  date: string
  startTime: string
  endTime: string
  status: "scheduled" | "completed" | "cancelled" | "in-progress"
  subject: string
  location: string
}

/**
 * Lessons management page with Indian names
 */
export default function LessonsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadLessons = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setLessons([
        {
          id: "1",
          title: "Advanced Mathematics",
          student: "Aarav Agarwal",
          teacher: "Priya Sharma",
          date: "2024-01-20",
          startTime: "09:00",
          endTime: "10:00",
          status: "scheduled",
          subject: "Mathematics",
          location: "Room 101",
        },
        {
          id: "2",
          title: "Physics Fundamentals",
          student: "Karan Jain",
          teacher: "Rajesh Kumar",
          date: "2024-01-20",
          startTime: "14:00",
          endTime: "15:30",
          status: "in-progress",
          subject: "Physics",
          location: "Lab 1",
        },
        {
          id: "3",
          title: "Organic Chemistry",
          student: "Diya Bansal",
          teacher: "Anita Patel",
          date: "2024-01-19",
          startTime: "16:00",
          endTime: "17:00",
          status: "completed",
          subject: "Chemistry",
          location: "Lab 2",
        },
        {
          id: "4",
          title: "English Literature",
          student: "Ishaan Chopra",
          teacher: "Vikram Singh",
          date: "2024-01-21",
          startTime: "11:00",
          endTime: "12:00",
          status: "scheduled",
          subject: "English",
          location: "Room 103",
        },
        {
          id: "5",
          title: "Indian History",
          student: "Ananya Desai",
          teacher: "Meera Gupta",
          date: "2024-01-22",
          startTime: "10:00",
          endTime: "11:30",
          status: "scheduled",
          subject: "History",
          location: "Room 201",
        },
        {
          id: "6",
          title: "Computer Programming",
          student: "Aryan Malhotra",
          teacher: "Arjun Mehta",
          date: "2024-01-18",
          startTime: "15:00",
          endTime: "16:30",
          status: "completed",
          subject: "Computer Science",
          location: "Computer Lab",
        },
        {
          id: "7",
          title: "Cell Biology",
          student: "Riya Kapoor",
          teacher: "Kavya Reddy",
          date: "2024-01-23",
          startTime: "13:00",
          endTime: "14:00",
          status: "scheduled",
          subject: "Biology",
          location: "Biology Lab",
        },
        {
          id: "8",
          title: "Economics Principles",
          student: "Sanya Nair",
          teacher: "Rohit Sharma",
          date: "2024-01-17",
          startTime: "12:00",
          endTime: "13:00",
          status: "cancelled",
          subject: "Economics",
          location: "Room 205",
        },
      ])

      setIsLoading(false)
    }

    loadLessons()
  }, [])

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: Lesson["status"]) => {
    switch (status) {
      case "scheduled":
        return "default"
      case "in-progress":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "default"
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
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-10 w-full max-w-md" />

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
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
          <h1 className="text-2xl md:text-3xl font-bold">Lessons</h1>
          <p className="text-muted-foreground">Manage and schedule lessons</p>
        </div>
        <Button asChild>
          <Link href="/lessons/schedule">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Lesson
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search lessons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                </div>
                <Badge variant={getStatusColor(lesson.status)}>{lesson.status.replace("-", " ")}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lesson.student}</p>
                    <p className="text-muted-foreground">Student</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lesson.teacher}</p>
                    <p className="text-muted-foreground">Teacher</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{new Date(lesson.date).toLocaleDateString()}</p>
                    <p className="text-muted-foreground">Date</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {lesson.startTime} - {lesson.endTime}
                    </p>
                    <p className="text-muted-foreground">{lesson.location}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm">View Details</Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                {lesson.status === "scheduled" && (
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No lessons found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by scheduling your first lesson."}
          </p>
        </div>
      )}
    </div>
  )
}
