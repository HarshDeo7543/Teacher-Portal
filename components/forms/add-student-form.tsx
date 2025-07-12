"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, X, User, Phone, Users, BookOpen } from "lucide-react"
import type { AddStudentFormType } from "@/types/forms"

const addStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  parentName: z.string().min(2, "Parent name is required"),
  parentPhone: z.string().min(10, "Parent phone is required"),
  parentEmail: z.string().email("Invalid parent email"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  enrollmentDate: z.string().min(1, "Enrollment date is required"),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency phone is required"),
  medicalInfo: z.string().optional(),
  notes: z.string().optional(),
})

const availableSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "Arts",
  "Music",
]

interface StudentFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Form component for adding new students to the system
 * Includes comprehensive student information collection with validation
 */
export function AddStudentFormComponent({ onSuccess, onCancel }: StudentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddStudentFormType>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      subjects: [],
      enrollmentDate: new Date().toISOString().split("T")[0],
    },
  })

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject]

    setSelectedSubjects(newSubjects)
    setValue("subjects", newSubjects)
  }

  const onSubmit = async (data: AddStudentFormType) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, make API call to create student
      console.log("Creating student:", data)

      toast({
        title: "Student Added Successfully",
        description: `${data.name} has been enrolled in the system.`,
      })

      reset()
      setSelectedSubjects([])
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
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
          <User className="h-5 w-5" />
          Add New Student
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter student's full name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className={errors.dateOfBirth ? "border-red-500" : ""}
                />
                {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="student@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+91 98765 43210"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="Enter complete address"
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Parent/Guardian Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                <Input
                  id="parentName"
                  {...register("parentName")}
                  placeholder="Enter parent's name"
                  className={errors.parentName ? "border-red-500" : ""}
                />
                {errors.parentName && <p className="text-sm text-red-500">{errors.parentName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentPhone">Parent Phone *</Label>
                <Input
                  id="parentPhone"
                  {...register("parentPhone")}
                  placeholder="+91 98765 43210"
                  className={errors.parentPhone ? "border-red-500" : ""}
                />
                {errors.parentPhone && <p className="text-sm text-red-500">{errors.parentPhone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentEmail">Parent Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  {...register("parentEmail")}
                  placeholder="parent@example.com"
                  className={errors.parentEmail ? "border-red-500" : ""}
                />
                {errors.parentEmail && <p className="text-sm text-red-500">{errors.parentEmail.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date *</Label>
                <Input
                  id="enrollmentDate"
                  type="date"
                  {...register("enrollmentDate")}
                  className={errors.enrollmentDate ? "border-red-500" : ""}
                />
                {errors.enrollmentDate && <p className="text-sm text-red-500">{errors.enrollmentDate.message}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Academic Information
            </h3>
            <div className="space-y-2">
              <Label>Subjects *</Label>
              <div className="flex flex-wrap gap-2">
                {availableSubjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handleSubjectToggle(subject)}
                  >
                    {subject}
                    {selectedSubjects.includes(subject) && <X className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
              {errors.subjects && <p className="text-sm text-red-500">{errors.subjects.message}</p>}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  {...register("emergencyContact")}
                  placeholder="Enter emergency contact name"
                  className={errors.emergencyContact ? "border-red-500" : ""}
                />
                {errors.emergencyContact && <p className="text-sm text-red-500">{errors.emergencyContact.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                <Input
                  id="emergencyPhone"
                  {...register("emergencyPhone")}
                  placeholder="+91 98765 43210"
                  className={errors.emergencyPhone ? "border-red-500" : ""}
                />
                {errors.emergencyPhone && <p className="text-sm text-red-500">{errors.emergencyPhone.message}</p>}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalInfo">Medical Information</Label>
                <Textarea
                  id="medicalInfo"
                  {...register("medicalInfo")}
                  placeholder="Any medical conditions, allergies, or special requirements"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" {...register("notes")} placeholder="Additional notes about the student" />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Student...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
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
