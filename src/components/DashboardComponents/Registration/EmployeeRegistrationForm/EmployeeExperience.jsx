'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Plus, Minus } from 'lucide-react';

const EmployeeExperience = ({ onNext, onPrevious, initialData = {} }) => {
    const validationSchema = Yup.object({
        recentEmployment: Yup.string().required('Recent Employment is required'),
        placeOfDuty: Yup.string().required('Place of Duty is required'),
        totalYearsInPreviousJob: Yup.number().min(0, 'Years must be 0 or greater').required('Total Years in Previous Job is required')
    });

    const initialValues = {
        recentEmployment: initialData.recentEmployment || '',
        placeOfDuty: initialData.placeOfDuty || '',
        totalYearsInPreviousJob: initialData.totalYearsInPreviousJob || 0,
        ...initialData
    };

    const handleSubmit = (values) => {
        console.log('Employee Experience Information:', values);
        if (onNext) {
            onNext(values);
        }
    };

    const NumberInput = ({ name, value, setFieldValue, disabled = false, label }) => {
        const increment = () => {
            if (!disabled) {
                setFieldValue(name, Math.max(0, (value || 0) + 1));
            }
        };

        const decrement = () => {
            if (!disabled) {
                setFieldValue(name, Math.max(0, (value || 0) - 1));
            }
        };

        return (
            <div className="flex items-center">
                <Field
                    type="number"
                    name={name}
                    min="0"
                    disabled={disabled}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                />
                <div className="flex flex-col border border-l-0 border-gray-200 rounded-r-md">
                    <button
                        type="button"
                        onClick={increment}
                        disabled={disabled}
                        className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="h-3 w-3" />
                    </button>
                    <button
                        type="button"
                        onClick={decrement}
                        disabled={disabled}
                        className="px-2 py-1 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Minus className="h-3 w-3" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
                    <div className="text-sm text-gray-500">Step 4 of 7</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '57.1%' }}></div>
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
                            {/* Recent Employment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Recent Employment
                                </label>
                                <Field
                                    type="text"
                                    name="recentEmployment"
                                    placeholder="Enter Recent Civil Employment"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="recentEmployment" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Place of Duty */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Place of Duty
                                </label>
                                <Field
                                    type="text"
                                    name="placeOfDuty"
                                    placeholder="Enter Place of Duty"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="placeOfDuty" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Total Years in Previous Job */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Years in Previous Job
                                </label>
                                <NumberInput
                                    name="totalYearsInPreviousJob"
                                    value={values.totalYearsInPreviousJob}
                                    setFieldValue={setFieldValue}
                                    label="Years"
                                />
                                <ErrorMessage name="totalYearsInPreviousJob" component="div" className="text-red-500 text-sm mt-1" />
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

export default EmployeeExperience; 