'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown } from 'lucide-react';

const CreateOfficeForm = () => {
    const validationSchema = Yup.object({
        province: Yup.string().required('Province is required'),
        city: Yup.string().required('City is required'),
        contactNo: Yup.string()
            .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
            .required('Contact number is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        addressLine1: Yup.string().required('Address Line 1 is required'),
        addressLine2: Yup.string()
    });

    const initialValues = {
        province: '',
        city: '',
        contactNo: '',
        email: '',
        addressLine1: '',
        addressLine2: ''
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log('Form submitted:', values);
        // Handle form submission here
        setTimeout(() => {
            setSubmitting(false);
            resetForm();
        }, 1000);
    };

    const provinces = [
        'Balochistan',
        'Khyber Pakhtunkhwa',
        'Punjab',
        'Sindh',
        'Azad Kashmir',
        'Gilgit-Baltistan',
        'Islamabad Capital Territory'
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Create Office</h1>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Today</span>
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Select Province */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Province *
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="select"
                                            name="province"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                        >
                                            <option value="">Select</option>
                                            {provinces.map((province) => (
                                                <option key={province} value={province}>
                                                    {province}
                                                </option>
                                            ))}
                                        </Field>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <ErrorMessage name="province" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Enter City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Enter City *
                                    </label>
                                    <Field
                                        type="text"
                                        name="city"
                                        placeholder="Enter"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Contact No */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact No. *
                                    </label>
                                    <Field
                                        type="text"
                                        name="contactNo"
                                        placeholder="Enter Contact No."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="contactNo" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Email ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email ID *
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email ID"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            {/* Address Line 1 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Line 1 *
                                </label>
                                <Field
                                    type="text"
                                    name="addressLine1"
                                    placeholder=""
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="addressLine1" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Address Line 2 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Line 2(Optional)
                                </label>
                                <Field
                                    type="text"
                                    name="addressLine2"
                                    placeholder=""
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="addressLine2" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center space-x-4 pt-8">
                                <button
                                    type="button"
                                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateOfficeForm; 