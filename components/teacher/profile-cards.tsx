"use client"

import { useState } from "react"
import { Edit, Mail, Phone, MapPin, Calendar, User, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Teacher } from "@/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { EditProfileForm } from "./edit-profile-form"

interface ProfileCardsProps {
  teacher: Teacher
  onUpdate: (data: Partial<Teacher>) => void
}

export function ProfileCards({ teacher, onUpdate }: ProfileCardsProps) {
  const [editingCard, setEditingCard] = useState<string | null>(null)

  if (editingCard === "details") {
    return (
      <EditProfileForm
        teacher={teacher}
        onSave={(data) => {
          onUpdate(data)
          setEditingCard(null)
        }}
        onCancel={() => setEditingCard(null)}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Details Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setEditingCard("details")} aria-label="Edit details">
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{teacher.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{teacher.role}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formatDate(teacher.birthdate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{teacher.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{teacher.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{teacher.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Qualifications Card */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Qualifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Private Lessons</h4>
              <div className="space-y-2">
                {teacher.privateQualifications.map((qual) => (
                  <div key={qual.id} className="flex justify-between items-center">
                    <span className="text-sm">{qual.skill}</span>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{formatCurrency(qual.hourlyRate)}/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Group Lessons</h4>
              <div className="space-y-2">
                {teacher.groupQualifications.map((qual) => (
                  <div key={qual.id} className="flex justify-between items-center">
                    <span className="text-sm">{qual.skill}</span>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{formatCurrency(qual.hourlyRate)}/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
