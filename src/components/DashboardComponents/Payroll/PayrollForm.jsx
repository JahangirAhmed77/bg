'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, Download, FileText, Calculator } from 'lucide-react';

const PayRollForm = () => {
    const [locationId, setLocationId] = useState('');
    const [locationName, setLocationName] = useState('');
    const [payrollMonth, setPayrollMonth] = useState('');
    const [payrollYear, setPayrollYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB');
        const time = now.toLocaleTimeString('en-US');
        setCurrentDate(date);
        setCurrentTime(time);
    }, []);

    // Mock employee payroll data
    const [employees] = useState([
        {
            id: 1,
            name: 'Zahid Khan',
            serviceNo: '001',
            basicSalary: 25000,
            presentDays: 28,
            absentDays: 2,
            leaveDays: 1,
            overtimeHours: 10,
            overtimeRate: 150,
            allowances: 2000,
            deductions: 500
        },
        {
            id: 2,
            name: 'Muneeb Khalid',
            serviceNo: '002',
            basicSalary: 26000,
            presentDays: 30,
            absentDays: 0,
            leaveDays: 1,
            overtimeHours: 15,
            overtimeRate: 150,
            allowances: 2500,
            deductions: 300
        },
        {
            id: 3,
            name: 'Raza Khan',
            serviceNo: '003',
            basicSalary: 24000,
            presentDays: 29,
            absentDays: 1,
            leaveDays: 1,
            overtimeHours: 8,
            overtimeRate: 150,
            allowances: 1800,
            deductions: 400
        },
        {
            id: 4,
            name: 'Naveed',
            serviceNo: '004',
            basicSalary: 25500,
            presentDays: 27,
            absentDays: 3,
            leaveDays: 1,
            overtimeHours: 12,
            overtimeRate: 150,
            allowances: 2200,
            deductions: 600
        },
        {
            id: 5,
            name: 'Zubar',
            serviceNo: '005',
            basicSalary: 23000,
            presentDays: 30,
            absentDays: 0,
            leaveDays: 1,
            overtimeHours: 5,
            overtimeRate: 150,
            allowances: 1500,
            deductions: 250
        },
        {
            id: 6,
            name: 'Kashan Khan',
            serviceNo: '006',
            basicSalary: 26500,
            presentDays: 28,
            absentDays: 2,
            leaveDays: 1,
            overtimeHours: 18,
            overtimeRate: 150,
            allowances: 2800,
            deductions: 700
        },
        {
            id: 7,
            name: 'Umair Irfan',
            serviceNo: '007',
            basicSalary: 24500,
            presentDays: 29,
            absentDays: 1,
            leaveDays: 1,
            overtimeHours: 7,
            overtimeRate: 150,
            allowances: 2000,
            deductions: 350
        },
        {
            id: 8,
            name: 'Ahsan Ummer',
            serviceNo: '008',
            basicSalary: 25800,
            presentDays: 30,
            absentDays: 0,
            leaveDays: 1,
            overtimeHours: 14,
            overtimeRate: 150,
            allowances: 2400,
            deductions: 450
        }
    ]);

    const calculatePayroll = (employee) => {
        const workingDays = 30; // Standard month
        const dailyRate = employee.basicSalary / workingDays;
        const earnedSalary = dailyRate * employee.presentDays;
        const overtimePay = employee.overtimeHours * employee.overtimeRate;
        const grossSalary = earnedSalary + employee.allowances + overtimePay;
        const netSalary = grossSalary - employee.deductions;

        return {
            earnedSalary: Math.round(earnedSalary),
            overtimePay: Math.round(overtimePay),
            grossSalary: Math.round(grossSalary),
            netSalary: Math.round(netSalary)
        };
    };

    const handleGeneratePayroll = () => {
        if (!locationId || !locationName || !payrollMonth) {
            alert('Please select all required fields');
            return;
        }
        console.log('Generating payroll for:', { locationId, locationName, payrollMonth, payrollYear });
    };

    const handleDownloadPayroll = () => {
        console.log('Downloading payroll...');
    };

    const handlePrintPayroll = () => {
        console.log('Printing payroll...');
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const totalPayroll = employees.reduce((total, emp) => {
        const calc = calculatePayroll(emp);
        return total + calc.netSalary;
    }, 0);

    return (
        <div className="min-h-screen bg-formBGBlue flex flex-col w-full px-4 pt-4">
            {/* Breadcrumb */}
            <div className="w-full max-w-7xl">
                <aside className="bg-white border-b rounded-xl border-gray-200">
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Dashboard</span>
                            <span>&gt;</span>
                            <span>Payroll</span>
                            <span>&gt;</span>
                            <span className="text-gray-900 font-medium">Generate Pay Roll</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-md mt-8 p-8">
                <div className="space-y-8">
                    {/* Auto Fields Row */}
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User ID
                            </label>
                            <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                Auto (Display login ID)
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

                    {/* Payroll Generation Section */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Generate Pay Roll
                        </h2>

                        {/* Selection Fields */}
                        <div className="grid grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Office/Branch
                                </label>
                                <div className="relative">
                                    <select
                                        value={locationId}
                                        onChange={(e) => setLocationId(e.target.value)}
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="LOC001">LOC001</option>
                                        <option value="LOC002">LOC002</option>
                                        <option value="LOC003">LOC003</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Month
                                </label>
                                <div className="relative">
                                    <select
                                        value={payrollMonth}
                                        onChange={(e) => setPayrollMonth(e.target.value)}
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        {months.map((month, index) => (
                                            <option key={month} value={index + 1}>{month}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total No. of Days
                                </label>
                                <div className="px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md text-gray-500">
                                    Auto Month wise days
                                </div>
                            </div>

                           
                        </div>

                        {/* Location Selection Section */}
                        <div className="space-y-4">
                            <p className="text-sm text-gray-700">
                                To Generate Specific Location Attendance Report<br />
                                Please select location
                            </p>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Location
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={locationName}
                                            onChange={(e) => setLocationName(e.target.value)}
                                            className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                        >
                                            <option value="">Select</option>
                                            <option value="Main Gate">Main Gate</option>
                                            <option value="Back Gate">Back Gate</option>
                                            <option value="Parking Area">Parking Area</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <button
                                        onClick={handleGeneratePayroll}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Fetch Report
                                    </button>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <button
                                        onClick={handleDownloadPayroll}
                                        className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Calculate
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Payroll Table */}
                        <div className="bg-formBGBlue rounded-2xl p-6">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                <table className="min-w-full bg-white rounded-lg">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="sticky left-0 z-10 bg-gray-50 px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">S.No</th>
                                            <th className="sticky left-8 z-10 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 min-w-32">Name</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">SERVICE No.</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Client ID</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Location Id</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Location Name</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Category</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Shift</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">P</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">A</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">R</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">L</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Over Time</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Allowance</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Guz. H</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Net Salary</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Over Time Allowance</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Guz. H Amount</th>
                                            <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200 bg-green-50">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((employee, index) => {
                                            const payroll = calculatePayroll(employee);
                                            return (
                                                <tr key={employee.id} className="hover:bg-gray-50">
                                                    <td className="sticky left-0 z-10 bg-white px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="sticky left-8 z-10 bg-white px-3 py-2 text-xs text-gray-600 border border-gray-200 min-w-32">
                                                        {employee.name}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {employee.serviceNo}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {employee.presentDays}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {employee.absentDays}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        1
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {employee.leaveDays}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        <span className="text-xs text-gray-500">(data from location)</span>
                                                        <br />
                                                        Amount
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        00
                                                    </td>
                                                    <td className="px-2 py-2 text-xs font-semibold text-green-600 border border-gray-200 text-center bg-green-50">
                                                        Calculated
                                                        <br />
                                                        00
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Legend */}
                            <div className="mt-4 flex justify-start space-x-6 text-xs text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <div className="w-4 h-4 bg-green-100 border rounded"></div>
                                    <span>P - Present Days</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-4 h-4 bg-red-100 border rounded"></div>
                                    <span>A - Absent Days</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                                    <span>L - Leave Days</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-4 h-4 bg-blue-100 border rounded"></div>
                                    <span>OT - Overtime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayRollForm; 