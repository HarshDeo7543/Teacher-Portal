"use client"

import { useRouter } from "next/navigation"
import { AddPersonFormComponent } from "@/components/forms/add-person-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

/**
 * Page for adding new people (teachers/staff)
 */
export default function NewPersonPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/people")
  }

  const handleCancel = () => {
    router.push("/people")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/people">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Add New Person</h1>
          <p className="text-muted-foreground">Fill in the person information to add them to the system</p>
        </div>
      </div>

      {/* Form */}
      <AddPersonFormComponent onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  )
}
