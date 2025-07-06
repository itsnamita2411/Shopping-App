"use client"

import { useCart } from "../context/CartContext"
import { ShoppingCart, Heart, User } from "lucide-react"

export default function Header({ onCartClick, onNavigate, currentPage }) {
  const { getCartCount } = useCart()

  const navItems = [
    { name: "Home", key: "home" },
    { name: "Products", key: "products" },
    { name: "About", key: "about" },
    { name: "Contact", key: "contact" },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">FS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Fashion Store
              </h1>
              <p className="text-sm text-gray-500">Premium Collection</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`text-gray-700 font-medium transition-colors px-2 py-1 rounded-md ${currentPage === item.key ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700" : "hover:text-purple-600"}`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300">
              <Heart className="h-6 w-6" />
            </button>

            <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300">
              <User className="h-6 w-6" />
            </button>

            <button
              onClick={onCartClick}
              className="relative p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 group"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse group-hover:scale-110 transition-transform">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
