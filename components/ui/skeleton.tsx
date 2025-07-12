import type React from "react"
/**
 * Skeleton component for loading states
 * Provides visual feedback while content is loading
 */
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }
