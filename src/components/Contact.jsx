export default function Contact() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Contact Us</h2>
      <p className="text-lg text-gray-700 mb-6">
        Have questions or need support? Reach out to us!
      </p>
      <form className="space-y-6 max-w-md mx-auto">
        <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all">Send Message</button>
      </form>
    </section>
  )
}
