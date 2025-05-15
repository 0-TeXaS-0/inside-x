"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface LiveSessionCardProps {
  title: string
  host: string
  time: string
  participants: number
}

export function LiveSessionCard({ title, host, time, participants }: LiveSessionCardProps) {
  return (
    <div className="w-48 flex-shrink-0">
      <div className="aspect-square bg-gray-900/50 rounded-lg overflow-hidden relative mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">LIVE</Badge>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="w-6 h-6">
          <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-pink-500">
            {host.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium truncate">{host}</p>
      </div>
      <h3 className="font-medium text-sm truncate">{title}</h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-white/60">{time}</p>
        <p className="text-xs text-white/60">{participants} joined</p>
      </div>
      <Button variant="ghost" size="sm" className="w-full mt-2 text-purple-400 hover:text-purple-300 hover:bg-white/5">
        Join Session
      </Button>
    </div>
  )
}
