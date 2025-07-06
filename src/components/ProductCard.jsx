"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"


export default function ProductCard({ product, index }) {
  const { addToCart } = useCart()
  const [imageError, setImageError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addToCart(product)
    setTimeout(() => setIsAdding(false), 1000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div
      className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:border-purple-200 transform hover:-translate-y-2"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {!imageError ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm">Image not available</span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold capitalize shadow-lg">
            {product.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
              isLiked ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={() => setShowQuickView(true)}
            className="p-2 bg-white/90 text-gray-600 hover:bg-blue-50 hover:text-blue-500 rounded-full shadow-lg transition-all duration-300"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Discount Badge */}
        {product.rating?.rate > 4 && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
              Top Rated
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg group-hover:text-purple-600 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating?.rate || 0)}
            <span className="text-sm text-gray-500 ml-2">({product.rating?.count || 0})</span>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.rating?.rate?.toFixed(1) || "N/A"}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(product.price * 1.2)}</span>
          </div>
          <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">Save 20%</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
            isAdding
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          }`}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isAdding ? "Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
