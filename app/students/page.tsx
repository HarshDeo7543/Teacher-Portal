"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Plus, Mail, Phone, GraduationCap, Calendar } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  enrollmentDate: string
  status: "active" | "inactive" | "graduated"
  subjects: string[]
  teacher: string
}

/**
 * Students management page with Indian names
 */
export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadStudents = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setStudents([
        {
          id: "1",
          name: "Aarav Agarwal",
          email: "aarav.agarwal@email.com",
          phone: "+91 98765 43210",
          enrollmentDate: "2024-01-15",
          status: "active",
          subjects: ["Mathematics", "Physics"],
          teacher: "Priya Sharma",
        },
        {
          id: "2",
          name: "Diya Bansal",
          email: "diya.bansal@email.com",
          phone: "+91 98765 43211",
          enrollmentDate: "2024-02-01",
          status: "active",
          subjects: ["Chemistry", "Biology"],
          teacher: "Anita Patel",
        },
        {
          id: "3",
          name: "Ishaan Chopra",
          email: "ishaan.chopra@email.com",
          phone: "+91 98765 43212",
          enrollmentDate: "2023-09-10",
          status: "graduated",
          subjects: ["English Literature"],
          teacher: "Vikram Singh",
        },
        {
          id: "4",
          name: "Ananya Desai",
          email: "ananya.desai@email.com",
          phone: "+91 98765 43213",
          enrollmentDate: "2024-01-20",
          status: "active",
          subjects: ["History", "Geography"],
          teacher: "Meera Gupta",
        },
        {
          id: "5",
          name: "Karan Jain",
          email: "karan.jain@email.com",
          phone: "+91 98765 43214",
          enrollmentDate: "2024-02-05",
          status: "active",
          subjects: ["Computer Science", "Mathematics"],
          teacher: "Arjun Mehta",
        },
        {
          id: "6",
          name: "Riya Kapoor",
          email: "riya.kapoor@email.com",
          phone: "+91 98765 43215",
          enrollmentDate: "2023-12-15",
          status: "inactive",
          subjects: ["Physics", "Chemistry"],
          teacher: "Rajesh Kumar",
        },
        {
          id: "7",
          name: "Aryan Malhotra",
          email: "aryan.malhotra@email.com",
          phone: "+91 98765 43216",
          enrollmentDate: "2024-01-10",
          status: "active",
          subjects: ["Biology", "Chemistry"],
          teacher: "Kavya Reddy",
        },
        {
          id: "8",
          name: "Sanya Nair",
          email: "sanya.nair@email.com",
          phone: "+91 98765 43217",
          enrollmentDate: "2024-02-12",
          status: "active",
          subjects: ["Economics", "History"],
          teacher: "Rohit Sharma",
        },
      ])

      setIsLoading(false)
    }

    loadStudents()
  }, [])

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
  )

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-6 w-1/2" />
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
          <h1 className="text-2xl md:text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student enrollments and progress</p>
        </div>
        <Button asChild>
          <Link href="/students/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </div>
                <Badge
                  variant={
                    student.status === "active" ? "default" : student.status === "graduated" ? "secondary" : "outline"
                  }
                >
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {student.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Teacher: </span>
                  <span className="font-medium">{student.teacher}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No students found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by enrolling your first student."}
          </p>
        </div>
      )}
    </div>
  )
}
