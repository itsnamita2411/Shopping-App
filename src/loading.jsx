export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Loading Amazing Products</h2>
        <p className="text-gray-600 animate-pulse">Fetching the best deals for you...</p>
      </div>
    </div>
  )
}
