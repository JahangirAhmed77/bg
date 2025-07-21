import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import Autosuggest from 'react-autosuggest';
import { countries } from '@/constants/countries';
import { pakistanCities } from '@/constants/PakistanCities';
import { locationTypes } from '@/constants/locationTypes';
import { pakistanProvinces } from '@/constants/pakistanProvinces';

const LocationInformation = ({ onNext, onPrevious, onSave, initialData = {} }) => {
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [provinceSuggestions, setProvinceSuggestions] = useState([]);
  // Professionalized getSuggestions for province (string)
  const getProvinceSuggestions = (value) => {
    const inputValue = value?.trim().toLowerCase() || '';
    if (!inputValue) return [];
    return pakistanProvinces
      .filter(province => province.toLowerCase().includes(inputValue))
      .slice(0, 5);
  };

  const validationSchema = Yup.object({
    client: Yup.string().required('Client is required'),
    time: Yup.string().required('Time is required'),
    locationName: Yup.string().required('Location Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    province: Yup.string().required('Province is required'),
    country: Yup.string().required('Country is required'),
    locationType: Yup.string().required('Location Type is required'),
    authorizedPersonName: Yup.string().required('Authorized Person Name is required'),
    authorizedPersonNumber: Yup.string().required('Authorized Person Number is required'),
    authorizedPersonDesignation: Yup.string().required('Authorized Person Designation is required'),
  });

  // Sample clients data (replace with actual data from your API)
  const sampleClients = [
    { id: 1, name: "ABC Corporation" },
    { id: 2, name: "XYZ Industries" },
    { id: 3, name: "Global Tech Solutions" },
    { id: 4, name: "Metro Security Services" },
    { id: 5, name: "Citywide Protection" }
  ];

  // ...existing code...

  const getCountrySuggestions = (value) => {
    const inputValue = value?.trim().toLowerCase() || '';
    if (!inputValue) return [];
    return countries
      .filter(country => country.name.toLowerCase().includes(inputValue))
      .slice(0, 5);
  };

  return (
    <div className="flex-1 bg-white p-8 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Location Information</h2>
          <div className="text-sm text-gray-500">Step 1 of 4</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Values:', values); // This will show the payload in browser console
          onSave(values);
          onNext(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field name="client">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
                    <select {...field} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select</option>
                      {sampleClients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage name="client" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="time">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date and Time</label>
                    <input {...field} type="datetime-local" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="time" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="locationName">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                    <input {...field} placeholder="Enter Location Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="locationName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="address">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input {...field} placeholder="Enter Address" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="city">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input {...field} placeholder="Enter City" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="province">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province/State</label>
                    <input {...field} placeholder="Enter Province/State" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="province" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="country">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input {...field} placeholder="Enter Country" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="locationType">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
                    <select {...field} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select</option>
                      {locationTypes.map(type => (
                        <option key={type.name} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                    <ErrorMessage name="locationType" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="authorizedPersonName">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authorized Person Name</label>
                    <input {...field} placeholder="Enter Authorized Person Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="authorizedPersonName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="authorizedPersonNumber">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authorized Person Number</label>
                    <input {...field} placeholder="Enter Contact Number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="authorizedPersonNumber" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
              <Field name="authorizedPersonDesignation">
                {({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authorized Person Designation</label>
                    <input {...field} placeholder="Enter Designation" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="authorizedPersonDesignation" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}
              </Field>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => onPrevious()}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LocationInformation;
