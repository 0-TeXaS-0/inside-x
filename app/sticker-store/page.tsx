"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Search, Star, ShoppingCart, Sparkles, Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const stickerPacks = [
  {
    id: 1,
    name: "Emoji Essentials",
    price: "Free",
    stickers: ["😊", "😂", "❤️", "👍", "🔥", "🎉", "😍", "🙌"],
    category: "Free",
    isPurchased: true,
    rating: 4.5,
    reviews: 1243,
  },
  {
    id: 2,
    name: "Party Animals",
    price: "$1.99",
    stickers: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
    category: "Animals",
    isPurchased: false,
    rating: 4.8,
    reviews: 876,
    isPremium: true,
  },
  {
    id: 3,
    name: "Food Lovers",
    price: "$0.99",
    stickers: ["🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🍦", "🍫"],
    category: "Food",
    isPurchased: true,
    rating: 4.2,
    reviews: 543,
  },
  {
    id: 4,
    name: "Travel Dreams",
    price: "$2.99",
    stickers: ["✈️", "🏝️", "🗺️", "🏞️", "🏙️", "🚗", "⛰️", "🏕️"],
    category: "Travel",
    isPurchased: false,
    rating: 4.7,
    reviews: 1021,
    isPremium: true,
  },
  {
    id: 5,
    name: "Gamer Zone",
    price: "$1.99",
    stickers: ["🎮", "🕹️", "👾", "🎯", "🏆", "🎲", "♟️", "🎪"],
    category: "Gaming",
    isPurchased: false,
    rating: 4.9,
    reviews: 1532,
  },
  {
    id: 6,
    name: "Cosmic Wonders",
    price: "$2.99",
    stickers: ["🌟", "🌙", "☀️", "🌍", "🚀", "👽", "🛸", "🌌"],
    category: "Space",
    isPurchased: false,
    rating: 4.6,
    reviews: 789,
    isPremium: true,
  },
]

const categories = ["All", "Free", "Premium", "Animals", "Food", "Travel", "Gaming", "Space"]

export default function StickerStorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedPack, setSelectedPack] = useState(null)
  const [cart, setCart] = useState([])

  const filteredPacks = stickerPacks.filter((pack) => {
    const matchesSearch = pack.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      activeCategory === "All" || pack.category === activeCategory || (activeCategory === "Premium" && pack.isPremium)
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (pack) => {
    if (!cart.some((item) => item.id === pack.id)) {
      setCart([...cart, pack])
    }
  }

  const handleRemoveFromCart = (packId) => {
    setCart(cart.filter((item) => item.id !== packId))
  }

  const totalPrice = cart.reduce((total, item) => {
    const price = item.price === "Free" ? 0 : Number.parseFloat(item.price.replace("$", ""))
    return total + price
  }, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Sticker Store</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500 text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            type="search"
            placeholder="Search sticker packs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>

        <ScrollArea className="whitespace-nowrap pb-4 mb-6">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={
                  activeCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : "border-white/10 text-white hover:bg-white/10"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPacks.map((pack) => (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedPack(pack)}
                >
                  <Card className="bg-gray-900/50 border-white/10 h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        {pack.isPremium && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {pack.stickers.map((sticker, index) => (
                          <div
                            key={index}
                            className="h-12 flex items-center justify-center text-2xl bg-white/5 rounded-md"
                          >
                            {sticker}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-white/60">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>
                          {pack.rating} ({pack.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      {pack.isPurchased ? (
                        <Button
                          variant="outline"
                          className="w-full border-green-500/30 text-green-400 bg-green-500/10 hover:bg-green-500/20"
                          disabled
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Purchased
                        </Button>
                      ) : (
                        <div className="flex w-full gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 border-white/10 text-white hover:bg-white/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddToCart(pack)
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {pack.price}
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:w-1/3">
            <AnimatePresence mode="wait">
              {selectedPack ? (
                <motion.div
                  key="pack-details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 border-white/10 sticky top-24">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{selectedPack.name}</CardTitle>
                        {selectedPack.isPremium && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-white/60 mt-2">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>
                          {selectedPack.rating} ({selectedPack.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-medium mb-3">Preview</h3>
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {selectedPack.stickers.map((sticker, index) => (
                          <div
                            key={index}
                            className="h-16 flex items-center justify-center text-3xl bg-white/5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            {sticker}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/60">Price:</span>
                          <span className="font-bold text-lg">{selectedPack.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60">Category:</span>
                          <Badge variant="outline" className="bg-white/5">
                            {selectedPack.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60">Stickers:</span>
                          <span>{selectedPack.stickers.length}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {selectedPack.isPurchased ? (
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download Again
                        </Button>
                      ) : (
                        <div className="flex w-full gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 border-white/10 text-white hover:bg-white/10"
                            onClick={() => handleAddToCart(selectedPack)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Buy Now
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ) : cart.length > 0 ? (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 border-white/10 sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Your Cart
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 flex items-center justify-center text-xl bg-white/10 rounded-md">
                                  {item.stickers[0]}
                                </div>
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-white/60">{item.price}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/60 hover:text-white"
                                onClick={() => handleRemoveFromCart(item.id)}
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/60">Subtotal:</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-white/60">Tax:</span>
                          <span>${(totalPrice * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total:</span>
                          <span>${(totalPrice * 1.1).toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Checkout
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center text-white/60 p-8">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <h3 className="text-xl font-medium mb-2">Select a Sticker Pack</h3>
                    <p>Choose a sticker pack to view details or add to your cart</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
