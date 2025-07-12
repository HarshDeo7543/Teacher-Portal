"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Plus, Mail, Phone, Shield, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AdminUser {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "teacher" | "staff"
  status: "active" | "inactive"
  lastLogin: string
}

/**
 * User management page for admin
 */
export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadUsers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUsers([
        {
          id: "1",
          name: "John Admin",
          email: "admin@teacherportal.com",
          phone: "+1 (555) 123-4567",
          role: "admin",
          status: "active",
          lastLogin: "2024-01-20T10:30:00Z",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.johnson@teacherportal.com",
          phone: "+1 (555) 234-5678",
          role: "teacher",
          status: "active",
          lastLogin: "2024-01-20T09:15:00Z",
        },
        {
          id: "3",
          name: "Mike Wilson",
          email: "mike.wilson@teacherportal.com",
          phone: "+1 (555) 345-6789",
          role: "staff",
          status: "inactive",
          lastLogin: "2024-01-18T14:20:00Z",
        },
      ])

      setIsLoading(false)
    }

    loadUsers()
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
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

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
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
          <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <Button asChild>
          <Link href="/admin/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MoreHorizontal className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last login: {new Date(user.lastLogin).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    <Shield className="h-3 w-3 mr-1" />
                    {user.role}
                  </Badge>
                  <Badge variant={user.status === "active" ? "default" : "outline"}>{user.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>View Activity</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <MoreHorizontal className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No users found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by adding your first user."}
          </p>
        </div>
      )}
    </div>
  )
}
