import { type NextRequest, NextResponse } from "next/server"
import type { Student } from "@/types"

// Mock data
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    phone: "+1 (555) 234-5678",
    teacherId: "1",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    phone: "+1 (555) 345-6789",
    teacherId: "1",
  },
  {
    id: "3",
    name: "Jessica Thompson",
    email: "jessica.t@example.com",
    phone: "+1 (555) 456-7890",
    teacherId: "1",
  },
]

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  return NextResponse.json(mockStudents.filter((student) => student.teacherId === id))
}
