import { type NextRequest, NextResponse } from "next/server"
import type { Teacher } from "@/types"

// Mock data
const mockTeacher: Teacher = {
  id: "1",
  name: "Sarah Johnson",
  role: "Senior Music Teacher",
  birthdate: "1985-03-15",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Richmond Hill, ON L4C 1A1",
  privateQualifications: [
    { id: "1", skill: "Piano", hourlyRate: 75 },
    { id: "2", skill: "Voice", hourlyRate: 65 },
  ],
  groupQualifications: [
    { id: "3", skill: "Music Theory", hourlyRate: 45 },
    { id: "4", skill: "Choir", hourlyRate: 40 },
  ],
  avatar: "/placeholder.svg?height=100&width=100",
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (id === "1") {
    return NextResponse.json(mockTeacher)
  }

  return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const updates = await request.json()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (id === "1") {
    const updatedTeacher = { ...mockTeacher, ...updates }
    return NextResponse.json(updatedTeacher)
  }

  return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
}
