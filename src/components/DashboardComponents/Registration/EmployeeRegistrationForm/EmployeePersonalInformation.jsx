'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Calendar } from 'lucide-react';

const EmployeePersonalInformation = ({ onNext, initialData = {} }) => {
  const validationSchema = Yup.object({
    serviceNo: Yup.string().required('Service No. is required'),
    dateOfRecruitment: Yup.date().required('Date of Recruitment is required'),
    autoGenerate: Yup.boolean(),
    fullName: Yup.string().required('Full Name is required'),
    fatherName: Yup.string().required('Father Name is required'),
    cnicNo: Yup.string()
      .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC format should be 12345-1234567-1')
      .required('CNIC No. is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    dateOfIssue: Yup.date().required('Date of Issue is required'),
    contactNo: Yup.string()
      .matches(/^[\+]?[0-9]{10,15}$/, 'Invalid contact number')
      .required('Contact No. is required'),
    currentAddress: Yup.string().required('Current Address is required'),
    permanentAddress: Yup.string().required('Permanent Address is required'),
    religionSect: Yup.string().required('Religion Sect is required'),
    height: Yup.number().positive('Height must be positive').required('Height is required'),
    religion: Yup.string().required('Religion is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    eobiNo: Yup.string().required('EOBI No. is required')
  });

  const initialValues = {
    serviceNo: initialData.serviceNo || '12345',
    dateOfRecruitment: initialData.dateOfRecruitment || '12/10/2020',
    autoGenerate: initialData.autoGenerate || true,
    fullName: initialData.fullName || '',
    fatherName: initialData.fatherName || '',
    cnicNo: initialData.cnicNo || '',
    dateOfBirth: initialData.dateOfBirth || '12/12/1997',
    dateOfIssue: initialData.dateOfIssue || '12/12/1997',
    contactNo: initialData.contactNo || '',
    currentAddress: initialData.currentAddress || '',
    permanentAddress: initialData.permanentAddress || '',
    religionSect: initialData.religionSect || '',
    height: initialData.height || '',
    religion: initialData.religion || '',
    bloodGroup: initialData.bloodGroup || '',
    eobiNo: initialData.eobiNo || '',
    ...initialData
  };

  const handleSubmit = (values) => {
    console.log('Employee Personal Information:', values);
    if (onNext) {
      onNext(values);
    }
  };

  return (
    <div className="flex-1 bg-white p-8">

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <div className="text-sm text-gray-500">Step 1 of 7</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '14.3%' }}></div>
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
              {/* Service No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SERVICE NO.
                </label>
                <Field
                  type="text"
                  name="serviceNo"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">Auto Generate SERVICE_NO.</div>
                <ErrorMessage name="serviceNo" component="div" className="text-red-500 text-sm mt-1" />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date and Time of Recruitment
                </label>
                <div className="flex space-x-2">
                  <Field
                    type="text"
                    name="dateOfRecruitment"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
                    12:00 PM
                  </div>
                  <Calendar className="mt-3 h-5 w-5 text-gray-400" />
                </div>
                <div className="text-xs text-gray-500 mt-1">Auto Select date</div>
                <ErrorMessage name="dateOfRecruitment" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="fatherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="flex space-x-2">
                  <Field
                    type="text"
                    name="dateOfBirth"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="mt-3 h-5 w-5 text-gray-400" />
                </div>
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="cnicNo" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Date of Issue (CNIC) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Of Issue(CNIC)
                </label>
                <div className="flex space-x-2">
                  <Field
                    type="text"
                    name="dateOfIssue"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="mt-3 h-5 w-5 text-gray-400" />
                </div>
                <ErrorMessage name="dateOfIssue" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Date of Expiry (CNIC) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Of Expiry(CNIC)
                </label>
                <div className="flex space-x-2">
                  <Field
                    type="text"
                    name="dateOfExpiry"
                    value="12/12/1997"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="mt-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Contact No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact No.
                </label>
                <Field
                  type="text"
                  name="contactNo"
                  placeholder="Enter Contact No."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="contactNo" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Current Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Address
                </label>
                <Field
                  type="text"
                  name="currentAddress"
                  placeholder="Enter Current Address"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="currentAddress" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Permanent Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Address
                </label>
                <Field
                  type="text"
                  name="permanentAddress"
                  placeholder="Enter Permanent Address"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="permanentAddress" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Religion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="religion"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="Islam">Islam</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage name="religion" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Religion Sect */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion Sect
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="religionSect"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="Sunni">Sunni</option>
                    <option value="Shia">Shia</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage name="religionSect" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </label>
                <div className="flex">
                  <Field
                    type="number"
                    name="height"
                    value="0"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-md text-sm text-gray-600">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <ErrorMessage name="height" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="bloodGroup"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Field>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage name="bloodGroup" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* EOBI No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EOBI No.
                </label>
                <Field
                  type="text"
                  name="eobiNo"
                  placeholder="Enter EOBI No"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="eobiNo" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 pt-8">
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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

export default EmployeePersonalInformation;