"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Search, Plus, Users, Video, MessageCircle, Calendar, Settings } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const communities = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    members: 1243,
    description: "Share your best shots and photography tips",
    categories: ["Photography", "Art"],
    isJoined: true,
    isActive: true,
  },
  {
    id: 2,
    name: "Music Producers",
    members: 876,
    description: "Connect with fellow producers and share your tracks",
    categories: ["Music", "Production"],
    isJoined: true,
    isActive: false,
  },
  {
    id: 3,
    name: "Travel Stories",
    members: 2156,
    description: "Share your travel experiences and find inspiration",
    categories: ["Travel", "Adventure"],
    isJoined: true,
    isActive: false,
  },
  {
    id: 4,
    name: "Tech Innovators",
    members: 1532,
    description: "Discuss the latest in technology and innovation",
    categories: ["Technology", "Innovation"],
    isJoined: false,
    isActive: false,
  },
  {
    id: 5,
    name: "Fitness Journey",
    members: 987,
    description: "Support each other on your fitness journeys",
    categories: ["Fitness", "Health"],
    isJoined: false,
    isActive: false,
  },
  {
    id: 6,
    name: "Book Club",
    members: 654,
    description: "Discuss books and share recommendations",
    categories: ["Books", "Reading"],
    isJoined: false,
    isActive: false,
  },
]

export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("joined")
  const [selectedCommunity, setSelectedCommunity] = useState(null)

  const filteredCommunities = searchTerm
    ? communities.filter(
        (community) =>
          community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          community.categories.some((category) => category.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : communities

  const joinedCommunities = filteredCommunities.filter((community) => community.isJoined)
  const discoverCommunities = filteredCommunities.filter((community) => !community.isJoined)

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community)
  }

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
            <h1 className="text-xl font-bold">Communities</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Create Community</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            type="search"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Tabs defaultValue="joined" onValueChange={setActiveTab}>
              <TabsList className="bg-gray-900/50 w-full grid grid-cols-2">
                <TabsTrigger value="joined">Joined</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
              </TabsList>

              <TabsContent value="joined" className="mt-6">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-4">
                    {joinedCommunities.length > 0 ? (
                      joinedCommunities.map((community) => (
                        <motion.div
                          key={community.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedCommunity?.id === community.id
                              ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30"
                              : "bg-white/5 hover:bg-white/10 border border-white/10"
                          }`}
                          onClick={() => handleCommunitySelect(community)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{community.name}</h3>
                            {community.isActive && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                          </div>
                          <div className="flex items-center text-sm text-white/60 mb-2">
                            <Users className="h-3 w-3 mr-1" />
                            <span>{community.members.toLocaleString()} members</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {community.categories.map((category, index) => (
                              <Badge key={index} variant="outline" className="bg-white/5 text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-white/60">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No communities found</p>
                        <p className="text-sm mt-2">Try adjusting your search or explore new communities</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="discover" className="mt-6">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-4">
                    {discoverCommunities.length > 0 ? (
                      discoverCommunities.map((community) => (
                        <motion.div
                          key={community.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all duration-300"
                          onClick={() => handleCommunitySelect(community)}
                        >
                          <h3 className="font-medium mb-1">{community.name}</h3>
                          <div className="flex items-center text-sm text-white/60 mb-2">
                            <Users className="h-3 w-3 mr-1" />
                            <span>{community.members.toLocaleString()} members</span>
                          </div>
                          <p className="text-sm text-white/60 mb-2">{community.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {community.categories.map((category, index) => (
                              <Badge key={index} variant="outline" className="bg-white/5 text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-white/60">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No communities found</p>
                        <p className="text-sm mt-2">Try adjusting your search</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-2/3">
            <AnimatePresence mode="wait">
              {selectedCommunity ? (
                <motion.div
                  key={selectedCommunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 border-white/10">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{selectedCommunity.name}</CardTitle>
                          <CardDescription className="mt-2">{selectedCommunity.description}</CardDescription>
                        </div>
                        <Button
                          variant={selectedCommunity.isJoined ? "outline" : "default"}
                          className={
                            selectedCommunity.isJoined
                              ? "border-white/10 text-white hover:bg-white/10"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          }
                        >
                          {selectedCommunity.isJoined ? "Joined" : "Join Community"}
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedCommunity.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="bg-white/5">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold">{selectedCommunity.members.toLocaleString()}</div>
                          <div className="text-xs text-white/60 flex items-center justify-center gap-1 mt-1">
                            <Users className="h-3 w-3" />
                            Members
                          </div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold">24</div>
                          <div className="text-xs text-white/60 flex items-center justify-center gap-1 mt-1">
                            <Video className="h-3 w-3" />
                            Videos
                          </div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold">3</div>
                          <div className="text-xs text-white/60 flex items-center justify-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            Events
                          </div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold">142</div>
                          <div className="text-xs text-white/60 flex items-center justify-center gap-1 mt-1">
                            <MessageCircle className="h-3 w-3" />
                            Discussions
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-medium mb-4">Active Now</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <Badge className="bg-red-500 mb-2">LIVE</Badge>
                          <h4 className="font-medium">Photography Basics Workshop</h4>
                          <p className="text-sm text-white/60 mt-1">
                            Join our weekly workshop to learn the basics of photography
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <Avatar key={i} className="h-6 w-6 border-2 border-gray-900">
                                  <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                                    {`U${i}`}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs border-2 border-gray-900">
                                +12
                              </div>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                              Join
                            </Button>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <Badge variant="outline" className="mb-2 bg-white/10">
                            DISCUSSION
                          </Badge>
                          <h4 className="font-medium">Best Camera for Beginners?</h4>
                          <p className="text-sm text-white/60 mt-1">
                            Help me choose my first DSLR camera for landscape photography
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-sm text-white/60">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              <span>24 replies</span>
                            </div>
                            <Button size="sm" variant="outline" className="border-white/10">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/10">
                          <Video className="h-4 w-4 mr-2" />
                          Join Live
                        </Button>
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Start Discussion
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-[calc(100vh-12rem)]"
                >
                  <div className="text-center text-white/60">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <h3 className="text-xl font-medium mb-2">Select a Community</h3>
                    <p>Choose a community from the list to view details</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
