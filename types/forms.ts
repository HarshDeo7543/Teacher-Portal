export interface AddStudentForm {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  parentName: string
  parentPhone: string
  parentEmail: string
  subjects: string[]
  enrollmentDate: string
  emergencyContact: string
  emergencyPhone: string
  medicalInfo?: string
  notes?: string
}

export interface AddPersonForm {
  name: string
  email: string
  phone: string
  role: string
  dateOfBirth: string
  address: string
  qualifications: string[]
  experience: string
  joiningDate: string
  emergencyContact: string
  emergencyPhone: string
  salary?: number
  notes?: string
}

export interface ScheduleLessonForm {
  teacherId: string
  studentId: string
  subject: string
  date: string
  startTime: string
  endTime: string
  location: string
  lessonType: "individual" | "group"
  notes?: string
  recurringPattern?: "none" | "weekly" | "biweekly" | "monthly"
  recurringEndDate?: string
}
