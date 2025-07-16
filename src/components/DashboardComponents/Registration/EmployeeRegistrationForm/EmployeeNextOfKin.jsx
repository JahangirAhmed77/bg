'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown } from 'lucide-react';

const EmployeeNextOfKin = ({ onNext, onPrevious, initialData = {} }) => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    fatherName: Yup.string().required('Father Name is required'),
    relation: Yup.string().required('Relation is required'),
    cnicNo: Yup.string()
      .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC format should be 12345-1234567-1')
      .required('CNIC No. is required'),
    countryCode: Yup.string().required('Country code is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
      .required('Phone number is required')
  });

  const initialValues = {
    fullName: initialData.fullName || '',
    fatherName: initialData.fatherName || '',
    relation: initialData.relation || '',
    cnicNo: initialData.cnicNo || '',
    countryCode: initialData.countryCode || '+92',
    phoneNumber: initialData.phoneNumber || '',
    ...initialData
  };

  const handleSubmit = (values) => {
    console.log('Employee Next of Kin Information:', values);
    if (onNext) {
      onNext(values);
    }
  };

  const relations = [
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Son',
    'Daughter',
    'Spouse',
    'Uncle',
    'Aunt',
    'Cousin',
    'Friend',
    'Other'
  ];

  const countries = [
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' }
  ];

  return (
    <div className="flex-1 bg-white p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Next of Kin/ Emergency Contact</h2>
          <div className="text-sm text-gray-500">Step 2 of 7</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28.6%' }}></div>
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
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Father Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Father Name
                </label>
                <Field
                  type="text"
                  name="fatherName"
                  placeholder="Enter Father Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="fatherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relation
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="relation"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select</option>
                    {relations.map((relation) => (
                      <option key={relation} value={relation}>
                        {relation}
                      </option>
                    ))}
                  </Field>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage name="relation" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* CNIC No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNIC No.
                </label>
                <Field
                  type="text"
                  name="cnicNo"
                  placeholder="Enter CNIC No."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="cnicNo" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Phone Number with Country Code */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  {/* Country Code Selector */}
                  <div className="relative flex-shrink-0">
                    <Field
                      as="select"
                      name="countryCode"
                      className="w-32 px-3 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </Field>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Phone Number Input */}
                  <div className="flex-1">
                    <Field
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-32">
                    <ErrorMessage name="countryCode" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="flex-1">
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
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

export default EmployeeNextOfKin;