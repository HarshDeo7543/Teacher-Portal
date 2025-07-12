"use client"

import { useRouter } from "next/navigation"
import { CreateUserForm } from "@/components/forms/create-user-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

/**
 * Page for creating new users
 */
export default function NewUserPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/admin/users")
  }

  const handleCancel = () => {
    router.push("/admin/users")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Create New User</h1>
          <p className="text-muted-foreground">Add a new user account to the system</p>
        </div>
      </div>

      {/* Form */}
      <CreateUserForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  )
}
