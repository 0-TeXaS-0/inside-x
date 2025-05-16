"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Shield, User, Settings, LogOut, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AnonymousModeToggle } from "@/components/auth/anonymous-mode-toggle"
import { useAuthentication } from "@/hooks/use-authentication"

export function UserProfileMenu() {
  const { user } = useAuth()
  const { handleLogout } = useAuthentication()
  const router = useRouter()
  
  if (!user) return null
  
  // Generate a consistent color based on the username
  const avatarColor = user.username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360
  
  // Get user initials for the avatar fallback
  const getInitials = () => {
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    }
    return user.username.substring(0, 2).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-white/10">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.displayName || user.username} />
            ) : (
              <AvatarFallback
                style={{
                  background: `linear-gradient(135deg, hsl(${avatarColor}, 70%, 50%), hsl(${
                    (avatarColor + 60) % 360
                  }, 70%, 50%))`,
                }}
              >
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
          {user.isAnonymous && (
            <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-0.5">
              <Shield className="h-3 w-3 text-white" />
            </div>
          )}
          {user.isPremium && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-0.5">
              <Crown className="h-3 w-3 text-white" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-900/90 backdrop-blur-md border-white/10 text-white" align="end">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="font-medium">{user.displayName || user.username}</p>
              <p className="text-xs text-white/60 truncate">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuGroup>
            <AnonymousModeToggle />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-white/10"
              onClick={() => router.push("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-white/10"
              onClick={() => router.push("/dashboard?panel=settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem 
            className="cursor-pointer text-red-400 hover:bg-red-900/20 hover:text-red-300"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
