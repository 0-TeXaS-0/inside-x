"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Settings, BarChart3, Video, Edit, Image, Clock, Calendar, Trash2, Copy, Upload, Eye, EyeOff, Lock, Globe, Filter, CheckCircle2, Plus, MessageCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Switch } from "@/components/ui/switch"
import { FloatingNav } from "@/components/ui/floating-nav"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"

export default function CreatorStudioPage() {
  const [activeTab, setActiveTab] = useState("content")
  const [filterView, setFilterView] = useState("grid")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState("newest")
  const [filterPrivacy, setFilterPrivacy] = useState("all")
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  // Sample content data
  const contentItems = [
    {
      id: "v1",
      type: "video",
      title: "The Hidden Side of Modern Society - A Personal Reflection",
      thumbnail: "/placeholder.svg",
      views: 12843,
      likes: 1256,
      comments: 324,
      duration: "18:24",
      uploadedAt: "2 weeks ago",
      status: "published",
      privacy: "public",
      monetized: true,
      performance: "trending"
    },
    {
      id: "v2",
      type: "video",
      title: "Finding Authentic Connection in a Digital World",
      thumbnail: "/placeholder.svg",
      views: 8723,
      likes: 965,
      comments: 218,
      duration: "12:37",
      uploadedAt: "3 weeks ago",
      status: "published",
      privacy: "anonymous",
      monetized: true,
      performance: "average"
    },
    {
      id: "v3",
      type: "live",
      title: "Late Night Discussion: Mental Health in the Digital Era",
      thumbnail: "/placeholder.svg",
      views: 3241,
      likes: 842,
      comments: 576,
      duration: "SCHEDULED",
      uploadedAt: "Tomorrow, 9:00 PM",
      status: "scheduled",
      privacy: "public",
      monetized: false,
      performance: null
    },
    {
      id: "v4",
      type: "video",
      title: "The Untold Effects of Social Media on Mental Health",
      thumbnail: "/placeholder.svg",
      views: 23541,
      likes: 3102,
      comments: 756,
      duration: "24:12",
      uploadedAt: "1 month ago",
      status: "published",
      privacy: "public",
      monetized: true,
      performance: "top"
    },
    {
      id: "v5",
      type: "video",
      title: "Creating Boundaries in the Age of Always-On Culture",
      thumbnail: "/placeholder.svg",
      views: 5892,
      likes: 710,
      comments: 143,
      duration: "15:46",
      uploadedAt: "3 weeks ago",
      status: "published",
      privacy: "private",
      monetized: false,
      performance: "below"
    },
    {
      id: "v6",
      type: "draft",
      title: "Mindfulness Practices for Digital Detox (Draft)",
      thumbnail: "/placeholder.svg",
      views: 0,
      likes: 0,
      comments: 0,
      duration: "10:12",
      uploadedAt: "Last edited 2 days ago",
      status: "draft",
      privacy: "private",
      monetized: false,
      performance: null
    },
    {
      id: "v7",
      type: "live",
      title: "Q&A Session: Answering Your Questions About Digital Wellness",
      thumbnail: "/placeholder.svg",
      views: 0,
      likes: 0,
      comments: 0,
      duration: "SCHEDULED",
      uploadedAt: "Next Friday, 6:00 PM",
      status: "scheduled",
      privacy: "anonymous",
      monetized: true,
      performance: null
    },
    {
      id: "v8",
      type: "video",
      title: "How Anonymous Content Creation Changed My Life",
      thumbnail: "/placeholder.svg",
      views: 15782,
      likes: 2104,
      comments: 437,
      duration: "21:36",
      uploadedAt: "2 months ago",
      status: "published",
      privacy: "anonymous",
      monetized: true,
      performance: "evergreen"
    }
  ]
  
  // Sample analytics data
  const overviewStats = [
    { label: "Total Views", value: "128.4K", change: "+12.4%", positive: true },
    { label: "Watch Time", value: "3,672 hrs", change: "+8.7%", positive: true },
    { label: "Subscribers", value: "4.8K", change: "+15.2%", positive: true },
    { label: "Revenue", value: "$842.36", change: "+22.5%", positive: true },
  ]

  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const selectAllItems = () => {
    if (selectedItems.length === contentItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(contentItems.map(item => item.id))
    }
  }

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "public":
        return <Globe className="h-4 w-4 text-green-400" />
      case "anonymous":
        return <Eye className="h-4 w-4 text-purple-400" />
      case "private":
        return <Lock className="h-4 w-4 text-yellow-400" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getStatusBadge = (item: any) => {
    if (item.status === "published") {
      if (item.performance === "trending") {
        return <Badge className="bg-purple-500/20 text-purple-400">Trending</Badge>
      } else if (item.performance === "top") {
        return <Badge className="bg-green-500/20 text-green-400">Top Performer</Badge>
      } else if (item.performance === "evergreen") {
        return <Badge className="bg-blue-500/20 text-blue-400">Evergreen</Badge>
      } else if (item.performance === "below") {
        return <Badge className="bg-red-500/20 text-red-400">Below Average</Badge>
      } else {
        return <Badge className="bg-gray-500/20 text-gray-400">Published</Badge>
      }
    } else if (item.status === "scheduled") {
      return <Badge className="bg-yellow-500/20 text-yellow-400">Scheduled</Badge>
    } else {
      return <Badge className="bg-gray-700/50 text-white/60">Draft</Badge>
    }
  }

  const filteredContent = contentItems.filter(item => {
    if (filterPrivacy === "all") return true
    return item.privacy === filterPrivacy
  }).sort((a, b) => {
    if (sortOrder === "newest") {
      return -1 // This would normally compare dates
    } else if (sortOrder === "oldest") {
      return 1 // This would normally compare dates
    } else if (sortOrder === "views") {
      return b.views - a.views
    } else if (sortOrder === "engagement") {
      return (b.likes + b.comments) - (a.likes + a.comments)
    }
    return 0
  })

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
              <h1 className="text-xl font-bold">Creator Studio</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2 border-white/10 bg-white/5">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Link href="/analytics">
                <Button variant="outline" className="gap-2 border-white/10 bg-white/5">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </Button>
              </Link>
              <Link href="/upload">
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {overviewStats.map((stat, index) => (
              <Card key={index} className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-white/60">{stat.label}</p>
                    <Badge className={`${stat.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {stat.change}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold">{stat.value}</h2>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <TabsList className="bg-gray-800/50">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="monetization">Monetization</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap gap-2">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-32 bg-white/5 border-white/10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10 text-white">
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="views">Most views</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterPrivacy} onValueChange={setFilterPrivacy}>
                  <SelectTrigger className="w-36 bg-white/5 border-white/10">
                    <SelectValue placeholder="All content" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10 text-white">
                    <SelectItem value="all">All content</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="anonymous">Anonymous</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>

                <ToggleGroup type="single" value={filterView} onValueChange={(value) => value && setFilterView(value)}>
                  <ToggleGroupItem value="grid" className="border-white/10 bg-white/5 data-[state=on]:bg-white/10">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V6.5C3 6.77614 3.22386 7 3.5 7H12.5C12.7761 7 13 6.77614 13 6.5V2.5C13 2.22386 12.7761 2 12.5 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H12.5C13.3284 1 14 1.67157 14 2.5V6.5C14 7.32843 13.3284 8 12.5 8H3.5C2.67157 8 2 7.32843 2 6.5V2.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5V13.5C3 13.7761 3.22386 14 3.5 14H12.5C12.7761 14 13 13.7761 13 13.5V9.5C13 9.22386 12.7761 9 12.5 9H3.5ZM2 9.5C2 8.67157 2.67157 8 3.5 8H12.5C13.3284 8 14 8.67157 14 9.5V13.5C14 14.3284 13.3284 15 12.5 15H3.5C2.67157 15 2 14.3284 2 13.5V9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" className="border-white/10 bg-white/5 data-[state=on]:bg-white/10">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4C2.22386 4 2 3.77614 2 3.5C2 3.22386 2.22386 3 2.5 3H12.5C12.7761 3 13 3.22386 13 3.5C13 3.77614 12.7761 4 12.5 4H2.5ZM2.5 8C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5ZM2 11.5C2 11.2239 2.22386 11 2.5 11H12.5C12.7761 11 13 11.2239 13 11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            <TabsContent value="content" className="m-0">
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="select-all" 
                          checked={selectedItems.length > 0 && selectedItems.length === contentItems.length}
                          onCheckedChange={selectAllItems}
                        />
                        <Label htmlFor="select-all" className="text-sm">
                          {selectedItems.length > 0 ? `${selectedItems.length} selected` : "Select all"}
                        </Label>
                      </div>
                      
                      {selectedItems.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Separator orientation="vertical" className="h-5 bg-white/10" />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-white/80">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="bg-gray-900 border-white/10 text-white">
                              <DropdownMenuItem className="cursor-pointer flex gap-2">
                                <Globe className="h-4 w-4" /> Make public
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer flex gap-2">
                                <Eye className="h-4 w-4" /> Make anonymous
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer flex gap-2">
                                <Lock className="h-4 w-4" /> Make private
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer flex gap-2 text-red-400">
                                <Trash2 className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </div>
                    
                    <div className="relative">
                      <Input 
                        type="search" 
                        placeholder="Search your content..." 
                        className="w-full sm:w-64 bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {filterView === "grid" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredContent.map((item) => (
                          <div 
                            key={item.id} 
                            className="relative group bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
                          >
                            <div className="absolute top-3 left-3 z-10">
                              <Checkbox 
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => toggleItemSelection(item.id)}
                                className="bg-black/40 backdrop-blur-sm data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                              />
                            </div>
                            
                            <div className="absolute top-3 right-3 z-10 flex gap-1">
                              {getPrivacyIcon(item.privacy)}
                              {item.monetized && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                            </div>
                            
                            <div className="aspect-video bg-black flex items-center justify-center relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Video className="h-8 w-8 text-white/20" />
                              </div>
                              
                              {item.type === "live" && (
                                <Badge className="absolute bottom-2 left-2 bg-red-500 text-white">
                                  {item.status === "scheduled" ? "SCHEDULED" : "LIVE"}
                                </Badge>
                              )}
                              
                              {item.duration && item.type !== "live" && (
                                <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                                  {item.duration}
                                </Badge>
                              )}
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="bg-black/50 backdrop-blur-sm border-white/20 text-white h-8">
                                    <Edit className="h-3.5 w-3.5 mr-1" />
                                    Edit
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="icon" className="bg-black/50 backdrop-blur-sm border-white/20 text-white h-8 w-8">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
                                      <DropdownMenuItem className="cursor-pointer flex gap-2">
                                        <Copy className="h-4 w-4" /> Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="cursor-pointer flex gap-2">
                                        <BarChart3 className="h-4 w-4" /> Analytics
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="cursor-pointer flex gap-2 text-red-400">
                                        <Trash2 className="h-4 w-4" /> Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-3">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                                {getStatusBadge(item)}
                              </div>
                              
                              <div className="flex items-center text-xs text-white/60 mb-3">
                                <span>{item.uploadedAt}</span>
                              </div>
                              
                              {item.status !== "draft" && item.status !== "scheduled" && (
                                <div className="flex text-xs text-white/80 gap-4">
                                  <div className="flex items-center gap-1.5">
                                    <Eye className="h-3.5 w-3.5 text-white/60" />
                                    <span>{item.views.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
                                      <path d="M7.5 0.875C7.77614 0.875 8 1.09886 8 1.375V13.625C8 13.9011 7.77614 14.125 7.5 14.125C7.22386 14.125 7 13.9011 7 13.625V1.375C7 1.09886 7.22386 0.875 7.5 0.875ZM3.22727 4.375C3.50341 4.375 3.72727 4.59886 3.72727 4.875V13.625C3.72727 13.9011 3.50341 14.125 3.22727 14.125C2.95114 14.125 2.72727 13.9011 2.72727 13.625V4.875C2.72727 4.59886 2.95114 4.375 3.22727 4.375ZM11.7727 4.375C12.0489 4.375 12.2727 4.59886 12.2727 4.875V13.625C12.2727 13.9011 12.0489 14.125 11.7727 14.125C11.4966 14.125 11.2727 13.9011 11.2727 13.625V4.875C11.2727 4.59886 11.4966 4.375 11.7727 4.375Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{item.likes.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
                                      <path d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{item.comments.toLocaleString()}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredContent.map((item) => (
                          <div 
                            key={item.id} 
                            className="relative flex gap-4 bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors p-3"
                          >
                            <div className="flex items-center self-start mr-1">
                              <Checkbox 
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => toggleItemSelection(item.id)}
                                className="data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                              />
                            </div>
                            
                            <div className="w-48 h-28 bg-black rounded flex-shrink-0 flex items-center justify-center relative">
                              <Video className="h-8 w-8 text-white/20" />
                              
                              {item.type === "live" && (
                                <Badge className="absolute bottom-2 left-2 bg-red-500 text-white">
                                  {item.status === "scheduled" ? "SCHEDULED" : "LIVE"}
                                </Badge>
                              )}
                              
                              {item.duration && item.type !== "live" && (
                                <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                                  {item.duration}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="font-medium line-clamp-1">{item.title}</h3>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  {getPrivacyIcon(item.privacy)}
                                  {item.monetized && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                                  {getStatusBadge(item)}
                                </div>
                              </div>
                              
                              <div className="flex items-center text-xs text-white/60 mb-2">
                                <span>{item.uploadedAt}</span>
                              </div>
                              
                              {item.status !== "draft" && item.status !== "scheduled" && (
                                <div className="flex flex-wrap text-xs text-white/80 gap-4 mb-2">
                                  <div className="flex items-center gap-1.5">
                                    <Eye className="h-3.5 w-3.5 text-white/60" />
                                    <span>{item.views.toLocaleString()} views</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
                                      <path d="M7.5 0.875C7.77614 0.875 8 1.09886 8 1.375V13.625C8 13.9011 7.77614 14.125 7.5 14.125C7.22386 14.125 7 13.9011 7 13.625V1.375C7 1.09886 7.22386 0.875 7.5 0.875ZM3.22727 4.375C3.50341 4.375 3.72727 4.59886 3.72727 4.875V13.625C3.72727 13.9011 3.50341 14.125 3.22727 14.125C2.95114 14.125 2.72727 13.9011 2.72727 13.625V4.875C2.72727 4.59886 2.95114 4.375 3.22727 4.375ZM11.7727 4.375C12.0489 4.375 12.2727 4.59886 12.2727 4.875V13.625C12.2727 13.9011 12.0489 14.125 11.7727 14.125C11.4966 14.125 11.2727 13.9011 11.2727 13.625V4.875C11.2727 4.59886 11.4966 4.375 11.7727 4.375Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{item.likes.toLocaleString()} likes</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
                                      <path d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{item.comments.toLocaleString()} comments</span>
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 px-2 bg-white/5 border-white/10 text-white/80">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-7 px-2 bg-white/5 border-white/10 text-white/80"
                                  asChild
                                >
                                  <Link href={`/analytics?content=${item.id}`}>
                                    <BarChart3 className="h-3 w-3 mr-1" />
                                    Analytics
                                  </Link>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-7 px-2 bg-white/5 border-white/10 text-white/80"
                                    >
                                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                        <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                      </svg>
                                      More
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
                                    <DropdownMenuItem className="cursor-pointer flex gap-2">
                                      <Copy className="h-4 w-4" /> Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer flex gap-2">
                                      <Globe className="h-4 w-4" /> Make public
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer flex gap-2">
                                      <Eye className="h-4 w-4" /> Make anonymous
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer flex gap-2">
                                      <Lock className="h-4 w-4" /> Make private
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer flex gap-2 text-red-400">
                                      <Trash2 className="h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="playlists" className="m-0">
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10 h-[650px]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Playlists & Series</CardTitle>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      New Playlist
                    </Button>
                  </div>
                  <CardDescription className="text-white/60">
                    Organize your content into playlists to help viewers find related videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-96 text-white/40">
                    <div className="text-center">
                      <Image className="h-16 w-16 text-white/20 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-1">Create your first playlist</h3>
                      <p className="max-w-sm text-white/60 mb-4">
                        Group related videos together to create a better viewing experience
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Playlist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="community" className="m-0">
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10 h-[650px]">
                <CardHeader>
                  <CardTitle>Community & Comments</CardTitle>
                  <CardDescription className="text-white/60">
                    Manage your community interactions and moderate comments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="comments">
                    <TabsList className="bg-white/5 mb-4">
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                      <TabsTrigger value="posts">Community Posts</TabsTrigger>
                      <TabsTrigger value="moderation">Moderation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="comments">
                      <div className="flex flex-col items-center justify-center h-96 text-white/40">
                        <div className="text-center">
                          <MessageCircle className="h-16 w-16 text-white/20 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-white mb-1">No comments to review</h3>
                          <p className="max-w-sm text-white/60">
                            When viewers leave comments on your videos, they'll appear here for you to review and respond to
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="posts">
                      <div className="flex flex-col items-center justify-center h-96 text-white/40">
                        <div className="text-center">
                          <Users className="h-16 w-16 text-white/20 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-white mb-1">Connect with your audience</h3>
                          <p className="max-w-sm text-white/60 mb-4">
                            Create community posts to engage with your audience even when you're not uploading videos
                          </p>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Post
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monetization" className="m-0">
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10 h-[650px]">
                <CardHeader>
                  <CardTitle>Monetization</CardTitle>
                  <CardDescription className="text-white/60">
                    Manage your revenue streams and monetization settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="bg-white/5 mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="payouts">Payouts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-white/5 border-white/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">This Month</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">$842.36</div>
                            <p className="text-xs text-white/60">+$156.85 from last month</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">Creator Fund</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">$621.50</div>
                            <p className="text-xs text-white/60">Based on engagement & watchtime</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">Tipping</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">$220.86</div>
                            <p className="text-xs text-white/60">From 52 supporter contributions</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-4">Revenue Sources</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Creator Fund</span>
                              <span className="text-sm">74%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10">
                              <div className="h-2 rounded-full bg-purple-500 w-[74%]"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Tips & Support</span>
                              <span className="text-sm">26%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10">
                              <div className="h-2 rounded-full bg-pink-500 w-[26%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Top Earning Content</h3>
                          <Button variant="link" className="text-purple-400 h-auto p-0">View all</Button>
                        </div>
                        <div className="space-y-3">
                          {filteredContent.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                              <div className="w-12 h-12 bg-black rounded flex-shrink-0 flex items-center justify-center">
                                <Video className="h-5 w-5 text-white/20" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                                <div className="flex items-center text-xs text-white/60">
                                  <span>{item.views.toLocaleString()} views</span>
                                </div>
                              </div>
                              <div className="text-sm font-bold">
                                ${(item.views * 0.00024).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <FloatingNav />
      </motion.div>
    </AnimatedBackgroundContainer>
  )
}
