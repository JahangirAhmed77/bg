'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Calendar, Clock, Upload } from 'lucide-react';

const ClientCompanyInformation = ({ onNext, initialData = {}, currentStepIndex = 0, totalSteps = 2 }) => {
    const validationSchema = Yup.object({
        contractNo: Yup.string().required('Contract No. is required'),
        companyName: Yup.string().required('Company Name is required'),
        clientWebSite: Yup.string(),
        city: Yup.string().required('City is required'),
        country: Yup.string().required('Country is required'),
        contactNo: Yup.string().required('Contact No. is required'),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
        industry: Yup.string().required('Industry is required'),
        address: Yup.string().required('Address is required'),
        province: Yup.string().required('Province/State is required'),
        officialEmail: Yup.string().email('Invalid email').required('Official Email is required')
    });

    const initialValues = {
        contractNo: initialData.contractNo || '0',
        autoGenerate: initialData.autoGenerate || true,
        companyName: initialData.companyName || '',
        clientWebSite: initialData.clientWebSite || '',
        city: initialData.city || '',
        country: initialData.country || '',
        contactNo: initialData.contactNo || '',
        date: initialData.date || '',
        time: initialData.time || '',
        industry: initialData.industry || '',
        address: initialData.address || '',
        province: initialData.province || '',
        officialEmail: initialData.officialEmail || '',
        contractFile: initialData.contractFile || null,
        ...initialData
    };

    const handleSubmit = (values) => {
        console.log('Client Company Information:', values);
        if (onNext) {
            onNext(values);
        }
    };

    const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

    return (
        <div className="flex-1 bg-white p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
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
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contract No. / Client ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contract No. / Client ID
                                </label>
                                <Field
                                    type="text"
                                    name="contractNo"
                                    disabled={values.autoGenerate}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <div className="text-xs text-gray-500 mt-1">Auto Generate Contract Number for each new client</div>
                                <ErrorMessage name="contractNo" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Date and Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date and Time
                                </label>
                                <div className="flex space-x-2 items-center">
                                    <div className="flex-1 flex space-x-2">
                                        <div className="relative w-1/2">
                                            <Field
                                                type="date"
                                                name="date"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1] pr-10"
                                            />
                                           
                                        </div>
                                        <div className="relative w-1/2">
                                            <Field
                                                type="time"
                                                name="time"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1] pr-10"
                                            />
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Auto Select date</div>
                                <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
                                <ErrorMessage name="time" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <Field
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter Company Name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Industry */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Industry
                                </label>
                                <Field
                                    type="text"
                                    name="industry"
                                    placeholder="Enter Industry"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="industry" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Client Web Site */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client Web Site
                                </label>
                                <Field
                                    type="url"
                                    name="clientWebSite"
                                    placeholder="Enter Client Web Site"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="clientWebSite" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <Field
                                    type="text"
                                    name="address"
                                    placeholder="Enter Address"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <Field
                                    as="select"
                                    name="city"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                >
                                    <option value="">Select</option>
                                    <option value="karachi">Karachi</option>
                                    <option value="lahore">Lahore</option>
                                    <option value="islamabad">Islamabad</option>
                                    <option value="rawalpindi">Rawalpindi</option>
                                    <option value="faisalabad">Faisalabad</option>
                                    <option value="peshawar">Peshawar</option>
                                    <option value="quetta">Quetta</option>
                                </Field>
                                <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Province/State */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Province/State
                                </label>
                                <Field
                                    as="select"
                                    name="province"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                >
                                    <option value="">Select</option>
                                    <option value="sindh">Sindh</option>
                                    <option value="punjab">Punjab</option>
                                    <option value="kpk">Khyber Pakhtunkhwa</option>
                                    <option value="balochistan">Balochistan</option>
                                    <option value="gilgit">Gilgit-Baltistan</option>
                                    <option value="ajk">Azad Jammu & Kashmir</option>
                                </Field>
                                <ErrorMessage name="province" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                </label>
                                <Field
                                    as="select"
                                    name="country"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                >
                                    <option value="">Select</option>
                                    <option value="pakistan">Pakistan</option>
                                    <option value="usa">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="canada">Canada</option>
                                    <option value="australia">Australia</option>
                                    <option value="uae">United Arab Emirates</option>
                                    <option value="saudi">Saudi Arabia</option>
                                </Field>
                                <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Official Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Official Email
                                </label>
                                <Field
                                    type="email"
                                    name="officialEmail"
                                    placeholder="Enter Official Email"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="officialEmail" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Contact No. */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact No.
                                </label>
                                <Field
                                    type="tel"
                                    name="contactNo"
                                    placeholder="Enter Contact No."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570f1]"
                                />
                                <ErrorMessage name="contactNo" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Upload Contract */}
                        <div className="mt-8">
                            <button
                                type="button"
                                className="w-full py-4 px-6 bg-[#5570f1] text-white rounded-lg hover:bg-[#4560e1] transition-colors flex items-center justify-center space-x-2"
                                onClick={() => document.getElementById('contractFile').click()}
                            >
                                <Upload className="h-5 w-5" />
                                <span>Upload Contract</span>
                            </button>
                            <input
                                id="contractFile"
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFieldValue('contractFile', e.target.files[0])}
                            />
                            {values.contractFile && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Selected: {values.contractFile.name}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 mt-8">
                            <button
                                type="button"
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

export default ClientCompanyInformation;