"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { EyeOff, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AnonymousModeToggle() {
  const { user, toggleAnonymousMode } = useAuth()
  const { toast } = useToast()
  const isAnonymous = user?.isAnonymous || false
  
  const handleToggle = () => {
    toggleAnonymousMode()
    
    toast({
      title: isAnonymous ? "Anonymous mode disabled" : "Anonymous mode enabled",
      description: isAnonymous 
        ? "Your identity is now visible to others" 
        : "Your identity is now hidden from others",
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      <div className={`p-2 rounded-full ${isAnonymous ? 'bg-purple-500/20' : 'bg-gray-700/50'}`}>
        {isAnonymous ? (
          <EyeOff className="h-4 w-4 text-purple-400" />
        ) : (
          <Eye className="h-4 w-4 text-gray-400" />
        )}
      </div>
      
      <div className="flex-1">
        <Label htmlFor="anonymous-mode" className="text-sm font-medium">
          Anonymous Mode
        </Label>
        <p className="text-xs text-white/60">
          {isAnonymous 
            ? "Your identity is hidden" 
            : "Your identity is visible"}
        </p>
      </div>
      
      <Switch
        id="anonymous-mode"
        checked={isAnonymous}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-purple-600"
      />
    </motion.div>
  )
}
