'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown } from 'lucide-react';

const GuardBankAccount = ({ onNext, onPrevious, initialData = {} }) => {
    const validationSchema = Yup.object({
        bankName: Yup.string().required('Bank Name is required'),
        bankCode: Yup.string().required('Bank Code is required'),
        accountNo: Yup.string()
            .matches(/^[0-9]+$/, 'Account number must contain only numbers')
            .min(8, 'Account number must be at least 8 digits')
            .required('Account No. is required'),
        iban: Yup.string()
            .matches(/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/, 'Invalid IBAN format')
            .min(15, 'IBAN must be at least 15 characters')
            .max(34, 'IBAN must not exceed 34 characters')
            .required('IBAN is required'),
        branchCode: Yup.string().required('Branch Code is required'),
        branchName: Yup.string().required('Branch Name is required')
    });

    const initialValues = {
        bankName: initialData.bankName || '',
        bankCode: initialData.bankCode || '',
        accountNo: initialData.accountNo || '',
        iban: initialData.iban || '',
        branchCode: initialData.branchCode || '',
        branchName: initialData.branchName || '',
        ...initialData
    };

    const handleSubmit = (values) => {
        console.log('Bank Account Information:', values);
        if (onNext) {
            onNext(values);
        }
    };

    const pakistaniBanks = [
        'Habib Bank Limited (HBL)',
        'United Bank Limited (UBL)',
        'Muslim Commercial Bank (MCB)',
        'National Bank of Pakistan (NBP)',
        'Allied Bank Limited (ABL)',
        'Bank Alfalah Limited',
        'Standard Chartered Bank Pakistan',
        'Faysal Bank Limited',
        'Bank Al Habib Limited',
        'Askari Bank Limited',
        'JS Bank Limited',
        'Soneri Bank Limited',
        'Bank of Punjab (BOP)',
        'Silk Bank Limited',
        'Summit Bank Limited',
        'Meezan Bank Limited',
        'Dubai Islamic Bank Pakistan',
        'BankIslami Pakistan Limited',
        'Al Baraka Bank (Pakistan) Limited',
        'First Women Bank Limited',
        'Zarai Taraqiati Bank Limited (ZTBL)',
        'The Bank of Khyber',
        'Bank of Azad Jammu & Kashmir',
        'Industrial Development Bank of Pakistan',
        'Other'
    ];

    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Add Bank Account</h2>
                    <div className="text-sm text-gray-500">Step 5 of 8</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62.5%' }}></div>
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
                            {/* Bank Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bank Name
                                </label>
                                <div className="relative">
                                    <Field
                                        as="select"
                                        name="bankName"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Select</option>
                                        {pakistaniBanks.map((bank) => (
                                            <option key={bank} value={bank}>
                                                {bank}
                                            </option>
                                        ))}
                                    </Field>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <ErrorMessage name="bankName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Bank Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bank Code
                                </label>
                                <Field
                                    type="text"
                                    name="bankCode"
                                    placeholder="Enter Bank Code"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="bankCode" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Account No. */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Account No.
                                </label>
                                <Field
                                    type="text"
                                    name="accountNo"
                                    placeholder="Enter Account No."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="accountNo" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* IBAN */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    IBAN
                                </label>
                                <Field
                                    type="text"
                                    name="iban"
                                    placeholder="Enter IBAN"
                                    style={{ textTransform: 'uppercase' }}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => {
                                        // Auto-uppercase IBAN input
                                        const value = e.target.value.toUpperCase();
                                        setFieldValue('iban', value);
                                    }}
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    Format: PK36SCBL0000001123456702
                                </div>
                                <ErrorMessage name="iban" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Branch Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch Code
                                </label>
                                <Field
                                    type="text"
                                    name="branchCode"
                                    placeholder="Enter Branch Code"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="branchCode" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Branch Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch Name
                                </label>
                                <Field
                                    type="text"
                                    name="branchName"
                                    placeholder="Enter Branch Name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <ErrorMessage name="branchName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Banking Information Guidelines
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Ensure all banking details are accurate to avoid payment delays</li>
                                            <li>IBAN format should start with PK followed by 2 digits and bank code</li>
                                            <li>Account number should match the number associated with your IBAN</li>
                                            <li>Branch code and name should correspond to your account's home branch</li>
                                        </ul>
                                    </div>
                                </div>
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

export default GuardBankAccount; 