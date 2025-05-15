"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Edit, Settings, Share2, Shield, Video, Clock, Users, Grid3X3, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { VideoCard } from "@/components/dashboard/video-card"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("videos")

  const stats = [
    { icon: Video, label: "Videos", value: "24" },
    { icon: Users, label: "Connections", value: "156" },
    { icon: Clock, label: "Hours", value: "42.5" },
  ]

  const interests = ["Photography", "Music", "Travel", "Technology", "Art"]

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="md:w-1/3">
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white/10">
                    <AvatarFallback className="text-3xl bg-gradient-to-r from-purple-500 to-pink-500">
                      AX
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm border-white/20"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <h2 className="text-2xl font-bold mt-4">Anonymous429</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">Premium</Badge>
                  <Badge variant="outline" className="bg-white/5">
                    <Shield className="h-3 w-3 mr-1" /> Anonymous
                  </Badge>
                </div>

                <p className="text-white/60 mt-4">
                  Exploring the world through anonymous connections. Photography enthusiast and music lover.
                </p>

                <div className="grid grid-cols-3 gap-4 w-full mt-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-white/60 flex items-center gap-1 mt-1">
                        <stat.icon className="h-3 w-3" />
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Edit Profile
                </Button>
              </div>

              <Separator className="my-6 bg-white/10" />

              <div>
                <h3 className="text-lg font-medium mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="bg-white/5">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 w-full">
            <Tabs defaultValue="videos" onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-gray-900/50 w-full grid grid-cols-4">
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Videos</span>
                </TabsTrigger>
                <TabsTrigger value="live" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span className="hidden sm:inline">Live</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Saved</span>
                </TabsTrigger>
                <TabsTrigger value="connections" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Connections</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <VideoCard
                      key={i}
                      title={`My Video ${i + 1}`}
                      username="Anonymous429"
                      tags={[i % 2 === 0 ? "Photography" : "Music"]}
                      likes={Math.floor(Math.random() * 200) + 50}
                      comments={Math.floor(Math.random() * 50) + 5}
                      isLive={false}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="live" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <VideoCard
                      key={i}
                      title={`Live Session ${i + 1}`}
                      username="Anonymous429"
                      tags={["Live", i === 0 ? "Music" : "Photography"]}
                      likes={Math.floor(Math.random() * 100) + 20}
                      comments={Math.floor(Math.random() * 30) + 5}
                      isLive={true}
                      viewers={Math.floor(Math.random() * 50) + 10}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <VideoCard
                      key={i}
                      title={`Saved Video ${i + 1}`}
                      username={`User${i + 100}`}
                      tags={[i % 3 === 0 ? "Art" : i % 3 === 1 ? "Travel" : "Technology"]}
                      likes={Math.floor(Math.random() * 300) + 100}
                      comments={Math.floor(Math.random() * 70) + 10}
                      isLive={false}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="connections" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-900/50 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center"
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                          {`U${i}`}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium mt-2">{`User${i + 100}`}</h3>
                      <p className="text-white/60 text-sm mt-1">
                        {i % 3 === 0 ? "Photography" : i % 3 === 1 ? "Music" : "Travel"} enthusiast
                      </p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
