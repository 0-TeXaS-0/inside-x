"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Bookmark, 
  Flag, 
  MoreVertical, 
  User,
  Heart,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { VideoComments } from "@/components/dashboard/video-comments"
import { VideoCard } from "@/components/dashboard/video-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { FloatingNav } from "@/components/ui/floating-nav"

interface VideoPageProps {
  params: {
    id: string
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [activeTab, setActiveTab] = useState("comments")
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Mock video data
  const videoData = {
    id: params.id || "v1",
    title: "The Hidden Side of Modern Society - A Personal Reflection",
    views: 12843,
    likes: 1256,
    uploadedAt: "2 weeks ago",
    author: {
      name: "Anonymous Creator",
      avatar: "AC",
      isAnonymous: true,
    },
    description: `This video explores the aspects of modern society that we often overlook in our daily lives. Through personal experiences and observations, I share my perspective on community, technology, and human connection in today's world.
    
Note: This video was created anonymously to allow for honest expression without fear of judgment or personal repercussions. The Inside X platform enables creators to share perspectives that might otherwise remain hidden.`,
    tags: ["Society", "Personal", "Reflection", "Technology", "Human Connection"],
    videoUrl: "https://example.com/videos/sample.mp4", // In a real app, this would be a proper video URL
  }

  // Mock related videos
  const relatedVideos = [
    {
      id: "v2",
      title: "Finding Authentic Connection in a Digital World",
      thumbnail: "/thumbnails/1.jpg",
      duration: "8:24",
      views: 8723,
      uploadedAt: "3 weeks ago",
      author: "Mindful Observer",
    },
    {
      id: "v3",
      title: "The Untold Effects of Social Media on Mental Health",
      thumbnail: "/thumbnails/2.jpg",
      duration: "15:12",
      views: 23541,
      uploadedAt: "1 month ago",
      author: "Anonymous Psychologist",
    },
    {
      id: "v4",
      title: "Creating Boundaries in the Age of Always-On Culture",
      thumbnail: "/thumbnails/3.jpg",
      duration: "12:05",
      views: 5892,
      uploadedAt: "2 weeks ago",
      author: "Life Balance",
    },
    {
      id: "v5",
      title: "The Power of Vulnerability - My Personal Journey",
      thumbnail: "/thumbnails/4.jpg",
      duration: "18:37",
      views: 15421,
      uploadedAt: "5 days ago",
      author: "Anonymous Storyteller",
    },
  ]

  // Video player controls
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
    videoElement.addEventListener('ended', handleEnded)

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
      videoElement.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.play().catch(() => {
        // Autoplay was prevented, handle accordingly
        setIsPlaying(false)
      })
    } else {
      videoElement.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * duration

    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.currentTime + 15, duration)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(videoRef.current.currentTime - 15, 0)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current)
    }
    
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
    } else {
      setIsLiked(true)
      setIsDisliked(false)
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false)
    } else {
      setIsDisliked(true)
      setIsLiked(false)
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <AnimatedBackgroundContainer
      particleCount={20}
      connectionDistance={100}
      colorScheme="purple"
      density={0.2}
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
              <h1 className="text-xl font-bold truncate max-w-[240px] md:max-w-md">
                {videoData.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div
                ref={containerRef}
                className="aspect-video bg-black rounded-lg overflow-hidden relative mb-4"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* Video Element - In a real app, this would use a proper video URL */}
                <div className="bg-gray-900 w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white/70">Video player would appear here</p>
                    <p className="text-xs text-white/50 mt-2">
                      (This is a demo UI without actual video playback)
                    </p>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div 
                  className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Top controls */}
                  <div className="flex justify-end">
                    <Badge className="bg-red-500 hover:bg-red-600">LIVE</Badge>
                  </div>
                  
                  {/* Middle controls */}
                  <div className="flex justify-center items-center gap-8">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                      onClick={skipBackward}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-16 w-16 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                      onClick={skipForward}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  {/* Bottom controls */}
                  <div className="space-y-2">
                    <div
                      className="w-full h-1 bg-white/20 rounded-full cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                          onClick={togglePlay}
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                            onClick={toggleMute}
                          >
                            {isMuted ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-16 md:w-24 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                          />
                        </div>
                        
                        <span className="text-xs text-white/80">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                          onClick={toggleFullscreen}
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{videoData.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60 mb-4">
                  <span>{videoData.views.toLocaleString()} views</span>
                  <span>{videoData.uploadedAt}</span>
                  {videoData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-white/5 hover:bg-white/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button
                    variant="ghost"
                    onClick={handleLike}
                    className={`${isLiked ? 'text-purple-400' : 'text-white/80'} hover:bg-white/5`}
                  >
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    {isLiked ? videoData.likes + 1 : videoData.likes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleDislike}
                    className={`${isDisliked ? 'text-red-400' : 'text-white/80'} hover:bg-white/5`}
                  >
                    <ThumbsDown className="h-5 w-5 mr-2" />
                    Dislike
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleSave}
                    className={`${isSaved ? 'text-yellow-400' : 'text-white/80'} hover:bg-white/5`}
                  >
                    <Bookmark className={`h-5 w-5 mr-2 ${isSaved ? 'fill-yellow-400' : ''}`} />
                    Save
                  </Button>
                  
                  <Button variant="ghost" className="text-white/80 hover:bg-white/5">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white/80 hover:bg-white/5">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
                      <DropdownMenuItem className="flex items-center">
                        <Flag className="h-4 w-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                          {videoData.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{videoData.author.name}</p>
                        {videoData.author.isAnonymous && (
                          <p className="text-xs text-white/60">Anonymous creator</p>
                        )}
                      </div>
                    </div>
                    
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Heart className="h-4 w-4 mr-2" />
                      Support Creator
                    </Button>
                  </div>
                  
                  <p className="text-sm whitespace-pre-line">{videoData.description}</p>
                </div>
              </div>

              {/* Comments Section */}
              <Tabs defaultValue="comments" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-gray-800/50 mb-4">
                  <TabsTrigger value="comments" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="transcript" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Creator Notes
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="comments">
                  <VideoComments videoId={videoData.id} totalComments={24} />
                </TabsContent>
                
                <TabsContent value="transcript">
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Creator Notes</h3>
                    <div className="space-y-4 text-white/80">
                      <p>This video was created as a way to express thoughts that I've been reflecting on for some time now. The anonymity of Inside X provided me with a platform to speak freely.</p>
                      <p>I recorded this over the course of two weeks, gathering footage from various locations that I felt represented the contrast between connection and isolation in modern society.</p>
                      <p>Some of the statistics mentioned were sourced from recent studies on social isolation and technology use. I've included links to these studies in the video description for those interested in learning more.</p>
                      <p>Thank you to everyone who watches and engages with this content. I hope it provides some value and perspective.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Related Videos */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-medium mb-4">Related Videos</h3>
                <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
                  <div className="space-y-4">
                    {relatedVideos.map((video) => (
                      <div key={video.id} className="group">
                        <Link href={`/video/${video.id}`} className="block">
                          <div className="grid grid-cols-5 gap-3">
                            <div className="col-span-2 aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Play className="w-4 h-4 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="col-span-3">
                              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-purple-400 transition-colors">
                                {video.title}
                              </h4>
                              <p className="text-xs text-white/60 mt-1">{video.author}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-white/60">{video.views.toLocaleString()} views</p>
                                <span className="text-xs text-white/40">•</span>
                                <p className="text-xs text-white/60">{video.uploadedAt}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>

        <FloatingNav />
      </motion.div>
    </AnimatedBackgroundContainer>
  )
}
