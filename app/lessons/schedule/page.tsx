"use client"

import { useRouter } from "next/navigation"
import { ScheduleLessonFormComponent } from "@/components/forms/schedule-lesson-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

/**
 * Page for scheduling new lessons
 */
export default function ScheduleLessonPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/lessons")
  }

  const handleCancel = () => {
    router.push("/lessons")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/lessons">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Schedule New Lesson</h1>
          <p className="text-muted-foreground">Schedule a lesson between teacher and student</p>
        </div>
      </div>

      {/* Form */}
      <ScheduleLessonFormComponent onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  )
}
