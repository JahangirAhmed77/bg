import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LocationDetailsOfGuards = ({ onNext, onPrevious, onSave, initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    guards: Yup.array().of(
      Yup.object().shape({
        description: Yup.string().required('Description is required'),
        numOfPersons: Yup.number().required('Number of persons is required').min(1, 'Must be at least 1'),
        shiftType: Yup.string().required('Shift type is required'),
        daysMonth: Yup.string().required('Days/Month is required'),
        chargesMonth: Yup.number().required('Charges/Month is required'),
        overtimeHour: Yup.number().required('Overtime/Hour is required'),
        allowance: Yup.number().required('Allowance is required'),
      })
    )
  });

  return (
    <div className="flex-1 bg-white p-8 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Details of Guards/ Employees Requested</h2>
          <div className="text-sm text-gray-500">Step 2 of 4</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>
      </div>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(values);
          onNext(values);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="guards">
              {({ push, remove }) => (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nos. of Person</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Shift Type</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Days/Month</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Charges/Month</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Overtime/Hour</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Allowance</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {values.guards && values.guards.length > 0 && values.guards.map((guard, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">
                              <Field name={`guards.${index}.description`} as="select" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select</option>
                                {/* Add descriptions dynamically */}
                              </Field>
                              <ErrorMessage name={`guards.${index}.description`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`guards.${index}.numOfPersons`} type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.numOfPersons`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`guards.${index}.shiftType`} as="select" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select</option>
                                <option value="day">Day</option>
                                <option value="night">Night</option>
                              </Field>
                              <ErrorMessage name={`guards.${index}.shiftType`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`guards.${index}.daysMonth`} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.daysMonth`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`guards.${index}.chargesMonth`} type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.chargesMonth`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`guards.${index}.overtimeHour`} type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.overtimeHour`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`guards.${index}.allowance`} type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.allowance`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => push({ description: '', numOfPersons: '', shiftType: '', daysMonth: '', chargesMonth: '', overtimeHour: '', allowance: '' })}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
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

export default LocationDetailsOfGuards;