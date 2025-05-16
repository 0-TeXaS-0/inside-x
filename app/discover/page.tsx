"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Filter, 
  ChevronDown, 
  Users, 
  Hash, 
  Flame, 
  Eye, 
  MessageCircle, 
  Share2,
  Bookmark,
  ThumbsUp,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FloatingNav } from "@/components/ui/floating-nav"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [sortOrder, setSortOrder] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  // Sample trending videos
  const trendingVideos = [
    {
      id: "v1",
      title: "The Hidden Side of Modern Society - A Personal Reflection",
      creator: "AnonymousInsight",
      views: 452843,
      likes: 56256,
      comments: 3241,
      duration: "18:24",
      postedAt: "3 days ago",
      thumbnail: "/placeholder.svg",
      isAnonymous: true,
      trending: true
    },
    {
      id: "v2",
      title: "How I Overcame Social Anxiety - My Journey to Self-Acceptance",
      creator: "MindfulJourney",
      views: 287934,
      likes: 32456,
      comments: 2187,
      duration: "22:51",
      postedAt: "5 days ago",
      thumbnail: "/placeholder.svg",
      isAnonymous: false,
      trending: true
    },
    {
      id: "v3",
      title: "Digital Detox Challenge: 30 Days Without Social Media",
      creator: "TechBalance",
      views: 356893,
      likes: 41278,
      comments: 3864,
      duration: "15:37",
      postedAt: "1 week ago",
      thumbnail: "/placeholder.svg",
      isAnonymous: false,
      trending: true
    },
    {
      id: "v4",
      title: "The Psychology of Online Personas vs. Real Identity",
      creator: "Anonymous23",
      views: 189423,
      likes: 24687,
      comments: 1968,
      duration: "27:32",
      postedAt: "6 days ago",
      thumbnail: "/placeholder.svg",
      isAnonymous: true,
      trending: true
    },
    {
      id: "v5",
      title: "Finding Community in a Disconnected World",
      creator: "ConnectedSoul",
      views: 276543,
      likes: 32109,
      comments: 2765,
      duration: "19:48",
      postedAt: "4 days ago",
      thumbnail: "/placeholder.svg",
      isAnonymous: false,
      trending: true
    },
    {
      id: "v6",
      title: "INSIDE-X: The Future of Anonymous Content Creation",
      creator: "FutureTech",
      views: 521476,
      likes: 67234,
      comments: 4521,
      duration: "24:16",
      postedAt: "2 days ago",
      thumbnail: "/placeholder.svg",
      isAnonymous: false,
      trending: true
    }
  ]
  
  // Sample hashtags
  const trendingHashtags = [
    { tag: "AnonymousVoices", count: 23567 },
    { tag: "DigitalDetox", count: 18932 },
    { tag: "AuthenticSelf", count: 17654 },
    { tag: "MentalHealthAwareness", count: 15432 },
    { tag: "TruthSpeakers", count: 12876 },
    { tag: "InnerThoughts", count: 11453 },
    { tag: "NoFilter", count: 10987 },
    { tag: "FutureOfPrivacy", count: 9876 }
  ]
  
  // Sample creators
  const trendingCreators = [
    {
      id: "c1",
      name: "AnonymousInsight",
      followers: 352648,
      isAnonymous: true,
      badge: "top"
    },
    {
      id: "c2",
      name: "MindfulJourney",
      followers: 287432,
      isAnonymous: false,
      badge: "verified"
    },
    {
      id: "c3",
      name: "TechBalance",
      followers: 185679,
      isAnonymous: false,
      badge: "verified"
    },
    {
      id: "c4",
      name: "Anonymous23",
      followers: 156743,
      isAnonymous: true,
      badge: "rising"
    },
    {
      id: "c5",
      name: "ConnectedSoul",
      followers: 132567,
      isAnonymous: false,
      badge: "verified"
    }
  ]
  
  // Sample communities
  const trendingCommunities = [
    {
      id: "comm1",
      name: "Digital Wellbeing",
      members: 128543,
      description: "Discussing the balance between technology and mental health in the modern world",
      postsToday: 143
    },
    {
      id: "comm2",
      name: "Anonymous Creatives",
      members: 87652,
      description: "A space for creators who prefer to share their work without revealing their identity",
      postsToday: 97
    },
    {
      id: "comm3",
      name: "Truth Speakers",
      members: 65432,
      description: "Sharing personal stories and perspectives on sensitive topics without judgment",
      postsToday: 121
    },
    {
      id: "comm4",
      name: "Mindful Technology",
      members: 54321,
      description: "Exploring the intersection of mindfulness, technology, and human connection",
      postsToday: 88
    }
  ]

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
        className="min-h-screen text-white pb-20"
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-xl font-bold">Discover</h1>
            </div>
            
            <div className="hidden md:flex items-center max-w-md w-full mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search content, creators, or hashtags..."
                  className="pl-10 bg-white/5 border-white/10 text-white w-full"
                />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/5 border-white/10"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {/* Filters */}
          {showFilters && (
            <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10 mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Content Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-videos" defaultChecked />
                        <Label htmlFor="filter-videos">Videos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-livestreams" defaultChecked />
                        <Label htmlFor="filter-livestreams">Live Streams</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-shorts" defaultChecked />
                        <Label htmlFor="filter-shorts">Shorts</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Creator Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-anonymous" defaultChecked />
                        <Label htmlFor="filter-anonymous">Anonymous Creators</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-verified" defaultChecked />
                        <Label htmlFor="filter-verified">Verified Creators</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-following" />
                        <Label htmlFor="filter-following">Following Only</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Duration</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-short" defaultChecked />
                        <Label htmlFor="filter-short">&lt; 5 minutes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-medium" defaultChecked />
                        <Label htmlFor="filter-medium">5-20 minutes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-long" defaultChecked />
                        <Label htmlFor="filter-long">{'>'} 20 minutes</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Upload Date</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-today" defaultChecked />
                        <Label htmlFor="filter-today">Today</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-week" defaultChecked />
                        <Label htmlFor="filter-week">This week</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-month" defaultChecked />
                        <Label htmlFor="filter-month">This month</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Main Content */}
          <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <TabsList className="bg-gray-800/50">
                <TabsTrigger value="trending">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="hashtags">
                  <Hash className="h-4 w-4 mr-2" />
                  Hashtags
                </TabsTrigger>
                <TabsTrigger value="creators">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Creators
                </TabsTrigger>
                <TabsTrigger value="communities">
                  <Users className="h-4 w-4 mr-2" />
                  Communities
                </TabsTrigger>
              </TabsList>
              
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10 text-white">
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="discussed">Most Discussed</SelectItem>
                  <SelectItem value="engagement">Highest Engagement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingVideos.map((video) => (
                  <Card key={video.id} className="bg-gray-900/30 backdrop-blur-sm border border-white/10 overflow-hidden">
                    <div className="aspect-video bg-black flex items-center justify-center relative group">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white/20" />
                      </div>
                      
                      <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
                        <Flame className="h-3 w-3 mr-1" /> Trending
                      </Badge>
                      
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <Link href={`/video/${video.id}`}>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Watch Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <Link href={`/video/${video.id}`} className="hover:text-purple-400 transition-colors">
                        <h3 className="font-medium line-clamp-2 mb-2">{video.title}</h3>
                      </Link>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className={`text-xs ${video.isAnonymous ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-teal-500'}`}>
                              {video.creator.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-white/80">{video.creator}</span>
                          {video.isAnonymous && (
                            <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs border-purple-500/50 text-purple-400">
                              Anonymous
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-white/60">{video.postedAt}</span>
                      </div>
                      
                      <div className="flex justify-between text-xs text-white/80">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5 text-white/60" />
                          <span>{formatNumber(video.views)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5 text-white/60" />
                          <span>{formatNumber(video.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5 text-white/60" />
                          <span>{formatNumber(video.comments)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bookmark className="h-3.5 w-3.5 text-white/60" />
                          <span>Save</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hashtags" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingHashtags.map((hashtag) => (
                  <Card key={hashtag.tag} className="bg-gray-900/30 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-purple-500/20 transition-colors">
                    <Link href={`/hashtag/${hashtag.tag}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Hash className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">#{hashtag.tag}</h3>
                            <p className="text-white/60 text-sm">{formatNumber(hashtag.count)} posts</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-900"></div>
                          ))}
                          <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs font-semibold">+{Math.floor(Math.random() * 20) + 5}</div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="creators" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingCreators.map((creator) => (
                  <Card key={creator.id} className="bg-gray-900/30 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-purple-500/20 transition-colors">
                    <Link href={`/profile/${creator.id}`}>
                      <div className="h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30"></div>
                      <CardContent className="p-6 pt-0 -mt-10">
                        <div className="flex flex-col items-center text-center mb-4">
                          <Avatar className="h-20 w-20 border-4 border-gray-900">
                            <AvatarFallback className={`text-xl ${creator.isAnonymous ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-teal-500'}`}>
                              {creator.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="mt-3">
                            <div className="flex items-center gap-2 justify-center">
                              <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{creator.name}</h3>
                              {creator.badge === "verified" && (
                                <Badge className="bg-blue-500 text-white">Verified</Badge>
                              )}
                              {creator.badge === "top" && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Top Creator</Badge>
                              )}
                              {creator.badge === "rising" && (
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Rising Star</Badge>
                              )}
                            </div>
                            
                            <p className="text-white/60 mt-1">
                              {creator.isAnonymous ? "Anonymous Creator" : "Content Creator"}
                            </p>
                            
                            <p className="text-white/80 mt-2">{formatNumber(creator.followers)} followers</p>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Users className="h-4 w-4 mr-2" />
                          Follow
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="communities" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingCommunities.map((community) => (
                  <Card key={community.id} className="bg-gray-900/30 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-purple-500/20 transition-colors">
                    <Link href={`/communities/${community.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors mb-1">{community.name}</h3>
                            <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
                              <div className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                <span>{formatNumber(community.members)} members</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3.5 w-3.5" />
                                <span>{community.postsToday} posts today</span>
                              </div>
                            </div>
                            
                            <p className="text-white/80 text-sm line-clamp-2">{community.description}</p>
                            
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-900"></div>
                                ))}
                                <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs">+{Math.floor(Math.random() * 10) + 5}</div>
                              </div>
                              
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                Join
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <FloatingNav />
      </motion.div>
    </AnimatedBackgroundContainer>
  )
}

// Helper function to format numbers
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
