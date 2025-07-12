import type { Teacher, TimeSlot, Student, Lesson, Comment, HistoryEntry } from "@/types"

const API_BASE = "/api"

export async function fetchTeacher(id: string): Promise<Teacher> {
  const response = await fetch(`${API_BASE}/teachers/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch teacher")
  }
  return response.json()
}

export async function updateTeacher(id: string, data: Partial<Teacher>): Promise<Teacher> {
  const response = await fetch(`${API_BASE}/teachers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update teacher")
  }
  return response.json()
}

export async function fetchTeacherSlots(teacherId: string): Promise<TimeSlot[]> {
  const response = await fetch(`${API_BASE}/teachers/${teacherId}/slots`)
  if (!response.ok) {
    throw new Error("Failed to fetch slots")
  }
  return response.json()
}

export async function updateSlot(slotId: string, data: Partial<TimeSlot>): Promise<TimeSlot> {
  const response = await fetch(`${API_BASE}/slots/${slotId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update slot")
  }
  return response.json()
}

export async function fetchTeacherStudents(teacherId: string): Promise<Student[]> {
  const response = await fetch(`${API_BASE}/teachers/${teacherId}/students`)
  if (!response.ok) {
    throw new Error("Failed to fetch students")
  }
  return response.json()
}

export async function fetchTeacherLessons(teacherId: string): Promise<Lesson[]> {
  const response = await fetch(`${API_BASE}/teachers/${teacherId}/lessons`)
  if (!response.ok) {
    throw new Error("Failed to fetch lessons")
  }
  return response.json()
}

export async function fetchTeacherComments(teacherId: string): Promise<Comment[]> {
  const response = await fetch(`${API_BASE}/teachers/${teacherId}/comments`)
  if (!response.ok) {
    throw new Error("Failed to fetch comments")
  }
  return response.json()
}

export async function fetchTeacherHistory(teacherId: string): Promise<HistoryEntry[]> {
  const response = await fetch(`${API_BASE}/teachers/${teacherId}/history`)
  if (!response.ok) {
    throw new Error("Failed to fetch history")
  }
  return response.json()
}
