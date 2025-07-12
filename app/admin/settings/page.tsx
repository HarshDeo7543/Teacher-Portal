"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Settings, Database, Mail, Shield, Globe, Save, Server } from "lucide-react"

/**
 * System settings page for admin
 */
export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: "Teacher Management Portal",
    systemDescription: "Comprehensive teacher management and scheduling system",
    supportEmail: "support@teacherportal.com",
    maxUsers: "1000",
    sessionTimeout: "30",

    // Security Settings
    passwordMinLength: "8",
    requireTwoFactor: false,
    allowPasswordReset: true,
    maxLoginAttempts: "5",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@teacherportal.com",
    smtpPassword: "",
    emailFromName: "Teacher Portal",

    // Database Settings
    backupFrequency: "daily",
    retentionDays: "30",
    autoOptimize: true,

    // Feature Flags
    enableNotifications: true,
    enableReports: true,
    enableBulkImport: true,
    maintenanceMode: false,
  })

  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSaving(false)
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          System Settings
        </h1>
        <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => handleSettingChange("systemName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemDescription">Description</Label>
              <Textarea
                id="systemDescription"
                value={settings.systemDescription}
                onChange={(e) => handleSettingChange("systemDescription", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Max Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  value={settings.maxUsers}
                  onChange={(e) => handleSettingChange("maxUsers", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (min)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">Min Password Length</Label>
                <Input
                  id="passwordMinLength"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleSettingChange("passwordMinLength", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange("maxLoginAttempts", e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Force 2FA for all users</p>
              </div>
              <Switch
                checked={settings.requireTwoFactor}
                onCheckedChange={(checked) => handleSettingChange("requireTwoFactor", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Password Reset</Label>
                <p className="text-sm text-muted-foreground">Enable self-service password reset</p>
              </div>
              <Switch
                checked={settings.allowPasswordReset}
                onCheckedChange={(checked) => handleSettingChange("allowPasswordReset", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={settings.smtpHost}
                  onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleSettingChange("smtpPort", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpUsername">SMTP Username</Label>
              <Input
                id="smtpUsername"
                value={settings.smtpUsername}
                onChange={(e) => handleSettingChange("smtpUsername", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => handleSettingChange("smtpPassword", e.target.value)}
                placeholder="Enter password to change"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailFromName">From Name</Label>
              <Input
                id="emailFromName"
                value={settings.emailFromName}
                onChange={(e) => handleSettingChange("emailFromName", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <select
                  id="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="retentionDays">Retention Days</Label>
                <Input
                  id="retentionDays"
                  type="number"
                  value={settings.retentionDays}
                  onChange={(e) => handleSettingChange("retentionDays", e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Optimize</Label>
                <p className="text-sm text-muted-foreground">Automatically optimize database performance</p>
              </div>
              <Switch
                checked={settings.autoOptimize}
                onCheckedChange={(checked) => handleSettingChange("autoOptimize", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Feature Flags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable system notifications</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reports</Label>
                <p className="text-sm text-muted-foreground">Enable reporting features</p>
              </div>
              <Switch
                checked={settings.enableReports}
                onCheckedChange={(checked) => handleSettingChange("enableReports", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bulk Import</Label>
                <p className="text-sm text-muted-foreground">Enable bulk data import</p>
              </div>
              <Switch
                checked={settings.enableBulkImport}
                onCheckedChange={(checked) => handleSettingChange("enableBulkImport", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Put system in maintenance</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
