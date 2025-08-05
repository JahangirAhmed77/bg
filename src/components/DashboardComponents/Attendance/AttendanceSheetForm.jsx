'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChevronDown, Download, Edit2, Printer, PrinterCheck, Send } from 'lucide-react';
import { getCurrentDate, getCurrentTime } from '@/utils/FormHelpers/CurrentDateTime';
import { useCurrentUser } from '@/lib/hooks';
import { formatDate } from '@/utils/FormHelpers/formatDate';
import { userRequest } from '@/lib/RequestMethods';
import toast from 'react-hot-toast';

const AttendanceSheetForm = () => {
  const { user } = useCurrentUser();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [fetchedAttendance, setFetchedAttendance] = useState([]);
  // Generate days of the month (1-31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Day labels for the header
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Use fetched attendance data instead of mock data
  const employees = fetchedAttendance || [];

  useEffect(() => {
    const getLocationsByOrganzation = async () => {
      try {
        const res = await userRequest.get('/location/by-organization');
        setLocations(res.data.data);
        console.log(res.data.data)

      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch locations');
      }
    };

    getLocationsByOrganzation();
  }, []);

  // Note: Attendance data is now displayed directly from fetchedAttendance
  // No need to initialize form data since this is a read-only table

  // Validation Schema
  const validationSchema = Yup.object({
    date: Yup.string().required('Month is required'),
    locationId: Yup.string().required('Location ID is required'),

  });

  // Initial Values
  const initialValues = {
    date: '',
    locationId: '',

  };

  const fetchAttendance = async (values, { setSubmitting }) => {

    const { date, locationId } = values;
    const fetchAttendancePayload = {
      date: date,
      locationId: locationId,
      totalDays: 31
    }

    try {
      const res = await userRequest.get(`/attendance/guard/${selectedLocation?.id}?date=${date}&totalDays=31`);
      console.log(res.data.data);
      setFetchedAttendance(res.data.data);
      if (res.data.data.length > 0) {
        toast.success('Attendance fetched successfully');
      } else {
        toast.error('No attendance found');
      }
    } catch (error) {
      console.log(error);
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
    }


    setSubmitting(false);
  };

  const handleLocationChange = (locationId, setFieldValue) => {
    const location = locations.find((loc) => loc.id === locationId);
    setSelectedLocation(location);

  };

  useEffect(() => {
    if (selectedLocation) {
      console.log(selectedLocation.id)
    }
  }, [selectedLocation]);

  // Update attendance data when fetched attendance changes
  useEffect(() => {
    if (fetchedAttendance.length > 0) {
      console.log('Fetched attendance updated:', fetchedAttendance);
    }
  }, [fetchedAttendance]);

  const renderAttendanceCell = (employee, day) => {
    // Find attendance record for this specific day
    const attendanceRecord = employee.guardAttendance?.find(record => {
      const recordDate = new Date(record.date);
      return recordDate.getDate() === day;
    });

    const value = attendanceRecord?.type || '';
    const cellClass = `w-8 h-8 text-xs text-center border border-gray-200 rounded ${value === 'P' ? 'bg-green-100 text-green-800' :
      value === 'A' ? 'bg-red-100 text-red-800' :
        value === 'L' ? 'bg-yellow-100 text-yellow-800' :
          value === 'R' ? 'bg-blue-100 text-blue-800' :
            'bg-white'
      }`;

    return (
      <td key={day} className="p-1">
        <div className={cellClass}>
          {value}
        </div>
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-formBGBlue flex flex-col w-full px-4 pt-4">
      {/* Breadcrumb */}
      <div className="w-full max-w-7xl">
        <aside className="bg-white border-b rounded-xl border-gray-200">
          <div className="px-6 py-4">
            <article className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span>Registration</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium">Attendance Sheet</span>
            </article>
          </div>
        </aside>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-md mt-8 p-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={fetchAttendance}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="space-y-8">
              {/* Auto Fields Row */}
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Office ID
                  </label>
                  <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                    {user?.id?.slice(0, 8)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supervisor ID
                  </label>
                  <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                    Auto
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                    {formatDate(getCurrentDate())}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                    {getCurrentTime()}
                  </div>
                </div>
              </div>

              {/* Monthly Attendance Sheet Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Location Attendance Sheet</h2>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Month
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        name="date"
                        className={`w-full px-4 py-3 bg-formBgLightBlue border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${errors.date && touched.date ? 'border-red-500' : 'border-gray-200'
                          }`}
                      >
                        <option value="">Select</option>
                        <option value="2025-01-01">January</option>
                        <option value="2025-02-01">February</option>
                        <option value="2025-03-01">March</option>
                        <option value="2025-04-01">April</option>
                        <option value="2025-05-01">May</option>
                        <option value="2025-06-01">June</option>
                        <option value="2025-07-01">July</option>
                        <option value="2025-08-01">August</option>
                        <option value="2025-09-01">September</option>
                        <option value="2025-10-01">October</option>
                        <option value="2025-11-01">November</option>
                        <option value="2025-12-01">December</option>

                      </Field>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Location ID
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        name="locationId"
                        onChange={(e) => {
                          const locationId = e.target.value;
                          setFieldValue('locationId', locationId);
                          handleLocationChange(locationId, setFieldValue);
                        }}
                        className={`w-full px-4 py-3 bg-formBgLightBlue border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${errors.locationId && touched.locationId ? 'border-red-500' : 'border-gray-200'
                          }`}
                      >
                        <option value="">Select</option>
                        {locations.map((location) => (
                          <option key={location.id} value={location.id}>{location.createdLocationId} - ({location.locationName})</option>
                        ))}
                      </Field>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    <ErrorMessage name="locationId" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Name
                    </label>
                    <div className="relative">
                      <div className="w-full px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                        {selectedLocation ? selectedLocation.locationName : 'Select a location first'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button for Location Selection */}
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-formButtonBlue text-white text-sm rounded-md hover:bg-formButtonBlueHover focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Fetching...' : 'Get Attendance'}
                  </button>

                  <aside className="flex gap-2">
                    <button type="button" className="flex items-center gap-2 px-3 py-[5px] font-[500] text-[12px] border border-gray-300 rounded-2xl hover:bg-gray-50">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>

                    <button type="button" className="flex items-center gap-2 px-3 py-[5px] font-[500] text-[12px] border border-gray-300 rounded-2xl hover:bg-gray-50">
                      <Send className="w-4 h-4" />
                      Post
                    </button>

                    <button type="button" className="flex items-center gap-2 px-3 py-[5px] font-[500] text-[12px] border border-gray-300 rounded-2xl hover:bg-gray-50">
                      <PrinterCheck className="w-4 h-4" />
                      Print
                    </button>

                    <button type="button" className="flex items-center gap-2 px-3 py-[5px] font-[500] text-[12px] border border-gray-300 rounded-2xl hover:bg-gray-50">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </aside>
                </div>

                {/* Monthly Attendance Table */}
                <div className="bg-formBGBlue rounded-2xl p-6">
                  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    <table className="min-w-full bg-white rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="sticky left-0 z-10 bg-gray-50 px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">S.No</th>
                          <th className="sticky left-8 z-10 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 min-w-32">Name</th>
                          <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">SERVICE No.</th>
                          <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">P</th>
                          <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">A</th>
                          <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">R</th>
                          <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">L</th>

                          {/* Days of the month */}
                          {daysInMonth.map((day, index) => (
                            <th key={day} className="px-1 py-2 text-xs font-medium text-gray-700 border border-gray-200 w-10">
                              <div className="text-center">
                                <div className="text-xs">{day}</div>
                                <div className="text-xs text-gray-500">{dayLabels[index % 7]}</div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee, index) => (
                          <tr key={employee.id} className="hover:bg-gray-50">
                            <td className="sticky left-0 z-10 bg-white px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                              {index + 1}
                            </td>
                            <td className="sticky left-8 z-10 bg-white px-3 py-2 text-xs text-gray-600 border border-gray-200 min-w-32">
                              {employee.fullName}
                            </td>
                            <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                              {employee.serviceNumber}
                            </td>
                            <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                              {employee.attendanceStats?.P || 0}
                            </td>
                            <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                              {employee.attendanceStats?.A || 0}
                            </td>
                            <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                              {employee.attendanceStats?.R || 0}
                            </td>
                            <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                              {employee.attendanceStats?.L || 0}
                            </td>

                            {/* Attendance cells for each day */}
                            {daysInMonth.map(day => renderAttendanceCell(employee, day))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex justify-start space-x-6 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-green-100 border rounded"></div>
                      <span>P - Present</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-red-100 border rounded"></div>
                      <span>A - Absent</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-blue-100 border rounded"></div>
                      <span>R - Rest/Holiday</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                      <span>L - Leave</span>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AttendanceSheetForm;