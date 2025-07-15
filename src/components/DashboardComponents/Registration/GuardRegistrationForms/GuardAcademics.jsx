'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown } from 'lucide-react';

const GuardAcademics = ({ onNext, onPrevious, initialData = {} }) => {
    const validationSchema = Yup.object({
        lastHighestEducation: Yup.string().required('Last Highest Education is required'),
        institutionCity: Yup.string().required('Institution City is required'),
        drivingLicense: Yup.string().required('Driving License is required'),
        drivingLicenseNo: Yup.string().when('drivingLicense', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('Driving License No. is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        dateOfIssueDriving: Yup.date().when('drivingLicense', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('Date of Issue is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        stateOfExpiryDriving: Yup.date().when('drivingLicense', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('State of Expiry is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        smokingCity: Yup.string().required('Smoking City is required')
    });

    const initialValues = {
        lastHighestEducation: initialData.lastHighestEducation || '',
        institutionCity: initialData.institutionCity || '',
        drivingLicense: initialData.drivingLicense || '',
        drivingLicenseNo: initialData.drivingLicenseNo || '',
        dateOfIssueDriving: initialData.dateOfIssueDriving || '1997-12-12',
        stateOfExpiryDriving: initialData.stateOfExpiryDriving || '1997-12-12',
        smokingCity: initialData.smokingCity || '',
        ...initialData
    };

    const handleSubmit = (values) => {
        console.log('Academics & Licenses Information:', values);
        if (onNext) {
            onNext(values);
        }
    };

    // Format date for display (convert from YYYY-MM-DD to DD/MM/YYYY)
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const educationLevels = [
        'Primary',
        'Middle',
        'Matriculation',
        'Intermediate',
        'Bachelor',
        'Master',
        'PhD',
        'Diploma',
        'Certificate',
        'Other'
    ];

    const drivingLicenseOptions = [
        'Yes',
        'No'
    ];

    const smokingOptions = [
        'Yes',
        'No'
    ];

    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Academics & Licenses</h2>
                    <div className="text-sm text-gray-500">Step 3 of 8</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Last Highest Education */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Highest Education
                                </label>
                                <div className="relative">
                                    <Field
                                        as="select"
                                        name="lastHighestEducation"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        {educationLevels.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </Field>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <ErrorMessage name="lastHighestEducation" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Institution City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Institution City
                                </label>
                                <Field
                                    type="text"
                                    name="institutionCity"
                                    placeholder="Enter Institution City"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="institutionCity" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Driving License */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Driving License
                                </label>
                                <div className="relative">
                                    <Field
                                        as="select"
                                        name="drivingLicense"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        {drivingLicenseOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Field>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <ErrorMessage name="drivingLicense" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Driving License No. */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Driving License No.
                                </label>
                                <Field
                                    type="text"
                                    name="drivingLicenseNo"
                                    placeholder="Enter Driving License No."
                                    disabled={values.drivingLicense !== 'Yes'}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <ErrorMessage name="drivingLicenseNo" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Date of Issue (Driving License) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Issue (Driving License)
                                </label>
                                <Field
                                    type="date"
                                    name="dateOfIssueDriving"
                                    disabled={values.drivingLicense !== 'Yes'}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {values.dateOfIssueDriving && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        Display: {formatDateForDisplay(values.dateOfIssueDriving)}
                                    </div>
                                )}
                                <ErrorMessage name="dateOfIssueDriving" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* State of Expiry (Driving License) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State of Expiry (Driving License)
                                </label>
                                <Field
                                    type="date"
                                    name="stateOfExpiryDriving"
                                    disabled={values.drivingLicense !== 'Yes'}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {values.stateOfExpiryDriving && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        Display: {formatDateForDisplay(values.stateOfExpiryDriving)}
                                    </div>
                                )}
                                <ErrorMessage name="stateOfExpiryDriving" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Smoking City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Smoking City
                                </label>
                                <div className="relative">
                                    <Field
                                        as="select"
                                        name="smokingCity"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        {smokingOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Field>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <ErrorMessage name="smokingCity" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center space-x-4 pt-8">
                            <button
                                type="button"
                                onClick={onPrevious}
                                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Continue'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default GuardAcademics; 