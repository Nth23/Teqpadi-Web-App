'use client';

import { WifiOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <WifiOff className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {"You're Offline"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {"It looks like you've lost your internet connection. Please check your network settings and try again."}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="rounded-full gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </main>
  )
}
