"use client"

import { useState, ReactElement } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Upload, Clock, AlertCircle, Info, LucideIcon, CheckCircle2, FileVideo, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { FloatingNav } from "@/components/ui/floating-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UploadStatus {
  id: string
  name: string
  progress: number
  size: string
  status: "uploading" | "processing" | "complete" | "error"
  errorMessage?: string
}

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [contentWarning, setContentWarning] = useState(false)
  const [visibility, setVisibility] = useState("private")
  const [categoryTags, setCategoryTags] = useState("")
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number | null>(null)
  const [uploadingFiles, setUploadingFiles] = useState<UploadStatus[]>([])
  const [activeTab, setActiveTab] = useState("upload")

  // Mock past uploads
  const pastUploads = [
    {
      id: "vid-123",
      title: "My first anonymous story",
      date: "2 days ago",
      views: 423,
      likes: 56,
      status: "published",
      thumbnail: "/thumbnails/1.jpg",
      duration: "5:27",
    },
    {
      id: "vid-124",
      title: "Travel vlog #3 - Hidden gems",
      date: "1 week ago",
      views: 1243,
      likes: 198,
      status: "published",
      thumbnail: "/thumbnails/2.jpg",
      duration: "12:08",
    },
    {
      id: "vid-125",
      title: "Personal reflection on career change",
      date: "2 weeks ago",
      views: 87,
      likes: 12,
      status: "private",
      thumbnail: "/thumbnails/3.jpg",
      duration: "8:45",
    },
  ]

  const thumbnailOptions = [
    { id: 1, src: "/thumbnails/auto-1.jpg" },
    { id: 2, src: "/thumbnails/auto-2.jpg" },
    { id: 3, src: "/thumbnails/auto-3.jpg" },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles: UploadStatus[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      progress: 0,
      size: formatFileSize(file.size),
      status: "uploading",
    }))

    setUploadingFiles([...uploadingFiles, ...newFiles])

    // Simulate uploading with progress
    newFiles.forEach(newFile => {
      const uploadInterval = setInterval(() => {
        setUploadingFiles(prev => prev.map(file => {
          if (file.id === newFile.id) {
            const newProgress = Math.min(file.progress + Math.random() * 10, 100)
            
            // If upload is complete, change status to processing
            if (newProgress === 100) {
              clearInterval(uploadInterval)
              
              // Simulate processing
              setTimeout(() => {
                setUploadingFiles(prev => prev.map(f => 
                  f.id === newFile.id ? { ...f, status: "processing" } : f
                ))
                
                // Simulate processing complete
                setTimeout(() => {
                  setUploadingFiles(prev => prev.map(f => 
                    f.id === newFile.id ? { ...f, status: "complete" } : f
                  ))
                }, 3000)
              }, 1000)
              
              return { ...file, progress: newProgress }
            }
            
            return { ...file, progress: newProgress }
          }
          return file
        }))
      }, 500)
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleRemoveFile = (id: string) => {
    setUploadingFiles(uploadingFiles.filter(file => file.id !== id))
  }

  const StatusIcon = ({ status }: { status: UploadStatus["status"] }): ReactElement => {
    const icons: Record<UploadStatus["status"], { icon: LucideIcon; color: string }> = {
      uploading: { icon: Upload, color: "text-blue-400" },
      processing: { icon: Clock, color: "text-yellow-400" },
      complete: { icon: CheckCircle2, color: "text-green-400" },
      error: { icon: AlertCircle, color: "text-red-400" },
    }
    
    const { icon: Icon, color } = icons[status]
    return <Icon className={`h-4 w-4 ${color}`} />
  }

  const handleSubmit = () => {
    console.log({
      title,
      description,
      isAnonymous,
      contentWarning,
      visibility,
      categoryTags: categoryTags.split(",").map(tag => tag.trim()),
      selectedThumbnail: selectedThumbnailIndex !== null ? thumbnailOptions[selectedThumbnailIndex] : null,
      uploadedFiles: uploadingFiles.filter(file => file.status === "complete"),
    })
    
    // In a real app, this would post to an API
    alert("Video details saved! Your video will be published according to your visibility settings.")
  }

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
        className="min-h-screen text-white pb-20"
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-xl font-bold">Upload Video</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="manage">Manage Uploads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Video Upload Area */}
                <div className="md:col-span-2">
                  <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                    <CardHeader>
                      <CardTitle>Upload Video</CardTitle>
                      <CardDescription className="text-white/60">
                        Select a video file to upload. Max file size: 1GB.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {uploadingFiles.length === 0 ? (
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                          <FileVideo className="h-12 w-12 text-white/40 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Drag and drop or browse files</h3>
                          <p className="text-white/60 mb-4">
                            Supported formats: MP4, MOV, AVI, WebM (max 1GB)
                          </p>
                          <Button asChild variant="outline" className="bg-white/5 hover:bg-white/10">
                            <label>
                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={handleFileUpload}
                              />
                              Select Video
                            </label>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {uploadingFiles.map((file) => (
                            <div key={file.id} className="bg-black/40 rounded-lg p-4 relative">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <StatusIcon status={file.status} />
                                  <div>
                                    <p className="font-medium truncate max-w-[250px]">{file.name}</p>
                                    <p className="text-xs text-white/60">{file.size}</p>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6"
                                  onClick={() => handleRemoveFile(file.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="space-y-1">
                                <Progress value={file.progress} className="h-2" />
                                <div className="flex justify-between text-xs">
                                  <span className="text-white/60">
                                    {file.status === "uploading" 
                                      ? `${Math.round(file.progress)}%` 
                                      : file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                                  </span>
                                  {file.status === "error" && <span className="text-red-400">{file.errorMessage}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <Button asChild variant="outline" className="w-full bg-white/5 hover:bg-white/10">
                            <label>
                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={handleFileUpload}
                                multiple
                              />
                              Upload More
                            </label>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Video Details */}
                  <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10 mt-6">
                    <CardHeader>
                      <CardTitle>Video Details</CardTitle>
                      <CardDescription className="text-white/60">
                        Add information about your video
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter a title for your video"
                          className="bg-white/5 border-white/10"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your video (optional)"
                          className="bg-white/5 border-white/10 min-h-[100px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tags">Category Tags</Label>
                        <Input
                          id="tags"
                          placeholder="Add tags separated by commas (e.g. travel, music, art)"
                          className="bg-white/5 border-white/10"
                          value={categoryTags}
                          onChange={(e) => setCategoryTags(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {thumbnailOptions.map((thumb, index) => (
                            <div 
                              key={thumb.id}
                              className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${
                                selectedThumbnailIndex === index 
                                  ? "border-purple-500" 
                                  : "border-transparent"
                              }`}
                              onClick={() => setSelectedThumbnailIndex(index)}
                            >
                              <div className="bg-gray-800 h-full w-full flex items-center justify-center">
                                <span className="text-xs text-white/60">Thumbnail {index + 1}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-white/60">
                          Select a thumbnail or upload a custom one
                        </p>
                        <Button variant="outline" size="sm" className="mt-2 bg-white/5 hover:bg-white/10">
                          Upload Custom
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Privacy Settings */}
                <div className="md:col-span-1">
                  <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10 sticky top-24">
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription className="text-white/60">
                        Control how your video appears
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Visibility</h3>
                        <RadioGroup value={visibility} onValueChange={setVisibility} className="space-y-2">
                          <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                            <div className="space-y-0.5">
                              <Label htmlFor="visibility-private" className="font-normal">Private</Label>
                              <p className="text-xs text-white/60">
                                Only you can view
                              </p>
                            </div>
                            <RadioGroupItem value="private" id="visibility-private" />
                          </div>
                          <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                            <div className="space-y-0.5">
                              <Label htmlFor="visibility-unlisted" className="font-normal">Unlisted</Label>
                              <p className="text-xs text-white/60">
                                Anyone with the link can view
                              </p>
                            </div>
                            <RadioGroupItem value="unlisted" id="visibility-unlisted" />
                          </div>
                          <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                            <div className="space-y-0.5">
                              <Label htmlFor="visibility-public" className="font-normal">Public</Label>
                              <p className="text-xs text-white/60">
                                Visible in feeds and search
                              </p>
                            </div>
                            <RadioGroupItem value="public" id="visibility-public" />
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="anonymity" className="font-normal">Anonymous Mode</Label>
                            <p className="text-xs text-white/60">
                              Hide your identity from viewers
                            </p>
                          </div>
                          <Switch 
                            id="anonymity"
                            checked={isAnonymous}
                            onCheckedChange={setIsAnonymous}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="content-warning" className="font-normal">Content Warning</Label>
                            <p className="text-xs text-white/60">
                              Show a warning before video plays
                            </p>
                          </div>
                          <Switch 
                            id="content-warning"
                            checked={contentWarning}
                            onCheckedChange={setContentWarning}
                          />
                        </div>
                      </div>
                      
                      <Separator className="bg-white/10" />
                      
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700" 
                        disabled={uploadingFiles.length === 0 || !uploadingFiles.some(f => f.status === "complete") || !title}
                        onClick={handleSubmit}
                      >
                        Publish Video
                      </Button>
                      
                      <div className="rounded-md bg-purple-500/10 p-3 border border-purple-500/20">
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-purple-400 mt-0.5 mr-2" />
                          <p className="text-xs text-purple-300">
                            All videos are reviewed for compliance with our community guidelines before being published publicly.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="manage">
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle>Your Uploads</CardTitle>
                  <CardDescription className="text-white/60">
                    Manage your previous uploads and check their stats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {pastUploads.map((video) => (
                        <div key={video.id} className="bg-black/40 rounded-lg overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-48 relative">
                              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white/60">Thumbnail</span>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="p-4 flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium mb-1">{video.title}</h3>
                                  <div className="flex items-center gap-4">
                                    <p className="text-xs text-white/60">Uploaded {video.date}</p>
                                    <Badge className={`${
                                      video.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                                    }`}>
                                      {video.status === "published" ? "Published" : "Private"}
                                    </Badge>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="bg-white/5 hover:bg-white/10">
                                  Edit
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="bg-white/5 p-3 rounded-md">
                                  <p className="text-xs text-white/60">Views</p>
                                  <p className="font-medium">{video.views}</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-md">
                                  <p className="text-xs text-white/60">Likes</p>
                                  <p className="font-medium">{video.likes}</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-md">
                                  <p className="text-xs text-white/60">Engagement</p>
                                  <p className="font-medium">{Math.round((video.likes / video.views) * 100)}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
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
