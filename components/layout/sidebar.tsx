"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  UserCog,
  Clock,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  Smartphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

/**
 * Main application sidebar with navigation
 * Enhanced with UPI payments section
 */
export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "People",
      href: "/people",
      icon: Users,
    },
    {
      name: "Students",
      href: "/students",
      icon: GraduationCap,
    },
    {
      name: "Lessons",
      href: "/lessons",
      icon: BookOpen,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
    {
      name: "Payments",
      href: "/payments",
      icon: CreditCard,
    },
    {
      name: "UPI Payments",
      href: "/upi",
      icon: Smartphone,
    },
    {
      name: "Setup",
      href: "/setup",
      icon: Settings,
    },
    {
      name: "Timeline",
      href: "/timeline",
      icon: Clock,
    },
  ]

  const adminNavigation = [
    {
      name: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Role Permissions",
      href: "/admin/roles",
      icon: UserCog,
    },
    {
      name: "User Activity Logs",
      href: "/admin/activity",
      icon: BarChart3,
    },
    {
      name: "System Settings",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      name: "Server Monitoring",
      href: "/admin/monitoring",
      icon: BarChart3,
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">New Delhi</h2>
              <p className="text-xs text-muted-foreground">Teacher Portal</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed && "px-2",
                    isActive && "bg-secondary text-secondary-foreground",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            )
          })}

          {/* Admin Section */}
          <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "px-2")}>
                <UserCog className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && (
                  <>
                    <span>Admin</span>
                    <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", adminOpen && "rotate-180")} />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="space-y-1 ml-4">
                {adminNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button variant={isActive ? "secondary" : "ghost"} size="sm" className="w-full justify-start">
                        <item.icon className="h-3 w-3 mr-2" />
                        <span className="text-sm">{item.name}</span>
                      </Button>
                    </Link>
                  )
                })}
              </CollapsibleContent>
            )}
          </Collapsible>
        </nav>
      </ScrollArea>
    </div>
  )
}
