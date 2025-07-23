import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LocationSalaryCharges = ({ onNext, onPrevious, onSave, initialData = {} }) => {
  console.log(initialData)
  const defaultGuardTypes =
    [
    {
      guardCategory: 'Ex-Servicemen',
      chargesMonth: '30,000',
      overtimeHour: '150',
      allowance: '0',
      // gazetedHoliday: '0',
      salaryMonth: '',
      salaryOvertimeHour: '',
      salaryAllowance: '',
      salaryGazetedHoliday: ''
    },
    {
      guardCategory: 'Civilian Guards',
      chargesMonth: '25,000',
      overtimeHour: '120',
      allowance: '0',
      // gazetedHoliday: '0',
      salaryMonth: '',
      salaryOvertimeHour: '',
      salaryAllowance: '',
      salaryGazetedHoliday: ''
    }
  ];
   


  const validationSchema = Yup.object().shape({
    charges: Yup.array().of(
      Yup.object().shape({
        salaryMonth: Yup.string().required('Required'),
        salaryOvertimeHour: Yup.string().required('Required'),
        salaryAllowance: Yup.string().required('Required'),
        
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
        initialValues={initialData.charges ? initialData : { charges: defaultGuardTypes }}
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
                        <th className="p-2 text-left text-xs font-medium text-gray-700">guardCategory</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-700">Charges/Month</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-700">Overtime/Hour</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-700">Allowance</th>
                        {/* <th className="p-2 text-left text-xs font-medium text-gray-700">Gazeted Holiday</th> */}
                        <th className="p-2 text-left text-xs font-medium text-gray-700">Salary/Month</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-700">Overtime/Hour</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-700">Allowance</th>
                       
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {values.charges && values.charges.length > 0 && values.charges.map((charge, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="flex items-center text-sm">
                              <span>{charge.guardCategory}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center text-sm">
                              <span>{charge.chargesMonth}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center text-sm">
                              <span>{charge.overtimeHour}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center text-sm">
                              <span>{charge.allowance}</span>
                            </div>
                          </td>
                          {/* <td className="p-2">
                            <div className="flex items-center text-sm">
                              <span>{charge.gazetedHoliday}</span>
                            </div>
                          </td> */}
                          <td className="p-2">
                            <Field
                              name={`charges.${index}.salaryMonth`}
                              type="text"
                              placeholder="Enter"
                              className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage name={`charges.${index}.salaryMonth`} component="div" className="text-red-500 text-xs" />
                          </td>
                          <td className="p-2">
                            <Field
                              name={`charges.${index}.salaryOvertimeHour`}
                              type="text"
                              placeholder="Enter"
                              className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage name={`charges.${index}.salaryOvertimeHour`} component="div" className="text-red-500 text-xs" />
                          </td>
                          <td className="p-2">
                            <Field
                              name={`charges.${index}.salaryAllowance`}
                              type="text"
                              placeholder="Enter"
                              className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage name={`charges.${index}.salaryAllowance`} component="div" className="text-red-500 text-xs" />
                          </td>
                          {/* <td className="p-2">
                            <Field
                              name={`charges.${index}.salaryGazetedHoliday`}
                              type="text"
                              placeholder="Enter"
                              className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage name={`charges.${index}.salaryGazetedHoliday`} component="div" className="text-red-500 text-xs" />
                          </td> */}
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
