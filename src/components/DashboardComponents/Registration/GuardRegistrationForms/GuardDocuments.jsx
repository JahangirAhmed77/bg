'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Plus, X, Check } from 'lucide-react';

const GuardDocuments = ({ onNext, onPrevious, initialData = {} }) => {
    const documentFields = [
        { name: 'picturePassport', label: 'Picture (passport MRIS)', required: true },
        { name: 'drivingLicenseFront', label: 'Driving License Front', required: false },
        { name: 'cnicFront', label: 'CNIC Front', required: true },
        { name: 'drivingLicenseBack', label: 'Driving License Back', required: false },
        { name: 'cnicBack', label: 'CNIC Back', required: true },
        { name: 'policeVerification', label: 'Police Verification', required: true },
        { name: 'dischargeBook', label: 'Discharge Book', required: false },
        { name: 'specialBranchVerification', label: 'Special Branch Verification', required: false },
        { name: 'medicalHealthCertificate', label: 'Medical/ Health Certificate', required: true },
        { name: 'matricMarkup', label: 'Matric Markup', required: true },
        { name: 'mentalDocuments', label: 'Mental Documents', required: false },
        { name: 'matricMarkupRef1', label: 'Matric Markup Reference 1', required: false },
        { name: 'sscDriving', label: 'SSC Driving', required: false },
        { name: 'matricMarkupRef2', label: 'Matric Markup Reference 2', required: false },
        { name: 'educationCertificate', label: 'Education Certificate', required: true },
        { name: 'afmaTrainingCertificate', label: 'AFMA Training/Firing Certificate', required: false },
        { name: 'othersMisc1', label: 'Others Misc. 1', required: false },
        { name: 'othersMisc2', label: 'Others Misc. 2', required: false }
    ];

    const [uploadedFiles, setUploadedFiles] = useState(() => {
        const initialFiles = {};
        documentFields.forEach(field => {
            initialFiles[field.name] = initialData.uploadedFiles?.[field.name] || null;
        });
        return initialFiles;
    });

    const validationSchema = Yup.object({
        orangeCnicSubmitted: Yup.string().required('Please specify if Orange CNIC is submitted'),
    });

    const initialValues = {
        orangeCnicSubmitted: initialData.orangeCnicSubmitted || '',
        ...documentFields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] || '';
            return acc;
        }, {})
    };

    const handleSubmit = (values) => {
        // Check if all required files are uploaded
        const missingRequired = documentFields
            .filter(field => field.required && !uploadedFiles[field.name])
            .map(field => field.label);

        if (missingRequired.length > 0) {
            alert(`Please upload the following required documents: ${missingRequired.join(', ')}`);
            return;
        }

        const formData = {
            ...values,
            uploadedFiles
        };

        console.log('Guard Documents Information:', formData);
        if (onNext) {
            onNext(formData);
        }
    };

    const handleFileUpload = (fieldName, event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload only JPG, PNG, or PDF files');
                return;
            }

            // Validate file size (max 10MB for documents)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                alert('File size must be less than 10MB');
                return;
            }

            setUploadedFiles(prev => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };

    const removeFile = (fieldName) => {
        setUploadedFiles(prev => ({
            ...prev,
            [fieldName]: null
        }));
    };

    const DocumentUploadField = ({ field }) => {
        const file = uploadedFiles[field.name];
        const isRequired = field.required;

        return (
            <div className="flex items-center space-x-3">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            value={file ? file.name : ''}
                            placeholder={field.label}
                            readOnly
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        />
                        {file && (
                            <button
                                type="button"
                                onClick={() => removeFile(field.name)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileUpload(field.name, e)}
                        className="hidden"
                        id={`upload-${field.name}`}
                    />
                    <label
                        htmlFor={`upload-${field.name}`}
                        className="flex items-center justify-center w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-md cursor-pointer transition-colors"
                    >
                        {file ? (
                            <Check className="h-5 w-5 text-green-600" />
                        ) : (
                            <Plus className="h-5 w-5 text-blue-600" />
                        )}
                    </label>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Upload Employee Documents/ Bio-Metric</h2>
                    <div className="text-sm text-gray-500">Step 7 of 8</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-6">
                        {/* Document Upload Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {documentFields.map((field) => (
                                <DocumentUploadField key={field.name} field={field} />
                            ))}
                        </div>

                        {/* Orange CNIC Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Orange CNIC Submitted
                                </label>
                                <div className="flex space-x-6">
                                    <label className="flex items-center">
                                        <Field
                                            type="radio"
                                            name="orangeCnicSubmitted"
                                            value="yes"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <Field
                                            type="radio"
                                            name="orangeCnicSubmitted"
                                            value="no"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">No</span>
                                    </label>
                                </div>
                                <ErrorMessage name="orangeCnicSubmitted" component="div" className="text-red-500 text-sm mt-1" />
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
                                {isSubmitting ? 'Uploading...' : 'Continue'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default GuardDocuments; 