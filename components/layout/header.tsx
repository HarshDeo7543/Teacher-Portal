"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Moon, Sun, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import Link from "next/link"
import type { User as UserType } from "@/types/user"

export function Header() {
  const { setTheme, theme } = useTheme()
  const [selectedLocation, setSelectedLocation] = useState("New Delhi")
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  const locations = [
    { value: "New Delhi", label: "New Delhi", campus: "Main Campus" },
    { value: "Mumbai", label: "Mumbai", campus: "West Campus" },
    { value: "Bengaluru", label: "Bengaluru", campus: "Tech Campus" },
    { value: "Chennai", label: "Chennai", campus: "South Campus" },
    { value: "Hyderabad", label: "Hyderabad", campus: "Central Campus" },
    { value: "Kolkata", label: "Kolkata", campus: "East Campus" },
    { value: "Pune", label: "Pune", campus: "North Campus" },
    { value: "Ahmedabad", label: "Ahmedabad", campus: "West Campus" },
  ]

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
  }, [])

  const handleLogout = () => {
    logoutUser()
  }

  const selectedLocationData = locations.find((loc) => loc.value === selectedLocation)

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-background border-b min-h-[60px]">
      {/* Logo - Always visible */}
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-bold text-sm">TP</span>
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-primary truncate">
          <span className="hidden xs:inline">Teacher</span>Portal
        </h1>
      </div>

      {/* Location Dropdown - Hidden on very small screens */}
      <div className="hidden sm:flex flex-1 justify-center max-w-xs">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px] bg-transparent">
              <span className="truncate">{selectedLocation}</span>
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            <div className="px-2 py-1.5 text-xs text-muted-foreground border-b mb-1">Teaching Locations - India</div>
            {locations.map((location) => (
              <DropdownMenuItem
                key={location.value}
                onClick={() => setSelectedLocation(location.value)}
                className="cursor-pointer"
              >
                <div className="flex flex-col">
                  <span>{location.label}</span>
                  <span className="text-xs text-muted-foreground">{location.campus}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User Menu */}
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        {/* Current User Display */}
        {currentUser && (
          <div className="hidden md:flex items-center space-x-2 mr-2">
            <div className="text-right">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar || "/placeholder.svg?height=40&width=40"}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {currentUser && (
              <>
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
