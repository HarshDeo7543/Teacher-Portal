"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { QrCode, Download, Copy, CheckCircle } from "lucide-react"
import { z } from "zod"
import { formatAmount } from "@/lib/upi-validation"

const qrGeneratorSchema = z.object({
  vpa: z.string().min(1, "UPI ID is required"),
  amount: z.number().optional(),
  description: z.string().optional(),
  includeAmount: z.boolean(),
})

type QRGeneratorFormData = z.infer<typeof qrGeneratorSchema>

interface UPIQRGeneratorProps {
  defaultVPA?: string
  onClose?: () => void
}

/**
 * UPI QR Code Generator Component
 * Generates QR codes for receiving UPI payments
 */
export function UPIQRGenerator({ defaultVPA = "teacher@paytm", onClose }: UPIQRGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QRGeneratorFormData>({
    resolver: zodResolver(qrGeneratorSchema),
    defaultValues: {
      vpa: defaultVPA,
      amount: undefined,
      description: "",
      includeAmount: false,
    },
  })

  const watchedValues = watch()

  /**
   * Generate QR code
   */
  const onSubmit = async (data: QRGeneratorFormData) => {
    setIsGenerating(true)

    try {
      // Simulate QR generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate mock QR code data URL
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = 200
      canvas.height = 200

      if (ctx) {
        // Create a simple QR-like pattern
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, 200, 200)
        ctx.fillStyle = "#FFFFFF"

        // Create QR pattern
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 20; j++) {
            if ((i + j) % 3 === 0) {
              ctx.fillRect(i * 10, j * 10, 10, 10)
            }
          }
        }
      }

      setQrCode(canvas.toDataURL())
      toast({
        title: "QR Code Generated!",
        description: "Your payment QR code is ready to use.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  /**
   * Copy QR code data
   */
  const handleCopy = async () => {
    if (!qrCode) return

    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      setCopied(true)
      toast({
        title: "Copied!",
        description: "QR code copied to clipboard.",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy QR code.",
        variant: "destructive",
      })
    }
  }

  /**
   * Download QR code
   */
  const handleDownload = () => {
    if (!qrCode) return

    const link = document.createElement("a")
    link.download = `upi-qr-${watchedValues.vpa.replace("@", "-")}.png`
    link.href = qrCode
    link.click()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Generate QR Code
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!qrCode ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* UPI ID */}
            <div className="space-y-2">
              <Label htmlFor="vpa">Your UPI ID</Label>
              <Input id="vpa" placeholder="your@upi" {...register("vpa")} disabled={isGenerating} />
              {errors.vpa && <p className="text-sm text-red-600">{errors.vpa.message}</p>}
            </div>

            {/* Include Amount Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="includeAmount">Include specific amount</Label>
              <Switch id="includeAmount" {...register("includeAmount")} disabled={isGenerating} />
            </div>

            {/* Amount (conditional) */}
            {watchedValues.includeAmount && (
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="0.00"
                  {...register("amount", { valueAsNumber: true })}
                  disabled={isGenerating}
                />
                {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Payment for..."
                rows={2}
                {...register("description")}
                disabled={isGenerating}
              />
            </div>

            {/* Preview */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <h4 className="font-medium text-sm">QR Code Preview:</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="text-muted-foreground">UPI ID:</span> {watchedValues.vpa}
                </div>
                {watchedValues.includeAmount && watchedValues.amount && (
                  <div>
                    <span className="text-muted-foreground">Amount:</span> {formatAmount(watchedValues.amount)}
                  </div>
                )}
                {watchedValues.description && (
                  <div>
                    <span className="text-muted-foreground">Description:</span> {watchedValues.description}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isGenerating} className="flex-1">
                {isGenerating && <LoadingSpinner className="w-4 h-4 mr-2" />}
                Generate QR
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            {/* QR Code Display */}
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-muted-foreground/20 mx-auto w-fit">
              <img src={qrCode || "/placeholder.svg"} alt="UPI QR Code" className="w-48 h-48 mx-auto" />
            </div>

            {/* QR Details */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-left">
              <h4 className="font-medium text-sm">QR Code Details:</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="text-muted-foreground">UPI ID:</span> {watchedValues.vpa}
                </div>
                {watchedValues.includeAmount && watchedValues.amount && (
                  <div>
                    <span className="text-muted-foreground">Amount:</span> {formatAmount(watchedValues.amount)}
                  </div>
                )}
                {watchedValues.description && (
                  <div>
                    <span className="text-muted-foreground">Description:</span> {watchedValues.description}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleCopy} disabled={copied}>
                {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setQrCode(null)} className="flex-1">
                Generate New
              </Button>
              <Button onClick={onClose} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
