"use client"

import { Bell, Heart, MessageCircle, Users, Video } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Anonymous92",
    content: "liked your video",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: "TravelBug",
    content: "commented on your video",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "live",
    user: "MusicProducer",
    content: "started a live session",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "community",
    user: "Photography Group",
    content: "accepted your join request",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "like",
    user: "HiddenGem",
    content: "liked your comment",
    time: "5 hours ago",
    read: true,
  },
]

export function NotificationsPanel() {
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "live":
        return <Video className="h-4 w-4 text-green-500" />
      case "community":
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="py-4">
        <h2 className="text-xl font-bold">Notifications</h2>
      </div>
      <Separator className="bg-white/10" />
      <ScrollArea className="flex-1">
        <div className="py-4 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                notification.read ? "bg-transparent" : "bg-purple-500/10"
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs">
                  {notification.user.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{notification.user}</p>
                  {getIcon(notification.type)}
                </div>
                <p className="text-white/60 text-sm">{notification.content}</p>
                <p className="text-white/40 text-xs mt-1">{notification.time}</p>
              </div>
              {!notification.read && <div className="w-2 h-2 rounded-full bg-purple-500 mt-1"></div>}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
