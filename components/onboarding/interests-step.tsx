"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

const allInterests = [
  { id: 1, name: "Photography", category: "Arts" },
  { id: 2, name: "Music", category: "Arts" },
  { id: 3, name: "Painting", category: "Arts" },
  { id: 4, name: "Gaming", category: "Entertainment" },
  { id: 5, name: "Movies", category: "Entertainment" },
  { id: 6, name: "Books", category: "Entertainment" },
  { id: 7, name: "Cooking", category: "Lifestyle" },
  { id: 8, name: "Fitness", category: "Lifestyle" },
  { id: 9, name: "Travel", category: "Lifestyle" },
  { id: 10, name: "Technology", category: "Tech" },
  { id: 11, name: "Programming", category: "Tech" },
  { id: 12, name: "AI", category: "Tech" },
  { id: 13, name: "Fashion", category: "Lifestyle" },
  { id: 14, name: "Sports", category: "Lifestyle" },
  { id: 15, name: "Science", category: "Education" },
  { id: 16, name: "History", category: "Education" },
  { id: 17, name: "Philosophy", category: "Education" },
  { id: 18, name: "Psychology", category: "Education" },
  { id: 19, name: "Business", category: "Professional" },
  { id: 20, name: "Marketing", category: "Professional" },
  { id: 21, name: "Design", category: "Arts" },
  { id: 22, name: "Animation", category: "Arts" },
  { id: 23, name: "Podcasts", category: "Entertainment" },
  { id: 24, name: "Meditation", category: "Lifestyle" },
]

const categories = [...new Set(allInterests.map((interest) => interest.category))]

export default function InterestsStep({ selectedInterests, updateInterests }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInterests = searchTerm
    ? allInterests.filter((interest) => interest.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : allInterests

  const toggleInterest = (interest) => {
    if (selectedInterests.find((i) => i.id === interest.id)) {
      updateInterests(selectedInterests.filter((i) => i.id !== interest.id))
    } else {
      if (selectedInterests.length < 10) {
        updateInterests([...selectedInterests, interest])
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white/60 mb-6 text-center"
      >
        Select up to 10 interests to personalize your experience and find your community.
      </motion.p>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
        <Input
          type="search"
          placeholder="Search interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white"
        />
      </div>

      {selectedInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium mb-2 text-white/60">Selected ({selectedInterests.length}/10)</h3>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <Badge
                key={interest.id}
                variant="outline"
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-purple-500/50 cursor-pointer"
                onClick={() => toggleInterest(interest)}
              >
                {interest.name} ✕
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-medium mb-3 text-white/60">{category}</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              {filteredInterests
                .filter((interest) => interest.category === category)
                .map((interest) => {
                  const isSelected = selectedInterests.some((i) => i.id === interest.id)
                  return (
                    <motion.div key={interest.id} variants={itemVariants}>
                      <Badge
                        variant="outline"
                        className={`cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50"
                            : "bg-white/5 hover:bg-white/10 border-white/10"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest.name}
                      </Badge>
                    </motion.div>
                  )
                })}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
