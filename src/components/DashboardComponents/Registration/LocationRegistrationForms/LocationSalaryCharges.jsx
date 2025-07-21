import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LocationSalaryCharges = ({ onNext, onPrevious, onSave, initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    charges: Yup.array().of(
      Yup.object().shape({
        salaryMonth: Yup.number().required('Salary/Month is required'),
        salaryOvertimeHour: Yup.number().required('Overtime/Hour is required'),
        salaryAllowance: Yup.number().required('Allowance is required'),
      })
    )
  });

  return (
    <div className="flex-1 bg-white p-8 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Salary/Charges Breakup for Office Use (Guards)</h2>
          <div className="text-sm text-gray-500">Step 3 of 4</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
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
            <FieldArray name="charges">
              {() => (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Charges/Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Overtime/Hour</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Allowance</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Salary Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Overtime Hour</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Allowance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {values.charges && values.charges.length > 0 && values.charges.map((charge, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span>{charge.description}</span>
                              <div className="ml-2 w-4 h-4 rounded-full border-2 border-green-500 bg-green-100 flex items-center justify-center">
                                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span>{charge.chargesMonth}</span>
                              <div className="ml-2 w-4 h-4 rounded-full border-2 border-green-500 bg-green-100 flex items-center justify-center">
                                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span>{charge.overtimeHour}</span>
                              <div className="ml-2 w-4 h-4 rounded-full border-2 border-green-500 bg-green-100 flex items-center justify-center">
                                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span>{charge.allowance}</span>
                              <div className="ml-2 w-4 h-4 rounded-full border-2 border-green-500 bg-green-100 flex items-center justify-center">
                                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Field name={`charges.${index}.salaryMonth`} type="number" placeholder="Enter" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name={`charges.${index}.salaryMonth`} component="div" className="text-red-500 text-sm mt-1" />
                          </td>
                          <td className="px-4 py-3">
                            <Field name={`charges.${index}.salaryOvertimeHour`} type="number" placeholder="Enter" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name={`charges.${index}.salaryOvertimeHour`} component="div" className="text-red-500 text-sm mt-1" />
                          </td>
                          <td className="px-4 py-3">
                            <Field name={`charges.${index}.salaryAllowance`} type="number" placeholder="Enter" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name={`charges.${index}.salaryAllowance`} component="div" className="text-red-500 text-sm mt-1" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default LocationSalaryCharges;
