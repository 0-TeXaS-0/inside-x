"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ThumbsDown, Flag, MoreVertical, Reply, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    isAnonymous: boolean
    isOwner?: boolean
  }
  content: string
  timestamp: string
  likes: number
  dislikes: number
  replies?: Comment[]
  liked?: boolean
  disliked?: boolean
}

interface VideoCommentsProps {
  videoId: string
  totalComments?: number
  className?: string
}

export function VideoComments({ videoId, totalComments = 0, className = "" }: VideoCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      author: {
        name: "Anonymous User",
        avatar: "AU",
        isAnonymous: true,
      },
      content: "This video was incredibly moving. I've never seen such a raw and honest perspective on this topic before. Thank you for being brave enough to share this.",
      timestamp: "2 days ago",
      likes: 42,
      dislikes: 3,
    },
    {
      id: "c2",
      author: {
        name: "Maya Johnson",
        avatar: "MJ",
        isAnonymous: false,
      },
      content: "I really appreciate the editing style you used here. The way you transitioned between scenes made the story flow perfectly.",
      timestamp: "1 day ago",
      likes: 18,
      dislikes: 0,
      replies: [
        {
          id: "r1",
          author: {
            name: "Video Creator",
            avatar: "VC",
            isAnonymous: true,
            isOwner: true,
          },
          content: "Thanks so much! I spent a lot of time on those transitions, glad they worked well.",
          timestamp: "1 day ago",
          likes: 8,
          dislikes: 0,
        },
        {
          id: "r2",
          author: {
            name: "Tech Enthusiast",
            avatar: "TE",
            isAnonymous: false,
          },
          content: "What software did you use for editing? The quality is outstanding!",
          timestamp: "20 hours ago",
          likes: 3,
          dislikes: 0,
        }
      ]
    },
    {
      id: "c3",
      author: {
        name: "Anonymous User",
        avatar: "AU",
        isAnonymous: true,
      },
      content: "I had a similar experience and never felt comfortable sharing it. Seeing someone else talk about it makes me feel less alone.",
      timestamp: "15 hours ago",
      likes: 27,
      dislikes: 1,
    },
  ])

  const [commentText, setCommentText] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (replyingTo && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [replyingTo])

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: {
        name: "You",
        avatar: "YO",
        isAnonymous: true,
      },
      content: commentText,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  const handleReplySubmit = (commentId: string) => {
    if (!replyText.trim()) return

    const newReply: Comment = {
      id: `r${Date.now()}`,
      author: {
        name: "You",
        avatar: "YO",
        isAnonymous: true,
      },
      content: replyText,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [newReply, ...(comment.replies || [])]
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyText("")
    setReplyingTo(null)
  }

  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                if (reply.liked) {
                  return { ...reply, likes: reply.likes - 1, liked: false }
                } else {
                  const newReply = { ...reply, likes: reply.likes + 1, liked: true }
                  if (reply.disliked) {
                    newReply.dislikes = reply.dislikes - 1
                    newReply.disliked = false
                  }
                  return newReply
                }
              }
              return reply
            })
          }
        }
        return comment
      }))
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          if (comment.liked) {
            return { ...comment, likes: comment.likes - 1, liked: false }
          } else {
            const newComment = { ...comment, likes: comment.likes + 1, liked: true }
            if (comment.disliked) {
              newComment.dislikes = comment.dislikes - 1
              newComment.disliked = false
            }
            return newComment
          }
        }
        return comment
      }))
    }
  }

  const handleDislike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                if (reply.disliked) {
                  return { ...reply, dislikes: reply.dislikes - 1, disliked: false }
                } else {
                  const newReply = { ...reply, dislikes: reply.dislikes + 1, disliked: true }
                  if (reply.liked) {
                    newReply.likes = reply.likes - 1
                    newReply.liked = false
                  }
                  return newReply
                }
              }
              return reply
            })
          }
        }
        return comment
      }))
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          if (comment.disliked) {
            return { ...comment, dislikes: comment.dislikes - 1, disliked: false }
          } else {
            const newComment = { ...comment, dislikes: comment.dislikes + 1, disliked: true }
            if (comment.liked) {
              newComment.likes = comment.likes - 1
              newComment.liked = false
            }
            return newComment
          }
        }
        return comment
      }))
    }
  }

  const deleteComment = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== commentId)
          }
        }
        return comment
      }))
    } else {
      setComments(comments.filter(comment => comment.id !== commentId))
    }
  }

  const filteredComments = activeTab === "all" 
    ? comments 
    : activeTab === "popular" 
      ? [...comments].sort((a, b) => b.likes - a.likes)
      : comments.filter(c => (c.author.isOwner || (c.replies && c.replies.some(r => r.author.isOwner))))

  const renderComment = (comment: Comment, isReply: boolean = false, parentId?: string) => (
    <div key={comment.id} className={`${isReply ? 'ml-12 mt-3' : 'border-t border-white/10 py-4'}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className={`text-xs ${comment.author.isOwner ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}>
            {comment.author.avatar}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {comment.author.name}
              {comment.author.isAnonymous && <span className="text-xs text-white/60 ml-1">(Anonymous)</span>}
            </p>
            {comment.author.isOwner && (
              <Badge variant="outline" className="text-xs py-0 h-5 bg-purple-500/20 text-purple-400 border-purple-500/40">
                Creator
              </Badge>
            )}
            <span className="text-xs text-white/60">{comment.timestamp}</span>
          </div>
          
          <p className="text-sm text-white/90">{comment.content}</p>
          
          <div className="flex gap-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${comment.liked ? 'text-purple-400' : 'text-white/60'} hover:bg-white/5`}
              onClick={() => handleLike(comment.id, isReply, parentId)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{comment.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${comment.disliked ? 'text-red-400' : 'text-white/60'} hover:bg-white/5`}
              onClick={() => handleDislike(comment.id, isReply, parentId)}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span className="text-xs">{comment.dislikes}</span>
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-white/60 hover:bg-white/5"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Reply className="h-4 w-4 mr-1" />
                <span className="text-xs">Reply</span>
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-white/60 hover:bg-white/5">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
                <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-950/50" onClick={() => deleteComment(comment.id, isReply, parentId)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-gray-700">YO</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  ref={textareaRef}
                  placeholder="Add a reply..."
                  className="bg-white/5 border-white/10 min-h-[80px] text-sm"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyText("")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleReplySubmit(comment.id)}
                    disabled={!replyText.trim()}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3 mt-3">
          {comment.replies.map(reply => renderComment(reply, true, comment.id))}
        </div>
      )}
    </div>
  )

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-4">Comments ({totalComments + comments.length})</h3>
        
        <div className="flex gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-gray-700">YO</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              className="bg-white/5 border-white/10 min-h-[100px]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <p className="text-xs text-white/60">
                  Commenting as <span className="font-medium">Anonymous User</span>
                </p>
              </div>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="all">All Comments</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="creator">Creator Responses</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="max-h-[600px] pr-4">
        <div className="space-y-1">
          {filteredComments.length > 0 ? (
            filteredComments.map(comment => renderComment(comment))
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
