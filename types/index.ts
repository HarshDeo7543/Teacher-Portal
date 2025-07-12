export interface Teacher {
  id: string
  name: string
  role: string
  birthdate: string
  email: string
  phone: string
  address: string
  privateQualifications: Qualification[]
  groupQualifications: Qualification[]
  avatar?: string
}

export interface Qualification {
  id: string
  skill: string
  hourlyRate: number
}

export interface TimeSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  status: "free" | "booked" | "blocked"
  teacherId: string
}

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  teacherId: string
}

export interface Lesson {
  id: string
  studentId: string
  teacherId: string
  date: string
  startTime: string
  endTime: string
  status: "scheduled" | "completed" | "cancelled"
  invoiced: boolean
}

export interface Comment {
  id: string
  teacherId: string
  content: string
  author: string
  createdAt: string
}

export interface HistoryEntry {
  id: string
  teacherId: string
  action: string
  details: string
  timestamp: string
  author: string
}
