'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-cyan-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-teal-700">
                AFF-NET
              </Link>
            </div>

            {/* Center Navigation Bar */}
            <nav className="hidden md:flex items-center bg-white rounded-full px-6 py-2 shadow-sm">
              <Link href="/" className="text-teal-700 font-medium px-3 py-1">
                Home
              </Link>
              <Link href="#advertisers" className="text-gray-400 font-medium px-3 py-1 hover:text-gray-600">
                Advertisers
              </Link>
              <div className="w-px h-4 bg-cyan-300 mx-2"></div>
              <Link href="#publishers" className="text-gray-400 font-medium px-3 py-1 hover:text-gray-600">
                Publishers
              </Link>
              <Link href="#contact" className="text-gray-400 font-medium px-3 py-1 hover:text-gray-600">
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link
                href="/login"
                className="px-6 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-700 hover:to-green-700 transition font-medium uppercase text-sm"
              >
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Menu Popup */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-6">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/login"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <span className="text-gray-900 font-medium">Publisher Login</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <span className="text-gray-900 font-medium">Advertiser Login</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <span className="text-gray-900 font-medium">Influencer Login</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <span className="text-gray-900 font-medium">Register New Account</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <span className="text-gray-900 font-medium">Contact</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 min-h-[90vh] flex items-center overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Section - Text Content */}
            <div className="z-10">
              {/* Enterprise Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-6">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-teal-700 font-semibold text-sm">Enterprise-Grade Affiliate Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Grow Your Online Revenue With Ease.
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Aff-Net supports publishers, shopping platforms and creators in earning at every stage of the customer journey. Easily turn your content and shopping experiences into affiliate income.
              </p>

              {/* CTA Button */}
              <Link
                href="/signup"
                className="inline-block px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold text-lg mb-8"
              >
                JOIN AFF-NET
              </Link>

              {/* Info Badges */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">PCI DSS Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Billions Processed</span>
                </div>
              </div>
            </div>
            
            {/* Right Section - Performance Dashboard Card */}
            <div className="relative z-10">
              {/* Ellipse Images - Positioned behind the card with proper layering */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
                {/* Ellipse 3 - Largest outer circle (farthest behind) */}
                <div className="absolute relative w-[1400px] h-[1400px] opacity-25">
                  <Image
                    src="/Ellipse 3.png"
                    alt="Background ellipse 3"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Ellipse 4 - Medium circle (middle layer) */}
                <div className="absolute relative w-[1200px] h-[1200px] opacity-30">
                  <Image
                    src="/Ellipse 4.png"
                    alt="Background ellipse 4"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Ellipse 2 - Center/main ellipse (innermost) */}
                <div className="absolute relative w-[1000px] h-[1000px] opacity-35">
                  <Image
                    src="/Ellipse 2.png"
                    alt="Background ellipse"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Decorative Icons - Semi-transparent teal floating icons with frosted glass effect */}
              {/* Top-left: Upward arrow/trend line icon */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-teal-400/70 backdrop-blur-md rounded-lg flex items-center justify-center shadow-xl z-20 border border-teal-300/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              {/* Top-right: Gear/Settings icon */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-teal-400/70 backdrop-blur-md rounded-lg flex items-center justify-center shadow-xl z-20 border border-teal-300/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              {/* Mid-left: Information icon */}
              <div className="absolute top-1/3 -left-6 w-12 h-12 bg-teal-400/70 backdrop-blur-md rounded-lg flex items-center justify-center shadow-xl z-20 border border-teal-300/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              {/* Bottom-right: Lightning bolt icon */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-teal-400/70 backdrop-blur-md rounded-lg flex items-center justify-center shadow-xl z-20 border border-teal-300/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              {/* Dashboard Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300" style={{ zIndex: 10 }}>
                {/* Premium Tag - Dark Teal Rectangular with Rounded Corners */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-teal-800 rounded-lg">
                  <span className="text-white font-semibold text-xs">Premium</span>
                </div>

                {/* Dashboard Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Performance Dashboard</h3>
                  <p className="text-gray-500 text-sm">Real-time revenue tracking</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Today's Revenue - With teal dollar icon and TEAL amount */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-teal-600 mb-1">$12,458</p>
                      <p className="text-gray-500 text-sm">Today&apos;s Revenue</p>
                    </div>
                  </div>

                  {/* Growth - Black text */}
                  <div>
                    <p className="text-4xl font-bold text-gray-900 mb-1">+28%</p>
                    <p className="text-gray-500 text-sm">Growth</p>
                  </div>
                </div>

                {/* Bar Chart - Teal vertical bars with light gray background */}
                <div className="mb-6 bg-gray-100 rounded-lg p-3">
                  <div className="flex items-end gap-2 h-20">
                    <div className="flex-1 bg-teal-500 rounded-t" style={{ height: '60%' }}></div>
                    <div className="flex-1 bg-teal-500 rounded-t" style={{ height: '80%' }}></div>
                    <div className="flex-1 bg-teal-500 rounded-t" style={{ height: '45%' }}></div>
                    <div className="flex-1 bg-teal-500 rounded-t" style={{ height: '100%' }}></div>
                    <div className="flex-1 bg-teal-500 rounded-t" style={{ height: '70%' }}></div>
                  </div>
                </div>

                {/* Bottom Metrics */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Active Campaigns */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Active Campaigns</p>
                      <p className="text-2xl font-bold text-gray-900">42</p>
                    </div>
                  </div>

                  {/* Conversion Rate - Lime green color */}
                  <div>
                    <p className="text-gray-600 text-sm">Conversion Rate</p>
                    <p className="text-2xl font-bold text-lime-500">8.2%</p>
                  </div>
                </div>
              </div>
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

      {/* Our Affiliate Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Teal Pill Button */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-6 shadow-sm">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-teal-700 font-semibold text-sm">Our Affiliate Partners</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Work With Top Affiliate Networks
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aff-Net partners with leading affiliate networks to support publishers and creators in maximizing their revenue from commerce traffic.
            </p>
          </div>

          {/* Affiliate Network Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-16">
            {/* impact.com */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-lg transition">
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">impact</span>
                <span className="text-2xl font-bold text-gray-900">.com</span>
              </div>
            </div>

            {/* Rakuten */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-lg transition">
              <span className="text-2xl font-bold text-red-600">Rakuten</span>
            </div>

            {/* CJ Affiliate (G logo) */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">G</span>
              </div>
            </div>

            {/* Partnerize */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-lg transition">
              <span className="text-xl font-bold text-gray-900">Partnerize</span>
            </div>

            {/* Admitad */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-lg transition">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg mb-2 mx-auto"></div>
                <span className="text-lg font-semibold text-purple-700">Admitad</span>
              </div>
            </div>

            {/* paidonresults */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-lg transition">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-gray-900">paidonresults</span>
              </div>
            </div>

            {/* impact.com (duplicate) */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-lg transition">
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">impact</span>
                <span className="text-2xl font-bold text-gray-900">.com</span>
              </div>
            </div>
          </div>

          {/* Statistics/Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Active Publishers */}
            <div className="bg-teal-50 rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <p className="text-5xl font-bold text-gray-900 mb-2">500+</p>
              <p className="text-lg text-gray-700">Active Publishers</p>
            </div>

            {/* Active Offers */}
            <div className="bg-teal-50 rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <p className="text-5xl font-bold text-gray-900 mb-2">20K+</p>
              <p className="text-lg text-gray-700">Active Offers</p>
            </div>

            {/* Annual Revenue */}
            <div className="bg-teal-50 rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <p className="text-5xl font-bold text-gray-900 mb-2">$100M+</p>
              <p className="text-lg text-gray-700">Annual Revenue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact By The Numbers Section */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #022C2E 0%, #064D51 50%, #022C2E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* GLOBAL REACH Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-full mb-6">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white font-bold text-xs uppercase tracking-wide">GLOBAL REACH</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Impact By The Numbers
            </h2>

            {/* Description */}
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explore the reach of our global operations and the difference we are making worldwide.
            </p>
          </div>

          {/* Statistics Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 - Merchants worldwide */}
            <div className="rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-[#374151]/30 backdrop-blur-[24px]" style={{ background: 'linear-gradient(180deg, rgba(31, 41, 55, 0.6) 60%, rgba(17, 24, 39, 0.6) 40%)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-6xl font-bold text-white mb-2">48.5k</p>
                  <p className="text-lg text-white/90">Merchants worldwide</p>
                </div>
              </div>
            </div>

            {/* Card 2 - Networks */}
            <div className="rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-[#374151]/30 backdrop-blur-[24px]" style={{ background: 'linear-gradient(180deg, rgba(31, 41, 55, 0.6) 60%, rgba(17, 24, 39, 0.6) 40%)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-6xl font-bold text-white mb-2">50+</p>
                  <p className="text-lg text-white/90">Networks</p>
                </div>
              </div>
            </div>

            {/* Card 3 - Sales every day */}
            <div className="rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-[#374151]/30 backdrop-blur-[24px]" style={{ background: 'linear-gradient(180deg, rgba(31, 41, 55, 0.6) 60%, rgba(17, 24, 39, 0.6) 40%)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-6xl font-bold text-white mb-2">$4.8m</p>
                  <p className="text-lg text-white/90">Sales every day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Status Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white font-bold text-xs uppercase tracking-wide">Real-Time Data Updated Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Industry Leaders Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Trust Of Industry Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-lg mb-6">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span className="text-white font-semibold text-sm">Trust Of Industry</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted By Industry Leaders
            </h2>

            {/* Sub-heading */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              In partnership with leading global brands to drive real success
            </p>
          </div>

          {/* Brand Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {/* Belkin */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center hover:shadow-md transition">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                </div>
                <span className="text-xl font-semibold text-gray-800">belkin</span>
              </div>
            </div>

            {/* COSTWAY */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center hover:shadow-md transition">
              <div className="text-center">
                <span className="text-xl font-bold text-gray-800">COST</span>
                <span className="inline-block w-6 h-6 bg-orange-500 rounded ml-1 mr-1"></span>
                <span className="text-xl font-bold text-gray-800">WAY</span>
              </div>
            </div>

            {/* crocs */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center hover:shadow-md transition">
              <span className="text-xl font-semibold text-gray-800">crocs</span>
            </div>

            {/* WOWANGEL */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center hover:shadow-md transition">
              <div className="text-center">
                <span className="text-lg font-bold text-gray-800">WOWANGEL</span>
                <p className="text-xs text-gray-500 mt-1">Community Series</p>
              </div>
            </div>

            {/* Beginning */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center hover:shadow-md transition">
              <span className="text-xl font-semibold text-gray-800">Beginning</span>
            </div>

            {/* '47 Brand */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center hover:shadow-md transition">
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-gray-800">47</span>
                </div>
                <span className="text-xs font-semibold text-gray-700">FORTY SEVEN</span>
                <span className="text-xs font-semibold text-gray-700 block">BRAND</span>
              </div>
            </div>
          </div>

          {/* JOIN AFF-NET Button */}
          <div className="text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold text-lg uppercase"
            >
              JOIN AFF-NET
            </Link>
          </div>
        </div>
      </section>

      {/* Ready To Start Affiliate Marketing Section */}
      <section className="py-20 bg-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready To Start Affiliate Marketing?
            </h2>

            {/* Sub-heading */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of successful businesses using Aff-Net premium solutions
            </p>

            {/* GET STARTED TODAY Button */}
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold text-lg uppercase"
            >
              GET STARTED TODAY
            </Link>
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
      <footer className="text-white py-12" id="contact" style={{ background: 'linear-gradient(180deg, #022C2E 0%, #064D51 50%, #022C2E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* AFF-NET Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">AFF-NET</h3>
              <p className="text-white/80 mb-4">The leading affiliate marketing platform connecting publishers and merchants worldwide.</p>
            </div>

            {/* Explore More */}
            <div>
              <h4 className="text-lg font-bold mb-4">Explore More</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#advertisers" className="text-white/80 hover:text-white">
                    Advertisers
                  </Link>
                </li>
                <li>
                  <Link href="#publishers" className="text-white/80 hover:text-white">
                    Publishers
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-white/80 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Information */}
            <div>
              <h4 className="text-lg font-bold mb-4">Legal Information</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Imprint
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Mediakit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Support */}
            <div>
              <h4 className="text-lg font-bold mb-4">Get Support</h4>
              <ul className="space-y-2 text-white/80">
                <li>Info@affnet.com</li>
                <li>advertisers@affnet.com</li>
                <li>publishers@affnet.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-teal-700/30 pt-8 text-center text-white/80">
            <p>Copyright © 2026 AFF-NET PTY LTD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
