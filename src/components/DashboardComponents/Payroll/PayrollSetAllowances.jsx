'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown } from 'lucide-react';
import { userRequest } from '@/lib/RequestMethods';
import toast from 'react-hot-toast';
import { useCurrentUser } from '@/lib/hooks';


const PayrollSetAllowances = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [locations, setLocations] = useState([]);
    const [payrollData, setPayrollData] = useState([]);
    const [allowanceValues, setAllowanceValues] = useState({});
    const { user } = useCurrentUser();

    // Validation schema
    const validationSchema = Yup.object({
        locationId: Yup.string().required('Location ID is required'),
        officeId: Yup.string(),
        serviceNo: Yup.string(),
        fromDate: Yup.string().required('From date is required'),
        toDate: Yup.string().required('To date is required')
    });

    // Initial values
    const initialValues = {
        locationId: '',
        officeId: '',
        serviceNo: '',
        fromDate: '',
        toDate: ''
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
                console.error('Error fetching locations:', error);
                toast.error('Failed to fetch locations');
            }
        };

        getLocationsByOrganization();
    }, []);


    const handleGetAllowanceData = async (values) => {
        try {
            setPayrollData([]);
            setAllowanceValues({});
            const res = await userRequest.get(`/payroll/allowance/guard/${values.locationId}?from=${values.fromDate}&to=${values.toDate}`);

            if (res.data && res.data.data.result.length > 0) {
                toast.success('Guard data loaded successfully');
                setPayrollData(res.data.data.result);


                // Initialize allowance values for each guard with existing values from API
                const initialValues = {};
                res.data.data.result.forEach(guard => {
                    initialValues[guard.id] = {
                        overTimeCount: guard.allowances?.overTimeCount || 0,
                        allowancePercentage: guard.allowances?.allowancePercentage || 0,
                        holidayCount: guard.allowances?.holidayCount || 0
                    };
                });
                setAllowanceValues(initialValues);
            } else {
                toast.error('No guard data available');
            }
        } catch (error) {
            console.error('Error fetching guard data:', error);
            toast.error('Failed to load guard data');
        }
    };

    const handleInputChange = (guardId, field, value) => {
        // Validate allowance percentage to not exceed 100
        if (field === 'allowancePercentage' && parseFloat(value) > 100) {
            toast.error('Allowance percentage cannot exceed 100%');
            return;
        }

        setAllowanceValues(prev => ({
            ...prev,
            [guardId]: {
                ...prev[guardId],
                [field]: value === '' ? 0 : parseFloat(value) || 0
            }
        }));
    };

    const handleSaveAllowances = async () => {
        try {
            // Validate that we have guards to save
            if (!payrollData.length) {
                toast.error('No guard data to save. Please load guards first.');
                return;
            }

            // Prepare payload for each guard according to API specification
            const payload = payrollData.map((guard) => ({
                guardId: guard.id,
                assignedGuardId: guard.assignedGuardId,
                allowancePercentage: allowanceValues[guard.id]?.allowancePercentage || 0,
                holidayCount: allowanceValues[guard.id]?.holidayCount || 0,
                overTimeCount: allowanceValues[guard.id]?.overTimeCount || 0
            }));

            const res = await userRequest.post('/payroll/create/guard/allowance', payload);

            if (res.data && res.data.status === 'success') {
                toast.success('Allowances saved successfully for all guards');
            } else {
                toast.error('Failed to save allowances');
            }
        } catch (error) {
            console.error('Error saving allowances:', error);
            toast.error('Failed to save allowances');
        }
    };

    return (
        <div >
            {/* Breadcrumb */}

            {/* Form Card */}
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-md p-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleGetAllowanceData}
                >
                    {({ isSubmitting }) => (
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
                                    Allowances Management - Location Wise
                                </h2>

                                {/* Selection Fields */}
                                <div className="grid grid-cols-4 gap-6">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Office/Branch *
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="officeId"
                                                className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                                placeholder="Enter Office/Branch"
                                            />
                                        </div>
                                        <ErrorMessage name="officeId" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Service No. *
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="serviceNo"
                                                className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                                placeholder="Enter Service No."
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage name="serviceNo" component="div" className="text-red-500 text-sm mt-1" />

                                    {/* from date picker */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            From Date *
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="date"
                                                name="fromDate"
                                                className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage name="fromDate" component="div" className="text-red-500 text-sm mt-1" />

                                    {/* to date picker */}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            To Date *
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="date"
                                                name="toDate"
                                                className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                            />
                                        </div>
                                        <ErrorMessage name="toDate" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>


                                </div>

                                {/* Location Selection Section */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-4 gap-6">
                                        <aside>
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
                                        </aside>
                                        <div className="flex flex-col justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-2 py-3 bg-formButtonBlue text-white text-sm rounded-md hover:bg-formButtonBlueHover focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Loading...' : 'Load Guards'}
                                            </button>
                                        </div>
                                        <div className="flex flex-col justify-end">
                                            <button
                                                type="button"
                                                onClick={handleSaveAllowances}
                                                disabled={payrollData.length === 0}
                                                className="px-2 py-3 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Save
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

                                                    <th className="px-2 py-2 text-xs font-medium text-blue-700 border border-gray-200 bg-blue-50">Over Time <br />Count</th>
                                                    <th className="px-2 py-2 text-xs font-medium text-blue-700 border border-gray-200 bg-blue-50">Allowance <br />% (Max 100)</th>
                                                    <th className="px-2 py-2 text-xs font-medium text-blue-700 border border-gray-200 bg-blue-50">Holiday <br />Count</th>

                                                    <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200 bg-green-50">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {payrollData.length > 0 ? payrollData.map((employee, index) => (
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

                                                        {/* Over Time Count Input */}
                                                        <td className="px-2 py-2 border min-w-32 border-gray-200 bg-blue-50">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="1"
                                                                value={allowanceValues[employee.id]?.overTimeCount || ''}
                                                                onChange={(e) => handleInputChange(employee.id, 'overTimeCount', e.target.value)}
                                                                className="w-full px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                                placeholder="0"
                                                            />
                                                        </td>
                                                        {/* Allowance Percentage Input */}
                                                        <td className="px-2 py-2 border min-w-32 border-gray-200 bg-blue-50">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                step="0.01"
                                                                value={allowanceValues[employee.id]?.allowancePercentage || ''}
                                                                onChange={(e) => handleInputChange(employee.id, 'allowancePercentage', e.target.value)}
                                                                className="w-full px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                                placeholder="0"
                                                            />
                                                        </td>
                                                        {/* Holiday Count Input */}
                                                        <td className="px-2 py-2 border min-w-32 border-gray-200 bg-blue-50">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="1"
                                                                value={allowanceValues[employee.id]?.holidayCount || ''}
                                                                onChange={(e) => handleInputChange(employee.id, 'holidayCount', e.target.value)}
                                                                className="w-full px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                                placeholder="0"
                                                            />
                                                        </td>

                                                        {/* Total - Simple calculation showing base salary + current allowance values */}
                                                        <td className="px-2 py-2 text-xs font-semibold text-green-600 border border-gray-200 text-center bg-green-50">
                                                            {(
                                                                (employee.netSalary || 0) +
                                                                (allowanceValues[employee.id]?.overTimeCount || 0) +
                                                                (allowanceValues[employee.id]?.allowancePercentage || 0) +
                                                                (allowanceValues[employee.id]?.holidayCount || 0)
                                                            ).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="20" className="px-4 py-8 text-center text-gray-500">
                                                            No guard data available. Please select a location, date range and click "Load Guards" to fetch guard data.
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
                                            <span>Editable Fields - Over Time Count, Allowance %, Holiday Count</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default PayrollSetAllowances