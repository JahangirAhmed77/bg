'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      <section className="relative overflow-hidden">
        {/* Purple decorative lines */}
        <aside className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-32 h-1 bg-purple-500 rotate-45 opacity-20"></div>
          <div className="absolute top-40 right-20 w-24 h-1 bg-purple-600 -rotate-12 opacity-30"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-1 bg-purple-400 rotate-12 opacity-25"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-1 bg-purple-700 -rotate-45 opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-28 h-1 bg-purple-500 rotate-30 opacity-25"></div>
        </aside>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


            <article className="space-y-8">
              <header className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Guard Management
                  <span className="block text-purple-600">System</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                  Streamline your security operations with our comprehensive platform designed for modern security management needs.
                </p>
              </header>


              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Real-time guard tracking and monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Automated scheduling and shift management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Comprehensive reporting and analytics</span>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href='/login' className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Login
                </Link>
                <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </article>


            <aside className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/BannerLoginScreen.webp"
                  alt="Guard Management System Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent"></div>
              </div>


              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400 rounded-full opacity-15 blur-2xl"></div>
            </aside>
          </div>
        </div>


        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Security Professionals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of security companies who rely on our platform to manage their operations efficiently and effectively.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Home