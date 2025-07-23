//Also known as guards requirements
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LocationDetailsOfGuards = ({ onNext, onPrevious, onSave, initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    guards: Yup.array().of(
      Yup.object().shape({
        description: Yup.string().required('Required'),
        numOfPersons: Yup.number().required('Required').min(1, 'Min 1'),
        shiftType: Yup.string().required('Required'),
        chargesMonth: Yup.string().required('Required'),
        overtimeHour: Yup.string().required('Required'),
        allowance: Yup.string().required('Required'),
       
      })
    )
  });

  return (
    <div className="flex-1 bg-white p-8 rounded-xl">
      {/* Header */}
      <aside className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Details of Guards/ Employees Requested</h2>
          <div className="text-sm text-gray-500">Step 2 of 4</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>
      </aside>
      
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
                          <th className="p-2 text-left text-xs font-medium text-gray-700">Description</th>
                          <th className="p-2 text-left text-xs font-medium text-gray-700">Nos. of Person</th>
                          <th className="p-2 text-left text-xs font-medium text-gray-700">Shift Type</th>
                          <th className="p-2 text-left text-xs font-medium text-gray-700">Charges/Month</th>
                          <th className="p-2 text-left text-xs font-medium text-gray-700">Overtime/Hour</th>
                          <th className="p-2 text-left text-xs font-medium text-gray-700">Allowance</th>
                          {/* <th className="p-2 text-left text-xs font-medium text-gray-700">Gazeted Holiday</th>
                          <th className="p-2"></th> */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {values.guards && values.guards.length > 0 && values.guards.map((guard, index) => (
                          <tr key={index}>
                            <td className="p-2">
                              <Field name={`guards.${index}.description`} as="select" className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option value="">Select</option>
                                <option value="Ex-Servicemen">Ex-Servicemen</option>
                                <option value="Civilian Guards">Civilian Guards</option>
                                <option value="Lady Searcher">Lady Searcher</option>
                              </Field>
                              <ErrorMessage name={`guards.${index}.description`} component="div" className="text-red-500 text-xs" />
                            </td>
                            <td className="p-2">
                              <Field name={`guards.${index}.numOfPersons`} type="number" placeholder="Enter" className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.numOfPersons`} component="div" className="text-red-500 text-xs" />
                            </td>
                            <td className="p-2">
                              <Field name={`guards.${index}.shiftType`} as="select" className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option value="">Select</option>
                                <option value="day">Day</option>
                                <option value="night">Night</option>
                              </Field>
                              <ErrorMessage name={`guards.${index}.shiftType`} component="div" className="text-red-500 text-xs" />
                            </td>
                            <td className="p-2">
                              <Field name={`guards.${index}.chargesMonth`} type="text" placeholder="Enter" className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.chargesMonth`} component="div" className="text-red-500 text-xs" />
                            </td>
                            <td className="p-2">
                              <Field name={`guards.${index}.overtimeHour`} type="text" placeholder="Enter" className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.overtimeHour`} component="div" className="text-red-500 text-xs" />
                            </td>
                            <td className="p-2">
                              <Field name={`guards.${index}.allowance`} type="text" placeholder="Enter" className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.allowance`} component="div" className="text-red-500 text-xs" />
                            </td>
                            {/* <td className="p-2">
                              <Field name={`guards.${index}.gazetedHoliday`} type="text" placeholder="Enter" className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                              <ErrorMessage name={`guards.${index}.gazetedHoliday`} component="div" className="text-red-500 text-xs" />
                            </td> */}
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