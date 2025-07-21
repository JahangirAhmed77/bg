import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LocationSetupInvoice = ({ onNext, onPrevious, onSave, initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    taxes: Yup.array().of(
      Yup.object().shape({
        taxType: Yup.string().required('Tax type is required'),
        percentage: Yup.number().required('Percentage is required'),
        amount: Yup.number().required('Amount is required'),
      })
    )
  });

  return (
    <div className="flex-1 bg-white p-8 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Setup Invoice</h2>
          <div className="text-sm text-gray-500">Step 4 of 4</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
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
            <FieldArray name="taxes">
              {({ push, remove }) => (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tax Type</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Percentage %</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount in Figure</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Add in Invoice</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {values.taxes && values.taxes.length > 0 && values.taxes.map((tax, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">
                              <Field name={`taxes.${index}.taxType`} type="text" placeholder="GST" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`taxes.${index}.taxType`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`taxes.${index}.percentage`} type="number" placeholder="18%" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`taxes.${index}.percentage`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`taxes.${index}.amount`} type="number" placeholder="150" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              <ErrorMessage name={`taxes.${index}.amount`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="px-4 py-3">
                              <Field name={`taxes.${index}.addInInvoice`} type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
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
                      onClick={() => push({ taxType: '', percentage: '', amount: '', addInInvoice: true })}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      + Add Row
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
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LocationSetupInvoice;