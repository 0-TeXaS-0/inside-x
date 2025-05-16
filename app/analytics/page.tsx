"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, BarChart, TrendingUp, Users, Eye, Clock, ThumbsUp, MessageCircle, Share2, Download, Calendar, ChevronDown, Info, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FloatingNav } from "@/components/ui/floating-nav"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days")
  const [showFilters, setShowFilters] = useState(false)
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  // Sample analytics data
  const overviewStats = [
    { label: "Views", value: "45.8K", icon: Eye, change: "+12.4%", positive: true },
    { label: "Watch Time", value: "768 hrs", icon: Clock, change: "+8.7%", positive: true },
    { label: "Engagements", value: "6.2K", icon: ThumbsUp, change: "+15.2%", positive: true },
    { label: "New Followers", value: "842", icon: Users, change: "-3.1%", positive: false },
  ]
  
  // Sample video data
  const topVideos = [
    {
      id: "v1",
      title: "The Hidden Side of Modern Society - A Personal Reflection",
      views: 12843,
      likes: 1256,
      comments: 324,
      watchTime: "1,452 hrs",
      uploadedAt: "2 weeks ago",
      performance: "Trending"
    },
    {
      id: "v2",
      title: "Finding Authentic Connection in a Digital World",
      views: 8723,
      likes: 965,
      comments: 218,
      watchTime: "982 hrs",
      uploadedAt: "3 weeks ago",
      performance: "Above Average"
    },
    {
      id: "v3",
      title: "The Untold Effects of Social Media on Mental Health",
      views: 23541,
      likes: 3102,
      comments: 756,
      watchTime: "2,840 hrs",
      uploadedAt: "1 month ago",
      performance: "Top Performer"
    },
    {
      id: "v4",
      title: "Creating Boundaries in the Age of Always-On Culture",
      views: 5892,
      likes: 710,
      comments: 143,
      watchTime: "695 hrs",
      uploadedAt: "2 weeks ago",
      performance: "Average"
    }
  ]
  
  // Sample audience data
  const audienceData = {
    ageGroups: [
      { label: "18-24", percentage: 32 },
      { label: "25-34", percentage: 41 },
      { label: "35-44", percentage: 18 },
      { label: "45-54", percentage: 6 },
      { label: "55+", percentage: 3 }
    ],
    genders: [
      { label: "Anonymous", percentage: 58 },
      { label: "Male", percentage: 25 },
      { label: "Female", percentage: 15 },
      { label: "Non-binary", percentage: 2 }
    ],
    locations: [
      { label: "United States", percentage: 38 },
      { label: "United Kingdom", percentage: 12 },
      { label: "Canada", percentage: 9 },
      { label: "Germany", percentage: 7 },
      { label: "Australia", percentage: 6 },
      { label: "Other", percentage: 28 }
    ],
    viewTimes: [
      { label: "Morning", percentage: 15 },
      { label: "Afternoon", percentage: 22 },
      { label: "Evening", percentage: 38 },
      { label: "Night", percentage: 25 }
    ]
  }
  
  // Sample insights
  const insights = [
    {
      title: "Audience Growth",
      description: "Your anonymity-focused content is attracting a new demographic. Videos that protect viewer privacy are seeing 18% higher engagement.",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-700"
    },
    {
      title: "Topic Performance",
      description: "Content about 'digital boundaries' is resonating strongly with your audience. Consider creating more videos in this topic area.",
      icon: BarChart,
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Optimal Posting Time",
      description: "Your videos posted between 7-9pm receive 24% more initial views. Consider scheduling future uploads in this window.",
      icon: Clock,
      color: "from-orange-500 to-amber-600"
    },
    {
      title: "Retention Opportunity",
      description: "Many viewers drop off around the 5-minute mark. Consider restructuring longer videos to maintain engagement throughout.",
      icon: Users,
      color: "from-red-500 to-pink-600"
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
              <h1 className="text-xl font-bold">Analytics</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10 text-white">
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last 12 months</SelectItem>
                  <SelectItem value="alltime">All time</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/5 border-white/10"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="bg-white/5 border-white/10">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
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
                    <h3 className="font-medium mb-3">Privacy Setting</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-public" defaultChecked />
                        <Label htmlFor="filter-public">Public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-anonymous" defaultChecked />
                        <Label htmlFor="filter-anonymous">Anonymous Mode</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-private" />
                        <Label htmlFor="filter-private">Private</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Performance</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-trending" defaultChecked />
                        <Label htmlFor="filter-trending">Trending</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-average" defaultChecked />
                        <Label htmlFor="filter-average">Average</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-below" defaultChecked />
                        <Label htmlFor="filter-below">Below Average</Label>
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
                        <Label htmlFor="filter-medium">5-15 minutes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-long" defaultChecked />
                        <Label htmlFor="filter-long">{'>'} 15 minutes</Label>
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
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {overviewStats.map((stat, index) => (
              <Card key={index} className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <stat.icon className="h-5 w-5 text-white/60" />
                    <Badge className={`${stat.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {stat.change}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                  <p className="text-white/60">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Performance */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="videos" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="bg-gray-800/50">
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="audience">Audience</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" size="sm" className="bg-white/5 border-white/10">
                    <Filter className="h-4 w-4 mr-2" />
                    Sort by
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <TabsContent value="videos" className="mt-0">
                  <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                    <CardHeader>
                      <CardTitle>Top Performing Content</CardTitle>
                      <CardDescription className="text-white/60">
                        Videos with the highest engagement in selected time period
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[460px]">
                        <div className="space-y-6">
                          {topVideos.map((video) => (
                            <div key={video.id} className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-48 h-28 bg-black rounded-md flex items-center justify-center flex-shrink-0">
                                <Eye className="h-8 w-8 text-white/20" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <Link href={`/video/${video.id}`} className="hover:text-purple-400 transition-colors">
                                    <h3 className="font-medium truncate">{video.title}</h3>
                                  </Link>
                                  <Badge 
                                    className={`${
                                      video.performance === "Top Performer" 
                                        ? "bg-green-500/20 text-green-400" 
                                        : video.performance === "Trending"
                                          ? "bg-purple-500/20 text-purple-400"
                                          : video.performance === "Above Average"
                                            ? "bg-blue-500/20 text-blue-400" 
                                            : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                                  >
                                    {video.performance}
                                  </Badge>
                                </div>
                                <p className="text-sm text-white/60 mb-3">{video.uploadedAt}</p>
                                
                                <div className="grid grid-cols-4 gap-2 mb-2">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{video.views.toLocaleString()}</span>
                                    <span className="text-xs text-white/60">Views</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{video.watchTime}</span>
                                    <span className="text-xs text-white/60">Watch time</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{video.likes.toLocaleString()}</span>
                                    <span className="text-xs text-white/60">Likes</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{video.comments.toLocaleString()}</span>
                                    <span className="text-xs text-white/60">Comments</span>
                                  </div>
                                </div>
                                
                                <Progress
                                  value={
                                    video.performance === "Top Performer" 
                                      ? 90 
                                      : video.performance === "Trending"
                                        ? 80
                                        : video.performance === "Above Average"
                                          ? 65 
                                          : 50
                                  }
                                  className="h-1.5 mt-1"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="audience" className="mt-0">
                  <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                    <CardHeader>
                      <CardTitle>Audience Demographics</CardTitle>
                      <CardDescription className="text-white/60">
                        Understand who is watching your content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-4">Age Distribution</h3>
                          <div className="space-y-3">
                            {audienceData.ageGroups.map((item) => (
                              <div key={item.label}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">{item.label}</span>
                                  <span className="text-sm">{item.percentage}%</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-4">Gender Distribution</h3>
                          <div className="space-y-3">
                            {audienceData.genders.map((item) => (
                              <div key={item.label}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">{item.label}</span>
                                  <span className="text-sm">{item.percentage}%</span>
                                </div>
                                <Progress 
                                  value={item.percentage} 
                                  className={`h-2 ${
                                    item.label === "Anonymous" 
                                      ? "bg-purple-950 [&>div]:bg-purple-500" 
                                      : ""
                                  }`} 
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-4">Top Locations</h3>
                          <div className="space-y-3">
                            {audienceData.locations.map((item) => (
                              <div key={item.label}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">{item.label}</span>
                                  <span className="text-sm">{item.percentage}%</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-4">Viewing Times</h3>
                          <div className="space-y-3">
                            {audienceData.viewTimes.map((item) => (
                              <div key={item.label}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">{item.label}</span>
                                  <span className="text-sm">{item.percentage}%</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="engagement" className="mt-0">
                  <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                    <CardHeader>
                      <CardTitle>Engagement Metrics</CardTitle>
                      <CardDescription className="text-white/60">
                        How viewers are interacting with your content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Likes Ratio</h3>
                            <ThumbsUp className="h-4 w-4 text-white/60" />
                          </div>
                          <p className="text-2xl font-bold">4.8%</p>
                          <p className="text-xs text-white/60">Percentage of views that resulted in likes</p>
                          <Badge className="bg-green-500/20 text-green-400 mt-2">+0.6%</Badge>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Comment Rate</h3>
                            <MessageCircle className="h-4 w-4 text-white/60" />
                          </div>
                          <p className="text-2xl font-bold">2.1%</p>
                          <p className="text-xs text-white/60">Percentage of views that resulted in comments</p>
                          <Badge className="bg-green-500/20 text-green-400 mt-2">+0.3%</Badge>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Share Rate</h3>
                            <Share2 className="h-4 w-4 text-white/60" />
                          </div>
                          <p className="text-2xl font-bold">1.2%</p>
                          <p className="text-xs text-white/60">Percentage of views that resulted in shares</p>
                          <Badge className="bg-red-500/20 text-red-400 mt-2">-0.1%</Badge>
                        </div>
                      </div>
                      
                      <h3 className="font-medium mb-3">Retention Analysis</h3>
                      <div className="bg-white/5 p-4 rounded-lg mb-6">
                        <div className="h-32 flex items-end justify-between gap-1">
                          {[95, 87, 82, 76, 68, 54, 62, 58, 52, 48, 45, 42].map((value, i) => (
                            <div
                              key={i}
                              className="bg-purple-500/60 hover:bg-purple-500/80 transition-colors rounded-sm w-full"
                              style={{ height: `${value}%` }}
                            ></div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-white/60">
                          <span>Start</span>
                          <span>25%</span>
                          <span>50%</span>
                          <span>75%</span>
                          <span>End</span>
                        </div>
                        <p className="text-xs text-white/60 mt-2">Average audience retention across all videos</p>
                      </div>
                      
                      <h3 className="font-medium mb-3">Traffic Sources</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Inside X Browse</span>
                            <span className="text-sm">42%</span>
                          </div>
                          <Progress value={42} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Direct/URL</span>
                            <span className="text-sm">24%</span>
                          </div>
                          <Progress value={24} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Suggested Videos</span>
                            <span className="text-sm">18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">External Shares</span>
                            <span className="text-sm">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Other</span>
                            <span className="text-sm">6%</span>
                          </div>
                          <Progress value={6} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Insights */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Content Insights
                    <Info className="h-4 w-4 text-white/60" />
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    AI-powered recommendations to grow your audience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[460px] pr-4">
                    <div className="space-y-4">
                      {insights.map((insight, index) => (
                        <div key={index} className="group rounded-lg overflow-hidden">
                          <div className={`bg-gradient-to-r ${insight.color} p-4 rounded-t-lg`}>
                            <div className="flex items-center gap-2">
                              <insight.icon className="h-5 w-5 text-white" />
                              <h3 className="font-medium">{insight.title}</h3>
                            </div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-b-lg">
                            <p className="text-sm text-white/80">{insight.description}</p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="rounded-lg border border-white/10 p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Upload Consistency</h3>
                          <Badge className="bg-yellow-500/20 text-yellow-400">Needs Attention</Badge>
                        </div>
                        <p className="text-sm text-white/80 mb-3">Your upload schedule has been inconsistent recently. Regular uploads tend to increase audience growth.</p>
                        
                        <h4 className="text-sm font-medium mb-2">Recent Upload Pattern</h4>
                        <div className="flex gap-1">
                          {[1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0].map((day, i) => (
                            <div 
                              key={i} 
                              className={`h-6 w-4 rounded-sm ${
                                day === 1 ? 'bg-purple-500' : 'bg-white/10'
                              }`}
                              title={day === 1 ? "Upload" : "No upload"}
                            ></div>
                          ))}
                        </div>
                        <p className="text-xs text-white/60 mt-1">Last 14 days</p>
                      </div>
                      
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Generate Content Ideas
                      </Button>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Schedule */}
          <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10 mt-6">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <div>
                <CardTitle>Upload Schedule</CardTitle>
                <CardDescription className="text-white/60">
                  Plan and manage your future content releases
                </CardDescription>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Video
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-center font-medium text-white/60 text-sm">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 14 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-md p-1 flex flex-col ${
                      i === 2 || i === 9 
                        ? "bg-purple-500/20 border border-purple-500/40" 
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <div className="text-xs text-white/60">{i + 1}</div>
                    {(i === 2 || i === 9) && (
                      <div className="mt-auto">
                        <div className={`h-1 w-full rounded-full ${i === 2 ? "bg-purple-500" : "bg-green-500"}`}></div>
                        <div className="text-xs mt-1 line-clamp-2">
                          {i === 2 ? "Video Upload" : "Live Session"}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <FloatingNav />
      </motion.div>
    </AnimatedBackgroundContainer>
  )
}
