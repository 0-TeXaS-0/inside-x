"use client"

import { useState } from "react"
import { Bell, Heart, MessageCircle, Users, Video, CheckCircle, Trash2, Settings, CheckCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const initialNotifications = [
  {
    id: 1,
    type: "like",
    user: "Anonymous92",
    content: "liked your video \"The Hidden Side of Modern Society\"",
    time: "2 minutes ago",
    read: false,
    category: "interactions",
  },
  {
    id: 2,
    type: "comment",
    user: "TravelBug",
    content: "commented on your video: \"This really resonated with me, thanks for sharing!\"",
    time: "15 minutes ago",
    read: false,
    category: "interactions",
  },
  {
    id: 3,
    type: "live",
    user: "MusicProducer",
    content: "started a live session \"Late Night Beats Production\"",
    time: "1 hour ago",
    read: true,
    category: "live",
  },
  {
    id: 4,
    type: "community",
    user: "Photography Group",
    content: "accepted your join request. You can now participate in discussions.",
    time: "3 hours ago",
    read: true,
    category: "social",
  },
  {
    id: 5,
    type: "like",
    user: "HiddenGem",
    content: "liked your comment on \"The Untold Effects of Social Media\"",
    time: "5 hours ago",
    read: true,
    category: "interactions",
  },
  {
    id: 6,
    type: "comment",
    user: "CreativeMinds",
    content: "replied to your comment: \"I've been trying to express this for years!\"",
    time: "8 hours ago",
    read: false,
    category: "interactions",
  },
  {
    id: 7,
    type: "community",
    user: "Tech Innovators",
    content: "posted a new community event: \"Virtual Reality Showcase\"",
    time: "1 day ago",
    read: true,
    category: "social",
  },
  {
    id: 8,
    type: "live",
    user: "AnonymousStoryTeller",
    content: "is going live in 30 minutes: \"Personal Stories from the Pandemic\"",
    time: "1 day ago",
    read: false,
    category: "live",
  },
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
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

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(n => !n.read)
      case "interactions":
        return notifications.filter(n => n.category === "interactions")
      case "live":
        return notifications.filter(n => n.category === "live")
      case "social":
        return notifications.filter(n => n.category === "social")
      default:
        return notifications
    }
  }

  return (
    <div className="h-full flex flex-col">
      {isSettingsOpen ? (
        // Notification Settings
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-xl font-bold">Notification Settings</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(false)}>
              <CheckCircle className="h-5 w-5 mr-1" />
              Done
            </Button>
          </div>
          <Separator className="bg-white/10" />
          <ScrollArea className="flex-1">
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="flex flex-col">
                      <span>Push Notifications</span>
                      <span className="text-xs text-white/60">Receive notifications on your device</span>
                    </Label>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="flex flex-col">
                      <span>Email Digest</span>
                      <span className="text-xs text-white/60">Receive a daily summary via email</span>
                    </Label>
                    <Switch id="email-notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-notifications" className="flex flex-col">
                      <span>Notification Sounds</span>
                      <span className="text-xs text-white/60">Play sounds for new notifications</span>
                    </Label>
                    <Switch id="sound-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <Label htmlFor="like-notifications">Likes and Reactions</Label>
                    </div>
                    <Switch id="like-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="comment-notifications">Comments and Replies</Label>
                    </div>
                    <Switch id="comment-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-green-500" />
                      <Label htmlFor="live-notifications">Live Sessions</Label>
                    </div>
                    <Switch id="live-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <Label htmlFor="community-notifications">Community Activity</Label>
                    </div>
                    <Switch id="community-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous-notifications" className="flex flex-col">
                      <span>Anonymous Notifications</span>
                      <span className="text-xs text-white/60">Hide sender details in notifications</span>
                    </Label>
                    <Switch id="anonymous-notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sensitive-content" className="flex flex-col">
                      <span>Filter Sensitive Content</span>
                      <span className="text-xs text-white/60">Hide potentially sensitive content</span>
                    </Label>
                    <Switch id="sensitive-content" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/10" />
              
              <Button variant="destructive" size="sm" className="w-full">
                Reset to Default Settings
              </Button>
            </div>
          </ScrollArea>
        </div>
      ) : (
        // Notifications List
        <>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Notifications</h2>
              {unreadCount > 0 && (
                <Badge className="bg-purple-500">{unreadCount}</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800/50 w-full justify-start">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
          </Tabs>
          <Separator className="bg-white/10 mt-4" />
          <ScrollArea className="flex-1">
            <div className="py-4 space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <div
                    key={notification.id}
                    className={`group flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-white/5 ${
                      notification.read ? "bg-transparent" : "bg-purple-500/10"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs">
                        {notification.user.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0" onClick={() => markAsRead(notification.id)}>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{notification.user}</p>
                        {getIcon(notification.type)}
                      </div>
                      <p className="text-white/80 text-sm">{notification.content}</p>
                      <p className="text-white/40 text-xs mt-1">{notification.time}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-white/60 hover:text-white hover:bg-white/10"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-white/60 hover:text-red-400 hover:bg-white/10"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-purple-500 mt-1"></div>}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-white/20 mb-4" />
                  <p className="text-white/60 mb-1">No notifications to display</p>
                  <p className="text-white/40 text-sm">
                    {activeTab === "all" 
                      ? "You're all caught up!" 
                      : `No ${activeTab} notifications at the moment.`}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
          {notifications.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-white/60 hover:text-red-400 hover:bg-white/5"
                onClick={clearAll}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all notifications
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
