"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  QrCode,
  Users,
  History,
  CreditCard,
  Smartphone,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
} from "lucide-react"
import type { UPIContact } from "@/types/upi"

interface UPIQuickActionsProps {
  onSendMoney?: () => void
  onRequestMoney?: () => void
  onScanQR?: () => void
  onShowQR?: () => void
}

/**
 * UPI Quick Actions Component
 * Provides quick access to common UPI actions and frequent contacts
 */
export function UPIQuickActions({ onSendMoney, onRequestMoney, onScanQR, onShowQR }: UPIQuickActionsProps) {
  const [frequentContacts] = useState<UPIContact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      vpa: "sarah.johnson@gpay",
      avatar: "/placeholder.svg?height=40&width=40",
      isFrequent: true,
      lastTransactionDate: "2024-01-15",
      totalTransactions: 12,
    },
    {
      id: "2",
      name: "Michael Chen",
      vpa: "michael.chen@paytm",
      avatar: "/placeholder.svg?height=40&width=40",
      isFrequent: true,
      lastTransactionDate: "2024-01-14",
      totalTransactions: 8,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      vpa: "emily.r@phonepe",
      avatar: "/placeholder.svg?height=40&width=40",
      isFrequent: true,
      lastTransactionDate: "2024-01-13",
      totalTransactions: 15,
    },
    {
      id: "4",
      name: "David Wilson",
      vpa: "david.wilson@bhim",
      avatar: "/placeholder.svg?height=40&width=40",
      isFrequent: true,
      lastTransactionDate: "2024-01-12",
      totalTransactions: 6,
    },
  ])

  const quickActions = [
    {
      title: "Send Money",
      description: "Transfer to UPI ID",
      icon: Send,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
      onClick: onSendMoney,
    },
    {
      title: "Request Money",
      description: "Ask for payment",
      icon: ArrowDownLeft,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
      onClick: onRequestMoney,
    },
    {
      title: "Scan QR",
      description: "Pay by scanning",
      icon: QrCode,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
      onClick: onScanQR,
    },
    {
      title: "Show QR",
      description: "Receive payment",
      icon: Smartphone,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-800",
      onClick: onShowQR,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center gap-3 ${action.bgColor} ${action.borderColor} border-2 hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
                onClick={action.onClick}
              >
                <div className={`p-3 rounded-full ${action.bgColor}`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frequent Contacts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Frequent Contacts
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {frequentContacts.map((contact) => (
              <Card
                key={contact.id}
                className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20"
                onClick={() => onSendMoney?.()}
              >
                <CardContent className="p-4 text-center">
                  <Avatar className="w-12 h-12 mx-auto mb-3">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-sm mb-1 truncate">{contact.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 truncate">{contact.vpa}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {contact.totalTransactions} txns
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <ArrowDownLeft className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Received from Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Piano course fee</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">+₹1,500</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Sent to Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Monthly salary</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-red-600">-₹2,800</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Added new UPI ID</p>
                  <p className="text-xs text-muted-foreground">teacher@amazonpay</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t">
            <Button variant="ghost" size="sm" className="w-full">
              <History className="h-4 w-4 mr-2" />
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
