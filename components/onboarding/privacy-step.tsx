"use client"

import { motion } from "framer-motion"
import { Eye, EyeOff, MessageCircle, Lock, Globe } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyStep({ privacySettings, updatePrivacySettings }) {
  const handleChange = (field, value) => {
    updatePrivacySettings({
      ...privacySettings,
      [field]: value,
    })
  }

  const privacyOptions = [
    {
      field: "profileVisibility",
      title: "Profile Visibility",
      description: "Control who can see your profile information",
      options: [
        {
          value: "public",
          label: "Public",
          icon: Globe,
          description: "Anyone can see your profile",
        },
        {
          value: "connections",
          label: "Connections Only",
          icon: MessageCircle,
          description: "Only people you've connected with can see your profile",
        },
        {
          value: "anonymous",
          label: "Anonymous",
          icon: EyeOff,
          description: "Your profile is completely anonymous",
        },
      ],
    },
    {
      field: "messagePermissions",
      title: "Message Permissions",
      description: "Control who can send you messages",
      options: [
        {
          value: "everyone",
          label: "Everyone",
          icon: Globe,
          description: "Anyone can send you messages",
        },
        {
          value: "connections",
          label: "Connections Only",
          icon: MessageCircle,
          description: "Only people you've connected with can message you",
        },
        {
          value: "nobody",
          label: "Nobody",
          icon: Lock,
          description: "Nobody can message you directly",
        },
      ],
    },
    {
      field: "contentVisibility",
      title: "Content Visibility",
      description: "Control who can see your posts and videos",
      options: [
        {
          value: "public",
          label: "Public",
          icon: Globe,
          description: "Anyone can see your content",
        },
        {
          value: "connections",
          label: "Connections Only",
          icon: Eye,
          description: "Only people you've connected with can see your content",
        },
        {
          value: "private",
          label: "Private",
          icon: Lock,
          description: "Your content is only visible to you",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white/60 text-center"
      >
        Configure your privacy settings to control your experience on Inside X. You can change these settings at any
        time.
      </motion.p>

      {privacyOptions.map((section, sectionIndex) => (
        <motion.div
          key={section.field}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
        >
          <h3 className="text-lg font-medium mb-2">{section.title}</h3>
          <p className="text-white/60 text-sm mb-4">{section.description}</p>

          <RadioGroup
            value={privacySettings[section.field]}
            onValueChange={(value) => handleChange(section.field, value)}
            className="space-y-3"
          >
            {section.options.map((option) => (
              <Card
                key={option.value}
                className={`bg-white/5 border-white/10 cursor-pointer transition-all duration-300 ${
                  privacySettings[section.field] === option.value
                    ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
                    : "hover:bg-white/10"
                }`}
                onClick={() => handleChange(section.field, option.value)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <RadioGroupItem value={option.value} id={`${section.field}-${option.value}`} className="sr-only" />
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      privacySettings[section.field] === option.value
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-white/10"
                    }`}
                  >
                    <option.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor={`${section.field}-${option.value}`}
                      className="text-base font-medium cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    <p className="text-white/60 text-sm">{option.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </motion.div>
      ))}
    </div>
  )
}
