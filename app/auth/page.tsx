"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Apple, AtSign, Eye, EyeOff, Lock, User, Mail, Check, Info, AlertCircle, Github, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { GlowCard } from "@/components/ui/glow-card"
import { AnimatedText } from "@/components/ui/animated-text"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    rememberMe: false,
    agreeToTerms: false
  })
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  // Simulate loading state for demo purposes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    const newErrors = { ...errors }
    let hasError = false
    
    if (activeTab === "signup") {
      if (!formState.username) {
        newErrors.username = "Username is required"
        hasError = true
      } else {
        newErrors.username = ""
      }
      
      if (!formState.email) {
        newErrors.email = "Email is required"
        hasError = true
      } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
        newErrors.email = "Email is invalid"
        hasError = true
      } else {
        newErrors.email = ""
      }
      
      if (!formState.password) {
        newErrors.password = "Password is required"
        hasError = true
      } else if (formState.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
        hasError = true
      } else {
        newErrors.password = ""
      }
      
      if (formState.password !== formState.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
        hasError = true
      } else {
        newErrors.confirmPassword = ""
      }
      
      if (!formState.agreeToTerms) {
        newErrors.terms = "You must agree to the terms"
        hasError = true
      } else {
        newErrors.terms = ""
      }
    } else {
      // Login validation
      if (!formState.username && !formState.email) {
        newErrors.username = "Username or email is required"
        hasError = true
      } else {
        newErrors.username = ""
      }
      
      if (!formState.password) {
        newErrors.password = "Password is required"
        hasError = true
      } else {
        newErrors.password = ""
      }
    }
    
    setErrors(newErrors)
    
    if (!hasError) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to dashboard on successful login/signup
        window.location.href = "/dashboard"
      }, 1500)
    }
  }
  
  const handleInputChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }

  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formState
    if (!password) return { strength: 0, text: "" }
    
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    
    const strengthText = ["Weak", "Fair", "Good", "Strong"][strength - 1] || ""
    return { strength, text: strengthText }
  }
  
  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <AnimatedBackground
        particleCount={80}
        connectionDistance={140}
        colorScheme="purple"
        interactive={true}
        density={0.8}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.15] via-transparent to-pink-500/[0.15] pointer-events-none" />
      
      <div className="absolute top-0 left-0 w-full p-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2 
            }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            InsideX
          </motion.div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 w-full max-w-5xl gap-8 relative z-10">
        {/* Left side - Authentication form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlowCard glowColor="rgba(168, 85, 247, 0.4)" className="overflow-hidden">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <AnimatedText
                  text="Welcome to Inside X"
                  className="text-2xl font-bold text-white"
                  once={true}
                  delay={0.05}
                />
                <p className="text-white/60 mt-2">Your anonymous video social platform</p>
              </div>

              <Tabs defaultValue="login" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-8 bg-black/20">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <AnimatePresence key="auth-tabs" mode="wait" initial={false}>
                  {activeTab === "login" && (
                    <motion.div
                      key="login-tab"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-white/70 text-sm ml-1">
                            Username or Email
                          </Label>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                            <Input
                              id="username"
                              type="text"
                              value={formState.username}
                              onChange={(e) => handleInputChange("username", e.target.value)}
                              placeholder="Username or Email"
                              className={cn(
                                "pl-10 bg-white/5 border-white/10 text-white",
                                errors.username && "border-red-500/50 focus-visible:ring-red-500"
                              )}
                            />
                            {errors.username && (
                              <div className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.username}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-white/70 text-sm ml-1">
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={formState.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              placeholder="Password"
                              className={cn(
                                "pl-10 bg-white/5 border-white/10 text-white",
                                errors.password && "border-red-500/50 focus-visible:ring-red-500"
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 text-white/40 hover:text-white"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                            {errors.password && (
                              <div className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.password}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="remember" 
                                checked={formState.rememberMe}
                                onCheckedChange={(checked) => 
                                  handleInputChange("rememberMe", checked)
                                }
                              />
                              <label
                                htmlFor="remember"
                                className="text-sm text-white/60 cursor-pointer hover:text-white/80"
                              >
                                Remember me
                              </label>
                            </div>
                            <div className="text-right">
                              <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">
                                Forgot password?
                              </Link>
                            </div>
                          </div>
                        </div>

                        <AnimatedButton
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          disabled={isLoading}
                          glowColor="rgba(168, 85, 247, 0.5)"
                        >
                          {isLoading ? 
                            <div className="flex items-center justify-center gap-2">
                              <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                              Logging in...
                            </div> 
                            : "Login"
                          }
                        </AnimatedButton>
                      </form>
                    </motion.div>
                  )}

                  {activeTab === "signup" && (
                    <motion.div
                      key="signup-tab"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                          <Label htmlFor="display-name" className="text-white/70 text-sm ml-1">
                            Display Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                            <Input
                              id="display-name"
                              type="text"
                              value={formState.displayName}
                              onChange={(e) => handleInputChange("displayName", e.target.value)}
                              placeholder="How you'll appear to others"
                              className="pl-10 bg-white/5 border-white/10 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-username" className="text-white/70 text-sm ml-1">
                            Username
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3 w-3 ml-1 inline cursor-help text-white/40" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-black/90 border-white/10">
                                  <p className="text-xs max-w-xs">
                                    Choose a unique username that will identify you in the community
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                            <Input
                              id="signup-username"
                              type="text"
                              value={formState.username}
                              onChange={(e) => handleInputChange("username", e.target.value)}
                              placeholder="Username"
                              className={cn(
                                "pl-10 bg-white/5 border-white/10 text-white",
                                errors.username && "border-red-500/50 focus-visible:ring-red-500"
                              )}
                            />
                            {errors.username && (
                              <div className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.username}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-white/70 text-sm ml-1">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                            <Input
                              id="signup-email"
                              type="email"
                              value={formState.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="Email"
                              className={cn(
                                "pl-10 bg-white/5 border-white/10 text-white",
                                errors.email && "border-red-500/50 focus-visible:ring-red-500"
                              )}
                            />
                            {errors.email && (
                              <div className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="signup-password" className="text-white/70 text-sm ml-1">
                              Password
                            </Label>
                            {formState.password && (
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded",
                                passwordStrength.strength === 1 && "bg-red-500/20 text-red-400",
                                passwordStrength.strength === 2 && "bg-yellow-500/20 text-yellow-400",
                                passwordStrength.strength === 3 && "bg-blue-500/20 text-blue-400",
                                passwordStrength.strength === 4 && "bg-green-500/20 text-green-400",
                              )}>
                                {passwordStrength.text}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              value={formState.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              placeholder="Password"
                              className={cn(
                                "pl-10 bg-white/5 border-white/10 text-white",
                                errors.password && "border-red-500/50 focus-visible:ring-red-500"
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 text-white/40 hover:text-white"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                            {errors.password && (
                              <div className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.password}
                              </div>
                            )}
                          </div>
                          {formState.password && (
                            <div className="grid grid-cols-4 gap-1 mt-1">
                              <div className={`h-1 rounded-full ${passwordStrength.strength >= 1 ? 'bg-gradient-to-r from-red-500 to-red-400' : 'bg-white/10'}`}></div>
                              <div className={`h-1 rounded-full ${passwordStrength.strength >= 2 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-white/10'}`}></div>
                              <div className={`h-1 rounded-full ${passwordStrength.strength >= 3 ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-white/10'}`}></div>
                              <div className={`h-1 rounded-full ${passwordStrength.strength >= 4 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-white/10'}`}></div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="text-white/70 text-sm ml-1">
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                            <Input
                              id="confirm-password"
                              type={showPassword ? "text" : "password"}
                              value={formState.confirmPassword}
                              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                              placeholder="Confirm Password"
                              className={cn(
                                "pl-10 bg-white/5 border-white/10 text-white",
                                errors.confirmPassword && "border-red-500/50 focus-visible:ring-red-500"
                              )}
                            />
                            {errors.confirmPassword && (
                              <div className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.confirmPassword}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="terms" 
                              checked={formState.agreeToTerms}
                              onCheckedChange={(checked) => 
                                handleInputChange("agreeToTerms", checked)
                              }
                              className={errors.terms ? "border-red-500 text-red-500" : ""}
                            />
                            <label
                              htmlFor="terms"
                              className={cn("text-sm text-white/60 cursor-pointer hover:text-white/80", 
                                errors.terms && "text-red-400"
                              )}
                            >
                              I agree to the{" "}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="link" className="h-auto p-0 text-sm text-purple-400 hover:text-purple-300">
                                    Terms of Service
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-black/90 border-white/10 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Terms of Service</DialogTitle>
                                  </DialogHeader>
                                  <div className="text-sm text-white/70 max-h-[60vh] overflow-y-auto pr-2">
                                    <h3 className="font-semibold text-white mb-2">1. Introduction</h3>
                                    <p className="mb-4">
                                      Welcome to Inside X. By accessing or using our service, you agree to be bound by these Terms.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">2. Privacy Policy</h3>
                                    <p className="mb-4">
                                      Please review our Privacy Policy, which also governs your visit to our website, to understand our practices.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">3. Electronic Communications</h3>
                                    <p className="mb-4">
                                      When you use Inside X or send e-mails to us, you are communicating with us electronically. You consent to receive communications from us electronically.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">4. Your Account</h3>
                                    <p className="mb-4">
                                      You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">5. User Conduct</h3>
                                    <p className="mb-4">
                                      You agree not to use Inside X for any illegal or unauthorized purpose. You must not, in the use of our service, violate any laws in your jurisdiction.
                                    </p>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              {" "}and{" "}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="link" className="h-auto p-0 text-sm text-purple-400 hover:text-purple-300">
                                    Privacy Policy
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-black/90 border-white/10 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Privacy Policy</DialogTitle>
                                  </DialogHeader>
                                  <div className="text-sm text-white/70 max-h-[60vh] overflow-y-auto pr-2">
                                    <h3 className="font-semibold text-white mb-2">1. Information We Collect</h3>
                                    <p className="mb-4">
                                      We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">2. How We Use Information</h3>
                                    <p className="mb-4">
                                      We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Inside X and our users.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">3. Sharing of Information</h3>
                                    <p className="mb-4">
                                      We will not share your personal information with any third parties without your explicit consent, except as required by law.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">4. Security</h3>
                                    <p className="mb-4">
                                      We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                                    </p>
                                    
                                    <h3 className="font-semibold text-white mb-2">5. Your Choices</h3>
                                    <p className="mb-4">
                                      You can access and update certain information about you from within your account settings. You can also opt out of certain communications.
                                    </p>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </label>
                          </div>
                          {errors.terms && (
                            <div className="text-red-500 text-xs ml-6 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors.terms}
                            </div>
                          )}
                        </div>

                        <AnimatedButton
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          disabled={isLoading}
                          glowColor="rgba(168, 85, 247, 0.5)"
                        >
                          {isLoading ? 
                            <div className="flex items-center justify-center gap-2">
                              <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                              Creating Account...
                            </div> 
                            : "Sign Up"
                          }
                        </AnimatedButton>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-black px-2 text-white/60">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2">
                  <AnimatedButton variant="outline" className="border-white/10 text-white hover:bg-white/10" glowColor="rgba(59, 130, 246, 0.3)">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </AnimatedButton>
                  <AnimatedButton variant="outline" className="border-white/10 text-white hover:bg-white/10" glowColor="rgba(0, 0, 0, 0.3)">
                    <Apple className="h-4 w-4" />
                  </AnimatedButton>
                  <AnimatedButton variant="outline" className="border-white/10 text-white hover:bg-white/10" glowColor="rgba(37, 99, 235, 0.3)">
                    <Facebook className="h-4 w-4 text-blue-500" />
                  </AnimatedButton>
                  <AnimatedButton variant="outline" className="border-white/10 text-white hover:bg-white/10" glowColor="rgba(0, 0, 0, 0.3)">
                    <Github className="h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-white/60">
                <p>
                  {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                  <Button
                    variant="link"
                    className="p-0 text-purple-400 hover:text-purple-300"
                    onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                  >
                    {activeTab === "login" ? "Sign up" : "Login"}
                  </Button>
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Right side - Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex flex-col justify-center"
        >
          <div className="text-white space-y-6">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                Connect Anonymously
              </h2>
              <p className="text-white/70">
                Share your thoughts and moments without revealing your identity. Inside X provides a safe space for authentic expression.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Check className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Secure Video Conversations</h3>
                  <p className="text-white/60 text-sm">End-to-end encryption keeps your conversations private and secure.</p>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                <div className="bg-pink-500/20 p-2 rounded-lg">
                  <Check className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Join Communities</h3>
                  <p className="text-white/60 text-sm">Find and connect with people who share your interests and passions.</p>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                <div className="bg-violet-500/20 p-2 rounded-lg">
                  <Check className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Express with Stickers</h3>
                  <p className="text-white/60 text-sm">Collect and use unique stickers to express yourself during conversations.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-4"
            >
              <p className="text-white/60 text-sm text-center">
                "Inside X has changed how I connect online. I can truly be myself without worrying about judgment."
              </p>
              <p className="text-center mt-2 text-purple-400 text-sm font-medium">
                — Anonymous User
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
