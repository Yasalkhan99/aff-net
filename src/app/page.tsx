'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-purple-600">
                AFF-NET
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
                Home
              </Link>
              <Link href="#advertisers" className="text-gray-700 hover:text-purple-600 font-medium">
                Advertisers
              </Link>
              <Link href="#publishers" className="text-gray-700 hover:text-purple-600 font-medium">
                Publishers
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-purple-600 font-medium">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/signup"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
              >
                GET STARTED
              </Link>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-700 hover:text-purple-600 transition"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Logo and Company Name */}
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">AFF-NET</h1>
                </div>
                <p className="text-sm text-gray-600">The Next Generation Partnership Management Platform.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <Link
                  href="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-center"
                >
                  LOGIN
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setSidebarOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium text-center"
                >
                  SIGNUP
                </Link>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 mb-8">
                {/* Location */}
                <div>
                  <div className="flex items-start mb-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Queensland, Australia</p>
                      <p className="text-sm text-gray-600">36 Whistler Place, Pallara, Brisbane</p>
                    </div>
                  </div>
                </div>

                {/* General Support Email */}
                <div>
                  <div className="flex items-start mb-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">info@affnet.com</p>
                      <p className="text-sm text-gray-600">24/7 online support</p>
                    </div>
                  </div>
                </div>

                {/* Specific Contact Emails */}
                <div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">advertisers@affnet.com</p>
                      <p className="font-semibold text-gray-900">publishers@affnet.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-600 transition">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-600 transition">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-600 transition">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-600 transition">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-600 transition">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-2-14h4v8h-4V8zm2 4c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-4c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section className="relative bg-gray-100 min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-5xl font-bold text-purple-900 mb-6">
                A Top Rated Affiliate Marketing Network
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Become a Partner with High-quality Publishers or Connect Your Audience with the world&apos;s leading Brands.
              </p>
              <Link
                href="/signup"
                className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-lg"
              >
                GET STARTED NOW
              </Link>
            </div>
            
            {/* Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
                alt="Affiliate Marketing Network - Business Partnership"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">AliExpress</div>
            <div className="text-2xl font-bold text-gray-400">BLOOMCHIC</div>
            <div className="text-2xl font-bold text-gray-400">carter&apos;s</div>
            <div className="text-2xl font-bold text-gray-400">macy&apos;s</div>
            <div className="text-2xl font-bold text-gray-400">NordVPN</div>
            <div className="text-2xl font-bold text-gray-400">Walmart</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Does AFF-NET Work</h2>
            <p className="text-xl text-gray-600">Gear up your affiliate life with AFF-NET&apos;s affiliate network.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Join',
                description: 'Get started with us.',
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Partnership',
                description: 'Build a strong Partnership.',
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Enjoy',
                description: 'Enjoy the latest commissions.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-purple-100 rounded-full text-purple-600">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Definitive Choice Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Definitive Choice In CPA Networks</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose AFF-NET for your affiliate marketing needs. We provide a robust platform for advertisers and publishers to connect and grow together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Diversity Partnerships',
                description: 'Achieve profitable growth through diverse partnerships with top brands and publishers.',
                color: 'text-purple-600',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Reliable Platform',
                description: 'A trustworthy and easy-to-use platform for both advertisers and publishers.',
                color: 'text-blue-600',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: 'Robust CPA Network',
                description: 'A robust CPA network for affiliate growth, offering better conversions, broader audiences, low risk, and high ROI.',
                color: 'text-orange-600',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Stand Out Section */}
      <section className="py-20 relative min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="bg-blue-900 border-t-4 border-r-4 border-orange-500 p-8 rounded-lg shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">How do we stand out?</h2>
              <div className="space-y-4 text-white text-base leading-relaxed">
                <p>
                  We offer unique benefits to both advertisers and publishers. Our platform provides tracking links for accurate commission tracking, helping advertisers reach their target audience through cashback, vouchers, and discounts.
                </p>
                <p>
                  Publishers benefit from our extensive network of top brands, competitive commission rates, and reliable payment systems. We make affiliate marketing simple and profitable.
                </p>
                <p>
                  Our advanced tracking technology ensures every sale is accurately attributed, giving you complete transparency and control over your affiliate campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities Section */}
      <section className="py-20 bg-white" id="publishers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partnership Opportunities</h2>
            <p className="text-xl text-gray-600">VARIOUS PARTNERSHIP OPPORTUNITIES FOR ONBOARD ADVERTISERS</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Content Publishers', description: 'Reach a genuine audience through content websites, blogs, and reviews.' },
              { title: 'Coupons & Deals', description: 'Attract consumers with discounts, coupons, and deals.' },
              { title: 'Influencers', description: 'Connect with influencers to promote brands.' },
              { title: 'Email Marketers', description: 'Use email marketing to reach new and old customers.' },
              { title: 'Social Media', description: 'Leverage social media for effective brand promotion.' },
              { title: 'Reviews/Comparison', description: 'Use reviews and comparisons to help customers make informed decisions.' },
            ].map((opportunity, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-gray-600">{opportunity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-xl text-gray-600">Stay updated with the latest strategies and insights in affiliate marketing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Advantages of Joining an Affiliate Marketing Network', date: 'February 03, 2023' },
              { title: 'The Role of Affiliate Marketing Networks in E-commerce', date: 'January 23, 2023' },
              { title: 'How to Choose the Right Affiliate Marketing Network', date: 'February 08, 2023' },
            ].map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h3>
                <p className="text-gray-600 mb-4">By: AFF-NET Editor</p>
                <p className="text-gray-500 text-sm mb-4">On: {post.date}</p>
                <button className="text-purple-600 hover:text-purple-700 font-medium">READ MORE</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured On Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-xl font-bold text-gray-400">Bloomberg</div>
            <div className="text-xl font-bold text-gray-400">yahoo!</div>
            <div className="text-xl font-bold text-gray-400">MarketWatch</div>
            <div className="text-xl font-bold text-gray-400">BUSINESS INSIDER</div>
            <div className="text-xl font-bold text-gray-400">asiaone</div>
            <div className="text-xl font-bold text-gray-400">DIGITAL JOURNAL</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* AFF-NET Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">AFF-NET</h3>
              <p className="text-gray-400 mb-4">AFF-NET is the Next Generation Partnership Management Platform.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Explore More */}
            <div>
              <h4 className="text-lg font-semibold mb-4">EXPLORE MORE</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#advertisers" className="text-gray-400 hover:text-white">
                    Advertisers
                  </Link>
                </li>
                <li>
                  <Link href="#publishers" className="text-gray-400 hover:text-white">
                    Publishers
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">LEGAL INFORMATION</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Imprint
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    MediaKit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">GET SUPPORT</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@affnet.com</li>
                <li>advertisers@affnet.com</li>
                <li>publishers@affnet.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>AFF-NET PTY (LTD) © 2024 | All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
