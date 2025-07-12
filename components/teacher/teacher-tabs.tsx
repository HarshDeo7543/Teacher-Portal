"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { TeacherStudents } from "./teacher-students"
import { TeacherLessons } from "./teacher-lessons"
import { TeacherComments } from "./teacher-comments"
import { TeacherHistory } from "./teacher-history"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Teacher, TimeSlot } from "@/types"

interface TeacherTabsProps {
  teacher: Teacher
  slots: TimeSlot[]
}

const tabs = [
  { id: "availability", label: "Availability" },
  { id: "unavailabilities", label: "Unavailabilities" },
  { id: "students", label: "Students" },
  { id: "schedule", label: "Schedule" },
  { id: "invoiced-lessons", label: "Invoiced Lessons" },
  { id: "unscheduled-lessons", label: "Unscheduled Lessons" },
  { id: "time-voucher", label: "Time Voucher" },
  { id: "comments", label: "Comments" },
  { id: "history", label: "History" },
]

export function TeacherTabs({ teacher, slots }: TeacherTabsProps) {
  return (
    <Tabs defaultValue="availability" className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="text-xs lg:text-sm">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="availability" className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <CalendarGrid slots={slots} teacherId={teacher.id} />
        </Suspense>
      </TabsContent>

      <TabsContent value="unavailabilities" className="mt-6">
        <div className="text-center py-8 text-muted-foreground">Unavailabilities management coming soon</div>
      </TabsContent>

      <TabsContent value="students" className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <TeacherStudents teacherId={teacher.id} />
        </Suspense>
      </TabsContent>

      <TabsContent value="schedule" className="mt-6">
        <div className="text-center py-8 text-muted-foreground">Schedule view coming soon</div>
      </TabsContent>

      <TabsContent value="invoiced-lessons" className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <TeacherLessons teacherId={teacher.id} invoiced={true} />
        </Suspense>
      </TabsContent>

      <TabsContent value="unscheduled-lessons" className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <TeacherLessons teacherId={teacher.id} invoiced={false} />
        </Suspense>
      </TabsContent>

      <TabsContent value="time-voucher" className="mt-6">
        <div className="text-center py-8 text-muted-foreground">Time voucher management coming soon</div>
      </TabsContent>

      <TabsContent value="comments" className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <TeacherComments teacherId={teacher.id} />
        </Suspense>
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <TeacherHistory teacherId={teacher.id} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
