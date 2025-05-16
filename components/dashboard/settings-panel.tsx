"use client"

import { useState } from "react"
import { Check, Moon, Sun, Monitor, Shield, Eye, EyeOff } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { AnonymousModeToggle } from "@/components/auth/anonymous-mode-toggle"
import { useAuth } from "@/contexts/auth-context"
import { useAuthentication } from "@/hooks/use-authentication"

export function SettingsPanel() {
  const [theme, setTheme] = useState("system")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoPlayVideos, setAutoPlayVideos] = useState(false)
  const [privacyMode, setPrivacyMode] = useState("balanced")
  const { user } = useAuth()
  const { handleLogout } = useAuthentication()

  return (
    <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Appearance</h3>
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
              <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                <div className="flex items-center space-x-3">
                  <Sun className="h-4 w-4 text-white/60" />
                  <Label htmlFor="theme-light" className="font-normal">Light</Label>
                </div>
                <RadioGroupItem value="light" id="theme-light" />
              </div>
              <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                <div className="flex items-center space-x-3">
                  <Moon className="h-4 w-4 text-white/60" />
                  <Label htmlFor="theme-dark" className="font-normal">Dark</Label>
                </div>
                <RadioGroupItem value="dark" id="theme-dark" />
              </div>
              <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-4 w-4 text-white/60" />
                  <Label htmlFor="theme-system" className="font-normal">System</Label>
                </div>
                <RadioGroupItem value="system" id="theme-system" />
              </div>
            </RadioGroup>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md bg-white/5 p-3">
                <Label htmlFor="notifications" className="font-normal">Enable notifications</Label>
                <Switch 
                  id="notifications" 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>
              <div className="flex items-center justify-between rounded-md bg-white/5 p-3">
                <Label htmlFor="sounds" className="font-normal">Enable sounds</Label>
                <Switch 
                  id="sounds" 
                  checked={soundEnabled} 
                  onCheckedChange={setSoundEnabled} 
                />
              </div>
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Content</h3>
            <div className="flex items-center justify-between rounded-md bg-white/5 p-3">
              <Label htmlFor="autoplay" className="font-normal">Auto-play videos</Label>
              <Switch 
                id="autoplay" 
                checked={autoPlayVideos} 
                onCheckedChange={setAutoPlayVideos} 
              />
            </div>
          </div>
        </TabsContent>
          <TabsContent value="privacy" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Identity</h3>
            <div className="rounded-md bg-white/5 p-3">
              <AnonymousModeToggle />
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Privacy Mode</h3>
            <RadioGroup value={privacyMode} onValueChange={setPrivacyMode} className="space-y-2">
              <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="privacy-standard" className="font-normal">Standard</Label>
                  <p className="text-xs text-white/60">Basic privacy with standard features</p>
                </div>
                <RadioGroupItem value="standard" id="privacy-standard" />
              </div>
              <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="privacy-balanced" className="font-normal">Balanced</Label>
                  <p className="text-xs text-white/60">Enhanced privacy with most features</p>
                </div>
                <RadioGroupItem value="balanced" id="privacy-balanced" />
              </div>
              <div className="flex items-center justify-between space-x-2 rounded-md bg-white/5 p-3">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="privacy-strict" className="font-normal">Strict</Label>
                  <p className="text-xs text-white/60">Maximum privacy with limited features</p>
                </div>
                <RadioGroupItem value="strict" id="privacy-strict" />
              </div>
            </RadioGroup>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Content Visibility</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md bg-white/5 p-3">
                <Label htmlFor="profile-visibility" className="font-normal">Profile visibility</Label>
                <select id="profile-visibility" className="bg-black/50 text-white text-sm border border-white/10 rounded p-1">
                  <option value="everyone">Everyone</option>
                  <option value="connections">Connections only</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-md bg-white/5 p-3">
                <Label htmlFor="content-visibility" className="font-normal">Content visibility</Label>
                <select id="content-visibility" className="bg-black/50 text-white text-sm border border-white/10 rounded p-1">
                  <option value="everyone">Everyone</option>
                  <option value="connections">Connections only</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>
            </div>
          </div>
        </TabsContent>
          <TabsContent value="account" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Account Information</h3>
            <div className="space-y-2">
              <div className="flex flex-col space-y-1 rounded-md bg-white/5 p-3">
                <Label htmlFor="username" className="font-normal">Username</Label>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80">{user?.username || "Anonymous429"}</p>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-white/20 bg-white/5">
                    Change
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-1 rounded-md bg-white/5 p-3">
                <Label htmlFor="email" className="font-normal">Email</Label>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80">
                    {user?.email ? 
                      user.email.replace(/(.{2})(.*)(@.*)/, "$1****$3") : 
                      "a**********@example.com"}
                  </p>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-white/20 bg-white/5">
                    Change
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Membership</h3>
            <div className="rounded-md bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-purple-300">{user?.isPremium ? "Premium Plan" : "Free Plan"}</h4>
                {user?.isPremium ? (
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">Active</Badge>
                ) : (
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">Upgrade</Badge>
                )}
              </div>
              <p className="text-xs text-white/60 mb-3">
                {user?.isPremium 
                  ? "Your premium membership renews on June 15, 2025" 
                  : "Upgrade to Premium for enhanced features and no ads"}
              </p>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white/80 hover:bg-white/10 w-full">
                {user?.isPremium ? "Manage Subscription" : "Upgrade to Premium"}
              </Button>
            </div>
          </div>
            <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white/80 hover:bg-white/10 w-full">
                Download My Data
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full bg-red-900/50 hover:bg-red-800/60 text-white"
                onClick={handleLogout}
              >
                Log Out
              </Button>
              <Button variant="destructive" size="sm" className="w-full bg-red-900/50 hover:bg-red-800/60 text-white">
                Delete Account
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </ScrollArea>
  )
}
