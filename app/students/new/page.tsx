"use client"

import { useRouter } from "next/navigation"
import { AddStudentForm } from "@/components/forms/add-student-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"


export default function NewStudentPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/students")
  }

  const handleCancel = () => {
    router.push("/students")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Add New Student</h1>
          <p className="text-muted-foreground">Fill in the student information to enroll them in the system</p>
        </div>
      </div>

      {/* Form */}
      <AddStudentForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  )
}
