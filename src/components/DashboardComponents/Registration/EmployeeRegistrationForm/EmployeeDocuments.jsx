'use client';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Plus } from 'lucide-react';

const EmployeeDocuments = ({ onNext, onPrevious, initialData = {} }) => {
    const [uploadedFiles, setUploadedFiles] = useState({
        picture: null,
        cnicFront: null,
        cnicBack: null,
        drivingLicenseFront: null,
        drivingLicenseBack: null
    });

    const validationSchema = Yup.object({
        // Documents are optional for now, but can be made required
    });

    const initialValues = {
        ...initialData
    };

    const handleSubmit = (values) => {
        console.log('Employee Documents Information:', values);
        console.log('Uploaded Files:', uploadedFiles);
        if (onNext) {
            onNext({ ...values, documents: uploadedFiles });
        }
    };

    const handleFileUpload = (fieldName, event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFiles(prev => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };

    const FileUploadSection = ({ title, fieldName, placeholder }) => (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">{title}</span>
                {uploadedFiles[fieldName] && (
                    <span className="text-xs text-green-600">✓ Uploaded</span>
                )}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                    type="file"
                    id={fieldName}
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(fieldName, e)}
                    className="hidden"
                />
                <label htmlFor={fieldName} className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-500">
                            {uploadedFiles[fieldName] ? uploadedFiles[fieldName].name : placeholder}
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );

    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Upload Employee Documents/ Bio-Metric</h2>
                    <div className="text-sm text-gray-500">Step 7 of 7</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        {/* Upload Sections Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Picture */}
                            <FileUploadSection
                                title="Picture (Upto 5MB)"
                                fieldName="picture"
                                placeholder="Upload Picture"
                            />

                            {/* CNIC Front */}
                            <FileUploadSection
                                title="CNIC Front"
                                fieldName="cnicFront"
                                placeholder="Upload CNIC Front"
                            />

                            {/* CNIC Back */}
                            <FileUploadSection
                                title="CNIC Back"
                                fieldName="cnicBack"
                                placeholder="Upload CNIC Back"
                            />

                            {/* Driving License Front */}
                            <FileUploadSection
                                title="Driving License Front"
                                fieldName="drivingLicenseFront"
                                placeholder="Upload Driving License Front"
                            />

                            {/* Driving License Back */}
                            <FileUploadSection
                                title="Driving License Back"
                                fieldName="drivingLicenseBack"
                                placeholder="Upload Driving License Back"
                            />
                        </div>

                        {/* Upload Progress/Status */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm text-blue-800">
                                    Files uploaded: {Object.values(uploadedFiles).filter(file => file !== null).length} / 5
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

export default EmployeeDocuments; 