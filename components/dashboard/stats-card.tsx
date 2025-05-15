"use client"

import { Clock, Users, Video } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function StatsCard() {
  return (
    <Card className="bg-gray-900/50 border-white/10">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-xl">IX</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">Anonymous429</h2>
            <p className="text-white/60">Premium Member</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-white/60 flex items-center justify-center gap-1">
              <Video className="h-3 w-3" />
              Sessions
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">48</div>
            <div className="text-xs text-white/60 flex items-center justify-center gap-1">
              <Users className="h-3 w-3" />
              Connections
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">5.2h</div>
            <div className="text-xs text-white/60 flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" />
              Watch Time
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Profile Completion</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2 bg-white/10" indicatorClassName="bg-purple-500" />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Sticker Collection</span>
              <span>42%</span>
            </div>
            <Progress value={42} className="h-2 bg-white/10" indicatorClassName="bg-pink-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
