"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function StickerPack() {
  const [isOpen, setIsOpen] = useState(false)

  const stickers = ["👋", "😊", "🎉", "❤️", "👍", "🔥", "😂", "🙌", "✨", "🎵", "🎮", "📸", "🌈", "🚀", "💯", "🏆"]

  const premiumStickers = ["🦄", "🌟", "💎", "👑", "🎭", "🎨", "🧠", "🌊"]

  return (
    <Card className="bg-gray-900/50 border-white/10 overflow-hidden">
      <CardHeader className="p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Sticker Packs</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="p-4 pt-0">
              <ScrollArea className="h-32">
                <div className="grid grid-cols-4 gap-2">
                  {stickers.map((sticker, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="h-12 text-2xl bg-white/5 border-white/10 hover:bg-white/10"
                    >
                      {sticker}
                    </Button>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <h4 className="font-medium text-sm">Premium Stickers</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {premiumStickers.map((sticker, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="h-12 text-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-white/10 hover:bg-white/10"
                      >
                        {sticker}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>

              <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Get More Stickers
              </Button>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
