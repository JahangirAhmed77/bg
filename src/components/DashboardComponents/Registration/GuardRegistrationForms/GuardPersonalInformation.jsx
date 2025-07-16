'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Calendar } from 'lucide-react';

const GuardPersonalInformation = ({ onNext, initialData = {} }) => {
  const validationSchema = Yup.object({
    registrationDate: Yup.date().required('Registration Date is required'),
    serviceNumber: Yup.number().required('Service Number is required'),
    fullName: Yup.string().required('Full Name is required'),
    fatherName: Yup.string().required('Father Name is required'),
    cnicNumber: Yup.string()
      .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC format should be 12345-1234567-1')
      .required('CNIC Number is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    cnicIssueDate: Yup.date().required('CNIC Issue Date is required'),
    cnicExpiryDate: Yup.date().required('CNIC Expiry Date is required'),
    contactNumber: Yup.string()
      .matches(/^[\+]?[0-9]{10,15}$/, 'Invalid phone number')
      .required('Contact Number is required'),
    currentAddress: Yup.string().required('Current Address is required'),
    currentAreaPoliceStation: Yup.string().required('Current Area Police Station is required'),
    currentAreaPoliceContact: Yup.string().required('Current Area Police Contact is required'),
    permanentAddress: Yup.string().required('Permanent Address is required'),
    permanentAreaPoliceStation: Yup.string().required('Permanent Area Police Station is required'),
    permanentAreaPoliceContact: Yup.string().required('Permanent Area Police Contact is required'),
    religion: Yup.string().required('Religion is required'),
    religionSect: Yup.string().required('Religion Sect is required'),
    weight: Yup.number().positive('Weight must be positive').required('Weight is required'),
    height: Yup.number().positive('Height must be positive').required('Height is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    bloodPressure: Yup.string().required('Blood Pressure is required'),
    heartBeat: Yup.string().required('Heart Beat is required'),
    eyeColor: Yup.string().required('Eye Color is required'),
    disability: Yup.string().required('Disability status is required'),
    eobiNumber: Yup.string().required('EOBI Number is required'),
    sessiNumber: Yup.string().required('SESSI Number is required')
  });

  const initialValues = {
    registrationDate: initialData.registrationDate || new Date().toISOString().split('T')[0],
    serviceNumber: initialData.serviceNumber || 12345,
    fullName: initialData.fullName || '',
    fatherName: initialData.fatherName || '',
    cnicNumber: initialData.cnicNumber || '',
    dateOfBirth: initialData.dateOfBirth || '',
    cnicIssueDate: initialData.cnicIssueDate || '',
    cnicExpiryDate: initialData.cnicExpiryDate || '',
    contactNumber: initialData.contactNumber || '',
    currentAddress: initialData.currentAddress || '',
    currentAreaPoliceStation: initialData.currentAreaPoliceStation || '',
    currentAreaPoliceContact: initialData.currentAreaPoliceContact || '',
    permanentAddress: initialData.permanentAddress || '',
    permanentAreaPoliceStation: initialData.permanentAreaPoliceStation || '',
    permanentAreaPoliceContact: initialData.permanentAreaPoliceContact || '',
    religion: initialData.religion || '',
    religionSect: initialData.religionSect || '',
    weight: initialData.weight || '',
    height: initialData.height || '',
    bloodGroup: initialData.bloodGroup || '',
    bloodPressure: initialData.bloodPressure || '120/80',
    heartBeat: initialData.heartBeat || '',
    eyeColor: initialData.eyeColor || '',
    disability: initialData.disability || '',
    eobiNumber: initialData.eobiNumber || '',
    sessiNumber: initialData.sessiNumber || '',
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
              {/* Registration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Date
                </label>
                <Field
                  type="date"
                  name="registrationDate"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="registrationDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Service Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Number
                </label>
                <Field
                  type="number"
                  name="serviceNumber"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="serviceNumber" component="div" className="text-red-500 text-sm mt-1" />
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

              {/* CNIC Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNIC Number
                </label>
                <Field
                  type="text"
                  name="cnicNumber"
                  placeholder="Enter CNIC Number (12345-1234567-1)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="cnicNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* CNIC Issue Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNIC Issue Date
                </label>
                <Field
                  type="date"
                  name="cnicIssueDate"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="cnicIssueDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* CNIC Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNIC Expiry Date
                </label>
                <Field
                  type="date"
                  name="cnicExpiryDate"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="cnicExpiryDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                    <img src="https://img.freepik.com/premium-vector/pakistan-circle-flag-logo-icon-computer-vector-illustration-design_1143296-2001.jpg?semt=ais_hybrid&w=740" alt="PK" className="w-5 h-3 mr-1 object-cover" />
                    <span className="text-sm">+92</span>
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </div>
                  <Field
                    type="text"
                    name="contactNumber"
                    placeholder="Enter Contact Number"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-sm mt-1" />
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
              {/* Current Area Police Station */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Area Police Station
                </label>
                <Field
                  type="text"
                  name="currentAreaPoliceStation"
                  placeholder="Enter Current Area Police Station"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="currentAreaPoliceStation" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Current Area Police Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Area Police Contact
                </label>
                <Field
                  type="text"
                  name="currentAreaPoliceContact"
                  placeholder="Enter Current Area Police Contact"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="currentAreaPoliceContact" component="div" className="text-red-500 text-sm mt-1" />
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
              {/* Permanent Area Police Station */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Area Police Station
                </label>
                <Field
                  type="text"
                  name="permanentAreaPoliceStation"
                  placeholder="Enter Permanent Area Police Station"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="permanentAreaPoliceStation" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Permanent Area Police Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Area Police Contact
                </label>
                <Field
                  type="text"
                  name="permanentAreaPoliceContact"
                  placeholder="Enter Permanent Area Police Contact"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="permanentAreaPoliceContact" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Religion Sect */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion Sect
                </label>
                <Field
                  type="text"
                  name="religionSect"
                  placeholder="Enter Religion Sect"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="religionSect" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <Field
                  type="number"
                  name="weight"
                  placeholder="Enter Weight"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="weight" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <Field
                  type="number"
                  name="height"
                  placeholder="Enter Height"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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

              {/* Blood Pressure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure
                </label>
                <Field
                  type="text"
                  name="bloodPressure"
                  placeholder="e.g., 120/80"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="bloodPressure" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Heart Beat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heart Beat (BPM)
                </label>
                <Field
                  type="text"
                  name="heartBeat"
                  placeholder="Enter Heart Beat"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="heartBeat" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Eye Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eye Color
                </label>
                <Field
                  type="text"
                  name="eyeColor"
                  placeholder="Enter Eye Color"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="eyeColor" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Disability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disability
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="disability"
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
                <ErrorMessage name="disability" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* EOBI Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EOBI Number
                </label>
                <Field
                  type="text"
                  name="eobiNumber"
                  placeholder="Enter EOBI Number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="eobiNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* SESSI Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SESSI Number
                </label>
                <Field
                  type="text"
                  name="sessiNumber"
                  placeholder="Enter SESSI Number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="sessiNumber" component="div" className="text-red-500 text-sm mt-1" />
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