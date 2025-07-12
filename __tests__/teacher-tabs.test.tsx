import { render, screen, fireEvent } from "@testing-library/react"
import { TeacherTabs } from "@/components/teacher/teacher-tabs"
import type { Teacher, TimeSlot } from "@/types"
import jest from "jest" // Import jest to declare the variable

const mockTeacher: Teacher = {
  id: "1",
  name: "John Doe",
  role: "Music Teacher",
  birthdate: "1985-01-01",
  email: "john@example.com",
  phone: "+1234567890",
  address: "123 Main St",
  privateQualifications: [],
  groupQualifications: [],
}

const mockSlots: TimeSlot[] = []

// Mock SWR
jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({
    data: [],
    error: null,
    isLoading: false,
  }),
}))

describe("TeacherTabs", () => {
  it("renders all tab triggers", () => {
    render(<TeacherTabs teacher={mockTeacher} slots={mockSlots} />)

    expect(screen.getByRole("tab", { name: /availability/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /students/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /comments/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /history/i })).toBeInTheDocument()
  })

  it("switches between tabs correctly", () => {
    render(<TeacherTabs teacher={mockTeacher} slots={mockSlots} />)

    const studentsTab = screen.getByRole("tab", { name: /students/i })
    fireEvent.click(studentsTab)

    expect(studentsTab).toHaveAttribute("data-state", "active")
  })
})
