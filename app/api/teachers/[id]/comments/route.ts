import { type NextRequest, NextResponse } from "next/server"
import type { Comment } from "@/types"

// Mock data
const mockComments: Comment[] = [
  {
    id: "1",
    teacherId: "1",
    content: "Excellent progress with piano students this month. Very dedicated teacher.",
    author: "Admin User",
    createdAt: "2024-01-10T10:30:00Z",
  },
  {
    id: "2",
    teacherId: "1",
    content: "Students are very happy with Sarah's teaching style. Great feedback from parents.",
    author: "Manager",
    createdAt: "2024-01-05T14:15:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 250))

  return NextResponse.json(mockComments.filter((comment) => comment.teacherId === id))
}
