"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Grid3x3,
    Star,
    LayoutDashboard,
    Search,
    Sun,
    Bell,
    Settings,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { icon: Grid3x3, label: 'Grid' },
        { icon: Star, label: 'Favorites' },
        { icon: LayoutDashboard, label: 'Dashboards' },
    ];

    const rightItems = [
        { icon: Search, label: 'Search' },
        { icon: Sun, label: 'Theme' },
        { icon: Bell, label: 'Notifications' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-[99%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Section - Logo/Brand */}
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900">Org Admin</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.label}
                                    whileHover={{ backgroundColor: '#f3f4f6' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Center Section - Create Office Button */}
                    <div className="hidden md:block">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            Create Office
                        </motion.button>
                    </div>

                    {/* Right Section - Desktop */}
                    <div className="hidden md:flex items-center space-x-2">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center space-x-1">
                            {rightItems.slice(1).map((item, index) => (
                                <motion.button
                                    key={item.label}
                                    whileHover={{ backgroundColor: '#f3f4f6' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                                    title={item.label}
                                >
                                    <item.icon className="w-5 h-5" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white border-t border-gray-200"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {/* Mobile Navigation Items */}
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="w-full flex items-center justify-between p-3 text-left rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </motion.button>
                            ))}

                            {/* Mobile Search */}
                            <div className="pt-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Create Office Button - Mobile */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="w-full bg-gray-900 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors mt-4"
                            >
                                Create Office
                            </motion.button>

                            {/* Mobile Action Items */}
                            <div className="pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-2">
                                    {rightItems.slice(1).map((item, index) => (
                                        <motion.button
                                            key={item.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="flex items-center space-x-3 p-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;