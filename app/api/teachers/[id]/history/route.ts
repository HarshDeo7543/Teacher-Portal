import { type NextRequest, NextResponse } from "next/server"
import type { HistoryEntry } from "@/types"

// Mock data
const mockHistory: HistoryEntry[] = [
  {
    id: "1",
    teacherId: "1",
    action: "Profile Updated",
    details: "Updated contact information and qualifications",
    timestamp: "2024-01-12T09:15:00Z",
    author: "Sarah Johnson",
  },
  {
    id: "2",
    teacherId: "1",
    action: "Schedule Modified",
    details: "Added new availability slots for Wednesday afternoons",
    timestamp: "2024-01-08T16:45:00Z",
    author: "Admin User",
  },
  {
    id: "3",
    teacherId: "1",
    action: "Qualification Added",
    details: "Added Voice coaching qualification with $65/hr rate",
    timestamp: "2024-01-03T11:20:00Z",
    author: "Manager",
  },
]

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(mockHistory.filter((entry) => entry.teacherId === id))
}
