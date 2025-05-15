"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, Settings, Users, Video, Sparkles, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { VideoCard } from "@/components/dashboard/video-card"
import { LiveSessionCard } from "@/components/dashboard/live-session-card"
import { CommunityCard } from "@/components/dashboard/community-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { StickerPack } from "@/components/dashboard/sticker-pack"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
import { VideoChat } from "@/components/dashboard/video-chat"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { GlowCard } from "@/components/ui/glow-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingNav } from "@/components/ui/floating-nav"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [videoChatOpen, setVideoChatOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <AnimatedBackgroundContainer
      particleCount={60}
      connectionDistance={120}
      colorScheme="purple"
      density={0.7}
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
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">IX</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold hidden md:block">Inside X</h1>
            </div>

            <div className="hidden md:flex items-center max-w-md w-full mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search topics, users, or communities..."
                  className="pl-10 bg-white/5 border-white/10 text-white w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AnimatedButton
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                onClick={() => setVideoChatOpen(true)}
                glowColor="rgba(147, 51, 234, 0.5)"
              >
                <Video className="h-4 w-4" />
                Start Video Chat
              </AnimatedButton>

              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 border-white/10">
                  <NotificationsPanel />
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 border-white/10">
                  <h2 className="text-xl font-bold mb-4">Settings</h2>
                  {/* Settings content would go here */}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - Stats & Communities */}
          <aside className="hidden md:block">
            <GlowCard glowColor="rgba(147, 51, 234, 0.5)">
              <StatsCard />
            </GlowCard>

            <GlowCard className="mt-6" glowColor="rgba(219, 39, 119, 0.5)">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Your Communities</h3>
                <div className="space-y-4">
                  <CommunityCard name="Photography Enthusiasts" members={1243} active={true} />
                  <CommunityCard name="Music Producers" members={876} />
                  <CommunityCard name="Travel Stories" members={2156} />
                  <AnimatedButton
                    variant="ghost"
                    className="w-full text-purple-400 hover:text-purple-300"
                    glowColor="rgba(147, 51, 234, 0.3)"
                  >
                    View All Communities
                  </AnimatedButton>
                </div>
              </CardContent>
            </GlowCard>

            <GlowCard className="mt-6" glowColor="rgba(139, 92, 246, 0.5)">
              <StickerPack />
            </GlowCard>
          </aside>

          {/* Main Feed */}
          <div className="md:col-span-2">
            <Tabs defaultValue="feed" onValueChange={setActiveTab}>
              <TabsList className="bg-gray-900/50 w-full">
                <TabsTrigger value="feed" className="flex-1">
                  Feed
                </TabsTrigger>
                <TabsTrigger value="live" className="flex-1">
                  Live
                </TabsTrigger>
                <TabsTrigger value="discover" className="flex-1">
                  Discover
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {activeTab === "feed" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4">Upcoming Live Sessions</h2>
                        <ScrollArea className="w-full whitespace-nowrap pb-4">
                          <div className="flex space-x-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <LiveSessionCard
                                key={i}
                                title={`Live Session ${i + 1}`}
                                host={`User${i + 100}`}
                                time={`${i + 1}:00 PM`}
                                participants={Math.floor(Math.random() * 100) + 10}
                              />
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      <Separator className="my-6 bg-white/10" />

                      <div className="space-y-6">
                        <VideoCard
                          title="My first anonymous video!"
                          username="Anonymous429"
                          tags={["Intro", "FirstTime"]}
                          likes={124}
                          comments={32}
                          isLive={false}
                        />

                        <VideoCard
                          title="Live from my studio session"
                          username="MusicProducer92"
                          tags={["Music", "Studio"]}
                          likes={287}
                          comments={56}
                          isLive={true}
                          viewers={42}
                        />

                        <VideoCard
                          title="Travel memories from last summer"
                          username="Wanderlust23"
                          tags={["Travel", "Summer"]}
                          likes={432}
                          comments={87}
                          isLive={false}
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "live" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <VideoCard
                            key={i}
                            title={`Live Stream ${i + 1}`}
                            username={`User${i + 200}`}
                            tags={["Live", i % 2 === 0 ? "Music" : "Art"]}
                            likes={Math.floor(Math.random() * 500)}
                            comments={Math.floor(Math.random() * 100)}
                            isLive={true}
                            viewers={Math.floor(Math.random() * 100) + 10}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "discover" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
                        <div className="flex flex-wrap gap-2">
                          {["Photography", "Music", "Travel", "Gaming", "Art", "Cooking", "Technology", "Fashion"].map(
                            (topic, i) => (
                              <Badge key={i} variant="outline" className="bg-white/5 hover:bg-white/10 cursor-pointer">
                                #{topic}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>

                      <Separator className="my-6 bg-white/10" />

                      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <VideoCard
                            key={i}
                            title={`Discover Video ${i + 1}`}
                            username={`User${i + 300}`}
                            tags={[i % 3 === 0 ? "Photography" : i % 3 === 1 ? "Music" : "Art"]}
                            likes={Math.floor(Math.random() * 500)}
                            comments={Math.floor(Math.random() * 100)}
                            isLive={i % 4 === 0}
                            viewers={i % 4 === 0 ? Math.floor(Math.random() * 100) + 10 : undefined}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Tabs>
          </div>
        </main>

        {/* Floating Navigation */}
        <FloatingNav activeItem={activeTab} />

        {/* Video Chat Modal */}
        <AnimatePresence>{videoChatOpen && <VideoChat onClose={() => setVideoChatOpen(false)} />}</AnimatePresence>

        {/* Welcome Modal */}
        <AnimatePresence>
          {showWelcomeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <h2 className="text-xl font-bold">Welcome to Inside X!</h2>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowWelcomeModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-white/60 mb-4">
                  Your profile is all set up! Here are a few things you can do to get started:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <Video className="h-3 w-3 text-purple-500" />
                    </div>
                    <span className="text-sm">Start a video chat or join a live session</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mt-0.5">
                      <Users className="h-3 w-3 text-pink-500" />
                    </div>
                    <span className="text-sm">Join communities based on your interests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
                      <Sparkles className="h-3 w-3 text-violet-500" />
                    </div>
                    <span className="text-sm">Explore stickers to express yourself in chats</span>
                  </li>
                </ul>
                <AnimatedButton
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => setShowWelcomeModal(false)}
                  glowColor="rgba(147, 51, 234, 0.5)"
                >
                  Get Started
                </AnimatedButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatedBackgroundContainer>
  )
}
