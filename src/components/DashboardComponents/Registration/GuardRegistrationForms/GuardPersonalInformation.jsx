'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Calendar } from 'lucide-react';

const GuardPersonalInformation = ({ onNext, initialData = {} }) => {
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
    age: Yup.number().positive('Age must be positive').required('Age is required'),
    dateOfIssue: Yup.date().required('Date of Issue is required'),
    phoneNumber: Yup.string()
      .matches(/^[\+]?[0-9]{10,15}$/, 'Invalid phone number')
      .required('Phone Number is required'),
    currentAddress: Yup.string().required('Current Address is required'),
    areaPoliceStation: Yup.string().required('Area Police Station is required'),
    policeStationContact: Yup.string().required('Police Station Contact No. is required'),
    areaPoliceStationId: Yup.string().required('Area Police Station (I.C.) is required'),
    permanentAddress: Yup.string().required('Permanent Address is required'),
    policeStationContactPerm: Yup.string().required('Police Station Contact No. is required'),
    religionSect: Yup.string().required('Religion Sect is required'),
    weight: Yup.number().positive('Weight must be positive').required('Weight is required'),
    height: Yup.number().positive('Height must be positive').required('Height is required'),
    bloodPressure: Yup.string().required('Blood Pressure is required'),
    eyeColor: Yup.string().required('Eye Color is required'),
    ecbNo: Yup.string().required('ECB No. is required'),
    religion: Yup.string().required('Religion is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    shirtSize: Yup.string().required('Shirt Size is required'),
    anyDisability: Yup.string().required('Any Disability is required'),
    securityGuardNo: Yup.string().required('SECURITYGUARD No. is required')
  });

  const initialValues = {
    serviceNo: initialData.serviceNo || '12345',
    dateOfRecruitment: initialData.dateOfRecruitment || '12/10/2020',
    autoGenerate: initialData.autoGenerate || true,
    fullName: initialData.fullName || '',
    fatherName: initialData.fatherName || '',
    cnicNo: initialData.cnicNo || '',
    dateOfBirth: initialData.dateOfBirth || '12/12/1997',
    age: initialData.age || '',
    dateOfIssue: initialData.dateOfIssue || '12/12/1997',
    phoneNumber: initialData.phoneNumber || '',
    currentAddress: initialData.currentAddress || '',
    areaPoliceStation: initialData.areaPoliceStation || '',
    policeStationContact: initialData.policeStationContact || '',
    areaPoliceStationId: initialData.areaPoliceStationId || '',
    permanentAddress: initialData.permanentAddress || '',
    policeStationContactPerm: initialData.policeStationContactPerm || '',
    religionSect: initialData.religionSect || '',
    weight: initialData.weight || '',
    height: initialData.height || '',
    bloodPressure: initialData.bloodPressure || '120 / 80',
    eyeColor: initialData.eyeColor || '',
    ecbNo: initialData.ecbNo || '',
    religion: initialData.religion || '',
    bloodGroup: initialData.bloodGroup || '',
    shirtSize: initialData.shirtSize || '',
    anyDisability: initialData.anyDisability || '',
    securityGuardNo: initialData.securityGuardNo || '',
    ...initialData
  };

  const handleSubmit = (values) => {
    console.log('Personal Information:', values);
    if (onNext) {
      onNext(values);
    }
  };

  return (
    <div className="flex-1 bg-white p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <div className="text-sm text-gray-500">Step 1 of 8</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12.5%' }}></div>
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
                  Service No.
                </label>
                <Field
                  type="text"
                  name="serviceNo"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="serviceNo" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Date and Time of Recruitment */}
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
                <ErrorMessage name="dateOfRecruitment" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Auto Generate Service ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto Generate Service ID
                </label>
                <Field
                  type="text"
                  name="autoGenerate"
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md"
                />
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="fatherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* CNIC No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNIC No.
                </label>
                <Field
                  type="text"
                  name="cnicNo"
                  placeholder="Enter CNIC No. (Display with dash)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="cnicNo" component="div" className="text-red-500 text-sm mt-1" />
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

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <Field
                  type="number"
                  name="age"
                  placeholder="Auto Calculate"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Date of Issue (CNIC) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Issue (CNIC)
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

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                    <img src="https://img.freepik.com/premium-vector/pakistan-circle-flag-logo-icon-computer-vector-illustration-design_1143296-2001.jpg?semt=ais_hybrid&w=740" alt="PK" className="w-5 h-3 mr-1 object-cover" />
                    <span className="text-sm">+92</span>
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </div>
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Area Police Station (I.C.) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area Police Station (I.C.)
                </label>
                <Field
                  type="text"
                  name="areaPoliceStation"
                  placeholder="Enter Area Police Station (I.C.)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="areaPoliceStation" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Police Station Contact No. (I.C.) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Police Station Contact No. (I.C.)
                </label>
                <Field
                  type="text"
                  name="policeStationContact"
                  placeholder="Enter Police Station Contact No. (I.C.)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="policeStationContact" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Area Police Station (I.C.) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area Police Station (I.C.)
                </label>
                <Field
                  type="text"
                  name="areaPoliceStationId"
                  placeholder="Enter Area Police Station (I.C.)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="areaPoliceStationId" component="div" className="text-red-500 text-sm mt-1" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Police Station Contact No. (P.) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Police Station Contact No. (P.)
                </label>
                <Field
                  type="text"
                  name="policeStationContactPerm"
                  placeholder="Enter Police Station Contact No. (P.)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="policeStationContactPerm" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Religion Sect */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion Sect
                </label>
                <Field
                  type="text"
                  name="religionSect"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="religionSect" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <div className="flex">
                  <Field
                    type="number"
                    name="weight"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-md text-sm text-gray-600">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <ErrorMessage name="weight" component="div" className="text-red-500 text-sm mt-1" />
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

              {/* Shirt Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shirt Size
                </label>
                <Field
                  type="text"
                  name="shirtSize"
                  placeholder="S2"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="shirtSize" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure
                </label>
                <Field
                  type="text"
                  name="bloodPressure"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="bloodPressure" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Any Disability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any Disability
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="anyDisability"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="None">None</option>
                    <option value="Physical">Physical</option>
                    <option value="Mental">Mental</option>
                    <option value="Visual">Visual</option>
                    <option value="Hearing">Hearing</option>
                  </Field>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage name="anyDisability" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Eye Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eye Color
                </label>
                <Field
                  type="text"
                  name="eyeColor"
                  placeholder="Blue"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="eyeColor" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* SECURITYGUARD No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SECURITYGUARD No.
                </label>
                <Field
                  type="text"
                  name="securityGuardNo"
                  placeholder="Enter SECURITYGUARD No."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="securityGuardNo" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* ECB No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ECB No.
                </label>
                <Field
                  type="text"
                  name="ecbNo"
                  placeholder="Enter ECB No"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="ecbNo" component="div" className="text-red-500 text-sm mt-1" />
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

export default GuardPersonalInformation;