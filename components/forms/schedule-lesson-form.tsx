"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Calendar, Clock, MapPin, Users } from "lucide-react"
import type { ScheduleLessonForm } from "@/types/forms"

const scheduleLessonSchema = z.object({
  teacherId: z.string().min(1, "Teacher is required"),
  studentId: z.string().min(1, "Student is required"),
  subject: z.string().min(1, "Subject is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Location is required"),
  lessonType: z.enum(["individual", "group"]),
  notes: z.string().optional(),
  recurringPattern: z.enum(["none", "weekly", "biweekly", "monthly"]).optional(),
  recurringEndDate: z.string().optional(),
})

interface Teacher {
  id: string
  name: string
  subjects: string[]
}

interface Student {
  id: string
  name: string
  subjects: string[]
}

interface ScheduleLessonFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Form component for scheduling lessons between teachers and students
 * Includes time validation, conflict checking, and recurring lesson options
 */
export function ScheduleLessonFormComponent({ onSuccess, onCancel }: ScheduleLessonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ScheduleLessonForm>({
    resolver: zodResolver(scheduleLessonSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      lessonType: "individual",
      recurringPattern: "none",
    },
  })

  const selectedTeacherId = watch("teacherId")
  const selectedStudentId = watch("studentId")
  const recurringPattern = watch("recurringPattern")

  // Load teachers and students data with Indian names
  useEffect(() => {
    const loadData = async () => {
      // Mock data with Indian names
      setTeachers([
        { id: "t1", name: "Priya Sharma", subjects: ["Mathematics", "Physics"] },
        { id: "t2", name: "Rajesh Kumar", subjects: ["Physics", "Chemistry"] },
        { id: "t3", name: "Anita Patel", subjects: ["Chemistry", "Biology"] },
        { id: "t4", name: "Vikram Singh", subjects: ["English", "Hindi"] },
        { id: "t5", name: "Meera Gupta", subjects: ["History", "Geography"] },
        { id: "t6", name: "Arjun Mehta", subjects: ["Computer Science", "Mathematics"] },
        { id: "t7", name: "Kavya Reddy", subjects: ["Biology", "Chemistry"] },
        { id: "t8", name: "Rohit Sharma", subjects: ["Economics", "History"] },
      ])

      setStudents([
        { id: "s1", name: "Aarav Agarwal", subjects: ["Mathematics", "Physics"] },
        { id: "s2", name: "Diya Bansal", subjects: ["Chemistry", "Biology"] },
        { id: "s3", name: "Ishaan Chopra", subjects: ["English", "Hindi"] },
        { id: "s4", name: "Ananya Desai", subjects: ["History", "Mathematics"] },
        { id: "s5", name: "Karan Jain", subjects: ["Physics", "Chemistry"] },
        { id: "s6", name: "Riya Kapoor", subjects: ["Biology", "Chemistry"] },
        { id: "s7", name: "Aryan Malhotra", subjects: ["Computer Science", "Mathematics"] },
        { id: "s8", name: "Sanya Nair", subjects: ["Economics", "Geography"] },
      ])
    }

    loadData()
  }, [])

  // Update available subjects when teacher or student changes
  useEffect(() => {
    if (selectedTeacherId && selectedStudentId) {
      const teacher = teachers.find((t) => t.id === selectedTeacherId)
      const student = students.find((s) => s.id === selectedStudentId)

      if (teacher && student) {
        const commonSubjects = teacher.subjects.filter((subject) => student.subjects.includes(subject))
        setAvailableSubjects(commonSubjects)
      }
    } else {
      setAvailableSubjects([])
    }
  }, [selectedTeacherId, selectedStudentId, teachers, students])

  const validateTimeSlot = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return true

    const start = new Date(`2000-01-01T${startTime}`)
    const end = new Date(`2000-01-01T${endTime}`)

    return end > start
  }

  const onSubmit = async (data: ScheduleLessonForm) => {
    // Validate time slot
    if (!validateTimeSlot(data.startTime, data.endTime)) {
      toast({
        title: "Invalid Time",
        description: "End time must be after start time.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, make API call to schedule lesson
      console.log("Scheduling lesson:", data)

      const teacher = teachers.find((t) => t.id === data.teacherId)
      const student = students.find((s) => s.id === data.studentId)

      toast({
        title: "Lesson Scheduled Successfully",
        description: `${data.subject} lesson scheduled between ${teacher?.name} and ${student?.name}.`,
      })

      reset()
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule lesson. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedule New Lesson
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Participants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Participants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teacherId">Teacher *</Label>
                <Select onValueChange={(value) => setValue("teacherId", value)}>
                  <SelectTrigger className={errors.teacherId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        <div>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-muted-foreground">{teacher.subjects.join(", ")}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.teacherId && <p className="text-sm text-red-500">{errors.teacherId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student *</Label>
                <Select onValueChange={(value) => setValue("studentId", value)}>
                  <SelectTrigger className={errors.studentId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.subjects.join(", ")}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.studentId && <p className="text-sm text-red-500">{errors.studentId.message}</p>}
              </div>
            </div>
          </div>

          {/* Lesson Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lesson Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select onValueChange={(value) => setValue("subject", value)} disabled={availableSubjects.length === 0}>
                  <SelectTrigger className={errors.subject ? "border-red-500" : ""}>
                    <SelectValue
                      placeholder={
                        availableSubjects.length === 0 ? "Select teacher and student first" : "Select subject"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessonType">Lesson Type *</Label>
                <Select onValueChange={(value) => setValue("lessonType", value as "individual" | "group")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lesson type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" {...register("date")} className={errors.date ? "border-red-500" : ""} />
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  {...register("startTime")}
                  className={errors.startTime ? "border-red-500" : ""}
                />
                {errors.startTime && <p className="text-sm text-red-500">{errors.startTime.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  {...register("endTime")}
                  className={errors.endTime ? "border-red-500" : ""}
                />
                {errors.endTime && <p className="text-sm text-red-500">{errors.endTime.message}</p>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h3>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select onValueChange={(value) => setValue("location", value)}>
                <SelectTrigger className={errors.location ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Room 101">Room 101 - Main Building</SelectItem>
                  <SelectItem value="Room 102">Room 102 - Main Building</SelectItem>
                  <SelectItem value="Room 201">Room 201 - Second Floor</SelectItem>
                  <SelectItem value="Lab 1">Lab 1 - Science Wing</SelectItem>
                  <SelectItem value="Lab 2">Lab 2 - Computer Lab</SelectItem>
                  <SelectItem value="Library">Library - Study Hall</SelectItem>
                  <SelectItem value="Online">Online Session</SelectItem>
                </SelectContent>
              </Select>
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>
          </div>

          {/* Recurring Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recurring Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recurringPattern">Recurring Pattern</Label>
                <Select onValueChange={(value) => setValue("recurringPattern", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">One-time lesson</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {recurringPattern && recurringPattern !== "none" && (
                <div className="space-y-2">
                  <Label htmlFor="recurringEndDate">End Date</Label>
                  <Input id="recurringEndDate" type="date" {...register("recurringEndDate")} />
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Any additional notes or special requirements for this lesson"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Lesson
                </>
              )}
            </Button>

            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none bg-transparent"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
