'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Plus, X, Check } from 'lucide-react';

const GuardDocuments = ({ onNext, onPrevious, initialData = {} }) => {
    const documentFields = [
        { name: 'picture', label: 'Picture (passport size)', required: true },
        { name: 'cnicFront', label: 'CNIC Front', required: true },
        { name: 'cnicBack', label: 'CNIC Back', required: true },
        { name: 'licenseFront', label: 'License Front', required: false },
        { name: 'licenseBack', label: 'License Back', required: false },
        { name: 'policeVerification', label: 'Police Verification', required: false },
        { name: 'specialBranchVerification', label: 'Special Branch Verification', required: false },
        { name: 'dischargeBook', label: 'Discharge Book', required: false },
        { name: 'NadraVeriSys', label: 'Nadra VeriSys', required: false },
        { name: 'NadraVeriSysRef1', label: 'Nadra VeriSys Ref 1', required: false },
        { name: 'NadraVeriSysRef2', label: 'Nadra VeriSys Ref 2', required: false },
        { name: 'healthCertificate', label: 'Health Certificate', required: false },
        { name: 'medicalDocument', label: 'Medical Document', required: false },
        { name: 'DDCDriving', label: 'DDC Driving', required: false },
        { name: 'educationCertificate', label: 'Education Certificate', required: false },
        { name: 'APSAATrainingCertificate', label: 'APSAA Training Certificate', required: false },
        { name: 'misc1', label: 'Misc Document 1', required: false },
        { name: 'misc2', label: 'Misc Document 2', required: false }
    ];

    const [uploadedFiles, setUploadedFiles] = useState(() => {
        const initialFiles = {};
        documentFields.forEach(field => {
            initialFiles[field.name] = initialData.guardDocuments?.[field.name] || null;
        });
        return initialFiles;
    });

    const validationSchema = Yup.object({});

    const initialValues = {
        ...documentFields.reduce((acc, field) => {
            acc[field.name] = initialData.guardDocuments?.[field.name] || '';
            return acc;
        }, {}),
        originalCNICSubmitted: initialData.guardDocuments?.originalCNICSubmitted || false
    };

    const handleSubmit = (values) => {
        // Structure data according to API format with placeholders
        const formattedData = {
            guardDocuments: {
                picture: uploadedFiles.picture ? 'uploaded_file_placeholder' : '',
                cnicFront: uploadedFiles.cnicFront ? 'uploaded_file_placeholder' : '',
                cnicBack: uploadedFiles.cnicBack ? 'uploaded_file_placeholder' : '',
                licenseFront: uploadedFiles.licenseFront ? 'uploaded_file_placeholder' : '',
                licenseBack: uploadedFiles.licenseBack ? 'uploaded_file_placeholder' : '',
                policeVerification: uploadedFiles.policeVerification ? 'uploaded_file_placeholder' : '',
                specialBranchVerification: uploadedFiles.specialBranchVerification ? 'uploaded_file_placeholder' : '',
                dischargeBook: uploadedFiles.dischargeBook ? 'uploaded_file_placeholder' : '',
                NadraVeriSys: uploadedFiles.NadraVeriSys ? 'uploaded_file_placeholder' : '',
                NadraVeriSysRef1: uploadedFiles.NadraVeriSysRef1 ? 'uploaded_file_placeholder' : '',
                NadraVeriSysRef2: uploadedFiles.NadraVeriSysRef2 ? 'uploaded_file_placeholder' : '',
                healthCertificate: uploadedFiles.healthCertificate ? 'uploaded_file_placeholder' : '',
                medicalDocument: uploadedFiles.medicalDocument ? 'uploaded_file_placeholder' : '',
                DDCDriving: uploadedFiles.DDCDriving ? 'uploaded_file_placeholder' : '',
                educationCertificate: uploadedFiles.educationCertificate ? 'uploaded_file_placeholder' : '',
                APSAATrainingCertificate: uploadedFiles.APSAATrainingCertificate ? 'uploaded_file_placeholder' : '',
                misc1: uploadedFiles.misc1 ? 'uploaded_file_placeholder' : '',
                misc2: uploadedFiles.misc2 ? 'uploaded_file_placeholder' : '',
                originalCNICSubmitted: values.originalCNICSubmitted
            }
        };

        console.log('Guard Documents Information:', formattedData);
        if (onNext) {
            onNext(formattedData);
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
                            placeholder={field.label + (isRequired ? ' (Required)' : ' (Optional)')}
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
                    <h2 className="text-xl font-semibold text-gray-900">Upload Employee Documents</h2>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {documentFields.map((field) => (
                                <DocumentUploadField key={field.name} field={field} />
                            ))}
                        </div>

                        {/* Information Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Document Upload Guidelines
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Upload clear, high-quality images or PDF files</li>
                                            <li>Picture should be passport size with clear face visibility</li>
                                            <li>CNIC documents must be readable and valid</li>
                                            <li>License documents are optional but recommended if available</li>
                                            <li>Maximum file size: 10MB per document</li>
                                            <li>Supported formats: JPG, PNG, PDF</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Original CNIC Submitted Checkbox */}
                        <div className="flex items-center space-x-2">
                            <Field
                                type="checkbox"
                                name="originalCNICSubmitted"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="originalCNICSubmitted" className="text-sm font-medium text-gray-700">
                                Original CNIC Submitted
                            </label>
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