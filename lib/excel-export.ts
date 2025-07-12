/**
 * Excel export utilities for generating dummy reports
 * In a real application, this would use libraries like xlsx or exceljs
 */

export interface ExcelReportData {
  teachers: any[]
  students: any[]
  lessons: any[]
  payments: any[]
  summary: any
}

/**
 * Generate dummy Excel data for reports
 */
export function generateDummyReportData(): ExcelReportData {
  return {
    teachers: [
      {
        "Teacher ID": "T001",
        Name: "Priya Sharma",
        Subject: "Mathematics",
        Students: 25,
        "Hours/Week": 30,
        Salary: "₹45,000",
        Rating: 4.8,
        Campus: "Toronto Main",
      },
      {
        "Teacher ID": "T002",
        Name: "Rajesh Kumar",
        Subject: "Physics",
        Students: 20,
        "Hours/Week": 25,
        Salary: "₹42,000",
        Rating: 4.6,
        Campus: "Toronto Main",
      },
      {
        "Teacher ID": "T003",
        Name: "Anita Patel",
        Subject: "Chemistry",
        Students: 22,
        "Hours/Week": 28,
        Salary: "₹44,000",
        Rating: 4.9,
        Campus: "Toronto Main",
      },
    ],
    students: [
      {
        "Student ID": "S001",
        Name: "Arjun Mehta",
        Grade: "Class 12",
        Subjects: "Math, Physics",
        Teacher: "Priya Sharma",
        "Fees Paid": "₹15,000",
        Attendance: "95%",
        Performance: "Excellent",
      },
      {
        "Student ID": "S002",
        Name: "Kavya Singh",
        Grade: "Class 11",
        Subjects: "Chemistry, Biology",
        Teacher: "Anita Patel",
        "Fees Paid": "₹14,000",
        Attendance: "92%",
        Performance: "Good",
      },
    ],
    lessons: [
      {
        "Lesson ID": "L001",
        Date: "2024-01-20",
        Time: "09:00-10:00",
        Teacher: "Priya Sharma",
        Student: "Arjun Mehta",
        Subject: "Mathematics",
        Status: "Completed",
        Rating: 5,
      },
      {
        "Lesson ID": "L002",
        Date: "2024-01-20",
        Time: "14:00-15:00",
        Teacher: "Rajesh Kumar",
        Student: "Kavya Singh",
        Subject: "Physics",
        Status: "Scheduled",
        Rating: "-",
      },
    ],
    payments: [
      {
        "Payment ID": "P001",
        Date: "2024-01-15",
        Student: "Arjun Mehta",
        Amount: "₹15,000",
        Type: "Course Fee",
        Status: "Completed",
        Method: "UPI",
      },
      {
        "Payment ID": "P002",
        Date: "2024-01-10",
        Teacher: "Priya Sharma",
        Amount: "₹45,000",
        Type: "Salary",
        Status: "Completed",
        Method: "Bank Transfer",
      },
    ],
    summary: {
      "Total Teachers": 15,
      "Total Students": 156,
      "Total Revenue": "₹8,45,230",
      "Completed Lessons": 342,
      "Pending Payments": 5,
      "Average Rating": 4.7,
      "Campus Utilization": "87%",
      "Generated On": new Date().toLocaleDateString("en-IN"),
    },
  }
}

/**
 * Convert data to CSV format for download
 */
function convertToCSV(data: any[]): string {
  if (data.length === 0) return ""

  const headers = Object.keys(data[0])
  const csvRows = []

  // Add headers
  csvRows.push(headers.join(","))

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header]
      return typeof value === "string" ? `"${value}"` : value
    })
    csvRows.push(values.join(","))
  }

  return csvRows.join("\n")
}

/**
 * Download CSV content as file
 */
function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

/**
 * Export complete report as multiple CSV files in a zip
 * For demo purposes, we'll export individual CSV files
 */
export function exportCompleteReport(): void {
  const data = generateDummyReportData()
  const timestamp = new Date().toISOString().split("T")[0]

  // Export each section as separate CSV
  downloadCSV(convertToCSV(data.teachers), `teachers-report-${timestamp}`)
  downloadCSV(convertToCSV(data.students), `students-report-${timestamp}`)
  downloadCSV(convertToCSV(data.lessons), `lessons-report-${timestamp}`)
  downloadCSV(convertToCSV(data.payments), `payments-report-${timestamp}`)
  downloadCSV(convertToCSV([data.summary]), `summary-report-${timestamp}`)
}

// Mock Excel export functionality
export async function exportToExcel(data: any[], filename: string): Promise<void> {
  // In a real application, you would use a library like xlsx or exceljs
  // For now, we'll create a CSV file as a demonstration

  const csvContent = convertToCSV(data)
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Mock report data for export
export const mockReportData = [
  {
    id: 1,
    teacherName: "Priya Sharma",
    studentName: "Arjun Mehta",
    subject: "Mathematics",
    date: "2024-01-15",
    duration: "60 minutes",
    status: "Completed",
    campus: "New Delhi Main Campus",
  },
  {
    id: 2,
    teacherName: "Rajesh Kumar",
    studentName: "Kavya Singh",
    subject: "Physics",
    date: "2024-01-16",
    duration: "90 minutes",
    status: "Completed",
    campus: "Mumbai West Campus",
  },
  {
    id: 3,
    teacherName: "Anita Patel",
    studentName: "Rohit Sharma",
    subject: "Chemistry",
    date: "2024-01-17",
    duration: "75 minutes",
    status: "Scheduled",
    campus: "Bengaluru Tech Campus",
  },
  {
    id: 4,
    teacherName: "Vikram Singh",
    studentName: "Priya Patel",
    subject: "English Literature",
    date: "2024-01-18",
    duration: "60 minutes",
    status: "Completed",
    campus: "Chennai South Campus",
  },
  {
    id: 5,
    teacherName: "Meera Gupta",
    studentName: "Amit Kumar",
    subject: "Biology",
    date: "2024-01-19",
    duration: "90 minutes",
    status: "Scheduled",
    campus: "Hyderabad Central Campus",
  },
]
