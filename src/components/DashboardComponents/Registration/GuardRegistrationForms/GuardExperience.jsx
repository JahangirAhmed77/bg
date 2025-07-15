'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const GuardExperience = ({ onNext, onPrevious, initialData = {} }) => {
    const validationSchema = Yup.object({
        exServiceMen: Yup.string().required('Ex-Ex Service Men is required'),
        armyNo: Yup.string().when('exServiceMen', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('Army No. is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        rank: Yup.string().when('exServiceMen', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('Rank is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        unitCorpsService: Yup.string().when('exServiceMen', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('Unit Corps Service is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        totalServiceYears: Yup.number().min(0, 'Years must be 0 or greater'),
        totalServiceMonths: Yup.number().min(0, 'Months must be 0 or greater').max(11, 'Months must be less than 12'),
        branch: Yup.string().when('exServiceMen', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('Branch is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        exServicemanDischargeBookNo: Yup.string().when('exServiceMen', {
            is: (value) => value === 'Yes',
            then: (schema) => schema.required('Ex-Serviceman Discharge Book No. is required'),
            otherwise: (schema) => schema.notRequired()
        }),
        anyCitation: Yup.string(),
        recentCivilEmployment: Yup.string(),
        placeOfDuty: Yup.string(),
        totalYearsInSecurity: Yup.number().min(0, 'Years must be 0 or greater').required('Total Years in Security is required')
    });

    const initialValues = {
        exServiceMen: initialData.exServiceMen || '',
        armyNo: initialData.armyNo || '',
        rank: initialData.rank || '',
        unitCorpsService: initialData.unitCorpsService || '',
        totalServiceYears: initialData.totalServiceYears || 0,
        totalServiceMonths: initialData.totalServiceMonths || 0,
        branch: initialData.branch || '',
        exServicemanDischargeBookNo: initialData.exServicemanDischargeBookNo || '',
        anyCitation: initialData.anyCitation || '',
        recentCivilEmployment: initialData.recentCivilEmployment || '',
        placeOfDuty: initialData.placeOfDuty || '',
        totalYearsInSecurity: initialData.totalYearsInSecurity || 0,
        ...initialData
    };

    const handleSubmit = (values) => {
        console.log('Experience Information:', values);
        if (onNext) {
            onNext(values);
        }
    };

    const exServiceOptions = [
        'Yes',
        'No'
    ];

    const ranks = [
        'Captain',
        'Major',
        'Colonel',
        'Lieutenant',
        'Sergeant',
        'Corporal',
        'Private',
        'Other'
    ];

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
                    <div className="text-sm text-gray-500">Step 4 of 8</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
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
                            {/* Ex-Ex Service Men */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ex-Ex Service Men
                                </label>
                                <div className="relative">
                                    <Field
                                        as="select"
                                        name="exServiceMen"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        {exServiceOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Field>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <ErrorMessage name="exServiceMen" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Army No. */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Army No.
                                </label>
                                <Field
                                    type="text"
                                    name="armyNo"
                                    placeholder="Enter Army No."
                                    disabled={values.exServiceMen !== 'Yes'}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <ErrorMessage name="armyNo" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Rank */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rank
                                </label>
                                <div className="relative">
                                    <Field
                                        as="select"
                                        name="rank"
                                        disabled={values.exServiceMen !== 'Yes'}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">Select</option>
                                        {ranks.map((rank) => (
                                            <option key={rank} value={rank}>
                                                {rank}
                                            </option>
                                        ))}
                                    </Field>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <ErrorMessage name="rank" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Unit Corps Service */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Unit Corps Service
                                </label>
                                <Field
                                    type="text"
                                    name="unitCorpsService"
                                    placeholder="Enter Unit Corps Service"
                                    disabled={values.exServiceMen !== 'Yes'}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <ErrorMessage name="unitCorpsService" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Total Service - Years */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Service
                                </label>
                                <div className="flex space-x-2">
                                    <div className="flex-1">
                                        <NumberInput
                                            name="totalServiceYears"
                                            value={values.totalServiceYears}
                                            setFieldValue={setFieldValue}
                                            disabled={values.exServiceMen !== 'Yes'}
                                            label="Years"
                                        />
                                        <div className="text-xs text-gray-500 mt-1 text-center">Years</div>
                                    </div>
                                    <div className="flex-1">
                                        <NumberInput
                                            name="totalServiceMonths"
                                            value={values.totalServiceMonths}
                                            setFieldValue={setFieldValue}
                                            disabled={values.exServiceMen !== 'Yes'}
                                            label="Months"
                                        />
                                        <div className="text-xs text-gray-500 mt-1 text-center">Months</div>
                                    </div>
                                </div>
                                <ErrorMessage name="totalServiceYears" component="div" className="text-red-500 text-sm mt-1" />
                                <ErrorMessage name="totalServiceMonths" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Branch */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch
                                </label>
                                <Field
                                    type="text"
                                    name="branch"
                                    placeholder="Enter Branch"
                                    disabled={values.exServiceMen !== 'Yes'}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <ErrorMessage name="branch" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Ex-Serviceman Discharge Book No. */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ex-Serviceman Discharge Book No.
                            </label>
                            <Field
                                type="text"
                                name="exServicemanDischargeBookNo"
                                placeholder="Enter Ex-Serviceman Discharge Book No."
                                disabled={values.exServiceMen !== 'Yes'}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <ErrorMessage name="exServicemanDischargeBookNo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Any Citation / Additional at your service */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Any Citation / Additional at your service
                            </label>
                            <Field
                                as="textarea"
                                name="anyCitation"
                                rows="3"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <ErrorMessage name="anyCitation" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Recent Civil Employment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Recent Civil Employment
                                </label>
                                <Field
                                    type="text"
                                    name="recentCivilEmployment"
                                    placeholder="Enter Recent Civil Employment"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="recentCivilEmployment" component="div" className="text-red-500 text-sm mt-1" />
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

                            {/* Total Years in Security */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Years in Security
                                </label>
                                <NumberInput
                                    name="totalYearsInSecurity"
                                    value={values.totalYearsInSecurity}
                                    setFieldValue={setFieldValue}
                                    label="Years"
                                />
                                <ErrorMessage name="totalYearsInSecurity" component="div" className="text-red-500 text-sm mt-1" />
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

export default GuardExperience; 