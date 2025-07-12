import type { User } from "@/types/user"

// Mock current user - in real app, this would come from authentication service
const mockCurrentUser: User = {
  id: "admin-1",
  name: "Harsh Deo",
  email: "harsh.deo@teacherportal.in",
  phone: "+91 98765 00001",
  role: "admin",
  status: "active",
  campus: "New Delhi Main Campus",
  avatar: "/placeholder.svg?height=40&width=40",
  createdAt: "2023-01-01T00:00:00Z",
  lastLogin: new Date().toISOString(),
}

export function getCurrentUser(): User | null {
  // In real app, get from localStorage, session, or API
  return mockCurrentUser
}

export function logoutUser(): void {
  // In real app, clear session, localStorage, and redirect
  console.log("User logged out")
  // For demo purposes, we'll just log
  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
