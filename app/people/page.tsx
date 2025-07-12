"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Plus, Mail, Phone, MapPin, User } from "lucide-react"

interface Person {
  id: string
  name: string
  role: string
  email: string
  phone: string
  location: string
  status: "active" | "inactive"
  avatar?: string
}

/**
 * People management page showing all teachers and staff with Indian names
 */
export default function PeoplePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [people, setPeople] = useState<Person[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadPeople = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPeople([
        {
          id: "1",
          name: "Priya Sharma",
          role: "Senior Mathematics Teacher",
          email: "priya.sharma@teacherportal.in",
          phone: "+91 98765 43210",
          location: "Toronto Main Campus",
          status: "active",
        },
        {
          id: "2",
          name: "Rajesh Kumar",
          role: "Physics Instructor",
          email: "rajesh.kumar@teacherportal.in",
          phone: "+91 98765 43211",
          location: "Toronto North Branch",
          status: "active",
        },
        {
          id: "3",
          name: "Anita Patel",
          role: "Chemistry Teacher",
          email: "anita.patel@teacherportal.in",
          phone: "+91 98765 43212",
          location: "Toronto East Branch",
          status: "active",
        },
        {
          id: "4",
          name: "Vikram Singh",
          role: "English Literature Teacher",
          email: "vikram.singh@teacherportal.in",
          phone: "+91 98765 43213",
          location: "Toronto West Branch",
          status: "inactive",
        },
        {
          id: "5",
          name: "Meera Gupta",
          role: "Biology Teacher",
          email: "meera.gupta@teacherportal.in",
          phone: "+91 98765 43214",
          location: "Toronto Main Campus",
          status: "active",
        },
        {
          id: "6",
          name: "Arjun Mehta",
          role: "Computer Science Teacher",
          email: "arjun.mehta@teacherportal.in",
          phone: "+91 98765 43215",
          location: "Toronto North Branch",
          status: "active",
        },
      ])

      setIsLoading(false)
    }

    loadPeople()
  }, [])

  const filteredPeople = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()),
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
                  <Skeleton className="h-4 w-1/2" />
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
          <h1 className="text-2xl md:text-3xl font-bold">People</h1>
          <p className="text-muted-foreground">Manage teachers and staff members</p>
        </div>
        <Button asChild>
          <Link href="/people/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Person
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search people..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.map((person) => (
          <Card key={person.id} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{person.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>
                </div>
                <Badge variant={person.status === "active" ? "default" : "secondary"}>{person.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{person.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{person.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{person.location}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/teachers/${person.id}`}>View Profile</Link>
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPeople.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No people found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by adding your first team member."}
          </p>
        </div>
      )}
    </div>
  )
}
