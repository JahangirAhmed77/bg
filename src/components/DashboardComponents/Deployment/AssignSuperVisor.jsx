'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AssignSuperVisor = () => {
    const [serviceNo, setServiceNo] = useState('');
    const [supervisorName, setSupervisorName] = useState('');
    const [clientId, setClientId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [assignCategory, setAssignCategory] = useState('');

    // Mock data for the table
    const assignments = [
        {
            sNo: '01',
            clientId: 'K001-001',
            locationId: 'K001-001',
            deploymentDate: '1/1/2025',
            deployedTill: 'Deployed Till',
            totalWorkingDays: '36',
            action: 'Disable'
        },
        {
            sNo: '02',
            clientId: 'K001-001',
            locationId: 'K001-001',
            deploymentDate: '1/1/2025',
            deployedTill: 'Deployed Till',
            totalWorkingDays: '82',
            action: 'Disable'
        },
        {
            sNo: '03',
            clientId: 'K001-001',
            locationId: 'K001-001',
            deploymentDate: '1/1/2025',
            deployedTill: 'Deployed Till',
            totalWorkingDays: '20',
            action: 'Disable'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted');
    };

    const handleCancel = () => {
        // Reset form or navigate away
        setServiceNo('');
        setSupervisorName('');
        setClientId('');
        setLocationId('');
        setAssignCategory('');
    };

    return (
        <div className="min-h-screen bg-formBGBlue flex flex-col w-full px-4 pt-4">
            {/* Breadcrumb */}
            <div className="w-full max-w-7xl">
                <aside className="bg-white border-b rounded-xl border-gray-200">
                    <div className="px-6 py-4">
                        <article className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Dashboard</span>
                            <span>&gt;</span>
                            <span>Deployment</span>
                            <span>&gt;</span>
                            <span className="text-gray-900 font-medium">Assign Supervisor</span>
                        </article>
                    </div>
                </aside>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-md mt-8 p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Auto Fields Row */}
                    <div className="grid grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Office ID
                            </label>
                            <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                Auto
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Staff ID
                            </label>
                            <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                Auto
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                Auto
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time
                            </label>
                            <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                Auto
                            </div>
                        </div>
                    </div>

                    {/* Tag Supervisor Section */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900">Tag Supervisor with Locations</h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SERVICE. No.
                                </label>
                                <div className="relative">
                                    <select
                                        value={serviceNo}
                                        onChange={(e) => setServiceNo(e.target.value)}
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="SRV001">SRV001</option>
                                        <option value="SRV002">SRV002</option>
                                        <option value="SRV003">SRV003</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Supervisor Name
                                </label>
                                <div className="relative">
                                    <select
                                        value={supervisorName}
                                        onChange={(e) => setSupervisorName(e.target.value)}
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="John Smith">John Smith</option>
                                        <option value="Sarah Johnson">Sarah Johnson</option>
                                        <option value="Mike Wilson">Mike Wilson</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-formBGBlue rounded-2xl p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b     border-gray-200">
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">S.NO</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Client ID</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Location ID</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Deployment Date</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Deployed Till</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Total Working Days</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white'>
                                        {assignments.map((assignment, index) => (
                                            <tr key={index} className="border-b border-gray-100">
                                                <td className="py-3 px-4 text-gray-600">{assignment.sNo}</td>
                                                <td className="py-3 px-4 text-gray-600">{assignment.clientId}</td>
                                                <td className="py-3 px-4 text-gray-600">{assignment.locationId}</td>
                                                <td className="py-3 px-4 text-gray-600">{assignment.deploymentDate}</td>
                                                <td className="py-3 px-4 text-gray-600">{assignment.deployedTill}</td>
                                                <td className="py-3 px-4 text-gray-600">{assignment.totalWorkingDays}</td>
                                                <td className="py-3 px-4">
                                                    <button className="px-2 py-1 bg-[#FF3B30] text-white text-[11px] rounded-[100px] hover:bg-red-600">
                                                        {assignment.action}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bottom Form Section */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client ID
                                </label>
                                <div className="relative">
                                    <select
                                        value={clientId}
                                        onChange={(e) => setClientId(e.target.value)}
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="K001-001">K001-001</option>
                                        <option value="K001-002">K001-002</option>
                                        <option value="K001-003">K001-003</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location ID
                                </label>
                                <div className="relative">
                                    <select
                                        value={locationId}
                                        onChange={(e) => setLocationId(e.target.value)}
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="K001-001">K001-001</option>
                                        <option value="K001-002">K001-002</option>
                                        <option value="K001-003">K001-003</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assign category
                                </label>
                                <div className="relative">
                                    <select
                                        value={assignCategory}
                                        onChange={(e) => setAssignCategory(e.target.value)}
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center space-x-4 pt-8">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignSuperVisor;