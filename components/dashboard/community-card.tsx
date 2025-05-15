"use client"

import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommunityCardProps {
  name: string
  members: number
  active?: boolean
}

export function CommunityCard({ name, members, active = false }: CommunityCardProps) {
  return (
    <div className={`p-3 rounded-lg ${active ? "bg-purple-500/10 border border-purple-500/30" : "bg-white/5"}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{name}</h4>
        {active && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-white/60">
          <Users className="h-3 w-3 mr-1" />
          <span>{members.toLocaleString()}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-purple-400 hover:text-purple-300 hover:bg-white/5">
          {active ? "Enter" : "Join"}
        </Button>
      </div>
    </div>
  )
}
