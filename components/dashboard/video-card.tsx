"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"

interface VideoCardProps {
  title: string
  username: string
  tags: string[]
  likes: number
  comments: number
  isLive: boolean
  viewers?: number
}

export function VideoCard({ title, username, tags, likes, comments, isLive, viewers }: VideoCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <GlowCard
        glowColor={isLive ? "rgba(239, 68, 68, 0.5)" : "rgba(147, 51, 234, 0.5)"}
        glowIntensity={isLive ? "high" : "medium"}
      >
        <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                {username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{username}</p>
              <div className="flex items-center gap-2 mt-1">
                {tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-white/5">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {isLive && (
            <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">LIVE {viewers && `• ${viewers}`}</Badge>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-video bg-black/40 rounded-md mb-3 overflow-hidden relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${liked ? "text-red-500" : "text-white/60 hover:text-white"}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-white/60 hover:text-white">
              <MessageCircle className="h-4 w-4" />
              <span>{comments}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </GlowCard>
    </motion.div>
  )
}
