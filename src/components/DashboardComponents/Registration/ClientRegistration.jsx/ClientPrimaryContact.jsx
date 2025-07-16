'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ClientPrimaryContact = ({ onNext, onPrevious, initialData = {}, currentStepIndex = 1, totalSteps = 2 }) => {
    const validationSchema = Yup.object({
        pointOfContactName: Yup.string().required('Point of Contact Name is required'),
        pocEmail: Yup.string().email('Invalid email').required('POC Email is required'),
        pocDesignation: Yup.string().required('POC Designation is required'),
        pocContactNo: Yup.string().required('POC Contact No. is required'),
        alternateContactPerson: Yup.string(),
        alternatePocContactNo: Yup.string()
    });

    const initialValues = {
        pointOfContactName: initialData.pointOfContactName || '',
        pocEmail: initialData.pocEmail || '',
        pocDesignation: initialData.pocDesignation || '',
        pocContactNo: initialData.pocContactNo || '',
        alternateContactPerson: initialData.alternateContactPerson || '',
        alternatePocContactNo: initialData.alternatePocContactNo || '',
        ...initialData
    };

    const handleSubmit = (values) => {
        console.log('Client Primary Contact:', values);
        if (onNext) {
            onNext(values);
        }
    };

    const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

    return (
        <div className="flex-1 bg-white p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Primary Contact</h2>
                    <div className="text-sm text-gray-500">Step {currentStepIndex + 1} of {totalSteps}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-[#5570f1] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Point of Contact Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Point of Contact Name
                                </label>
                                <Field
                                    type="text"
                                    name="pointOfContactName"
                                    placeholder="Enter Point of Contact Name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="pointOfContactName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* POC Designation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    POC Designation
                                </label>
                                <Field
                                    type="text"
                                    name="pocDesignation"
                                    placeholder="Enter POC Designation"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="pocDesignation" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* POC Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    POC Email
                                </label>
                                <Field
                                    type="email"
                                    name="pocEmail"
                                    placeholder="Enter POC Email"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="pocEmail" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* POC Contact No. */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    POC Contact No.
                                </label>
                                <Field
                                    type="tel"
                                    name="pocContactNo"
                                    placeholder="Enter POC Contact"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="pocContactNo" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Alternate Contact Person */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alternate Contact Person
                                </label>
                                <Field
                                    type="text"
                                    name="alternateContactPerson"
                                    placeholder="Enter Alternate Contact Person"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="alternateContactPerson" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Alternate POC Contact No. */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alternate POC Contact No.
                                </label>
                                <Field
                                    type="tel"
                                    name="alternatePocContactNo"
                                    placeholder="Enter Alternate POC Contact No."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="alternatePocContactNo" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 mt-8">
                            <button
                                type="button"
                                onClick={onPrevious}
                                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-[#5570f1] text-white rounded-lg hover:bg-[#4560e1] transition-colors disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ClientPrimaryContact;