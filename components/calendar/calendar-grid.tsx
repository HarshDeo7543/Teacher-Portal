"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TimeSlot } from "@/types"
import { getDaysOfWeek, generateTimeSlots, formatTime, cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarGridProps {
  slots: TimeSlot[]
  teacherId: string
}

export function CalendarGrid({ slots, teacherId }: CalendarGridProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const days = getDaysOfWeek()
  const timeSlots = generateTimeSlots()

  const getSlotStatus = (day: string, time: string): "free" | "booked" | "blocked" => {
    const slot = slots.find((s) => s.day === day && s.startTime <= time && s.endTime > time)
    return slot?.status || "free"
  }

  const getSlotColor = (status: "free" | "booked" | "blocked") => {
    switch (status) {
      case "booked":
        return "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700"
      case "blocked":
        return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
      default:
        return "bg-background border-border hover:bg-accent"
    }
  }

  // Mobile view - show day selector
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  if (isMobile) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Availability</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const currentIndex = selectedDay ? days.indexOf(selectedDay) : 0
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : days.length - 1
                  setSelectedDay(days[prevIndex])
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[100px] text-center">{selectedDay || days[0]}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const currentIndex = selectedDay ? days.indexOf(selectedDay) : 0
                  const nextIndex = currentIndex < days.length - 1 ? currentIndex + 1 : 0
                  setSelectedDay(days[nextIndex])
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {timeSlots.map((time) => {
              const status = getSlotStatus(selectedDay || days[0], time)
              return (
                <div
                  key={time}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md border transition-colors",
                    getSlotColor(status),
                  )}
                >
                  <span className="font-medium">{formatTime(time)}</span>
                  <span className="text-sm capitalize">{status}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Desktop view - full grid
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <div className="grid grid-cols-8 gap-1 min-w-[800px]">
            {/* Header row */}
            <div className="p-2 font-medium text-center">Time</div>
            {days.map((day) => (
              <div key={day} className="p-2 font-medium text-center">
                {day.slice(0, 3)}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map((time) => (
              <div key={time} className="contents">
                <div className="p-2 text-sm text-center border-r">{formatTime(time)}</div>
                {days.map((day) => {
                  const status = getSlotStatus(day, time)
                  return (
                    <button
                      key={`${day}-${time}`}
                      className={cn(
                        "p-2 text-xs border transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                        getSlotColor(status),
                      )}
                      aria-label={`${day} ${formatTime(time)} - ${status}`}
                    >
                      <span className="sr-only">{status}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-background border border-border rounded"></div>
            <span className="text-sm">Free</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"></div>
            <span className="text-sm">Blocked</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
