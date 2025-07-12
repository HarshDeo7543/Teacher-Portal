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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, X, User, Briefcase, GraduationCap } from "lucide-react"
import type { AddPersonForm } from "@/types/forms"

const addPersonSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.string().min(1, "Role is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  qualifications: z.array(z.string()).min(1, "At least one qualification is required"),
  experience: z.string().min(1, "Experience is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  emergencyContact: z.string().min(2, "Emergency contact is required"),
  emergencyPhone: z.string().min(10, "Emergency phone is required"),
  salary: z.number().optional(),
  notes: z.string().optional(),
})

const availableRoles = [
  "Senior Teacher",
  "Junior Teacher",
  "Assistant Teacher",
  "Lab Assistant",
  "Administrative Staff",
  "Counselor",
  "Librarian",
  "IT Support",
  "Maintenance",
]

const availableQualifications = [
  "B.Ed",
  "M.Ed",
  "B.Sc",
  "M.Sc",
  "B.A",
  "M.A",
  "B.Tech",
  "M.Tech",
  "Ph.D",
  "Diploma",
  "Certificate Course",
  "Professional Training",
]

interface AddPersonFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Form component for adding new staff/teachers to the system
 * Comprehensive form with role-based fields and validation
 */
export function AddPersonFormComponent({ onSuccess, onCancel }: AddPersonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AddPersonForm>({
    resolver: zodResolver(addPersonSchema),
    defaultValues: {
      qualifications: [],
      joiningDate: new Date().toISOString().split("T")[0],
    },
  })

  const selectedRole = watch("role")

  const handleQualificationToggle = (qualification: string) => {
    const newQualifications = selectedQualifications.includes(qualification)
      ? selectedQualifications.filter((q) => q !== qualification)
      : [...selectedQualifications, qualification]

    setSelectedQualifications(newQualifications)
    setValue("qualifications", newQualifications)
  }

  const onSubmit = async (data: AddPersonForm) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, make API call to create person
      console.log("Creating person:", data)

      toast({
        title: "Person Added Successfully",
        description: `${data.name} has been added to the system.`,
      })

      reset()
      setSelectedQualifications([])
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add person. Please try again.",
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
          Add New Person
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
                  placeholder="Enter full name"
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
                  placeholder="person@teacherportal.in"
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

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select onValueChange={(value) => setValue("role", value)}>
                  <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date *</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  {...register("joiningDate")}
                  className={errors.joiningDate ? "border-red-500" : ""}
                />
                {errors.joiningDate && <p className="text-sm text-red-500">{errors.joiningDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience *</Label>
                <Input
                  id="experience"
                  {...register("experience")}
                  placeholder="e.g., 5 years in teaching"
                  className={errors.experience ? "border-red-500" : ""}
                />
                {errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
              </div>

              {(selectedRole?.includes("Teacher") || selectedRole?.includes("Staff")) && (
                <div className="space-y-2">
                  <Label htmlFor="salary">Monthly Salary (₹)</Label>
                  <Input
                    id="salary"
                    type="number"
                    {...register("salary", { valueAsNumber: true })}
                    placeholder="Enter monthly salary"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Qualifications
            </h3>
            <div className="space-y-2">
              <Label>Qualifications *</Label>
              <div className="flex flex-wrap gap-2">
                {availableQualifications.map((qualification) => (
                  <Badge
                    key={qualification}
                    variant={selectedQualifications.includes(qualification) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handleQualificationToggle(qualification)}
                  >
                    {qualification}
                    {selectedQualifications.includes(qualification) && <X className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
              {errors.qualifications && <p className="text-sm text-red-500">{errors.qualifications.message}</p>}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
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
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" {...register("notes")} placeholder="Additional notes or comments" />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Person...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Person
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
