'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Download, FileText, Calculator } from 'lucide-react';
import { userRequest } from '@/lib/RequestMethods';
import toast from 'react-hot-toast';
import { useCurrentUser } from '@/lib/hooks';
import { months } from '@/constants/FormConstantFields';
import { getYearAndMonth, getDaysInMonth } from '@/utils/FormHelpers/dateHelpers';

const PayRollForm = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [locations, setLocations] = useState([]);
    const [payrollData, setPayrollData] = useState([]);
    const { user } = useCurrentUser();
    // Validation schema
    const validationSchema = Yup.object({
        locationId: Yup.string().required('Location ID is required'),
        date: Yup.string().required('Date is required'),
        totalDays: Yup.number().required('Total days is required')
    });

    // Initial values
    const initialValues = {
        locationId: '',
        date: '',
        totalDays: 31,
    };

    // Get current year dynamically if needed
    const currentYear = new Date().getFullYear();

    // Function to get number of days in a month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    useEffect(() => {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB');
        const time = now.toLocaleTimeString('en-US');
        setCurrentDate(date);
        setCurrentTime(time);
    }, []);

    // Use API response data instead of mock data
    const guards = payrollData || [];

    useEffect(() => {
        const getLocationsByOrganzation = async () => {
            try {
                const res = await userRequest.get('/location/by-organization');
                setLocations(res.data.data);

            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch locations');
            }
        };

        getLocationsByOrganzation();
    }, []);

    const calculatePayroll = (employee) => {
        // Handle missing data with fallbacks
        const basicSalary = employee.guardFinances?.salaryPerMonth || 0;
        const presentDays = employee.attendanceStats?.P || 0;
        const allowance = employee.guardFinances?.allowance || 0;
        const overtimeRate = employee.guardFinances?.overtimePerHour || 0;
        const gazettedHoliday = employee.guardFinances?.gazettedHoliday || 0;

        const workingDays = 30; // Standard month
        const dailyRate = basicSalary / workingDays;
        const earnedSalary = dailyRate * presentDays;

        // Calculate overtime pay (assuming some overtime hours if not available)
        const overtimeHours = 0; // Not available in API response
        const overtimePay = overtimeHours * overtimeRate;

        const grossSalary = earnedSalary + allowance + overtimePay + gazettedHoliday;
        const netSalary = employee.netSalary || grossSalary; // Use API netSalary if available

        return {
            earnedSalary: Math.round(earnedSalary),
            overtimePay: Math.round(overtimePay),
            grossSalary: Math.round(grossSalary),
            netSalary: Math.round(netSalary),
            allowance: Math.round(allowance),
            gazettedHolidayAmount: Math.round(gazettedHoliday)
        };
    };

    const handleGeneratePayroll = async (values) => {


        try {
            const res = await userRequest.get(`/attendance/guard/payroll/${values.locationId}?date=${values.date}&totalDays=${values.totalDays}`);
            console.log(res.data.data);
            if (res.data.data.length > 0) {
                toast.success('Payroll generated successfully');
                setPayrollData(res.data.data);
            } else {
                toast.error('No payroll data available');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to generate payroll');
        }


    };

    const getFirstDateOfMonth = (month) => {
        return `${currentYear}-${month.value}-01`;
    };


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
                            <span className="text-gray-900 font-medium">Pay Roll</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-md mt-8 p-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleGeneratePayroll}
                >
                    {({ values, isSubmitting, setFieldValue }) => {
                        
                        useEffect(() => {
                            if (values.date) {
                                const { year, month } = getYearAndMonth(values.date);
                                const days = getDaysInMonth(year, month);
                                setFieldValue('totalDays', days);
                            }
                        }, [values.date, setFieldValue]);
                        return (
                            <Form className="space-y-8">
                                {/* Auto Fields Row */}
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Office ID
                                        </label>
                                        <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                            {user?.id?.slice(0, 8)}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date
                                        </label>
                                        <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                            {currentDate}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time
                                        </label>
                                        <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                            {currentTime}
                                        </div>
                                    </div>
                                </div>

                                {/* Payroll Generation Section */}
                                <div className="space-y-6">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Generate Location Pay Roll
                                    </h2>

                                    {/* Selection Fields */}
                                    <div className="grid grid-cols-4 gap-6">

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Select Month *
                                            </label>
                                            <div className="relative">
                                                <Field
                                                    as="select"
                                                    name="date"
                                                    className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                                >
                                                    <option value="">Select</option>
                                                    {months.map((month, index) => {
                                                        const firstDateOfMonth = getFirstDateOfMonth(month); // Format: YYYY-MM-01

                                                        return (
                                                            <option key={index} value={firstDateOfMonth}>
                                                                {month.label}
                                                            </option>
                                                        );
                                                    })}
                                                </Field>

                                            </div>
                                            <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>




                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Total No. of Days
                                            </label>
                                            <Field
                                                name="totalDays"
                                                readOnly
                                                className="w-full px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500 cursor-not-allowed"
                                                placeholder="Auto-calculated based on selected month"
                                            />
                                        </div>
                                        <ErrorMessage name="totalDays" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Location Selection Section */}
                                    <div className="space-y-4">
                                        {/* <p className="text-sm text-gray-700">
                                        To Generate Specific Location Attendance Report<br />
                                        Please select location
                                    </p> */}
                                        <div className="grid grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Select Location *
                                                </label>
                                                <div className="relative">
                                                    <Field
                                                        as="select"
                                                        name="locationId"
                                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                                    >
                                                        <option value="">Select</option>
                                                        {locations.map((location) => (
                                                            <option key={location.id} value={location.id}>{location.locationName} - ({location.createdLocationId}) </option>
                                                        ))}
                                                    </Field>
                                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                                </div>
                                                <ErrorMessage name="locationId" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                            <div className="flex flex-col justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-3 py-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? 'Generating...' : 'Fetch Report'}
                                                </button>
                                            </div>
                                            {/* <div className="flex flex-col justify-end">
                                            <button
                                                type="button"
                                                onClick={handleDownloadPayroll}
                                                className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                            >
                                                Calculate
                                            </button>
                                        </div> */}
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
                                                        <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Net Salary</th>
                                                        <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">OverTime Amount</th>
                                                        <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Allowance Amount</th>
                                                        <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Guz. H Amount</th>
                                                        <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200 bg-green-50">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {guards.length > 0 ? guards.map((employee, index) => {
                                                      
                                                        return (
                                                            <tr key={employee.id} className="hover:bg-gray-50">
                                                                <td className="sticky left-0 z-10 bg-white px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="sticky left-8 z-10 bg-white px-3 py-2 text-xs text-gray-600 border border-gray-200 min-w-32">
                                                                    {employee.fullName || 'NA'}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.serviceNumber || 'NA'}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.location?.client?.contractNumber || 'NA'}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.location?.createdLocationId || 'NA'}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.location?.locationName || 'NA'}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.guardCategory || 'NA'}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.shift || 'NA'}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs min-w-[45px] text-gray-600 border border-gray-200 text-center">
                                                                    {employee.attendanceStats?.P || 0}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs min-w-[45px] text-gray-600 border border-gray-200 text-center">
                                                                    {employee.attendanceStats?.A || 0}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs min-w-[45px] text-gray-600 border border-gray-200 text-center">
                                                                    {employee.attendanceStats?.R || 0}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs min-w-[45px] text-gray-600 border border-gray-200 text-center">
                                                                    {employee.attendanceStats?.L || 0}
                                                                </td>
                                                               
                                                                {/* Net Salary */}
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.netSalary.toFixed(2) || 0}
                                                                </td>
                                                                {/* Overtime Amount given by organizational admin */}
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.guardFinances?.overtimePerHour || 0}
                                                                </td>
                                                                {/* Allowance Amount given by organizational admin */}
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.guardFinances?.allowance || 0}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                                    {employee.guardFinances?.gazettedHoliday || 0}
                                                                </td>
                                                                <td className="px-2 py-2 text-xs min-w-[55px] font-semibold text-green-600 border border-gray-200 text-center bg-green-50">
                                                                    {0}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }) : (
                                                        <tr>
                                                            <td colSpan="20" className="px-4 py-8 text-center text-gray-500">
                                                                No payroll data available. Please select a location and month, then click "Fetch Report" to generate payroll data.
                                                            </td>
                                                        </tr>
                                                    )}
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
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default PayRollForm; 