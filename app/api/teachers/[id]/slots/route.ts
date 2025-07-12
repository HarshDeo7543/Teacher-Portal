import { type NextRequest, NextResponse } from "next/server"
import type { TimeSlot } from "@/types"

// Mock data
const mockSlots: TimeSlot[] = [
  {
    id: "1",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    status: "booked",
    teacherId: "1",
  },
  {
    id: "2",
    day: "Monday",
    startTime: "14:00",
    endTime: "15:30",
    status: "blocked",
    teacherId: "1",
  },
  {
    id: "3",
    day: "Tuesday",
    startTime: "10:00",
    endTime: "11:00",
    status: "booked",
    teacherId: "1",
  },
  {
    id: "4",
    day: "Wednesday",
    startTime: "16:00",
    endTime: "17:00",
    status: "booked",
    teacherId: "1",
  },
  {
    id: "5",
    day: "Friday",
    startTime: "13:00",
    endTime: "14:00",
    status: "blocked",
    teacherId: "1",
  },
]

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(mockSlots.filter((slot) => slot.teacherId === id))
}
