"use client"

import { Search, X } from "lucide-react"

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-6 w-6 text-purple-400" />
      </div>
      <input
        type="text"
        placeholder="Search for amazing products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-12 pr-12 py-4 text-lg border-2 border-purple-200 rounded-2xl leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 shadow-lg"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
