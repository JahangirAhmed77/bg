'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Download, PrinterCheck  } from 'lucide-react';
import { userRequest } from '@/lib/RequestMethods';
import toast from 'react-hot-toast';


const AdvancesandDeductions = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [locations, setLocations] = useState([]);
    const [deductionData, setDeductionData] = useState([]);

    // Deduction types as shown in the image
    const deductionTypes = [
        { value: 'fund', label: 'Fund' },
        { value: 'eob', label: 'EOB' },
        { value: 'advances', label: 'Advances' },
        { value: 'loan', label: 'Loan' },
        { value: 'penalty', label: 'Penalty' }
    ];

    // Validation schema
    const validationSchema = Yup.object({
        officeId: Yup.string().required('Office/Branch is required'),
        deductionType: Yup.string().required('Deduction Type is required'),
        dateFrom: Yup.date().required('From date is required'),
        dateTo: Yup.date().required('To date is required'),
        serviceNo: Yup.string().required('Service No. is required'),
        guardName: Yup.string()
    });

    // Initial values
    const initialValues = {
        officeId: '',
        deductionType: '',
        dateFrom: '',
        dateTo: '',
        serviceNo: '',
        guardName: ''
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
            // Mock data for demonstration - matches the image data
            const mockData = [
                {
                    id: 1,
                    name: 'Zahid Khan',
                    serviceNumber: '00',
                    present: 10,
                    absent: 2,
                    rest: 0,
                    late: 1,
                    providentFund: 0,
                    eobiFund: 0,
                    insurance: 0,
                    advances: 0,
                    loanRepayment: 0,
                    penalty: 0,
                    miscCharges: 0
                },
                {
                    id: 2,
                    name: 'Zahid Khan',
                    serviceNumber: '00',
                    present: 2,
                    absent: 0,
                    rest: 0,
                    late: 1,
                    providentFund: 0,
                    eobiFund: 0,
                    insurance: 0,
                    advances: 0,
                    loanRepayment: 0,
                    penalty: 0,
                    miscCharges: 0
                },
                {
                    id: 3,
                    name: 'Raza Khan',
                    serviceNumber: '00',
                    present: 4,
                    absent: 0,
                    rest: 0,
                    late: 1,
                    providentFund: 0,
                    eobiFund: 0,
                    insurance: 0,
                    advances: 0,
                    loanRepayment: 0,
                    penalty: 0,
                    miscCharges: 0
                },
                {
                    id: 4,
                    name: 'Zahid Khan',
                    serviceNumber: '00',
                    present: 4,
                    absent: 0,
                    rest: 0,
                    late: 1,
                    providentFund: 0,
                    eobiFund: 0,
                    insurance: 0,
                    advances: 0,
                    loanRepayment: 0,
                    penalty: 0,
                    miscCharges: 0
                },
              
            ];

            setDeductionData(mockData);
            toast.success('Report fetched successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch report');
        }
    };

    const handleSave = () => {
        toast.success('Data saved successfully');
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
                            <aside >
                                <h1 className="text-lg font-[500]  text-gray-800">
                                    Advances and Deduction Adjustment - Guard Wise
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
                                            <option value="">Lock for Office / Branch for Org. Admin</option>
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
                                        Select Deduction Type
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="select"
                                            name="deductionType"
                                            className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                        >
                                            <option value="">Fund, EOB, Advances, Loan, Penalty</option>
                                            {deductionTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </Field>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <ErrorMessage name="deductionType" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        From Date
                                    </label>
                                    <Field
                                        type="date"
                                        name="dateFrom"
                                        placeholder="From"
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="dateFrom" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        To Date
                                    </label>
                                    <Field
                                        type="date"
                                        name="dateTo"
                                        placeholder="To"
                                        className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="dateTo" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Service No.
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="select"
                                            name="serviceNo"
                                            className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                        >
                                            <option value="">Select</option>
                                            <option value="001">001</option>
                                            <option value="002">002</option>
                                            <option value="003">003</option>
                                        </Field>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <ErrorMessage name="serviceNo" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Guard Name Field */}
                                <div className="">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Guard Name
                                        </label>
                                        <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                                            Auto
                                        </div>
                                    </div>
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
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Provident Fund</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">EOBI Fund</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Insurance</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Advances</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Loan Repayment</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Penalty</th>
                                                <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">Misc Charges</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {deductionData.length > 0 ? deductionData.map((row, index) => (
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
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.providentFund}
                                                    </td>
                                                    <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                                                        {row.eobiFund}
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
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="14" className="px-4 py-8 text-center text-gray-500">
                                                        No deduction data available. Please fill in the form and click "Fetch Report" to load data.
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

export default AdvancesandDeductions;