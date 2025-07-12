"use client"

import { use } from "react"
import useSWR from "swr"
import { ProfileCards } from "@/components/teacher/profile-cards"
import { TeacherTabs } from "@/components/teacher/teacher-tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { fetchTeacher, fetchTeacherSlots, updateTeacher } from "@/lib/api"
import type { Teacher } from "@/types"

interface TeacherPageProps {
  params: Promise<{ id: string }>
}

export default function TeacherPage({ params }: TeacherPageProps) {
  const { id } = use(params)
  const { toast } = useToast()

  const {
    data: teacher,
    error: teacherError,
    isLoading: teacherLoading,
    mutate: mutateTeacher,
  } = useSWR(`teacher-${id}`, () => fetchTeacher(id))

  const {
    data: slots,
    error: slotsError,
    isLoading: slotsLoading,
  } = useSWR(`teacher-slots-${id}`, () => fetchTeacherSlots(id))

  const handleUpdateTeacher = async (data: Partial<Teacher>) => {
    try {
      const updatedTeacher = await updateTeacher(id, data)
      mutateTeacher(updatedTeacher, false)
      toast({
        title: "Success",
        description: "Teacher profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update teacher profile",
        variant: "destructive",
      })
    }
  }

  if (teacherLoading || slotsLoading) {
    return <LoadingSpinner size="lg" />
  }

  if (teacherError || slotsError) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load teacher data</p>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Teacher not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{teacher.name}</h1>
        <p className="text-muted-foreground">{teacher.role}</p>
      </div>

      <ProfileCards teacher={teacher} onUpdate={handleUpdateTeacher} />

      <TeacherTabs teacher={teacher} slots={slots || []} />
    </div>
  )
}
