import { render, screen } from "@testing-library/react"
import { ProfileCards } from "@/components/teacher/profile-cards"
import type { Teacher } from "@/types"

const mockTeacher: Teacher = {
  id: "1",
  name: "John Doe",
  role: "Music Teacher",
  birthdate: "1985-01-01",
  email: "john@example.com",
  phone: "+1234567890",
  address: "123 Main St",
  privateQualifications: [{ id: "1", skill: "Piano", hourlyRate: 50 }],
  groupQualifications: [{ id: "2", skill: "Theory", hourlyRate: 30 }],
}

describe("ProfileCards", () => {
  it("renders teacher information correctly", () => {
    render(<ProfileCards teacher={mockTeacher} onUpdate={() => {}} />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Music Teacher")).toBeInTheDocument()
    expect(screen.getByText("john@example.com")).toBeInTheDocument()
    expect(screen.getByText("+1234567890")).toBeInTheDocument()
    expect(screen.getByText("123 Main St")).toBeInTheDocument()
  })

  it("displays qualifications with rates", () => {
    render(<ProfileCards teacher={mockTeacher} onUpdate={() => {}} />)

    expect(screen.getByText("Piano")).toBeInTheDocument()
    expect(screen.getByText("$50.00/hr")).toBeInTheDocument()
    expect(screen.getByText("Theory")).toBeInTheDocument()
    expect(screen.getByText("$30.00/hr")).toBeInTheDocument()
  })
})
