"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Teacher } from "@/types"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  birthdate: z.string().min(1, "Birthdate is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface EditProfileFormProps {
  teacher: Teacher
  onSave: (data: Partial<Teacher>) => void
  onCancel: () => void
}

export function EditProfileForm({ teacher, onSave, onCancel }: EditProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: teacher.name,
      role: teacher.role,
      birthdate: teacher.birthdate,
      email: teacher.email,
      phone: teacher.phone,
      address: teacher.address,
    },
  })

  const onSubmit = (data: ProfileFormData) => {
    onSave(data)
  }

  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
              {errors.name && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" {...register("role")} aria-invalid={errors.role ? "true" : "false"} />
              {errors.role && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input
                id="birthdate"
                type="date"
                {...register("birthdate")}
                aria-invalid={errors.birthdate ? "true" : "false"}
              />
              {errors.birthdate && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.birthdate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} aria-invalid={errors.email ? "true" : "false"} />
              {errors.email && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} aria-invalid={errors.phone ? "true" : "false"} />
              {errors.phone && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} aria-invalid={errors.address ? "true" : "false"} />
              {errors.address && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || !isDirty}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
