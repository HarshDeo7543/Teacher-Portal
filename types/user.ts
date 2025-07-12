export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "teacher" | "staff"
  status: "active" | "inactive"
  campus: string
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  phone: string
  role: "admin" | "teacher" | "staff"
  campus: string
  password: string
}

export interface UpdateProfileRequest {
  name: string
  email: string
  phone: string
  avatar?: string
}
