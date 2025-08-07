'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Download, PrinterCheck } from 'lucide-react';
import { userRequest } from '@/lib/RequestMethods';
import toast from 'react-hot-toast';

const LocationPayroll = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [locations, setLocations] = useState([]);
    const [payrollData, setPayrollData] = useState([]);

    // Validation schema
    const validationSchema = Yup.object({
        officeId: Yup.string().required('Office/Branch is required'),
        locationId: Yup.string().required('Location is required'),
        dateFrom: Yup.date().required('From date is required'),
        dateTo: Yup.date().required('To date is required'),
        totalDays: Yup.number().required('Total days is required')
    });

    // Initial values
    const initialValues = {
        officeId: '',
        locationId: '',
        dateFrom: '',
        dateTo: '',
        totalDays: 31
    };

    useEffect(() => {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB');
        const time = now.toLocaleTimeString('en-US');
        setCurrentDate(date);
        setCurrentTime(time);
    }, []);

    useEffect(() => {
        const getLocationsByOrganization = async () => {
            try {
                const res = await userRequest.get('/location/by-organization');
                setLocations(res.data.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch locations');
            }
        };

        getLocationsByOrganization();
    }, []);

    const handleFetchReport = async (values) => {
        try {
            // Mock data matching the image structure
            const mockData = [
                {
                    id: 1,
                    name: 'Zahid Khan',
                    serviceNumber: '00',
                    present: 26,
                    absent: 1,
                    rest: 3,
                    late: 1,
                    grossPensionFund: 0,
                    eobFund: 0,
                    insurance: 0,
                    advances: 0,
                    loanRepayment: 0,
                    penalty: 0,
                    miscCharges: 0,
                    netSalary: 0,
                    overTime: 0,
                    allowance: 0,
                    gazettedHoliday: 0,
                    netPayable: 0
                },
                {
                    id: 2,
                    name: 'Hassan Khan',
                    serviceNumber: '00',
                    present: 26,
                    absent: 1,
                    rest: 3,
                    late: 1,
                    grossPensionFund: 0,
                    eobFund: 0,
                    insurance: 0,
                    advances: 0,
                    loanRepayment: 0,
                    penalty: 0,
                    miscCharges: 0,
                    netSalary: 0,
                    overTime: 0,
                    allowance: 0,
                    gazettedHoliday: 0,
                    netPayable: 0
                },
                {
                    id: 3,
                    name: 'Raza Khan',
                    serviceNumber: '00',
                    present: 26,
                    absent: 1,
                    rest: 3,
                    late: 1,
                    grossPensionFund: 0,
                    eobFund: 0,
                    insurance: 0,
                    advances: 0,
                    loanRepayment: 0,
                    penalty: 0,
                    miscCharges: 0,
                    netSalary: 0,
                    overTime: 0,
                    allowance: 0,
                    gazettedHoliday: 0,
                    netPayable: 0
                }
            ];

            setPayrollData(mockData);
            toast.success('Payroll report fetched successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch payroll report');
        }
    };

    const handleSave = () => {
        toast.success('Payroll data saved successfully');
    };

    return (
        <div>
            {/* Form Card */}
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-md p-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFetchReport}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-8">
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

                            {/* Main Title */}
                            <aside>
                                <h1 className="text-lg font-[500] text-gray-800">
                                    Location Pay Roll - Net Payable to Guard
                                </h1>
                            </aside>

                            {/* Form Fields */}
                            <div className="grid grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Office/Branch
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="select"
                                            name="officeId"
                                            className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                        >
                                            <option value="">Lock as per attendance sheet</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.locationName} - ({location.createdLocationId})
                                                </option>
                                            ))}
                                        </Field>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <ErrorMessage name="officeId" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Location
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="select"
                                            name="locationId"
                                            className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                        >
                                            <option value="">Lock as per attendance sheet</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.locationName} - ({location.createdLocationId})
                                                </option>
                                            ))}
                                        </Field>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <ErrorMessage name="locationId" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Date Range
                                    </label>
                                    <Field
                                        type="date"
                                        name="dateFrom"
                                        placeholder="Lock"
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="dateFrom" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Date Range
                                    </label>
                                    <Field
                                        type="date"
                                        name="dateTo"
                                        placeholder="Lock"
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="dateTo" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Total Days
                                    </label>
                                    <Field
                                        type="number"
                                        name="totalDays"
                                        placeholder="Lock"
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="totalDays" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <aside className="flex gap-4 justify-between">
                                <article className='flex gap-2 items-center'>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-formButtonBlue text-white text-sm rounded-md hover:bg-formButtonBlueHover focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Loading...' : 'Fetch Report'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-6 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Save
                                    </button>
                                </article>

                                <aside className="flex gap-2 items-center">
                                    <button type="button" className="flex items-center gap-2 px-3 py-[5px] font-[500] text-[12px] border border-gray-300 rounded-2xl hover:bg-gray-50">
                                        <PrinterCheck className="w-4 h-4" />
                                        Print
                                    </button>

                                    <button type="button" className="flex items-center gap-2 px-3 py-[5px] font-[500] text-[12px] border border-gray-300 rounded-2xl hover:bg-gray-50">
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                </aside>
                            </aside>

                            {/* Data Table */}
                            <div className="bg-formBGBlue rounded-2xl p-6">
                                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                    <table className="min-w-full bg-white rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="sticky left-0 z-10 bg-gray-50 px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">S.No</th>
                                                <th className="sticky left-8 z-10 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 min-w-32">Name</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">SERVICE No.</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">P</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">A</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">R</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">L</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200 min-w-24">
                                                    <div className="text-center">
                                                        <span>Gross / Pension</span><br />
                                                        <span>Fund From</span><br />
                                                        <span>Allowance</span>
                                                    </div>
                                                </th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">EOB</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Insurance</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Advances</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200 min-w-20">
                                                    <div className="text-center">
                                                        <span>Loan</span><br />
                                                        <span>Repayment</span>
                                                    </div>
                                                </th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Penalty</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Misc. Charge</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200 min-w-24">
                                                    <div className="text-center">
                                                        <span>Net Salary</span><br />
                                                        <span>Data from</span><br />
                                                        <span>Attendance</span>
                                                    </div>
                                                </th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Over Time</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Allowance</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Guz. H</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200 bg-green-50">Net Payable</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payrollData.length > 0 ? payrollData.map((row, index) => (
                                                <tr key={row.id} className="hover:bg-gray-50">
                                                    <td className="sticky left-0 z-10 bg-white px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="sticky left-8 z-10 bg-white px-3 py-2 text-xs text-gray-600 border border-gray-200 min-w-32">
                                                        {row.name}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.serviceNumber}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.present}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.absent}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.rest}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.late}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center min-w-24">
                                                        <div className="text-center">
                                                            <span className="text-gray-500">Amount</span><br />
                                                            <span>{row.grossPensionFund}</span><br />
                                                            <span>{row.grossPensionFund}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.eobFund}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.insurance}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.advances}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.loanRepayment}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.penalty}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.miscCharges}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center min-w-24">
                                                        <div className="text-center">
                                                            <span className="text-gray-500">Amount</span><br />
                                                            <span>{row.netSalary}</span><br />
                                                            <span>{row.netSalary}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.overTime}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.allowance}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.gazettedHoliday}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center bg-green-50 font-semibold">
                                                        {row.netPayable}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="19" className="px-4 py-8 text-center text-gray-500">
                                                        No payroll data available. Please fill in the form and click "Fetch Report" to load data.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LocationPayroll;
