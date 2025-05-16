"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Search, Phone, Video, PlusCircle, Send, Info, MoreVertical, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { FloatingNav } from "@/components/ui/floating-nav"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { use } from "react"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "AJ",
    lastMessage: "When are you free for a video call?",
    time: "12:45 PM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "SW",
    lastMessage: "I loved your latest video! The editing was amazing.",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Photography Group",
    avatar: "PG",
    lastMessage: "Michael: Check out my new camera setup!",
    time: "Yesterday",
    unread: 5,
    online: false,
    isGroup: true,
    members: 8,
  },
  {
    id: 4,
    name: "David Lee",
    avatar: "DL",
    lastMessage: "Let's collaborate on the next community event.",
    time: "Sunday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Tech Innovators",
    avatar: "TI",
    lastMessage: "Jamie: Has anyone tried the new AR feature?",
    time: "Last week",
    unread: 0,
    online: false,
    isGroup: true,
    members: 12,
  },
]

// Mock messages for the selected conversation
const messages = [
  {
    id: 1,
    sender: "Alex Johnson",
    avatar: "AJ",
    content: "Hey there! How's your day going?",
    time: "12:30 PM",
    isMine: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Pretty good! Just finished editing my latest video.",
    time: "12:32 PM",
    isMine: true,
  },
  {
    id: 3,
    sender: "Alex Johnson",
    avatar: "AJ",
    content: "That's awesome! Can't wait to see it. When do you plan to upload it?",
    time: "12:35 PM",
    isMine: false,
  },
  {
    id: 4,
    sender: "Me",
    content: "Probably tomorrow evening. Still working on the final touches.",
    time: "12:38 PM",
    isMine: true,
  },
  {
    id: 5,
    sender: "Alex Johnson",
    avatar: "AJ",
    content: "Cool! Is it for your regular channel or the Inside X platform?",
    time: "12:40 PM",
    isMine: false,
  },
  {
    id: 6,
    sender: "Me",
    content: "It's exclusively for Inside X. I'm trying out the new anonymity features.",
    time: "12:42 PM",
    isMine: true,
  },
  {
    id: 7,
    sender: "Alex Johnson",
    avatar: "AJ",
    content: "When are you free for a video call? We could brainstorm some ideas for future collaborations.",
    time: "12:45 PM",
    isMine: false,
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [currentMessages, setCurrentMessages] = useState(messages)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return

    const newMessage = {
      id: currentMessages.length + 1,
      sender: "Me",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    }

    setCurrentMessages([...currentMessages, newMessage])
    setMessageInput("")

    // Auto-scroll to bottom
    setTimeout(() => {
      const messageContainer = document.getElementById("message-container")
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight
      }
    }, 100)
  }

  const filteredConversations = conversations.filter(convo => 
    convo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <AnimatedBackgroundContainer
      particleCount={40}
      connectionDistance={100}
      colorScheme="purple"
      density={0.5}
      className="min-h-screen bg-black"
    >
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen text-white"
      >
        {/* Header */}
        <header
          className={`sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
            isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/50 backdrop-blur-sm"
          }`}
        >
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-xl font-bold">Messages</h1>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <PlusCircle className="h-5 w-5" />
                      <span className="sr-only">New Message</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Message</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
            {/* Conversations sidebar */}
            <div className="md:col-span-1 bg-gray-900/30 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    type="search"
                    placeholder="Search conversations..."
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="all" className="w-full mb-4">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="px-2">
                  {filteredConversations.map((convo) => (
                    <div
                      key={convo.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                        activeConversation.id === convo.id
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      }`}
                      onClick={() => setActiveConversation(convo)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                            {convo.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {convo.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">
                            {convo.name}
                            {convo.isGroup && (
                              <span className="ml-2 text-xs text-white/60">{convo.members}</span>
                            )}
                          </p>
                          <p className="text-xs text-white/60 whitespace-nowrap ml-2">{convo.time}</p>
                        </div>
                        <p className="text-sm text-white/60 truncate">{convo.lastMessage}</p>
                      </div>
                      {convo.unread > 0 && (
                        <Badge className="bg-purple-500 text-white ml-auto">{convo.unread}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat area */}
            <div className="md:col-span-2 bg-gray-900/30 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col">
              {/* Chat header */}
              <div className="border-b border-white/10 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                        {activeConversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-medium text-white">
                        {activeConversation.name}
                        {activeConversation.isGroup && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            <Users className="h-3 w-3 mr-1" /> {activeConversation.members}
                          </Badge>
                        )}
                      </h2>
                      <p className="text-xs text-white/60">
                        {activeConversation.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                            <Phone className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Voice Call</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                            <Video className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Video Call</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                            <Info className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Info</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              {/* Messages container */}
              <ScrollArea className="flex-1 p-4" id="message-container">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.isMine
                            ? "bg-purple-500/80 rounded-tl-xl rounded-tr-sm rounded-bl-xl"
                            : "bg-gray-800/80 rounded-tr-xl rounded-tl-sm rounded-br-xl"
                        } p-3 shadow-md`}
                      >
                        <div className="flex items-start gap-2">
                          {!message.isMine && (
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                                {message.avatar}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="text-sm mb-1">{message.content}</p>
                            <p className="text-xs text-white/60 text-right">{message.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    className="bg-white/5 border-white/10 text-white"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FloatingNav activeItem="messages" />
      </motion.div>
    </AnimatedBackgroundContainer>
  )
}
