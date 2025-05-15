"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Camera, Upload, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export default function AvatarStep({ avatar, username, updateAvatar, updateUsername }) {
  const [avatarColor, setAvatarColor] = useState(0)
  const fileInputRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false)

  const generateRandomAvatar = () => {
    // In a real app, this would generate or fetch a random avatar
    setAvatarColor((prev) => (prev + 60) % 360)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (event) => {
          updateAvatar(event.target.result)
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
      }, 1000)
    }
  }

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "IX"
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative"
      >
        <Avatar className="w-32 h-32 border-4 border-white/10">
          {avatar ? (
            <AvatarImage src={avatar || "/placeholder.svg"} alt="Profile" />
          ) : (
            <AvatarFallback
              className="text-3xl"
              style={{
                background: `linear-gradient(135deg, hsl(${avatarColor}, 70%, 50%), hsl(${
                  (avatarColor + 60) % 360
                }, 70%, 50%))`,
              }}
            >
              {getInitials(username)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="absolute -bottom-2 -right-2 flex space-x-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-8 w-8 bg-black/50 backdrop-blur-sm border-white/20"
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-8 w-8 bg-black/50 backdrop-blur-sm border-white/20"
            onClick={generateRandomAvatar}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
          disabled={isUploading}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Choose a unique username"
            value={username}
            onChange={(e) => updateUsername(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
          />
          <p className="text-xs text-white/60">This will be your public identity. You can change it later.</p>
        </div>

        {!avatar && (
          <div className="space-y-2">
            <Label>Avatar Color</Label>
            <Slider
              value={[avatarColor]}
              min={0}
              max={359}
              step={1}
              onValueChange={(value) => setAvatarColor(value[0])}
              className="py-4"
            />
            <div
              className="h-6 w-full rounded-md"
              style={{
                background: `linear-gradient(to right, 
                hsl(0, 70%, 50%), 
                hsl(60, 70%, 50%), 
                hsl(120, 70%, 50%), 
                hsl(180, 70%, 50%), 
                hsl(240, 70%, 50%), 
                hsl(300, 70%, 50%), 
                hsl(360, 70%, 50%))`,
              }}
            />
          </div>
        )}

        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Profile Picture"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
