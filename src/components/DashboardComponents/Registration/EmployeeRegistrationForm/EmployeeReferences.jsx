'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Upload, X, Plus, Trash2 } from 'lucide-react';

const EmployeeReferences = ({ onNext, onPrevious, initialData = {} }) => {
    // Initialize with one reference from initialData or empty
    const [references, setReferences] = useState(() => {
        if (initialData.references && initialData.references.length > 0) {
            return initialData.references;
        }
        return [
            {
                id: 1,
                fullName: '',
                fatherName: '',
                cnicNo: '',
                contactNo: '',
                relationship: '',
                currentAddress: '',
                permanentAddress: '',
                uploadedFile: null
            }
        ];
    });

    const relationships = [
        'Father',
        'Mother',
        'Brother',
        'Sister',
        'Uncle',
        'Aunt',
        'Cousin',
        'Friend',
        'Colleague',
        'Neighbor',
        'Teacher',
        'Employer',
        'Other'
    ];

    // Create validation schema dynamically based on number of references
    const createValidationSchema = () => {
        const schema = {};
        references.forEach((_, index) => {
            schema[`reference_${index}_fullName`] = Yup.string().required('Full Name is required');
            schema[`reference_${index}_fatherName`] = Yup.string().required("Father's Name is required");
            schema[`reference_${index}_cnicNo`] = Yup.string()
                .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC format should be 12345-1234567-1')
                .required('CNIC No. is required');
            schema[`reference_${index}_contactNo`] = Yup.string()
                .matches(/^[\+]?[0-9]{10,15}$/, 'Invalid contact number')
                .required('Contact No. is required');
            schema[`reference_${index}_relationship`] = Yup.string().required('Relationship is required');
            schema[`reference_${index}_currentAddress`] = Yup.string().required('Current Address is required');
            schema[`reference_${index}_permanentAddress`] = Yup.string().required('Permanent Address is required');
        });
        return Yup.object(schema);
    };

    // Create initial values dynamically based on references
    const createInitialValues = () => {
        const values = {};
        references.forEach((ref, index) => {
            values[`reference_${index}_fullName`] = ref.fullName;
            values[`reference_${index}_fatherName`] = ref.fatherName;
            values[`reference_${index}_cnicNo`] = ref.cnicNo;
            values[`reference_${index}_contactNo`] = ref.contactNo;
            values[`reference_${index}_relationship`] = ref.relationship;
            values[`reference_${index}_currentAddress`] = ref.currentAddress;
            values[`reference_${index}_permanentAddress`] = ref.permanentAddress;
        });
        return values;
    };

    const addReference = () => {
        const newRef = {
            id: Date.now(),
            fullName: '',
            fatherName: '',
            cnicNo: '',
            contactNo: '',
            relationship: '',
            currentAddress: '',
            permanentAddress: '',
            uploadedFile: null
        };
        setReferences([...references, newRef]);
    };

    const removeReference = (id) => {
        if (references.length > 1) {
            setReferences(references.filter(ref => ref.id !== id));
        }
    };

    const handleFileUpload = (referenceId, event) => {
        const file = event.target.files[0];
        if (file) {
            setReferences(references.map(ref =>
                ref.id === referenceId
                    ? { ...ref, uploadedFile: file }
                    : ref
            ));
        }
    };

    const removeFile = (referenceId) => {
        setReferences(references.map(ref =>
            ref.id === referenceId
                ? { ...ref, uploadedFile: null }
                : ref
        ));
    };

    const handleSubmit = (values) => {
        // Convert form values back to references structure
        const updatedReferences = references.map((ref, index) => ({
            ...ref,
            fullName: values[`reference_${index}_fullName`],
            fatherName: values[`reference_${index}_fatherName`],
            cnicNo: values[`reference_${index}_cnicNo`],
            contactNo: values[`reference_${index}_contactNo`],
            relationship: values[`reference_${index}_relationship`],
            currentAddress: values[`reference_${index}_currentAddress`],
            permanentAddress: values[`reference_${index}_permanentAddress`]
        }));

        console.log('Employee References Information:', updatedReferences);
        if (onNext) {
            onNext({ references: updatedReferences });
        }
    };

    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">References / Guarantors</h2>
                    <div className="text-sm text-gray-500">Step 6 of 7</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85.7%' }}></div>
                </div>
            </div>

            <Formik
                initialValues={createInitialValues()}
                validationSchema={createValidationSchema()}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-8">
                        {references.map((reference, index) => (
                            <div key={reference.id} className="border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Reference {index + 1}
                                    </h3>
                                    {references.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeReference(reference.id)}
                                            className="text-red-600 hover:text-red-700 focus:outline-none"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <Field
                                            type="text"
                                            name={`reference_${index}_fullName`}
                                            placeholder="Enter Full Name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <ErrorMessage name={`reference_${index}_fullName`} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Father's Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Father's Name
                                        </label>
                                        <Field
                                            type="text"
                                            name={`reference_${index}_fatherName`}
                                            placeholder="Enter Father's Name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <ErrorMessage name={`reference_${index}_fatherName`} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* CNIC No. */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CNIC No.
                                        </label>
                                        <Field
                                            type="text"
                                            name={`reference_${index}_cnicNo`}
                                            placeholder="Enter CNIC No."
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <ErrorMessage name={`reference_${index}_cnicNo`} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Contact No. */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact No.
                                        </label>
                                        <Field
                                            type="text"
                                            name={`reference_${index}_contactNo`}
                                            placeholder="Enter Contact No."
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <ErrorMessage name={`reference_${index}_contactNo`} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Relationship */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Relationship
                                        </label>
                                        <div className="relative">
                                            <Field
                                                as="select"
                                                name={`reference_${index}_relationship`}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                            >
                                                <option value="">Select Relationship</option>
                                                {relationships.map((rel) => (
                                                    <option key={rel} value={rel}>
                                                        {rel}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                        </div>
                                        <ErrorMessage name={`reference_${index}_relationship`} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Current Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Address
                                        </label>
                                        <Field
                                            type="text"
                                            name={`reference_${index}_currentAddress`}
                                            placeholder="Enter Current Address"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <ErrorMessage name={`reference_${index}_currentAddress`} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Permanent Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Permanent Address
                                        </label>
                                        <Field
                                            type="text"
                                            name={`reference_${index}_permanentAddress`}
                                            placeholder="Enter Permanent Address"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <ErrorMessage name={`reference_${index}_permanentAddress`} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* File Upload */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload Document (Optional)
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    id={`file-${reference.id}`}
                                                    onChange={(e) => handleFileUpload(reference.id, e)}
                                                    className="hidden"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                />
                                                <label
                                                    htmlFor={`file-${reference.id}`}
                                                    className="cursor-pointer flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Upload className="h-5 w-5 mr-2" />
                                                    Choose File
                                                </label>
                                            </div>
                                            {reference.uploadedFile && (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-600">
                                                        {reference.uploadedFile.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(reference.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Reference Button */}
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={addReference}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Another Reference
                            </button>
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

export default EmployeeReferences; 