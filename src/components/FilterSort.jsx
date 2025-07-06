"use client"

import { Filter, SortAsc } from "lucide-react"

export default function FilterSort({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) {
  const formatCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/'/g, "'")
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
      {/* Category Filter */}
      <div className="flex items-center space-x-3">
        <Filter className="h-5 w-5 text-purple-600" />
        <label className="text-sm font-semibold text-gray-700">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border-2 border-purple-200 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 shadow-lg min-w-[180px]"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategoryName(category)}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-3">
        <SortAsc className="h-5 w-5 text-blue-600" />
        <label className="text-sm font-semibold text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border-2 border-blue-200 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg min-w-[180px]"
        >
          <option value="default">Default</option>
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  )
}
