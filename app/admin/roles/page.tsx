"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Shield, Eye, Edit, Trash2 } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: {
    [key: string]: boolean
  }
}

/**
 * Role permissions management page
 */
export default function RolesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    const loadRoles = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRoles([
        {
          id: "1",
          name: "Administrator",
          description: "Full system access with all permissions",
          userCount: 2,
          permissions: {
            "user.create": true,
            "user.read": true,
            "user.update": true,
            "user.delete": true,
            "teacher.create": true,
            "teacher.read": true,
            "teacher.update": true,
            "teacher.delete": true,
            "student.create": true,
            "student.read": true,
            "student.update": true,
            "student.delete": true,
            "lesson.create": true,
            "lesson.read": true,
            "lesson.update": true,
            "lesson.delete": true,
            "report.read": true,
            "system.settings": true,
          },
        },
        {
          id: "2",
          name: "Teacher",
          description: "Access to teaching-related features",
          userCount: 15,
          permissions: {
            "user.create": false,
            "user.read": true,
            "user.update": false,
            "user.delete": false,
            "teacher.create": false,
            "teacher.read": true,
            "teacher.update": true,
            "teacher.delete": false,
            "student.create": false,
            "student.read": true,
            "student.update": true,
            "student.delete": false,
            "lesson.create": true,
            "lesson.read": true,
            "lesson.update": true,
            "lesson.delete": false,
            "report.read": true,
            "system.settings": false,
          },
        },
        {
          id: "3",
          name: "Staff",
          description: "Limited access for administrative staff",
          userCount: 5,
          permissions: {
            "user.create": false,
            "user.read": true,
            "user.update": false,
            "user.delete": false,
            "teacher.create": false,
            "teacher.read": true,
            "teacher.update": false,
            "teacher.delete": false,
            "student.create": true,
            "student.read": true,
            "student.update": true,
            "student.delete": false,
            "lesson.create": true,
            "lesson.read": true,
            "lesson.update": false,
            "lesson.delete": false,
            "report.read": false,
            "system.settings": false,
          },
        },
      ])

      setIsLoading(false)
    }

    loadRoles()
  }, [])

  const permissionLabels = {
    "user.create": "Create Users",
    "user.read": "View Users",
    "user.update": "Edit Users",
    "user.delete": "Delete Users",
    "teacher.create": "Create Teachers",
    "teacher.read": "View Teachers",
    "teacher.update": "Edit Teachers",
    "teacher.delete": "Delete Teachers",
    "student.create": "Create Students",
    "student.read": "View Students",
    "student.update": "Edit Students",
    "student.delete": "Delete Students",
    "lesson.create": "Create Lessons",
    "lesson.read": "View Lessons",
    "lesson.update": "Edit Lessons",
    "lesson.delete": "Delete Lessons",
    "report.read": "View Reports",
    "system.settings": "System Settings",
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-10" />
                    </div>
                  ))}
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
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Role Permissions
          </h1>
          <p className="text-muted-foreground">Manage user roles and their permissions</p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Roles List */}
      <div className="space-y-6">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {role.name}
                    <Badge variant="secondary">{role.userCount} users</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {role.name !== "Administrator" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(role.permissions).map(([permission, enabled]) => (
                  <div key={permission} className="flex items-center justify-between p-2 rounded-md border">
                    <span className="text-sm font-medium">{permissionLabels[permission]}</span>
                    <Switch checked={enabled} disabled />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
