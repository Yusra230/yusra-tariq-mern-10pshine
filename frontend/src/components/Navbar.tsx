import React, { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative z-50">
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            NotesBloom
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
          >
            About
          </a>
         
          <Link
            to={"/login"}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-pink-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl rounded-b-3xl overflow-x-hidden mt-2 mx-4 border border-pink-100">
          <div className="flex flex-col p-6 space-y-4">
            <a
              href="#features"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              About
            </a>
            <button className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2 text-left">
              Login
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  </header>
  );
};

export default Navbar;
