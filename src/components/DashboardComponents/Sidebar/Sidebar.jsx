'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrentUser } from '@/lib/hooks';
import { ChevronDown, ChevronRight, LayoutDashboard, FileText, Users, MapPin, Clock, DollarSign, Calculator, User } from 'lucide-react';

const Sidebar = () => {
    
   

    const [expandedSections, setExpandedSections] = useState({
        setup: true,
        registration: false,
        deployment: false,
        attendance: false,
        payroll: false,
        accounts: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
               
                {/* Dashboards Section */}
                <div className="mb-6">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Dashboards
                    </h3>
                    <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        Overview
                    </Link>
                </div>

                <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Pages
                    </h3>

              
                    <div className="mb-2">
                        <button
                            onClick={() => toggleSection('setup')}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center">
                                <FileText className="mr-3 h-4 w-4" />
                                Setup
                            </div>
                            {expandedSections.setup ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.setup && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link
                                    href="/dashboard/setup/create-office"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Create Office
                                </Link>
                                <Link
                                    href="/dashboard/setup/create-user"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Create User
                                </Link>
                                <Link
                                    href="/dashboard/setup/add-guards-category"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Add Guards Category
                                </Link>
                            </div>
                        )}
                    </div>

                 
                    <div className="mb-2">
                        <button
                            onClick={() => toggleSection('registration')}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center">
                                <Users className="mr-3 h-4 w-4" />
                                Registration
                            </div>
                            {expandedSections.registration ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.registration && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link
                                    href="/dashboard/registration/guards-registration"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Guards Registration
                                </Link>
                                <Link
                                    href="/dashboard/registration/employee-registration"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Employee Registration
                                </Link>
                                <Link
                                    href="/dashboard/registration/clients-registration"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Clients Registration
                                </Link>
                                <Link
                                    href="/dashboard/registration/location-registration"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Location Registration
                                </Link>
                            </div>
                        )}
                    </div>

              
                    <div className="mb-2">
                        <button
                            onClick={() => toggleSection('deployment')}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center">
                                <MapPin className="mr-3 h-4 w-4" />
                                Deployment
                            </div>
                            {expandedSections.deployment ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.deployment && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link
                                    href="/dashboard/deployment/assign-guards"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Assign Guards
                                </Link>
                                <Link
                                    href="/dashboard/deployment/assign-supervisor"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Assign Supervisor
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Attendance */}
                    <div className="mb-2">
                        <button
                            onClick={() => toggleSection('attendance')}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center">
                                <Clock className="mr-3 h-4 w-4" />
                                Attendance
                            </div>
                            {expandedSections.attendance ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.attendance && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link
                                    href="/dashboard/attendance/location-attendance"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Location Attendance
                                </Link>
                                <Link
                                    href="/dashboard/attendance/attendance-sheet"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Attendance Sheet
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Pay Roll */}
                    <div className="mb-2">
                        <button
                            onClick={() => toggleSection('payroll')}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center">
                                <DollarSign className="mr-3 h-4 w-4" />
                                Pay Roll
                            </div>
                            {expandedSections.payroll ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.payroll && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link
                                    href="/dashboard/payroll/generate-pay-roll"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Generate Pay Roll
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Accounts & Finance */}
                    <div className="mb-2">
                        <button
                            onClick={() => toggleSection('accounts')}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center">
                                <Calculator className="mr-3 h-4 w-4" />
                                Accounts & Finance
                            </div>
                            {expandedSections.accounts ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.accounts && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link
                                    href="/dashboard/accounts/petty-cash"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Petty Cash
                                </Link>
                                <Link
                                    href="/dashboard/accounts/payment-vouchers"
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    -Payment Vouchers
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 