"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type LoginFormData = {
  usernameOrEmail: string
  password: string
  rememberMe: boolean
}

type SignupFormData = {
  username: string
  email: string
  displayName: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

type FormErrors = {
  usernameOrEmail?: string
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
  general?: string
}

export function useAuthentication() {
  const auth = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Validate login form
  const validateLoginForm = (data: LoginFormData): FormErrors => {
    const errors: FormErrors = {}

    if (!data.usernameOrEmail) {
      errors.usernameOrEmail = "Username or email is required"
    }

    if (!data.password) {
      errors.password = "Password is required"
    }

    return errors
  }

  // Validate signup form
  const validateSignupForm = (data: SignupFormData): FormErrors => {
    const errors: FormErrors = {}

    if (!data.username) {
      errors.username = "Username is required"
    }

    if (!data.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid"
    }

    if (!data.password) {
      errors.password = "Password is required"
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (!data.agreeToTerms) {
      errors.terms = "You must agree to the terms"
    }

    return errors
  }

  // Handle login
  const handleLogin = async (data: LoginFormData) => {
    const validationErrors = validateLoginForm(data)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true)
      try {
        await auth.login(data.usernameOrEmail, data.password)
        
        // Save remember me option
        if (data.rememberMe) {
          localStorage.setItem("insidex_remember", "true")
        } else {
          localStorage.removeItem("insidex_remember")
        }
        
        // Show success toast and redirect
        toast({
          title: "Login successful",
          description: "Welcome back to Inside X!",
        })
        
        router.push("/dashboard")
      } catch (error) {
        console.error("Login error:", error)
        setErrors({
          general: "Login failed. Please check your credentials."
        })
        
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive"
        })
      } finally {
        setIsProcessing(false)
      }
    }
  }

  // Handle signup
  const handleSignup = async (data: SignupFormData) => {
    const validationErrors = validateSignupForm(data)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true)
      try {
        await auth.signup({
          username: data.username,
          email: data.email,
          password: data.password,
          displayName: data.displayName || data.username
        })
        
        // Show success toast
        toast({
          title: "Account created successfully",
          description: "Welcome to Inside X!",
        })
        
        // Redirect to onboarding
        router.push("/onboarding")
      } catch (error) {
        console.error("Signup error:", error)
        setErrors({
          general: "Signup failed. Please try again."
        })
        
        toast({
          title: "Signup failed",
          description: "Please check your information and try again.",
          variant: "destructive"
        })
      } finally {
        setIsProcessing(false)
      }
    }
  }

  // Handle logout
  const handleLogout = () => {
    auth.logout()
    router.push("/")
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return {
    user: auth.user,
    isLoading: auth.isLoading || isProcessing,
    errors,
    handleLogin,
    handleSignup,
    handleLogout,
    toggleAnonymousMode: auth.toggleAnonymousMode
  }
}
