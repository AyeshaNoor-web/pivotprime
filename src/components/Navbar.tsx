"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="absolute top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image src="/pivot-logo.svg" alt="Pivot Prime" width={150} height={40} className="h-8 w-auto" />
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/" className="text-primary font-bold text-sm tracking-wide uppercase transition-colors">
                Unlock Your Prime
              </Link>
              
              <div className="relative h-full flex items-center" 
                   onMouseEnter={() => setIsDropdownOpen(true)}
                   onMouseLeave={() => setIsDropdownOpen(false)}>
                <Link href="/services/how-we-work" className="text-gray-900 hover:text-primary font-bold text-sm tracking-wide uppercase transition-colors flex items-center h-full py-2">
                  What We Do
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-56 z-50">
                    <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link href="/for-founders" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary" role="menuitem">For Founders</Link>
                        <Link href="/for-smes" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary" role="menuitem">For SMEs</Link>
                        <Link href="/for-corporate-leaders" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary" role="menuitem">For Corporate Leaders</Link>
                        <Link href="/for-pl-owners" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary" role="menuitem">For Corporate Owners</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/about" className="text-gray-900 hover:text-primary font-bold text-sm tracking-wide uppercase transition-colors">
                Who We Are
              </Link>
              <Link href="/insights" className="text-gray-900 hover:text-primary font-bold text-sm tracking-wide uppercase transition-colors">
                Prime Insights
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-primary font-bold text-sm tracking-wide uppercase transition-colors">
                Contact Us
              </Link>
              <a href="https://wa.me/971524401075" className="ml-4 inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold tracking-wide uppercase text-white bg-primary hover:bg-mid/90 transition-colors rounded-md shadow-sm">
                Book Discovery Call <span className="ml-2 font-normal text-lg leading-none">→</span>
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50">Unlock Your Prime</Link>
              <div className="px-3 py-2">
                <div className="text-base font-medium text-gray-900 mb-2">What We Do</div>
                <div className="pl-4 space-y-1 border-l-2 border-gray-200">
                  <Link href="/for-founders" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50">For Founders</Link>
                  <Link href="/for-smes" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50">For SMEs</Link>
                  <Link href="/for-corporate-leaders" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50">For Corporate Leaders</Link>
                  <Link href="/for-pl-owners" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50">For Corporate Owners</Link>
                </div>
              </div>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50">Who We Are</Link>
              <Link href="/insights" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50">Prime Insights</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50">Contact Us</Link>
              <div className="pt-4 pb-2 px-3">
                <a href="https://wa.me/971524401075" className="flex items-center justify-center w-full px-6 py-3 text-sm font-bold tracking-wide uppercase text-white bg-primary hover:bg-mid/90 transition-colors rounded-md shadow-sm">
                  Book Discovery Call <span className="ml-2 font-normal text-lg leading-none">→</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
