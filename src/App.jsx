import React, { useState } from "react";
import Home from "./page";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Header
          onCartClick={() => setShowCart(true)}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        {currentPage === "home" && (
          <>
            <Hero />
            <Home showOnlyProducts={false} />
          </>
        )}
        {currentPage === "products" && <Home showOnlyProducts={true} />}
        {currentPage === "about" && <About />}
        {currentPage === "contact" && <Contact />}
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      </div>
    </CartProvider>
  );
}