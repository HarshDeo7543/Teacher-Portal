import { type NextRequest, NextResponse } from "next/server"
import type { Lesson } from "@/types"

// Mock data
const mockLessons: Lesson[] = [
  {
    id: "1",
    studentId: "1",
    teacherId: "1",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "10:00",
    status: "completed",
    invoiced: true,
  },
  {
    id: "2",
    studentId: "2",
    teacherId: "1",
    date: "2024-01-16",
    startTime: "14:00",
    endTime: "15:00",
    status: "scheduled",
    invoiced: false,
  },
  {
    id: "3",
    studentId: "3",
    teacherId: "1",
    date: "2024-01-17",
    startTime: "16:00",
    endTime: "17:00",
    status: "completed",
    invoiced: true,
  },
]

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 350))

  return NextResponse.json(mockLessons.filter((lesson) => lesson.teacherId === id))
}
