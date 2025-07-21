'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import CNICInput from '@/utils/FormHelpers/CNICField';

const GuardReferences = ({ onNext, onPrevious, initialData = {} }) => {
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
                permanentAddress: ''
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

    // Create initial values based on references array
    const createInitialValues = () => {
        const values = {};
        references.forEach((reference, index) => {
            values[`reference_${index}_fullName`] = reference.fullName || '';
            values[`reference_${index}_fatherName`] = reference.fatherName || '';
            values[`reference_${index}_cnicNumber`] = reference.cnicNumber || '';
            values[`reference_${index}_contactNumber`] = reference.contactNumber || '';
            values[`reference_${index}_relationship`] = reference.relationship || '';
            values[`reference_${index}_currentAddress`] = reference.currentAddress || '';
            values[`reference_${index}_permanentAddress`] = reference.permanentAddress || '';
        });
        return values;
    };

    const addReference = () => {
        const newReference = {
            id: Date.now(), // Simple ID generation
            fullName: '',
            fatherName: '',
            cnicNumber: '',
            contactNumber: '',
            relationship: '',
            currentAddress: '',
            permanentAddress: ''
        };
        setReferences(prev => [...prev, newReference]);
    };

    const removeReference = (indexToRemove) => {
        if (references.length > 1) {
            setReferences(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };

    const handleSubmit = (values) => {
        // Convert form values back to references array format
        const formattedReferences = references.map((reference, index) => ({
            fullName: values[`reference_${index}_fullName`],
            fatherName: values[`reference_${index}_fatherName`],
            cnicNumber: values[`reference_${index}_cnicNumber`],
            contactNumber: values[`reference_${index}_contactNumber`],
            relationship: values[`reference_${index}_relationship`],
            currentAddress: values[`reference_${index}_currentAddress`],
            permanentAddress: values[`reference_${index}_permanentAddress`]
        }));

        const formData = {
            references: formattedReferences
        };

        console.log('References/Guarantors Information:', formData);
        if (onNext) {
            onNext(formData);
        }
    };

    const ReferenceSection = ({ referenceIndex, reference, isRemovable }) => {
        return (
            <div className="bg-gray-50 rounded-lg p-6 space-y-4 relative">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Reference No. {referenceIndex + 1}
                    </h3>
                    {isRemovable && (
                        <button
                            type="button"
                            onClick={() => removeReference(referenceIndex)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
                            title="Remove Reference"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <Field
                            type="text"
                            name={`reference_${referenceIndex}_fullName`}
                            placeholder="Enter Full Name"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <ErrorMessage name={`reference_${referenceIndex}_fullName`} component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Father's Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Father's Name
                        </label>
                        <Field
                            type="text"
                            name={`reference_${referenceIndex}_fatherName`}
                            placeholder="Enter Father's Name"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <ErrorMessage name={`reference_${referenceIndex}_fatherName`} component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* CNIC Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CNIC Number
                        </label>
                        <CNICInput name={`reference_${referenceIndex}_cnicNumber`} label="CNIC Number" />

                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Number
                        </label>
                        <Field
                            type="text"
                            name={`reference_${referenceIndex}_contactNumber`}
                            placeholder="Enter Contact Number"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <ErrorMessage name={`reference_${referenceIndex}_contactNumber`} component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Relationship */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Relationship
                        </label>
                        <div className="relative">
                            <Field
                                as="select"
                                name={`reference_${referenceIndex}_relationship`}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="">Select Relationship</option>
                                {relationships.map((relationship) => (
                                    <option key={relationship} value={relationship}>
                                        {relationship}
                                    </option>
                                ))}
                            </Field>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                        <ErrorMessage name={`reference_${referenceIndex}_relationship`} component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Current Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Address
                        </label>
                        <Field
                            type="text"
                            name={`reference_${referenceIndex}_currentAddress`}
                            placeholder="Enter Current Address"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <ErrorMessage name={`reference_${referenceIndex}_currentAddress`} component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                {/* Permanent Address - Full Width */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Permanent Address
                    </label>
                    <Field
                        type="text"
                        name={`reference_${referenceIndex}_permanentAddress`}
                        placeholder="Enter Permanent Address"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ErrorMessage name={`reference_${referenceIndex}_permanentAddress`} component="div" className="text-red-500 text-sm mt-1" />
                </div>
            </div>
        );
    };

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
                    <Form className="space-y-8">
                        {/* Render all reference sections */}
                        {references.map((reference, index) => (
                            <ReferenceSection
                                key={reference.id}
                                referenceIndex={index}
                                reference={reference}
                                isRemovable={references.length > 1}
                            />
                        ))}

                        {/* Add More Reference Button */}
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={addReference}
                                className="flex items-center px-6 py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-md hover:border-blue-400 hover:bg-blue-50 transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add More Reference
                            </button>
                        </div>

                        {/* Information Box */}
                        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-amber-800">
                                        Important Guidelines
                                    </h3>
                                    <div className="mt-2 text-sm text-amber-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>All references must provide valid contact information</li>
                                            <li>References should be financially stable and known to the applicant</li>
                                            <li>Ensure all contact information is current and accurate</li>
                                            <li>CNIC numbers should be accurate and verifiable</li>
                                            <li>You can add multiple references as needed</li>
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

export default GuardReferences; 