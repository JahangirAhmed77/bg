'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Upload, X, Plus, Trash2 } from 'lucide-react';
import CNICInput from '@/utils/FormHelpers/CNICField';

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
                cnicNumber: '',
                contactNumber: '',
                relationship: '',
                currentAddress: '',
                permanentAddress: '',
                cnicDocument: ''
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
            schema[`reference_${index}_cnicNumber`] = Yup.string()
                .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC format should be 12345-1234567-1')
                .required('CNIC Number is required');
            schema[`reference_${index}_contactNumber`] = Yup.string()
                .matches(/^[\+]?[0-9]{10,15}$/, 'Invalid contact number')
                .required('Contact Number is required');
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
            values[`reference_${index}_cnicNumber`] = ref.cnicNumber;
            values[`reference_${index}_contactNumber`] = ref.contactNumber;
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
            cnicNumber: '',
            contactNumber: '',
            relationship: '',
            currentAddress: '',
            permanentAddress: '',
            cnicDocument: ''
        };
        setReferences([...references, newRef]);
    };

    const removeReference = (id) => {
        if (references.length > 1) {
            setReferences(references.filter(ref => ref.id !== id));
        }
    };

    const handleSubmit = (values) => {
        // Transform form values back to references array
        const referencesData = references.map((_, index) => ({
            fullName: values[`reference_${index}_fullName`] || '',
            fatherName: values[`reference_${index}_fatherName`] || '',
            cnicNumber: values[`reference_${index}_cnicNumber`] || '',
            contactNumber: values[`reference_${index}_contactNumber`] || '',
            relationship: values[`reference_${index}_relationship`] || '',
            currentAddress: values[`reference_${index}_currentAddress`] || '',
            permanentAddress: values[`reference_${index}_permanentAddress`] || '',
            cnicDocument: references[index].cnicDocument || ''
        }));

        const formData = {
            references: referencesData
        };

        console.log('Employee References Information:', formData);
        if (onNext) {
            onNext(formData);
        }
    };

    const ReferenceSection = ({ referenceIndex, reference, isRemovable }) => (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                    Reference {referenceIndex + 1}
                </h3>
                {isRemovable && (
                    <button
                        type="button"
                        onClick={() => removeReference(reference.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove this reference"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                        type="text"
                        name={`reference_${referenceIndex}_fullName`}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name={`reference_${referenceIndex}_fullName`} component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Father Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                        type="text"
                        name={`reference_${referenceIndex}_fatherName`}
                        placeholder="Enter father's name"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name={`reference_${referenceIndex}_fatherName`} component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* CNIC Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNIC Number <span className="text-red-500">*</span>
                    </label>
                    <CNICInput name={`reference_${referenceIndex}_cnicNumber`} />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                        type="tel"
                        name={`reference_${referenceIndex}_contactNumber`}
                        placeholder="Enter contact number"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name={`reference_${referenceIndex}_contactNumber`} component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Relationship */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Field
                            as="select"
                            name={`reference_${referenceIndex}_relationship`}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="">Select Relationship</option>
                            {relationships.map(rel => (
                                <option key={rel} value={rel}>{rel}</option>
                            ))}
                        </Field>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    <ErrorMessage name={`reference_${referenceIndex}_relationship`} component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Current Address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                        as="textarea"
                        name={`reference_${referenceIndex}_currentAddress`}
                        rows={3}
                        placeholder="Enter current address"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name={`reference_${referenceIndex}_currentAddress`} component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Permanent Address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Permanent Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                        as="textarea"
                        name={`reference_${referenceIndex}_permanentAddress`}
                        rows={3}
                        placeholder="Enter permanent address"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name={`reference_${referenceIndex}_permanentAddress`} component="div" className="text-red-500 text-sm mt-1" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">References / Guarantors</h2>
                    <div className="text-sm text-gray-500">Step 6 of 8</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
            </div>

            <Formik
                key={references.length} // Force re-render when references change
                initialValues={createInitialValues()}
                validationSchema={createValidationSchema()}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-6">
                        {/* Render all reference sections */}
                        {references.map((reference, index) => (
                            <ReferenceSection
                                key={reference.id}
                                referenceIndex={index}
                                reference={reference}
                                isRemovable={references.length > 1}
                            />
                        ))}

                        {/* Add Reference Button */}
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={addReference}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Another Reference
                            </button>
                        </div>

                        {/* Information Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Reference Guidelines
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Provide at least one reference</li>
                                            <li>References should know you personally</li>
                                            <li>Include accurate contact information</li>
                                            <li>Ensure references are available for verification</li>
                                            <li>Avoid using family members as references if possible</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-center space-x-4 pt-8">
                            <button
                                type="button"
                                onClick={onPrevious}
                                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : 'Continue'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EmployeeReferences; 