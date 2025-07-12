import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function formatTime(time: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(`2000-01-01T${time}`))
}

export function generateTimeSlots(): string[] {
  const slots = []
  for (let hour = 7; hour <= 21; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`)
    if (hour < 21) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
  }
  return slots
}

export function getDaysOfWeek(): string[] {
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
}
