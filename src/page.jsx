"use client"

import { useState, useEffect } from "react"
import ProductList from "./components/ProductList"
import SearchBar from "./components/SearchBar"
import FilterSort from "./components/FilterSort"

export default function Home({ showOnlyProducts = false, onLoadingChange }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (onLoadingChange) onLoadingChange(loading)
  }, [loading, onLoadingChange])

  // Fetch products from FakeStoreAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://fakestoreapi.com/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()

        setProducts(data)
        setFilteredProducts(data)

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((product) => product.category))]
        setCategories(uniqueCategories)

        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
      default:
        // Keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSortBy("default")
  }

  if (loading) {
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        </div>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!showOnlyProducts && (
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="space-y-6">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <FilterSort
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="mb-8 flex justify-between items-center">
        <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <p className="text-gray-700 font-medium">
            <span className="text-purple-600 font-bold">{filteredProducts.length}</span> of{" "}
            <span className="text-blue-600 font-bold">{products.length}</span> products
          </p>
        </div>

        {(searchTerm || selectedCategory !== "all" || sortBy !== "default") && !showOnlyProducts && (
          <button
            onClick={clearFilters}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <ProductList products={filteredProducts} />
    </main>
  )
}
