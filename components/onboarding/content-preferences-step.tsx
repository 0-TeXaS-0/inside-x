"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const contentTypes = [
  { id: "live", label: "Live Videos" },
  { id: "recorded", label: "Recorded Videos" },
  { id: "shorts", label: "Short Videos" },
  { id: "text", label: "Text Posts" },
  { id: "images", label: "Images & Photos" },
  { id: "audio", label: "Audio Content" },
]

const languages = [
  { id: "en", label: "English" },
  { id: "es", label: "Spanish" },
  { id: "fr", label: "French" },
  { id: "de", label: "German" },
  { id: "it", label: "Italian" },
  { id: "pt", label: "Portuguese" },
  { id: "ru", label: "Russian" },
  { id: "ja", label: "Japanese" },
  { id: "zh", label: "Chinese" },
  { id: "ko", label: "Korean" },
  { id: "ar", label: "Arabic" },
  { id: "hi", label: "Hindi" },
]

const popularTopics = [
  "Technology",
  "Travel",
  "Food",
  "Fashion",
  "Sports",
  "Music",
  "Movies",
  "Art",
  "Science",
  "Health",
  "Business",
  "Politics",
  "Gaming",
  "Books",
  "Photography",
]

export default function ContentPreferencesStep({ contentPreferences, updateContentPreferences }) {
  const [searchTerm, setSearchTerm] = useState("")

  const toggleTopic = (topic) => {
    const updatedTopics = contentPreferences.topics.includes(topic)
      ? contentPreferences.topics.filter((t) => t !== topic)
      : [...contentPreferences.topics, topic]

    updateContentPreferences({
      ...contentPreferences,
      topics: updatedTopics,
    })
  }

  const toggleContentType = (type) => {
    const updatedTypes = contentPreferences.contentTypes.includes(type)
      ? contentPreferences.contentTypes.filter((t) => t !== type)
      : [...contentPreferences.contentTypes, type]

    updateContentPreferences({
      ...contentPreferences,
      contentTypes: updatedTypes,
    })
  }

  const toggleLanguage = (language) => {
    const updatedLanguages = contentPreferences.languages.includes(language)
      ? contentPreferences.languages.filter((l) => l !== language)
      : [...contentPreferences.languages, language]

    updateContentPreferences({
      ...contentPreferences,
      languages: updatedLanguages,
    })
  }

  const filteredTopics = searchTerm
    ? popularTopics.filter((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    : popularTopics

  return (
    <div className="space-y-8">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white/60 text-center"
      >
        Customize your feed by selecting the content you're interested in seeing.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">Content Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {contentTypes.map((type) => (
            <Card
              key={type.id}
              className={`bg-white/5 border-white/10 cursor-pointer transition-all duration-300 ${
                contentPreferences.contentTypes.includes(type.id)
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
                  : "hover:bg-white/10"
              }`}
              onClick={() => toggleContentType(type.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Checkbox
                  id={`content-type-${type.id}`}
                  checked={contentPreferences.contentTypes.includes(type.id)}
                  onCheckedChange={() => toggleContentType(type.id)}
                />
                <Label htmlFor={`content-type-${type.id}`} className="cursor-pointer">
                  {type.label}
                </Label>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">Topics</h3>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            type="search"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredTopics.map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className={`cursor-pointer transition-all duration-300 ${
                contentPreferences.topics.includes(topic)
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50"
                  : "bg-white/5 hover:bg-white/10 border-white/10"
              }`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
              {contentPreferences.topics.includes(topic) && <Check className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">Languages</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {languages.map((language) => (
            <div
              key={language.id}
              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-all duration-300 ${
                contentPreferences.languages.includes(language.id)
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                  : "hover:bg-white/5"
              }`}
              onClick={() => toggleLanguage(language.id)}
            >
              <Checkbox
                id={`language-${language.id}`}
                checked={contentPreferences.languages.includes(language.id)}
                onCheckedChange={() => toggleLanguage(language.id)}
              />
              <Label htmlFor={`language-${language.id}`} className="cursor-pointer">
                {language.label}
              </Label>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
