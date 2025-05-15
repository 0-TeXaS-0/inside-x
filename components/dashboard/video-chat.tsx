"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MessageSquare,
  Users,
  Settings,
  X,
  Maximize2,
  Minimize2,
  MoreVertical,
  Share,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const participants = [
  { id: 1, name: "Anonymous429", avatar: null, isSpeaking: true },
  { id: 2, name: "HiddenGem", avatar: null, isSpeaking: false },
  { id: 3, name: "MusicProducer92", avatar: null, isSpeaking: false },
  { id: 4, name: "TravelBug", avatar: null, isSpeaking: false },
]

const messages = [
  { id: 1, sender: "Anonymous429", content: "Hey everyone! Welcome to the chat.", time: "2:30 PM" },
  { id: 2, sender: "HiddenGem", content: "Thanks for having us!", time: "2:31 PM" },
  {
    id: 3,
    sender: "MusicProducer92",
    content: "I'm excited to share some of my new tracks with you all.",
    time: "2:33 PM",
  },
  { id: 4, sender: "TravelBug", content: "Can't wait to hear them!", time: "2:34 PM" },
]

export function VideoChat({ onClose }) {
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [participantsOpen, setParticipantsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [localMessages, setLocalMessages] = useState(messages)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Simulate getting local video stream
    if (videoRef.current && videoEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: micEnabled })
        .then((stream) => {
          videoRef.current.srcObject = stream
        })
        .catch((err) => {
          console.error("Error accessing media devices:", err)
        })
    }

    return () => {
      // Clean up video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [videoEnabled, micEnabled])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: localMessages.length + 1,
        sender: "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setLocalMessages([...localMessages, message])
      setNewMessage("")
    }
  }

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col" style={{ zIndex: 9999 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center p-4 border-b border-white/10 bg-black/80 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
          <h2 className="font-bold">Anonymous Video Chat</h2>
          <Badge variant="outline" className="bg-white/5">
            {participants.length} Participants
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-white/10">
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Share className="h-4 w-4 mr-2" />
                Share Room Link
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <div className="grid grid-cols-2 gap-4 p-4 h-full">
            {participants.map((participant, index) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative rounded-lg overflow-hidden bg-gray-900 ${
                  participant.id === 1 ? "col-span-2 row-span-2" : ""
                }`}
              >
                {participant.id === 1 ? (
                  videoEnabled ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                      <Avatar className="w-24 h-24">
                        <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500">
                          {participant.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500">
                        {participant.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{participant.name}</span>
                      {participant.isSpeaking && (
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      )}
                    </div>
                    {participant.id === 1 && (
                      <Badge variant="outline" className="bg-white/10">
                        You
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {(chatOpen || participantsOpen) && (
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-80 border-l border-white/10 bg-black/80 backdrop-blur-md"
            >
              <Tabs defaultValue={chatOpen ? "chat" : "participants"}>
                <TabsList className="w-full bg-black/50">
                  <TabsTrigger
                    value="chat"
                    className="flex-1"
                    onClick={() => {
                      setChatOpen(true)
                      setParticipantsOpen(false)
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="participants"
                    className="flex-1"
                    onClick={() => {
                      setParticipantsOpen(true)
                      setChatOpen(false)
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Participants
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="h-[calc(100vh-8rem)] flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {localMessages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                              {message.sender.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{message.sender}</span>
                              <span className="text-xs text-white/40">{message.time}</span>
                            </div>
                            <p className="text-white/80 text-sm mt-1">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-white/10">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="participants" className="h-[calc(100vh-8rem)]">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                                {participant.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{participant.name}</span>
                                {participant.id === 1 && (
                                  <Badge variant="outline" className="text-xs bg-white/10">
                                    You
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                {participant.isSpeaking ? (
                                  <Badge className="bg-green-500 text-xs">Speaking</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs bg-white/10">
                                    Listening
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 border-t border-white/10 bg-black/80 backdrop-blur-md"
      >
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${micEnabled ? "bg-white/10" : "bg-red-500/20 border-red-500/50"}`}
            onClick={() => setMicEnabled(!micEnabled)}
          >
            {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${videoEnabled ? "bg-white/10" : "bg-red-500/20 border-red-500/50"}`}
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${chatOpen ? "bg-purple-500/20 border-purple-500/50" : "bg-white/10"}`}
            onClick={() => {
              setChatOpen(!chatOpen)
              setParticipantsOpen(false)
            }}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${
              participantsOpen ? "bg-purple-500/20 border-purple-500/50" : "bg-white/10"
            }`}
            onClick={() => {
              setParticipantsOpen(!participantsOpen)
              setChatOpen(false)
            }}
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600"
            onClick={onClose}
          >
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
